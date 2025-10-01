#!/usr/bin/env node

/**
 * HYPERSTONE Website - Deployment Verification Script
 * 
 * This script helps verify that the deployed website is working correctly
 * by testing various endpoints and functionality.
 */

const https = require('https');
const http = require('http');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Get the site URL from command line arguments or use default
const siteUrl = process.argv[2] || 'https://hyperstone-website.vercel.app';

console.log(`${colors.bold}${colors.blue}🔍 HYPERSTONE Website - Deployment Verification${colors.reset}\n`);
console.log(`${colors.blue}Testing site: ${siteUrl}${colors.reset}\n`);

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testEndpoint(path, description, expectedStatus = 200) {
  const url = `${siteUrl}${path}`;
  
  try {
    const response = await makeRequest(url);
    const success = response.statusCode === expectedStatus;
    const status = success ? `${colors.green}✅` : `${colors.red}❌`;
    
    console.log(`${status} ${description}: ${path} (${response.statusCode})${colors.reset}`);
    
    return {
      success,
      statusCode: response.statusCode,
      path,
      description
    };
  } catch (error) {
    console.log(`${colors.red}❌ ${description}: ${path} (Error: ${error.message})${colors.reset}`);
    return {
      success: false,
      error: error.message,
      path,
      description
    };
  }
}

async function testContentPresence(path, description, expectedContent) {
  const url = `${siteUrl}${path}`;
  
  try {
    const response = await makeRequest(url);
    const hasContent = response.body.includes(expectedContent);
    const status = hasContent ? `${colors.green}✅` : `${colors.red}❌`;
    
    console.log(`${status} ${description}: Contains "${expectedContent}"${colors.reset}`);
    
    return {
      success: hasContent,
      statusCode: response.statusCode,
      path,
      description
    };
  } catch (error) {
    console.log(`${colors.red}❌ ${description}: ${path} (Error: ${error.message})${colors.reset}`);
    return {
      success: false,
      error: error.message,
      path,
      description
    };
  }
}

async function runVerification() {
  const tests = [];
  
  console.log(`${colors.bold}📄 Page Accessibility Tests:${colors.reset}`);
  
  // Test main pages
  tests.push(await testEndpoint('/', 'Homepage (Korean)'));
  tests.push(await testEndpoint('/en', 'Homepage (English)'));
  tests.push(await testEndpoint('/admin', 'Admin Panel'));
  
  // Test product pages
  tests.push(await testEndpoint('/readymixconcrete', 'Ready Mix Concrete (Korean)'));
  tests.push(await testEndpoint('/en/readymixconcrete', 'Ready Mix Concrete (English)'));
  tests.push(await testEndpoint('/precastconcrete', 'Precast Concrete (Korean)'));
  tests.push(await testEndpoint('/en/precastconcrete', 'Precast Concrete (English)'));
  tests.push(await testEndpoint('/groutingagent', 'Grouting Agent (Korean)'));
  tests.push(await testEndpoint('/en/groutingagent', 'Grouting Agent (English)'));
  tests.push(await testEndpoint('/waterproofagent', 'Waterproof Agent (Korean)'));
  tests.push(await testEndpoint('/en/waterproofagent', 'Waterproof Agent (English)'));
  
  console.log(`\n${colors.bold}🔧 API Endpoint Tests:${colors.reset}`);
  
  // Test API endpoints (these might return different status codes)
  tests.push(await testEndpoint('/api/contact', 'Contact API', 405)); // GET not allowed, POST expected
  tests.push(await testEndpoint('/api/admin/login', 'Admin Login API', 405)); // GET not allowed, POST expected
  
  console.log(`\n${colors.bold}📝 Content Verification Tests:${colors.reset}`);
  
  // Test content presence
  tests.push(await testContentPresence('/', 'HYPERSTONE branding', 'HYPERSTONE'));
  tests.push(await testContentPresence('/', 'DULITE products', 'DULITE'));
  tests.push(await testContentPresence('/en', 'English content', 'HYPERSTONE'));
  tests.push(await testContentPresence('/admin', 'Admin login form', 'password'));
  
  console.log(`\n${colors.bold}🌐 SEO and Metadata Tests:${colors.reset}`);
  
  // Test SEO elements
  tests.push(await testContentPresence('/', 'Meta title', '<title>'));
  tests.push(await testContentPresence('/', 'Meta description', 'description'));
  tests.push(await testContentPresence('/', 'Open Graph tags', 'og:'));
  
  console.log(`\n${colors.bold}📊 Test Results Summary:${colors.reset}`);
  
  const passed = tests.filter(test => test.success).length;
  const failed = tests.filter(test => !test.success).length;
  const total = tests.length;
  
  console.log(`${colors.green}✅ Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
  console.log(`📊 Total: ${total}`);
  
  const successRate = (passed / total * 100).toFixed(1);
  console.log(`🎯 Success Rate: ${successRate}%`);
  
  if (failed > 0) {
    console.log(`\n${colors.bold}${colors.red}❌ Failed Tests:${colors.reset}`);
    tests.filter(test => !test.success).forEach(test => {
      console.log(`${colors.red}• ${test.description} (${test.path})${colors.reset}`);
      if (test.error) {
        console.log(`  Error: ${test.error}`);
      }
    });
  }
  
  console.log(`\n${colors.bold}${colors.blue}📋 Manual Verification Checklist:${colors.reset}`);
  console.log(`${colors.yellow}Please manually verify these items:${colors.reset}`);
  console.log(`${colors.green}☐${colors.reset} Language switching works correctly`);
  console.log(`${colors.green}☐${colors.reset} Contact form submits and sends email`);
  console.log(`${colors.green}☐${colors.reset} Admin panel login works with correct password`);
  console.log(`${colors.green}☐${colors.reset} Image uploads work in admin panel`);
  console.log(`${colors.green}☐${colors.reset} Background settings apply correctly`);
  console.log(`${colors.green}☐${colors.reset} Mobile responsiveness looks good`);
  console.log(`${colors.green}☐${colors.reset} Page loading performance is acceptable`);
  console.log(`${colors.green}☐${colors.reset} All animations work smoothly`);
  
  if (successRate >= 90) {
    console.log(`\n${colors.green}${colors.bold}🎉 Deployment verification successful!${colors.reset}`);
    console.log(`${colors.green}Your HYPERSTONE website is ready for production use.${colors.reset}`);
  } else if (successRate >= 70) {
    console.log(`\n${colors.yellow}${colors.bold}⚠️  Deployment partially successful${colors.reset}`);
    console.log(`${colors.yellow}Some issues detected. Please review failed tests above.${colors.reset}`);
  } else {
    console.log(`\n${colors.red}${colors.bold}🚨 Deployment verification failed${colors.reset}`);
    console.log(`${colors.red}Multiple issues detected. Please review and fix before going live.${colors.reset}`);
  }
  
  console.log(`\n${colors.blue}For detailed deployment instructions, see: ./VERCEL_DEPLOYMENT.md${colors.reset}`);
}

// Run the verification
runVerification().catch(error => {
  console.error(`${colors.red}Verification script error: ${error.message}${colors.reset}`);
  process.exit(1);
});