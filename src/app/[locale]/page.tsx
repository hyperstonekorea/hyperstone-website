'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import { Locale } from '@/types';

// Lazy load sections to avoid SSR issues with Framer Motion
const HeroSection = dynamicImport(() => import('@/components/sections/HeroSection').then(mod => ({ default: mod.HeroSection })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="text-center text-white">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
      </div>
    </div>
  )
});

const AboutSection = dynamicImport(() => import('@/components/sections/AboutSection').then(mod => ({ default: mod.AboutSection })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-100" />
});

const ProductsSection = dynamicImport(() => import('@/components/sections/ProductsSection').then(mod => ({ default: mod.ProductsSection })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-white" />
});

const ContactSection = dynamicImport(() => import('@/components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900" />
});

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
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <ProductsSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
  );
}
