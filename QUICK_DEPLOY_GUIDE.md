# 🚀 Quick Vercel Deployment Guide - HYPERSTONE Website

## ✅ Your Configuration is Ready!

All your environment variables are configured and the build is successful. Follow these steps to deploy:

## Step 1: Deploy to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "New Project"**
3. **Import from GitHub**: Find `hyperstonekorea/hyperstone-website`
4. **Click "Import"**

## Step 2: Add Environment Variables

In Vercel Project Settings > Environment Variables, add these **exact values**:

```bash
ADMIN_PASSWORD=rlatkdgus1201
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=hyperstonekorea@gmail.com
EMAIL_PASS=xoqh dxli hgyf wsbt
EMAIL_RECIPIENT=hyperstonekorea@gmail.com
NEXT_PUBLIC_SITE_URL=https://hyperstone-website.vercel.app
NEXT_TELEMETRY_DISABLED=1
```

### How to Add Each Variable:
1. Click "Add New" in Environment Variables
2. **Name**: Copy the variable name (e.g., `ADMIN_PASSWORD`)
3. **Value**: Copy the value (e.g., `rlatkdgus1201`)
4. **Environment**: Select all three: Production, Preview, Development
5. Click "Save"
6. Repeat for all 7 variables

## Step 3: Deploy

1. **Click "Deploy"** - Vercel will automatically build and deploy
2. **Wait for completion** (usually 2-3 minutes)
3. **Get your URL**: `https://hyperstone-website.vercel.app`

## Step 4: Test Your Website

After deployment, test these features:

### ✅ Basic Functionality:
- [ ] Homepage loads in Korean
- [ ] English version works (`/en`)
- [ ] Language switching works
- [ ] All product pages accessible

### ✅ Admin Panel:
- [ ] Go to `/admin`
- [ ] Login with password: `rlatkdgus1201`
- [ ] Admin dashboard loads

### ✅ Contact Form:
- [ ] Fill out contact form
- [ ] Submit form
- [ ] Check `hyperstonekorea@gmail.com` for email

## Step 5: Verify Deployment

Run our verification script:
```bash
npm run deploy:verify https://hyperstone-website.vercel.app
```

## 🎯 Expected Results

After successful deployment:
- **Live URL**: https://hyperstone-website.vercel.app
- **Admin Panel**: https://hyperstone-website.vercel.app/admin
- **Contact Form**: Sends emails to hyperstonekorea@gmail.com
- **Performance**: Optimized for Korean users

## 🔧 If You Encounter Issues

### Build Fails:
- Check that all environment variables are added correctly
- Ensure no typos in variable names or values

### Contact Form Not Working:
- Verify Gmail app password is correct: `xoqh dxli hgyf wsbt`
- Check spam folder for test emails
- Ensure 2-factor authentication is enabled on Gmail

### Admin Login Fails:
- Verify password: `rlatkdgus1201`
- Check that `ADMIN_PASSWORD` environment variable is set

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel deployment logs
2. Refer to `VERCEL_TROUBLESHOOTING.md`
3. Run `npm run deploy:diagnose` locally

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Vercel shows "Deployment Completed"
- ✅ Website loads at your Vercel URL
- ✅ Admin panel accessible
- ✅ Contact form sends emails
- ✅ Both Korean and English versions work

---

**Your website is ready to go live!** 🚀

Once deployed, you can:
1. **Set up custom domain** (hyperstone.co.kr)
2. **Monitor performance** with Vercel Analytics
3. **Update content** through the admin panel