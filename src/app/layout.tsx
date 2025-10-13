import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { validateAppEnv } from '@/lib/env-validator';
import { Loading } from '@/components/ui/Loading';
import './globals.css';

export const metadata: Metadata = {
  title: 'HYPERSTONE - 건설업계의 혁신적인 솔루션',
  description: 'DULITE 브랜드로 최고 품질의 콘크리트 제품을 제공하는 HYPERSTONE',
};

// Validate environment variables at build time
if (typeof window === 'undefined') {
  validateAppEnv();
}

// This file is required for the app directory to work.
// The actual layout is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading variant="page" />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
