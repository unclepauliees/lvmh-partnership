import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const results = [];
await fs.mkdir('qa', { recursive: true });
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:3196', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    const sectionCount = await page.locator('main > section').count();
    await page.evaluate(() => scrollTo(0, innerHeight * 1.55));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `qa/cover-${viewport.width}.png` });
    await page.locator('nav button').click();
    const links = await page.locator('header ol a').count();
    await page.locator('header ol a[href="#slide-11"]').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `qa/pilot-${viewport.width}.png` });
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    const images = await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0));
    const heading = await page.locator('#slide-11 h2').boundingBox();
    results.push({ viewport, sectionCount, links, horizontalOverflow, images, heading, errors });
    if (sectionCount !== 16 || links !== 16 || horizontalOverflow || !images || errors.length) throw new Error(JSON.stringify(results));
    await page.close();
  }
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
