# 🚀 Vercel Nameserver Setup - hyperstone.co.kr

## ✅ Perfect Choice! You're Using Vercel Nameservers

**Domain**: hyperstone.co.kr  
**Nameservers**: Vercel DNS  
- ns1.vercel-dns.com  
- ns2.vercel-dns.com  

This is the **easiest and most reliable** way to connect your domain to Vercel!

## 🎯 Why This is Better

✅ **Automatic Configuration** - Vercel manages DNS automatically  
✅ **Faster Propagation** - Changes take effect in minutes  
✅ **No Manual DNS Records** - Vercel handles everything  
✅ **Optimal Performance** - Direct integration with Vercel's CDN  
✅ **SSL Certificate** - Automatic and instant  

## 📋 Simple Setup Process

### Step 1: Confirm Nameserver Change (Already Done ✅)

You've already changed your nameservers at hosting.kr to:
- ns1.vercel-dns.com
- ns2.vercel-dns.com

**This change can take 24-48 hours to fully propagate globally.**

### Step 2: Add Domain to Vercel Project

1. **Go to Vercel Dashboard**
   - Navigate to your hyperstone-website project
   - Click "Settings" → "Domains"

2. **Add Your Domain**
   - Click "Add Domain"
   - Enter: `hyperstone.co.kr`
   - Click "Add"

3. **Vercel Will Automatically Configure**
   - ✅ DNS records created automatically
   - ✅ SSL certificate issued instantly
   - ✅ CDN configuration optimized

### Step 3: Add WWW Subdomain (Optional)

1. **Add WWW Version**
   - Click "Add Domain" again
   - Enter: `www.hyperstone.co.kr`
   - Click "Add"

2. **Configure Redirect**
   - Choose redirect from www to non-www (recommended)
   - Or vice versa based on your preference

## ⏱️ Timeline with Vercel Nameservers

- **Nameserver Propagation**: 24-48 hours (already in progress)
- **Domain Addition**: Instant once nameservers propagate
- **SSL Certificate**: Instant
- **Website Live**: Immediate after domain addition

## 🧪 Check Nameserver Propagation

### Method 1: Command Line
```bash
# Check if nameservers have propagated
nslookup -type=ns hyperstone.co.kr

# Should show:
# ns1.vercel-dns.com
# ns2.vercel-dns.com
```

### Method 2: Online Tools
- Visit: https://dnschecker.org/
- Enter: hyperstone.co.kr
- Select "NS" record type
- Check if Vercel nameservers appear globally

### Method 3: Use Our Script
```bash
npm run domain:check-dns
```

## 🎯 What Happens After Nameserver Propagation

Once nameservers propagate (showing ns1/ns2.vercel-dns.com):

1. **Add Domain in Vercel** - Takes 30 seconds
2. **DNS Automatically Configured** - Instant
3. **SSL Certificate Issued** - Instant
4. **Website Goes Live** - Immediate

## 🔧 Step-by-Step Vercel Configuration

### When Nameservers Have Propagated:

1. **Login to Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Find your hyperstone-website project

2. **Navigate to Domains**
   - Click on your project
   - Go to "Settings" tab
   - Click "Domains" in sidebar

3. **Add Primary Domain**
   - Click "Add Domain"
   - Enter: `hyperstone.co.kr`
   - Click "Add"
   - Vercel will show "✅ Valid Configuration"

4. **Add WWW Domain**
   - Click "Add Domain" again
   - Enter: `www.hyperstone.co.kr`
   - Choose redirect preference
   - Click "Add"

5. **Verify Setup**
   - Both domains should show green checkmarks
   - SSL certificates should be "Active"

## 🧪 Testing Your Setup

### After Domain Addition:

```bash
# Test main domain
curl -I https://hyperstone.co.kr

# Test www redirect
curl -I https://www.hyperstone.co.kr

# Run full verification
npm run deploy:verify https://hyperstone.co.kr
```

### Expected Results:
- ✅ **Status 200** - Website loads successfully
- ✅ **SSL Active** - Green padlock in browser
- ✅ **Fast Loading** - Optimized by Vercel CDN
- ✅ **Global Access** - Available worldwide

## 🚨 Troubleshooting

### Nameservers Not Propagated Yet
**Symptoms**: DNS checker still shows old nameservers
**Solution**: Wait longer (up to 48 hours), check with hosting.kr

### Domain Addition Fails in Vercel
**Symptoms**: "Invalid Configuration" error
**Solution**: Nameservers haven't propagated yet, wait and retry

### Website Not Loading
**Symptoms**: Domain added but site doesn't load
**Solution**: Check Vercel deployment status, ensure project is deployed

## 📞 Getting Help

### Check Propagation Status
```bash
# Check current nameservers
nslookup -type=ns hyperstone.co.kr

# Check from different locations
# Use online tools like dnschecker.org
```

### hosting.kr Support
If nameserver change isn't working:
- Contact hosting.kr support
- Verify domain is unlocked
- Confirm nameserver change was saved

### Vercel Support
For domain addition issues:
- Check Vercel status page
- Contact Vercel support
- Verify project deployment status

## ✅ Success Checklist

Your setup is complete when:
- [ ] Nameservers show ns1/ns2.vercel-dns.com globally
- [ ] Domain added successfully in Vercel
- [ ] Green checkmarks in Vercel domains section
- [ ] SSL certificate shows "Active"
- [ ] Website loads at https://hyperstone.co.kr
- [ ] WWW redirect works (if configured)

## 🎯 Final Steps

### Update Environment Variable
Once domain is live:
```bash
NEXT_PUBLIC_SITE_URL=https://hyperstone.co.kr
```

### Test Everything
```bash
# Full website verification
npm run deploy:verify https://hyperstone.co.kr

# DNS verification
npm run domain:check-dns
```

### Share Your Website
- **Main URL**: https://hyperstone.co.kr
- **Admin Panel**: https://hyperstone.co.kr/admin
- **Contact Form**: Sends to hyperstonekorea@gmail.com

## 🎉 Advantages of Your Setup

✅ **Reliability** - Vercel manages DNS infrastructure  
✅ **Performance** - Optimized routing and caching  
✅ **Security** - Automatic SSL and security headers  
✅ **Simplicity** - No manual DNS record management  
✅ **Speed** - Fastest possible configuration changes  

---

**Your domain will be live as soon as the nameservers propagate!** 🚀

**Current Status**: Waiting for nameserver propagation (24-48 hours)  
**Next Step**: Add domain to Vercel project once propagation completes  
**Expected Result**: Instant website activation with SSL