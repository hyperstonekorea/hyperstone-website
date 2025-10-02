'use client';

import { useEffect, useState } from 'react';
import { Locale } from '@/types';
import { useParams } from 'next/navigation';
import dynamicImport from 'next/dynamic';

// Lazy load sections to avoid SSR issues
const HeroSection = dynamicImport(() => import('@/components/sections/HeroSection').then(mod => ({ default: mod.HeroSection })));
const AboutSection = dynamicImport(() => import('@/components/sections/AboutSection').then(mod => ({ default: mod.AboutSection })));
const ProductsSection = dynamicImport(() => import('@/components/sections/ProductsSection').then(mod => ({ default: mod.ProductsSection })));
const ContactSection = dynamicImport(() => import('@/components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })));

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

export default function Home() {
  const params = useParams();
  const locale = params.locale as Locale;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">HYPERSTONE</h1>
          <p className="text-xl">Loading...</p>
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