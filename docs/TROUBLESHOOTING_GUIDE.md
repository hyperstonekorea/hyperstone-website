# Design System Troubleshooting Guide

## Table of Contents

1. [Common Issues](#common-issues)
2. [Loading and Saving Problems](#loading-and-saving-problems)
3. [Preview Issues](#preview-issues)
4. [Font Problems](#font-problems)
5. [Image Upload Issues](#image-upload-issues)
6. [Accessibility Warnings](#accessibility-warnings)
7. [Performance Issues](#performance-issues)
8. [Import/Export Problems](#importexport-problems)
9. [Browser Compatibility](#browser-compatibility)
10. [Error Messages](#error-messages)

---

## Common Issues

### Design Changes Not Appearing on Live Site

**Symptoms**: Changes saved in admin but not visible on public pages

**Possible Causes**:
1. Cache not invalidated
2. Browser cache
3. CDN cache
4. Settings not properly saved

**Solutions**:

1. **Hard refresh the page**:
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear browser cache**:
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Settings → Privacy → Clear Data
   - Safari: Develop → Empty Caches

3. **Verify settings were saved**:
   ```
   1. Go to admin dashboard
   2. Check "History" tab
   3. Verify latest entry shows your changes
   ```

4. **Check Vercel KV connection**:
   ```bash
   # Verify environment variables are set
   echo $KV_URL
   echo $KV_REST_API_URL
   echo $KV_REST_API_TOKEN
   ```

5. **Manually invalidate cache**:
   - Save settings again
   - Or wait 60 seconds for cache to expire

---

### Cannot Access Admin Dashboard

**Symptoms**: Redirected to login or 403 error

**Possible Causes**:
1. Session expired
2. Invalid credentials
3. Authentication middleware issue

**Solutions**:

1. **Re-login**:
   ```
   1. Go to /adminLogin
   2. Enter credentials
   3. Try accessing dashboard again
   ```

2. **Check admin token**:
   - Open browser DevTools (F12)
   - Go to Application → Cookies
   - Verify `admin-token` cookie exists

3. **Clear cookies and re-login**:
   ```
   1. Clear all cookies for the site
   2. Close browser
   3. Open browser and login again
   ```

4. **Verify environment variables**:
   ```bash
   # Check ADMIN_PASSWORD is set
   echo $ADMIN_PASSWORD
   ```

---

### Save Button Not Working

**Symptoms**: Clicking save does nothing or shows error

**Possible Causes**:
1. Validation errors
2. Network issue
3. Rate limiting
4. Server error

**Solutions**:

1. **Check for validation errors**:
   - Look for red error messages
   - Check accessibility warnings
   - Fix all critical errors before saving

2. **Check browser console**:
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages

3. **Check network tab**:
   - Open DevTools (F12)
   - Go to Network tab
   - Click save again
   - Check if request is sent
   - Check response status

4. **Wait and retry**:
   - If rate limited, wait 60 seconds
   - Try saving again

5. **Reduce request size**:
   - Save sections individually
   - Don't save all at once

---

## Loading and Saving Problems

### Settings Not Loading

**Symptoms**: Blank design controls or default values only

**Possible Causes**:
1. Vercel KV connection issue
2. Corrupted settings data
3. Network timeout

**Solutions**:

1. **Refresh the page**:
   - Simple page refresh often fixes loading issues

2. **Check Vercel KV status**:
   ```bash
   # Test KV connection
   curl -H "Authorization: Bearer $KV_REST_API_TOKEN" \
        "$KV_REST_API_URL/get/design:settings:current"
   ```

3. **Check browser console for errors**:
   - Look for network errors
   - Look for JSON parsing errors

4. **Try importing backup**:
   - If you have an exported backup
   - Use Import feature to restore

5. **Reset to defaults**:
   - Click "Reset to Defaults" button
   - This will restore working settings

---

### Save Operation Times Out

**Symptoms**: Save takes too long and fails

**Possible Causes**:
1. Large settings object
2. Slow network
3. Server overload

**Solutions**:

1. **Reduce settings size**:
   - Remove unused product detail configurations
   - Simplify complex gradients
   - Reduce number of custom fonts

2. **Save in smaller chunks**:
   - Save sections individually
   - Save product cards separately
   - Save product details one at a time

3. **Check network speed**:
   - Test internet connection
   - Try from different network

4. **Retry during off-peak hours**:
   - Less server load
   - Faster response times

---

### History Not Saving

**Symptoms**: Changes saved but not appearing in history

**Possible Causes**:
1. History storage full
2. Vercel KV issue
3. History creation failed

**Solutions**:

1. **Check history limit**:
   - History limited to 50 entries
   - Older entries automatically archived

2. **Verify history in Vercel KV**:
   ```bash
   # Check history entries
   curl -H "Authorization: Bearer $KV_REST_API_TOKEN" \
        "$KV_REST_API_URL/get/design:history:entries"
   ```

3. **Clear old history**:
   - Contact administrator to clear archived entries

4. **Export current settings**:
   - As backup if history fails
   - Can import later if needed

---

## Preview Issues

### Preview Not Updating

**Symptoms**: Preview shows old design after changes

**Possible Causes**:
1. Preview not refreshed
2. Cache issue
3. Preview generation failed

**Solutions**:

1. **Click refresh button**:
   - Use refresh icon in preview panel
   - Forces preview regeneration

2. **Toggle device view**:
   - Switch between mobile/tablet/desktop
   - Often triggers refresh

3. **Close and reopen preview**:
   - Collapse preview panel
   - Expand it again

4. **Check browser console**:
   - Look for preview generation errors
   - Check network requests

---

### Preview Shows Broken Layout

**Symptoms**: Preview looks wrong or broken

**Possible Causes**:
1. Invalid CSS values
2. Missing required fields
3. Font loading failed

**Solutions**:

1. **Check validation warnings**:
   - Fix all errors and warnings
   - Invalid values can break layout

2. **Verify all required fields**:
   - Background type and value
   - Font family and size
   - Color values

3. **Reset problematic section**:
   - Reset to defaults
   - Rebuild configuration

4. **Check font loading**:
   - Verify font family names are correct
   - Check if fonts are available

---

### Preview Performance Slow

**Symptoms**: Preview takes long time to render

**Possible Causes**:
1. Complex design settings
2. Large background images
3. Too many fonts loaded

**Solutions**:

1. **Optimize images**:
   - Compress background images
   - Use appropriate image sizes
   - Enable image optimization

2. **Reduce font weights**:
   - Load only needed font weights
   - Don't load all weights

3. **Simplify gradients**:
   - Use simpler gradient definitions
   - Reduce number of color stops

4. **Disable animations temporarily**:
   - Remove animation effects during editing
   - Add back when finalized

---

## Font Problems

### Font Not Loading

**Symptoms**: Font doesn't appear in preview or live site

**Possible Causes**:
1. Font name misspelled
2. Font weight not available
3. Network issue loading font
4. Font source unavailable

**Solutions**:

1. **Verify font name**:
   - Check spelling exactly
   - Case-sensitive for some fonts
   - Use font selector instead of typing

2. **Check available weights**:
   - Not all fonts have all weights
   - Pretendard: 100-900
   - Gmarket Sans: Light, Medium, Bold
   - Google Fonts: varies by font

3. **Test font loading**:
   ```javascript
   // In browser console
   document.fonts.check('1rem Pretendard')
   // Should return true if loaded
   ```

4. **Use fallback fonts**:
   - System fonts always work
   - Add fallback in font family:
   - `"Pretendard, -apple-system, sans-serif"`

---

### Google Fonts Search Not Working

**Symptoms**: Search returns no results or errors

**Possible Causes**:
1. Google Fonts API unavailable
2. API key missing or invalid
3. Network issue
4. Rate limit exceeded

**Solutions**:

1. **Check API key**:
   ```bash
   # Verify GOOGLE_FONTS_API_KEY is set
   echo $GOOGLE_FONTS_API_KEY
   ```

2. **Try again later**:
   - API might be temporarily down
   - Rate limit resets after time

3. **Use pre-loaded fonts**:
   - Pretendard and Gmarket Sans always available
   - Popular Google Fonts pre-loaded

4. **Manual font entry**:
   - If you know the font name
   - Type it directly instead of searching

---

### Font Preview Not Showing

**Symptoms**: Font selector shows no preview text

**Possible Causes**:
1. Font not loaded yet
2. Preview text missing
3. CSS issue

**Solutions**:

1. **Wait for font to load**:
   - Fonts load asynchronously
   - Preview appears when ready

2. **Refresh font list**:
   - Close and reopen font selector
   - Forces reload of fonts

3. **Check browser console**:
   - Look for font loading errors
   - Check network requests

---

## Image Upload Issues

### Upload Fails

**Symptoms**: Image upload shows error

**Possible Causes**:
1. File too large
2. Invalid file type
3. Network issue
4. Storage quota exceeded

**Solutions**:

1. **Check file size**:
   - Maximum: 5MB
   - Compress image before uploading
   - Use tools like TinyPNG or ImageOptim

2. **Check file type**:
   - Allowed: JPEG, PNG, WebP
   - Not allowed: GIF, BMP, TIFF
   - Convert if necessary

3. **Optimize image first**:
   ```bash
   # Using ImageMagick
   convert input.jpg -quality 85 -resize 1920x output.jpg
   ```

4. **Try different image**:
   - Test with smaller image
   - Verify upload works

5. **Check storage quota**:
   - Contact administrator
   - May need to clear old images

---

### Uploaded Image Not Appearing

**Symptoms**: Upload succeeds but image doesn't show

**Possible Causes**:
1. URL not saved
2. Image path incorrect
3. Cache issue
4. CORS issue

**Solutions**:

1. **Copy URL manually**:
   - After upload, copy the returned URL
   - Paste into background image field
   - Save settings

2. **Check image URL**:
   - Open URL in new tab
   - Verify image loads
   - Check for 404 errors

3. **Use absolute URL**:
   - Include full domain
   - Example: `https://yourdomain.com/uploads/image.jpg`

4. **Clear cache**:
   - Hard refresh page
   - Clear browser cache

---

### Image Quality Poor

**Symptoms**: Uploaded image looks blurry or pixelated

**Possible Causes**:
1. Over-compression
2. Image too small
3. Optimization too aggressive

**Solutions**:

1. **Upload higher resolution**:
   - Minimum 1920px width for desktop
   - 2x size for retina displays

2. **Adjust quality settings**:
   - Increase quality parameter
   - Default is 85, try 90-95

3. **Disable optimization**:
   - Upload without optimization
   - Optimize manually before upload

4. **Use PNG for graphics**:
   - Better quality for logos and graphics
   - JPEG better for photos

---

## Accessibility Warnings

### Low Contrast Ratio Warning

**Symptoms**: Yellow or red warning about contrast

**Possible Causes**:
1. Text color too similar to background
2. Insufficient contrast for readability

**Solutions**:

1. **Use suggested colors**:
   - System provides suggestions
   - Click to apply automatically

2. **Darken text or lighten background**:
   - Increase contrast between colors
   - Aim for 4.5:1 minimum (AA)
   - 7:1 for AAA compliance

3. **Use contrast checker**:
   - Online tools: WebAIM Contrast Checker
   - Test colors before applying

4. **Common good combinations**:
   - Black (#000000) on white (#FFFFFF): 21:1
   - Dark gray (#1f2937) on white: 16.1:1
   - White on dark blue (#1e3a8a): 8.6:1

---

### Font Size Too Small Warning

**Symptoms**: Warning about font size below minimum

**Possible Causes**:
1. Font size set too small
2. Responsive size too small on mobile

**Solutions**:

1. **Increase font size**:
   - Minimum 16px for body text
   - Minimum 14px for small text

2. **Check responsive sizes**:
   - Mobile size often needs to be larger
   - Don't go below 14px on mobile

3. **Use relative units**:
   - `rem` scales with user preferences
   - Better for accessibility

4. **Test on actual devices**:
   - What looks good on desktop may be too small on mobile

---

### Missing Alt Text Warning

**Symptoms**: Warning about images without alt text

**Solutions**:

1. **Add descriptive alt text**:
   - Describe what the image shows
   - Keep it concise but informative

2. **Use empty alt for decorative images**:
   - `alt=""` for purely decorative images
   - Screen readers will skip them

---

## Performance Issues

### Slow Admin Dashboard

**Symptoms**: Dashboard loads slowly or feels sluggish

**Possible Causes**:
1. Too many fonts loaded
2. Large background images
3. Complex design settings
4. Browser extensions

**Solutions**:

1. **Reduce loaded fonts**:
   - Unload unused fonts
   - Load only needed weights

2. **Optimize images**:
   - Compress background images
   - Use appropriate sizes

3. **Disable browser extensions**:
   - Try in incognito mode
   - Disable ad blockers temporarily

4. **Clear browser cache**:
   - Old cached data can slow things down

5. **Use modern browser**:
   - Chrome, Firefox, Safari, Edge
   - Keep browser updated

---

### Slow Save Operation

**Symptoms**: Saving takes a long time

**Solutions**:

See [Save Operation Times Out](#save-operation-times-out) above.

---

### Preview Rendering Slow

**Symptoms**: Preview takes long time to update

**Solutions**:

See [Preview Performance Slow](#preview-performance-slow) above.

---

## Import/Export Problems

### Export Fails

**Symptoms**: Export button doesn't download file

**Possible Causes**:
1. Browser blocking download
2. Settings too large
3. Server error

**Solutions**:

1. **Check browser download settings**:
   - Allow downloads from site
   - Check download folder permissions

2. **Try different browser**:
   - Test in Chrome, Firefox, Safari

3. **Export specific sections**:
   - Export sections individually
   - Smaller files more reliable

4. **Check browser console**:
   - Look for errors
   - Check network tab

---

### Import Validation Fails

**Symptoms**: Import shows validation errors

**Possible Causes**:
1. Invalid JSON format
2. Missing required fields
3. Invalid values
4. Version mismatch

**Solutions**:

1. **Check JSON syntax**:
   - Use JSON validator (jsonlint.com)
   - Fix syntax errors

2. **Verify required fields**:
   - Compare with exported file
   - Ensure all sections have required properties

3. **Check value formats**:
   - Colors: hex, rgb, or rgba
   - Sizes: include units (px, rem, etc.)
   - Fonts: valid font names

4. **Update version**:
   - Ensure version field matches current version
   - Update if importing old export

---

### Import Overwrites Unwanted Settings

**Symptoms**: Import changes more than expected

**Solutions**:

1. **Use merge mode**:
   - Select "Merge" instead of "Replace"
   - Only updates specified sections

2. **Import specific sections**:
   - Edit JSON to include only desired sections
   - Remove unwanted sections before import

3. **Backup first**:
   - Export current settings before importing
   - Can restore if import goes wrong

4. **Use history rollback**:
   - If import was mistake
   - Rollback to previous version

---

## Browser Compatibility

### Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Known Issues

**Internet Explorer**: Not supported
- Use modern browser instead

**Safari < 14**: Limited support
- Some CSS features may not work
- Update to latest Safari

**Mobile Browsers**: Partial support
- Admin dashboard best used on desktop
- Some features may not work on mobile

---

## Error Messages

### "Unauthorized"

**Meaning**: Not logged in or session expired

**Solution**: Login at `/adminLogin`

---

### "Validation failed"

**Meaning**: Design settings have errors

**Solution**: Fix validation errors shown in details

---

### "Rate limit exceeded"

**Meaning**: Too many requests too quickly

**Solution**: Wait 60 seconds and try again

---

### "Failed to load design settings"

**Meaning**: Cannot retrieve settings from storage

**Solutions**:
1. Check Vercel KV connection
2. Verify environment variables
3. Try refreshing page
4. Contact administrator

---

### "Failed to save design settings"

**Meaning**: Cannot save to storage

**Solutions**:
1. Check validation errors
2. Reduce settings size
3. Check network connection
4. Try again later

---

### "Font loading failed"

**Meaning**: Cannot load specified font

**Solutions**:
1. Check font name spelling
2. Verify font weight available
3. Use fallback font
4. Try different font

---

### "Image upload failed"

**Meaning**: Cannot upload image

**Solutions**:
1. Check file size (max 5MB)
2. Check file type (JPEG, PNG, WebP)
3. Compress image
4. Try different image

---

### "History entry not found"

**Meaning**: Requested history entry doesn't exist

**Solutions**:
1. Refresh history list
2. Entry may have been archived
3. Contact administrator

---

### "Import validation failed"

**Meaning**: Imported JSON has errors

**Solutions**:
1. Check JSON syntax
2. Verify required fields
3. Fix validation errors shown
4. Use valid export as template

---

## Getting Help

If you've tried the solutions above and still have issues:

1. **Check browser console**:
   - Open DevTools (F12)
   - Look for error messages
   - Take screenshot

2. **Check network tab**:
   - See what requests are failing
   - Check response codes
   - Take screenshot

3. **Export current settings**:
   - If possible, export for analysis
   - Include in support request

4. **Document steps to reproduce**:
   - What you did
   - What you expected
   - What actually happened

5. **Contact administrator**:
   - Provide all information above
   - Include screenshots
   - Include browser and OS version

---

## Preventive Measures

### Regular Backups

- Export settings weekly
- Store exports safely
- Label with date and description

### Test Before Saving

- Use preview extensively
- Check all device sizes
- Verify accessibility
- Test on actual devices

### Save Incrementally

- Save after each major change
- Don't make too many changes at once
- Easier to identify issues

### Monitor History

- Review history regularly
- Understand what changed
- Keep track of major updates

### Stay Updated

- Keep browser updated
- Check for system updates
- Review documentation updates

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-13
