# Brand Font Reference

## Font Specifications

### Audiowide Font
- **Source**: Google Fonts
- **Designer**: Astigmatic
- **Style**: Display, Geometric, Futuristic
- **Weights Available**: 400 (Normal)
- **Character Set**: Latin

## Brand Typography Rules

### HYPERSTONE
```
Font Family: Audiowide
Font Weight: 700 (Bold)
Use Case: Company name, main branding
CSS Class: .brand-hyperstone
```

**Example:**
```tsx
<h1 className="brand-hyperstone">HYPERSTONE</h1>
```

### DULITE
```
Font Family: Audiowide
Font Weight: 400 (Normal)
Use Case: Product brand name
CSS Class: .brand-dulite
```

**Example:**
```tsx
<h2 className="brand-dulite">DULITE Products</h2>
```

## Automatic Application

Use the `BrandText` component for automatic styling:

```tsx
import { BrandText } from '@/components/ui/BrandText';

// Automatically detects and styles brand names
<BrandText>HYPERSTONE presents Dulite Ready Mix Concrete</BrandText>

// Result:
// - "HYPERSTONE" → Audiowide Bold
// - "Dulite" → Audiowide Normal
// - Rest of text → Default font
```

## Implementation Details

### Font Loading
The font is loaded via Next.js Google Fonts integration in `src/app/[locale]/layout.tsx`:

```typescript
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});
```

### CSS Variables
```css
/* Available globally */
--font-audiowide: 'Audiowide', sans-serif;
```

### CSS Classes
```css
/* Bold for HYPERSTONE */
.brand-hyperstone {
  font-family: var(--font-audiowide), sans-serif;
  font-weight: 700;
}

/* Normal for DULITE */
.brand-dulite {
  font-family: var(--font-audiowide), sans-serif;
  font-weight: 400;
}
```

## Where Applied

### Homepage
1. **Hero Section**
   - Main "HYPERSTONE" heading

2. **Products Section**
   - All product card titles (Dulite products)
   - Product category lists

### Product Detail Pages
- Product page titles
- Product names in breadcrumbs (if applicable)

### Future Considerations
- Footer branding
- Navigation menu (if brand names appear)
- Meta tags and SEO (text only, no font styling)
- Social media cards (rendered as images)

## Design Rationale

The Audiowide font was chosen for:
- **Modern Appeal**: Geometric, tech-forward design
- **Brand Distinction**: Unique appearance sets brand names apart
- **Readability**: Clear letterforms even at smaller sizes
- **Consistency**: Single font family for both brand names maintains cohesion
- **Weight Differentiation**: Bold for company, normal for products creates hierarchy

## Performance

- **Font Loading**: Optimized via Next.js font system
- **FOUT Prevention**: Font display swap with CSS variables
- **File Size**: ~15KB for single weight
- **Caching**: Automatically cached by Next.js
