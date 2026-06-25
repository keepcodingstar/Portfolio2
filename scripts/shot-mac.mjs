// macOS variant of shot.mjs — same flow, Chrome path resolved for darwin.
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
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
await new Promise(r => setTimeout(r, 5000));
await page.evaluate(y => window.scrollTo(0, y), scrollY);
await page.evaluate(() => {
  document.querySelectorAll('.pl-clouds, .pl-sky, .loader-core').forEach(e => (e.style.display = 'none'));
  document.body.classList.add('altitude-ready');
  document.body.classList.remove('preloading');
});
await new Promise(r => setTimeout(r, 3500));
await page.screenshot({ path: out });
await browser.close();
console.log('wrote', out);
