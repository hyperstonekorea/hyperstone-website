# 🚀 Complete HYPERSTONE Website Setup Guide

## 🎯 Everything You Need to Deploy Your Website

This guide will take you from zero to a live website at https://hyperstone.co.kr

## 📋 Prerequisites Checklist

✅ **GitHub Repository**: `hyperstonekorea/hyperstone-website` (ready)  
✅ **Domain**: hyperstone.co.kr (purchased from hosting.kr)  
✅ **Nameservers**: Changed to Vercel (ns1/ns2.vercel-dns.com)  
✅ **Code**: Build successful locally  
✅ **Environment Variables**: Ready to configure  

## 🚀 Quick Start (5 Steps)

### Step 1: Run Setup Helper
```bash
npm run vercel:setup
```
This will show you exactly what to do step by step.

### Step 2: Import Project to Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import `hyperstonekorea/hyperstone-website`

### Step 3: Add Environment Variables
```bash
npm run vercel:env-template
```
This will show you exactly what variables to add and their values.

### Step 4: Add Domain
1. Project Settings → Domains
2. Add `hyperstone.co.kr`
3. Add `www.hyperstone.co.kr`

### Step 5: Verify Deployment
```bash
npm run deploy:verify https://hyperstone.co.kr
```

## 📚 Detailed Guides Available

### 🔧 Setup Guides
- `VERCEL_SETUP_AUTOMATION.md` - Complete Vercel configuration
- `VERCEL_NAMESERVER_SETUP.md` - Domain setup with Vercel nameservers
- `DOMAIN_SETUP_GUIDE.md` - General domain configuration

### 🛠️ Troubleshooting Guides
- `VERCEL_TROUBLESHOOTING.md` - Common issues and solutions
- `DEPLOYMENT_TROUBLESHOOTING_STEPS.md` - Deployment problems
- `BUILD_SUCCESS_SUMMARY.md` - What was fixed in the build

### 🧪 Testing & Verification
- `scripts/vercel-setup.js` - Interactive setup guide
- `scripts/vercel-env-template.js` - Environment variables template
- `scripts/check-dns.js` - DNS and domain verification
- `scripts/verify-deployment.js` - Complete website testing

## 🎯 Your Configuration Summary

### **Domain Configuration**
- **Primary Domain**: hyperstone.co.kr
- **WWW Domain**: www.hyperstone.co.kr
- **Nameservers**: ns1.vercel-dns.com, ns2.vercel-dns.com
- **SSL**: Automatic (Let's Encrypt via Vercel)

### **Environment Variables**
```bash
ADMIN_PASSWORD=rlatkdgus1201
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=hyperstonekorea@gmail.com
EMAIL_PASS=xoqh dxli hgyf wsbt
EMAIL_RECIPIENT=hyperstonekorea@gmail.com
NEXT_PUBLIC_SITE_URL=https://hyperstone.co.kr
NEXT_TELEMETRY_DISABLED=1
```

### **Build Configuration**
- **Framework**: Next.js 15.5.4 with App Router
- **Build Command**: `npm run build:production`
- **Region**: Seoul (icn1) for optimal Korean performance
- **Node.js**: 18.x runtime

## ⏱️ Timeline Expectations

### **Immediate (0-5 minutes)**
- ✅ Project import to Vercel
- ✅ Environment variables setup
- ✅ Initial deployment

### **Short Term (5-30 minutes)**
- ✅ Build completion and testing
- ✅ SSL certificate activation
- ✅ Website functionality verification

### **Medium Term (24-48 hours)**
- ✅ Full nameserver propagation globally
- ✅ Domain accessible worldwide
- ✅ Optimal performance routing

## 🎯 Success Criteria

Your website is fully deployed when:

### ✅ **Technical Verification**
- [ ] Vercel deployment shows green checkmark
- [ ] Domain resolves to Vercel servers
- [ ] SSL certificate is active (green padlock)
- [ ] All environment variables configured

### ✅ **Functional Verification**
- [ ] Homepage loads in Korean
- [ ] English version accessible at /en
- [ ] Language switching works
- [ ] Admin panel login works (password: rlatkdgus1201)
- [ ] Contact form sends emails to hyperstonekorea@gmail.com

### ✅ **Performance Verification**
- [ ] Page load time < 3 seconds
- [ ] Mobile responsiveness
- [ ] SEO metadata present
- [ ] Core Web Vitals scores > 90

## 🚨 Common Issues & Quick Fixes

### **Build Fails**
```bash
# Test build locally first
npm run build:production

# If successful locally, check Vercel environment variables
```

### **Domain Not Working**
```bash
# Check nameserver propagation
npm run domain:check-dns

# Wait up to 48 hours for full propagation
```

### **Contact Form Not Sending**
- Verify Gmail app password is correct
- Check spam folder for test emails
- Ensure all EMAIL_* variables are set

### **Admin Panel Not Working**
- Verify ADMIN_PASSWORD environment variable
- Check that password matches: rlatkdgus1201

## 📞 Support Resources

### **Automated Help**
```bash
npm run vercel:setup          # Interactive setup guide
npm run vercel:env-template   # Environment variables help
npm run domain:check-dns      # Domain status check
npm run deploy:verify         # Full website test
```

### **Documentation**
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Domain Setup**: https://vercel.com/docs/concepts/projects/domains

### **Support Channels**
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions
- **Status Page**: https://vercel.com/status

## 🎉 Final Result

Once complete, you'll have:

### **🌐 Live Website**
- **Main Site**: https://hyperstone.co.kr
- **English Version**: https://hyperstone.co.kr/en
- **Admin Panel**: https://hyperstone.co.kr/admin

### **📊 Features Working**
- ✅ Bilingual content (Korean/English)
- ✅ Product showcase with detail pages
- ✅ Contact form with email notifications
- ✅ Admin panel for content management
- ✅ SEO optimization
- ✅ Mobile responsiveness
- ✅ Performance optimization

### **🔒 Security & Performance**
- ✅ SSL certificate (HTTPS)
- ✅ Security headers
- ✅ CDN distribution
- ✅ Optimized for Korean users

---

**🚀 Ready to deploy? Start with: `npm run vercel:setup`**

**Your HYPERSTONE website will be live and professional!** 🎯