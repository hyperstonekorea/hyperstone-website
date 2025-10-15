# Brand Font Testing Guide

## What to Test

After starting the development server, verify that the Audiowide font is correctly applied to brand names.

## Test Steps

### 1. Start Development Server
```bash
cd hyperstone-website
npm run dev
```

### 2. Test Homepage (http://localhost:3000)

#### Hero Section
- **HYPERSTONE** heading should display in **Audiowide Bold** (font-weight: 700)
- The text should have a distinctive, futuristic appearance

#### Products Section
Scroll down to the products section and verify:
- **"Dulite Ready Mix Concrete"** - "Dulite" in Audiowide Normal
- **"Dulite Precast Concrete"** - "Dulite" in Audiowide Normal
- **"Dulite Grouting Agent"** - "Dulite" in Audiowide Normal
- **"Dulite Waterproof Agent"** - "Dulite" in Audiowide Normal

#### Product Categories
At the bottom of the products section:
- All product names in the category boxes should have "Dulite" in Audiowide Normal

### 3. Test Product Detail Pages

Visit any product page (e.g., http://localhost:3000/ko/readymixconcrete):
- Product title at the top should have "Dulite" in Audiowide Normal

### 4. Visual Verification

The Audiowide font has these characteristics:
- Wide, geometric letterforms
- Futuristic, tech-inspired design
- High contrast between thick and thin strokes
- Distinctive "A", "W", and "E" characters

Compare:
- **HYPERSTONE**: Should be bold and prominent
- **Dulite**: Should be the same font but with normal weight (lighter)

## Expected Results

✅ All instances of "HYPERSTONE" use Audiowide Bold
✅ All instances of "DULITE" or "Dulite" use Audiowide Normal
✅ Font loads properly without FOUT (Flash of Unstyled Text)
✅ Build completes without errors
✅ No console errors in browser

## Troubleshooting

If fonts don't appear correctly:

1. **Clear browser cache**: Hard refresh with Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Check browser console**: Look for font loading errors
3. **Verify font variable**: Check that `--font-audiowide` is available in DevTools
4. **Check network tab**: Ensure Google Fonts CSS is loading

## Browser DevTools Inspection

Open DevTools (F12) and inspect the elements:

### For HYPERSTONE:
```css
font-family: var(--font-audiowide), sans-serif;
font-weight: 700;
```

### For Dulite:
```css
font-family: var(--font-audiowide), sans-serif;
font-weight: 400;
```
