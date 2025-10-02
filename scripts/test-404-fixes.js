#!/usr/bin/env node

/**
 * 404 Fix Verification Script
 * 
 * This script helps verify that all 404 fixes are working correctly.
 * Run this after starting your development server (npm run dev)
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

const ROUTES_TO_TEST = [
  { path: '/', expected: 'redirect to /ko', checkRedirect: true },
  { path: '/ko', expected: 'Korean homepage' },
  { path: '/en', expected: 'English homepage' },
  { path: '/ko/readymixconcrete', expected: 'Ready Mix Concrete product page' },
  { path: '/ko/precastconcrete', expected: 'Precast Concrete product page' },
  { path: '/ko/groutingagent', expected: 'Grouting Agent product page' },
  { path: '/ko/waterproofagent', expected: 'Waterproof Agent product page' },
  { path: '/en/readymixconcrete', expected: 'Ready Mix Concrete product page (EN)' },
  { path: '/en/precastconcrete', expected: 'Precast Concrete product page (EN)' },
  { path: '/en/groutingagent', expected: 'Grouting Agent product page (EN)' },
  { path: '/en/waterproofagent', expected: 'Waterproof Agent product page (EN)' },
  { path: '/admin', expected: 'Admin page' },
];

console.log('🔍 404 Fix Verification Script\n');
console.log('Testing routes on:', BASE_URL);
console.log('Make sure your dev server is running (npm run dev)\n');
console.log('─'.repeat(60));

let passed = 0;
let failed = 0;

function testRoute(route) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${route.path}`;
    
    http.get(url, (res) => {
      const status = res.statusCode;
      const isRedirect = status >= 300 && status < 400;
      const isSuccess = status === 200;
      
      let result = '❌ FAIL';
      let reason = '';
      
      if (route.checkRedirect && isRedirect) {
        result = '✅ PASS';
        reason = `(${status} redirect to ${res.headers.location})`;
        passed++;
      } else if (!route.checkRedirect && isSuccess) {
        result = '✅ PASS';
        reason = `(${status} OK)`;
        passed++;
      } else {
        result = '❌ FAIL';
        reason = `(${status})`;
        failed++;
      }
      
      console.log(`${result} ${route.path}`);
      console.log(`   Expected: ${route.expected} ${reason}`);
      
      resolve();
    }).on('error', (err) => {
      console.log(`❌ FAIL ${route.path}`);
      console.log(`   Error: ${err.message}`);
      failed++;
      resolve();
    });
  });
}

async function runTests() {
  for (const route of ROUTES_TO_TEST) {
    await testRoute(route);
  }
  
  console.log('─'.repeat(60));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
  
  if (failed === 0) {
    console.log('✅ All tests passed! Your 404 fixes are working correctly.\n');
    console.log('Next steps:');
    console.log('1. Run production build: npm run build');
    console.log('2. Test production: npm start');
    console.log('3. Deploy to Vercel: git push origin main\n');
  } else {
    console.log('❌ Some tests failed. Please check the following:\n');
    console.log('1. Is your dev server running? (npm run dev)');
    console.log('2. Are there any errors in the terminal?');
    console.log('3. Check browser console for JavaScript errors');
    console.log('4. Review the 404-FIX-SUMMARY.md document\n');
  }
}

// Check if server is running first
http.get(BASE_URL, (res) => {
  console.log('✅ Server is running\n');
  runTests();
}).on('error', (err) => {
  console.log('❌ Cannot connect to server');
  console.log('Please start your development server first:');
  console.log('  npm run dev\n');
  process.exit(1);
});
