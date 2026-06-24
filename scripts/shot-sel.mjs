// Dev-only: screenshot after scrolling a CSS selector to viewport centre.
// Usage: node scripts/shot-sel.mjs "<selector>" <out.png> [width]
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sel = process.argv[2];
const out = process.argv[3] || 'shot.png';
const width = Number(process.argv[4] ?? 1280);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width, height: 860, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise((r) => setTimeout(r, 5000));
await page.evaluate(() => {
  document.querySelectorAll('.pl-sky, .loader-core').forEach((e) => (e.style.display = 'none'));
  document.body.classList.remove('preloading');
  document.body.classList.add('altitude-ready');
  window.dispatchEvent(new Event('preloader:done'));
});
const found = await page.evaluate((s) => {
  const el = document.querySelector(s);
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const mid = r.top + window.scrollY + r.height / 2 - window.innerHeight / 2;
  window.scrollTo(0, Math.max(0, mid));
  return true;
}, sel);
console.log(found ? `scrolled to ${sel}` : `NOT FOUND: ${sel}`);
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: out });
await browser.close();
console.log('wrote', out);
