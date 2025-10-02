import { Locale } from '@/i18n/config';
import { safeFetch } from './data-fetching';
import { logError, logInfo } from './error-logging';

export interface HeroData {
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  backgroundImage?: string;
}

export interface AboutData {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  features: Record<Locale, string[]>;
}

export interface Product {
  id: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  image: string;
  category: string;
}

export interface ContactData {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface PageMetadata {
  lastUpdated: string;
  version: string;
}

export interface PageData {
  hero: HeroData;
  about: AboutData;
  products: Product[];
  contact: ContactData;
  metadata: PageMetadata;
}

// Fallback data for when fetches fail
const FALLBACK_PAGE_DATA: PageData = {
  hero: {
    title: {
      en: 'Welcome to Hyperstone',
      ko: 'Hyperstone에 오신 것을 환영합니다',
    },
    subtitle: {
      en: 'Leading manufacturer of industrial materials',
      ko: '산업 자재의 선도적인 제조업체',
    },
  },
  about: {
    title: {
      en: 'About Us',
      ko: '회사 소개',
    },
    description: {
      en: 'We are a leading manufacturer of high-quality industrial materials.',
      ko: '우리는 고품질 산업 자재의 선도적인 제조업체입니다.',
    },
    features: {
      en: ['Quality Products', 'Expert Team', 'Global Reach'],
      ko: ['품질 제품', '전문가 팀', '글로벌 도달'],
    },
  },
  products: [],
  contact: {
    title: {
      en: 'Contact Us',
      ko: '문의하기',
    },
    description: {
      en: 'Get in touch with our team',
      ko: '우리 팀에 연락하세요',
    },
  },
  metadata: {
    lastUpdated: new Date().toISOString(),
    version: '1.0.0',
  },
};

export async function fetchPageData(locale: Locale): Promise<PageData> {
  try {
    logInfo('Fetching page data', { locale });

    // For now, return static data since we don't have external APIs
    // In the future, this could fetch from a CMS or API
    const pageData: PageData = {
      ...FALLBACK_PAGE_DATA,
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
      },
    };

    return pageData;
  } catch (error) {
    logError(error as Error, {
      component: 'fetchPageData',
      locale,
    });

    return FALLBACK_PAGE_DATA;
  }
}

export async function fetchProducts(locale: Locale): Promise<Product[]> {
  try {
    // This would fetch from an API in production
    // For now, return empty array or static data
    return [];
  } catch (error) {
    logError(error as Error, {
      component: 'fetchProducts',
      locale,
    });
    return [];
  }
}
