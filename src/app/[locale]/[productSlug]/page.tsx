import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { products } from '@/data/products';
import { Locale } from '@/types';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import StructuredData from '@/components/seo/StructuredData';

interface ProductPageProps {
  params: Promise<{
    locale: Locale;
    productSlug: string;
  }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    productSlug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { locale, productSlug } = await params;
  
  const { generateProductMetadata } = await import('@/lib/metadata');
  return generateProductMetadata(productSlug, locale);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, productSlug } = await params;
  
  // Find the product by slug
  const product = products.find(p => p.slug === productSlug);
  
  // If product not found, return 404
  if (!product) {
    notFound();
  }

  // Generate structured data
  const productSchema = generateProductSchema(product, locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { 
      name: locale === 'ko' ? '홈' : 'Home', 
      url: locale === 'ko' ? '/' : '/en' 
    },
    { 
      name: locale === 'ko' ? '제품' : 'Products', 
      url: locale === 'ko' ? '/#products' : '/en#products' 
    },
    { 
      name: product.name[locale], 
      url: `/${locale}/${productSlug}` 
    },
  ], locale);

  return (
    <>
      <StructuredData data={[productSchema, breadcrumbSchema]} />
      <ProductDetailPage product={product} locale={locale} />
    </>
  );
}