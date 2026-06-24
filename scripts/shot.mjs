// Dev-only: screenshot a route after scrolling to the very top (the page loads
// anchored at the sky, so we force scrollTo(0,0) first). Usage:
//   node scripts/shot.mjs <path> <out.png> [scrollY]
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = process.argv[2] || '/';
const out = process.argv[3] || 'shot.png';
const scrollY = Number(process.argv[4] ?? 0);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 820, deviceScaleFactor: 1 });
const url = `http://127.0.0.1:3000${path}`;
console.log('navigating to:', JSON.stringify(url));
try {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
} catch (e) {
  console.log('GOTO_ERR:', e.message);
}
// wait out the preloader intro, then override scroll and let the shader run
await new Promise(r => setTimeout(r, 5000));
await page.evaluate(y => window.scrollTo(0, y), scrollY);
// the preloader intro doesn't lift in headless — hide it so the page underneath is visible
await page.evaluate(() => {
  document.querySelectorAll('.pl-clouds, .pl-sky, .loader-core').forEach(e => (e.style.display = 'none'));
  document.body.classList.add('altitude-ready');
});
await new Promise(r => setTimeout(r, 3500));
await page.screenshot({ path: out });
await browser.close();
console.log('wrote', out);
