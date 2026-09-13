const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser console error:', msg.text());
    }
  });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  // Wait for SelectedWork section
  await page.waitForSelector('#work');
  // Find the project title
  const title = page.locator('#work').locator('text=Aether AI — Enterprise Workflow Automation').first();
  await title.waitFor({ state: 'visible' });
  console.log('Project title found:', await title.textContent());
  // Click it
  await title.click();
  console.log('Clicked project title');
  // Wait a bit for modal to appear
  await page.waitForTimeout(2000);
  // Check if modal exists
  const modal = page.locator('.CaseStudyModal');
  const count = await modal.count();
  console.log('Number of CaseStudyModal elements:', count);
  if (count > 0) {
    console.log('Modal is visible?', await modal.isVisible());
    // Get its HTML
    const html = await modal.innerHTML();
    console.log('Modal HTML snippet:', html.substring(0, 500));
  } else {
    console.log('Modal not found. Let\'s see what is in the DOM.');
    // Take a snapshot of the body
    const bodyHtml = await page.innerHTML('body');
    console.log('Body HTML length:', bodyHtml.length);
    // Maybe the modal is rendered but with a different class?
    // Let's look for any element with 'modal' in class
    const modalLike = page.locator('[class*="modal"]');
    const modalCount = await modalLike.count();
    console.log('Elements with class containing "modal":', modalCount);
    if (modalCount > 0) {
      const first = modalLike.first();
      console.log('First such element class:', await first.getAttribute('class'));
      console.log('First such element HTML snippet:', await first.innerHTML().then(s => s.substring(0, 300)));
    }
  }
  await browser.close();
})();