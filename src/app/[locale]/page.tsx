import { Locale } from '@/types';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ContactSection } from '@/components/sections/ContactSection';

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [
    { locale: 'ko' },
    { locale: 'en' }
  ];
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main>
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <ProductsSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
  );
}