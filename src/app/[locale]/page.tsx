'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Locale } from '@/types';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { SectionErrorBoundary } from '@/components/SectionErrorBoundary';

export default function Home() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'ko';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-blue-600">HYPERSTONE</h1>
          <p className="text-xl text-gray-600">
            {locale === 'ko' ? '로딩 중...' : 'Loading...'}
          </p>
          <div className="mt-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <SectionErrorBoundary sectionName="Hero">
        <HeroSection locale={locale} />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="About">
        <AboutSection locale={locale} />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Products">
        <ProductsSection locale={locale} />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Contact">
        <ContactSection locale={locale} />
      </SectionErrorBoundary>
    </main>
  );
}
