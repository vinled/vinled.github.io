import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const htmlFileUrl = `file:///${path.join(rootDir, 'index.html').replace(/\\/g, '/')}`;
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const p = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--window-size=320,640',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--user-data-dir=' + path.join(rootDir, 'tests', 'vp-profile')
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(200);
    try {
      const res = await fetch('http://127.0.0.1:9226/json/version');
      if (res.ok) {
        const d = await res.json();
        wsUrl = d.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  const t = await fetch('http://127.0.0.1:9226/json/new?' + encodeURIComponent(htmlFileUrl), { method: 'PUT' });
  const tData = await t.json();
  const ws = new WebSocket(tData.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (e) => {
    const d = JSON.parse(e.data);
    if (d.id && callbacks.has(d.id)) {
      const cb = callbacks.get(d.id);
      callbacks.delete(d.id);
      cb(d.result);
    }
  };

  function send(method, params = {}) {
    return new Promise(res => {
      const i = id++;
      callbacks.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await sleep(500);

  const r = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const text = document.querySelector('.nav-brand-text');
        return {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          outerWidth: window.outerWidth,
          outerHeight: window.outerHeight,
          brandTextDisplay: window.getComputedStyle(text).display,
          matches380: window.matchMedia('(max-width: 380px)').matches,
          matches480: window.matchMedia('(max-width: 480px)').matches,
          matches768: window.matchMedia('(max-width: 768px)').matches
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Result when started with --window-size=320,640:', r.result.value);

  ws.close();
  p.kill();
}

run().catch(console.error);
