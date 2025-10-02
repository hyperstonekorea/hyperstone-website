#!/usr/bin/env node

/**
 * HYPERSTONE Website - Vercel Environment Variables Template
 * 
 * This script generates the exact environment variables for Vercel
 */

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.blue}🔐 Vercel Environment Variables Template${colors.reset}\n`);

const envVars = [
  {
    name: 'ADMIN_PASSWORD',
    value: 'rlatkdgus1201',
    description: 'Password for admin panel access',
    required: true
  },
  {
    name: 'EMAIL_HOST',
    value: 'smtp.gmail.com',
    description: 'SMTP server hostname',
    required: true
  },
  {
    name: 'EMAIL_PORT',
    value: '587',
    description: 'SMTP server port',
    required: true
  },
  {
    name: 'EMAIL_USER',
    value: 'hyperstonekorea@gmail.com',
    description: 'Gmail account username',
    required: true
  },
  {
    name: 'EMAIL_PASS',
    value: 'xoqh dxli hgyf wsbt',
    description: 'Gmail app password (not regular password)',
    required: true
  },
  {
    name: 'EMAIL_RECIPIENT',
    value: 'hyperstonekorea@gmail.com',
    description: 'Email address to receive contact form submissions',
    required: true
  },
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    value: 'https://hyperstone.co.kr',
    description: 'Public URL of your website',
    required: true
  },
  {
    name: 'NEXT_TELEMETRY_DISABLED',
    value: '1',
    description: 'Disable Next.js telemetry for privacy',
    required: false
  }
];

console.log(`${colors.bold}Copy and paste these into Vercel Project Settings > Environment Variables:${colors.reset}\n`);

console.log(`${colors.blue}📍 Path: Vercel Dashboard > Your Project > Settings > Environment Variables${colors.reset}\n`);

envVars.forEach((envVar, index) => {
  const requiredLabel = envVar.required ? `${colors.red}(Required)${colors.reset}` : `${colors.yellow}(Optional)${colors.reset}`;
  
  console.log(`${colors.bold}${index + 1}. ${envVar.name}${colors.reset} ${requiredLabel}`);
  console.log(`${colors.green}Value: ${envVar.value}${colors.reset}`);
  console.log(`${colors.yellow}Description: ${envVar.description}${colors.reset}`);
  console.log(`${colors.blue}Environment: Production, Preview, Development (select all)${colors.reset}\n`);
});

console.log(`${colors.bold}${colors.blue}📋 Step-by-Step Instructions:${colors.reset}\n`);

console.log(`${colors.yellow}For each variable above:${colors.reset}`);
console.log(`${colors.green}1. Click "Add New" in Vercel Environment Variables${colors.reset}`);
console.log(`${colors.green}2. Name: Copy the variable name exactly${colors.reset}`);
console.log(`${colors.green}3. Value: Copy the value exactly${colors.reset}`);
console.log(`${colors.green}4. Environment: Select all three (Production, Preview, Development)${colors.reset}`);
console.log(`${colors.green}5. Click "Save"${colors.reset}`);
console.log(`${colors.green}6. Repeat for all ${envVars.length} variables${colors.reset}\n`);

console.log(`${colors.bold}${colors.blue}⚠️ Important Notes:${colors.reset}\n`);

console.log(`${colors.yellow}• EMAIL_PASS is a Gmail App Password, not your regular Gmail password${colors.reset}`);
console.log(`${colors.yellow}• Make sure to select ALL environments for each variable${colors.reset}`);
console.log(`${colors.yellow}• Variable names are case-sensitive${colors.reset}`);
console.log(`${colors.yellow}• No spaces before or after values${colors.reset}`);
console.log(`${colors.yellow}• After adding all variables, redeploy your project${colors.reset}\n`);

console.log(`${colors.bold}${colors.blue}🧪 Test After Setup:${colors.reset}\n`);

console.log(`${colors.green}1. Admin Panel: https://hyperstone.co.kr/admin${colors.reset}`);
console.log(`   ${colors.yellow}Password: rlatkdgus1201${colors.reset}\n`);

console.log(`${colors.green}2. Contact Form: Fill out and submit${colors.reset}`);
console.log(`   ${colors.yellow}Should send email to: hyperstonekorea@gmail.com${colors.reset}\n`);

console.log(`${colors.green}3. Website Loading: https://hyperstone.co.kr${colors.reset}`);
console.log(`   ${colors.yellow}Should load Korean version by default${colors.reset}\n`);

console.log(`${colors.blue}📚 Need Help?${colors.reset}`);
console.log(`${colors.yellow}• Vercel Docs: https://vercel.com/docs/concepts/projects/environment-variables${colors.reset}`);
console.log(`${colors.yellow}• Setup Guide: ./VERCEL_SETUP_AUTOMATION.md${colors.reset}`);

console.log(`\n${colors.bold}${colors.green}🎯 Ready to add these variables to Vercel!${colors.reset}`);