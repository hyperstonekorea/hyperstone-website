// Product and Company Data for HYPERSTONE Website

// Products array with all 4 DULITE products
const products = [
  {
    id: "1",
    slug: "readymixconcrete",
    name: {
      ko: "DULITE Ready Mix Concrete",
      en: "DULITE Ready Mix Concrete"
    },
    shortDescription: {
      ko: "고품질 레미콘으로 건설 현장의 효율성을 극대화합니다.",
      en: "High-quality ready-mix concrete that maximizes construction site efficiency."
    },
    fullDescription: {
      ko: "DULITE Ready Mix Concrete는 최신 기술과 엄격한 품질 관리를 통해 생산되는 고품질 레미콘입니다. 건설 현장의 다양한 요구사항을 충족시키며, 일관된 품질과 우수한 작업성을 제공합니다.",
      en: "DULITE Ready Mix Concrete is high-quality ready-mix concrete produced through cutting-edge technology and rigorous quality control. It meets various construction site requirements and provides consistent quality and excellent workability."
    },
    specifications: {
      ko: [
        { label: "압축강도", value: "25-40", unit: "MPa" },
        { label: "슬럼프", value: "80-180", unit: "mm" },
        { label: "공기량", value: "4.5±1.5", unit: "%" },
        { label: "염화물 함량", value: "0.3 이하", unit: "kg/m³" }
      ],
      en: [
        { label: "Compressive Strength", value: "25-40", unit: "MPa" },
        { label: "Slump", value: "80-180", unit: "mm" },
        { label: "Air Content", value: "4.5±1.5", unit: "%" },
        { label: "Chloride Content", value: "≤0.3", unit: "kg/m³" }
      ]
    },
    applications: {
      ko: [
        "일반 건축물 구조체",
        "아파트 및 주거용 건물",
        "상업용 건물 기초 및 구조체",
        "토목 구조물"
      ],
      en: [
        "General Building Structures",
        "Apartments and Residential Buildings",
        "Commercial Building Foundations and Structures",
        "Civil Engineering Structures"
      ]
    },
    images: {
      thumbnail: "img/ready_mix_thumb.png",
      main: "img/ready_mix_concrete.png",
      gallery: [
        "img/ready_mix_concrete.png",
        "img/ready_mix_concrete_detail.png",
        "img/ready_mix_thumb.png"
      ]
    },
    features: {
      ko: [
        "고강도 및 고내구성",
        "우수한 작업성",
        "일관된 품질 관리",
        "환경 친화적 배합",
        "신속한 배송 시스템"
      ],
      en: [
        "High Strength and Durability",
        "Excellent Workability",
        "Consistent Quality Control",
        "Environmentally Friendly Mix",
        "Fast Delivery System"
      ]
    }
  },
  {
    id: "2",
    slug: "precastconcrete",
    name: {
      ko: "DULITE Precast Concrete",
      en: "DULITE Precast Concrete"
    },
    shortDescription: {
      ko: "공장에서 제작된 고품질 프리캐스트 콘크리트 제품입니다.",
      en: "High-quality precast concrete products manufactured in factory."
    },
    fullDescription: {
      ko: "DULITE Precast Concrete는 공장에서 정밀하게 제작되어 현장 시공 시간을 단축하고 품질을 향상시킵니다. 다양한 형태와 크기로 제작 가능하며, 건축 및 토목 프로젝트에 최적화되어 있습니다.",
      en: "DULITE Precast Concrete is precisely manufactured in factory to reduce on-site construction time and improve quality. Available in various shapes and sizes, optimized for building and civil engineering projects."
    },
    specifications: {
      ko: [
        { label: "압축강도", value: "40-60", unit: "MPa" },
        { label: "흡수율", value: "5 이하", unit: "%" },
        { label: "동결융해 저항성", value: "300회 이상", unit: "사이클" },
        { label: "치수 정밀도", value: "±3", unit: "mm" }
      ],
      en: [
        { label: "Compressive Strength", value: "40-60", unit: "MPa" },
        { label: "Water Absorption", value: "≤5", unit: "%" },
        { label: "Freeze-Thaw Resistance", value: "≥300", unit: "cycles" },
        { label: "Dimensional Accuracy", value: "±3", unit: "mm" }
      ]
    },
    applications: {
      ko: [
        "건축물 외벽 패널",
        "계단 및 슬래브",
        "옹벽 및 방음벽",
        "교량 거더 및 교각"
      ],
      en: [
        "Building Facade Panels",
        "Stairs and Slabs",
        "Retaining Walls and Sound Barriers",
        "Bridge Girders and Piers"
      ]
    },
    images: {
      thumbnail: "img/precast_concrete_thumb.png",
      main: "img/precast_concrete.png",
      gallery: [
        "img/precast_concrete.png",
        "img/precast_concrete_detail.png",
        "img/precast_concrete_thumb.png"
      ]
    },
    features: {
      ko: [
        "공장 생산으로 일정한 품질",
        "현장 시공 기간 단축",
        "정밀한 치수 관리",
        "다양한 디자인 구현 가능",
        "날씨에 영향 받지 않는 생산"
      ],
      en: [
        "Consistent Quality through Factory Production",
        "Reduced On-site Construction Time",
        "Precise Dimensional Control",
        "Various Design Options",
        "Weather-Independent Production"
      ]
    }
  },
  {
    id: "3",
    slug: "groutingagent",
    name: {
      ko: "DULITE Grouting Agent",
      en: "DULITE Grouting Agent"
    },
    shortDescription: {
      ko: "고성능 그라우팅 재료로 구조물의 안정성을 확보합니다.",
      en: "High-performance grouting material that ensures structural stability."
    },
    fullDescription: {
      ko: "DULITE Grouting Agent는 우수한 유동성과 충전성을 가진 고성능 그라우팅 재료입니다. 구조물의 공극을 완벽하게 충전하여 안정성을 높이고, 다양한 시공 조건에서 최적의 성능을 발휘합니다.",
      en: "DULITE Grouting Agent is a high-performance grouting material with excellent fluidity and filling properties. It perfectly fills structural voids to enhance stability and delivers optimal performance under various construction conditions."
    },
    specifications: {
      ko: [
        { label: "압축강도", value: "50-80", unit: "MPa" },
        { label: "유동성", value: "200-250", unit: "mm" },
        { label: "팽창률", value: "0.1-0.5", unit: "%" },
        { label: "블리딩", value: "0", unit: "%" }
      ],
      en: [
        { label: "Compressive Strength", value: "50-80", unit: "MPa" },
        { label: "Fluidity", value: "200-250", unit: "mm" },
        { label: "Expansion Rate", value: "0.1-0.5", unit: "%" },
        { label: "Bleeding", value: "0", unit: "%" }
      ]
    },
    applications: {
      ko: [
        "기계 기초 그라우팅",
        "앵커볼트 고정",
        "교량 받침 그라우팅",
        "균열 보수 및 보강"
      ],
      en: [
        "Machine Foundation Grouting",
        "Anchor Bolt Fixing",
        "Bridge Bearing Grouting",
        "Crack Repair and Reinforcement"
      ]
    },
    images: {
      thumbnail: "img/groundreinforcingagentthumb.png",
      main: "img/DULITE_GROUTING.png",
      gallery: [
        "img/DULITE_GROUTING.png",
        "img/ground_reinforcement_detail.png",
        "img/groundreinforcingagentthumb.png"
      ]
    },
    features: {
      ko: [
        "무수축 특성",
        "우수한 유동성",
        "조기 강도 발현",
        "블리딩 제로",
        "다양한 온도 조건 대응"
      ],
      en: [
        "Non-shrink Properties",
        "Excellent Fluidity",
        "Early Strength Development",
        "Zero Bleeding",
        "Adaptable to Various Temperature Conditions"
      ]
    }
  },
  {
    id: "4",
    slug: "waterproofingagent",
    name: {
      ko: "DULITE Waterproofing Grouting Agent",
      en: "DULITE Waterproofing Grouting Agent"
    },
    shortDescription: {
      ko: "지하수 차단 및 유해 폐기물 누출 방지를 위한 지중 방수 그라우팅제입니다.",
      en: "Underground waterproofing grouting agent for groundwater blocking and toxic waste leakage prevention."
    },
    fullDescription: {
      ko: "DULITE Waterproofing Grouting Agent는 지하 구조물의 지중 방수를 위해 특별히 개발된 고성능 그라우팅 재료입니다. 지하수 침투를 완벽하게 차단하고 유해 폐기물 및 오염물질의 누출을 방지하여 환경을 보호합니다. 우수한 침투성과 충전성으로 지반의 미세한 균열과 공극까지 완벽하게 밀봉하며, 장기적인 방수 효과를 제공합니다.",
      en: "DULITE Waterproofing Grouting Agent is a high-performance grouting material specially developed for underground waterproofing of subsurface structures. It completely blocks groundwater infiltration and prevents leakage of toxic waste and contaminants to protect the environment. With excellent penetration and filling properties, it perfectly seals even microscopic cracks and voids in the ground, providing long-term waterproofing effects."
    },
    specifications: {
      ko: [
        { label: "투수계수", value: "1×10⁻¹³", unit: "cm/s" },
        { label: "침투깊이", value: "50-100", unit: "cm" },
        { label: "겔타임", value: "30-180", unit: "초" },
        { label: "내화학성", value: "pH 2-12", unit: "" }
      ],
      en: [
        { label: "Permeability Coefficient", value: "1×10⁻¹³", unit: "cm/s" },
        { label: "Penetration Depth", value: "50-100", unit: "cm" },
        { label: "Gel Time", value: "30-180", unit: "sec" },
        { label: "Chemical Resistance", value: "pH 2-12", unit: "" }
      ]
    },
    applications: {
      ko: [
        "지하 저장 탱크 방수",
        "지하수 차단 및 지중 방수",
        "유해 폐기물 저장소 누출 방지",
        "지하 터널 및 지하철 방수",
        "매립지 차수벽 시공",
        "오염토양 격리 및 봉쇄"
      ],
      en: [
        "Underground Storage Tank Waterproofing",
        "Groundwater Blocking and Underground Waterproofing",
        "Toxic Waste Storage Leakage Prevention",
        "Underground Tunnel and Subway Waterproofing",
        "Landfill Cutoff Wall Construction",
        "Contaminated Soil Isolation and Containment"
      ]
    },
    images: {
      thumbnail: "img/waterproofing_agent_thumb.png",
      main: "img/DULITE_WATERPROOFING.png",
      gallery: [
        "img/DULITE_WATERPROOFING.png",
        "img/waterproofing_detail.png",
        "img/waterproofing_agent_thumb.png"
      ]
    },
    features: {
      ko: [
        "지하수 완벽 차단",
        "유해물질 누출 방지",
        "우수한 침투 및 충전성",
        "조절 가능한 경화 시간",
        "높은 내화학성",
        "환경 친화적 재료",
        "장기 내구성 보장"
      ],
      en: [
        "Complete Groundwater Blocking",
        "Toxic Substance Leakage Prevention",
        "Excellent Penetration and Filling",
        "Adjustable Curing Time",
        "High Chemical Resistance",
        "Environmentally Friendly Material",
        "Long-term Durability Guarantee"
      ]
    }
  }
];

// Company information
const companyInfo = {
  name: {
    ko: "하이퍼스톤",
    en: "HYPERSTONE"
  },
  description: {
    ko: "건설업계의 혁신을 선도하는 콘크리트 전문 기업",
    en: "Leading concrete specialist driving innovation in the construction industry"
  },
  contact: {
    phone: "010-8900-5863",
    email: "hyperstone@hyperstone.co.kr",
    address: {
      ko: "경기도 평택시 고덕여염로 118, 610호",
      en: "118 Godeok-yeoyeom-ro, Pyeongtaek-si, Gyeonggi-do, 610ho"
    }
  },
  businessInfo: {
    registrationNumber: "336-87-03585",
    established: "2025.09.30",
    ceo: {
      ko: "심철훈",
      en: "SHIM CHUL HUN"
    }
  },
  stats: {
    yearsOfExperience: "30+",
    compressiveStrength: "110MPa+",
    costReduction: "20%+"
  }
};

// Helper functions

/**
 * Get all products
 * @returns {Array} Array of all products
 */
function getProducts() {
  return products;
}

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Object|undefined} Product object or undefined if not found
 */
function getProductById(id) {
  return products.find(p => p.id === id);
}

/**
 * Get product by slug
 * @param {string} slug - Product slug
 * @returns {Object|undefined} Product object or undefined if not found
 */
function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}

/**
 * Get company information
 * @returns {Object} Company information object
 */
function getCompanyInfo() {
  return companyInfo;
}
