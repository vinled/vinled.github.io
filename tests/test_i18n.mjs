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
  console.log('Testing i18n functionality & mobile responsiveness in Headless Chrome...');
  const p = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9229',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--user-data-dir=' + path.join(rootDir, 'tests', 'i18n-profile')
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(200);
    try {
      const res = await fetch('http://127.0.0.1:9229/json/version');
      if (res.ok) {
        const d = await res.json();
        wsUrl = d.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  const t = await fetch('http://127.0.0.1:9229/json/new?' + encodeURIComponent(htmlFileUrl), { method: 'PUT' });
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
  await sleep(400);

  async function evalJs(exp) {
    const r = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true });
    return r.result?.value;
  }

  // Check 1: Initial state is Portuguese
  const initialLang = await evalJs(`document.documentElement.lang`);
  const initialPtActive = await evalJs(`document.querySelector('.lang-btn[data-lang="pt"]').classList.contains('active')`);
  const initialHeroStatus = await evalJs(`document.querySelector('[data-i18n="hero_status"]').textContent.trim()`);
  console.log('1. Initial Lang:', initialLang, '| PT Active:', initialPtActive, '| Status:', initialHeroStatus);

  if (initialLang !== 'pt-BR' || !initialPtActive || !initialHeroStatus.includes('Disponível')) {
    throw new Error('Initial language is not Portuguese!');
  }

  // Check 2: Switch to English
  await evalJs(`document.querySelector('.lang-btn[data-lang="en"]').click();`);
  await sleep(150);

  const enLang = await evalJs(`document.documentElement.lang`);
  const enActive = await evalJs(`document.querySelector('.lang-btn[data-lang="en"]').classList.contains('active')`);
  const enHeroStatus = await evalJs(`document.querySelector('[data-i18n="hero_status"]').textContent.trim()`);
  const enNavProjects = await evalJs(`document.querySelector('[data-i18n="nav_projects"]').textContent.trim()`);
  const enP1Headline = await evalJs(`document.querySelector('[data-i18n="p1_headline"]').textContent.trim()`);
  console.log('2. Switched to EN -> Lang:', enLang, '| EN Active:', enActive, '| Projects:', enNavProjects, '| P1 Headline:', enP1Headline);

  if (enLang !== 'en' || !enActive || !enNavProjects.includes('Projects') || !enP1Headline.includes('Interactive 3D')) {
    throw new Error('English switch failed!');
  }

  // Check 3: Open Modal in English and verify content
  await evalJs(`document.querySelector('[data-open-case="windy-3d"]').click();`);
  await sleep(250);

  const modalTitle = await evalJs(`document.querySelector('.case-study-title')?.textContent.trim()`);
  const modalMetaLabel = await evalJs(`document.querySelector('.case-meta-label')?.textContent.trim()`);
  const modalCtaText = await evalJs(`document.getElementById('modal-live-link')?.textContent.trim()`);
  console.log('3. Modal in EN -> Title:', modalTitle, '| Meta label:', modalMetaLabel, '| CTA:', modalCtaText);

  if (!modalTitle.includes('Interactive Spatial Weather Visualizer') || !modalMetaLabel.includes('Role') || !modalCtaText.includes('Launch')) {
    throw new Error('Case Study did not render in English!');
  }

  // Check 4: Switch back to Portuguese while modal is open
  await evalJs(`document.querySelector('.lang-btn[data-lang="pt"]').click();`);
  await sleep(250);

  const ptModalTitle = await evalJs(`document.querySelector('.case-study-title')?.textContent.trim()`);
  const ptModalMetaLabel = await evalJs(`document.querySelector('.case-meta-label')?.textContent.trim()`);
  console.log('4. Modal switched back to PT -> Title:', ptModalTitle, '| Meta label:', ptModalMetaLabel);

  if (!ptModalTitle.includes('Visualizador Climático Interativo') || !ptModalMetaLabel.includes('Função')) {
    throw new Error('Modal did not re-render back in Portuguese!');
  }

  // Close modal
  await evalJs(`document.getElementById('btn-close-modal').click();`);
  await sleep(200);

  // Check 5: Responsive overflow at 375px and 320px with the new toggle
  for (const w of [375, 320]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 640, deviceScaleFactor: 2, mobile: true });
    await sleep(200);
    const overflow = await evalJs(`document.documentElement.scrollWidth > window.innerWidth`);
    const islandRect = await evalJs(`(() => { const r = document.querySelector('.nav-island').getBoundingClientRect(); return { width: r.width, right: r.right }; })()`);
    console.log(`5. Viewport ${w}px -> Horiz Overflow:`, overflow, '| Island Width:', islandRect.width);
    if (overflow) {
      throw new Error(`Horizontal overflow detected at ${w}px!`);
    }
  }

  ws.close();
  p.kill();
  console.log('ALL I18N AND RESPONSIVENESS TESTS PASSED SUCCESSFULLY! ✓');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
