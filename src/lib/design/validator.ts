import { DesignSettings, ValidationResult, ValidationWarning, ValidationError } from './types';

export class DesignValidator {
  validateSettings(settings: DesignSettings): ValidationResult {
    const warnings: ValidationWarning[] = [];
    const errors: ValidationError[] = [];

    // Validate version
    if (!settings.version) {
      errors.push({
        field: 'version',
        message: 'Version is required',
        critical: true
      });
    }

    // Validate sections
    if (settings.sections) {
      Object.entries(settings.sections).forEach(([sectionId, config]) => {
        // Validate colors
        if (config.colors) {
          const textColor = config.colors.text?.value;
          const bgColor = config.colors.background?.value;
          
          if (textColor && bgColor && bgColor !== 'transparent') {
            const contrastResult = this.validateColorContrast(textColor, bgColor);
            if (!contrastResult.valid) {
              warnings.push({
                field: `sections.${sectionId}.colors`,
                message: `Text color contrast ratio (${contrastResult.ratio.toFixed(2)}) does not meet WCAG AA standards`,
                suggestion: 'Use darker text or lighter background for better readability'
              });
            }
          }
        }

        // Validate font sizes
        if (config.fonts) {
          ['heading', 'body'].forEach(fontType => {
            const font = config.fonts[fontType as 'heading' | 'body'];
            if (font?.size) {
              const sizeValidation = this.validateFontSize(font.size.mobile, fontType as 'heading' | 'body');
              if (!sizeValidation) {
                warnings.push({
                  field: `sections.${sectionId}.fonts.${fontType}.size.mobile`,
                  message: `Font size may be too small for mobile devices`,
                  suggestion: fontType === 'heading' ? 'Use at least 1.5rem for headings' : 'Use at least 1rem for body text'
                });
              }
            }
          });
        }
      });
    }

    return {
      valid: errors.length === 0,
      warnings,
      errors
    };
  }

  validateColorContrast(
    foreground: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA'
  ): { valid: boolean; ratio: number } {
    const ratio = this.calculateContrastRatio(foreground, background);
    const threshold = level === 'AAA' ? 7 : 4.5;
    
    return {
      valid: ratio >= threshold,
      ratio
    };
  }

  private calculateContrastRatio(color1: string, color2: string): number {
    const lum1 = this.getLuminance(color1);
    const lum2 = this.getLuminance(color2);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private getLuminance(color: string): number {
    const rgb = this.hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
      const normalized = val / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Handle 3-digit hex
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }

    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  validateFontSize(size: string, context: 'heading' | 'body'): boolean {
    const numericSize = parseFloat(size);
    const unit = size.replace(/[\d.]/g, '');

    if (unit === 'rem' || unit === 'em') {
      return context === 'heading' ? numericSize >= 1.5 : numericSize >= 1;
    }

    if (unit === 'px') {
      return context === 'heading' ? numericSize >= 24 : numericSize >= 16;
    }

    return true; // Can't validate other units reliably
  }
}

export const designValidator = new DesignValidator();
