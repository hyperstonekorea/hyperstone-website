# Design System Quick Reference

Quick reference guide for common tasks and settings in the HYPERSTONE Admin Design System.

## Common Color Combinations

### High Contrast (WCAG AAA)
```
Dark text on light:
- #000000 on #FFFFFF (21:1)
- #1f2937 on #FFFFFF (16.1:1)
- #374151 on #FFFFFF (12.6:1)

Light text on dark:
- #FFFFFF on #000000 (21:1)
- #FFFFFF on #1f2937 (16.1:1)
- #FFFFFF on #1e3a8a (8.6:1)
```

### Good Contrast (WCAG AA)
```
- #4b5563 on #FFFFFF (9.7:1)
- #6b7280 on #FFFFFF (7.5:1)
- #FFFFFF on #3b82f6 (4.5:1)
- #1f2937 on #f3f4f6 (14.4:1)
```

### Accent Colors
```
Amber: #fbbf24
Blue: #3b82f6
Green: #10b981
Red: #ef4444
Purple: #8b5cf6
```

## Font Sizes

### Body Text
```
Mobile:  16px (1rem)
Tablet:  16px (1rem)
Desktop: 18px (1.125rem)
```

### Headings
```
H1: 32px - 48px (2rem - 3rem)
H2: 24px - 36px (1.5rem - 2.25rem)
H3: 20px - 28px (1.25rem - 1.75rem)
H4: 18px - 24px (1.125rem - 1.5rem)
```

### Small Text
```
Minimum: 14px (0.875rem)
Metadata: 12px - 14px (0.75rem - 0.875rem)
```

## Spacing Values

### Padding
```
Compact:  1rem (16px)
Normal:   2rem (32px)
Spacious: 4rem (64px)
Extra:    6rem (96px)
```

### Margin
```
Small:  0.5rem (8px)
Medium: 1rem (16px)
Large:  2rem (32px)
XLarge: 4rem (64px)
```

### Gap
```
Tight:  0.5rem (8px)
Normal: 1rem (16px)
Loose:  1.5rem (24px)
```

## Shadow Presets

### Subtle
```
Default: 0 1px 3px rgba(0, 0, 0, 0.1)
Hover:   0 4px 6px rgba(0, 0, 0, 0.1)
```

### Medium
```
Default: 0 4px 6px rgba(0, 0, 0, 0.1)
Hover:   0 10px 15px rgba(0, 0, 0, 0.1)
```

### Strong
```
Default: 0 10px 15px rgba(0, 0, 0, 0.1)
Hover:   0 20px 25px rgba(0, 0, 0, 0.15)
```

## Border Radius

```
None:    0px
Small:   4px
Medium:  8px
Large:   12px
XLarge:  16px
Round:   24px
Circle:  50%
```

## Gradient Examples

### Linear Gradients
```
Purple to Blue:
linear-gradient(135deg, #667eea 0%, #764ba2 100%)

Blue to Cyan:
linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)

Sunset:
linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)

Ocean:
linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)
```

### Radial Gradients
```
Spotlight:
radial-gradient(circle at center, #ffffff 0%, #f3f4f6 100%)

Vignette:
radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)
```

## Transform Effects

### Scale
```
Subtle:  scale(1.02)
Normal:  scale(1.05)
Strong:  scale(1.1)
```

### Translate
```
Lift up:    translateY(-4px)
Lift more:  translateY(-8px)
Slide left: translateX(-4px)
```

### Rotate
```
Slight: rotate(1deg)
Tilt:   rotate(3deg)
```

### Combined
```
Lift and scale: translateY(-4px) scale(1.05)
Tilt and lift:  translateY(-2px) rotate(1deg)
```

## Transition Timings

```
Fast:   all 0.15s ease
Normal: all 0.3s ease
Slow:   all 0.5s ease

Ease in:     all 0.3s ease-in
Ease out:    all 0.3s ease-out
Ease in-out: all 0.3s ease-in-out
```

## Responsive Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1023px
Desktop: ≥ 1024px
```

## Font Weights

### Pretendard
```
Thin:       100
ExtraLight: 200
Light:      300
Regular:    400
Medium:     500
SemiBold:   600
Bold:       700
ExtraBold:  800
Black:      900
```

### Gmarket Sans
```
Light:  300
Medium: 500
Bold:   700
```

## Background Positions

```
Center:       center
Top:          top
Bottom:       bottom
Left:         left
Right:        right
Top Left:     top left
Top Right:    top right
Bottom Left:  bottom left
Bottom Right: bottom right
Custom:       50% 25% (x y)
```

## Background Sizes

```
Cover:   cover (fill area, may crop)
Contain: contain (fit inside, may show background)
Auto:    auto (original size)
Custom:  100% auto (width height)
```

## Overlay Examples

```
Dark subtle:    rgba(0, 0, 0, 0.3)
Dark medium:    rgba(0, 0, 0, 0.5)
Dark strong:    rgba(0, 0, 0, 0.7)

Light subtle:   rgba(255, 255, 255, 0.3)
Light medium:   rgba(255, 255, 255, 0.5)
Light strong:   rgba(255, 255, 255, 0.7)

Colored:        rgba(59, 130, 246, 0.5)
```

## Line Heights

```
Tight:  1.2
Normal: 1.5
Loose:  1.8
Extra:  2.0
```

## Letter Spacing

```
Tight:  -0.02em
Normal: 0
Loose:  0.05em
Extra:  0.1em
```

## API Endpoints

```
GET    /api/admin/design-settings
PUT    /api/admin/design-settings
POST   /api/admin/design-settings/export
POST   /api/admin/design-settings/import

GET    /api/admin/design-history
POST   /api/admin/design-history/rollback

GET    /api/admin/fonts
GET    /api/admin/fonts/google/search

POST   /api/admin/design-preview
POST   /api/admin/upload
```

## Keyboard Shortcuts

```
Save:           Ctrl+S (Cmd+S on Mac)
Hard Refresh:   Ctrl+Shift+R (Cmd+Shift+R on Mac)
Open DevTools:  F12
Toggle Preview: (No default, use button)
```

## Common CSS Units

```
px:  Pixels (absolute)
rem: Relative to root font size
em:  Relative to parent font size
%:   Percentage of parent
vh:  Viewport height
vw:  Viewport width
```

## Validation Rules

### Contrast Ratios
```
WCAG AA:
- Normal text: 4.5:1 minimum
- Large text:  3:1 minimum

WCAG AAA:
- Normal text: 7:1 minimum
- Large text:  4.5:1 minimum
```

### Font Sizes
```
Body text:  16px minimum
Small text: 14px minimum
Large text: 18px+ (for contrast)
```

## File Limits

```
Image upload:     5MB maximum
JSON import:      10MB maximum
History entries:  50 maximum
```

## Rate Limits

```
Save settings:    10 per minute
Upload image:     5 per minute
Export:           3 per minute
Import:           3 per minute
```

## Cache Durations

```
Design settings:  60 seconds
Font list:        24 hours
History:          5 minutes
```

## Recommended Fonts

### Korean/English
```
Pretendard:    Modern, clean, versatile
Gmarket Sans:  Bold, attention-grabbing
Noto Sans KR:  Professional, readable
```

### English Only
```
Roboto:        Clean, modern
Open Sans:     Friendly, readable
Montserrat:    Geometric, modern
Lato:          Professional, warm
```

### Monospace
```
Roboto Mono:   Clean, technical
Fira Code:     Developer-friendly
Source Code:   Adobe, professional
```

## Color Formats

```
Hex:   #ffffff
RGB:   rgb(255, 255, 255)
RGBA:  rgba(255, 255, 255, 0.5)
HSL:   hsl(0, 0%, 100%)
HSLA:  hsla(0, 0%, 100%, 0.5)
```

## Image Formats

```
JPEG: Photos, complex images
PNG:  Graphics, transparency
WebP: Modern, best compression
```

## Common Mistakes

### ❌ Don't
```
- Use too many fonts (>3)
- Set font size below 14px
- Use low contrast colors
- Forget to test mobile
- Skip accessibility checks
- Make changes without preview
- Forget to export backups
```

### ✅ Do
```
- Limit to 2-3 fonts
- Use 16px+ for body text
- Ensure 4.5:1 contrast minimum
- Test all device sizes
- Fix accessibility warnings
- Preview before saving
- Export regularly
```

## Troubleshooting Quick Fixes

```
Changes not showing:
→ Hard refresh (Ctrl+Shift+R)

Can't save:
→ Fix validation errors

Preview not updating:
→ Click refresh button

Font not loading:
→ Check spelling, use selector

Upload fails:
→ Check size (<5MB) and type

Slow performance:
→ Optimize images, reduce fonts
```

## Support Resources

```
User Guide:         ADMIN_DESIGN_SYSTEM_USER_GUIDE.md
API Docs:           API_DOCUMENTATION.md
Troubleshooting:    TROUBLESHOOTING_GUIDE.md
Quick Reference:    This file
```

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-13
