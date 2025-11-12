/**
 * Deployment Validation Script
 * Validates HTML files, CDN links, and file references
 * Run with: node validate-deployment.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== HYPERSTONE Website Deployment Validation ===\n');

let allTestsPassed = true;

// Test 1: Check file structure
console.log('Test 1: File Structure');
const requiredFiles = [
  'index.html',
  'product.html',
  'css/styles.css',
  'js/app.js',
  'js/data.js',
  'js/i18n.js',
  'js/navigation.js',
  'js/infinite-scroll.js',
  'js/animations.js',
  'js/product-detail.js'
];

let filesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.log(`  ✗ Missing: ${file}`);
    filesExist = false;
    allTestsPassed = false;
  }
});

if (filesExist) {
  console.log('  ✓ All required files exist\n');
} else {
  console.log('  ✗ Some files are missing\n');
}

// Test 2: Validate HTML files
console.log('Test 2: HTML Validation');

function validateHTML(filename) {
  const filePath = path.join(__dirname, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const checks = {
    'DOCTYPE': content.includes('<!DOCTYPE html>'),
    'HTML lang': content.includes('<html lang='),
    'Meta charset': content.includes('<meta charset="UTF-8">'),
    'Meta viewport': content.includes('<meta name="viewport"'),
    'Title tag': content.includes('<title>'),
    'Tailwind CDN': content.includes('cdn.tailwindcss.com'),
    'Google Fonts': content.includes('fonts.googleapis.com'),
    'Audiowide font': content.includes('Audiowide'),
    'Custom CSS': content.includes('css/styles.css')
  };
  
  console.log(`  ${filename}:`);
  let allPassed = true;
  for (const [check, passed] of Object.entries(checks)) {
    console.log(`    ${passed ? '✓' : '✗'} ${check}`);
    if (!passed) {
      allPassed = false;
      allTestsPassed = false;
    }
  }
  
  return allPassed;
}

validateHTML('index.html');
validateHTML('product.html');
console.log();

// Test 3: Check JavaScript file references
console.log('Test 3: JavaScript File References');

function checkJSReferences(filename) {
  const filePath = path.join(__dirname, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const jsFiles = [
    'js/data.js',
    'js/i18n.js',
    'js/navigation.js'
  ];
  
  let allFound = true;
  jsFiles.forEach(jsFile => {
    if (!content.includes(jsFile)) {
      console.log(`  ✗ ${filename} missing reference to ${jsFile}`);
      allFound = false;
      allTestsPassed = false;
    }
  });
  
  return allFound;
}

const indexJSCheck = checkJSReferences('index.html');
const productJSCheck = checkJSReferences('product.html');

if (indexJSCheck && productJSCheck) {
  console.log('  ✓ All JavaScript references are correct\n');
}

// Test 4: Check for absolute paths (should use relative paths)
console.log('Test 4: Relative Path Validation');

function checkForAbsolutePaths(filename) {
  const filePath = path.join(__dirname, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for common absolute path patterns (excluding CDN URLs)
  const absolutePathPatterns = [
    /src=["']\/[^h]/g,  // /path (not http)
    /href=["']\/[^h]/g, // /path (not http)
    /src=["']C:\\/g,    // C:\ Windows path
    /href=["']C:\\/g    // C:\ Windows path
  ];
  
  let hasAbsolutePaths = false;
  absolutePathPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      hasAbsolutePaths = true;
    }
  });
  
  return !hasAbsolutePaths;
}

const indexPathCheck = checkForAbsolutePaths('index.html');
const productPathCheck = checkForAbsolutePaths('product.html');

if (indexPathCheck && productPathCheck) {
  console.log('  ✓ All paths are relative (no absolute paths found)\n');
} else {
  console.log('  ✗ Some absolute paths found (should use relative paths)\n');
  allTestsPassed = false;
}

// Test 5: Check data.js for required data
console.log('Test 5: Data Integrity');

const dataPath = path.join(__dirname, 'js/data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

const dataChecks = {
  'Products array': dataContent.includes('const products = ['),
  'Company info': dataContent.includes('const companyInfo = {'),
  'getProducts function': dataContent.includes('function getProducts()'),
  'getProductBySlug function': dataContent.includes('function getProductBySlug('),
  'getCompanyInfo function': dataContent.includes('function getCompanyInfo()'),
  'Business registration': dataContent.includes('336-87-03585'),
  'CEO name': dataContent.includes('심철훈'),
  'Phone number': dataContent.includes('010-8900-5863'),
  'Email': dataContent.includes('hyperstone@hyperstone.co.kr')
};

let dataValid = true;
for (const [check, passed] of Object.entries(dataChecks)) {
  console.log(`  ${passed ? '✓' : '✗'} ${check}`);
  if (!passed) {
    dataValid = false;
    allTestsPassed = false;
  }
}
console.log();

// Test 6: Check i18n.js for translations
console.log('Test 6: Internationalization');

const i18nPath = path.join(__dirname, 'js/i18n.js');
const i18nContent = fs.readFileSync(i18nPath, 'utf8');

const i18nChecks = {
  'Translations object': i18nContent.includes('const translations = {'),
  'Korean translations': i18nContent.includes('ko: {'),
  'English translations': i18nContent.includes('en: {'),
  'getCurrentLanguage function': i18nContent.includes('function getCurrentLanguage()'),
  'setLanguage function': i18nContent.includes('function setLanguage('),
  't function': i18nContent.includes('function t('),
  'LocalStorage support': i18nContent.includes('localStorage')
};

let i18nValid = true;
for (const [check, passed] of Object.entries(i18nChecks)) {
  console.log(`  ${passed ? '✓' : '✗'} ${check}`);
  if (!passed) {
    i18nValid = false;
    allTestsPassed = false;
  }
}
console.log();

// Test 7: Check CSS for brand colors
console.log('Test 7: Brand Styling');

const cssPath = path.join(__dirname, 'css/styles.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const brandColors = [
  '#0082FB',
  '#0064E0',
  '#F1F5F8',
  '#1C2B33'
];

let colorsValid = true;
brandColors.forEach(color => {
  const found = cssContent.includes(color);
  console.log(`  ${found ? '✓' : '✗'} Brand color ${color}`);
  if (!found) {
    colorsValid = false;
    allTestsPassed = false;
  }
});

const audiowideCheck = cssContent.includes('Audiowide');
console.log(`  ${audiowideCheck ? '✓' : '✗'} Audiowide font reference`);
if (!audiowideCheck) {
  allTestsPassed = false;
}
console.log();

// Final Summary
console.log('='.repeat(50));
console.log('\n=== Validation Summary ===\n');

if (allTestsPassed) {
  console.log('✓ ALL TESTS PASSED!');
  console.log('\nThe website is ready for deployment.');
  console.log('\nDeployment options:');
  console.log('1. Open index.html directly in any browser');
  console.log('2. Deploy to GitHub Pages');
  console.log('3. Deploy to Netlify');
  console.log('4. Deploy to Vercel');
  console.log('5. Run local server: python -m http.server 8000');
  console.log('\nTo test:');
  console.log('- Open final-integration-test.html in a browser');
  console.log('- Run automated tests');
  console.log('- Complete manual checklist');
} else {
  console.log('✗ SOME TESTS FAILED');
  console.log('\nPlease review the errors above and fix them before deployment.');
}

console.log('\n' + '='.repeat(50));
