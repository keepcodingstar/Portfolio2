// Full-page screenshot, sliced into viewport-height tiles for review.
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const path = process.argv[2] || '/';
const prefix = process.argv[3] || 'full';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
const url = `http://127.0.0.1:3000${path}`;
try {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
} catch (e) {
  console.log('GOTO_ERR:', e.message);
}
await new Promise(r => setTimeout(r, 2500));
// force every reveal visible so we capture real content, not pre-animation state
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
});
await new Promise(r => setTimeout(r, 800));
const height = await page.evaluate(() => document.body.scrollHeight);
console.log('page height:', height);
const tile = 900;
let i = 0;
for (let y = 0; y < height; y += tile) {
  await page.evaluate(yy => window.scrollTo(0, yy), y);
  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: `/tmp/${prefix}-${String(i).padStart(2, '0')}.png` });
  i++;
}
await browser.close();
console.log('wrote', i, 'tiles');
