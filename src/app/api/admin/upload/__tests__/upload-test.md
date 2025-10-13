# Image Upload API Test Guide

## Manual Testing

### Test 1: Basic Image Upload

```bash
# Create a test image (or use any image file)
# Then use curl to test the upload

curl -X POST http://localhost:3000/api/admin/upload \
  -H "Cookie: admin-token=YOUR_ADMIN_TOKEN" \
  -F "file=@/path/to/test-image.jpg" \
  -F "section=test"
```

Expected response:
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "url": "/uploads/test_1234567890_image.webp",
  "filename": "test_1234567890_image.webp",
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

### Test 2: Upload with Custom Options

```bash
curl -X POST http://localhost:3000/api/admin/upload \
  -H "Cookie: admin-token=YOUR_ADMIN_TOKEN" \
  -F "file=@/path/to/test-image.jpg" \
  -F "section=hero" \
  -F "maxWidth=1920" \
  -F "maxHeight=1080" \
  -F "quality=90"
```

### Test 3: Upload Without Optimization

```bash
curl -X POST http://localhost:3000/api/admin/upload \
  -H "Cookie: admin-token=YOUR_ADMIN_TOKEN" \
  -F "file=@/path/to/test-image.jpg" \
  -F "section=original" \
  -F "optimize=false"
```

### Test 4: Invalid File Type

```bash
curl -X POST http://localhost:3000/api/admin/upload \
  -H "Cookie: admin-token=YOUR_ADMIN_TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "section=test"
```

Expected response:
```json
{
  "success": false,
  "message": "Unsupported file format. Allowed: image/jpeg, image/jpg, image/png, image/webp, image/gif"
}
```

### Test 5: File Too Large

```bash
# Create a large file (>10MB)
curl -X POST http://localhost:3000/api/admin/upload \
  -H "Cookie: admin-token=YOUR_ADMIN_TOKEN" \
  -F "file=@/path/to/large-image.jpg" \
  -F "section=test"
```

Expected response:
```json
{
  "success": false,
  "message": "File size exceeds maximum of 10MB"
}
```

### Test 6: Unauthorized Access

```bash
curl -X POST http://localhost:3000/api/admin/upload \
  -F "file=@/path/to/test-image.jpg" \
  -F "section=test"
```

Expected response: 401 Unauthorized

## Browser Testing

### Using the Admin Dashboard

1. Navigate to the admin dashboard
2. Go to the Design System section
3. Select a section (e.g., Hero)
4. In the Background control, select "Image" type
5. Click "Upload Image" button
6. Select an image file
7. Verify:
   - Upload progress indicator appears
   - Success message shows with metadata
   - Preview displays the uploaded image
   - Image URL is populated in the input field

### Using Browser Console

```javascript
// Test upload via browser console
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';

fileInput.onchange = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('section', 'test');

  const response = await fetch('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  console.log('Upload result:', result);
};

fileInput.click();
```

## Automated Testing Checklist

- [ ] Valid image upload (JPEG)
- [ ] Valid image upload (PNG)
- [ ] Valid image upload (WebP)
- [ ] Valid image upload (GIF)
- [ ] Image optimization works
- [ ] Custom dimensions work
- [ ] Custom quality works
- [ ] Disable optimization works
- [ ] Invalid file type rejected
- [ ] File too large rejected
- [ ] No file provided rejected
- [ ] Unauthorized access rejected
- [ ] Metadata returned correctly
- [ ] Compression ratio calculated correctly
- [ ] File saved to correct location
- [ ] Filename sanitization works
- [ ] Preview URL is correct

## Performance Testing

### Test Large Image Optimization

```javascript
// Test with various image sizes
const testSizes = [
  { width: 4000, height: 3000, name: '4K image' },
  { width: 6000, height: 4000, name: '6K image' },
  { width: 8000, height: 6000, name: '8K image' },
];

for (const size of testSizes) {
  console.log(`Testing ${size.name}...`);
  // Upload and measure time
  const start = Date.now();
  // ... upload code ...
  const end = Date.now();
  console.log(`${size.name} took ${end - start}ms`);
}
```

### Expected Performance

- Small images (<1MB): <500ms
- Medium images (1-5MB): <2s
- Large images (5-10MB): <5s

## Integration Testing

### Test with BackgroundControl Component

1. Open admin dashboard
2. Navigate to Section Designer
3. Select Hero section
4. Change background type to "Image"
5. Upload an image
6. Verify image URL is set in the background config
7. Save settings
8. Verify image displays on the public page

### Test with ProductDetailDesigner

1. Open admin dashboard
2. Navigate to Product Detail Designer
3. Select a product
4. Go to Hero tab
5. Upload hero background image
6. Verify image is applied
7. Save and check product detail page

## Error Recovery Testing

### Test Optimization Failure

1. Upload a corrupted image file
2. Verify fallback to original works
3. Verify error is logged
4. Verify upload still succeeds with original

### Test Storage Failure

1. Make uploads directory read-only
2. Attempt upload
3. Verify appropriate error message
4. Restore directory permissions

## Security Testing

### Test Authentication

- [ ] Upload without token fails
- [ ] Upload with invalid token fails
- [ ] Upload with expired token fails
- [ ] Upload with valid token succeeds

### Test Input Validation

- [ ] Filename with special characters sanitized
- [ ] Path traversal attempts blocked
- [ ] Executable file types rejected
- [ ] Script injection in filename prevented

## Cleanup

After testing, clean up test uploads:

```bash
# Remove test uploads
rm -rf public/uploads/test_*
```

Or use a cleanup script:

```javascript
// cleanup-test-uploads.js
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
const files = fs.readdirSync(uploadsDir);

files.forEach(file => {
  if (file.startsWith('test_')) {
    fs.unlinkSync(path.join(uploadsDir, file));
    console.log(`Deleted: ${file}`);
  }
});
```

## Test Results Template

```markdown
## Test Results - [Date]

### Environment
- Node version: 
- Next.js version: 
- Sharp version: 

### Test Results

| Test Case | Status | Notes |
|-----------|--------|-------|
| Basic upload | ✅ | |
| Custom options | ✅ | |
| Without optimization | ✅ | |
| Invalid file type | ✅ | |
| File too large | ✅ | |
| Unauthorized | ✅ | |
| Integration with BackgroundControl | ✅ | |
| Performance (<2s for 5MB) | ✅ | |

### Issues Found
- None

### Recommendations
- None
```
