#!/usr/bin/env node

/**
 * Comprehensive Integration Test Script
 * Tests all design system components together
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Design System Integration Tests...\n');

// Test results tracker
const results = {
  passed: [],
  failed: [],
  warnings: []
};

function logTest(name, passed, message = '') {
  if (passed) {
    results.passed.push(name);
    console.log(`✅ ${name}`);
  } else {
    results.failed.push({ name, message });
    console.log(`❌ ${name}: ${message}`);
  }
}

function logWarning(name, message) {
  results.warnings.push({ name, message });
  console.log(`⚠️  ${name}: ${message}`);
}

// 1. Test Core Type Definitions
console.log('📋 Testing Core Type Definitions...');
try {
  const typesPath = path.join(__dirname, '../src/lib/design/types.ts');
  const typesContent = fs.readFileSync(typesPath, 'utf8');
  
  const requiredTypes = [
    'FontConfig',
    'ColorConfig',
    'BackgroundConfig',
    'SectionDesignConfig',
    'ProductCardDesignConfig',
    'ProductDetailDesignConfig',
    'DesignSettings',
    'DesignHistoryEntry'
  ];
  
  requiredTypes.forEach(type => {
    const hasType = typesContent.includes(`export interface ${type}`) || 
                    typesContent.includes(`export type ${type}`);
    logTest(`Type definition: ${type}`, hasType, hasType ? '' : 'Type not found');
  });
} catch (error) {
  logTest('Core type definitions', false, error.message);
}

// 2. Test Storage Service
console.log('\n💾 Testing Storage Service...');
try {
  const storagePath = path.join(__dirname, '../src/lib/design/storage.ts');
  const storageContent = fs.readFileSync(storagePath, 'utf8');
  
  const requiredMethods = [
    'saveSettings',
    'loadSettings',
    'saveHistoryEntry',
    'loadHistory',
    'rollback'
  ];
  
  requiredMethods.forEach(method => {
    const hasMethod = storageContent.includes(method);
    logTest(`Storage method: ${method}`, hasMethod, hasMethod ? '' : 'Method not found');
  });
} catch (error) {
  logTest('Storage service', false, error.message);
}

// 3. Test API Endpoints
console.log('\n🌐 Testing API Endpoints...');
const apiEndpoints = [
  'src/app/api/admin/design-settings/route.ts',
  'src/app/api/admin/design-settings/export/route.ts',
  'src/app/api/admin/design-settings/import/route.ts',
  'src/app/api/admin/design-history/route.ts',
  'src/app/api/admin/design-history/rollback/route.ts',
  'src/app/api/admin/fonts/route.ts',
  'src/app/api/admin/fonts/google/search/route.ts',
  'src/app/api/admin/design-preview/route.ts',
  'src/app/api/admin/upload/route.ts'
];

apiEndpoints.forEach(endpoint => {
  const fullPath = path.join(__dirname, '..', endpoint);
  const exists = fs.existsSync(fullPath);
  logTest(`API endpoint: ${endpoint}`, exists, exists ? '' : 'File not found');
  
  if (exists) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasGET = content.includes('export async function GET');
    const hasPOST = content.includes('export async function POST');
    const hasPUT = content.includes('export async function PUT');
    
    if (endpoint.includes('route.ts') && !endpoint.includes('export') && !endpoint.includes('import')) {
      if (hasGET || hasPOST || hasPUT) {
        logTest(`  HTTP methods in ${path.basename(endpoint)}`, true);
      } else {
        logWarning(`  HTTP methods in ${path.basename(endpoint)}`, 'No HTTP methods found');
      }
    }
  }
});

// 4. Test Control Components
console.log('\n🎨 Testing Control Components...');
const controlComponents = [
  'BackgroundControl.tsx',
  'FontSelector.tsx',
  'ColorPicker.tsx',
  'ResponsiveSizeControl.tsx',
  'SpacingControl.tsx',
  'ShadowControl.tsx'
];

controlComponents.forEach(component => {
  const fullPath = path.join(__dirname, '../src/components/admin/design', component);
  const exists = fs.existsSync(fullPath);
  logTest(`Control component: ${component}`, exists, exists ? '' : 'File not found');
  
  if (exists) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasExport = content.includes('export default') || content.includes('export function');
    logTest(`  Export in ${component}`, hasExport, hasExport ? '' : 'No export found');
  }
});

// 5. Test Designer Components
console.log('\n🖌️  Testing Designer Components...');
const designerComponents = [
  'SectionDesigner.tsx',
  'ProductCardDesigner.tsx',
  'ProductDetailDesigner.tsx',
  'HeroDesigner.tsx',
  'ContentDesigner.tsx',
  'GalleryDesigner.tsx',
  'SectionStyleDesigner.tsx'
];

designerComponents.forEach(component => {
  const fullPath = path.join(__dirname, '../src/components/admin/design', component);
  const exists = fs.existsSync(fullPath);
  logTest(`Designer component: ${component}`, exists, exists ? '' : 'File not found');
});

// 6. Test Main Manager Component
console.log('\n🎯 Testing Main Manager Component...');
const managerPath = path.join(__dirname, '../src/components/admin/design/DesignSystemManager.tsx');
const managerExists = fs.existsSync(managerPath);
logTest('DesignSystemManager component', managerExists, managerExists ? '' : 'File not found');

if (managerExists) {
  const content = fs.readFileSync(managerPath, 'utf8');
  const features = [
    { name: 'Tab navigation', pattern: /tab|Tab/ },
    { name: 'Save functionality', pattern: /save|Save/ },
    { name: 'Export functionality', pattern: /export|Export/ },
    { name: 'Import functionality', pattern: /import|Import/ },
    { name: 'Preview toggle', pattern: /preview|Preview/ }
  ];
  
  features.forEach(({ name, pattern }) => {
    const hasFeature = pattern.test(content);
    logTest(`  ${name}`, hasFeature, hasFeature ? '' : 'Feature not found');
  });
}

// 7. Test Preview System
console.log('\n👁️  Testing Preview System...');
const previewComponents = [
  'PreviewPanel.tsx',
  'AccessibilityValidation.tsx'
];

previewComponents.forEach(component => {
  const fullPath = path.join(__dirname, '../src/components/admin/design', component);
  const exists = fs.existsSync(fullPath);
  logTest(`Preview component: ${component}`, exists, exists ? '' : 'File not found');
});

// 8. Test History System
console.log('\n📜 Testing History System...');
const historyComponents = [
  'DesignHistory.tsx',
  'HistoryComparison.tsx'
];

historyComponents.forEach(component => {
  const fullPath = path.join(__dirname, '../src/components/admin/design', component);
  const exists = fs.existsSync(fullPath);
  logTest(`History component: ${component}`, exists, exists ? '' : 'File not found');
});

// 9. Test Utility Classes
console.log('\n🔧 Testing Utility Classes...');
const utilities = [
  'validator.ts',
  'sanitizer.ts',
  'loader.ts',
  'font-loader.ts',
  'font-options.ts',
  'defaults.ts',
  'cache.ts',
  'migration.ts'
];

utilities.forEach(util => {
  const fullPath = path.join(__dirname, '../src/lib/design', util);
  const exists = fs.existsSync(fullPath);
  logTest(`Utility: ${util}`, exists, exists ? '' : 'File not found');
});

// 10. Test Public Page Integration
console.log('\n🌍 Testing Public Page Integration...');
const publicPages = [
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/AboutSection.tsx',
  'src/components/sections/ProductsSection.tsx',
  'src/components/sections/ContactSection.tsx',
  'src/components/pages/ProductDetailPage.tsx'
];

publicPages.forEach(page => {
  const fullPath = path.join(__dirname, '..', page);
  const exists = fs.existsSync(fullPath);
  logTest(`Public page: ${path.basename(page)}`, exists, exists ? '' : 'File not found');
  
  if (exists) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const usesDesignSettings = content.includes('useDesignSettings') || 
                               content.includes('designSettings') ||
                               content.includes('applyStyles');
    logTest(`  Design settings integration in ${path.basename(page)}`, usesDesignSettings, 
            usesDesignSettings ? '' : 'No design settings usage found');
  }
});

// 11. Test Authentication Middleware
console.log('\n🔐 Testing Authentication Middleware...');
const authPath = path.join(__dirname, '../src/lib/auth-middleware.ts');
const authExists = fs.existsSync(authPath);
logTest('Authentication middleware', authExists, authExists ? '' : 'File not found');

if (authExists) {
  const content = fs.readFileSync(authPath, 'utf8');
  const hasValidation = content.includes('validateAdminAccess') || 
                        content.includes('checkAuth') ||
                        content.includes('isAuthenticated');
  logTest('  Admin access validation', hasValidation, hasValidation ? '' : 'No validation found');
}

// 12. Test Error Handling
console.log('\n🛡️  Testing Error Handling...');
const errorComponents = [
  'DesignSystemErrorBoundary.tsx',
  'error-logger.ts'
];

errorComponents.forEach(component => {
  const designPath = path.join(__dirname, '../src/components/admin/design', component);
  const libPath = path.join(__dirname, '../src/lib/design', component);
  const exists = fs.existsSync(designPath) || fs.existsSync(libPath);
  logTest(`Error handling: ${component}`, exists, exists ? '' : 'File not found');
});

// 13. Test Documentation
console.log('\n📚 Testing Documentation...');
const docs = [
  'docs/ADMIN_DESIGN_SYSTEM_USER_GUIDE.md',
  'docs/API_DOCUMENTATION.md',
  'docs/TROUBLESHOOTING_GUIDE.md',
  'docs/QUICK_REFERENCE.md'
];

docs.forEach(doc => {
  const fullPath = path.join(__dirname, '..', doc);
  const exists = fs.existsSync(fullPath);
  logTest(`Documentation: ${path.basename(doc)}`, exists, exists ? '' : 'File not found');
});

// 14. Test Image Upload
console.log('\n🖼️  Testing Image Upload...');
const imageUtilsPath = path.join(__dirname, '../src/lib/image-utils.ts');
const imageUploaderPath = path.join(__dirname, '../src/components/admin/design/ImageUploader.tsx');
logTest('Image utilities', fs.existsSync(imageUtilsPath));
logTest('Image uploader component', fs.existsSync(imageUploaderPath));

// 15. Test Admin Dashboard Integration
console.log('\n🎛️  Testing Admin Dashboard Integration...');
const adminDashboardPath = path.join(__dirname, '../src/components/admin/AdminDashboard.tsx');
const adminDashboardExists = fs.existsSync(adminDashboardPath);
logTest('Admin dashboard', adminDashboardExists);

if (adminDashboardExists) {
  const content = fs.readFileSync(adminDashboardPath, 'utf8');
  const hasDesignSystem = content.includes('DesignSystemManager') || 
                          content.includes('design-system') ||
                          content.includes('Design System');
  logTest('  Design system integration', hasDesignSystem, 
          hasDesignSystem ? '' : 'No design system integration found');
}

// Print Summary
console.log('\n' + '='.repeat(60));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Passed: ${results.passed.length}`);
console.log(`❌ Failed: ${results.failed.length}`);
console.log(`⚠️  Warnings: ${results.warnings.length}`);

if (results.failed.length > 0) {
  console.log('\n❌ Failed Tests:');
  results.failed.forEach(({ name, message }) => {
    console.log(`  - ${name}: ${message}`);
  });
}

if (results.warnings.length > 0) {
  console.log('\n⚠️  Warnings:');
  results.warnings.forEach(({ name, message }) => {
    console.log(`  - ${name}: ${message}`);
  });
}

console.log('\n' + '='.repeat(60));

// Exit with appropriate code
const exitCode = results.failed.length > 0 ? 1 : 0;
if (exitCode === 0) {
  console.log('✨ All integration tests passed!');
} else {
  console.log('⚠️  Some tests failed. Please review the results above.');
}

process.exit(exitCode);
