export class InputSanitizer {
  sanitizeColor(color: string): string {
    // Remove any potentially dangerous characters
    color = color.trim();

    // Validate hex color
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      if (/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex)) {
        return color;
      }
      throw new Error('Invalid hex color format');
    }

    // Validate rgb/rgba
    if (color.startsWith('rgb')) {
      if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(color)) {
        return color;
      }
      throw new Error('Invalid RGB color format');
    }

    // Validate named colors (basic set)
    const namedColors = [
      'transparent', 'white', 'black', 'red', 'green', 'blue',
      'yellow', 'orange', 'purple', 'pink', 'gray', 'grey'
    ];
    if (namedColors.includes(color.toLowerCase())) {
      return color.toLowerCase();
    }

    throw new Error('Invalid color format');
  }

  sanitizeUrl(url: string): string {
    url = url.trim();

    // Only allow http, https, and data URLs
    if (!url.match(/^(https?:\/\/|data:image\/)/)) {
      throw new Error('Invalid URL protocol. Only HTTP, HTTPS, and data URLs are allowed');
    }

    // Prevent javascript: and other dangerous protocols
    if (url.match(/^(javascript|vbscript|file|about):/i)) {
      throw new Error('Dangerous URL protocol detected');
    }

    // Basic XSS prevention
    if (url.includes('<') || url.includes('>') || url.includes('"') || url.includes("'")) {
      throw new Error('Invalid characters in URL');
    }

    return url;
  }

  sanitizeFontFamily(family: string): string {
    family = family.trim();

    // Remove any quotes
    family = family.replace(/['"]/g, '');

    // Only allow alphanumeric, spaces, hyphens, and common font name characters
    if (!/^[a-zA-Z0-9\s\-]+$/.test(family)) {
      throw new Error('Invalid font family name');
    }

    // Prevent excessively long names
    if (family.length > 100) {
      throw new Error('Font family name too long');
    }

    return family;
  }

  sanitizeNumber(value: number, min?: number, max?: number): number {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Invalid number');
    }

    if (min !== undefined && value < min) {
      return min;
    }

    if (max !== undefined && value > max) {
      return max;
    }

    return value;
  }

  sanitizeString(str: string, maxLength: number = 1000): string {
    str = str.trim();

    // Remove any HTML tags
    str = str.replace(/<[^>]*>/g, '');

    // Limit length
    if (str.length > maxLength) {
      str = str.substring(0, maxLength);
    }

    return str;
  }
}

export const inputSanitizer = new InputSanitizer();
