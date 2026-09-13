const fs = require('fs');
const path = require('path');

// Read the audit results file
const auditResults = JSON.parse(fs.readFileSync('audit-results.json', 'utf8'));

// Extract viewports and screenshots
const viewports = auditResults.viewports.map(vp => {
  return {
    label: vp.label,
    width: vp.width,
    height: vp.height,
    screenshotBase64: vp.screenshotBase64
  };
});

// Create a summary without the screenshots for display
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

// Create HTML
let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Polaris Technologies Audit Report</title>
    <style>
        body { font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #2c3e50; }
        .viewport { margin-bottom: 40px; page-break-inside: avoid; }
        .viewport img { max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 4px; margin-bottom: 30px; }
        .summary h2 { margin-top: 0; }
        .summary pre { background: #fff; padding: 10px; border-radius: 4px; overflow-x: auto; }
        .section { margin-bottom: 20px; }
        .section h3 { border-bottom: 1px solid #eee; padding-bottom: 5px; }
    </style>
</head>
<body>
    <h1>Polaris Technologies Audit Report</h1>
    <div class="summary">
        <h2>Audit Summary</h2>
        <div class="section">
            <h3>Viewports</h3>
            <pre>${JSON.stringify(summary.viewports, null, 2)}</pre>
        </div>
        <div class="section">
            <h3>ColorPalette (CSS Variables)</h3>
            <pre>${JSON.stringify(summary.colorPalette, null, 2)}</pre>
        </div>
        <div class="section">
            <h3>Font Families</h3>
            <pre>${JSON.stringify(summary.fontFamilies, null, 2)}</pre>
        </div>
        <div class="section">
            <h3>Font Sizes</h3>
            <pre>${JSON.stringify(summary.fontSizes, null, 2)}</pre>
        </div>
        <div class="section">
            <h3>Components (by tag)</h3>
            <pre>${JSON.stringify(summary.components, null, 2)}</pre>
        </div>
        <div class="section">
            <h3>Accessibility Tree</h3>
            <pre>${summary.accessibilityTree ? JSON.stringify(summary.accessibilityTree, null, 2) : 'Null (error retrieving)'}</pre>
        </div>
        <div class="section">
            <h3>Copy (Headline, Subhead, Section Titles, etc.)</h3>
            <pre>${JSON.stringify(summary.copy, null, 2)}</pre>
        </div>
        <div class="section">
            <h3>Performance Metrics</h3>
            <pre>${JSON.stringify(summary.performance, null, 2)}</pre>
        </div>
    </div>

    <h2>Screenshots</h2>
    ${viewports.map(vp => `
        <div class="viewport">
            <h3>${vp.label.toUpperCase()} (${vp.width}×${vp.height})</h3>
            <img src="data:image/png;base64,${vp.screenshotBase64}" alt="${vp.label} screenshot">
        </div>
    `).join('')}
</body>
</html>
`;

fs.writeFileSync('audit-report.html', html);
console.log('Audit report written to audit-report.html');