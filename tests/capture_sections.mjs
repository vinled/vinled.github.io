import { spawn } from 'node:child_process';
import fs from 'node:fs';
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
    '--remote-debugging-port=9224',
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=' + path.join(rootDir, 'tests', 'capture-profile')
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(200);
    try {
      const res = await fetch('http://127.0.0.1:9224/json/version');
      if (res.ok) {
        const d = await res.json();
        wsUrl = d.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  const t = await fetch('http://127.0.0.1:9224/json/new?' + encodeURIComponent(htmlFileUrl), { method: 'PUT' });
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 950, deviceScaleFactor: 1, mobile: false });
  await sleep(600);

  // 1. Hero
  let r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(rootDir, 'tests', 'verified_desktop_hero.png'), Buffer.from(r.data, 'base64'));
  console.log('Saved verified_desktop_hero.png');

  // 2. Bento
  await send('Runtime.evaluate', { expression: `document.getElementById('filosofia').scrollIntoView();` });
  await sleep(500);
  r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(rootDir, 'tests', 'verified_desktop_bento.png'), Buffer.from(r.data, 'base64'));
  console.log('Saved verified_desktop_bento.png');

  // 3. Mobile Hero (375x812)
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
  await sleep(500);
  r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(rootDir, 'tests', 'verified_mobile_hero.png'), Buffer.from(r.data, 'base64'));
  console.log('Saved verified_mobile_hero.png');

  ws.close();
  p.kill();
  console.log('All section screenshots captured successfully!');
}

run().catch(console.error);
