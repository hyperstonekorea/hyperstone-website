/**
 * Type definitions for the Admin Design System
 * Requirements: 1.2, 1.3, 1.4, 1.5
 */

export interface ResponsiveSize {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ColorConfig {
  value: string; // hex, rgb, rgba
  opacity?: number;
  contrastRatio?: number;
}

export interface BackgroundConfig {
  type: 'color' | 'image' | 'gradient' | 'video';
  value: string;
  overlay?: {
    color: string;
    opacity: number;
    blendMode: string;
  };
  position?: string;
  size?: string;
  repeat?: string;
}

export interface FontConfig {
  family: string;
  source: 'google' | 'pretendard' | 'gmarket' | 'system';
  weight: number | string;
  size: ResponsiveSize;
  lineHeight?: number;
  letterSpacing?: number;
}

export interface SectionDesignConfig {
  sectionId: 'hero' | 'about' | 'products' | 'contact';
  background: BackgroundConfig;
  fonts: {
    heading: FontConfig;
    body: FontConfig;
    accent?: FontConfig;
  };
  colors: {
    text: ColorConfig;
    heading: ColorConfig;
    accent: ColorConfig;
    background: ColorConfig;
  };
  spacing: {
    padding: ResponsiveSize;
    margin: ResponsiveSize;
  };
  effects?: {
    shadow?: string;
    blur?: number;
    animation?: string;
  };
}

export interface ProductCardDesignConfig {
  background: BackgroundConfig;
  border: {
    width: number;
    color: ColorConfig;
    radius: number;
    style: 'solid' | 'dashed' | 'dotted' | 'none';
  };
  shadow: {
    default: string;
    hover: string;
  };
  fonts: {
    title: FontConfig;
    description: FontConfig;
    metadata: FontConfig;
  };
  colors: {
    title: ColorConfig;
    description: ColorConfig;
    metadata: ColorConfig;
    background: ColorConfig;
  };
  hover: {
    transform: string;
    transition: string;
  };
  spacing: {
    padding: string;
    gap: string;
  };
}

export interface SectionStyleConfig {
  background: BackgroundConfig;
  padding: ResponsiveSize;
  borderRadius: number;
  shadow?: string;
}

export interface ProductDetailDesignConfig {
  productSlug: string;
  hero: {
    background: BackgroundConfig;
    overlay: {
      color: string;
      opacity: number;
    };
  };
  content: {
    background: BackgroundConfig;
    fonts: {
      heading: FontConfig;
      body: FontConfig;
      specs: FontConfig;
    };
    colors: {
      heading: ColorConfig;
      body: ColorConfig;
      accent: ColorConfig;
      specLabel: ColorConfig;
      specValue: ColorConfig;
    };
  };
  gallery: {
    thumbnailSize: string;
    spacing: string;
    borderRadius: number;
    lightboxBackground: string;
  };
  sections: {
    specifications: SectionStyleConfig;
    applications: SectionStyleConfig;
    features: SectionStyleConfig;
  };
}

export interface DesignSettings {
  version: string;
  lastUpdated: string;
  sections: {
    [key: string]: SectionDesignConfig;
  };
  productCards: ProductCardDesignConfig;
  productDetails: {
    [productSlug: string]: ProductDetailDesignConfig;
  };
  globalFonts: {
    primary: FontConfig;
    secondary: FontConfig;
    monospace: FontConfig;
  };
}

export interface DesignHistoryEntry {
  id: string;
  timestamp: string;
  settings: DesignSettings;
  author: string;
  description?: string;
}

export interface FontOption {
  family: string;
  source: 'google' | 'pretendard' | 'gmarket';
  weights: (number | string)[];
  category?: string;
  preview?: string;
}

export interface ValidationResult {
  valid: boolean;
  warnings: ValidationWarning[];
  errors: ValidationError[];
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  critical: boolean;
}
