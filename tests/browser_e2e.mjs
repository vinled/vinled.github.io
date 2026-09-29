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

async function runBrowserTests() {
  console.log('Starting Headless Chrome on port 9222...');
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + path.join(rootDir, 'tests', 'chrome-profile')
  ]);

  chromeProcess.on('error', (err) => {
    console.error('Failed to spawn Chrome:', err);
    process.exit(1);
  });

  // Wait for Chrome to open debugging port
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(300);
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      if (res.ok) {
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {
      // wait
    }
  }

  if (!wsUrl) {
    console.error('Could not connect to Chrome debugging port.');
    chromeProcess.kill();
    process.exit(1);
  }

  console.log('Connected to Chrome version endpoint, target websocket:', wsUrl);

  // Create a new target/page
  const targetRes = await fetch('http://127.0.0.1:9222/json/new?' + encodeURIComponent(htmlFileUrl), { method: 'PUT' });
  const targetData = await targetRes.json();
  const pageWsUrl = targetData.webSocketDebuggerUrl;

  const ws = new WebSocket(pageWsUrl);
  let id = 1;
  const callbacks = new Map();
  const consoleMessages = [];
  const jsExceptions = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) cb.reject(msg.error);
      else cb.resolve(msg.result);
    } else if (msg.method === 'Console.messageAdded') {
      consoleMessages.push(msg.params.message);
    } else if (msg.method === 'Runtime.exceptionThrown') {
      jsExceptions.push(msg.params.exceptionDetails);
    }
  };

  await new Promise((resolve) => ws.onopen = resolve);

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');
  await sendCommand('Console.enable');

  console.log('Navigating to', htmlFileUrl);
  await sendCommand('Page.navigate', { url: htmlFileUrl });
  await sleep(1500); // Allow styles, fonts, and DOMContentLoaded

  async function evaluate(expression) {
    const res = await sendCommand('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async function captureScreenshot(filename) {
    const res = await sendCommand('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(path.join(rootDir, 'tests', filename), buffer);
    console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
  }

  console.log('\n--- 1. DESKTOP VIEWPORT CHECKS (1280x800) ---');
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(300);

  const desktopOverflow = await evaluate(`({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: document.documentElement.scrollWidth > window.innerWidth
  })`);
  console.log('Desktop Overflow check:', desktopOverflow);

  await captureScreenshot('screenshot_desktop_1280.png');

  console.log('\n--- 2. MOBILE VIEWPORT CHECKS (375x667) ---');
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(300);

  const mobile375Overflow = await evaluate(`({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: document.documentElement.scrollWidth > window.innerWidth
  })`);
  console.log('Mobile 375px Overflow check:', mobile375Overflow);
  await captureScreenshot('screenshot_mobile_375.png');

  console.log('\n--- 3. NARROW MOBILE VIEWPORT CHECKS (320x568) ---');
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 320,
    height: 568,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(300);

  const mobile320Overflow = await evaluate(`({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    navWidth: document.querySelector('.nav-island').offsetWidth,
    navRight: document.querySelector('.nav-island').getBoundingClientRect().right
  })`);
  console.log('Mobile 320px Overflow check:', mobile320Overflow);
  await captureScreenshot('screenshot_mobile_320.png');

  console.log('\n--- 4. INTERACTION TESTS ---');
  // Reset to desktop for interaction checks
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(300);

  // Test Modal Open Windy 3D
  console.log('Testing open modal for windy-3d...');
  const modalOpenResult = await evaluate(`
    (() => {
      const btn = document.querySelector('[data-open-case="windy-3d"]');
      btn.click();
      const backdrop = document.getElementById('case-modal-backdrop');
      const title = document.querySelector('.case-study-title')?.textContent;
      return {
        isOpen: backdrop.classList.contains('is-open'),
        ariaHidden: backdrop.getAttribute('aria-hidden'),
        title: title,
        hash: window.location.hash
      };
    })()
  `);
  console.log('Modal open result:', modalOpenResult);
  await captureScreenshot('screenshot_modal_windy3d.png');

  // Test Esc key closing modal
  console.log('Testing ESC key close...');
  await evaluate(`
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  `);
  await sleep(300);
  const modalCloseResult = await evaluate(`
    (() => {
      const backdrop = document.getElementById('case-modal-backdrop');
      return {
        isOpen: backdrop.classList.contains('is-open'),
        ariaHidden: backdrop.getAttribute('aria-hidden')
      };
    })()
  `);
  console.log('Modal close result:', modalCloseResult);

  // Test Toast Notification
  console.log('Testing copy email toast...');
  const toastResult = await evaluate(`
    (() => {
      const btn = document.querySelector('[data-copy="viniciusjrl@me.com"]');
      btn.click();
      const toast = document.getElementById('toast-notification');
      const msg = document.getElementById('toast-message')?.textContent;
      return {
        isVisible: toast.classList.contains('is-visible'),
        msg: msg
      };
    })()
  `);
  console.log('Toast result:', toastResult);
  await captureScreenshot('screenshot_toast.png');

  console.log('\n--- 5. CHECK CONSOLE LOGS & JS EXCEPTIONS ---');
  console.log('Console messages logged:', consoleMessages.length);
  for (const m of consoleMessages) console.log('Console:', m.level, m.text);
  console.log('Exceptions thrown:', jsExceptions.length);
  for (const ex of jsExceptions) console.error('Exception:', ex.text, ex.exception?.description);

  // Cleanup
  ws.close();
  chromeProcess.kill();

  const success = !desktopOverflow.hasOverflow && !mobile375Overflow.hasOverflow && !mobile320Overflow.hasOverflow && jsExceptions.length === 0;
  console.log('\nE2E Browser verification summary:', success ? 'ALL PASSED' : 'FOUND ISSUES');
  process.exit(success ? 0 : 1);
}

runBrowserTests().catch((err) => {
  console.error('Test script crashed:', err);
  process.exit(1);
});
