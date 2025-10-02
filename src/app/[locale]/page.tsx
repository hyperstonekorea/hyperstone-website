'use client';

import { Locale } from '@/types';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useParams } from 'next/navigation';

export default function Home() {
  const params = useParams();
  const locale = params.locale as Locale;

  return (
    <main>
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <ProductsSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
  );
}