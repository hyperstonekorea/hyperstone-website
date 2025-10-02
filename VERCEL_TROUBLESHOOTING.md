# Vercel Deployment Troubleshooting Guide

## Issue: "No Production Deployment" in Vercel Overview

This guide will help you resolve the "No Production Deployment" issue and get your HYPERSTONE website deployed successfully.

## 🔍 Step 1: Check Project Status

### 1.1 Verify Project Import
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Look for your project: `hyperstone-website` or `hyperstonekorea-hyperstone-website`
3. If you don't see the project, you need to import it first

### 1.2 Import Project (if not done)
1. Click "New Project" in Vercel dashboard
2. Connect your GitHub account if not connected
3. Find and import: `hyperstonekorea/hyperstone-website`
4. Click "Import"

## 🔧 Step 2: Check Project Configuration

### 2.1 Verify Build Settings
In your Vercel project settings, ensure:

- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build:production` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅
- **Node.js Version**: 18.x or 20.x ✅

### 2.2 Fix Build Command (if needed)
If the build command is wrong:
1. Go to Project Settings > General
2. Change Build Command to: `npm run build:production`
3. Save changes

## 🔐 Step 3: Environment Variables Setup

### 3.1 Required Variables
Add these in Project Settings > Environment Variables:

```bash
ADMIN_PASSWORD=your-secure-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_RECIPIENT=admin@hyperstone.co.kr
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

### 3.2 How to Add Variables
1. Go to Project Settings > Environment Variables
2. Click "Add New"
3. For each variable:
   - **Name**: Variable name (e.g., `ADMIN_PASSWORD`)
   - **Value**: Your actual value
   - **Environment**: Select all (Production, Preview, Development)
4. Click "Save"

## 🚀 Step 4: Trigger Deployment

### 4.1 Manual Deployment
1. Go to your project dashboard
2. Click "Deployments" tab
3. Click "Redeploy" on the latest deployment
4. Or click "Deploy" if no deployments exist

### 4.2 Git Push Deployment
1. Make a small change to your code (e.g., add a comment)
2. Commit and push to the `main` branch:
```bash
git add .
git commit -m "Trigger Vercel deployment"
git push origin main
```

## 🔍 Step 5: Check Build Logs

### 5.1 View Deployment Logs
1. Go to Deployments tab in your Vercel project
2. Click on the latest deployment
3. Check the "Build Logs" section for errors

### 5.2 Common Build Issues and Solutions

**Issue: "Module not found" errors**
```bash
# Solution: Ensure all dependencies are in package.json
npm install
```

**Issue: "TypeScript compilation errors"**
```bash
# Solution: Fix TypeScript errors locally first
npm run type-check
```

**Issue: "Build timeout"**
```bash
# Solution: Optimize build process or contact Vercel support
```

## 🔧 Step 6: Verify GitHub Connection

### 6.1 Check Repository Access
1. Ensure the GitHub repository exists: https://github.com/hyperstonekorea/hyperstone-website
2. Verify you have access to the repository
3. Check that the code is pushed to the `main` branch

### 6.2 Reconnect GitHub (if needed)
1. Go to Vercel Account Settings > Git
2. Disconnect and reconnect GitHub
3. Re-import the project

## 🎯 Step 7: Test Local Build

Before deploying, test the build locally:

```bash
# Navigate to project directory
cd hyperstone-website

# Install dependencies
npm install

# Test production build
npm run build:production

# Test if build succeeds
npm run start
```

If local build fails, fix the issues before deploying to Vercel.

## 📋 Step 8: Deployment Checklist

Run our deployment checklist to verify everything is ready:

```bash
npm run deploy:checklist
```

This will check:
- ✅ All required files are present
- ✅ Configuration is correct
- ✅ Environment variables template exists

## 🚨 Common Issues and Solutions

### Issue 1: Build Command Not Found
**Error**: `Command "npm run build:production" not found`

**Solution**: 
1. Check if the script exists in `package.json`
2. Use standard Next.js build command: `npm run build`
3. Update Vercel build command to: `npm run build`

### Issue 2: Environment Variables Not Working
**Error**: Admin login fails or contact form doesn't work

**Solution**:
1. Double-check variable names (case-sensitive)
2. Ensure variables are set for "Production" environment
3. Redeploy after adding variables

### Issue 3: Import/Export Errors
**Error**: Module import/export issues

**Solution**:
1. Check TypeScript configuration
2. Ensure all imports use correct paths
3. Run `npm run type-check` locally

### Issue 4: API Routes Not Working
**Error**: 404 on API endpoints

**Solution**:
1. Verify API routes are in `src/app/api/` directory
2. Check file naming convention: `route.ts`
3. Ensure proper export of HTTP methods

## 🔄 Step 9: Force Fresh Deployment

If nothing else works, try a fresh deployment:

### 9.1 Clear Vercel Cache
1. Go to Project Settings > Functions
2. Clear all function cache
3. Redeploy

### 9.2 Delete and Re-import Project
1. Delete the project from Vercel
2. Re-import from GitHub
3. Reconfigure settings and environment variables

## 📞 Step 10: Get Help

If you're still having issues:

### 10.1 Check Vercel Status
- Visit: https://vercel.com/status
- Check for any ongoing issues

### 10.2 Vercel Support
- Contact Vercel support: https://vercel.com/support
- Provide your project URL and error details

### 10.3 Community Help
- Vercel Discord: https://vercel.com/discord
- GitHub Discussions: https://github.com/vercel/next.js/discussions

## ✅ Success Indicators

Your deployment is successful when you see:
- ✅ Green checkmark in Deployments tab
- ✅ Live URL accessible
- ✅ "Production" badge on latest deployment
- ✅ Website loads correctly

## 🎯 Next Steps After Successful Deployment

1. **Test the website**: Visit your Vercel URL
2. **Run verification**: `npm run deploy:verify https://your-url.vercel.app`
3. **Set up custom domain**: Configure hyperstone.co.kr
4. **Monitor performance**: Check Vercel Analytics

---

## Quick Fix Commands

```bash
# Check if project builds locally
npm run build:production

# Run deployment checklist
npm run deploy:checklist

# Verify deployment after it's live
npm run deploy:verify https://your-vercel-url.vercel.app
```

Remember: Most deployment issues are due to missing environment variables or build configuration problems. Start with those first!