'use client';

import { useEffect, useState } from 'react';
import { Locale } from '@/types';
import { useParams } from 'next/navigation';

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

export default function Home() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'ko';
  const [mounted, setMounted] = useState(false);
  const [sections, setSections] = useState<any>(null);

  useEffect(() => {
    // Dynamically import sections only on client side
    Promise.all([
      import('@/components/sections/HeroSection'),
      import('@/components/sections/AboutSection'),
      import('@/components/sections/ProductsSection'),
      import('@/components/sections/ContactSection'),
    ]).then(([hero, about, products, contact]) => {
      setSections({
        HeroSection: hero.HeroSection,
        AboutSection: about.AboutSection,
        ProductsSection: products.ProductsSection,
        ContactSection: contact.ContactSection,
      });
      setMounted(true);
    }).catch((error) => {
      console.error('Error loading sections:', error);
      setMounted(true);
    });
  }, []);

  if (!mounted || !sections) {
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

  const { HeroSection, AboutSection, ProductsSection, ContactSection } = sections;

  return (
    <main>
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <ProductsSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
  );
}