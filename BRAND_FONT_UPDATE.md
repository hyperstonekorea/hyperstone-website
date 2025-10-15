# Brand Font Update - Audiowide

## Summary
Applied the "Audiowide" font from Google Fonts to all instances of "HYPERSTONE" and "DULITE" brand names throughout the website.

## Changes Made

### 1. Font Import (src/app/[locale]/layout.tsx)
- Imported `Audiowide` font from `next/font/google`
- Configured with weight 400 and CSS variable `--font-audiowide`
- Added to body className for global availability

### 2. CSS Styling (src/app/globals.css)
- Added `.brand-hyperstone` class with Audiowide font and bold weight (700)
- Added `.brand-dulite` class with Audiowide font and normal weight (400)

### 3. BrandText Component (src/components/ui/BrandText.tsx)
- Created reusable component that automatically detects and styles brand names
- Uses regex to find "HYPERSTONE" and "DULITE" (case-insensitive)
- Wraps matches with appropriate CSS classes

### 4. Component Updates
Updated the following components to use brand fonts:

#### HeroSection (src/components/sections/HeroSection.tsx)
- Applied `brand-hyperstone` class to main heading

#### ProductsSection (src/components/sections/ProductsSection.tsx)
- Imported and used `BrandText` component for product card titles
- Applied to product category lists

#### ProductDetailPage (src/components/pages/ProductDetailPage.tsx)
- Imported and used `BrandText` component for product page title

## Font Specifications

### HYPERSTONE
- Font Family: Audiowide
- Font Weight: 700 (Bold)
- Applied to: Company name in hero section and any "HYPERSTONE" text

### DULITE
- Font Family: Audiowide
- Font Weight: 400 (Normal)
- Applied to: All product names containing "Dulite"

## Usage

The `BrandText` component automatically handles brand name styling:

```tsx
import { BrandText } from '@/components/ui/BrandText';

// Automatically styles "HYPERSTONE" and "Dulite" with Audiowide font
<BrandText>Dulite Ready Mix Concrete</BrandText>
```

For direct styling without the component:

```tsx
<h1 className="brand-hyperstone">HYPERSTONE</h1>
<h2 className="brand-dulite">DULITE Products</h2>
```

## Testing
Run the development server to see the changes:
```bash
npm run dev
```

Visit the homepage to see:
- "HYPERSTONE" in the hero section with Audiowide Bold
- Product names with "Dulite" in Audiowide Normal
