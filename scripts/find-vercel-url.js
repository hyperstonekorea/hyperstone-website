#!/usr/bin/env node

const https = require('https');

console.log('🔍 Finding the correct Vercel deployment URL...\n');

// Common Vercel URL patterns to test
const urlPatterns = [
  'https://hyperstone-website.vercel.app',
  'https://hyperstone-website-git-main-hyperstonekorea.vercel.app',
  'https://hyperstone-website-hyperstonekorea.vercel.app',
  'https://hyperstone-website-git-main.vercel.app',
  'https://hyperstone-website-main.vercel.app',
  'https://hyperstone-website-main-hyperstonekorea.vercel.app'
];

async function testUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        headers: res.headers,
        location: res.headers.location
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        status: 'ERROR',
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        error: 'Request timeout'
      });
    });
    
    req.end();
  });
}

async function findWorkingUrl() {
  console.log('Testing URLs...\n');
  
  for (const url of urlPatterns) {
    const result = await testUrl(url);
    
    if (result.status === 200) {
      console.log(`✅ WORKING: ${url}`);
      console.log(`   Status: ${result.status}`);
      return url;
    } else if (result.status === 307 || result.status === 301 || result.status === 302) {
      console.log(`🔄 REDIRECT: ${url}`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Location: ${result.location}`);
      
      // Test the redirect target
      if (result.location) {
        const redirectUrl = result.location.startsWith('/') 
          ? url + result.location 
          : result.location;
        
        console.log(`   Testing redirect target: ${redirectUrl}`);
        const redirectResult = await testUrl(redirectUrl);
        
        if (redirectResult.status === 200) {
          console.log(`   ✅ Redirect target works!`);
          return url; // Return the original URL since it redirects correctly
        } else {
          console.log(`   ❌ Redirect target failed: ${redirectResult.status}`);
        }
      }
    } else {
      console.log(`❌ FAILED: ${url}`);
      console.log(`   Status: ${result.status}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    }
    console.log('');
  }
  
  return null;
}

findWorkingUrl().then((workingUrl) => {
  if (workingUrl) {
    console.log(`\n🎉 Found working URL: ${workingUrl}`);
    console.log('\nNext steps:');
    console.log(`1. Test Korean page: ${workingUrl}/ko`);
    console.log(`2. Test English page: ${workingUrl}/en`);
    console.log(`3. Test admin page: ${workingUrl}/admin`);
  } else {
    console.log('\n❌ No working URLs found.');
    console.log('\nPossible issues:');
    console.log('1. Deployment is still in progress');
    console.log('2. Build failed - check Vercel dashboard');
    console.log('3. Project name or organization might be different');
    console.log('4. Domain configuration issues');
    console.log('\nRecommendations:');
    console.log('1. Check Vercel dashboard for actual deployment URL');
    console.log('2. Verify build logs for errors');
    console.log('3. Check environment variables are set');
  }
}).catch(console.error);