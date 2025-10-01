import { MetadataRoute } from 'next';
import { products } from '@/data/products';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hyperstone.co.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ko', 'en'];
  const routes: MetadataRoute.Sitemap = [];

  // Add main pages for each locale
  locales.forEach(locale => {
    const localePrefix = locale === 'ko' ? '' : '/en';
    
    // Home page
    routes.push({
      url: `${baseUrl}${localePrefix}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });

    // Product pages
    products.forEach(product => {
      routes.push({
        url: `${baseUrl}${localePrefix}/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  return routes;
}