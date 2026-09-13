const fs = require('fs');
const auditResults = JSON.parse(fs.readFileSync('audit-results.json', 'utf8'));

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

console.log(JSON.stringify(summary, null, 2));