const fs = require('fs');
const path = require('path');

// Read index.css to extract CSS variables
const indexCssPath = path.join(__dirname, 'src', 'index.css');
let indexCssContent = '';
try {
  indexCssContent = fs.readFileSync(indexCssPath, 'utf8');
} catch (err) {
  console.error(`Error reading ${indexCssPath}:`, err);
  process.exit(1);
}

// Parse CSS variables from :root and .dark
const variableRegex = /--([a-zA-Z-]+)\s*:\s*([^;]+);/g;
const variables = {}; // variable name -> value (string)
let match;
while ((match = variableRegex.exec(indexCssContent)) !== null) {
  const [, name, value] = match;
  variables[name] = value.trim();
}

// Create a map from normalized rgba string to variable name
const rgbaToVariable = {};
for (const [name, value] of Object.entries(variables)) {
  // Normalize: remove spaces and convert to lowercase for comparison
  const normalized = value.replace(/\s+/g, '').toLowerCase();
  rgbaToVariable[normalized] = `--${name}`;
}

// List of components to audit
const components = [
  'CaseStudyModal.jsx',
  'Hero.jsx',
  'ScrollProgress.jsx',
  'SelectedWork.jsx',
  'Header.jsx',
  'Footer.jsx'
];

const baseDir = path.join(__dirname, 'src', 'components');
const violations = [];
let filesAudited = 0;
let filesWithViolations = 0;

// Regex patterns
const tailwindClassPattern = /\b(text|bg|border)-polaris-[a-zA-Z]+\b/g;
const rgbaPattern = /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g;

for (const component of components) {
  const filePath = path.join(baseDir, component);
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
    filesAudited++;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    continue;
  }

  let fileHasViolation = false;
  let lineNumber = 1;

  // Process line by line
  const lines = content.split('\n');
  for (const line of lines) {
    // Check for Tailwind color classes
    let tailwindMatch;
    while ((tailwindMatch = tailwindClassPattern.exec(line)) !== null) {
      const [matchStr] = tailwindMatch;
      // This is a violation because it's using the old property name
      violations.push({
        file: path.relative(__dirname, filePath),
        line: lineNumber,
        violation: `Hardcoded Tailwind color class with old property: ${matchStr}`,
        fix: matchStr.replace('-polaris-', '-primary-')
      });
      fileHasViolation = true;
    }

    // Check for rgba() values
    let rgbaMatch;
    while ((rgbaMatch = rgbaPattern.exec(line)) !== null) {
      const [matchStr] = rgbaMatch;
      // Normalize the matched rgba string
      const normalized = matchStr.replace(/\s+/g, '').toLowerCase();
      if (rgbaToVariable[normalized]) {
        const variableName = rgbaToVariable[normalized];
        violations.push({
          file: path.relative(__dirname, filePath),
          line: lineNumber,
          violation: `Hardcoded rgba() value: ${matchStr} should use CSS variable`,
          fix: `var(${variableName})`
        });
        fileHasViolation = true;
      }
    }

    lineNumber++;
  }

  if (fileHasViolation) {
    filesWithViolations++;
  }
}

const compliancePercentage = filesAudited > 0 ? ((filesAudited - filesWithViolations) / filesAudited * 100) : 100;

// Output JSON for StructuredOutput
const result = {
  filesAudited,
  violationsFound: violations.length,
  violations,
  compliancePercentage: parseFloat(compliancePercentage.toFixed(2))
};

console.log(JSON.stringify(result, null, 2));