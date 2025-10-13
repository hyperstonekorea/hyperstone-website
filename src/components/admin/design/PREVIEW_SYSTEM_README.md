# Preview System Implementation

## Overview
This document describes the preview system implementation for the Admin Design System, completed as part of task 12.

## Components Implemented

### 1. PreviewPanel Component
**Location:** `src/components/admin/design/PreviewPanel.tsx`

**Features:**
- Device size toggles (mobile, tablet, desktop)
- Responsive iframe-based preview
- Refresh functionality
- Real-time preview of design settings
- Smooth transitions between device sizes

**Device Sizes:**
- Mobile: 375 × 667px
- Tablet: 768 × 1024px
- Desktop: 1440 × 900px

**Usage:**
```tsx
<PreviewPanel 
  settings={designSettings} 
  previewUrl="/" 
/>
```

### 2. Preview API Endpoint
**Location:** `src/app/api/admin/design-preview/route.ts`

**Endpoints:**
- `GET /api/admin/design-preview?settings={json}&preview=true`
  - Returns temporary design settings for preview
  - No-cache headers to prevent caching preview data
  
- `POST /api/admin/design-preview`
  - Alternative endpoint for larger settings payloads
  - Accepts settings in request body

**Features:**
- Validates settings structure
- Returns settings without saving to storage
- Proper cache control headers
- Error handling for invalid JSON

### 3. AccessibilityValidation Component
**Location:** `src/components/admin/design/AccessibilityValidation.tsx`

**Features:**
- Real-time accessibility validation
- Color contrast ratio warnings (WCAG AA/AAA)
- Font size warnings
- Grouped validation results by type
- Actionable suggestions for improvements
- Visual indicators for different severity levels

**Validation Categories:**
- ✅ All checks passed
- 🚨 Critical errors
- 🎨 Color contrast issues
- 📏 Font size issues
- ℹ️ Other issues
- 💡 Accessibility tips

**Usage:**
```tsx
<AccessibilityValidation settings={designSettings} />
```

## Integration with DesignSystemManager

The preview system is integrated into the main `DesignSystemManager` component with:

1. **Toggle Buttons:**
   - "♿ A11y" - Toggle accessibility validation panel
   - "👁️ Preview" - Toggle preview panel

2. **State Management:**
   - `showPreview` - Controls preview panel visibility
   - `showAccessibility` - Controls accessibility validation visibility

3. **Layout:**
   - Panels appear above the tab content when toggled
   - Collapsible to save screen space
   - Responsive design

## How It Works

### Preview Flow
1. User makes design changes in the admin interface
2. Settings are passed to PreviewPanel component
3. PreviewPanel builds a URL with settings as query parameters
4. Iframe loads the preview URL with temporary settings
5. Preview API endpoint returns settings without saving
6. Public pages can read preview settings from URL params

### Accessibility Validation Flow
1. Settings are passed to AccessibilityValidation component
2. DesignValidator analyzes all sections and configurations
3. Validation results are grouped by category
4. Warnings and errors are displayed with suggestions
5. Real-time updates as user modifies settings

## Requirements Fulfilled

✅ **Requirement 1.7 - Design Preview and Validation:**
- Live preview panel with device size toggles
- Mobile, tablet, and desktop views
- Accessibility validation with WCAG standards
- Color contrast ratio validation
- Font size validation
- Warnings and suggestions for improvements
- Before/after comparison capability (via preview)

## Technical Details

### Preview URL Structure
```
/?preview=true&settings={encoded_json}&timestamp={timestamp}
```

### Validation Standards
- **WCAG AA:** Minimum contrast ratio of 4.5:1 for normal text
- **WCAG AAA:** Minimum contrast ratio of 7:1 for normal text
- **Font Sizes:** 
  - Body text: minimum 16px (1rem)
  - Headings: minimum 24px (1.5rem)

### Performance Considerations
- Debounced validation to prevent excessive calculations
- Memoized validation results
- No-cache headers for preview data
- Efficient iframe rendering

## Future Enhancements

Potential improvements for the preview system:
1. Side-by-side comparison view
2. Screenshot capture functionality
3. Share preview link with stakeholders
4. A/B testing integration
5. Performance metrics in preview
6. Screen reader simulation
7. Keyboard navigation testing
8. Print preview mode

## Testing

To test the preview system:

1. **Preview Panel:**
   ```bash
   # Navigate to admin dashboard
   # Toggle preview panel
   # Switch between device sizes
   # Make design changes and observe real-time updates
   ```

2. **Accessibility Validation:**
   ```bash
   # Toggle accessibility panel
   # Set low contrast colors to trigger warnings
   # Set small font sizes to trigger warnings
   # Verify suggestions are helpful
   ```

3. **API Endpoint:**
   ```bash
   # Test GET endpoint
   curl "http://localhost:3000/api/admin/design-preview?settings={...}"
   
   # Test POST endpoint
   curl -X POST http://localhost:3000/api/admin/design-preview \
     -H "Content-Type: application/json" \
     -d '{"settings": {...}}'
   ```

## Dependencies

- React hooks (useState, useRef, useEffect, useMemo)
- Next.js API routes
- DesignValidator utility
- DesignSettings types

## Notes

- Preview uses iframe sandbox for security
- Settings are not persisted during preview
- Validation runs client-side for instant feedback
- Preview URL includes timestamp to prevent caching
