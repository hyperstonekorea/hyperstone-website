#!/usr/bin/env node

/**
 * HYPERSTONE Website - Deployment Status Checker
 * 
 * This script helps identify why the deployment is returning 404s
 */

const https = require('https');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.blue}🔍 Deployment Status Checker${colors.reset}\n`);

function checkUrl(url) {
  return new Promise((resolve) => {
    console.log(`${colors.blue}Testing: ${url}${colors.reset}`);
    
    const req = https.get(url, (res) => {
      console.log(`${colors.yellow}Status: ${res.statusCode}${colors.reset}`);
      console.log(`${colors.yellow}Headers:${colors.reset}`);
      
      // Check important headers
      const importantHeaders = ['server', 'x-vercel-id', 'x-vercel-cache', 'content-type'];
      importantHeaders.forEach(header => {
        if (res.headers[header]) {
          console.log(`  ${header}: ${res.headers[header]}`);
        }
      });
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data.substring(0, 500) // First 500 chars
        });
      });
    });
    
    req.on('error', (error) => {
      console.log(`${colors.red}Error: ${error.message}${colors.reset}`);
      resolve({
        error: error.message,
        statusCode: 0
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`${colors.red}Timeout: Request took too long${colors.reset}`);
      resolve({
        error: 'Timeout',
        statusCode: 0
      });
    });
  });
}

async function diagnoseDeployment() {
  const testUrls = [
    'https://hyperstone-website.vercel.app',
    'https://hyperstone-website-git-main-hyperstonekorea.vercel.app',
    'https://hyperstone-website-hyperstonekorea.vercel.app'
  ];
  
  console.log(`${colors.bold}Testing possible Vercel URLs:${colors.reset}\n`);
  
  for (const url of testUrls) {
    const result = await checkUrl(url);
    
    if (result.statusCode === 200) {
      console.log(`${colors.green}✅ SUCCESS: ${url} is working!${colors.reset}\n`);
      
      // Check if it's the HYPERSTONE website
      if (result.body.includes('HYPERSTONE') || result.body.includes('hyperstone')) {
        console.log(`${colors.green}🎉 This appears to be your HYPERSTONE website!${colors.reset}`);
        console.log(`${colors.green}Use this URL for testing: ${url}${colors.reset}\n`);
      } else {
        console.log(`${colors.yellow}⚠️ This URL works but might not be your website${colors.reset}\n`);
      }
    } else if (result.statusCode === 404) {
      console.log(`${colors.red}❌ 404: ${url} not found${colors.reset}\n`);
    } else if (result.statusCode > 0) {
      console.log(`${colors.yellow}⚠️ ${result.statusCode}: ${url} returned unexpected status${colors.reset}\n`);
    } else {
      console.log(`${colors.red}❌ ERROR: ${url} - ${result.error}${colors.reset}\n`);
    }
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`${colors.bold}${colors.blue}💡 Troubleshooting Steps:${colors.reset}\n`);
  
  console.log(`${colors.yellow}1. Check Vercel Dashboard:${colors.reset}`);
  console.log(`   - Go to https://vercel.com/dashboard`);
  console.log(`   - Look for your hyperstone-website project`);
  console.log(`   - Check if deployment completed successfully\n`);
  
  console.log(`${colors.yellow}2. Get Correct URL:${colors.reset}`);
  console.log(`   - In Vercel dashboard, click on your project`);
  console.log(`   - Copy the actual deployment URL`);
  console.log(`   - It might be different from the URLs tested above\n`);
  
  console.log(`${colors.yellow}3. Check Deployment Status:${colors.reset}`);
  console.log(`   - Look for green checkmark (success) or red X (failed)`);
  console.log(`   - If failed, check build logs for errors\n`);
  
  console.log(`${colors.yellow}4. Verify Environment Variables:${colors.reset}`);
  console.log(`   - Ensure all 7 variables are added in Vercel settings`);
  console.log(`   - Check for typos in variable names or values\n`);
  
  console.log(`${colors.yellow}5. Re-test with Correct URL:${colors.reset}`);
  console.log(`   - npm run deploy:verify https://your-actual-url.vercel.app\n`);
  
  console.log(`${colors.blue}📚 For detailed help, see:${colors.reset}`);
  console.log(`   - ./DEPLOYMENT_TROUBLESHOOTING_STEPS.md`);
  console.log(`   - ./VERCEL_TROUBLESHOOTING.md`);
}

// Run the diagnostic
diagnoseDeployment().catch(error => {
  console.error(`${colors.red}Diagnostic error: ${error.message}${colors.reset}`);
});