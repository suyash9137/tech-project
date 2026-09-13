const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = 'http://localhost:5173/';
  const viewports = [
    { width: 1440, height: 900, label: 'desktop' },
    { width: 834, height: 1194, label: 'tablet' },
    { width: 390, height: 844, label: 'mobile' }
  ];

  let auditResults = {
    viewports: [],
    colorPalette: null,
    fontFamilies: null,
    fontSizes: null,
    spacingScale: null,
    breakpoints: null,
    components: {},
    accessibilityTree: null,
    copy: {
      heroHeadline: null,
      heroSubhead: null,
      sectionTitles: [],
      serviceDescriptions: [],
      ctaLabels: [],
      footerContent: null
    },
    performance: null
  };

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: 'networkidle' });

    // Take screenshot
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    const screenshotBase64 = screenshotBuffer.toString('base64');
    auditResults.viewports.push({
      label: vp.label,
      width: vp.width,
      height: vp.height,
      screenshotBase64
    });

    // Extract computed styles for color palette, font, spacing
    // We'll do this once for the desktop viewport, assuming it's representative
    if (vp.label === 'desktop') {
      // Get computed styles of the body for background color, font, etc.
      const bodyStyles = await page.evaluate(() => {
        const body = document.body;
        const computed = window.getComputedStyle(body);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize
        };
      });

      // We'll also try to get the root element for CSS variables
      const rootStyles = await page.evaluate(() => {
        const root = document.documentElement;
        const computed = window.getComputedStyle(root);
        // Get all CSS variables
        const style = {};
        for (let i = 0; i < computed.length; i++) {
          const prop = computed[i];
          if (prop.startsWith('--')) {
            style[prop] = computed.getPropertyValue(prop);
          }
        }
        return style;
      });

      auditResults.colorPalette = rootStyles; // This will contain all CSS variables, we can filter later
      auditResults.fontFamilies = { body: bodyStyles.fontFamily };
      auditResults.fontSizes = { body: bodyStyles.fontSize };

      // Try to get spacing scale by looking at a known element? We'll skip for now and note that we need to infer from components.
    }

    // Extract component structure: we'll try to get the main sections
    const sections = await page.evaluate(() => {
      const sectionSelectors = ['nav', 'header', 'main', 'section', 'footer'];
      const sections = {};
      sectionSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length) {
          sections[selector] = Array.from(elements).map(el => {
            return {
              tagName: el.tagName,
              className: el.className,
              id: el.id,
              innerText: el.innerText.slice(0, 100) // limit text
            };
          });
        }
      });
      return sections;
    });

    // Merge components found
    for (const [key, value] of Object.entries(sections)) {
      if (!auditResults.components[key]) {
        auditResults.components[key] = [];
      }
      auditResults.components[key].push(...value);
    }

    // Extract copy for desktop viewport only
    if (vp.label === 'desktop') {
      const copy = await page.evaluate(() => {
        // Hero headline and subhead: we assume they are in the first section or header
        const hero = document.querySelector('header, section.hero, section#hero') || document.body;
        const headline = hero.querySelector('h1')?.innerText.trim() || '';
        const subhead = hero.querySelector('h2, p.lead')?.innerText.trim() || '';

        // Section titles: all h2 elements
        const sectionTitles = Array.from(document.querySelectorAll('h2')).map(h2 => h2.innerText.trim());

        // Service descriptions: we look for common patterns, but for now we'll get all p elements in sections
        const serviceDescriptions = Array.from(document.querySelectorAll('section p')).map(p => p.innerText.trim());

        // CTA labels: all button and a elements that look like CTAs
        const ctaLabels = Array.from(document.querySelectorAll('button, a')).map(el => {
          const text = el.innerText.trim();
          // Filter out empty and very long text
          if (text && text.length < 50) {
            return text;
          }
          return null;
        }).filter(Boolean);

        // Footer content: the entire footer innerText
        const footer = document.querySelector('footer');
        const footerContent = footer ? footer.innerText.trim() : '';

        return {
          headline,
          subhead,
          sectionTitles,
          serviceDescriptions,
          ctaLabels,
          footerContent
        };
      });

      auditResults.copy = copy;
    }

    // Accessibility tree
    if (vp.label === 'desktop') {
      try {
        const accessibilityTree = await page.accessibility.snapshot();
        auditResults.accessibilityTree = accessibilityTree;
      } catch (e) {
        console.error('Failed to get accessibility tree:', e.message);
        auditResults.accessibilityTree = null;
      }
    }

    // Performance: we can use page.evaluate to get performance navigation timing
    if (vp.label === 'desktop') {
      const performance = await page.evaluate(() => {
        const perf = window.performance.timing;
        const loadTime = perf.loadEventEnd - perf.navigationStart;
        return {
          loadTime: loadTime,
          // We can also get other metrics if needed
          domContentLoaded: perf.domContentLoadedEventEnd - perf.navigationStart
        };
      });
      auditResults.performance = performance;
    }
  }

  await browser.close();

  // Write the full results to a file
  fs.writeFileSync('audit-results.json', JSON.stringify(auditResults, null, 2));
  console.log('Audit results written to audit-results.json');

  // Also output a summary without the screenshots
  const summary = {
    viewports: auditResults.viewports.map(vp => ({ label: vp.label, width: vp.width, height: vp.height })),
    colorPalette: auditResults.colorPalette,
    fontFamilies: auditResults.fontFamilies,
    fontSizes: auditResults.fontSizes,
    components: auditResults.components,
    accessibilityTree: auditResults.accessibilityTree,
    copy: auditResults.copy,
    performance: auditResults.performance
  };
  console.log('Summary:');
  console.log(JSON.stringify(summary, null, 2));
})();