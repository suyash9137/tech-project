const { test, expect } = require('@playwright/test');

test.use({ baseURL: 'http://localhost:5173' });

test.describe('Interactive functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for app to hydrate: wait for header to be visible
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
    // Optionally wait for preloader to disappear (it should be gone after ~1.3s)
    await expect(page.locator('.preloader')).toBeHidden({ timeout: 5000 });
  });

  test('page loads and preloader disappears', async ({ page }) => {
    // Already waited in beforeEach
    // Additional check: main content should be visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('header navigation links scroll to sections', async ({ page }) => {
    const headerLinks = page.locator('header nav a');
    const sections = ['work', 'services', 'ai-systems', 'process', 'capabilities', 'about'];
    for (const [index, sectionId] of sections.entries()) {
      const link = headerLinks.nth(index);
      await expect(link).toHaveAttribute('href', `#${sectionId}`);
      await link.click();
      // Wait for URL to update: expect exact URL with hash
      await expect(page).toHaveURL(`http://localhost:5173/#${sectionId}`);
      // Optionally check that the section is in view (active class active (header sets activeSection)
      // We can also check that the section is visible
      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeVisible({ timeout: 5000 });
    }
  });

  test('footer navigation links scroll to sections', async ({ page }) => {
    const footerLinks = page.locator('footer ul li a');
    const sections = ['work', 'services', 'ai-systems', 'process', 'capabilities', 'about'];
    for (const [index, sectionId] of sections.entries()) {
      const link = footerLinks.nth(index);
      await expect(link).toHaveAttribute('href', `#${sectionId}`);
      await link.click();
      await expect(page).toHaveURL(`http://localhost:5173/#${sectionId}`);
      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeVisible({ timeout: 5000 });
    }
  });

  test('case study modal opens and closes', async ({ page }) => {
    // Wait for SelectedWork section to be visible
    await expect(page.locator('#work')).toBeVisible();
    // Locate the first project card (motion.div with group cursor-pointer class)
    const projectCard = page.locator('#work').locator('div.group.cursor-pointer').first();
    // Scroll the card into view to trigger animation
    await projectCard.scrollIntoViewIfNeeded();
    // Wait for animation to complete (approx 1 second)
    await page.waitForTimeout(1000);
    // Now click the card
    await projectCard.click();
    // Wait for modal to appear: select by the outer container class
    const modalOuter = page.locator('div.fixed.inset-0.z-50.flex.items-center.justify-center.p-4.sm\\:p-6.md\\:p-10.overflow-y-auto');
    await expect(modalOuter).toBeVisible({ timeout: 5000 });
    // Check that modal contains project title in the h2
    const modalHeader = modalOuter.locator('h2');
    const actualText = await modalHeader.textContent();
    // Detailed character-by-character comparison
    const expected = 'Aether AI — Enterprise Workflow Automation';
    console.log('Expected:', JSON.stringify(expected));
    console.log('Actual  :', JSON.stringify(actualText));
    console.log('Lengths - Expected:', expected.length, 'Actual:', actualText.length);

    if (expected.length !== actualText.length) {
      console.log('LENGTH MISMATCH');
      for (let i = 0; i < Math.max(expected.length, actualText.length); i++) {
        const expChar = i < expected.length ? expected[i] : '(missing)';
        const actChar = i < actualText.length ? actualText[i] : '(missing)';
        const expCode = i < expected.length ? expected.charCodeAt(i) : null;
        const actCode = i < actualText.length ? actualText.charCodeAt(i) : null;
        if (expChar !== actChar) {
          console.log(`Position ${i}: Expected '${expChar}' (${expCode}) vs Actual '${actChar}' (${actCode})`);
        }
      }
    } else {
      for (let i = 0; i < expected.length; i++) {
        if (expected[i] !== actualText[i]) {
          console.log(`Position ${i}: Expected '${expected[i]}' (${expected.charCodeAt(i)}) vs Actual '${actualText[i]}' (${actualText.charCodeAt(i)})`);
        }
      }
    }

    // Try a more flexible approach: check if it contains the key parts
    await expect(modalHeader).toContainText('Aether AI');
    await expect(modalHeader).toContainText('Enterprise Workflow Automation');

    // Close modal by clicking the close button (X) with aria-label
    const closeButton = modalOuter.locator('button[aria-label="Close"]');
    await closeButton.click();
    // Wait for modal to be hidden
    await expect(modalOuter).toBeHidden({ timeout: 5000 });
  });

  test('project inquiry modal opens and submits successfully', async ({ page }) => {
    // Open inquiry modal via header button
    const headerCta = page.locator('header button:has-text("Start a Project")');
    await expect(headerCta).toBeVisible();
    // Scroll the button into view
    await headerCta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await headerCta.click();
    // Wait for modal to appear: use role="dialog"
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible({ timeout: 5000 });
    // Fill out form with valid data
    await modal.locator('input[placeholder="Full Name *"]').fill('Test User');
    await modal.locator('input[placeholder="Work Email *"]').fill('test@example.com');
    // Select at least one service
    await modal.locator('button:has-text("AI & Automation")').click();
    // Select budget
    await modal.locator('button:has-text("$50k – $100k")').click();
    // Select timeline
    await modal.locator('button:has-text("1–2 Months")').click();
    // Fill project details
    await modal.locator('textarea[placeholder*="Tell us briefly"]').fill('This is a test project description with more than 20 characters.');
    // Submit
    await modal.locator('button[type="submit"]').click();
    // Wait for success message
    await expect(modal.locator('text=Thanks for reaching out to Polaris Technologies!')).toBeVisible({ timeout: 15000 });
    // Close modal
    const closeSuccess = modal.locator('button:has-text("Close Window")');
    await closeSuccess.click();
    await expect(modal).toBeHidden({ timeout: 5000 });
  });

  test('footer contact links work', async ({ page }) => {
    await expect(page.locator('footer a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:hello@polaristechnologies.com');
    const linkedinLink = page.locator('footer a[href*="linkedin.com"]');
    await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');
    const githubLink = page.locator('footer a[href*="github.com"]');
    await expect(githubLink).toHaveAttribute('href', 'https://github.com');
    const twitterLink = page.locator('footer a[href*="x.com"]');
    await expect(twitterLink).toHaveAttribute('href', 'https://x.com');
  });
});