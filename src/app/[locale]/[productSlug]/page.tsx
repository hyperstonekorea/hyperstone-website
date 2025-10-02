import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Locale } from '@/types';
import { products } from '@/data/products';
import ProductDetailPage from '@/components/pages/ProductDetailPage';

interface ProductPageProps {
  params: Promise<{
    locale: Locale;
    productSlug: string;
  }>;
}

// Generate static params for all products in both locales
export async function generateStaticParams() {
  const params = [];
  
  for (const locale of ['ko', 'en']) {
    for (const product of products) {
      params.push({
        locale,
        productSlug: product.slug
      });
    }
  }
  
  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { locale, productSlug } = await params;
  
  const product = products.find(p => p.slug === productSlug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: `${product.name[locale]} - HYPERSTONE`,
    description: product.shortDescription[locale],
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, productSlug } = await params;
  
  // Find the product by slug
  const product = products.find(p => p.slug === productSlug);
  
  // If product not found, show 404
  if (!product) {
    notFound();
  }
  
  // Get messages for the locale
  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ProductDetailPage product={product} locale={locale} />
    </NextIntlClientProvider>
  );
}
