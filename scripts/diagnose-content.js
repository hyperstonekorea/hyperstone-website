#!/usr/bin/env node

/**
 * Content Display Diagnostic Script
 * Checks if the website is displaying content properly
 */

const https = require('https');
const http = require('http');

const URLS_TO_CHECK = [
  'https://hyperstone.co.kr',
  'https://hyperstone.co.kr/ko',
  'https://hyperstone.co.kr/en',
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, {
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
    'Hero section': body.includes('id="hero"') || body.includes('HeroSection'),
    'About section': body.includes('id="about"') || body.includes('AboutSection'),
    'Products section': body.includes('id="products"') || body.includes('ProductsSection'),
    'Contact section': body.includes('id="contact"') || body.includes('ContactSection'),
    'DULITE brand': body.includes('DULITE') || body.includes('Dulite'),
    'Loading state': body.includes('로딩 중') || body.includes('Loading'),
    'Next.js hydration': body.includes('__NEXT_DATA__'),
    'React root': body.includes('__next'),
    'Client-side JS': body.includes('_next/static'),
  };
  
  console.log('\nContent Checks:');
  Object.entries(checks).forEach(([check, passed]) => {
    console.log(`  ${passed ? '✅' : '❌'} ${check}`);
  });
  
  // Check for error messages
  const errorPatterns = [
    'Error',
    'error occurred',
    'not found',
    '404',
    'Failed to',
    'Cannot',
  ];
  
  const foundErrors = errorPatterns.filter(pattern => 
    body.toLowerCase().includes(pattern.toLowerCase())
  );
  
  if (foundErrors.length > 0) {
    console.log('\n⚠️  Potential Issues Found:');
    foundErrors.forEach(error => {
      console.log(`  - Contains: "${error}"`);
    });
  }
  
  // Check body length
  console.log(`\nBody Length: ${body.length} characters`);
  
  if (body.length < 1000) {
    console.log('⚠️  WARNING: Body is very short, content may not be rendering');
  }
  
  // Extract visible text content (rough approximation)
  const textContent = body
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  console.log(`\nVisible Text Length: ${textContent.length} characters`);
  console.log(`\nFirst 500 characters of visible text:`);
  console.log(textContent.substring(0, 500));
  
  // Check for specific section content
  console.log('\n\nSection Content Detection:');
  const sectionKeywords = {
    'Hero': ['건설업계의 혁신적인 솔루션', 'Innovative Solutions', 'DULITE 브랜드'],
    'About': ['회사소개', 'About Us', '비전', 'Vision', '미션', 'Mission'],
    'Products': ['DULITE 제품', 'DULITE Products', 'Ready Mix', 'Precast'],
    'Contact': ['연락처', 'Contact', '문의하기', 'Send Inquiry'],
  };
  
  Object.entries(sectionKeywords).forEach(([section, keywords]) => {
    const found = keywords.filter(kw => body.includes(kw));
    console.log(`  ${section}: ${found.length > 0 ? '✅' : '❌'} (found: ${found.join(', ') || 'none'})`);
  });
}

async function main() {
  console.log('🔍 HYPERSTONE Website Content Diagnostic');
  console.log('========================================\n');
  
  for (const url of URLS_TO_CHECK) {
    try {
      const response = await fetchUrl(url);
      analyzeContent(response);
    } catch (error) {
      console.log(`\n❌ Failed to fetch ${error.url}`);
      console.log(`   Error: ${error.error}`);
    }
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n\n' + '='.repeat(80));
  console.log('Diagnostic Complete');
  console.log('='.repeat(80));
}

main().catch(console.error);
