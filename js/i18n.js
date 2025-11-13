/**
 * i18n.js - Internationalization Module
 * Handles language switching between Korean and English
 */

// Translation data structure
const translations = {
  ko: {
    navigation: {
      home: "홈",
      about: "회사소개",
      products: "제품",
      contact: "연락처"
    },
    hero: {
      title: "HYPERSTONE",
      subtitle: "건설업계의 혁신적인 솔루션",
      description: "DULITE 브랜드로 최고 품질의 콘크리트 제품을 제공합니다",
      scrollDown: "아래로 스크롤"
    },
    about: {
      title: "회사소개",
      subtitle: "건설업계의 혁신을 선도하는 콘크리트 전문 기업",
      vision: "비전",
      visionText: "최고 품질의 콘크리트 솔루션으로 건설 산업의 미래를 선도합니다",
      mission: "미션",
      missionText: "혁신적인 기술과 철저한 품질 관리로 고객의 성공을 지원합니다",
      coreValues: "핵심 가치",
      expertise: "전문성",
      expertiseText: "30년 이상의 경험과 전문 지식",
      innovation: "혁신",
      innovationText: "지속적인 연구개발과 기술 혁신",
      quality: "품질",
      qualityText: "철저한 품질 관리와 검증",
      excellence: "우수성",
      excellenceText: "업계 최고 수준의 제품과 서비스",
      stats: "경쟁력",
      yearsExperience: "년 이상 경험",
      compressiveStrength: "압축강도 UHSC",
      costReduction: "원가절감"
    },
    products: {
      title: "제품",
      subtitle: "DULITE 브랜드의 프리미엄 콘크리트 솔루션",
      learnMore: "자세히 보기",
      loading: "제품을 불러오는 중...",
      readymix: "DULITE 레미콘",
      precast: "DULITE PC",
      grouting: "DULITE 그라우팅제",
      waterproofing: "DULITE 차수제"
    },
    product: {
      backToProducts: "제품 목록으로",
      keyFeatures: "주요 특징",
      specifications: "제품 사양",
      applications: "적용 분야",
      gallery: "제품 갤러리"
    },
    contact: {
      title: "연락처",
      subtitle: "언제든지 문의해 주세요",
      phone: "전화",
      email: "이메일",
      address: "주소",
      addressText: "경기도 평택시 고덕여염로 118, 610호(고덕동) SBC비지니스센터 6층",
      businessHours: "영업시간",
      businessHoursText: "평일 09:00 - 18:00"
    },
    footer: {
      businessNumber: "사업자등록번호",
      ceo: "대표이사",
      ceoName: "심철훈",
      copyright: "© 2025 HYPERSTONE. All rights reserved.",
      description: "건설업계의 혁신을 선도하는 콘크리트 전문 기업"
    }
  },
  en: {
    navigation: {
      home: "Home",
      about: "About",
      products: "Products",
      contact: "Contact"
    },
    hero: {
      title: "HYPERSTONE",
      subtitle: "Innovative Solutions for the Construction Industry",
      description: "Providing premium quality concrete products under the DULITE brand",
      scrollDown: "Scroll Down"
    },
    about: {
      title: "About Us",
      subtitle: "Leading concrete specialist driving innovation in the construction industry",
      vision: "Vision",
      visionText: "Leading the future of the construction industry with the highest quality concrete solutions",
      mission: "Mission",
      missionText: "Supporting customer success through innovative technology and thorough quality control",
      coreValues: "Core Values",
      expertise: "Expertise",
      expertiseText: "Over 30 years of experience and professional knowledge",
      innovation: "Innovation",
      innovationText: "Continuous R&D and technological innovation",
      quality: "Quality",
      qualityText: "Thorough quality control and verification",
      excellence: "Excellence",
      excellenceText: "Industry-leading products and services",
      stats: "Competitive Advantages",
      yearsExperience: "Years of Experience",
      compressiveStrength: "Compressive Strength UHSC",
      costReduction: "Cost Reduction"
    },
    products: {
      title: "Products",
      subtitle: "Premium Concrete Solutions from the DULITE Brand",
      learnMore: "Learn More",
      loading: "Loading products...",
      readymix: "DULITE Ready Mix",
      precast: "DULITE PC",
      grouting: "DULITE Grouting Agent",
      waterproofing: "DULITE Waterproofing Agent"
    },
    product: {
      backToProducts: "Back to Products",
      keyFeatures: "Key Features",
      specifications: "Specifications",
      applications: "Applications",
      gallery: "Product Gallery"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Feel free to reach out anytime",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressText: "SBC Business Center 6F, 118 Godeok-yeoyeom-ro, Pyeongtaek-si, Gyeonggi-do, South Korea",
      businessHours: "Business Hours",
      businessHoursText: "Weekdays 09:00 - 18:00"
    },
    footer: {
      businessNumber: "Business Registration",
      ceo: "CEO",
      ceoName: "SHIM CHUL HUN",
      copyright: "© 2025 HYPERSTONE. All rights reserved.",
      description: "Leading concrete specialist driving innovation in the construction industry"
    }
  }
};

// Current language state (default: Korean)
let currentLanguage = 'ko';

/**
 * Get the current language
 * @returns {string} Current language code ('ko' or 'en')
 */
function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Set the language and update all translations
 * @param {string} lang - Language code ('ko' or 'en')
 */
function setLanguage(lang) {
  if (lang !== 'ko' && lang !== 'en') {
    console.warn(`Invalid language: ${lang}. Defaulting to 'ko'`);
    lang = 'ko';
  }
  
  currentLanguage = lang;
  
  // Persist language preference in localStorage
  try {
    localStorage.setItem('language', lang);
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
  
  // Update all translations in the DOM
  updateAllTranslations();
}

/**
 * Get translation for a specific key
 * @param {string} key - Translation key in dot notation (e.g., 'hero.subtitle')
 * @returns {string} Translated text or the key itself if not found
 */
function t(key) {
  try {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value === undefined || value === null) {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
      value = value[k];
    }
    
    return value !== undefined ? value : key;
  } catch (error) {
    console.error(`Translation error for key "${key}":`, error);
    return key;
  }
}

/**
 * Update all elements with data-i18n attribute
 * Finds all elements with data-i18n and updates their text content
 */
function updateAllTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      const translatedText = t(key);
      element.textContent = translatedText;
    }
  });
  
  // Dispatch custom event to notify other modules of language change
  const event = new CustomEvent('languageChanged', { 
    detail: { language: currentLanguage } 
  });
  document.dispatchEvent(event);
}

/**
 * Load language preference from localStorage
 * Called on page load to restore user's language preference
 */
function loadLanguagePreference() {
  try {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      currentLanguage = savedLanguage;
    } else {
      // Default to Korean if no preference is saved
      currentLanguage = 'ko';
    }
  } catch (error) {
    console.error('Failed to load language preference:', error);
    currentLanguage = 'ko';
  }
}

/**
 * Toggle between Korean and English
 * Convenience function for language switcher button
 */
function toggleLanguage() {
  const newLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
  setLanguage(newLanguage);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCurrentLanguage,
    setLanguage,
    t,
    updateAllTranslations,
    loadLanguagePreference,
    toggleLanguage
  };
}
