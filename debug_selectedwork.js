const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  await page.waitForSelector('#work');
  const workInner = await page.innerHTML('#work');
  console.log('SelectedWork innerHTML length:', workInner.length);
  // Look for motion.div - we can search for the string 'motion.div'
  if (workInner.includes('motion.div')) {
    console.log('Found motion.div in HTML');
  } else {
    console.log('Did NOT find motion.div in HTML - maybe it\'s not rendered?');
  }
  // Let's also look for the specific project title
  if (workInner.includes('Aether AI — Enterprise Workflow Automation')) {
    console.log('Found project title in HTML');
  } else {
    console.log('Did NOT find project title in HTML');
  }
  // Let's get the outerHTML of the first motion.div by using evaluator
  const motionDivCount = await page.evaluate(() => {
    const els = document.querySelectorAll('motion.div');
    return els.length;
  });
  console.log('Number of motion.div elements in DOM:', motionDivCount);
  if (motionDivCount > 0) {
    const firstMotionDiv = await page.evaluate(() => {
      const el = document.querySelector('motion.div');
      return el ? el.outerHTML.substring(0, 500) : null;
    });
    console.log('First motion.div outerHTML snippet:', firstMotionDiv);
  }
  await browser.close();
})();