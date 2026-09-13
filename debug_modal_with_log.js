const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  // Listen for console logs from the page
  page.on('console', msg => {
    console.log(`[PAGE CONSOLE ${msg.type()}] ${msg.text()}`);
  });
  // Also listen for page errors
  page.on('pageerror', err => {
    console.log('[PAGE ERROR]', err);
  });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  await page.waitForSelector('#work');
  // Scroll the project title into view
  const title = page.locator('#work').locator('text=Aether AI — Enterprise Workflow Automation').first();
  await title.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  console.log('Clicking project title...');
  await title.click();
  console.log('Clicked. Waiting for modal...');
  await page.waitForTimeout(3000);
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
    // Look for any element with 'modal' in class
    const modalLike = page.locator('[class*="modal"]');
    const modalCount = await modalLike.count();
    console.log('Elements with class containing "modal":', modalCount);
    if (modalCount > 0) {
      const first = modalLike.first();
      console.log('First such element class:', await first.getAttribute('class'));
      console.log('First such element HTML snippet:', await first.innerHTML().then(s => s.substring(0, 300)));
    }
  }
  // Also check if any error occurred in the modal component by looking for React error boundary? Not easy.
  await browser.close();
})();