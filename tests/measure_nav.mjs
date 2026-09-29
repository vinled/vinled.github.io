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
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--user-data-dir=' + path.join(rootDir, 'tests', 'nav-profile')
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(200);
    try {
      const res = await fetch('http://127.0.0.1:9225/json/version');
      if (res.ok) {
        const d = await res.json();
        wsUrl = d.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  const t = await fetch('http://127.0.0.1:9225/json/new?' + encodeURIComponent(htmlFileUrl), { method: 'PUT' });
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

  for (const w of [375, 320]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 600, deviceScaleFactor: 2, mobile: true });
    await sleep(400);
    const r = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const nav = document.querySelector('.nav-island');
          const brand = document.querySelector('.nav-brand');
          const brandText = document.querySelector('.nav-brand-text');
          const cta = document.querySelector('.nav-cta-btn');
          const divider = document.querySelector('.nav-divider');
          return {
            windowWidth: window.innerWidth,
            navRect: { left: nav.getBoundingClientRect().left, right: nav.getBoundingClientRect().right, width: nav.offsetWidth },
            brandRect: { left: brand.getBoundingClientRect().left, right: brand.getBoundingClientRect().right, width: brand.offsetWidth },
            dividerDisplay: window.getComputedStyle(divider).display,
            ctaRect: { left: cta.getBoundingClientRect().left, right: cta.getBoundingClientRect().right, width: cta.offsetWidth }
          };
        })()
      `,
      returnByValue: true
    });
    console.log(`Results for ${w}px:`, JSON.stringify(r.result.value, null, 2));
  }

  ws.close();
  p.kill();
}

run().catch(console.error);
