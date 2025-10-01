'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface FooterProps {
  locale: 'ko' | 'en';
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations();

  // Company information - this would typically come from a config file or CMS
  const companyInfo = {
    businessNumber: '123-45-67890', // This should be replaced with actual business registration number
    ceo: locale === 'ko' ? '김대표' : 'Kim Daepyo', // This should be replaced with actual CEO name
    address: {
      ko: '서울특별시 강남구 테헤란로 123, 하이퍼스톤빌딩 10층',
      en: '10F, Hyperstone Building, 123 Teheran-ro, Gangnam-gu, Seoul, South Korea'
    },
    phone: '+82-2-1234-5678',
    email: 'info@hyperstone.co.kr'
  };

  return (
    <footer className="bg-[#1C2B33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-[#0082FB] mb-4">
              {t('footer.company')}
            </div>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                <span className="font-medium">{t('footer.businessNumber')}: </span>
                <span>{companyInfo.businessNumber}</span>
              </div>
              
              <div>
                <span className="font-medium">{t('footer.ceo')}: </span>
                <span>{companyInfo.ceo}</span>
              </div>
              
              <div>
                <span className="font-medium">
                  {locale === 'ko' ? '주소' : 'Address'}: 
                </span>
                <span className="block mt-1">
                  {companyInfo.address[locale]}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              {t('contact.title')}
            </h3>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#0082FB]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{companyInfo.phone}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#0082FB]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-[#0082FB] transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              {locale === 'ko' ? '법적 고지' : 'Legal'}
            </h3>
            
            <div className="space-y-2">
              <Link
                href={`/${locale}/privacy-policy`}
                className="block text-sm text-gray-300 hover:text-[#0082FB] transition-colors"
              >
                {t('footer.privacy')}
              </Link>
              
              <Link
                href={`/${locale}/terms-of-service`}
                className="block text-sm text-gray-300 hover:text-[#0082FB] transition-colors"
              >
                {locale === 'ko' ? '이용약관' : 'Terms of Service'}
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              {t('footer.copyright')}
            </div>

            {/* DULITE Brand Notice */}
            <div className="text-sm text-gray-400 text-center md:text-right">
              <div>DULITE {locale === 'ko' ? '브랜드 제품' : 'Brand Products'}</div>
              <div className="text-xs mt-1">
                {locale === 'ko' 
                  ? '모든 제품명은 HYPERSTONE의 상표입니다.' 
                  : 'All product names are trademarks of HYPERSTONE.'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}