import { FontOption } from './types';

export const FONT_OPTIONS: FontOption[] = [
  // Pretendard
  {
    family: 'Pretendard',
    source: 'pretendard',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  
  // Gmarket Sans
  {
    family: 'Gmarket Sans',
    source: 'gmarket',
    weights: ['Light', 'Medium', 'Bold'],
    category: 'sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  
  // Popular Google Fonts - Korean
  {
    family: 'Noto Sans KR',
    source: 'google',
    weights: [100, 300, 400, 500, 700, 900],
    category: 'sans-serif',
    preview: '빠른 갈색 여우가 게으른 개를 뛰어넘습니다'
  },
  {
    family: 'Noto Serif KR',
    source: 'google',
    weights: [200, 300, 400, 500, 600, 700, 900],
    category: 'serif',
    preview: '빠른 갈색 여우가 게으른 개를 뛰어넘습니다'
  },
  
  // Popular Google Fonts - English
  {
    family: 'Roboto',
    source: 'google',
    weights: [100, 300, 400, 500, 700, 900],
    category: 'sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Open Sans',
    source: 'google',
    weights: [300, 400, 500, 600, 700, 800],
    category: 'sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Lato',
    source: 'google',
    weights: [100, 300, 400, 700, 900],
    category: 'sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Montserrat',
    source: 'google',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Poppins',
    source: 'google',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Inter',
    source: 'google',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Playfair Display',
    source: 'google',
    weights: [400, 500, 600, 700, 800, 900],
    category: 'serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Merriweather',
    source: 'google',
    weights: [300, 400, 700, 900],
    category: 'serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Roboto Mono',
    source: 'google',
    weights: [100, 200, 300, 400, 500, 600, 700],
    category: 'monospace',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Source Code Pro',
    source: 'google',
    weights: [200, 300, 400, 500, 600, 700, 900],
    category: 'monospace',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Saira Stencil One',
    source: 'google',
    weights: [400],
    category: 'display',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    family: 'Audiowide',
    source: 'google',
    weights: [400],
    category: 'display',
    preview: 'The quick brown fox jumps over the lazy dog'
  }
];

export const getFontsByCategory = (category: string) => {
  return FONT_OPTIONS.filter(font => font.category === category);
};

export const getFontByFamily = (family: string) => {
  return FONT_OPTIONS.find(font => font.family === family);
};

export const searchFonts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return FONT_OPTIONS.filter(font => 
    font.family.toLowerCase().includes(lowerQuery)
  );
};
