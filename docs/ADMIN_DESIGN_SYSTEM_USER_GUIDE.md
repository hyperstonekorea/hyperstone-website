# Admin Design System User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Section Designer](#section-designer)
4. [Product Card Designer](#product-card-designer)
5. [Product Detail Designer](#product-detail-designer)
6. [Preview System](#preview-system)
7. [Design History](#design-history)
8. [Import/Export](#importexport)
9. [Best Practices](#best-practices)
10. [Accessibility Guidelines](#accessibility-guidelines)

---

## Introduction

The HYPERSTONE Admin Design System provides a comprehensive interface for customizing the visual appearance of your website without writing code. You can control backgrounds, colors, fonts, spacing, and effects for every section of your site.

### Key Features

- **Section-Level Control**: Customize Hero, About, Products, and Contact sections independently
- **Product Card Styling**: Design consistent product card appearances
- **Product Detail Pages**: Create unique designs for each product
- **Real-Time Preview**: See changes before applying them
- **Design History**: Track changes and rollback when needed
- **Accessibility Validation**: Ensure WCAG compliance automatically
- **Import/Export**: Save and share design configurations

---

## Getting Started

### Accessing the Design System

1. Navigate to the admin dashboard at `/admin`
2. Enter your admin credentials
3. Click on "Design System" in the navigation menu

### Understanding the Interface

The design system interface consists of four main areas:

```
┌─────────────────────────────────────────────────────────┐
│  Header: Save, Reset, Export, Import buttons            │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌──────────────────────────────────────┐ │
│  │ Tabs    │  │                                      │ │
│  │         │  │        Design Controls               │ │
│  │ Sections│  │                                      │ │
│  │ Cards   │  │                                      │ │
│  │ Products│  │                                      │ │
│  │ History │  │                                      │ │
│  └─────────┘  └──────────────────────────────────────┘ │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Live Preview Panel                   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Basic Workflow

1. **Select a tab** (Sections, Cards, Products, or History)
2. **Make your changes** using the design controls
3. **Preview** your changes in real-time
4. **Save** when satisfied with the results
5. **Export** to backup your configuration (optional)

---

## Section Designer

The Section Designer allows you to customize the four main sections of your homepage.

### Available Sections

- **Hero Section**: The main banner at the top of the page
- **About Section**: Company information and description
- **Products Section**: Product showcase area
- **Contact Section**: Contact information and form

### Design Controls

#### Background

Choose from four background types:

1. **Color**: Solid color background
   - Click the color picker
   - Enter hex code or use the visual picker
   - Adjust opacity if needed

2. **Image**: Background image
   - Click "Upload Image" or enter image URL
   - Adjust position (center, top, bottom, etc.)
   - Set size (cover, contain, auto)
   - Configure overlay color and opacity

3. **Gradient**: Linear or radial gradients
   - Select gradient type
   - Choose colors and stops
   - Adjust angle or position

4. **Video**: Background video (Hero section only)
   - Enter video URL
   - Configure autoplay and loop settings
   - Set overlay for text readability

#### Typography

**Heading Font**
- Select font family (Pretendard, Gmarket Sans, or Google Fonts)
- Choose font weight (100-900)
- Set responsive sizes:
  - Mobile: Optimized for small screens
  - Tablet: Medium screen sizes
  - Desktop: Large displays

**Body Font**
- Same controls as heading font
- Typically lighter weight than headings

**Font Tips**
- Use Pretendard for clean, modern Korean/English text
- Use Gmarket Sans for bold, attention-grabbing headings
- Google Fonts offer variety for specific branding needs

#### Colors

**Text Color**
- Primary text color for body content
- Contrast ratio automatically calculated
- Warnings shown if contrast is insufficient

**Heading Color**
- Color for section headings
- Can differ from body text for emphasis

**Accent Color**
- Used for highlights, buttons, and CTAs
- Should stand out from other colors

**Background Color**
- Base background color (if not using image/gradient)
- Affects overall section tone

#### Spacing

**Padding**
- Internal spacing within the section
- Set separately for mobile, tablet, desktop
- Format: `[top] [right] [bottom] [left]` or single value
- Examples:
  - `2rem` - Equal padding all sides
  - `4rem 2rem` - Vertical 4rem, horizontal 2rem
  - `4rem 2rem 6rem 2rem` - Individual sides

**Margin**
- External spacing around the section
- Same format as padding
- Usually minimal or zero for full-width sections

#### Effects

**Shadow**
- Add depth with box shadows
- Format: `[x-offset] [y-offset] [blur] [spread] [color]`
- Example: `0 4px 6px rgba(0, 0, 0, 0.1)`

**Blur**
- Background blur effect (backdrop-filter)
- Value in pixels (e.g., `10px`)
- Useful for overlay effects

**Animation**
- CSS animation name
- Predefined animations: `fadeIn`, `slideUp`, `scaleIn`
- Custom animations can be added via CSS

### Example: Customizing the Hero Section

1. Select "Sections" tab
2. Choose "Hero Section" from dropdown
3. Set background:
   - Type: Gradient
   - Value: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
4. Configure heading font:
   - Family: Pretendard
   - Weight: 700 (Bold)
   - Size: Mobile 2rem, Tablet 3rem, Desktop 4rem
5. Set colors:
   - Text: #ffffff (white)
   - Heading: #ffffff (white)
   - Accent: #fbbf24 (amber)
6. Adjust spacing:
   - Padding: Mobile `4rem 1rem`, Desktop `8rem 4rem`
7. Click "Save Changes"

---

## Product Card Designer

Customize the appearance of product cards displayed on the main Products section.

### Design Controls

#### Card Background

- **Type**: Color, image, or gradient
- **Value**: Depends on type selected
- **Overlay**: Optional overlay for image backgrounds

#### Border

- **Width**: Border thickness in pixels (0-10)
- **Color**: Border color with opacity control
- **Radius**: Corner roundness in pixels (0-50)
- **Style**: Solid, dashed, dotted, or none

#### Shadow

- **Default Shadow**: Shadow in normal state
- **Hover Shadow**: Shadow when user hovers over card
- **Transition**: Smooth animation between states

#### Typography

Configure fonts for three text elements:

1. **Title Font**: Product name
   - Typically bold and prominent
   - Recommended: 1.25rem - 1.5rem

2. **Description Font**: Product description
   - Lighter weight than title
   - Recommended: 0.875rem - 1rem

3. **Metadata Font**: Price, category, etc.
   - Smallest text on card
   - Recommended: 0.75rem - 0.875rem

#### Colors

- **Title Color**: Product name color
- **Description Color**: Description text color
- **Metadata Color**: Secondary information color
- **Background Color**: Card background (if not using image)

#### Hover Effects

- **Transform**: Scale, translate, or rotate on hover
  - Example: `scale(1.05)` - Slightly enlarge
  - Example: `translateY(-8px)` - Lift up
- **Transition**: Animation duration and easing
  - Example: `all 0.3s ease-in-out`

#### Spacing

- **Padding**: Internal card spacing
- **Gap**: Space between card elements

### Example: Modern Product Card

1. Select "Product Cards" tab
2. Set background:
   - Type: Color
   - Value: #ffffff (white)
3. Configure border:
   - Width: 1px
   - Color: #e5e7eb (light gray)
   - Radius: 12px
   - Style: Solid
4. Set shadows:
   - Default: `0 1px 3px rgba(0, 0, 0, 0.1)`
   - Hover: `0 10px 15px rgba(0, 0, 0, 0.1)`
5. Configure hover effect:
   - Transform: `translateY(-4px)`
   - Transition: `all 0.3s ease`
6. Click "Save Changes"

---

## Product Detail Designer

Create unique designs for individual product detail pages.

### Product Selection

1. Select "Product Details" tab
2. Choose product from dropdown:
   - Ready Mix Concrete
   - Precast
   - Grouting Agent
   - Waterproof Agent

### Design Areas

#### Hero Section

The top banner area of the product page.

**Background**
- Image, gradient, or video
- Typically uses product-specific imagery

**Overlay**
- Color and opacity for text readability
- Recommended: Dark overlay (rgba(0,0,0,0.5)) for light images

#### Content Section

The main content area with product information.

**Background**
- Usually solid color or subtle gradient
- Should not distract from content

**Typography**
- **Heading Font**: Section titles
- **Body Font**: Paragraphs and descriptions
- **Specs Font**: Technical specifications

**Colors**
- **Heading Color**: Section headings
- **Body Color**: Main text
- **Accent Color**: Highlights and emphasis
- **Spec Label Color**: Specification labels
- **Spec Value Color**: Specification values

#### Gallery Section

Product image gallery configuration.

**Thumbnail Size**
- Width and height of thumbnail images
- Example: `100px` or `6rem`

**Spacing**
- Gap between thumbnails
- Example: `1rem`

**Border Radius**
- Corner roundness of thumbnails
- Example: `8px`

**Lightbox Background**
- Background color when viewing full-size images
- Recommended: `rgba(0, 0, 0, 0.9)`

#### Section Styles

Configure three product detail sections:

1. **Specifications**: Technical details
2. **Applications**: Use cases
3. **Features**: Key benefits

For each section:
- **Background**: Color, image, or gradient
- **Padding**: Responsive spacing
- **Border Radius**: Corner roundness
- **Shadow**: Optional depth effect

### Apply to All Products

Use the "Apply to All Products" button to copy the current product's design to all other products. This ensures consistency across your product catalog.

**Warning**: This action cannot be undone (except via design history rollback).

### Example: Premium Product Page

1. Select "Product Details" tab
2. Choose "Ready Mix Concrete"
3. Configure hero:
   - Background: Product image URL
   - Overlay: rgba(0, 0, 0, 0.4)
4. Set content fonts:
   - Heading: Gmarket Sans Bold, 2rem
   - Body: Pretendard Regular, 1rem
   - Specs: Pretendard Medium, 0.875rem
5. Configure gallery:
   - Thumbnail Size: 120px
   - Spacing: 1rem
   - Border Radius: 8px
6. Style sections with consistent padding and shadows
7. Click "Save Changes"

---

## Preview System

The preview system lets you see changes before applying them to the live site.

### Preview Panel

Located at the bottom of the design interface, the preview panel shows a real-time rendering of your changes.

### Device Views

Toggle between three device sizes:

- **Mobile**: 375px width (iPhone size)
- **Tablet**: 768px width (iPad size)
- **Desktop**: 1440px width (standard desktop)

### Preview Controls

- **Refresh**: Reload preview with current settings
- **Full Screen**: Expand preview to full window
- **Device Toggle**: Switch between mobile/tablet/desktop

### Accessibility Validation

The preview panel includes automatic accessibility checks:

#### Contrast Ratio

- **AA Standard**: Minimum 4.5:1 for normal text, 3:1 for large text
- **AAA Standard**: Minimum 7:1 for normal text, 4.5:1 for large text

**Status Indicators**:
- ✅ Green: Passes WCAG AAA
- ⚠️ Yellow: Passes WCAG AA only
- ❌ Red: Fails WCAG standards

#### Font Size Warnings

- Minimum 16px for body text
- Minimum 14px for small text
- Warnings shown for text below thresholds

#### Suggestions

When issues are detected, the system provides:
- Alternative color suggestions
- Font size recommendations
- Contrast improvement tips

### Using Preview Effectively

1. **Make incremental changes**: Preview after each major change
2. **Test all devices**: Check mobile, tablet, and desktop views
3. **Verify accessibility**: Address all warnings before saving
4. **Compare with live site**: Open live site in another tab for comparison

---

## Design History

Track all design changes and rollback when needed.

### Viewing History

1. Select "History" tab
2. View list of all saved configurations
3. Each entry shows:
   - Timestamp
   - Author (if available)
   - Description (if provided)

### History Entry Details

Click on any history entry to see:
- Full configuration preview
- Changes made (compared to previous version)
- Rollback option

### Rolling Back

To restore a previous design:

1. Select "History" tab
2. Click on the desired history entry
3. Review the preview
4. Click "Rollback to This Version"
5. Confirm the action

**Note**: Rollback creates a new history entry, so you can always undo a rollback.

### Comparing Versions

Use the comparison tool to see differences between two versions:

1. Select first version (base)
2. Select second version (compare)
3. View side-by-side comparison
4. Differences are highlighted

### History Limits

- Last 50 entries are kept in active history
- Older entries are archived
- Archived entries can be restored if needed

### Best Practices

- Save frequently to create restore points
- Add descriptions to important changes
- Review history before major redesigns
- Use comparison tool to understand changes

---

## Import/Export

Save and share design configurations using JSON files.

### Exporting Settings

1. Click "Export" button in header
2. Choose export options:
   - All settings
   - Sections only
   - Product cards only
   - Product details only
3. Click "Download JSON"
4. Save file to your computer

**File naming**: `hyperstone-design-[timestamp].json`

### Importing Settings

1. Click "Import" button in header
2. Select JSON file from your computer
3. Review import preview
4. Choose import options:
   - Replace all settings
   - Merge with existing settings
   - Import specific sections only
5. Click "Import"
6. Confirm the action

### Import Validation

The system validates imported files for:
- Correct JSON structure
- Required fields present
- Valid color formats
- Valid font configurations
- Accessibility compliance

**Errors**: If validation fails, specific errors are shown with line numbers.

### Use Cases

**Backup**: Export regularly to backup your design
**Staging**: Test designs in development before production
**Sharing**: Share configurations with team members
**Templates**: Create reusable design templates
**Migration**: Move designs between environments

### Example Workflow

1. Export current design: `production-backup.json`
2. Make experimental changes
3. Export experiment: `experiment-v1.json`
4. If experiment fails, import `production-backup.json`
5. If experiment succeeds, keep new design

---

## Best Practices

### Design Consistency

1. **Use a limited color palette**: 3-5 main colors
2. **Consistent font families**: 2-3 fonts maximum
3. **Uniform spacing**: Use multiples of 4px or 8px
4. **Consistent shadows**: Reuse shadow values
5. **Coherent animations**: Same duration and easing

### Performance

1. **Optimize images**: Compress before uploading
2. **Limit animations**: Too many can slow performance
3. **Use web-safe fonts**: Or limit custom font weights
4. **Minimize gradients**: Complex gradients can impact performance
5. **Test on mobile**: Ensure smooth performance on devices

### Accessibility

1. **High contrast**: Ensure text is readable
2. **Sufficient font sizes**: Minimum 16px for body text
3. **Clear hierarchy**: Distinct heading sizes
4. **Focus indicators**: Visible for keyboard navigation
5. **Alt text**: Provide for all images

### Workflow

1. **Plan before designing**: Sketch or wireframe first
2. **Start with sections**: Design main sections first
3. **Then cards**: Ensure cards match section style
4. **Finally products**: Create unique product pages
5. **Test thoroughly**: Preview on all devices
6. **Save frequently**: Create restore points
7. **Export backups**: Before major changes

### Responsive Design

1. **Mobile first**: Design for mobile, then scale up
2. **Test breakpoints**: Check tablet and desktop views
3. **Adjust spacing**: Reduce padding on mobile
4. **Scale fonts**: Smaller on mobile, larger on desktop
5. **Simplify mobile**: Reduce complexity for small screens

---

## Accessibility Guidelines

### WCAG Compliance

The design system helps you meet Web Content Accessibility Guidelines (WCAG) 2.1.

#### Level AA (Minimum)

- **Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Font size**: Minimum 16px for body text
- **Focus indicators**: Visible keyboard focus
- **Color alone**: Don't rely solely on color to convey information

#### Level AAA (Enhanced)

- **Contrast**: 7:1 for normal text, 4.5:1 for large text
- **Font size**: Minimum 18px for body text
- **Enhanced focus**: High contrast focus indicators

### Color Contrast

**Good Combinations**:
- Dark text on light background: #1f2937 on #ffffff
- Light text on dark background: #ffffff on #1f2937
- High contrast accents: #fbbf24 on #1f2937

**Poor Combinations** (avoid):
- Light gray on white: #e5e7eb on #ffffff
- Yellow on white: #fbbf24 on #ffffff
- Dark blue on black: #1e40af on #000000

### Font Sizes

**Recommended Sizes**:
- Body text: 16px - 18px
- Small text: 14px minimum
- Large text: 18px+ (considered large for contrast)
- Headings: 24px+ for h2, 32px+ for h1

### Testing Accessibility

1. **Use preview validation**: Check all warnings
2. **Test with keyboard**: Tab through all elements
3. **Use screen reader**: Test with NVDA or JAWS
4. **Check color blindness**: Use color blindness simulators
5. **Test on devices**: Real device testing is best

### Common Issues and Fixes

**Issue**: Low contrast warning
**Fix**: Darken text or lighten background

**Issue**: Font too small
**Fix**: Increase font size to 16px minimum

**Issue**: Insufficient heading hierarchy
**Fix**: Ensure clear size differences between heading levels

**Issue**: Poor focus visibility
**Fix**: Add high-contrast focus outline

---

## Troubleshooting

See [TROUBLESHOOTING_GUIDE.md](./TROUBLESHOOTING_GUIDE.md) for common issues and solutions.

## API Reference

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for technical API details.

## Support

For additional help:
- Review inline tooltips in the design system
- Check the troubleshooting guide
- Contact your system administrator

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-13
