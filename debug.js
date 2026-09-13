const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser console error:', msg.text());
    }
  });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(5000);
  const content = await page.innerHTML('#root');
  console.log('Root HTML:', content);
  await browser.close();
})();