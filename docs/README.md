# HYPERSTONE Design System Documentation

Welcome to the HYPERSTONE Admin Design System documentation. This directory contains comprehensive guides for using and maintaining the design system.

## Documentation Overview

### For Administrators

- **[Admin Design System User Guide](./ADMIN_DESIGN_SYSTEM_USER_GUIDE.md)** - Complete guide for using the design system interface
  - Getting started
  - Section designer
  - Product card designer
  - Product detail designer
  - Preview system
  - Design history
  - Import/export
  - Best practices
  - Accessibility guidelines

- **[Troubleshooting Guide](./TROUBLESHOOTING_GUIDE.md)** - Solutions to common issues
  - Loading and saving problems
  - Preview issues
  - Font problems
  - Image upload issues
  - Accessibility warnings
  - Performance issues
  - Import/export problems
  - Browser compatibility

### For Developers

- **[API Documentation](./API_DOCUMENTATION.md)** - Technical API reference
  - Design settings endpoints
  - Design history endpoints
  - Font endpoints
  - Preview endpoint
  - Image upload endpoint
  - Error codes
  - Rate limiting
  - Caching strategy
  - SDK examples

## Quick Start

### For Administrators

1. Navigate to `/admin` and login
2. Click "Design System" in the navigation
3. Select a section to customize (Hero, About, Products, Contact)
4. Make your changes using the design controls
5. Preview your changes on different devices
6. Save when satisfied

**First time?** Read the [User Guide](./ADMIN_DESIGN_SYSTEM_USER_GUIDE.md) for detailed instructions.

### For Developers

```typescript
// Fetch design settings
const response = await fetch('/api/admin/design-settings');
const settings = await response.json();

// Update design settings
await fetch('/api/admin/design-settings', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(settings)
});
```

**Need more?** See the [API Documentation](./API_DOCUMENTATION.md) for complete reference.

## Key Features

### Section-Level Control
Customize every section of your website independently:
- Hero section
- About section
- Products section
- Contact section

### Product Customization
- Product card styling
- Individual product detail pages
- Consistent or unique designs per product

### Real-Time Preview
- See changes before saving
- Test on mobile, tablet, and desktop
- Accessibility validation

### Design History
- Track all changes
- Rollback to previous versions
- Compare versions side-by-side

### Import/Export
- Backup your designs
- Share configurations
- Migrate between environments

## Design System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Admin Dashboard UI                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Section    │  │   Product    │  │   Product    │      │
│  │   Designer   │  │     Card     │  │    Detail    │      │
│  │              │  │   Designer   │  │   Designer   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼─────────────────┼──────────────────┼───────────────┘
          │                 │                  │
          └─────────────────┴──────────────────┘
                            │
          ┌─────────────────▼──────────────────┐
          │      API Layer (Next.js API)       │
          │  /api/admin/design-settings        │
          │  /api/admin/design-history         │
          │  /api/admin/fonts                  │
          └─────────────────┬──────────────────┘
                            │
          ┌─────────────────▼──────────────────┐
          │         Vercel KV Storage          │
          │  - Design Settings                 │
          │  - History Snapshots               │
          │  - Font Configurations             │
          └────────────────────────────────────┘
```

## File Structure

```
hyperstone-website/
├── docs/                                    # Documentation
│   ├── README.md                           # This file
│   ├── ADMIN_DESIGN_SYSTEM_USER_GUIDE.md  # User guide
│   ├── API_DOCUMENTATION.md               # API reference
│   └── TROUBLESHOOTING_GUIDE.md           # Troubleshooting
│
├── src/
│   ├── components/admin/design/           # UI Components
│   │   ├── DesignSystemManager.tsx       # Main container
│   │   ├── SectionDesigner.tsx           # Section controls
│   │   ├── ProductCardDesigner.tsx       # Card controls
│   │   ├── ProductDetailDesigner.tsx     # Product controls
│   │   ├── BackgroundControl.tsx         # Background picker
│   │   ├── FontSelector.tsx              # Font picker
│   │   ├── ColorPicker.tsx               # Color picker
│   │   ├── PreviewPanel.tsx              # Preview system
│   │   ├── DesignHistory.tsx             # History viewer
│   │   ├── HelpTooltip.tsx               # Help tooltips
│   │   └── ...                           # Other components
│   │
│   ├── lib/design/                        # Core Logic
│   │   ├── types.ts                      # TypeScript types
│   │   ├── defaults.ts                   # Default settings
│   │   ├── storage.ts                    # Vercel KV storage
│   │   ├── validator.ts                  # Validation logic
│   │   ├── sanitizer.ts                  # Input sanitization
│   │   ├── font-loader.ts                # Font loading
│   │   ├── font-options.ts               # Available fonts
│   │   ├── cache.ts                      # Caching strategy
│   │   ├── migration.ts                  # Settings migration
│   │   ├── inline-help.ts                # Help content
│   │   └── ...                           # Other utilities
│   │
│   └── app/api/admin/                     # API Endpoints
│       ├── design-settings/
│       │   ├── route.ts                  # GET, PUT settings
│       │   ├── export/route.ts           # Export endpoint
│       │   └── import/route.ts           # Import endpoint
│       ├── design-history/
│       │   ├── route.ts                  # GET history
│       │   └── rollback/route.ts         # Rollback endpoint
│       ├── fonts/
│       │   ├── route.ts                  # GET fonts
│       │   └── google/search/route.ts    # Search Google Fonts
│       ├── design-preview/route.ts       # Preview endpoint
│       └── upload/route.ts               # Image upload
│
└── .kiro/specs/admin-design-system/      # Specification
    ├── requirements.md                    # Requirements
    ├── design.md                          # Design document
    └── tasks.md                           # Implementation tasks
```

## Common Tasks

### Changing Section Background

1. Select "Sections" tab
2. Choose section from dropdown
3. Click "Background" section
4. Select type (Color, Image, Gradient, Video)
5. Configure background settings
6. Preview and save

### Customizing Product Cards

1. Select "Product Cards" tab
2. Adjust background, borders, shadows
3. Configure fonts and colors
4. Set hover effects
5. Preview and save

### Creating Unique Product Pages

1. Select "Product Details" tab
2. Choose product from dropdown
3. Customize hero, content, gallery
4. Configure section styles
5. Preview and save
6. Optional: Apply to all products

### Rolling Back Changes

1. Select "History" tab
2. Find the version to restore
3. Click on the entry
4. Review preview
5. Click "Rollback to This Version"
6. Confirm

### Exporting Design

1. Click "Export" button
2. Choose what to export
3. Click "Download JSON"
4. Save file safely

### Importing Design

1. Click "Import" button
2. Select JSON file
3. Choose import mode (Replace or Merge)
4. Review preview
5. Click "Import"
6. Confirm

## Best Practices

### Design Consistency
- Use 3-5 main colors
- Limit to 2-3 font families
- Use consistent spacing (multiples of 4px or 8px)
- Reuse shadow values
- Maintain coherent animations

### Accessibility
- Ensure 4.5:1 contrast ratio minimum (WCAG AA)
- Use 16px minimum for body text
- Provide clear heading hierarchy
- Test with keyboard navigation
- Use color blindness simulators

### Performance
- Optimize images before uploading
- Limit number of custom fonts
- Use web-safe fonts when possible
- Test on mobile devices
- Monitor loading times

### Workflow
- Plan before designing
- Start with sections, then cards, then products
- Test thoroughly on all devices
- Save frequently
- Export backups before major changes

## Accessibility Compliance

The design system helps you meet WCAG 2.1 standards:

### Level AA (Minimum)
- ✅ Contrast ratio: 4.5:1 for normal text
- ✅ Font size: 16px minimum for body text
- ✅ Focus indicators: Visible keyboard focus
- ✅ Color independence: Don't rely on color alone

### Level AAA (Enhanced)
- ✅ Contrast ratio: 7:1 for normal text
- ✅ Font size: 18px minimum for body text
- ✅ Enhanced focus: High contrast indicators

The system automatically validates your designs and provides warnings when standards are not met.

## Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Not Supported
- Internet Explorer (use modern browser)
- Safari < 14 (update to latest)

### Mobile
- Admin dashboard optimized for desktop
- Some features may not work on mobile browsers
- Use desktop for best experience

## Environment Variables

Required for full functionality:

```bash
# Vercel KV (Required)
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=

# Admin Authentication (Required)
ADMIN_PASSWORD=

# Google Fonts API (Optional)
GOOGLE_FONTS_API_KEY=
```

## Troubleshooting

### Quick Fixes

**Changes not appearing?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Wait 60 seconds for cache to expire

**Can't save?**
- Check for validation errors
- Fix accessibility warnings
- Reduce settings size
- Wait if rate limited

**Preview not updating?**
- Click refresh button
- Toggle device view
- Close and reopen preview

**Font not loading?**
- Check font name spelling
- Verify font weight available
- Use font selector instead of typing

**Image upload fails?**
- Check file size (max 5MB)
- Check file type (JPEG, PNG, WebP)
- Compress image first

For more solutions, see the [Troubleshooting Guide](./TROUBLESHOOTING_GUIDE.md).

## Getting Help

### Documentation
1. Read the [User Guide](./ADMIN_DESIGN_SYSTEM_USER_GUIDE.md)
2. Check the [Troubleshooting Guide](./TROUBLESHOOTING_GUIDE.md)
3. Review the [API Documentation](./API_DOCUMENTATION.md)

### Support
1. Check browser console for errors
2. Export current settings for analysis
3. Document steps to reproduce issue
4. Contact system administrator with details

### Inline Help
- Hover over ? icons in the interface
- Read tooltips for contextual help
- Check examples provided

## Contributing

### Reporting Issues
When reporting issues, include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser console errors

### Suggesting Features
Feature requests should include:
- Use case description
- Expected behavior
- Benefits to users
- Priority level

## Version History

### Version 1.0.0 (2025-01-13)
- Initial release
- Section designer
- Product card designer
- Product detail designer
- Preview system
- Design history
- Import/export
- Accessibility validation
- Inline help

## License

Copyright © 2025 HYPERSTONE. All rights reserved.

---

**Last Updated**: 2025-01-13  
**Documentation Version**: 1.0.0

For questions or support, contact your system administrator.
