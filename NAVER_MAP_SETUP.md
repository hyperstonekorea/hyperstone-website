# Naver Map Integration Setup Guide

This guide explains how to set up Naver Map integration for the contact section.

## Overview

The contact section now displays an interactive Naver Map showing the HYPERSTONE office location at:
- **Address**: 경기도 평택시 고덕여염로 118, SBC비지니스센터 6층 610호
- **Coordinates**: 37.0595°N, 127.0847°E

## Setup Steps

### 1. Get Naver Map API Client ID

1. Visit [Naver Cloud Platform](https://www.ncloud.com/)
2. Sign up or log in to your account
3. Navigate to **Console** > **Services** > **AI·NAVER API** > **Application**
4. Click **애플리케이션 등록** (Register Application)
5. Fill in the application details:
   - **Application Name**: HYPERSTONE Website
   - **Service**: Maps (지도)
   - **Service Environment**: Web Dynamic Map
6. Add your website domains:
   - `http://localhost:3000` (for development)
   - `https://hyperstone.co.kr` (for production)
   - `https://*.vercel.app` (for Vercel preview deployments)
7. Copy the **Client ID** provided

### 2. Configure Environment Variables

Add the Client ID to your environment files:

#### Local Development (.env.local)
```bash
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your-actual-client-id-here
```

#### Vercel Production
1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add new variable:
   - **Name**: `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`
   - **Value**: Your Naver Map Client ID
   - **Environment**: Production, Preview, Development
4. Click **Save**
5. Redeploy your application

### 3. Verify Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section: `http://localhost:3000/#contact`

3. You should see:
   - An interactive Naver Map
   - A marker at the HYPERSTONE office location
   - An info window with the company name and address
   - Zoom controls and map type controls

## Features

### Map Component (`NaverMap.tsx`)

The Naver Map component includes:

- **Interactive Map**: Pan, zoom, and explore the area
- **Custom Marker**: Shows the exact office location
- **Info Window**: Displays company name and full address
- **Responsive Design**: Adapts to different screen sizes
- **Auto-load Script**: Dynamically loads Naver Maps API

### Customization

You can customize the map by editing `src/components/ui/NaverMap.tsx`:

#### Change Map Center or Zoom
```typescript
const mapOptions = {
  center: location,
  zoom: 17, // Change this value (1-21)
  // ... other options
};
```

#### Modify Info Window Content
```typescript
const infoWindow = new window.naver.maps.InfoWindow({
  content: `
    <div style="padding: 15px;">
      <!-- Your custom HTML here -->
    </div>
  `,
});
```

#### Adjust Map Controls
```typescript
const mapOptions = {
  // ... other options
  zoomControl: true, // Show/hide zoom control
  mapTypeControl: true, // Show/hide map type control
  scaleControl: true, // Show/hide scale control
  logoControl: true, // Show/hide Naver logo
};
```

## Troubleshooting

### Map Not Displaying

1. **Check Client ID**: Ensure `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` is set correctly
2. **Check Domain**: Verify your domain is registered in Naver Cloud Platform
3. **Check Console**: Open browser DevTools and look for error messages
4. **Restart Server**: After changing environment variables, restart the dev server

### Map Shows Wrong Location

The coordinates are set to:
- **Latitude**: 37.0595
- **Longitude**: 127.0847

If the location is incorrect, update the coordinates in `NaverMap.tsx`:

```typescript
const location = new window.naver.maps.LatLng(37.0595, 127.0847);
```

### API Quota Exceeded

Naver Maps has usage limits. If you exceed them:
1. Check your usage in Naver Cloud Platform console
2. Consider upgrading your plan
3. Implement caching or lazy loading

## Additional Resources

- [Naver Maps API Documentation](https://navermaps.github.io/maps.js.ncp/)
- [Naver Cloud Platform Console](https://console.ncloud.com/)
- [Naver Maps Examples](https://navermaps.github.io/maps.js.ncp/docs/tutorial-1-Getting-Started.html)

## Support

For issues related to:
- **Naver Maps API**: Contact Naver Cloud Platform support
- **Website Integration**: Check the component code in `src/components/ui/NaverMap.tsx`
- **Environment Setup**: Review this guide and `.env.example`
