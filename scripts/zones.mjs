// Dev-only: screenshot each altitude zone by id (centre-anchored), for the
// sky/space redesign verification. Usage: node scripts/zones.mjs
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ZONES = ['zone-space', 'zone-sky', 'zone-work', 'zone-ground'];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 820, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 5000));
// kill the preloader so the page underneath is visible in headless, and signal
// the page that the intro is done so <CloudField/> brings its clouds in
await page.evaluate(() => {
  document.querySelectorAll('.pl-sky, .loader-core').forEach(e => (e.style.display = 'none'));
  document.body.classList.remove('preloading');
  document.body.classList.add('altitude-ready');
  window.dispatchEvent(new Event('preloader:done'));
});

for (const id of ZONES) {
  await page.evaluate((zid) => {
    const el = document.getElementById(zid);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mid = r.top + window.scrollY + r.height / 2 - window.innerHeight / 2;
    window.scrollTo(0, Math.max(0, mid));
  }, id);
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: `_${id}.png` });
  console.log('wrote', `_${id}.png`);
}
await browser.close();
