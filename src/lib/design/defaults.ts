/**
 * Default design settings for the HYPERSTONE website
 * Requirements: 1.6, 1.8
 */

import { DesignSettings } from './types';

export const DEFAULT_DESIGN_SETTINGS: DesignSettings = {
  version: '1.0.0',
  lastUpdated: new Date().toISOString(),
  sections: {
    hero: {
      sectionId: 'hero',
      background: {
        type: 'color',
        value: '#0082FB',
      },
      fonts: {
        heading: {
          family: 'Pretendard',
          source: 'pretendard',
          weight: 700,
          size: { mobile: '2rem', tablet: '3rem', desktop: '4rem' },
          lineHeight: 1.2,
        },
        body: {
          family: 'Pretendard',
          source: 'pretendard',
          weight: 400,
          size: { mobile: '1rem', tablet: '1.125rem', desktop: '1.25rem' },
          lineHeight: 1.6,
        },
      },
      colors: {
        text: { value: '#ffffff', opacity: 1 },
        heading: { value: '#ffffff', opacity: 1 },
        accent: { value: '#fbbf24', opacity: 1 },
        background: { value: 'transparent', opacity: 1 },
      },
      spacing: {
        padding: { mobile: '4rem 1rem', tablet: '6rem 2rem', desktop: '8rem 4rem' },
        margin: { mobile: '0', tablet: '0', desktop: '0' },
      },
    },
    about: {
      sectionId: 'about',
      background: {
        type: 'color',
        value: '#ffffff',
      },
      fonts: {
        heading: {
          family: 'Pretendard',
          source: 'pretendard',
          weight: 700,
          size: { mobile: '1.75rem', tablet: '2.25rem', desktop: '3rem' },
          lineHeight: 1.3,
        },
        body: {
          family: 'Pretendard',
          source: 'pretendard',
          weight: 400,
          size: { mobile: '1rem', tablet: '1.125rem', desktop: '1.125rem' },
          lineHeight: 1.7,
        },
      },
      colors: {
        text: { value: '#374151', opacity: 1 },
        heading: { value: '#111827', opacity: 1 },
        accent: { value: '#667eea', opacity: 1 },
        background: { value: '#ffffff', opacity: 1 },
      },
      spacing: {
        padding: { mobile: '3rem 1rem', tablet: '4rem 2rem', desktop: '6rem 4rem' },
        margin: { mobile: '0', tablet: '0', desktop: '0' },
      },
    },
    products: {
      sectionId: 'products',
      background: {
        type: 'color',
        value: '#f9fafb',
      },
      fonts: {
        heading: {
          family: 'Pretendard',
          source: 'pretendard',
          weight: 700,
          size: { mobile: '1.75rem', tablet: '2.25rem', desktop: '3rem' },
          lineHeight: 1.3,
        },
        body: {
          family: 'Pretendard',
          source: 'pretendard',
          weight: 400,
          size: { mobile: '1rem', tablet: '1.125rem', desktop: '1.125rem' },
          lineHeight: 1.7,
        },
      },
      colors: {
        text: { value: '#374151', opacity: 1 },
        heading: { value: '#111827', opacity: 1 },
        accent: { value: '#667eea', opacity: 1 },
        background: { value: '#f9fafb', opacity: 1 },
      },
      spacing: {
        padding: { mobile: '3rem 1rem', tablet: '4rem 2rem', desktop: '6rem 4rem' },
        margin: { mobile: '0', tablet: '0', desktop: '0' },
      },
    },
    contact: {
      sectionId: 'contact',
      background: {
        type: 'color',
        value: '#ffffff',
      },
      fonts: {
        heading: {
          family: 'Pretendard',
          source: 'pretendard',
          weight: 700,
          size: { mobile: '1.75rem', tablet: '2.25rem', desktop: '3rem' },
          lineHeight: 1.3,
        },
        body: {
          family: 'Pretendard',
          source: 'pretendard',
          weight: 400,
          size: { mobile: '1rem', tablet: '1.125rem', desktop: '1.125rem' },
          lineHeight: 1.7,
        },
      },
      colors: {
        text: { value: '#374151', opacity: 1 },
        heading: { value: '#111827', opacity: 1 },
        accent: { value: '#667eea', opacity: 1 },
        background: { value: '#ffffff', opacity: 1 },
      },
      spacing: {
        padding: { mobile: '3rem 1rem', tablet: '4rem 2rem', desktop: '6rem 4rem' },
        margin: { mobile: '0', tablet: '0', desktop: '0' },
      },
    },
  },
  productCards: {
    background: {
      type: 'color',
      value: '#ffffff',
    },
    border: {
      width: 1,
      color: { value: '#e5e7eb', opacity: 1 },
      radius: 12,
      style: 'solid',
    },
    shadow: {
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      hover: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    fonts: {
      title: {
        family: 'Pretendard',
        source: 'pretendard',
        weight: 600,
        size: { mobile: '1.25rem', tablet: '1.5rem', desktop: '1.5rem' },
        lineHeight: 1.4,
      },
      description: {
        family: 'Pretendard',
        source: 'pretendard',
        weight: 400,
        size: { mobile: '0.875rem', tablet: '1rem', desktop: '1rem' },
        lineHeight: 1.6,
      },
      metadata: {
        family: 'Pretendard',
        source: 'pretendard',
        weight: 400,
        size: { mobile: '0.75rem', tablet: '0.875rem', desktop: '0.875rem' },
        lineHeight: 1.5,
      },
    },
    colors: {
      title: { value: '#111827', opacity: 1 },
      description: { value: '#6b7280', opacity: 1 },
      metadata: { value: '#9ca3af', opacity: 1 },
      background: { value: '#ffffff', opacity: 1 },
    },
    hover: {
      transform: 'translateY(-4px)',
      transition: 'all 0.3s ease',
    },
    spacing: {
      padding: '1.5rem',
      gap: '1rem',
    },
  },
  productDetails: {},
  globalFonts: {
    primary: {
      family: 'Pretendard',
      source: 'pretendard',
      weight: 400,
      size: { mobile: '1rem', tablet: '1rem', desktop: '1rem' },
      lineHeight: 1.6,
    },
    secondary: {
      family: 'Gmarket Sans',
      source: 'gmarket',
      weight: 'Medium',
      size: { mobile: '1rem', tablet: '1rem', desktop: '1rem' },
      lineHeight: 1.6,
    },
    monospace: {
      family: 'Roboto Mono',
      source: 'google',
      weight: 400,
      size: { mobile: '0.875rem', tablet: '0.875rem', desktop: '0.875rem' },
      lineHeight: 1.5,
    },
  },
};
