import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HYPERSTONE - 건설업계의 혁신적인 솔루션',
    short_name: 'HYPERSTONE',
    description: 'DULITE 브랜드로 최고 품질의 콘크리트 제품을 제공하는 HYPERSTONE',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0082FB',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['business', 'construction', 'industrial'],
    lang: 'ko',
  };
}