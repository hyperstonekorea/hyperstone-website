# Vercel Deployment Guide for HYPERSTONE Website

This guide will walk you through deploying the HYPERSTONE website to Vercel with proper configuration for Next.js 14 App Router.

## Prerequisites

✅ GitHub repository created and code pushed: `hyperstonekorea/hyperstone-website`  
✅ Vercel account (sign up at https://vercel.com)  
✅ Environment variables ready (see .env.example)  

## Step 1: Connect GitHub Repository to Vercel

### 1.1 Sign in to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub" for seamless integration

### 1.2 Import Project
1. On Vercel dashboard, click "New Project"
2. Find your repository: `hyperstonekorea/hyperstone-website`
3. Click "Import" next to your repository

### 1.3 Configure Project Settings
Vercel will automatically detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build:production` (will use our optimized build)
- **Output Directory**: `.next` (default for Next.js)
- **Install Command**: `npm install` (default)

## Step 2: Environment Variables Configuration

### 2.1 Required Environment Variables

In the Vercel project settings, add these environment variables:

```bash
# Admin Configuration
ADMIN_PASSWORD=rlatkdgus1201

# Email Configuration (Gmail SMTP recommended)
EMAIL_HOST=hyperstonekorea@gmail.com
EMAIL_PORT=587
EMAIL_USER=hyperstonekorea@gmail.com
EMAIL_PASS=Ehdtlsthwo9595!
EMAIL_RECIPIENT=hyperstonekorea@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://hyperstone-website.vercel.app
```

### 2.2 How to Add Environment Variables in Vercel

1. In your Vercel project dashboard, go to "Settings"
2. Click "Environment Variables" in the sidebar
3. Add each variable:
   - **Name**: Variable name (e.g., `ADMIN_PASSWORD`)
   - **Value**: Variable value (e.g., your secure password)
   - **Environment**: Select "Production", "Preview", and "Development"
4. Click "Save"

### 2.3 Gmail App Password Setup (for EMAIL_PASS)

If using Gmail SMTP:
1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. At the bottom, click "App passwords"
4. Generate a new app password for "Mail"
5. Use this 16-character password as `EMAIL_PASS`

## Step 3: Deploy Configuration

### 3.1 Automatic Deployment Setup

Vercel automatically sets up:
- ✅ Deploy on push to `main` branch
- ✅ Preview deployments for pull requests
- ✅ Automatic builds with Next.js optimization

### 3.2 Custom Build Configuration

Our project includes optimized build settings in `vercel.json`:

```json
{
  "buildCommand": "npm run build:production",
  "framework": "nextjs",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

This ensures:
- Production-optimized builds
- API routes have appropriate timeout limits
- Proper caching headers for static assets

## Step 4: Domain Configuration

### 4.1 Custom Domain Setup (hyperstone.co.kr)

1. In Vercel project settings, go to "Domains"
2. Click "Add Domain"
3. Enter: `hyperstone.co.kr`
4. Follow DNS configuration instructions:

**For DNS Provider (where hyperstone.co.kr is registered):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

### 4.2 SSL Certificate

Vercel automatically provides SSL certificates:
- ✅ Free SSL certificate from Let's Encrypt
- ✅ Automatic renewal
- ✅ HTTPS redirect enabled

## Step 5: Build and Deploy Test

### 5.1 Initial Deployment

After configuration, Vercel will automatically:
1. Clone your repository
2. Install dependencies
3. Run the build command
4. Deploy to production

### 5.2 Verify Deployment

Check these items after deployment:

**✅ Basic Functionality:**
- [ ] Homepage loads correctly
- [ ] Korean/English language switching works
- [ ] All sections display properly (Hero, About, Products, Contact)
- [ ] Product detail pages accessible
- [ ] Responsive design on mobile

**✅ Admin Panel:**
- [ ] Admin login at `/admin` works
- [ ] Environment variable `ADMIN_PASSWORD` is working
- [ ] Content management features functional
- [ ] Image upload works

**✅ Contact Form:**
- [ ] Contact form submits successfully
- [ ] Email sending works (test with real email)
- [ ] Form validation displays correctly
- [ ] Success message appears after submission

**✅ Performance:**
- [ ] Page load times are acceptable
- [ ] Images load and display correctly
- [ ] Animations work smoothly
- [ ] SEO metadata is present

## Step 6: Production Environment Testing

### 6.1 Email Service Testing

Test the contact form with real email:

1. Go to your deployed site
2. Navigate to contact section
3. Fill out and submit the form
4. Check if email arrives at `EMAIL_RECIPIENT` address
5. Verify email formatting and content

### 6.2 Admin Panel Testing

Test admin functionality:

1. Go to `https://your-domain.com/admin`
2. Log in with `ADMIN_PASSWORD`
3. Test content management features:
   - Upload an image for section backgrounds
   - Change background settings
   - Update email recipient settings
4. Verify changes reflect on the main site

### 6.3 Performance Testing

Use these tools to verify performance:
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Vercel Analytics**: Available in your Vercel dashboard

## Step 7: Monitoring and Maintenance

### 7.1 Vercel Analytics

Enable Vercel Analytics for monitoring:
1. In project settings, go to "Analytics"
2. Enable "Web Analytics"
3. Monitor page views, performance metrics

### 7.2 Function Logs

Monitor API routes and functions:
1. Go to "Functions" tab in Vercel dashboard
2. Check logs for any errors
3. Monitor email sending success/failures

### 7.3 Deployment Logs

Check build and deployment logs:
1. Go to "Deployments" tab
2. Click on any deployment to see detailed logs
3. Monitor for build errors or warnings

## Troubleshooting Common Issues

### Build Failures

**Issue**: Build fails during deployment
**Solution**: 
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation locally: `npm run type-check`

### Environment Variables Not Working

**Issue**: Admin login fails or email doesn't send
**Solution**:
- Verify environment variables are set correctly in Vercel
- Check variable names match exactly (case-sensitive)
- Ensure variables are enabled for "Production" environment

### Email Sending Issues

**Issue**: Contact form submits but no email received
**Solution**:
- Verify Gmail app password is correct
- Check spam folder
- Test email credentials locally first
- Check function logs in Vercel for error messages

### Domain Configuration Issues

**Issue**: Custom domain not working
**Solution**:
- Verify DNS records are set correctly
- Wait for DNS propagation (up to 24 hours)
- Check domain status in Vercel dashboard

## Deployment Checklist

Before going live, ensure:

- [ ] All environment variables configured
- [ ] Custom domain connected and SSL working
- [ ] Contact form tested and working
- [ ] Admin panel accessible and functional
- [ ] All pages load correctly
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] SEO metadata present
- [ ] Error pages (404, 500) display correctly
- [ ] Analytics and monitoring enabled

## Post-Deployment Steps

1. **Update DNS**: Point hyperstone.co.kr to Vercel
2. **Test Email**: Send test contact form submissions
3. **Monitor Performance**: Check Vercel Analytics
4. **Set Up Alerts**: Configure deployment notifications
5. **Document Access**: Share admin credentials securely
6. **Backup Strategy**: Ensure code is backed up on GitHub

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Vercel Support**: https://vercel.com/support
- **Project Repository**: https://github.com/hyperstonekorea/hyperstone-website

## Deployment URLs

After deployment, your site will be available at:
- **Production**: https://hyperstone.co.kr (after domain setup)
- **Vercel URL**: https://hyperstone-website.vercel.app
- **Admin Panel**: https://hyperstone.co.kr/admin

---

**Next Steps**: After successful deployment, proceed to task 14.4 for domain and SSL configuration.