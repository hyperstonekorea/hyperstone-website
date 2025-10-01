# Product Images

This directory contains product images for the DULITE product line.

## Image Requirements

### Formats
- Primary: WebP format for modern browsers
- Fallback: JPEG for older browsers
- Quality: 85% for main images, 75% for thumbnails

### Sizes
- Thumbnail: 400x225px (16:9 aspect ratio)
- Gallery: 800x450px (16:9 aspect ratio)
- Detail: 1200x675px (16:9 aspect ratio)

### Naming Convention
- Thumbnails: `{product-slug}-thumb.webp`
- Gallery: `{product-slug}-{number}.webp`

## Current Products

1. **Ready Mix Concrete** (`readymixconcrete`)
   - Thumbnail: `readymix-thumb.webp`
   - Gallery: `readymix-1.webp`, `readymix-2.webp`, etc.

2. **Precast Concrete** (`precastconcrete`)
   - Thumbnail: `precast-thumb.webp`
   - Gallery: `precast-1.webp`, `precast-2.webp`, etc.

3. **Grouting Agent** (`groutingagent`)
   - Thumbnail: `grouting-thumb.webp`
   - Gallery: `grouting-1.webp`, `grouting-2.webp`, etc.

4. **Waterproof Agent** (`waterproofagent`)
   - Thumbnail: `waterproof-thumb.webp`
   - Gallery: `waterproof-1.webp`, `waterproof-2.webp`, etc.

## Optimization Features

- **Lazy Loading**: Images load only when they enter the viewport
- **Responsive Images**: Different sizes served based on device
- **WebP Support**: Modern format with better compression
- **Blur Placeholder**: Smooth loading experience
- **Quality Optimization**: Balanced quality vs file size