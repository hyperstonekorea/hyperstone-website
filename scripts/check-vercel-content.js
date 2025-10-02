#!/usr/bin/env node

/**
 * Check Vercel deployment content
 */

const https = require('https');

const URLS_TO_CHECK = [
  'https://hyperstone-website.vercel.app/ko',
  'https://hyperstone-website.vercel.app/en',
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject({ url, error: err.message });
    });
  });
}

function analyzeContent(response) {
  const { url, statusCode, body } = response;
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`URL: ${url}`);
  console.log(`Status: ${statusCode}`);
  console.log(`${'='.repeat(80)}`);
  
  if (statusCode !== 200) {
    console.log(`❌ ERROR: Status code ${statusCode}`);
    return;
  }
  
  // Check for key content elements
  const checks = {
    'HYPERSTONE title': body.includes('HYPERSTONE'),
    'Hero section ID': body.includes('id="hero"'),
    'About section ID': body.includes('id="about"'),
    'Products section ID': body.includes('id="products"'),
    'Contact section ID': body.includes('id="contact"'),
    'DULITE brand': body.includes('DULITE') || body.includes('Dulite'),
    'Loading text (Korean)': body.includes('로딩 중'),
    'Loading text (English)': body.includes('Loading'),
    'Next.js data': body.includes('__NEXT_DATA__'),
    'React root': body.includes('__next'),
    'Client JS': body.includes('_next/static'),
    'Framer Motion': body.includes('framer-motion') || body.includes('motion'),
  };
  
  console.log('\nContent Checks:');
  Object.entries(checks).forEach(([check, passed]) => {
    console.log(`  ${passed ? '✅' : '❌'} ${check}`);
  });
  
  // Check body length
  console.log(`\nBody Length: ${body.length} characters`);
  
  if (body.length < 5000) {
    console.log('⚠️  WARNING: Body is short, content may not be fully rendering');
  }
  
  // Extract visible text content
  const textContent = body
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  console.log(`Visible Text Length: ${textContent.length} characters`);
  
  // Check for specific section content
  console.log('\nSection Content Detection:');
  const sectionKeywords = {
    'Hero': ['건설업계의 혁신적인 솔루션', 'Innovative Solutions', 'DULITE 브랜드'],
    'About': ['회사소개', 'About Us', '비전', 'Vision'],
    'Products': ['DULITE 제품', 'DULITE Products', 'Ready Mix'],
    'Contact': ['연락처', 'Contact', '문의하기'],
  };
  
  Object.entries(sectionKeywords).forEach(([section, keywords]) => {
    const found = keywords.filter(kw => body.includes(kw));
    console.log(`  ${section}: ${found.length > 0 ? '✅' : '❌'} (found: ${found.join(', ') || 'none'})`);
  });
  
  // Check if it's stuck on loading
  if (body.includes('로딩 중') || body.includes('Loading')) {
    console.log('\n⚠️  ISSUE DETECTED: Page contains loading text');
    console.log('   This suggests the page may be stuck in loading state');
    console.log('   Possible causes:');
    console.log('   - Client-side JavaScript not executing');
    console.log('   - Dynamic imports failing');
    console.log('   - Component mounting issues');
  }
  
  // Check for errors in console logs or page
  const errorPatterns = [
    { pattern: 'Error:', label: 'JavaScript Error' },
    { pattern: 'Failed to', label: 'Failed Operation' },
    { pattern: 'Cannot', label: 'Cannot Operation' },
    { pattern: 'undefined', label: 'Undefined Reference' },
    { pattern: 'null', label: 'Null Reference' },
  ];
  
  console.log('\nPotential Issues:');
  errorPatterns.forEach(({ pattern, label }) => {
    const count = (body.match(new RegExp(pattern, 'gi')) || []).length;
    if (count > 5) {
      console.log(`  ⚠️  ${label}: Found ${count} occurrences of "${pattern}"`);
    }
  });
  
  // Show a sample of the body content
  console.log('\nFirst 1000 characters of body:');
  console.log(body.substring(0, 1000));
}

async function main() {
  console.log('🔍 Checking Vercel Deployment Content');
  console.log('======================================\n');
  
  for (const url of URLS_TO_CHECK) {
    try {
      const response = await fetchUrl(url);
      analyzeContent(response);
    } catch (error) {
      console.log(`\n❌ Failed to fetch ${error.url}`);
      console.log(`   Error: ${error.error}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n\n' + '='.repeat(80));
  console.log('Analysis Complete');
  console.log('='.repeat(80));
  console.log('\nRecommendations:');
  console.log('1. If loading text is present, check browser console for JS errors');
  console.log('2. If sections are missing, verify component imports');
  console.log('3. If content is short, check for build/hydration errors');
  console.log('4. Test in browser with DevTools open to see actual errors');
}

main().catch(console.error);
