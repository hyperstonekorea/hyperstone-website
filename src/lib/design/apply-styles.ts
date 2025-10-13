/**
 * Utility functions to apply design settings to components
 * Requirements: 1.2, 1.6
 */

import { FontConfig, ColorConfig, ResponsiveSize, BackgroundConfig, SectionDesignConfig } from './types';

/**
 * Convert FontConfig to CSS style object
 */
export function applyFontStyles(font: FontConfig): React.CSSProperties {
  return {
    fontFamily: `'${font.family}', sans-serif`,
    fontWeight: font.weight,
    lineHeight: font.lineHeight,
    letterSpacing: font.letterSpacing ? `${font.letterSpacing}px` : undefined,
  };
}

/**
 * Convert ColorConfig to CSS color value
 */
export function applyColorValue(color: ColorConfig): string {
  if (color.opacity !== undefined && color.opacity < 1) {
    // Convert hex to rgba if opacity is set
    const hex = color.value.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${color.opacity})`;
  }
  return color.value;
}

/**
 * Generate responsive font size classes
 */
export function getResponsiveFontSizeStyle(size: ResponsiveSize): React.CSSProperties {
  // We'll use CSS custom properties for responsive sizes
  return {
    fontSize: size.desktop,
  };
}

/**
 * Generate responsive padding/margin style
 */
export function getResponsiveSpacingStyle(spacing: ResponsiveSize, property: 'padding' | 'margin'): React.CSSProperties {
  return {
    [property]: spacing.desktop,
  };
}

/**
 * Convert BackgroundConfig to CSS style object
 */
export function applyBackgroundStyles(background: BackgroundConfig): React.CSSProperties {
  const styles: React.CSSProperties = {};

  switch (background.type) {
    case 'color':
      styles.backgroundColor = background.value;
      break;
    case 'gradient':
      styles.backgroundImage = background.value;
      break;
    case 'image':
      styles.backgroundImage = `url(${background.value})`;
      styles.backgroundPosition = background.position || 'center';
      styles.backgroundSize = background.size || 'cover';
      styles.backgroundRepeat = background.repeat || 'no-repeat';
      break;
    case 'video':
      // Video backgrounds are handled separately in the component
      break;
  }

  return styles;
}

/**
 * Generate CSS class string for responsive font sizes
 */
export function getResponsiveFontSizeClasses(size: ResponsiveSize): string {
  // Parse size values and create Tailwind-like classes
  const mobileSize = parseSizeToTailwind(size.mobile);
  const tabletSize = parseSizeToTailwind(size.tablet);
  const desktopSize = parseSizeToTailwind(size.desktop);

  return `${mobileSize} md:${tabletSize} lg:${desktopSize}`;
}

/**
 * Helper to parse size values to Tailwind classes
 */
function parseSizeToTailwind(size: string): string {
  // Convert rem/px values to approximate Tailwind classes
  const value = parseFloat(size);
  const unit = size.replace(/[0-9.]/g, '');

  if (unit === 'rem') {
    if (value <= 0.75) return 'text-xs';
    if (value <= 0.875) return 'text-sm';
    if (value <= 1) return 'text-base';
    if (value <= 1.125) return 'text-lg';
    if (value <= 1.25) return 'text-xl';
    if (value <= 1.5) return 'text-2xl';
    if (value <= 1.875) return 'text-3xl';
    if (value <= 2.25) return 'text-4xl';
    if (value <= 3) return 'text-5xl';
    if (value <= 3.75) return 'text-6xl';
    if (value <= 4.5) return 'text-7xl';
    if (value <= 6) return 'text-8xl';
    return 'text-9xl';
  }

  // Default fallback
  return 'text-base';
}

/**
 * Generate inline styles for responsive sizing
 */
export function getResponsiveSizeInlineStyles(size: ResponsiveSize): string {
  return `
    font-size: ${size.mobile};
    @media (min-width: 768px) {
      font-size: ${size.tablet};
    }
    @media (min-width: 1024px) {
      font-size: ${size.desktop};
    }
  `;
}

/**
 * Create style tag content for section-specific responsive styles
 */
export function createSectionStyles(sectionId: string, config: SectionDesignConfig): string {
  return `
    #${sectionId} {
      ${config.spacing.padding.mobile ? `padding: ${config.spacing.padding.mobile};` : ''}
      ${config.spacing.margin.mobile ? `margin: ${config.spacing.margin.mobile};` : ''}
    }
    
    #${sectionId} .section-heading {
      font-family: '${config.fonts.heading.family}', sans-serif;
      font-weight: ${config.fonts.heading.weight};
      color: ${applyColorValue(config.colors.heading)};
      font-size: ${config.fonts.heading.size.mobile};
      ${config.fonts.heading.lineHeight ? `line-height: ${config.fonts.heading.lineHeight};` : ''}
      ${config.fonts.heading.letterSpacing ? `letter-spacing: ${config.fonts.heading.letterSpacing}px;` : ''}
    }
    
    #${sectionId} .section-body {
      font-family: '${config.fonts.body.family}', sans-serif;
      font-weight: ${config.fonts.body.weight};
      color: ${applyColorValue(config.colors.text)};
      font-size: ${config.fonts.body.size.mobile};
      ${config.fonts.body.lineHeight ? `line-height: ${config.fonts.body.lineHeight};` : ''}
      ${config.fonts.body.letterSpacing ? `letter-spacing: ${config.fonts.body.letterSpacing}px;` : ''}
    }
    
    #${sectionId} .section-accent {
      color: ${applyColorValue(config.colors.accent)};
    }
    
    @media (min-width: 768px) {
      #${sectionId} {
        ${config.spacing.padding.tablet ? `padding: ${config.spacing.padding.tablet};` : ''}
        ${config.spacing.margin.tablet ? `margin: ${config.spacing.margin.tablet};` : ''}
      }
      
      #${sectionId} .section-heading {
        font-size: ${config.fonts.heading.size.tablet};
      }
      
      #${sectionId} .section-body {
        font-size: ${config.fonts.body.size.tablet};
      }
    }
    
    @media (min-width: 1024px) {
      #${sectionId} {
        ${config.spacing.padding.desktop ? `padding: ${config.spacing.padding.desktop};` : ''}
        ${config.spacing.margin.desktop ? `margin: ${config.spacing.margin.desktop};` : ''}
      }
      
      #${sectionId} .section-heading {
        font-size: ${config.fonts.heading.size.desktop};
      }
      
      #${sectionId} .section-body {
        font-size: ${config.fonts.body.size.desktop};
      }
    }
  `;
}
