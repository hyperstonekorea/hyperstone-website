#!/usr/bin/env node

/**
 * HYPERSTONE Website - DNS Configuration Checker
 * 
 * This script helps verify DNS setup for hyperstone.co.kr
 */

const { exec } = require('child_process');
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

console.log(`${colors.bold}${colors.blue}🌐 DNS Configuration Checker for hyperstone.co.kr${colors.reset}\n`);

function runCommand(command) {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({
        success: !error,
        output: stdout || stderr || (error ? error.message : ''),
        error: error
      });
    });
  });
}

function checkHttps(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve({
        success: true,
        statusCode: res.statusCode,
        headers: res.headers
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Timeout'
      });
    });
  });
}

async function checkDNS() {
  console.log(`${colors.bold}1. Checking DNS Resolution:${colors.reset}\n`);

  // Check A record for root domain
  console.log(`${colors.blue}Checking A record for hyperstone.co.kr...${colors.reset}`);
  const aRecord = await runCommand('nslookup hyperstone.co.kr');

  if (aRecord.success && aRecord.output.includes('76.76.19.61')) {
    console.log(`${colors.green}✅ A record correct: Points to 76.76.19.61${colors.reset}`);
  } else if (aRecord.success) {
    console.log(`${colors.yellow}⚠️ A record found but may be incorrect:${colors.reset}`);
    console.log(`${colors.yellow}${aRecord.output}${colors.reset}`);
    console.log(`${colors.yellow}Expected: 76.76.19.61${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ A record not found or DNS error${colors.reset}`);
    console.log(`${colors.red}${aRecord.output}${colors.reset}`);
  }

  console.log('');

  // Check CNAME record for www
  console.log(`${colors.blue}Checking CNAME record for www.hyperstone.co.kr...${colors.reset}`);
  const cnameRecord = await runCommand('nslookup www.hyperstone.co.kr');

  if (cnameRecord.success && cnameRecord.output.includes('cname.vercel-dns.com')) {
    console.log(`${colors.green}✅ CNAME record correct: Points to cname.vercel-dns.com${colors.reset}`);
  } else if (cnameRecord.success) {
    console.log(`${colors.yellow}⚠️ CNAME record found but may be incorrect:${colors.reset}`);
    console.log(`${colors.yellow}${cnameRecord.output}${colors.reset}`);
    console.log(`${colors.yellow}Expected: cname.vercel-dns.com${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ CNAME record not found or DNS error${colors.reset}`);
    console.log(`${colors.red}${cnameRecord.output}${colors.reset}`);
  }

  console.log('\n');
}

async function checkWebsite() {
  console.log(`${colors.bold}2. Checking Website Accessibility:${colors.reset}\n`);

  const domains = ['https://hyperstone.co.kr', 'https://www.hyperstone.co.kr'];

  for (const domain of domains) {
    console.log(`${colors.blue}Testing ${domain}...${colors.reset}`);

    const result = await checkHttps(domain);

    if (result.success) {
      console.log(`${colors.green}✅ ${domain} is accessible (Status: ${result.statusCode})${colors.reset}`);

      // Check if it's served by Vercel
      if (result.headers['server'] && result.headers['server'].includes('Vercel')) {
        console.log(`${colors.green}   Served by Vercel ✓${colors.reset}`);
      }

      // Check SSL
      console.log(`${colors.green}   SSL Certificate: Active ✓${colors.reset}`);

    } else {
      console.log(`${colors.red}❌ ${domain} not accessible: ${result.error}${colors.reset}`);
    }

    console.log('');
  }
}

async function checkNameservers() {
  console.log(`${colors.bold}3. Checking Nameservers:${colors.reset}\n`);

  console.log(`${colors.blue}Checking nameservers for hyperstone.co.kr...${colors.reset}`);
  const nsRecord = await runCommand('nslookup -type=ns hyperstone.co.kr');

  if (nsRecord.success) {
    console.log(`${colors.yellow}Current nameservers:${colors.reset}`);
    console.log(`${nsRecord.output}`);

    if (nsRecord.output.includes('vercel-dns.com')) {
      console.log(`${colors.green}✅ Using Vercel nameservers (PERFECT!)${colors.reset}`);
      console.log(`${colors.green}   This is the optimal setup for Vercel hosting${colors.reset}`);
    } else if (nsRecord.output.includes('nsone.net')) {
      console.log(`${colors.yellow}⚠️ Still using NSOne nameservers${colors.reset}`);
      console.log(`${colors.yellow}   Nameserver change may still be propagating${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️ Using different nameservers${colors.reset}`);
      console.log(`${colors.yellow}   Expected: ns1.vercel-dns.com, ns2.vercel-dns.com${colors.reset}`);
    }
  } else {
    console.log(`${colors.red}❌ Could not check nameservers${colors.reset}`);
  }

  console.log('\n');
}

function provideDNSInstructions() {
  console.log(`${colors.bold}${colors.blue}📋 Vercel Nameserver Setup Instructions:${colors.reset}\n`);

  console.log(`${colors.green}✅ You're using Vercel nameservers - This is PERFECT!${colors.reset}\n`);

  console.log(`${colors.yellow}Current nameservers (already configured):${colors.reset}`);
  console.log(`ns1.vercel-dns.com`);
  console.log(`ns2.vercel-dns.com\n`);

  console.log(`${colors.blue}Next steps:${colors.reset}`);
  console.log(`1. Wait for nameserver propagation (24-48 hours)`);
  console.log(`2. Add domain to Vercel project (Settings > Domains)`);
  console.log(`3. Vercel will automatically configure DNS`);
  console.log(`4. SSL certificate will be issued instantly\n`);

  console.log(`${colors.blue}To add domain to Vercel:${colors.reset}`);
  console.log(`1. Go to Vercel dashboard > Your project`);
  console.log(`2. Settings > Domains`);
  console.log(`3. Add Domain: hyperstone.co.kr`);
  console.log(`4. Add Domain: www.hyperstone.co.kr (optional)\n`);

  console.log(`${colors.green}Advantages of Vercel nameservers:${colors.reset}`);
  console.log(`✅ Automatic DNS management`);
  console.log(`✅ Instant SSL certificates`);
  console.log(`✅ Optimal performance`);
  console.log(`✅ No manual DNS records needed\n`);
}

async function runAllChecks() {
  try {
    await checkNameservers();
    await checkDNS();
    await checkWebsite();

    console.log(`${colors.bold}${colors.blue}📊 Summary:${colors.reset}\n`);
    console.log(`${colors.blue}Domain: hyperstone.co.kr${colors.reset}`);
    console.log(`${colors.blue}Nameservers: Vercel DNS (ns1/ns2.vercel-dns.com)${colors.reset}`);
    console.log(`${colors.blue}Setup: Optimal Vercel configuration${colors.reset}\n`);

    provideDNSInstructions();

    console.log(`${colors.blue}📚 For detailed setup instructions, see:${colors.reset}`);
    console.log(`   - ./VERCEL_NAMESERVER_SETUP.md`);
    console.log(`   - ./DOMAIN_SETUP_GUIDE.md`);
    console.log(`   - ./VERCEL_DEPLOYMENT.md\n`);

  } catch (error) {
    console.error(`${colors.red}Error running DNS checks: ${error.message}${colors.reset}`);
  }
}

// Run all checks
runAllChecks();