import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HYPERSTONE - 건설업계의 혁신적인 솔루션',
  description: 'DULITE 브랜드로 최고 품질의 콘크리트 제품을 제공하는 HYPERSTONE',
};

// This file is required for the app directory to work.
// The actual layout is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
