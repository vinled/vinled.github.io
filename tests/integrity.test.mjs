import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'css', 'style.css');
const jsPath = path.join(rootDir, 'js', 'main.js');

const html = fs.readFileSync(htmlPath, 'utf-8');
const css = fs.readFileSync(cssPath, 'utf-8');
const js = fs.readFileSync(jsPath, 'utf-8');

const errors = [];
const passes = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(`FAIL: ${message}`);
  } else {
    passes.push(`PASS: ${message}`);
  }
}

// 1. Check duplicate comments
assert(!html.includes('<!-- -----------------------------------------------------------------------\n         Creative Technologist Philosophy Bento Grid (Material 3 + Apple)\n         ----------------------------------------------------------------------- -->\n    <!-- -----------------------------------------------------------------------'), 'No duplicate comment blocks in index.html');

// 2. Check inline onclick in HTML
assert(!html.includes('onclick='), 'No inline onclick handlers in index.html (violates CSP)');

// 3. Check for mobile touch and tilt logic
assert(!js.includes("if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;"), 'Tilt must not be completely disabled by maxTouchPoints > 0 (breaks Windows touch laptops)');

// 4. Check for popstate / browser history handling
assert(js.includes('popstate') || js.includes('hashchange'), 'History popstate or hashchange listener implemented for modal navigation');

// 5. Check for focus trap in modal
assert(js.includes('Tab') || js.includes('focus'), 'Focus management / trap implemented in modal');

// 6. Check for Retina / DPR support on ambient canvas
assert(js.includes('devicePixelRatio') || js.includes('dpr'), 'Canvas supports devicePixelRatio for crisp Retina rendering');

// 7. Check for prefers-reduced-motion in JS
assert(js.includes('prefers-reduced-motion'), 'JS respects prefers-reduced-motion media query');

// 8. Check for nav-divider hidden on mobile
assert(css.includes('.nav-divider') && css.includes('display: none'), 'CSS hides .nav-divider on mobile breakpoints to avoid orphaned line');

// 9. Check for scrollbar compensation on fixed nav to avoid layout shift
assert(js.includes('--scrollbar') || js.includes('navIsland') || js.includes('nav-island'), 'Scrollbar compensation handles fixed nav to avoid CLS');

// 10. Check case study IDs and trigger bindings
const htmlCases = [...html.matchAll(/data-open-case="([^"]+)"/g)].map(m => m[1]);
assert(htmlCases.length >= 4, 'Has at least 4 case study triggers in HTML (buttons + preview wraps)');
assert(htmlCases.includes('windy-3d') && htmlCases.includes('post-na-mao'), 'Triggers match Windy 3D and Post Na Mão');

console.log(`\n=== INITIAL INTEGRITY TEST RESULTS ===`);
console.log(`Passes: ${passes.length}`);
console.log(`Failures: ${errors.length}\n`);
for (const p of passes) console.log(`✓ ${p}`);
for (const e of errors) console.error(`✗ ${e}`);

if (errors.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
