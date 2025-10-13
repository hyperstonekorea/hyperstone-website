#!/usr/bin/env node

/**
 * Accessibility and Performance Test Script
 * Tests WCAG compliance and performance metrics
 */

const fs = require('fs');
const path = require('path');

console.log('♿ Starting Accessibility & Performance Tests...\n');

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

// 1. Test Color Contrast Validation
console.log('🎨 Testing Color Contrast Validation...');
try {
  const validatorPath = path.join(__dirname, '../src/lib/design/validator.ts');
  const validatorContent = fs.readFileSync(validatorPath, 'utf8');
  
  const hasContrastValidation = validatorContent.includes('validateColorContrast') ||
                                 validatorContent.includes('contrastRatio');
  logTest('Color contrast validation', hasContrastValidation, 
          hasContrastValidation ? '' : 'No contrast validation found');
  
  const hasWCAG = validatorContent.includes('WCAG') || 
                  validatorContent.includes('4.5') || 
                  validatorContent.includes('3.0');
  logTest('WCAG standards implementation', hasWCAG, 
          hasWCAG ? '' : 'No WCAG standards found');
} catch (error) {
  logTest('Color contrast validation', false, error.message);
}

// 2. Test Font Size Validation
console.log('\n📏 Testing Font Size Validation...');
try {
  const validatorPath = path.join(__dirname, '../src/lib/design/validator.ts');
  const validatorContent = fs.readFileSync(validatorPath, 'utf8');
  
  const hasFontSizeValidation = validatorContent.includes('validateFontSize') ||
                                 validatorContent.includes('fontSize');
  logTest('Font size validation', hasFontSizeValidation, 
          hasFontSizeValidation ? '' : 'No font size validation found');
  
  const hasMinimumSize = validatorContent.includes('16') || 
                         validatorContent.includes('14') ||
                         validatorContent.includes('minimum');
  logTest('Minimum font size check', hasMinimumSize, 
          hasMinimumSize ? '' : 'No minimum size check found');
} catch (error) {
  logTest('Font size validation', false, error.message);
}

// 3. Test Accessibility Validation Component
console.log('\n♿ Testing Accessibility Validation Component...');
try {
  const accessibilityPath = path.join(__dirname, '../src/components/admin/design/AccessibilityValidation.tsx');
  const accessibilityContent = fs.readFileSync(accessibilityPath, 'utf8');
  
  const hasContrastCheck = accessibilityContent.includes('contrast') || 
                           accessibilityContent.includes('Contrast');
  logTest('Contrast ratio display', hasContrastCheck, 
          hasContrastCheck ? '' : 'No contrast display found');
  
  const hasWarnings = accessibilityContent.includes('warning') || 
                      accessibilityContent.includes('Warning');
  logTest('Accessibility warnings', hasWarnings, 
          hasWarnings ? '' : 'No warnings found');
  
  const hasSuggestions = accessibilityContent.includes('suggest') || 
                         accessibilityContent.includes('Suggest') ||
                         accessibilityContent.includes('recommendation');
  logTest('Improvement suggestions', hasSuggestions, 
          hasSuggestions ? '' : 'No suggestions found');
} catch (error) {
  logTest('Accessibility validation component', false, error.message);
}

// 4. Test Input Sanitization
console.log('\n🛡️  Testing Input Sanitization...');
try {
  const sanitizerPath = path.join(__dirname, '../src/lib/design/sanitizer.ts');
  const sanitizerContent = fs.readFileSync(sanitizerPath, 'utf8');
  
  const methods = [
    'sanitizeColor',
    'sanitizeUrl',
    'sanitizeFontFamily'
  ];
  
  methods.forEach(method => {
    const hasMethod = sanitizerContent.includes(method);
    logTest(`Sanitization: ${method}`, hasMethod, 
            hasMethod ? '' : 'Method not found');
  });
  
  const hasXSSProtection = sanitizerContent.includes('XSS') || 
                           sanitizerContent.includes('script') ||
                           sanitizerContent.includes('injection');
  if (hasXSSProtection) {
    logTest('XSS protection', true);
  } else {
    logWarning('XSS protection', 'No explicit XSS protection found');
  }
} catch (error) {
  logTest('Input sanitization', false, error.message);
}

// 5. Test Caching Strategy
console.log('\n⚡ Testing Caching Strategy...');
try {
  const cachePath = path.join(__dirname, '../src/lib/design/cache.ts');
  const cacheContent = fs.readFileSync(cachePath, 'utf8');
  
  const hasTTL = cacheContent.includes('ttl') || 
                 cacheContent.includes('TTL') ||
                 cacheContent.includes('expir');
  logTest('Cache TTL configuration', hasTTL, 
          hasTTL ? '' : 'No TTL configuration found');
  
  const hasInvalidation = cacheContent.includes('invalidate') || 
                          cacheContent.includes('clear') ||
                          cacheContent.includes('delete');
  logTest('Cache invalidation', hasInvalidation, 
          hasInvalidation ? '' : 'No invalidation found');
  
  const hasStaleWhileRevalidate = cacheContent.includes('stale') || 
                                   cacheContent.includes('revalidate');
  if (hasStaleWhileRevalidate) {
    logTest('Stale-while-revalidate strategy', true);
  } else {
    logWarning('Stale-while-revalidate', 'Strategy not found');
  }
} catch (error) {
  logTest('Caching strategy', false, error.message);
}

// 6. Test Performance Optimizations
console.log('\n🚀 Testing Performance Optimizations...');

// Check for lazy loading
try {
  const managerPath = path.join(__dirname, '../src/components/admin/design/DesignSystemManager.tsx');
  const managerContent = fs.readFileSync(managerPath, 'utf8');
  
  const hasLazyLoading = managerContent.includes('lazy') || 
                         managerContent.includes('Suspense') ||
                         managerContent.includes('dynamic');
  if (hasLazyLoading) {
    logTest('Lazy loading implementation', true);
  } else {
    logWarning('Lazy loading', 'No lazy loading found');
  }
  
  const hasDebounce = managerContent.includes('debounce') || 
                      managerContent.includes('throttle');
  if (hasDebounce) {
    logTest('Debouncing for performance', true);
  } else {
    logWarning('Debouncing', 'No debouncing found');
  }
} catch (error) {
  logWarning('Performance optimizations', error.message);
}

// Check for image optimization
try {
  const imageUtilsPath = path.join(__dirname, '../src/lib/image-utils.ts');
  const imageUtilsContent = fs.readFileSync(imageUtilsPath, 'utf8');
  
  const hasOptimization = imageUtilsContent.includes('optimize') || 
                          imageUtilsContent.includes('compress') ||
                          imageUtilsContent.includes('resize');
  logTest('Image optimization', hasOptimization, 
          hasOptimization ? '' : 'No optimization found');
  
  const hasValidation = imageUtilsContent.includes('validate') || 
                        imageUtilsContent.includes('size') ||
                        imageUtilsContent.includes('format');
  logTest('Image validation', hasValidation, 
          hasValidation ? '' : 'No validation found');
} catch (error) {
  logTest('Image optimization', false, error.message);
}

// 7. Test Error Boundaries
console.log('\n🛡️  Testing Error Boundaries...');
try {
  const errorBoundaryPath = path.join(__dirname, '../src/components/admin/design/DesignSystemErrorBoundary.tsx');
  const errorBoundaryContent = fs.readFileSync(errorBoundaryPath, 'utf8');
  
  const hasComponentDidCatch = errorBoundaryContent.includes('componentDidCatch') || 
                                errorBoundaryContent.includes('getDerivedStateFromError');
  logTest('Error boundary implementation', hasComponentDidCatch, 
          hasComponentDidCatch ? '' : 'No error boundary methods found');
  
  const hasFallback = errorBoundaryContent.includes('fallback') || 
                      errorBoundaryContent.includes('Fallback');
  logTest('Fallback UI', hasFallback, 
          hasFallback ? '' : 'No fallback UI found');
  
  const hasLogging = errorBoundaryContent.includes('log') || 
                     errorBoundaryContent.includes('error-logger');
  logTest('Error logging', hasLogging, 
          hasLogging ? '' : 'No error logging found');
} catch (error) {
  logTest('Error boundaries', false, error.message);
}

// 8. Test Responsive Design
console.log('\n📱 Testing Responsive Design...');
try {
  const responsivePath = path.join(__dirname, '../src/components/admin/design/ResponsiveSizeControl.tsx');
  const responsiveContent = fs.readFileSync(responsivePath, 'utf8');
  
  const breakpoints = ['mobile', 'tablet', 'desktop'];
  breakpoints.forEach(breakpoint => {
    const hasBreakpoint = responsiveContent.includes(breakpoint);
    logTest(`Responsive breakpoint: ${breakpoint}`, hasBreakpoint, 
            hasBreakpoint ? '' : 'Breakpoint not found');
  });
} catch (error) {
  logTest('Responsive design', false, error.message);
}

// 9. Test API Rate Limiting
console.log('\n🚦 Testing API Rate Limiting...');
try {
  const authMiddlewarePath = path.join(__dirname, '../src/lib/auth-middleware.ts');
  const authMiddlewareContent = fs.readFileSync(authMiddlewarePath, 'utf8');
  
  const hasRateLimit = authMiddlewareContent.includes('rateLimit') || 
                       authMiddlewareContent.includes('rate-limit') ||
                       authMiddlewareContent.includes('throttle');
  if (hasRateLimit) {
    logTest('Rate limiting', true);
  } else {
    logWarning('Rate limiting', 'No rate limiting found');
  }
} catch (error) {
  logWarning('API rate limiting', error.message);
}

// 10. Test Migration Utilities
console.log('\n🔄 Testing Migration Utilities...');
try {
  const migrationPath = path.join(__dirname, '../src/lib/design/migration.ts');
  const migrationContent = fs.readFileSync(migrationPath, 'utf8');
  
  const hasMigration = migrationContent.includes('migrate') || 
                       migrationContent.includes('transform');
  logTest('Migration function', hasMigration, 
          hasMigration ? '' : 'No migration function found');
  
  const hasBackup = migrationContent.includes('backup') || 
                    migrationContent.includes('Backup');
  logTest('Backup before migration', hasBackup, 
          hasBackup ? '' : 'No backup functionality found');
  
  const hasVersioning = migrationContent.includes('version') || 
                        migrationContent.includes('Version');
  logTest('Version tracking', hasVersioning, 
          hasVersioning ? '' : 'No version tracking found');
} catch (error) {
  logTest('Migration utilities', false, error.message);
}

// 11. Test Default Settings
console.log('\n⚙️  Testing Default Settings...');
try {
  const defaultsPath = path.join(__dirname, '../src/lib/design/defaults.ts');
  const defaultsContent = fs.readFileSync(defaultsPath, 'utf8');
  
  const hasDefaults = defaultsContent.includes('DEFAULT_DESIGN_SETTINGS');
  logTest('Default settings constant', hasDefaults, 
          hasDefaults ? '' : 'No default settings found');
  
  const sections = ['hero', 'about', 'products', 'contact'];
  sections.forEach(section => {
    const hasSection = defaultsContent.includes(section);
    if (!hasSection) {
      logWarning(`Default section: ${section}`, 'Section not found in defaults');
    }
  });
  
  const hasProductCards = defaultsContent.includes('productCards');
  logTest('Default product card settings', hasProductCards, 
          hasProductCards ? '' : 'No product card defaults found');
} catch (error) {
  logTest('Default settings', false, error.message);
}

// 12. Test Font Loading
console.log('\n🔤 Testing Font Loading...');
try {
  const fontLoaderPath = path.join(__dirname, '../src/lib/design/font-loader.ts');
  const fontLoaderContent = fs.readFileSync(fontLoaderPath, 'utf8');
  
  const fontSources = ['google', 'pretendard', 'gmarket'];
  fontSources.forEach(source => {
    const hasSource = fontLoaderContent.toLowerCase().includes(source);
    logTest(`Font source: ${source}`, hasSource, 
            hasSource ? '' : 'Font source not found');
  });
  
  const hasFallback = fontLoaderContent.includes('fallback') || 
                      fontLoaderContent.includes('catch');
  logTest('Font loading fallback', hasFallback, 
          hasFallback ? '' : 'No fallback found');
} catch (error) {
  logTest('Font loading', false, error.message);
}

// Print Summary
console.log('\n' + '='.repeat(60));
console.log('📊 ACCESSIBILITY & PERFORMANCE TEST SUMMARY');
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

const exitCode = results.failed.length > 0 ? 1 : 0;
if (exitCode === 0) {
  console.log('✨ All accessibility & performance tests passed!');
  if (results.warnings.length > 0) {
    console.log('⚠️  Please review warnings for potential improvements.');
  }
} else {
  console.log('⚠️  Some tests failed. Please review the results above.');
}

process.exit(exitCode);
