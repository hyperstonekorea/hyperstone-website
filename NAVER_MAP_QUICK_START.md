# Naver Map Quick Start

## What Was Done

✅ Integrated Naver Map into the contact section  
✅ Set location to: **고덕여염로 118, 평택시, 경기도**  
✅ Added interactive map with marker and info window  
✅ Configured environment variables for API key

## Quick Setup (3 Steps)

### 1. Get Naver Map Client ID
Visit: https://www.ncloud.com/product/applicationService/maps
- Register application
- Add domains: `localhost:3000`, `hyperstone.co.kr`, `*.vercel.app`
- Copy Client ID

### 2. Add to Environment
```bash
# In .env.local
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your-client-id-here
```

### 3. Deploy
```bash
# Add to Vercel environment variables
# Then redeploy
vercel --prod
```

## Files Modified

- ✅ `src/components/ui/NaverMap.tsx` - New map component
- ✅ `src/components/sections/ContactSection.tsx` - Integrated map
- ✅ `.env.example` - Added API key template
- ✅ `.env.local` - Added API key placeholder

## Test Locally

```bash
npm run dev
# Visit http://localhost:3000/#contact
```

## Location Details

- **Address**: 경기도 평택시 고덕여염로 118, SBC비지니스센터 6층 610호
- **Coordinates**: 37.0595°N, 127.0847°E
- **Zoom Level**: 17 (street level)

## Need Help?

See full documentation: `NAVER_MAP_SETUP.md`
