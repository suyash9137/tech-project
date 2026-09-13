const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  // Click the first header nav link (Work)
  const workLink = page.locator('header nav a').first();
  await workLink.click();
  await page.waitForTimeout(1000);
  const url = page.url();
  console.log('URL after click:', url);
  console.log('URL ends with #work?', url.endsWith('#work'));
  console.log('Regex /#work/.test(url):', /#work/.test(url));
  console.log('Regex /#work$/.test(url):', /#work$/.test(url));
  console.log('Regex /.*#work$/.test(url):', /.*#work$/.test(url));
  await browser.close();
})();