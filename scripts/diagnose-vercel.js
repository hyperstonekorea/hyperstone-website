#!/usr/bin/env node

/**
 * HYPERSTONE Website - Vercel Deployment Diagnostic Script
 * 
 * This script helps diagnose common Vercel deployment issues
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.blue}🔍 Vercel Deployment Diagnostic${colors.reset}\n`);

function checkFile(filePath, description, required = true) {
  const exists = fs.existsSync(filePath);
  const status = exists ? `${colors.green}✅` : (required ? `${colors.red}❌` : `${colors.yellow}⚠️`);
  console.log(`${status} ${description}: ${filePath}${colors.reset}`);
  return exists;
}

function checkPackageJson() {
  console.log(`${colors.bold}📦 Package.json Analysis:${colors.reset}`);
  
  if (!fs.existsSync('package.json')) {
    console.log(`${colors.red}❌ package.json not found!${colors.reset}`);
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Check required scripts
  const requiredScripts = ['build', 'build:production', 'start'];
  requiredScripts.forEach(script => {
    const hasScript = packageJson.scripts && packageJson.scripts[script];
    const status = hasScript ? `${colors.green}✅` : `${colors.red}❌`;
    console.log(`${status} Script "${script}": ${hasScript ? packageJson.scripts[script] : 'Missing'}${colors.reset}`);
  });
  
  // Check dependencies
  const requiredDeps = ['next', 'react', 'react-dom'];
  requiredDeps.forEach(dep => {
    const hasDep = packageJson.dependencies && packageJson.dependencies[dep];
    const status = hasDep ? `${colors.green}✅` : `${colors.red}❌`;
    console.log(`${status} Dependency "${dep}": ${hasDep || 'Missing'}${colors.reset}`);
  });
  
  return true;
}

function checkNextConfig() {
  console.log(`\n${colors.bold}⚙️ Next.js Configuration:${colors.reset}`);
  
  const configFiles = ['next.config.js', 'next.config.ts', 'next.config.mjs'];
  let configFound = false;
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`${colors.green}✅ Found: ${file}${colors.reset}`);
      configFound = true;
    }
  });
  
  if (!configFound) {
    console.log(`${colors.yellow}⚠️ No Next.js config file found (optional)${colors.reset}`);
  }
  
  return true;
}

function checkVercelConfig() {
  console.log(`\n${colors.bold}🚀 Vercel Configuration:${colors.reset}`);
  
  if (fs.existsSync('vercel.json')) {
    console.log(`${colors.green}✅ vercel.json found${colors.reset}`);
    
    try {
      const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      
      // Check build command
      if (vercelConfig.buildCommand) {
        console.log(`${colors.green}✅ Build command: ${vercelConfig.buildCommand}${colors.reset}`);
      } else {
        console.log(`${colors.yellow}⚠️ No custom build command (will use default)${colors.reset}`);
      }
      
      // Check framework
      if (vercelConfig.framework) {
        console.log(`${colors.green}✅ Framework: ${vercelConfig.framework}${colors.reset}`);
      }
      
      // Check regions
      if (vercelConfig.regions) {
        console.log(`${colors.green}✅ Regions: ${vercelConfig.regions.join(', ')}${colors.reset}`);
      }
      
    } catch (error) {
      console.log(`${colors.red}❌ Invalid vercel.json: ${error.message}${colors.reset}`);
    }
  } else {
    console.log(`${colors.yellow}⚠️ No vercel.json found (will use defaults)${colors.reset}`);
  }
}

function checkAppStructure() {
  console.log(`\n${colors.bold}📁 App Structure Check:${colors.reset}`);
  
  // Check for App Router structure
  const appRouterFiles = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/[locale]/layout.tsx',
    'src/app/[locale]/page.tsx'
  ];
  
  let hasAppRouter = false;
  appRouterFiles.forEach(file => {
    if (checkFile(file, `App Router: ${file}`, false)) {
      hasAppRouter = true;
    }
  });
  
  if (hasAppRouter) {
    console.log(`${colors.green}✅ Using Next.js App Router${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️ App Router structure not detected${colors.reset}`);
  }
  
  // Check for Pages Router (fallback)
  const pagesRouterFiles = [
    'pages/_app.tsx',
    'pages/index.tsx'
  ];
  
  let hasPagesRouter = false;
  pagesRouterFiles.forEach(file => {
    if (checkFile(file, `Pages Router: ${file}`, false)) {
      hasPagesRouter = true;
    }
  });
  
  if (hasPagesRouter) {
    console.log(`${colors.green}✅ Using Next.js Pages Router${colors.reset}`);
  }
  
  if (!hasAppRouter && !hasPagesRouter) {
    console.log(`${colors.red}❌ No valid Next.js structure detected!${colors.reset}`);
    return false;
  }
  
  return true;
}

function checkEnvironmentFiles() {
  console.log(`\n${colors.bold}🔐 Environment Configuration:${colors.reset}`);
  
  checkFile('.env.example', 'Environment template', false);
  checkFile('.env.local', 'Local environment', false);
  checkFile('.env.vercel', 'Vercel environment template', false);
  
  if (fs.existsSync('.env.example')) {
    const envExample = fs.readFileSync('.env.example', 'utf8');
    const requiredVars = [
      'ADMIN_PASSWORD',
      'EMAIL_HOST',
      'EMAIL_USER',
      'EMAIL_PASS',
      'NEXT_PUBLIC_SITE_URL'
    ];
    
    console.log(`\n${colors.blue}Required environment variables:${colors.reset}`);
    requiredVars.forEach(varName => {
      const hasVar = envExample.includes(varName);
      const status = hasVar ? `${colors.green}✅` : `${colors.red}❌`;
      console.log(`${status} ${varName}${colors.reset}`);
    });
  }
}

function checkGitIgnore() {
  console.log(`\n${colors.bold}📝 Git Configuration:${colors.reset}`);
  
  if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    const importantIgnores = ['.env.local', '.next', 'node_modules'];
    
    importantIgnores.forEach(ignore => {
      const hasIgnore = gitignore.includes(ignore);
      const status = hasIgnore ? `${colors.green}✅` : `${colors.red}❌`;
      console.log(`${status} Ignoring: ${ignore}${colors.reset}`);
    });
  } else {
    console.log(`${colors.red}❌ No .gitignore found${colors.reset}`);
  }
}

function provideSolutions() {
  console.log(`\n${colors.bold}${colors.blue}💡 Common Solutions for "No Production Deployment":${colors.reset}\n`);
  
  const solutions = [
    {
      issue: "Project not imported to Vercel",
      solution: "Go to vercel.com, click 'New Project', import from GitHub"
    },
    {
      issue: "Build command incorrect",
      solution: "Set build command to 'npm run build' or 'npm run build:production'"
    },
    {
      issue: "Missing environment variables",
      solution: "Add all required env vars in Vercel project settings"
    },
    {
      issue: "Build failing",
      solution: "Check build logs in Vercel dashboard for specific errors"
    },
    {
      issue: "GitHub connection issues",
      solution: "Reconnect GitHub in Vercel account settings"
    },
    {
      issue: "Repository access",
      solution: "Ensure Vercel has access to hyperstonekorea organization"
    }
  ];
  
  solutions.forEach((item, index) => {
    console.log(`${colors.yellow}${index + 1}. ${item.issue}${colors.reset}`);
    console.log(`   ${colors.green}Solution: ${item.solution}${colors.reset}\n`);
  });
}

function displayNextSteps() {
  console.log(`${colors.bold}${colors.blue}🚀 Next Steps:${colors.reset}\n`);
  
  console.log(`${colors.green}1. Test local build:${colors.reset}`);
  console.log(`   npm run build:production`);
  console.log(`   npm run start\n`);
  
  console.log(`${colors.green}2. Check Vercel project:${colors.reset}`);
  console.log(`   - Go to vercel.com/dashboard`);
  console.log(`   - Find your hyperstone-website project`);
  console.log(`   - Check Deployments tab for errors\n`);
  
  console.log(`${colors.green}3. Add environment variables:${colors.reset}`);
  console.log(`   - Project Settings > Environment Variables`);
  console.log(`   - Add all variables from .env.vercel\n`);
  
  console.log(`${colors.green}4. Trigger deployment:${colors.reset}`);
  console.log(`   - Push to main branch, or`);
  console.log(`   - Click 'Redeploy' in Vercel dashboard\n`);
  
  console.log(`${colors.blue}📚 For detailed help, see:${colors.reset}`);
  console.log(`   - ./VERCEL_TROUBLESHOOTING.md`);
  console.log(`   - ./VERCEL_DEPLOYMENT.md`);
}

// Run all checks
async function runDiagnostic() {
  console.log(`${colors.blue}Checking project structure and configuration...${colors.reset}\n`);
  
  let allGood = true;
  
  // Essential file checks
  console.log(`${colors.bold}📋 Essential Files:${colors.reset}`);
  allGood &= checkFile('package.json', 'Package configuration');
  checkFile('tsconfig.json', 'TypeScript configuration', false);
  checkFile('tailwind.config.ts', 'Tailwind configuration', false);
  
  console.log('');
  
  // Detailed checks
  allGood &= checkPackageJson();
  checkNextConfig();
  checkVercelConfig();
  allGood &= checkAppStructure();
  checkEnvironmentFiles();
  checkGitIgnore();
  
  // Results
  console.log(`\n${colors.bold}📊 Diagnostic Results:${colors.reset}`);
  if (allGood) {
    console.log(`${colors.green}✅ Project structure looks good!${colors.reset}`);
    console.log(`${colors.green}The issue is likely with Vercel configuration or deployment process.${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ Some issues detected in project structure.${colors.reset}`);
    console.log(`${colors.red}Fix these issues before deploying to Vercel.${colors.reset}`);
  }
  
  provideSolutions();
  displayNextSteps();
}

// Run the diagnostic
runDiagnostic().catch(error => {
  console.error(`${colors.red}Diagnostic error: ${error.message}${colors.reset}`);
});