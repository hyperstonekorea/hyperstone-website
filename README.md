# HYPERSTONE Website

HYPERSTONE 회사의 공식 웹사이트입니다. DULITE 브랜드 제품을 소개하는 현대적이고 전문적인 웹사이트입니다.

## 기술 스택

- **Next.js 14** - React 기반 풀스택 프레임워크 (App Router)
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Framer Motion** - 애니메이션 라이브러리

## 브랜드 색상

- Primary: `#0082FB`
- Secondary: `#0064E0`
- Light: `#F1F5F8`
- Dark: `#1C2B33`

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트
│   ├── sections/       # 페이지 섹션 컴포넌트
│   ├── admin/          # 관리자 전용 컴포넌트
│   └── layout/         # 레이아웃 컴포넌트
├── lib/                # 유틸리티 함수
├── types/              # TypeScript 타입 정의
└── data/               # 정적 데이터
```

## 개발 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 제품 라인업

1. **Dulite Ready Mix Concrete** - 고품질 레미콘
2. **Dulite Precast Concrete** - 프리캐스트 콘크리트
3. **Dulite Grouting Agent** - 지반보강 그라우트액
4. **Dulite Waterproof Agent** - 차수액

## 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```
