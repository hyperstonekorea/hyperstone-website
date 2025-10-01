import { Product } from '@/types';

export const products: Product[] = [
  {
    id: "1",
    slug: "readymixconcrete",
    name: {
      ko: "Dulite Ready Mix Concrete",
      en: "Dulite Ready Mix Concrete"
    },
    shortDescription: {
      ko: "고품질 레미콘으로 건설 현장의 효율성을 극대화합니다.",
      en: "High-quality ready-mix concrete that maximizes construction site efficiency."
    },
    fullDescription: {
      ko: "Dulite Ready Mix Concrete는 최신 기술과 엄격한 품질 관리를 통해 제조된 고품질 레미콘입니다. 다양한 건설 현장의 요구사항에 맞춰 최적화된 배합으로 제공되며, 우수한 작업성과 내구성을 보장합니다. 현장 타설 시간을 단축하고 품질의 일관성을 유지하여 건설 프로젝트의 효율성을 극대화합니다.",
      en: "Dulite Ready Mix Concrete is high-quality ready-mix concrete manufactured with the latest technology and strict quality control. Optimized mix designs are provided to meet various construction site requirements, ensuring excellent workability and durability. It maximizes construction project efficiency by reducing on-site placement time and maintaining quality consistency."
    },
    specifications: {
      ko: [
        { label: "압축강도", value: "25-40", unit: "MPa" },
        { label: "슬럼프", value: "120-180", unit: "mm" },
        { label: "공기량", value: "4-6", unit: "%" },
        { label: "염화물 함량", value: "≤0.3", unit: "kg/m³" },
        { label: "최대 골재 크기", value: "25", unit: "mm" }
      ],
      en: [
        { label: "Compressive Strength", value: "25-40", unit: "MPa" },
        { label: "Slump", value: "120-180", unit: "mm" },
        { label: "Air Content", value: "4-6", unit: "%" },
        { label: "Chloride Content", value: "≤0.3", unit: "kg/m³" },
        { label: "Maximum Aggregate Size", value: "25", unit: "mm" }
      ]
    },
    applications: {
      ko: [
        "일반 건축물 구조체",
        "토목 공사 (교량, 터널)",
        "도로 및 공항 포장",
        "산업 시설 바닥",
        "주차장 및 보도",
        "수리 및 보강 공사"
      ],
      en: [
        "General Building Structures",
        "Civil Engineering (Bridges, Tunnels)",
        "Road and Airport Paving",
        "Industrial Facility Floors",
        "Parking Lots and Sidewalks",
        "Repair and Reinforcement Works"
      ]
    },
    images: {
      thumbnail: "/images/products/readymix-thumb.jpg",
      gallery: [
        "/images/products/readymix-1.jpg",
        "/images/products/readymix-2.jpg",
        "/images/products/readymix-3.jpg",
        "/images/products/readymix-4.jpg"
      ]
    },
    features: {
      ko: [
        "고강도 및 고내구성",
        "우수한 작업성 및 펌프압송성",
        "품질의 일관성 보장",
        "현장 맞춤형 배합 설계",
        "신속한 공급 시스템",
        "환경 친화적 재료 사용"
      ],
      en: [
        "High Strength and Durability",
        "Excellent Workability and Pumpability",
        "Consistent Quality Assurance",
        "Site-Specific Mix Design",
        "Rapid Supply System",
        "Environmentally Friendly Materials"
      ]
    }
  },
  {
    id: "2",
    slug: "precastconcrete",
    name: {
      ko: "Dulite Precast Concrete",
      en: "Dulite Precast Concrete"
    },
    shortDescription: {
      ko: "정밀하게 제작된 프리캐스트 콘크리트 제품입니다.",
      en: "Precisely manufactured precast concrete products."
    },
    fullDescription: {
      ko: "Dulite Precast Concrete는 첨단 공장 설비와 엄격한 품질 관리 시스템을 통해 정밀하게 제작된 고품질 프리캐스트 콘크리트 제품입니다. 표준화된 생산 공정을 통해 일정한 품질을 보장하며, 현장 시공 기간을 대폭 단축할 수 있습니다. 다양한 건축 및 토목 구조물에 적용 가능한 맞춤형 설계를 제공합니다.",
      en: "Dulite Precast Concrete is high-quality precast concrete products precisely manufactured through advanced factory facilities and strict quality control systems. Consistent quality is guaranteed through standardized production processes, and on-site construction time can be significantly reduced. Customized designs applicable to various architectural and civil structures are provided."
    },
    specifications: {
      ko: [
        { label: "압축강도", value: "30-50", unit: "MPa" },
        { label: "치수정밀도", value: "±5", unit: "mm" },
        { label: "표면 마감도", value: "Ra 6.3", unit: "μm" },
        { label: "흡수율", value: "≤5", unit: "%" },
        { label: "동결융해 저항성", value: "300", unit: "사이클" }
      ],
      en: [
        { label: "Compressive Strength", value: "30-50", unit: "MPa" },
        { label: "Dimensional Accuracy", value: "±5", unit: "mm" },
        { label: "Surface Finish", value: "Ra 6.3", unit: "μm" },
        { label: "Water Absorption", value: "≤5", unit: "%" },
        { label: "Freeze-Thaw Resistance", value: "300", unit: "cycles" }
      ]
    },
    applications: {
      ko: [
        "건축용 벽체 패널",
        "교량 거더 및 슬래브",
        "터널 세그먼트 라이닝",
        "계단 및 발코니 부재",
        "옹벽 및 방음벽",
        "하수처리장 구조물"
      ],
      en: [
        "Architectural Wall Panels",
        "Bridge Girders and Slabs",
        "Tunnel Segment Lining",
        "Stair and Balcony Components",
        "Retaining Walls and Sound Barriers",
        "Sewage Treatment Plant Structures"
      ]
    },
    images: {
      thumbnail: "/images/products/precast-thumb.jpg",
      gallery: [
        "/images/products/precast-1.jpg",
        "/images/products/precast-2.jpg",
        "/images/products/precast-3.jpg",
        "/images/products/precast-4.jpg"
      ]
    },
    features: {
      ko: [
        "공장 내 정밀 제작",
        "일정한 품질 보장",
        "신속한 현장 시공",
        "맞춤형 설계 가능",
        "우수한 표면 마감",
        "환경 조건 독립적 생산"
      ],
      en: [
        "Precise Factory Manufacturing",
        "Consistent Quality Assurance",
        "Rapid On-site Construction",
        "Customizable Design",
        "Excellent Surface Finish",
        "Weather-Independent Production"
      ]
    }
  },
  {
    id: "3",
    slug: "groutingagent",
    name: {
      ko: "Dulite Grouting Agent",
      en: "Dulite Grouting Agent"
    },
    shortDescription: {
      ko: "지반 보강을 위한 전문 그라우트액입니다.",
      en: "Professional grouting agent for ground reinforcement."
    },
    fullDescription: {
      ko: "Dulite Grouting Agent는 지반 보강, 공극 충전, 누수 차단을 위한 고성능 전문 그라우트액입니다. 우수한 침투성과 조절 가능한 겔타임으로 다양한 지질 조건에 적용 가능하며, 환경 친화적인 성분으로 제조되어 안전합니다. 터널, 댐, 지하 구조물 등의 지반 보강 및 누수 방지에 탁월한 효과를 발휘합니다.",
      en: "Dulite Grouting Agent is a high-performance professional grouting solution for ground reinforcement, void filling, and water sealing. With excellent penetration properties and adjustable gel time, it is applicable to various geological conditions and is safe as it is manufactured with environmentally friendly components. It demonstrates excellent effectiveness in ground reinforcement and water sealing for tunnels, dams, and underground structures."
    },
    specifications: {
      ko: [
        { label: "점도", value: "50-100", unit: "cP" },
        { label: "겔타임", value: "30-60", unit: "분" },
        { label: "압축강도", value: "≥15", unit: "MPa" },
        { label: "침투성", value: "≥1×10⁻⁶", unit: "cm/s" },
        { label: "pH", value: "7-9", unit: "" }
      ],
      en: [
        { label: "Viscosity", value: "50-100", unit: "cP" },
        { label: "Gel Time", value: "30-60", unit: "min" },
        { label: "Compressive Strength", value: "≥15", unit: "MPa" },
        { label: "Permeability", value: "≥1×10⁻⁶", unit: "cm/s" },
        { label: "pH", value: "7-9", unit: "" }
      ]
    },
    applications: {
      ko: [
        "터널 굴착 시 지반 보강",
        "댐 및 제방 누수 보수",
        "지하철 및 지하 구조물",
        "연약 지반 개량",
        "기초 지반 안정화",
        "암반 절리 충전"
      ],
      en: [
        "Ground Reinforcement in Tunnel Excavation",
        "Dam and Embankment Leak Repair",
        "Subway and Underground Structures",
        "Soft Ground Improvement",
        "Foundation Ground Stabilization",
        "Rock Joint Filling"
      ]
    },
    images: {
      thumbnail: "/images/products/grouting-thumb.jpg",
      gallery: [
        "/images/products/grouting-1.jpg",
        "/images/products/grouting-2.jpg",
        "/images/products/grouting-3.jpg",
        "/images/products/grouting-4.jpg"
      ]
    },
    features: {
      ko: [
        "우수한 침투성 및 확산성",
        "조절 가능한 겔타임",
        "환경 친화적 무독성",
        "높은 압축강도 발현",
        "다양한 지질 조건 적용",
        "장기 내구성 보장"
      ],
      en: [
        "Excellent Penetration and Diffusion",
        "Adjustable Gel Time",
        "Environmentally Friendly Non-toxic",
        "High Compressive Strength Development",
        "Applicable to Various Geological Conditions",
        "Long-term Durability Assurance"
      ]
    }
  },
  {
    id: "4",
    slug: "waterproofagent",
    name: {
      ko: "Dulite Waterproof Agent",
      en: "Dulite Waterproof Agent"
    },
    shortDescription: {
      ko: "완벽한 차수 효과를 제공하는 방수재입니다.",
      en: "Waterproofing agent providing perfect water-blocking effect."
    },
    fullDescription: {
      ko: "Dulite Waterproof Agent는 첨단 폴리머 기술을 적용한 고성능 방수재로, 완벽한 차수 효과와 장기 내구성을 제공합니다. 지하 구조물, 터널, 수조 등 다양한 구조물의 방수 및 차수에 적용되며, 우수한 접착력과 신축성으로 구조물의 변형에도 안정적인 방수 성능을 유지합니다. 시공이 간편하고 환경 친화적인 제품입니다.",
      en: "Dulite Waterproof Agent is a high-performance waterproofing material applying advanced polymer technology, providing perfect water-blocking effect and long-term durability. Applied to waterproofing and sealing of various structures such as underground structures, tunnels, and tanks, it maintains stable waterproofing performance even with structural deformation through excellent adhesion and flexibility. It is an easy-to-apply and environmentally friendly product."
    },
    specifications: {
      ko: [
        { label: "투수계수", value: "<1×10⁻⁹", unit: "cm/s" },
        { label: "내구성", value: "50+", unit: "년" },
        { label: "인장강도", value: "≥2.0", unit: "MPa" },
        { label: "신장률", value: "≥300", unit: "%" },
        { label: "접착강도", value: "≥1.5", unit: "MPa" }
      ],
      en: [
        { label: "Permeability", value: "<1×10⁻⁹", unit: "cm/s" },
        { label: "Durability", value: "50+", unit: "years" },
        { label: "Tensile Strength", value: "≥2.0", unit: "MPa" },
        { label: "Elongation", value: "≥300", unit: "%" },
        { label: "Adhesion Strength", value: "≥1.5", unit: "MPa" }
      ]
    },
    applications: {
      ko: [
        "지하철 및 지하 구조물",
        "터널 라이닝 차수",
        "수처리 시설 방수",
        "지하 주차장 방수",
        "저수조 및 수조 방수",
        "교량 바닥판 방수"
      ],
      en: [
        "Subway and Underground Structures",
        "Tunnel Lining Waterproofing",
        "Water Treatment Facility Waterproofing",
        "Underground Parking Waterproofing",
        "Reservoir and Tank Waterproofing",
        "Bridge Deck Waterproofing"
      ]
    },
    images: {
      thumbnail: "/images/products/waterproof-thumb.jpg",
      gallery: [
        "/images/products/waterproof-1.jpg",
        "/images/products/waterproof-2.jpg",
        "/images/products/waterproof-3.jpg",
        "/images/products/waterproof-4.jpg"
      ]
    },
    features: {
      ko: [
        "완벽한 차수 및 방수 효과",
        "50년 이상 장기 내구성",
        "우수한 접착력 및 신축성",
        "간편한 시공 및 유지보수",
        "환경 친화적 무독성",
        "다양한 기후 조건 적응"
      ],
      en: [
        "Perfect Water-blocking and Waterproofing Effect",
        "Long-term Durability Over 50 Years",
        "Excellent Adhesion and Flexibility",
        "Easy Application and Maintenance",
        "Environmentally Friendly Non-toxic",
        "Adaptable to Various Climate Conditions"
      ]
    }
  }
];