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
  // Check for specific modal classes
  const backdropClass = 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto';
  const backdropInnerClass = 'fixed inset-0 bg-[var(--polaris-black)]/[0.9] backdrop-blur-2xl';
  const modalWindowClass = 'relative w-full max-w-5xl bg-[var(--polaris-black)]/[0.8] border border-[var(--polaris-text)]/[0.1] rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-[var(--polaris-text)] flex flex-col max-h-[90vh]';
  const backdropCount = await page.evaluate((cls) => {
    const els = document.querySelectorAll('div');
    let count = 0;
    for (const el of els) {
      const classAttr = el.getAttribute('class') || '';
      if (classAttr.includes(cls)) {
        count++;
      }
    }
    return count;
  }, backdropClass);
  console.log('Number of elements with backdrop outer class:', backdropCount);
  const backdropInnerCount = await page.evaluate((cls) => {
    const els = document.querySelectorAll('div');
    let count = 0;
    for (const el of els) {
      const classAttr = el.getAttribute('class') || '';
      if (classAttr.includes(cls)) {
        count++;
      }
    }
    return count;
  }, backdropInnerClass);
  console.log('Number of elements with backdrop inner class:', backdropInnerCount);
  const modalWindowCount = await page.evaluate((cls) => {
    const els = document.querySelectorAll('div');
    let count = 0;
    for (const el of els) {
      const classAttr = el.getAttribute('class') || '';
      if (classAttr.includes(cls)) {
        count++;
      }
    }
    return count;
  }, modalWindowClass);
  console.log('Number of elements with modal window class:', modalWindowCount);
  // If any found, print their outerHTML snippets
  if (backdropCount > 0) {
    const backdropHTML = await page.evaluate((cls) => {
      const els = document.querySelectorAll('div');
      for (const el of els) {
        const classAttr = el.getAttribute('class') || '';
        if (classAttr.includes(cls)) {
          return el.outerHTML;
        }
      }
      return null;
    }, backdropClass);
    console.log('Backdrop outerHTML snippet:', backdropHTML ? backdropHTML.substring(0, 500) : 'null');
  }
  if (modalWindowCount > 0) {
    const modalWindowHTML = await page.evaluate((cls) => {
      const els = document.querySelectorAll('div');
      for (const el of els) {
        const classAttr = el.getAttribute('class') || '';
        if (classAttr.includes(cls)) {
          return el.outerHTML;
        }
      }
      return null;
    }, modalWindowClass);
    console.log('Modal window outerHTML snippet:', modalWindowHTML ? modalWindowHTML.substring(0, 500) : 'null');
  }
  // Also check if any error occurred in the modal component by looking for React error boundary? Not easy.
  await browser.close();
})();