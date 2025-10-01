import { Metadata } from 'next';
import { Header, Footer } from '../../components/layout';
import { 
  HeroSection, 
  AboutSection, 
  ProductsSection, 
  ContactSection 
} from '../../components/sections';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFAQSchema, generateLocalBusinessSchema } from '@/lib/structured-data';
import StructuredData from '@/components/seo/StructuredData';
import { Locale } from '@/types';

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata({
    locale,
    url: locale === 'ko' ? '/' : '/en',
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Generate structured data for home page
  const faqSchema = generateFAQSchema(locale);
  const localBusinessSchema = generateLocalBusinessSchema(locale);

  return (
    <>
      <StructuredData data={[faqSchema, localBusinessSchema]} />
      <div className="min-h-screen flex flex-col">
        <Header locale={locale} />
        
        <main className="flex-1 pt-16 lg:pt-20">
          <HeroSection locale={locale} />
          <AboutSection locale={locale} />
          <ProductsSection locale={locale} />
          <ContactSection locale={locale} />
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}