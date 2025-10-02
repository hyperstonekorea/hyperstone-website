#!/usr/bin/env node

/**
 * Wait for Vercel deployment to complete and verify content
 */

const https = require('https');

const TEST_URL = 'https://hyperstone-website.vercel.app/ko';
const MAX_ATTEMPTS = 20;
const DELAY_MS = 10000; // 10 seconds

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function checkContent(body) {
  const checks = {
    hasHeroId: body.includes('id="hero"'),
    hasAboutId: body.includes('id="about"'),
    hasProductsId: body.includes('id="products"'),
    hasContactId: body.includes('id="contact"'),
    hasLoadingText: body.includes('로딩 중') || body.includes('Loading'),
  };
  
  const isFixed = checks.hasHeroId && checks.hasAboutId && 
                  checks.hasProductsId && checks.hasContactId &&
                  !checks.hasLoadingText;
  
  return { checks, isFixed };
}

async function waitForDeployment() {
  console.log('🚀 Waiting for Vercel deployment to complete...\n');
  console.log(`Testing URL: ${TEST_URL}`);
  console.log(`Max attempts: ${MAX_ATTEMPTS}`);
  console.log(`Checking every: ${DELAY_MS / 1000} seconds\n`);
  
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      console.log(`[Attempt ${attempt}/${MAX_ATTEMPTS}] Checking deployment...`);
      
      const response = await fetchUrl(TEST_URL);
      const { checks, isFixed } = checkContent(response.body);
      
      console.log('  Status:', response.statusCode);
      console.log('  Hero section:', checks.hasHeroId ? '✅' : '❌');
      console.log('  About section:', checks.hasAboutId ? '✅' : '❌');
      console.log('  Products section:', checks.hasProductsId ? '✅' : '❌');
      console.log('  Contact section:', checks.hasContactId ? '✅' : '❌');
      console.log('  Loading text:', checks.hasLoadingText ? '⚠️  Still present' : '✅ Gone');
      
      if (isFixed) {
        console.log('\n🎉 SUCCESS! Deployment is complete and content is displaying!');
        console.log('\nVerify manually:');
        console.log('  Korean: https://hyperstone-website.vercel.app/ko');
        console.log('  English: https://hyperstone-website.vercel.app/en');
        return true;
      }
      
      if (attempt < MAX_ATTEMPTS) {
        console.log(`\n⏳ Not ready yet. Waiting ${DELAY_MS / 1000} seconds...\n`);
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      if (attempt < MAX_ATTEMPTS) {
        console.log(`\n⏳ Retrying in ${DELAY_MS / 1000} seconds...\n`);
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    }
  }
  
  console.log('\n⚠️  Deployment check timed out.');
  console.log('The deployment may still be in progress or there may be an issue.');
  console.log('\nNext steps:');
  console.log('1. Check Vercel dashboard: https://vercel.com/dashboard');
  console.log('2. Look for deployment errors in the logs');
  console.log('3. Try running: node scripts/check-vercel-content.js');
  console.log('4. Test manually in browser with DevTools open');
  
  return false;
}

waitForDeployment().catch(console.error);
