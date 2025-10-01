import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/types';

interface MetadataConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: Locale;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hyperstone.co.kr';

// SEO keywords for Korean market
const koreanKeywords = [
  '콘크리트',
  '레미콘',
  '프리캐스트',
  '그라우트',
  '차수액',
  '건설',
  '건축',
  '토목',
  'HYPERSTONE',
  'DULITE',
  '건설자재',
  '콘크리트 제품',
  '지반보강',
  '방수',
  '건설업체',
  '콘크리트 솔루션'
];

const englishKeywords = [
  'concrete',
  'ready mix concrete',
  'precast concrete',
  'grouting agent',
  'waterproof agent',
  'construction',
  'building materials',
  'HYPERSTONE',
  'DULITE',
  'concrete products',
  'ground reinforcement',
  'waterproofing',
  'construction company',
  'concrete solutions',
  'construction materials',
  'civil engineering'
];

export async function generatePageMetadata(
  config: MetadataConfig
): Promise<Metadata> {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    locale = 'ko'
  } = config;

  const t = await getTranslations({ locale, namespace: 'hero' });
  
  const defaultTitle = locale === 'ko' 
    ? 'HYPERSTONE - 건설업계의 혁신적인 솔루션'
    : 'HYPERSTONE - Innovative Solutions for Construction Industry';
    
  const defaultDescription = locale === 'ko'
    ? 'DULITE 브랜드로 최고 품질의 콘크리트 제품을 제공하는 HYPERSTONE. 레미콘, 프리캐스트, 그라우트액, 차수액 등 전문 건설 솔루션을 만나보세요.'
    : 'HYPERSTONE provides the highest quality concrete products under the DULITE brand. Discover professional construction solutions including ready mix concrete, precast concrete, grouting agents, and waterproof agents.';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalUrl = url ? `${baseUrl}${url}` : baseUrl;
  const finalImage = image || `${baseUrl}/images/og-image.jpg`;
  
  const baseKeywords = locale === 'ko' ? koreanKeywords : englishKeywords;
  const allKeywords = [...baseKeywords, ...keywords];

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: allKeywords.join(', '),
    authors: [{ name: 'HYPERSTONE' }],
    creator: 'HYPERSTONE',
    publisher: 'HYPERSTONE',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: finalUrl,
      title: finalTitle,
      description: finalDescription,
      siteName: 'HYPERSTONE',
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
      creator: '@hyperstone',
    },
    alternates: {
      canonical: finalUrl,
      languages: {
        'ko-KR': locale === 'ko' ? finalUrl : finalUrl.replace('/en', ''),
        'en-US': locale === 'en' ? finalUrl : `${finalUrl}/en`,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: {
        'naver-site-verification': process.env.NAVER_SITE_VERIFICATION || '',
      },
    },
  };
}

export async function generateProductMetadata(
  productSlug: string,
  locale: Locale
): Promise<Metadata> {
  const { products } = await import('@/data/products');
  const product = products.find(p => p.slug === productSlug);
  
  if (!product) {
    return generatePageMetadata({
      title: locale === 'ko' ? '제품을 찾을 수 없습니다' : 'Product Not Found',
      locale,
    });
  }

  const productName = product.name[locale];
  const productDescription = product.shortDescription[locale];
  
  const title = `${productName} | HYPERSTONE`;
  const description = `${productDescription} - HYPERSTONE의 DULITE 브랜드 제품으로 최고 품질의 ${productName.toLowerCase()}을 제공합니다.`;
  
  const productKeywords = locale === 'ko' 
    ? [productName, product.slug, '콘크리트 제품', 'DULITE']
    : [productName, product.slug, 'concrete product', 'DULITE'];

  return generatePageMetadata({
    title,
    description,
    keywords: productKeywords,
    image: product.images.thumbnail,
    url: `/${locale}/${productSlug}`,
    type: 'article',
    locale,
  });
}

// Company information for structured data
export const companyInfo = {
  name: 'HYPERSTONE',
  legalName: 'HYPERSTONE Co., Ltd.',
  url: baseUrl,
  logo: `${baseUrl}/images/logo.png`,
  description: {
    ko: 'DULITE 브랜드로 최고 품질의 콘크리트 제품을 제공하는 건설업계 전문 기업',
    en: 'Professional construction company providing the highest quality concrete products under the DULITE brand'
  },
  address: {
    ko: '서울특별시 강남구 테헤란로 123',
    en: '123 Teheran-ro, Gangnam-gu, Seoul, South Korea'
  },
  telephone: '+82-2-1234-5678',
  email: 'info@hyperstone.co.kr',
  foundingDate: '2024',
  industry: 'Construction Materials',
  areaServed: 'South Korea',
  sameAs: [
    // Add social media URLs when available
  ]
};