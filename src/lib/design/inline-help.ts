/**
 * Inline Help Content for Design System UI
 * 
 * This file contains tooltip text and help messages displayed throughout
 * the admin design system interface.
 */

export interface HelpContent {
  title: string;
  description: string;
  example?: string;
  link?: string;
}

export const INLINE_HELP: Record<string, HelpContent> = {
  // Background Controls
  'background.type': {
    title: 'Background Type',
    description: 'Choose how to style the background. Color for solid colors, Image for photos, Gradient for color transitions, or Video for motion backgrounds.',
    example: 'Use gradients for modern, eye-catching designs'
  },
  
  'background.color': {
    title: 'Background Color',
    description: 'Set a solid color background. Use the color picker or enter a hex code.',
    example: '#ffffff for white, #000000 for black'
  },
  
  'background.image': {
    title: 'Background Image',
    description: 'Upload an image or enter an image URL. The image will be used as the section background.',
    example: 'Use high-resolution images (1920px+ width) for best quality'
  },
  
  'background.gradient': {
    title: 'Background Gradient',
    description: 'Create a smooth color transition. Use CSS gradient syntax.',
    example: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  
  'background.overlay': {
    title: 'Background Overlay',
    description: 'Add a color overlay on top of images or videos to improve text readability.',
    example: 'Use rgba(0, 0, 0, 0.5) for a semi-transparent black overlay'
  },
  
  'background.position': {
    title: 'Background Position',
    description: 'Control where the background image is positioned.',
    example: 'center, top, bottom, left, right, or custom like "center top"'
  },
  
  'background.size': {
    title: 'Background Size',
    description: 'Control how the background image is sized.',
    example: 'cover (fill area), contain (fit inside), or custom like "100% auto"'
  },
  
  // Font Controls
  'font.family': {
    title: 'Font Family',
    description: 'Choose the typeface for text. Pretendard and Gmarket Sans are optimized for Korean/English. Google Fonts offer variety.',
    example: 'Pretendard for clean modern text, Gmarket Sans for bold headings'
  },
  
  'font.weight': {
    title: 'Font Weight',
    description: 'Control how bold the text appears. Lower numbers are lighter, higher numbers are bolder.',
    example: '400 for normal, 700 for bold, 900 for extra bold'
  },
  
  'font.size': {
    title: 'Font Size',
    description: 'Set the text size. Configure separately for mobile, tablet, and desktop for responsive design.',
    example: 'Minimum 16px for body text, 14px for small text'
  },
  
  'font.lineHeight': {
    title: 'Line Height',
    description: 'Control spacing between lines of text. Higher values create more space.',
    example: '1.5 for comfortable reading, 1.2 for compact text'
  },
  
  'font.letterSpacing': {
    title: 'Letter Spacing',
    description: 'Adjust space between individual letters. Positive values spread letters apart.',
    example: '0.05em for slightly spaced, -0.02em for tighter'
  },
  
  // Color Controls
  'color.text': {
    title: 'Text Color',
    description: 'Main color for body text. Ensure sufficient contrast with background for readability.',
    example: 'Dark text on light backgrounds, light text on dark backgrounds'
  },
  
  'color.heading': {
    title: 'Heading Color',
    description: 'Color for section headings. Can differ from body text for visual hierarchy.',
    example: 'Use accent colors or darker shades for emphasis'
  },
  
  'color.accent': {
    title: 'Accent Color',
    description: 'Highlight color for buttons, links, and important elements. Should stand out from other colors.',
    example: 'Bright colors like #fbbf24 (amber) or #3b82f6 (blue)'
  },
  
  'color.contrast': {
    title: 'Contrast Ratio',
    description: 'Measure of readability between text and background. WCAG AA requires 4.5:1 for normal text, AAA requires 7:1.',
    example: 'Higher ratios are better for accessibility'
  },
  
  'color.opacity': {
    title: 'Opacity',
    description: 'Control transparency. 1 is fully opaque, 0 is fully transparent.',
    example: '0.8 for slightly transparent, 0.5 for half transparent'
  },
  
  // Spacing Controls
  'spacing.padding': {
    title: 'Padding',
    description: 'Internal spacing within an element. Creates space between content and edges.',
    example: '2rem for all sides, or "2rem 1rem" for vertical and horizontal'
  },
  
  'spacing.margin': {
    title: 'Margin',
    description: 'External spacing around an element. Creates space between elements.',
    example: '1rem for small gaps, 4rem for large gaps'
  },
  
  'spacing.gap': {
    title: 'Gap',
    description: 'Space between child elements in a container.',
    example: '1rem for comfortable spacing between items'
  },
  
  // Border Controls
  'border.width': {
    title: 'Border Width',
    description: 'Thickness of the border in pixels.',
    example: '1px for subtle borders, 2-3px for prominent borders'
  },
  
  'border.color': {
    title: 'Border Color',
    description: 'Color of the border. Can match or contrast with background.',
    example: 'Light gray (#e5e7eb) for subtle borders'
  },
  
  'border.radius': {
    title: 'Border Radius',
    description: 'Roundness of corners in pixels. Higher values create more rounded corners.',
    example: '8px for slightly rounded, 12px for rounded, 50% for circles'
  },
  
  'border.style': {
    title: 'Border Style',
    description: 'Visual style of the border line.',
    example: 'solid for continuous line, dashed for dashes, dotted for dots'
  },
  
  // Shadow Controls
  'shadow.default': {
    title: 'Default Shadow',
    description: 'Shadow effect in normal state. Adds depth and elevation.',
    example: '0 1px 3px rgba(0, 0, 0, 0.1) for subtle shadow'
  },
  
  'shadow.hover': {
    title: 'Hover Shadow',
    description: 'Shadow effect when user hovers over element. Usually larger than default.',
    example: '0 10px 15px rgba(0, 0, 0, 0.1) for lifted effect'
  },
  
  'shadow.blur': {
    title: 'Shadow Blur',
    description: 'How soft or sharp the shadow appears. Higher values create softer shadows.',
    example: '3px for sharp, 10px for soft'
  },
  
  // Effects
  'effects.animation': {
    title: 'Animation',
    description: 'CSS animation to apply to the element.',
    example: 'fadeIn, slideUp, scaleIn, or custom animation names'
  },
  
  'effects.blur': {
    title: 'Backdrop Blur',
    description: 'Blur effect applied to background behind element. Creates frosted glass effect.',
    example: '10px for subtle blur, 20px for strong blur'
  },
  
  'effects.transform': {
    title: 'Transform',
    description: 'CSS transform to apply on hover. Can scale, translate, or rotate.',
    example: 'scale(1.05) to enlarge, translateY(-4px) to lift up'
  },
  
  'effects.transition': {
    title: 'Transition',
    description: 'Animation timing for hover effects. Controls speed and easing.',
    example: 'all 0.3s ease for smooth transitions'
  },
  
  // Product Card Specific
  'productCard.layout': {
    title: 'Card Layout',
    description: 'Overall structure and arrangement of product card elements.',
    example: 'Vertical layout is most common for product cards'
  },
  
  'productCard.hover': {
    title: 'Hover Effects',
    description: 'Visual changes when user hovers over product card. Provides interactive feedback.',
    example: 'Lift up and add shadow for engaging interaction'
  },
  
  // Product Detail Specific
  'productDetail.hero': {
    title: 'Hero Section',
    description: 'Large banner area at top of product page. Usually features product image.',
    example: 'Use high-quality product images with dark overlay for text'
  },
  
  'productDetail.gallery': {
    title: 'Image Gallery',
    description: 'Collection of product images users can browse through.',
    example: 'Consistent thumbnail sizes create clean, organized appearance'
  },
  
  'productDetail.specs': {
    title: 'Specifications',
    description: 'Technical details and specifications of the product.',
    example: 'Use monospace fonts for technical data'
  },
  
  // Responsive Design
  'responsive.mobile': {
    title: 'Mobile Size',
    description: 'Settings for small screens (phones). Typically 375px - 767px width.',
    example: 'Use smaller fonts and padding on mobile'
  },
  
  'responsive.tablet': {
    title: 'Tablet Size',
    description: 'Settings for medium screens (tablets). Typically 768px - 1023px width.',
    example: 'Balance between mobile and desktop sizes'
  },
  
  'responsive.desktop': {
    title: 'Desktop Size',
    description: 'Settings for large screens (desktops). Typically 1024px+ width.',
    example: 'Use larger fonts and generous spacing on desktop'
  },
  
  // Accessibility
  'accessibility.contrast': {
    title: 'Contrast Ratio',
    description: 'Measure of color contrast for readability. WCAG AA requires 4.5:1 minimum for normal text.',
    example: 'Aim for 7:1 or higher for best accessibility (AAA)'
  },
  
  'accessibility.fontSize': {
    title: 'Minimum Font Size',
    description: 'Text should be large enough to read comfortably. Minimum 16px recommended for body text.',
    example: 'Larger text is easier to read for users with vision impairments'
  },
  
  'accessibility.focusIndicator': {
    title: 'Focus Indicator',
    description: 'Visual indicator when element is focused via keyboard navigation.',
    example: 'High contrast outline helps keyboard users navigate'
  },
  
  // History
  'history.entry': {
    title: 'History Entry',
    description: 'Snapshot of design settings at a specific point in time. Can be restored via rollback.',
    example: 'Create restore points before major changes'
  },
  
  'history.rollback': {
    title: 'Rollback',
    description: 'Restore design settings to a previous version. Creates new history entry.',
    example: 'Use to undo mistakes or return to previous design'
  },
  
  'history.comparison': {
    title: 'Version Comparison',
    description: 'View differences between two design versions side by side.',
    example: 'Helps understand what changed between versions'
  },
  
  // Import/Export
  'export.format': {
    title: 'Export Format',
    description: 'Design settings exported as JSON file. Can be imported later or shared.',
    example: 'Export regularly as backup'
  },
  
  'import.validation': {
    title: 'Import Validation',
    description: 'Imported settings are checked for errors before applying.',
    example: 'Validation ensures imported settings are safe to use'
  },
  
  'import.mode': {
    title: 'Import Mode',
    description: 'Replace overwrites all settings. Merge only updates specified sections.',
    example: 'Use merge to update specific sections without affecting others'
  },
  
  // Preview
  'preview.device': {
    title: 'Device Preview',
    description: 'View how design looks on different screen sizes.',
    example: 'Always test mobile, tablet, and desktop views'
  },
  
  'preview.realtime': {
    title: 'Real-Time Preview',
    description: 'See changes immediately as you make them, before saving.',
    example: 'Experiment freely - changes not saved until you click Save'
  },
  
  'preview.accessibility': {
    title: 'Accessibility Check',
    description: 'Automatic validation of color contrast and font sizes against WCAG standards.',
    example: 'Fix all warnings for best accessibility'
  },
};

/**
 * Get help content for a specific field
 */
export function getHelpContent(key: string): HelpContent | undefined {
  return INLINE_HELP[key];
}

/**
 * Get help text (description only) for a specific field
 */
export function getHelpText(key: string): string {
  const content = INLINE_HELP[key];
  return content ? content.description : '';
}

/**
 * Get example text for a specific field
 */
export function getHelpExample(key: string): string | undefined {
  const content = INLINE_HELP[key];
  return content?.example;
}

/**
 * Check if help content exists for a field
 */
export function hasHelpContent(key: string): boolean {
  return key in INLINE_HELP;
}

/**
 * Get all help content keys
 */
export function getAllHelpKeys(): string[] {
  return Object.keys(INLINE_HELP);
}

/**
 * Search help content by keyword
 */
export function searchHelpContent(keyword: string): Array<{ key: string; content: HelpContent }> {
  const lowerKeyword = keyword.toLowerCase();
  const results: Array<{ key: string; content: HelpContent }> = [];
  
  for (const [key, content] of Object.entries(INLINE_HELP)) {
    if (
      key.toLowerCase().includes(lowerKeyword) ||
      content.title.toLowerCase().includes(lowerKeyword) ||
      content.description.toLowerCase().includes(lowerKeyword) ||
      content.example?.toLowerCase().includes(lowerKeyword)
    ) {
      results.push({ key, content });
    }
  }
  
  return results;
}
