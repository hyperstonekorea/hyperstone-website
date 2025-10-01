import { Locale } from '@/types';
import { companyInfo } from './metadata';

// Organization Schema
export function generateOrganizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name,
    legalName: companyInfo.legalName,
    url: companyInfo.url,
    logo: companyInfo.logo,
    description: companyInfo.description[locale],
    foundingDate: companyInfo.foundingDate,
    industry: companyInfo.industry,
    areaServed: {
      '@type': 'Country',
      name: 'South Korea',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: locale === 'ko' ? '서울특별시' : 'Seoul',
      addressRegion: locale === 'ko' ? '강남구' : 'Gangnam-gu',
      streetAddress: companyInfo.address[locale],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyInfo.telephone,
      email: companyInfo.email,
      contactType: 'customer service',
      availableLanguage: ['Korean', 'English'],
    },
    sameAs: companyInfo.sameAs,
  };
}

// Website Schema
export function generateWebsiteSchema(locale: Locale) {
  const baseUrl = companyInfo.url;
  const localeUrl = locale === 'ko' ? baseUrl : `${baseUrl}/en`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyInfo.name,
    url: localeUrl,
    description: companyInfo.description[locale],
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: companyInfo.name,
      url: companyInfo.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${localeUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Product Schema
export function generateProductSchema(product: any, locale: Locale) {
  const baseUrl = companyInfo.url;
  const productUrl = `${baseUrl}/${locale}/${product.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale],
    description: product.shortDescription[locale],
    image: product.images.thumbnail,
    url: productUrl,
    brand: {
      '@type': 'Brand',
      name: 'DULITE',
    },
    manufacturer: {
      '@type': 'Organization',
      name: companyInfo.name,
      url: companyInfo.url,
    },
    category: locale === 'ko' ? '콘크리트 제품' : 'Concrete Products',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'KRW',
      seller: {
        '@type': 'Organization',
        name: companyInfo.name,
      },
    },
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQ Schema (for contact page)
export function generateFAQSchema(locale: Locale) {
  const faqs = locale === 'ko' ? [
    {
      question: 'HYPERSTONE의 주요 제품은 무엇인가요?',
      answer: 'HYPERSTONE은 DULITE 브랜드로 레미콘, 프리캐스트 콘크리트, 지반보강 그라우트액, 차수액 등 다양한 콘크리트 솔루션을 제공합니다.',
    },
    {
      question: '제품 문의는 어떻게 하나요?',
      answer: '전화(+82-2-1234-5678), 이메일(info@hyperstone.co.kr) 또는 웹사이트의 문의 양식을 통해 연락주시면 전문가가 상담해드립니다.',
    },
    {
      question: '견적 요청은 어떻게 하나요?',
      answer: '프로젝트 규모와 요구사항을 문의 양식에 작성해주시면, 맞춤형 견적을 제공해드립니다.',
    },
  ] : [
    {
      question: 'What are HYPERSTONE\'s main products?',
      answer: 'HYPERSTONE provides various concrete solutions under the DULITE brand, including ready mix concrete, precast concrete, ground reinforcement grouting agents, and waterproof agents.',
    },
    {
      question: 'How can I inquire about products?',
      answer: 'You can contact us by phone (+82-2-1234-5678), email (info@hyperstone.co.kr), or through the inquiry form on our website, and our experts will provide consultation.',
    },
    {
      question: 'How do I request a quote?',
      answer: 'Please fill out the inquiry form with your project scale and requirements, and we will provide a customized quote.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Local Business Schema
export function generateLocalBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${companyInfo.url}#organization`,
    name: companyInfo.name,
    description: companyInfo.description[locale],
    url: companyInfo.url,
    telephone: companyInfo.telephone,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address[locale],
      addressLocality: locale === 'ko' ? '서울특별시' : 'Seoul',
      addressRegion: locale === 'ko' ? '강남구' : 'Gangnam-gu',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5665,
      longitude: 126.9780,
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'South Korea',
    },
  };
}

// Helper function to inject structured data
export function injectStructuredData(schema: object): string {
  return JSON.stringify(schema, null, 2);
}