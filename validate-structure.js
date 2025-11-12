/**
 * File Structure Validation Script
 * Run with: node validate-structure.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== HYPERSTONE Website Structure Validation ===\n');

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

let allFilesExist = true;

console.log('Checking required files:\n');

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✓' : '✗';
  console.log(`${status} ${file}`);
  
  if (!exists) {
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(50) + '\n');

if (allFilesExist) {
  console.log('✓ All required files exist!');
  console.log('\nFile structure is correct and ready for deployment.');
  console.log('\nYou can now:');
  console.log('1. Open index.html directly in any browser');
  console.log('2. Deploy to static hosting (GitHub Pages, Netlify, Vercel)');
  console.log('3. Run a local server for testing');
} else {
  console.log('✗ Some required files are missing!');
  console.log('\nPlease ensure all files are in the correct locations.');
}

console.log('\n' + '='.repeat(50));
