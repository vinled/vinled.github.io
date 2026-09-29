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

async function findOverflows(width, height) {
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--user-data-dir=' + path.join(rootDir, 'tests', 'overflow-profile')
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(250);
    try {
      const res = await fetch('http://127.0.0.1:9223/json/version');
      if (res.ok) {
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    chromeProcess.kill();
    throw new Error('Could not connect to Chrome port 9223');
  }

  const targetRes = await fetch('http://127.0.0.1:9223/json/new?' + encodeURIComponent(htmlFileUrl), { method: 'PUT' });
  const targetData = await targetRes.json();
  const ws = new WebSocket(targetData.webSocketDebuggerUrl);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) cb.reject(msg.error);
      else cb.resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 2,
    mobile: true
  });

  await sendCommand('Page.navigate', { url: htmlFileUrl });
  await sleep(1000);

  const res = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const winW = window.innerWidth;
        const overflowing = [];
        const all = document.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > winW + 1) {
            overflowing.push({
              tag: el.tagName,
              className: el.className,
              id: el.id,
              rectRight: Math.round(rect.right),
              rectWidth: Math.round(rect.width),
              winW: winW,
              diff: Math.round(rect.right - winW)
            });
          }
        }
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: winW,
          overflowing: overflowing.slice(0, 15)
        };
      })()
    `,
    returnByValue: true
  });

  ws.close();
  chromeProcess.kill();
  return res.result.value;
}

async function run() {
  console.log('Checking 375px width:');
  const res375 = await findOverflows(375, 667);
  console.log(`scrollWidth: ${res375.scrollWidth}, innerWidth: ${res375.innerWidth}`);
  if (res375.overflowing.length > 0) {
    console.log('Elements overflowing at 375px:');
    console.table(res375.overflowing);
  } else {
    console.log('No overflows at 375px.');
  }

  console.log('\nChecking 320px width:');
  const res320 = await findOverflows(320, 568);
  console.log(`scrollWidth: ${res320.scrollWidth}, innerWidth: ${res320.innerWidth}`);
  if (res320.overflowing.length > 0) {
    console.log('Elements overflowing at 320px:');
    console.table(res320.overflowing);
  } else {
    console.log('No overflows at 320px.');
  }
}

run().catch(console.error);
