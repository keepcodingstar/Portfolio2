// Dev-only: screenshot each altitude zone at phone width to verify responsive
// behavior. Usage: node scripts/mobile.mjs
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = process.env.PORT || '3000';
const ZONES = ['zone-space', 'zone-sky', 'zone-work', 'zone-ground'];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--hide-scrollbars'],
});
const page = await browser.newPage();
// iPhone 14-ish logical viewport
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 5000));
await page.evaluate(() => {
  document.querySelectorAll('.pl-sky, .loader-core').forEach(e => (e.style.display = 'none'));
  document.body.classList.remove('preloading');
  document.body.classList.add('altitude-ready');
  window.dispatchEvent(new Event('preloader:done'));
});

// report any horizontal overflow (a common mobile bug)
const overflow = await page.evaluate(() => {
  return { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth };
});
console.log('overflow check:', JSON.stringify(overflow), overflow.scrollW > overflow.clientW ? 'HORIZONTAL OVERFLOW' : 'ok');

for (const id of ZONES) {
  await page.evaluate((zid) => {
    const el = document.getElementById(zid);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mid = r.top + window.scrollY + r.height / 2 - window.innerHeight / 2;
    window.scrollTo(0, Math.max(0, mid));
  }, id);
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: `_m-${id}.png` });
  console.log('wrote', `_m-${id}.png`);
}
await browser.close();
