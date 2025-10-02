# 🚨 Deployment Troubleshooting - 404 Errors

## Issue: All Pages Return 404

The verification shows all pages are returning 404 errors, which means:
1. The deployment failed or is incomplete
2. The project isn't properly configured in Vercel
3. There might be a routing issue

## 🔍 Step 1: Check Vercel Dashboard

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Find your project**: Look for `hyperstone-website` or similar
3. **Check deployment status**:
   - ✅ Green checkmark = Successful
   - ❌ Red X = Failed
   - 🟡 Yellow circle = In progress

## 🔧 Step 2: Check Deployment Logs

If deployment failed:
1. **Click on your project** in Vercel dashboard
2. **Go to "Deployments" tab**
3. **Click on the latest deployment**
4. **Check "Build Logs"** for errors

### Common Build Errors:

**Error: "Module not found"**
- Solution: Ensure all files are committed to GitHub
- Run: `git add . && git commit -m "Add missing files" && git push`

**Error: "Environment variables missing"**
- Solution: Add all 7 environment variables in Vercel settings

**Error: "Build timeout"**
- Solution: Check if build command is correct: `npm run build:production`

## 🚀 Step 3: Re-deploy from Scratch

If the project doesn't exist or deployment failed:

### 3.1 Ensure Code is on GitHub
```bash
# Check if code is pushed
git status
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3.2 Import Project to Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. **Import from GitHub**: `hyperstonekorea/hyperstone-website`
4. **Configure settings**:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build:production`
   - Output Directory: `.next`

### 3.3 Add Environment Variables
In Project Settings > Environment Variables, add:

```
ADMIN_PASSWORD=rlatkdgus1201
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=hyperstonekorea@gmail.com
EMAIL_PASS=xoqh dxli hgyf wsbt
EMAIL_RECIPIENT=hyperstonekorea@gmail.com
NEXT_PUBLIC_SITE_URL=https://hyperstone-website.vercel.app
NEXT_TELEMETRY_DISABLED=1
```

**Important**: Select all environments (Production, Preview, Development) for each variable.

### 3.4 Deploy
1. Click "Deploy"
2. Wait for completion (2-5 minutes)
3. Check for green checkmark

## 🔍 Step 4: Verify Deployment URL

After successful deployment:
1. **Get the correct URL** from Vercel dashboard
2. **It might be different** from `hyperstone-website.vercel.app`
3. **Common formats**:
   - `hyperstone-website-git-main-hyperstonekorea.vercel.app`
   - `hyperstone-website-hyperstonekorea.vercel.app`
   - `hyperstone-website-[random].vercel.app`

## 🧪 Step 5: Test with Correct URL

Once you have the correct URL, test it:
```bash
npm run deploy:verify https://your-actual-vercel-url.vercel.app
```

## 🔧 Step 6: Common Solutions

### If Build Keeps Failing:
1. **Check local build**:
   ```bash
   npm run build:production
   ```
   If this fails, fix errors locally first.

2. **Simplify build command**:
   - Change build command to: `npm run build`
   - Instead of: `npm run build:production`

### If Environment Variables Don't Work:
1. **Double-check spelling** (case-sensitive)
2. **Ensure no extra spaces** in values
3. **Re-add variables** one by one
4. **Redeploy** after adding variables

### If Still Getting 404s:
1. **Check if domain is correct**
2. **Try the Vercel-generated URL** (not custom domain)
3. **Check if deployment actually completed**
4. **Look for any error messages** in Vercel dashboard

## 📞 Step 7: Get Help

If none of the above works:

### Check Vercel Status
- Visit: https://vercel.com/status
- Look for any ongoing issues

### Contact Support
- Vercel Support: https://vercel.com/support
- Include your project URL and error details

## 🎯 Expected Success Indicators

Your deployment is working when:
- ✅ Vercel dashboard shows green checkmark
- ✅ Build logs show "Build completed"
- ✅ URL loads the homepage (not 404)
- ✅ You can see the HYPERSTONE website

## 📋 Quick Checklist

Before proceeding:
- [ ] Code is pushed to GitHub (`git push origin main`)
- [ ] Project imported to Vercel
- [ ] All 7 environment variables added
- [ ] Build completed successfully
- [ ] Using correct Vercel URL (from dashboard)

---

**Next Action**: Check your Vercel dashboard and follow the steps above based on what you see there.