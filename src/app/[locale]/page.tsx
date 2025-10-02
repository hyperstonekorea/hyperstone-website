'use client';

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Locale } from '@/types';
import { SectionErrorBoundary } from '@/components/SectionErrorBoundary';

// Dynamic imports with SSR disabled to prevent hydration issues
const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection').then(mod => ({ default: mod.HeroSection })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="text-center text-white">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
        </div>
      </div>
    ),
  }
);

const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then(mod => ({ default: mod.AboutSection })),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-gray-100" />,
  }
);

const ProductsSection = dynamic(
  () => import('@/components/sections/ProductsSection').then(mod => ({ default: mod.ProductsSection })),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-white" />,
  }
);

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then(mod => ({ default: mod.ContactSection })),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-gray-900" />,
  }
);

export default function Home() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'ko';

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
