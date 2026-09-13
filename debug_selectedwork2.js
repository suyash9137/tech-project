const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  await page.waitForSelector('#work');
  const workInner = await page.innerHTML('#work');
  console.log('SelectedWork innerHTML length:', workInner.length);
  // Look for a div with class containing 'group' and 'cursor-pointer'
  const divCount = await page.evaluate(() => {
    const divs = document.querySelectorAll('#work div');
    let count = 0;
    for (const div of divs) {
      const cls = div.getAttribute('class') || '';
      if (cls.includes('group') && cls.includes('cursor-pointer')) {
        count++;
      }
    }
    return count;
  });
  console.log('Number of divs with group and cursor-pointer classes:', divCount);
  if (divCount > 0) {
    // Get the first such div's outerHTML
    const firstDivHTML = await page.evaluate(() => {
      const divs = document.querySelectorAll('#work div');
      for (const div of divs) {
        const cls = div.getAttribute('class') || '';
        if (cls.includes('group') && cls.includes('cursor-pointer')) {
          return div.outerHTML;
        }
      }
      return null;
    });
    console.log('First matching div outerHTML (first 500 chars):', firstDivHTML ? firstDivHTML.substring(0, 500) : 'null');
  }
  // Also check if the onClick listener is attached (we can't directly, but we can see if there's an onclick attribute)
  const onclickCount = await page.evaluate(() => {
    const divs = document.querySelectorAll('#work div');
    let count = 0;
    for (const div of divs) {
      if (div.onclick) {
        count++;
      }
    }
    return count;
  });
  console.log('Number of divs with onclick property:', onclickCount);
  await browser.close();
})();