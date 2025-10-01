#!/usr/bin/env node

/**
 * HYPERSTONE Website - Deployment Checklist Script
 * 
 * This script helps verify that the website is ready for Vercel deployment
 * and provides a checklist of items to verify after deployment.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 HYPERSTONE Website - Deployment Checklist\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  const status = exists ? `${colors.green}✅` : `${colors.red}❌`;
  console.log(`${status} ${description}: ${filePath}${colors.reset}`);
  return exists;
}

function checkEnvExample() {
  const envExamplePath = '.env.example';
  if (fs.existsSync(envExamplePath)) {
    const content = fs.readFileSync(envExamplePath, 'utf8');
    const requiredVars = [
      'ADMIN_PASSWORD',
      'EMAIL_HOST',
      'EMAIL_PORT',
      'EMAIL_USER',
      'EMAIL_PASS',
      'EMAIL_RECIPIENT',
      'NEXT_PUBLIC_SITE_URL'
    ];
    
    console.log(`\n${colors.blue}📋 Environment Variables Check:${colors.reset}`);
    requiredVars.forEach(varName => {
      const hasVar = content.includes(varName);
      const status = hasVar ? `${colors.green}✅` : `${colors.red}❌`;
      console.log(`${status} ${varName}${colors.reset}`);
    });
  }
}

function displayDeploymentSteps() {
  console.log(`\n${colors.bold}${colors.blue}🔧 Vercel Deployment Steps:${colors.reset}\n`);
  
  const steps = [
    '1. Sign in to Vercel (https://vercel.com)',
    '2. Click "New Project" and import hyperstonekorea/hyperstone-website',
    '3. Configure project settings:',
    '   - Framework: Next.js',
    '   - Build Command: npm run build:production',
    '   - Root Directory: ./',
    '4. Add environment variables (see .env.example)',
    '5. Deploy and test functionality',
    '6. Configure custom domain (hyperstone.co.kr)',
    '7. Verify SSL certificate setup'
  ];
  
  steps.forEach(step => {
    console.log(`${colors.yellow}${step}${colors.reset}`);
  });
}

function displayPostDeploymentChecklist() {
  console.log(`\n${colors.bold}${colors.blue}✅ Post-Deployment Verification Checklist:${colors.reset}\n`);
  
  const checks = [
    'Homepage loads correctly (Korean version)',
    'English version accessible at /en',
    'Language switching works',
    'All sections display properly (Hero, About, Products, Contact)',
    'Product detail pages accessible',
    'Admin panel login works (/admin)',
    'Contact form submits successfully',
    'Email sending works (test with real email)',
    'Image uploads work in admin panel',
    'Mobile responsiveness verified',
    'Performance metrics acceptable',
    'SEO metadata present',
    'Custom domain working (hyperstone.co.kr)',
    'SSL certificate active (HTTPS)',
    'Error pages display correctly (404, 500)'
  ];
  
  checks.forEach((check, index) => {
    console.log(`${colors.green}☐${colors.reset} ${index + 1}. ${check}`);
  });
}

function displayEnvironmentVariables() {
  console.log(`\n${colors.bold}${colors.blue}🔐 Required Environment Variables for Vercel:${colors.reset}\n`);
  
  const envVars = [
    {
      name: 'ADMIN_PASSWORD',
      description: 'Secure password for admin panel access',
      example: 'your-secure-password-123'
    },
    {
      name: 'EMAIL_HOST',
      description: 'SMTP server hostname',
      example: 'smtp.gmail.com'
    },
    {
      name: 'EMAIL_PORT',
      description: 'SMTP server port',
      example: '587'
    },
    {
      name: 'EMAIL_USER',
      description: 'Email account username',
      example: 'your-email@gmail.com'
    },
    {
      name: 'EMAIL_PASS',
      description: 'Email account password (use App Password for Gmail)',
      example: 'your-gmail-app-password'
    },
    {
      name: 'EMAIL_RECIPIENT',
      description: 'Email address to receive contact form submissions',
      example: 'admin@hyperstone.co.kr'
    },
    {
      name: 'NEXT_PUBLIC_SITE_URL',
      description: 'Public URL of your deployed site',
      example: 'https://hyperstone.co.kr'
    }
  ];
  
  envVars.forEach(envVar => {
    console.log(`${colors.yellow}${envVar.name}${colors.reset}`);
    console.log(`  Description: ${envVar.description}`);
    console.log(`  Example: ${colors.green}${envVar.example}${colors.reset}\n`);
  });
}

// Main execution
console.log(`${colors.bold}Pre-Deployment File Check:${colors.reset}\n`);

let allFilesExist = true;

// Check essential files
const essentialFiles = [
  ['package.json', 'Package configuration'],
  ['next.config.ts', 'Next.js configuration'],
  ['vercel.json', 'Vercel deployment configuration'],
  ['.env.example', 'Environment variables template'],
  ['src/app/layout.tsx', 'Root layout component'],
  ['src/app/[locale]/page.tsx', 'Main page component'],
  ['src/app/api/contact/route.ts', 'Contact form API'],
  ['src/app/api/admin/login/route.ts', 'Admin login API'],
  ['tailwind.config.ts', 'Tailwind CSS configuration'],
  ['tsconfig.json', 'TypeScript configuration']
];

essentialFiles.forEach(([file, description]) => {
  const exists = checkFile(file, description);
  if (!exists) allFilesExist = false;
});

// Check environment variables
checkEnvExample();

// Display results
if (allFilesExist) {
  console.log(`\n${colors.green}${colors.bold}✅ All essential files are present!${colors.reset}`);
  console.log(`${colors.green}Your project is ready for Vercel deployment.${colors.reset}\n`);
} else {
  console.log(`\n${colors.red}${colors.bold}❌ Some essential files are missing!${colors.reset}`);
  console.log(`${colors.red}Please ensure all files are present before deployment.${colors.reset}\n`);
}

// Display deployment steps and checklists
displayDeploymentSteps();
displayEnvironmentVariables();
displayPostDeploymentChecklist();

console.log(`\n${colors.bold}${colors.blue}📚 Additional Resources:${colors.reset}`);
console.log(`${colors.blue}• Vercel Documentation: https://vercel.com/docs${colors.reset}`);
console.log(`${colors.blue}• Next.js Deployment Guide: https://nextjs.org/docs/deployment${colors.reset}`);
console.log(`${colors.blue}• Project Repository: https://github.com/hyperstonekorea/hyperstone-website${colors.reset}`);
console.log(`${colors.blue}• Deployment Guide: ./VERCEL_DEPLOYMENT.md${colors.reset}\n`);

console.log(`${colors.green}${colors.bold}🚀 Ready to deploy to Vercel!${colors.reset}`);
console.log(`${colors.green}Follow the steps above and refer to VERCEL_DEPLOYMENT.md for detailed instructions.${colors.reset}\n`);