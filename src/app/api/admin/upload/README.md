# Image Upload and Optimization API

## Overview

The `/api/admin/upload` endpoint provides secure image upload functionality with automatic optimization for the HYPERSTONE admin dashboard. It validates, optimizes, and stores images for use in design settings.

## Features

- **Image Validation**: Validates file type, size, and format
- **Automatic Optimization**: Resizes and compresses images using Sharp
- **Format Conversion**: Converts images to WebP for optimal performance
- **Secure Storage**: Stores images in the public/uploads directory
- **Metadata Tracking**: Returns detailed information about uploaded images

## Endpoint

```
POST /api/admin/upload
```

### Authentication

Requires admin authentication via session token.

### Request

**Content-Type**: `multipart/form-data`

**Form Fields**:

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `file` | File | Yes | - | Image file to upload |
| `section` | string | No | 'general' | Section identifier for organizing uploads |
| `optimize` | boolean | No | true | Whether to optimize the image |
| `maxWidth` | number | No | 2400 | Maximum width in pixels |
| `maxHeight` | number | No | 2400 | Maximum height in pixels |
| `quality` | number | No | 85 | Image quality (1-100) |

### Response

**Success (200)**:

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "url": "/uploads/hero_1234567890_image.webp",
  "filename": "hero_1234567890_image.webp",
  "metadata": {
    "width": 1920,
    "height": 1080,
    "format": "webp",
    "originalSize": 2048576,
    "optimizedSize": 512000,
    "compressionRatio": "75.0%",
    "optimized": true
  }
}
```

**Error (400/500)**:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Configuration

### Image Constraints

```typescript
const IMAGE_CONFIG = {
  maxWidth: 2400,           // Maximum width in pixels
  maxHeight: 2400,          // Maximum height in pixels
  quality: 85,              // Default quality (1-100)
  maxFileSize: 10485760,    // 10MB in bytes
  allowedFormats: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ],
  outputFormat: 'webp'      // Output format after optimization
};
```

## Usage Examples

### Basic Upload

```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('section', 'hero');

const response = await fetch('/api/admin/upload', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log('Uploaded image URL:', result.url);
```

### Upload with Custom Options

```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('section', 'product-detail');
formData.append('maxWidth', '1920');
formData.append('maxHeight', '1080');
formData.append('quality', '90');

const response = await fetch('/api/admin/upload', {
  method: 'POST',
  body: formData,
});
```

### Upload Without Optimization

```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('section', 'gallery');
formData.append('optimize', 'false');

const response = await fetch('/api/admin/upload', {
  method: 'POST',
  body: formData,
});
```

### React Component Example

```tsx
import { useState } from 'react';

function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('section', 'hero');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setImageUrl(result.url);
        console.log('Compression:', result.metadata.compressionRatio);
      } else {
        console.error('Upload failed:', result.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
```

## Optimization Process

1. **Validation**: Checks file type, size, and format
2. **Reading**: Converts file to buffer
3. **Metadata Extraction**: Reads original image dimensions
4. **Resizing**: Scales down if exceeds max dimensions (maintains aspect ratio)
5. **Format Conversion**: Converts to WebP for optimal compression
6. **Quality Compression**: Applies quality setting
7. **Storage**: Saves optimized image to public/uploads
8. **Response**: Returns URL and metadata

## Error Handling

### Common Errors

| Error | Status | Description |
|-------|--------|-------------|
| No file provided | 400 | File field is missing |
| Unsupported format | 400 | File type not in allowed list |
| File too large | 400 | Exceeds 10MB limit |
| Optimization failed | 500 | Sharp processing error (falls back to original) |
| Storage failed | 500 | File system write error |

### Fallback Behavior

If optimization fails, the API will:
1. Log the error
2. Use the original image buffer
3. Still save and return the image
4. Set `optimized: false` in metadata

## Security

### Authentication

- Requires valid admin session token
- Uses `verifyAdminAuth` middleware
- Returns 401 for unauthorized requests

### Input Validation

- File type whitelist (JPEG, PNG, WebP, GIF only)
- File size limit (10MB maximum)
- Filename sanitization (removes special characters)
- Path traversal prevention

### Storage

- Files stored in public/uploads directory
- Unique filenames with timestamp
- No executable file types allowed

## Performance

### Optimization Benefits

- **WebP Format**: 25-35% smaller than JPEG/PNG
- **Quality Compression**: Reduces file size while maintaining visual quality
- **Dimension Limits**: Prevents unnecessarily large images
- **Fast Processing**: Sharp library uses libvips for speed

### Typical Results

- Original JPEG (2MB) → Optimized WebP (500KB) = 75% reduction
- Original PNG (3MB) → Optimized WebP (800KB) = 73% reduction

## Storage Location

Images are stored in:
```
public/uploads/{section}_{timestamp}_{filename}.{format}
```

Example:
```
public/uploads/hero_1704123456789_background.webp
```

## Integration with Design System

The upload API is used by:

- **BackgroundControl**: Upload background images
- **ProductDetailDesigner**: Upload product images
- **SectionDesigner**: Upload section backgrounds

## Maintenance

### Cleanup

Consider implementing periodic cleanup of unused images:

```typescript
// Example cleanup script
async function cleanupOldImages(daysOld: number) {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const files = await readdir(uploadsDir);
  const now = Date.now();
  
  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const stats = await stat(filePath);
    const age = now - stats.mtimeMs;
    const daysAge = age / (1000 * 60 * 60 * 24);
    
    if (daysAge > daysOld) {
      await unlink(filePath);
    }
  }
}
```

### Monitoring

Monitor:
- Upload success/failure rates
- Average file sizes
- Compression ratios
- Storage usage

## Future Enhancements

- [ ] Vercel Blob storage integration
- [ ] Image CDN integration
- [ ] Multiple image upload
- [ ] Image cropping/editing
- [ ] Thumbnail generation
- [ ] Image gallery management
- [ ] Usage tracking and analytics
