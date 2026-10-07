import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${process.env.PREVIEW_URL || 'http://127.0.0.1:3196'}/print`, { waitUntil: 'networkidle' });
  if (await page.locator('.print-slide').count() === 0) {
    await page.goto(`${process.env.PREVIEW_URL || 'http://127.0.0.1:3196'}/print.html`, { waitUntil: 'networkidle' });
  }
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.locator('.print-slide').evaluateAll(slides => slides.flatMap((slide, index) => {
    const copy = slide.querySelector('.slide-copy').getBoundingClientRect();
    const footer = slide.querySelector('footer').getBoundingClientRect();
    return copy.bottom > footer.top - 16 ? [index + 1] : [];
  }));
  if (overflow.length) throw new Error(`Print copy overlaps footer: ${overflow.join(', ')}`);
  if (await page.locator('.print-slide').count() !== 16) throw new Error('Expected 16 slides');
  await fs.mkdir('public/downloads', { recursive: true });
  await page.pdf({ path: 'public/downloads/rhapsody-lvmh-partnership.pdf', printBackground: true, preferCSSPageSize: true });
  const info = execFileSync('pdfinfo', ['public/downloads/rhapsody-lvmh-partnership.pdf'], { encoding: 'utf8' });
  if (!/^Pages:\s+16$/m.test(info)) throw new Error('PDF must contain exactly 16 pages');
  await fs.mkdir('qa', { recursive: true });
  for (const index of [0, 10, 13, 14]) await page.locator('.print-slide').nth(index).screenshot({ path: `qa/print-${index + 1}.png` });
  console.log('16-page PDF generated; all copy clears the footers.');
} finally { await browser.close(); }
