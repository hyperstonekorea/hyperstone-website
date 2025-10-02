#!/usr/bin/env node

/**
 * HYPERSTONE Website - Vercel Setup Helper
 * 
 * This script provides step-by-step guidance for Vercel setup
 */

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.blue}🚀 HYPERSTONE Website - Vercel Setup Helper${colors.reset}\n`);

function displayStep(stepNumber, title, description, actions = []) {
  console.log(`${colors.bold}${colors.blue}Step ${stepNumber}: ${title}${colors.reset}`);
  console.log(`${colors.yellow}${description}${colors.reset}\n`);
  
  if (actions.length > 0) {
    actions.forEach((action, index) => {
      console.log(`${colors.green}${index + 1}. ${action}${colors.reset}`);
    });
    console.log('');
  }
}

function displayEnvironmentVariables() {
  console.log(`${colors.bold}${colors.blue}🔐 Environment Variables to Add:${colors.reset}\n`);
  
  const envVars = [
    { name: 'ADMIN_PASSWORD', value: 'rlatkdgus1201', description: 'Admin panel password' },
    { name: 'EMAIL_HOST', value: 'smtp.gmail.com', description: 'SMTP server' },
    { name: 'EMAIL_PORT', value: '587', description: 'SMTP port' },
    { name: 'EMAIL_USER', value: 'hyperstonekorea@gmail.com', description: 'Gmail account' },
    { name: 'EMAIL_PASS', value: 'xoqh dxli hgyf wsbt', description: 'Gmail app password' },
    { name: 'EMAIL_RECIPIENT', value: 'hyperstonekorea@gmail.com', description: 'Contact form recipient' },
    { name: 'NEXT_PUBLIC_SITE_URL', value: 'https://hyperstone.co.kr', description: 'Site URL' },
    { name: 'NEXT_TELEMETRY_DISABLED', value: '1', description: 'Disable telemetry (optional)' }
  ];
  
  envVars.forEach((envVar, index) => {
    console.log(`${colors.yellow}${index + 1}. ${envVar.name}${colors.reset}`);
    console.log(`   Value: ${colors.green}${envVar.value}${colors.reset}`);
    console.log(`   Description: ${envVar.description}`);
    console.log(`   Environment: ${colors.blue}Production, Preview, Development (select all)${colors.reset}\n`);
  });
}

function displayVerificationSteps() {
  console.log(`${colors.bold}${colors.blue}✅ Verification Steps:${colors.reset}\n`);
  
  const verificationSteps = [
    'Check deployment status (green checkmark)',
    'Test homepage: https://hyperstone.co.kr',
    'Test admin panel: https://hyperstone.co.kr/admin',
    'Test contact form submission',
    'Verify SSL certificate (green padlock)',
    'Check mobile responsiveness',
    'Test language switching (Korean ↔ English)'
  ];
  
  verificationSteps.forEach((step, index) => {
    console.log(`${colors.green}☐ ${index + 1}. ${step}${colors.reset}`);
  });
  
  console.log(`\n${colors.blue}Run automated verification:${colors.reset}`);
  console.log(`${colors.yellow}npm run deploy:verify https://hyperstone.co.kr${colors.reset}\n`);
}

function main() {
  displayStep(
    1,
    'Vercel Account Setup',
    'Create or login to your Vercel account',
    [
      'Go to https://vercel.com',
      'Click "Sign Up" or "Log In"',
      'Choose "Continue with GitHub" (recommended)',
      'Authorize GitHub access when prompted'
    ]
  );
  
  displayStep(
    2,
    'Import Project',
    'Import your GitHub repository to Vercel',
    [
      'Go to Vercel Dashboard: https://vercel.com/dashboard',
      'Click "New Project"',
      'Find "hyperstonekorea/hyperstone-website" in GitHub repos',
      'Click "Import" next to your repository',
      'Vercel will auto-detect Next.js framework'
    ]
  );
  
  displayStep(
    3,
    'Configure Build Settings',
    'Verify project configuration (usually auto-detected correctly)',
    [
      'Framework: Next.js ✓',
      'Root Directory: ./ ✓',
      'Build Command: npm run build:production',
      'Output Directory: .next ✓',
      'Install Command: npm install ✓'
    ]
  );
  
  console.log(`${colors.bold}${colors.blue}Step 4: Add Environment Variables${colors.reset}`);
  console.log(`${colors.yellow}Go to Project Settings > Environment Variables and add these:${colors.reset}\n`);
  
  displayEnvironmentVariables();
  
  displayStep(
    5,
    'Add Custom Domain',
    'Configure your hyperstone.co.kr domain',
    [
      'Go to Project Settings > Domains',
      'Click "Add Domain"',
      'Enter: hyperstone.co.kr',
      'Click "Add" (Vercel will configure DNS automatically)',
      'Optionally add: www.hyperstone.co.kr',
      'Configure redirect: www → non-www'
    ]
  );
  
  displayStep(
    6,
    'Deploy and Test',
    'Trigger deployment and verify everything works',
    [
      'Click "Deploy" or push to main branch',
      'Wait for deployment to complete (2-5 minutes)',
      'Check for green checkmark in deployments',
      'Test website functionality'
    ]
  );
  
  displayVerificationSteps();
  
  console.log(`${colors.bold}${colors.green}🎉 Setup Complete!${colors.reset}\n`);
  
  console.log(`${colors.blue}Your HYPERSTONE website will be live at:${colors.reset}`);
  console.log(`${colors.green}🌐 Main Site: https://hyperstone.co.kr${colors.reset}`);
  console.log(`${colors.green}🔐 Admin Panel: https://hyperstone.co.kr/admin${colors.reset}`);
  console.log(`${colors.green}🌍 English Version: https://hyperstone.co.kr/en${colors.reset}\n`);
  
  console.log(`${colors.blue}📚 Additional Resources:${colors.reset}`);
  console.log(`${colors.yellow}• Complete Guide: ./VERCEL_SETUP_AUTOMATION.md${colors.reset}`);
  console.log(`${colors.yellow}• Domain Setup: ./VERCEL_NAMESERVER_SETUP.md${colors.reset}`);
  console.log(`${colors.yellow}• Troubleshooting: ./VERCEL_TROUBLESHOOTING.md${colors.reset}`);
  
  console.log(`\n${colors.blue}Need Help?${colors.reset}`);
  console.log(`${colors.yellow}• Vercel Support: https://vercel.com/support${colors.reset}`);
  console.log(`${colors.yellow}• Documentation: https://vercel.com/docs${colors.reset}`);
}

main();