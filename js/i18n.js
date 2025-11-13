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
    brand: {
      title: '<span class="brand-text">DULITE</span> 브랜드 소개',
      subtitle: "초고강도 콘크리트 기술의 새로운 기준",
      techTitle: "기술 개요",
      tech1: "두 개의 고형화제를 사용하여 콘크리트 강도를 획기적으로 향상",
      tech2: "원자력 폐기물 고형화 보관 목적으로 개발된 검증된 기술",
      tech3: "재료의 단순 결합이 아닌 융합으로 결합력을 극대화",
      featuresTitle: "특장점",
      feature1Title: "초고강도",
      feature1: "몰탈 상태에서도 콘크리트 대비 압축강도 2~5배",
      feature2Title: "내화성능",
      feature2: "고온환경에서 구조적 강도 유지 (1,350°C 2시간)",
      feature3Title: "지속가능성",
      feature3: "부식 및 균열 거의 없어 지속가능한 건축 기술",
      priceTitle: "가격경쟁력",
      priceDesc: "초고강도 기술은 많으나 시중 40~80MPa 고강도 콘크리트보다 부담없는 가격의 초고강도 기술은 DULITE가 유일함"
    },
    sustainability: {
      title: "지속가능한 미래를 위한 UHSC",
      subtitle: "왜 초고강도 콘크리트가 필요한가",
      intro: "전 세계 건설 산업은 탄소 중립을 향한 전환점에 서 있습니다",
      gccaTitle: "GCCA 넷제로 로드맵 2050",
      gccaDesc: "Global Cement and Concrete Association은 2050년까지 탄소 중립 달성을 목표로 하고 있습니다",
      kciTitle: "KCI 비전 2050",
      kciDesc: "한국콘크리트학회는 고강도 콘크리트와 GFRP 철근 등 혁신 재료 사용 확대를 권장합니다",
      benefitsTitle: "UHSC의 이점",
      benefit1Title: "재료 절감",
      benefit1: "높은 강도로 더 적은 재료 사용",
      benefit2Title: "탄소 감축",
      benefit2: "시멘트 사용량 감소로 CO₂ 배출 저감",
      benefit3Title: "내구성 향상",
      benefit3: "장수명 구조물로 유지보수 비용 절감",
      benefit4Title: "설계 자유도",
      benefit4: "슬림한 구조 설계로 공간 효율성 증대"
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
    brand: {
      title: 'Introducing <span class="brand-text">DULITE</span> Brand',
      subtitle: "Setting New Standards in Ultra-High Strength Concrete Technology",
      techTitle: "Technology Overview",
      tech1: "Dramatically enhances concrete strength using two solidifying agents",
      tech2: "Proven technology developed for nuclear waste solidification storage",
      tech3: "Maximizes bonding strength through material fusion, not simple combination",
      featuresTitle: "Key Features",
      feature1Title: "Ultra-High Strength",
      feature1: "2-5x compressive strength compared to concrete, even in mortar state",
      feature2Title: "Fire Resistance",
      feature2: "Maintains structural strength in high-temperature environments (1,350°C for 2 hours)",
      feature3Title: "Sustainability",
      feature3: "Minimal corrosion and cracking for sustainable construction technology",
      priceTitle: "Price Competitiveness",
      priceDesc: "While many ultra-high strength technologies exist, DULITE is the only one offering affordable pricing compared to standard 40-80MPa high-strength concrete"
    },
    sustainability: {
      title: "UHSC for a Sustainable Future",
      subtitle: "Why Ultra-High Strength Concrete Matters",
      intro: "The global construction industry stands at a turning point toward carbon neutrality",
      gccaTitle: "GCCA Net Zero Roadmap 2050",
      gccaDesc: "The Global Cement and Concrete Association aims to achieve carbon neutrality by 2050",
      kciTitle: "KCI Vision 2050",
      kciDesc: "Korea Concrete Institute recommends expanding the use of innovative materials such as high-strength concrete and GFRP rebar",
      benefitsTitle: "Benefits of UHSC",
      benefit1Title: "Material Reduction",
      benefit1: "Use less material with higher strength",
      benefit2Title: "Carbon Reduction",
      benefit2: "Reduce CO₂ emissions through decreased cement usage",
      benefit3Title: "Enhanced Durability",
      benefit3: "Reduce maintenance costs with long-lasting structures",
      benefit4Title: "Design Freedom",
      benefit4: "Increase space efficiency with slimmer structural design"
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
      
      // Check if element has data-i18n-html attribute for HTML content
      const useHtml = element.hasAttribute('data-i18n-html');
      
      if (useHtml) {
        element.innerHTML = translatedText;
      } else {
        element.textContent = translatedText;
      }
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
