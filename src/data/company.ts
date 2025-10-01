import { CompanyInfo } from '@/types';

export const companyInfo: CompanyInfo = {
  name: {
    ko: "하이퍼스톤",
    en: "HYPERSTONE"
  },
  description: {
    ko: "건설업계의 혁신을 선도하는 콘크리트 전문 기업",
    en: "Leading concrete specialist driving innovation in the construction industry"
  },
  contact: {
    phone: "+82-2-1234-5678",
    email: "info@hyperstone.co.kr",
    address: {
      ko: "서울특별시 강남구 테헤란로 123",
      en: "123 Teheran-ro, Gangnam-gu, Seoul, South Korea"
    },
    coordinates: {
      lat: 37.5665,
      lng: 126.9780
    }
  },
  businessInfo: {
    registrationNumber: "123-45-67890",
    ceo: {
      ko: "김대표",
      en: "CEO Kim"
    }
  }
};