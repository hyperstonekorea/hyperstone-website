# 🚀 Automated Vercel Setup Guide - HYPERSTONE Website

## 🎯 Complete Vercel Configuration Checklist

I'll guide you through each step with exact instructions and automation where possible.

## Step 1: Vercel Account & Authentication

### 1.1 Create/Login to Vercel Account
1. **Go to**: https://vercel.com
2. **Sign up/Login** with GitHub (recommended)
3. **Authorize GitHub** access when prompted

### 1.2 Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
vercel login
```

## Step 2: Import Project to Vercel

### 2.1 Manual Import (Easiest)
1. **Go to**: https://vercel.com/dashboard
2. **Click**: "New Project"
3. **Import from GitHub**: Find `hyperstonekorea/hyperstone-website`
4. **Click**: "Import"

### 2.2 Automated Import via CLI
```bash
# Navigate to project directory
cd hyperstone-website

# Deploy to Vercel (will create project)
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: hyperstone-website
# - Directory: ./
# - Override settings? No
```

## Step 3: Configure Project Settings

### 3.1 Build & Development Settings
**Framework**: Next.js (auto-detected)  
**Root Directory**: `./`  
**Build Command**: `npm run build:production`  
**Output Directory**: `.next`  
**Install Command**: `npm install`  
**Development Command**: `npm run dev`  

### 3.2 Environment Variables Configuration

Add these **exact variables** in Vercel Dashboard:

**Path**: Project → Settings → Environment Variables

```bash
# Admin Configuration
ADMIN_PASSWORD=rlatkdgus1201

# Email Configuration  
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=hyperstonekorea@gmail.com
EMAIL_PASS=xoqh dxli hgyf wsbt
EMAIL_RECIPIENT=hyperstonekorea@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://hyperstone.co.kr

# Optional
NEXT_TELEMETRY_DISABLED=1
```

**For each variable**:
- **Environment**: Select ALL (Production, Preview, Development)
- **Value**: Copy exact values above
- **Click**: "Save"

## Step 4: Domain Configuration

### 4.1 Add Custom Domain
1. **Go to**: Project → Settings → Domains
2. **Add Domain**: `hyperstone.co.kr`
3. **Add WWW**: `www.hyperstone.co.kr`
4. **Configure Redirect**: www → non-www (recommended)

### 4.2 Verify Domain Status
- ✅ **Valid Configuration** (green checkmark)
- ✅ **SSL Certificate**: Active
- ✅ **DNS**: Automatically configured (Vercel nameservers)

## Step 5: Deployment Configuration

### 5.1 Git Integration Settings
**Branch**: `main` (auto-deploy)  
**Production Branch**: `main`  
**Preview Deployments**: Enabled  
**Auto-Deploy**: Enabled  

### 5.2 Function Configuration
**Region**: Seoul (icn1) - Already configured in vercel.json  
**Runtime**: Node.js 18.x  
**Memory**: 1024 MB (default)  
**Timeout**: 10 seconds (configured)  

## Step 6: Performance & Security Settings

### 6.1 Headers & Security
Already configured in `vercel.json`:
- ✅ Security headers (CSP, XSS protection)
- ✅ Cache headers for static assets
- ✅ CORS configuration

### 6.2 Analytics & Monitoring
1. **Enable Web Analytics**: Project → Analytics → Enable
2. **Enable Speed Insights**: Project → Speed Insights → Enable
3. **Set up Monitoring**: Project → Functions → Monitor

## 🤖 Automation Scripts

### Quick Setup Script
```bash
# Run this after manual project import
npm run vercel:setup
```

### Environment Variables Script
```bash
# Automatically set environment variables (if using CLI)
npm run vercel:env-setup
```

### Domain Setup Script
```bash
# Add domains via CLI
npm run vercel:domain-setup
```

## 📋 Verification Checklist

After setup, verify everything works:

### ✅ Project Status
- [ ] Project imported successfully
- [ ] Build completes without errors
- [ ] All environment variables set
- [ ] Domain added and verified

### ✅ Website Functionality
- [ ] Homepage loads (Korean)
- [ ] English version works (/en)
- [ ] Admin panel accessible (/admin)
- [ ] Contact form sends emails
- [ ] SSL certificate active

### ✅ Performance
- [ ] Page load speed < 3 seconds
- [ ] Mobile responsiveness
- [ ] SEO metadata present
- [ ] Analytics tracking

## 🔧 Automated Verification

Run our comprehensive test:
```bash
npm run deploy:verify https://hyperstone.co.kr
```

## 🚨 Troubleshooting

### Build Failures
```bash
# Check build locally first
npm run build:production

# Check Vercel build logs
vercel logs
```

### Environment Variable Issues
```bash
# List current variables
vercel env ls

# Add missing variable
vercel env add VARIABLE_NAME
```

### Domain Issues
```bash
# Check domain status
vercel domains ls

# Add domain via CLI
vercel domains add hyperstone.co.kr
```

## 📞 Support Resources

### Vercel Documentation
- **Domains**: https://vercel.com/docs/concepts/projects/domains
- **Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables
- **Next.js**: https://vercel.com/docs/frameworks/nextjs

### Get Help
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions
- **Status Page**: https://vercel.com/status

## 🎯 Success Indicators

Your setup is complete when:
- ✅ **Green deployment status** in Vercel dashboard
- ✅ **Website loads** at https://hyperstone.co.kr
- ✅ **Admin panel works** with password: rlatkdgus1201
- ✅ **Contact form** sends emails to hyperstonekorea@gmail.com
- ✅ **SSL certificate** shows green padlock
- ✅ **Performance score** > 90 in PageSpeed Insights

## 🎉 Final Steps

### Update Local Environment
```bash
# Update site URL
NEXT_PUBLIC_SITE_URL=https://hyperstone.co.kr
```

### Share Your Website
- **Main Site**: https://hyperstone.co.kr
- **Admin Panel**: https://hyperstone.co.kr/admin
- **English Version**: https://hyperstone.co.kr/en

### Monitor Performance
- **Vercel Analytics**: Real-time visitor data
- **Speed Insights**: Core Web Vitals monitoring
- **Function Logs**: API performance tracking

---

**Follow this guide step by step, and your HYPERSTONE website will be live on Vercel with optimal configuration!** 🚀

**Estimated Setup Time**: 15-30 minutes  
**Domain Activation**: Instant (once nameservers propagate)  
**SSL Certificate**: Automatic and immediate