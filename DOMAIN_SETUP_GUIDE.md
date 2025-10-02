# 🌐 Custom Domain Setup Guide - hyperstone.co.kr

## Your Domain Configuration

**Domain**: hyperstone.co.kr  
**Registrar**: hosting.kr  
**Nameservers**: NSOne (dns1-4.p06.nsone.net)  
**Target**: Vercel deployment  

## 📋 Step-by-Step Setup Process

### Step 1: Add Domain to Vercel

1. **Go to Vercel Project Dashboard**
   - Navigate to your hyperstone-website project
   - Click on "Settings" tab
   - Click on "Domains" in the sidebar

2. **Add Custom Domain**
   - Click "Add Domain"
   - Enter: `hyperstone.co.kr`
   - Click "Add"

3. **Vercel Will Show DNS Instructions**
   - Vercel will display the DNS records you need to configure
   - **Don't close this page** - you'll need these values

### Step 2: Configure DNS Records at hosting.kr

Since your domain uses NSOne nameservers, you need to configure DNS records through your hosting.kr control panel.

#### Option A: CNAME Method (Recommended)

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300 (or default)
```

**For root domain (apex):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.19.61
TTL: 300 (or default)
```

#### Option B: Alternative A Records (if CNAME doesn't work)

```
Type: A
Name: @
Value: 76.76.19.61
TTL: 300

Type: A
Name: www
Value: 76.76.19.61
TTL: 300
```

### Step 3: Access hosting.kr DNS Management

1. **Login to hosting.kr**
   - Go to your hosting.kr account
   - Navigate to domain management
   - Find hyperstone.co.kr

2. **Access DNS Settings**
   - Look for "DNS 관리" or "DNS Management"
   - Or "네임서버 설정" or "Nameserver Settings"
   - Since you're using NSOne, look for DNS record management

3. **Add DNS Records**
   - Add the A and CNAME records as shown above
   - Make sure to save changes

### Step 4: Verify DNS Configuration

After adding DNS records, verify they're working:

#### Using Command Line:
```bash
# Check A record
nslookup hyperstone.co.kr

# Check CNAME record
nslookup www.hyperstone.co.kr

# Check with specific nameserver
nslookup hyperstone.co.kr dns1.p06.nsone.net
```

#### Using Online Tools:
- https://dnschecker.org/
- Enter: hyperstone.co.kr
- Check if it resolves to 76.76.19.61

### Step 5: Configure Both Domains in Vercel

Add both the root domain and www subdomain:

1. **Add Root Domain**
   - Domain: `hyperstone.co.kr`
   - This will be your primary domain

2. **Add WWW Subdomain**
   - Domain: `www.hyperstone.co.kr`
   - Vercel will automatically redirect www to non-www (or vice versa)

### Step 6: SSL Certificate Setup

Vercel automatically provides SSL certificates:
- ✅ **Free SSL** from Let's Encrypt
- ✅ **Automatic renewal**
- ✅ **HTTPS redirect** enabled by default

Wait 10-15 minutes after DNS propagation for SSL to activate.

## 🔧 hosting.kr Specific Instructions

### Finding DNS Management in hosting.kr:

1. **Login to hosting.kr control panel**
2. **Navigate to domain services**
3. **Look for these menu items:**
   - "도메인 관리" (Domain Management)
   - "DNS 설정" (DNS Settings)
   - "네임서버 관리" (Nameserver Management)

### Adding DNS Records:

Since your domain uses NSOne nameservers (dns1.p06.nsone.net), you should:

1. **Find DNS Record Management**
   - Look for "DNS 레코드 추가" (Add DNS Record)
   - Or "A 레코드 설정" (A Record Settings)

2. **Add A Record for Root Domain:**
   ```
   호스트명 (Hostname): @ 또는 공백
   레코드 타입 (Record Type): A
   값 (Value): 76.76.19.61
   TTL: 300 또는 기본값
   ```

3. **Add CNAME Record for WWW:**
   ```
   호스트명 (Hostname): www
   레코드 타입 (Record Type): CNAME
   값 (Value): cname.vercel-dns.com
   TTL: 300 또는 기본값
   ```

## ⏱️ DNS Propagation Timeline

- **Local DNS**: 5-10 minutes
- **Global DNS**: 24-48 hours (usually much faster)
- **SSL Certificate**: 10-15 minutes after DNS resolves

## 🧪 Testing Your Setup

### 1. Test DNS Resolution
```bash
# Should return 76.76.19.61
nslookup hyperstone.co.kr

# Should return cname.vercel-dns.com
nslookup www.hyperstone.co.kr
```

### 2. Test Website Access
```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://hyperstone.co.kr

# Test HTTPS
curl -I https://hyperstone.co.kr
```

### 3. Verify SSL Certificate
- Visit: https://hyperstone.co.kr
- Check for green padlock in browser
- Certificate should be issued by Let's Encrypt

## 🚨 Troubleshooting Common Issues

### DNS Not Resolving
**Problem**: Domain doesn't point to Vercel
**Solutions**:
1. Double-check DNS records in hosting.kr
2. Wait for DNS propagation (up to 48 hours)
3. Clear your local DNS cache: `ipconfig /flushdns`

### SSL Certificate Issues
**Problem**: "Not Secure" warning in browser
**Solutions**:
1. Wait 10-15 minutes after DNS resolves
2. Check if DNS is properly configured
3. Try accessing via HTTPS directly

### Vercel Domain Status Issues
**Problem**: Domain shows "Invalid Configuration" in Vercel
**Solutions**:
1. Verify DNS records are correct
2. Wait for DNS propagation
3. Remove and re-add domain in Vercel

### hosting.kr Interface Issues
**Problem**: Can't find DNS management
**Solutions**:
1. Contact hosting.kr support
2. Look for "고급 설정" (Advanced Settings)
3. Check if domain is fully activated

## 📞 Getting Help

### hosting.kr Support
- **Phone**: Check hosting.kr website for support number
- **Email**: Usually support@hosting.kr
- **Live Chat**: Available on their website

### Vercel Support
- **Documentation**: https://vercel.com/docs/concepts/projects/domains
- **Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

## ✅ Success Checklist

Your domain setup is complete when:
- [ ] DNS records added in hosting.kr control panel
- [ ] Domain added to Vercel project
- [ ] DNS resolves to 76.76.19.61
- [ ] Website loads at https://hyperstone.co.kr
- [ ] SSL certificate is active (green padlock)
- [ ] Both www and non-www versions work

## 🎯 Final Steps

After successful domain setup:

1. **Update Environment Variable**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://hyperstone.co.kr
   ```

2. **Test Your Website**
   ```bash
   npm run deploy:verify https://hyperstone.co.kr
   ```

3. **Update Documentation**
   - Update any references from .vercel.app to .co.kr
   - Share the new domain with your team

---

**Your hyperstone.co.kr domain will be live once DNS propagates!** 🚀

The process typically takes 10-30 minutes, but can take up to 48 hours in rare cases.