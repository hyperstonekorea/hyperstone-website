# HYPERSTONE Website - Quick Start Guide

## 🚀 Instant Testing (No Setup Required)

### Option 1: Open Directly in Browser
1. Navigate to the `hyperstone-website2` folder
2. Double-click `index.html`
3. The website opens in your default browser
4. ✅ Everything works immediately!

### Option 2: Run Integration Tests
1. Double-click `final-integration-test.html`
2. Click "Run Automated Tests"
3. Review test results
4. Complete manual checklist

## 📋 Quick Validation

### Verify Everything Works
```bash
# Run validation script
node validate-deployment.js
```

Expected output: `✓ ALL TESTS PASSED!`

## 🌐 Deployment Options

### GitHub Pages (Recommended)
```bash
# 1. Create repository on GitHub
# 2. Push files
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/hyperstone-website.git
git push -u origin main

# 3. Enable GitHub Pages in repository settings
# 4. Access at: https://yourusername.github.io/hyperstone-website/
```

### Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `hyperstone-website2` folder
3. Done! Your site is live

### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import the folder or GitHub repository
3. Click "Deploy"
4. Done!

### Local Server (Testing)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Then open: http://localhost:8000
```

## ✨ Key Features

- **No Build Process**: Open HTML files directly
- **Bilingual**: Korean and English (toggle with KO/EN button)
- **Infinite Scroll**: Products load automatically as you scroll
- **Responsive**: Works on mobile, tablet, and desktop
- **Brand Compliant**: Audiowide font, correct colors (#0082FB, #0064E0, etc.)

## 🧪 Testing Checklist

- [ ] Open `index.html` in browser
- [ ] Click navigation links (smooth scroll)
- [ ] Toggle language (KO ↔ EN)
- [ ] Scroll down (infinite scroll loads products)
- [ ] Click a product card (opens detail page)
- [ ] Click back button (returns to main page)
- [ ] Reload page (language preference persists)
- [ ] Test on mobile device

## 📁 File Structure

```
hyperstone-website2/
├── index.html              # Main page
├── product.html           # Product detail page
├── css/
│   └── styles.css         # Custom styles
└── js/
    ├── app.js             # Main application
    ├── data.js            # Product & company data
    ├── i18n.js            # Translations
    ├── navigation.js      # Navigation & scrolling
    ├── infinite-scroll.js # Infinite scroll
    ├── animations.js      # Animations
    └── product-detail.js  # Product details
```

## 🔧 Customization

### Update Products
Edit `js/data.js`:
```javascript
const products = [
  {
    id: "1",
    slug: "your-product-slug",
    name: { ko: "제품명", en: "Product Name" },
    // ... more properties
  }
];
```

### Update Translations
Edit `js/i18n.js`:
```javascript
const translations = {
  ko: { /* Korean translations */ },
  en: { /* English translations */ }
};
```

### Update Styles
Edit `css/styles.css`:
```css
:root {
  --color-primary: #0082FB;
  /* ... more colors */
}
```

## 📞 Company Information

- **Business Registration**: 336-87-03585
- **CEO**: 심철훈 (SHIM CHUL HUN)
- **Phone**: 010-8900-5863
- **Email**: hyperstone@hyperstone.co.kr
- **Address**: 경기도 평택시 고덕여염로 118, 610호

## 🎨 Brand Colors

- Primary: `#0082FB`
- Secondary: `#0064E0`
- Light Background: `#F1F5F8`
- Dark Text/Background: `#1C2B33`
- White: `#FFFFFF`
- Black: `#000000`

## 📚 Documentation

- `DEPLOYMENT_CHECKLIST.md` - Complete deployment checklist
- `TASK_23_COMPLETION_SUMMARY.md` - Task completion details
- `final-integration-test.html` - Interactive testing interface

## ✅ Status

- **Development**: ✅ Complete
- **Testing**: ✅ All tests passed
- **Validation**: ✅ Ready for deployment
- **Browser Compatibility**: ✅ Chrome, Firefox, Safari, Edge

## 🚀 Ready to Deploy!

The website is fully functional and ready for production use. Choose your preferred deployment method above and go live!

---

**Need Help?**
- Email: hyperstone@hyperstone.co.kr
- Phone: 010-8900-5863
