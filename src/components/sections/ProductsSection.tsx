'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { OptimizedImage, imageSizes } from '@/components/ui/OptimizedImage';
import { Locale, Product } from '@/types';
import { products } from '@/data/products';
import { getLocalizedText } from '@/lib/utils';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ProductsSectionProps {
  locale: Locale;
}

interface ProductCardProps {
  product: Product;
  locale: Locale;
  index: number;
}

function ProductCard({ product, locale, index }: ProductCardProps) {
  const t = useTranslations();

  return (
    <AnimatedSection 
      animation="slideUp" 
      delay={0.2 + (index * 0.1)}
    >
      <motion.div
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
        whileHover={{ 
          y: -4,
          scale: 1.01
        }}
        transition={{ 
          type: "tween", 
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        <Link href={`/${locale}/${product.slug}`}>
          <div className="relative h-64 overflow-hidden">
            <OptimizedImage
              src={product.images.thumbnail}
              alt={getLocalizedText(product.name, locale)}
              width={400}
              height={256}
              className="w-full h-full rounded-t-2xl"
              sizes={imageSizes.card}
              quality={80}
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <ArrowRightIcon className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">
                  {t('products.learnMore')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-[#1C2B33] mb-3 group-hover:text-[#0082FB] transition-colors">
              {getLocalizedText(product.name, locale)}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {getLocalizedText(product.shortDescription, locale)}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.features[locale].slice(0, 3).map((feature, featureIndex) => (
                <span 
                  key={featureIndex}
                  className="px-3 py-1 bg-[#F1F5F8] text-[#0082FB] text-xs font-medium rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Applications */}
            <div className="text-xs text-gray-500 mb-4">
              <span className="font-medium">
                {locale === 'ko' ? '적용 분야: ' : 'Applications: '}
              </span>
              {product.applications[locale].slice(0, 2).join(', ')}
              {product.applications[locale].length > 2 && '...'}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-[#0082FB] font-medium text-sm group-hover:text-[#0064E0] transition-colors">
                {t('products.learnMore')}
              </div>
              <ArrowRightIcon className="w-4 h-4 text-[#0082FB] group-hover:text-[#0064E0] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}

export function ProductsSection({ locale }: ProductsSectionProps) {
  const t = useTranslations();

  return (
    <DynamicBackground 
      sectionId="products"
      className="min-h-screen flex items-center justify-center py-20"
      fallbackConfig={{
        backgroundType: 'color',
        backgroundValue: '#FFFFFF',
        opacity: 100,
        tone: 'light'
      }}
    >
      <section id="products" className="relative w-full">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#0082FB]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#0064E0]/5 rounded-full blur-3xl" />
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection animation="slideUp" delay={0.1}>
            <h2 className="text-5xl lg:text-6xl font-bold text-[#1C2B33] mb-6">
              {t('products.title')}
            </h2>
            <div className="w-24 h-1 bg-[#0082FB] mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
              {t('products.subtitle')}
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t('products.description')}
            </p>
          </AnimatedSection>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id}
              product={product}
              locale={locale}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="slideUp" delay={0.8}>
          <div className="text-center bg-gradient-to-r from-[#F1F5F8] to-white p-8 lg:p-12 rounded-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#1C2B33] mb-4">
              {t('products.cta.title')}
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('products.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('contact.form.title')}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  // Scroll to first product or show product catalog
                  const firstProduct = products[0];
                  window.location.href = `/${locale}/${firstProduct.slug}`;
                }}
              >
                {t('products.viewCatalog')}
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Product Categories */}
        <AnimatedSection animation="fadeIn" delay={1.0}>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#0082FB] to-[#0064E0] p-8 rounded-2xl text-white">
              <h4 className="text-2xl font-bold mb-4">
                {t('products.categories.concrete.title')}
              </h4>
              <p className="text-white/90 mb-4">
                {t('products.categories.concrete.description')}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  {products[0].name[locale]}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  {products[1].name[locale]}
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-[#1C2B33] to-[#2D3748] p-8 rounded-2xl text-white">
              <h4 className="text-2xl font-bold mb-4">
                {t('products.categories.specialty.title')}
              </h4>
              <p className="text-white/90 mb-4">
                {t('products.categories.specialty.description')}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  {products[2].name[locale]}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3" />
                  {products[3].name[locale]}
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
      </section>
    </DynamicBackground>
  );
}

export default ProductsSection;