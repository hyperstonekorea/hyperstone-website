# Quick Image Upload Guide

## For Administrators

### Uploading Background Images

1. **Navigate to Design System**
   - Go to Admin Dashboard
   - Click on "Design System" tab

2. **Select Section**
   - Choose the section you want to customize (Hero, About, Products, Contact)

3. **Change Background Type**
   - In the Background control, click "Image" button

4. **Upload Image**
   - Click "Upload Image" button
   - Select your image file (JPEG, PNG, WebP, or GIF)
   - Wait for upload to complete

5. **Review Results**
   - Check the success message with compression details
   - Preview the uploaded image
   - The image URL is automatically populated

6. **Save Settings**
   - Click "Save" to apply the changes

### Supported Formats

- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ WebP (.webp)
- ✅ GIF (.gif)

### File Size Limits

- Maximum: 10MB
- Recommended: Under 5MB for best performance

### Automatic Optimization

All uploaded images are automatically:
- Resized to max 2400×2400px (maintains aspect ratio)
- Converted to WebP format for optimal compression
- Compressed to 85% quality
- Typically reduced by 70-80% in file size

### Tips for Best Results

1. **Use High-Quality Source Images**
   - Start with high-resolution images
   - Let the system optimize them

2. **Recommended Dimensions**
   - Hero backgrounds: 1920×1080px or larger
   - Section backgrounds: 1600×900px or larger
   - Product images: 1200×800px or larger

3. **File Size**
   - Upload images under 5MB for faster processing
   - System will optimize automatically

4. **Format Choice**
   - Upload JPEG for photos
   - Upload PNG for graphics with transparency
   - System converts to WebP automatically

## For Developers

### Using the Upload API

```typescript
// Basic upload
const formData = new FormData();
formData.append('file', imageFile);
formData.append('section', 'hero');

const response = await fetch('/api/admin/upload', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
// result.url contains the uploaded image URL
```

### Using the ImageUploader Component

```tsx
import ImageUploader from '@/components/admin/design/ImageUploader';

<ImageUploader
  onUpload={(url) => {
    // Handle uploaded URL
    console.log('Uploaded:', url);
  }}
  section="hero"
  maxWidth={1920}
  maxHeight={1080}
  quality={90}
/>
```

### Custom Optimization Options

```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('section', 'product');
formData.append('maxWidth', '1920');
formData.append('maxHeight', '1080');
formData.append('quality', '90');
formData.append('optimize', 'true');

const response = await fetch('/api/admin/upload', {
  method: 'POST',
  body: formData,
});
```

### Disable Optimization

```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('optimize', 'false');
```

## Troubleshooting

### Upload Fails

**Problem**: "Unsupported file format"
- **Solution**: Use JPEG, PNG, WebP, or GIF only

**Problem**: "File size exceeds maximum"
- **Solution**: Compress image before upload or use smaller image

**Problem**: "Upload failed"
- **Solution**: Check internet connection and try again

### Image Not Displaying

**Problem**: Image uploaded but not showing
- **Solution**: 
  1. Check the URL is correct
  2. Verify image exists in `/public/uploads/`
  3. Clear browser cache
  4. Save design settings

### Slow Upload

**Problem**: Upload takes too long
- **Solution**:
  1. Use smaller images (under 5MB)
  2. Check internet connection
  3. Compress image before upload

## FAQ

**Q: What happens to my original image?**
A: The original is optimized and converted to WebP format. The original is not stored.

**Q: Can I upload multiple images at once?**
A: Currently, one image at a time. Batch upload coming in future update.

**Q: Where are images stored?**
A: Images are stored in `/public/uploads/` directory and accessible via `/uploads/filename`.

**Q: Can I delete uploaded images?**
A: Currently, images must be deleted manually from the server. Automatic cleanup coming soon.

**Q: What's the compression ratio?**
A: Typically 70-80% reduction in file size while maintaining visual quality.

**Q: Can I use external image URLs?**
A: Yes! You can still paste external URLs in the image input field.

**Q: Is there a limit on number of uploads?**
A: No limit on number of uploads, but consider storage space.

**Q: Are uploads secure?**
A: Yes! Uploads require admin authentication and include validation/sanitization.

## Support

For issues or questions:
1. Check this guide
2. Review the API documentation: `/src/app/api/admin/upload/README.md`
3. Check test guide: `/src/app/api/admin/upload/__tests__/upload-test.md`
4. Contact system administrator
