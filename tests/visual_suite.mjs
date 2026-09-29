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

async function runVisualSuite() {
  console.log('Starting Chrome for visual verification suite...');
  const p = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--user-data-dir=' + path.join(rootDir, 'tests', 'visual-profile')
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(250);
    try {
      const res = await fetch('http://127.0.0.1:9227/json/version');
      if (res.ok) {
        const d = await res.json();
        wsUrl = d.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  const t = await fetch('http://127.0.0.1:9227/json/new?' + encodeURIComponent(htmlFileUrl), { method: 'PUT' });
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

  async function evaluate(exp) {
    const r = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true });
    return r.result?.value;
  }

  async function capture(filename) {
    const r = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(r.data, 'base64');
    fs.writeFileSync(path.join(rootDir, 'tests', filename), buffer);
    console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
  }

  // 1. Desktop Project Cards
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await evaluate(`document.getElementById('projetos').scrollIntoView();`);
  await sleep(400);
  await capture('verified_desktop_projects.png');

  // 2. Open Modal Desktop
  await evaluate(`document.querySelector('[data-open-case="windy-3d"]').click();`);
  await sleep(400);
  await capture('verified_desktop_modal.png');

  // 3. Test ESC Close Desktop
  await evaluate(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));`);
  await sleep(300);

  // 4. Test Toast
  await evaluate(`document.querySelector('[data-copy="viniciusjrl@me.com"]').click();`);
  await sleep(200);
  await capture('verified_desktop_toast.png');

  // 5. Mobile Bottom Sheet Modal (375x812)
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  await evaluate(`document.querySelector('[data-open-case="post-na-mao"]').click();`);
  await sleep(400);
  await capture('verified_mobile_sheet.png');

  // Close and clean
  await evaluate(`document.getElementById('btn-close-modal').click();`);
  await sleep(300);

  ws.close();
  p.kill();
  console.log('Visual verification suite completed successfully.');
}

runVisualSuite().catch(console.error);
