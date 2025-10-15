'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { BrandText } from '@/components/ui/BrandText';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { OptimizedImage, imageSizes } from '@/components/ui/OptimizedImage';
import { useDesignSettings } from '@/hooks/useDesignSettings';
import { applyColorValue, applyBackgroundStyles, applyFontStyles } from '@/lib/design/apply-styles';
import { ProductCardDesignConfig } from '@/lib/design/types';
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
  cardConfig: ProductCardDesignConfig;
}

function ProductCard({ product, locale, index, cardConfig }: ProductCardProps) {
  const t = useTranslations();

  const cardStyles: React.CSSProperties = {
    ...applyBackgroundStyles(cardConfig.background),
    borderWidth: `${cardConfig.border.width}px`,
    borderColor: applyColorValue(cardConfig.border.color),
    borderRadius: `${cardConfig.border.radius}px`,
    borderStyle: cardConfig.border.style,
    boxShadow: cardConfig.shadow.default,
    padding: cardConfig.spacing.padding,
    willChange: 'transform',
    transform: 'translateZ(0)'
  };

  return (
    <AnimatedSection 
      animation="slideUp" 
      delay={0.2 + (index * 0.1)}
    >
      <motion.div
        className="group overflow-hidden cursor-pointer"
        style={cardStyles}
        whileHover={{ 
          y: -4,
          scale: 1.01
        }}
        transition={{ 
          type: "tween", 
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
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

          <div style={{ padding: cardConfig.spacing.padding }}>
            <h3 
              className="text-xl font-bold mb-3 transition-colors"
              style={{
                ...applyFontStyles(cardConfig.fonts.title),
                color: applyColorValue(cardConfig.colors.title)
              }}
            >
              <BrandText>{getLocalizedText(product.name, locale)}</BrandText>
            </h3>
            
            <p 
              className="text-sm leading-relaxed mb-4 line-clamp-3"
              style={{
                ...applyFontStyles(cardConfig.fonts.description),
                color: applyColorValue(cardConfig.colors.description)
              }}
            >
              {getLocalizedText(product.shortDescription, locale)}
            </p>

            {/* Features */}
            <div className="flex flex-wrap mb-4" style={{ gap: cardConfig.spacing.gap }}>
              {product.features[locale].slice(0, 3).map((feature, featureIndex) => (
                <span 
                  key={featureIndex}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: applyColorValue(cardConfig.colors.background),
                    color: applyColorValue(cardConfig.colors.title)
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Applications */}
            <div 
              className="text-xs mb-4"
              style={{
                ...applyFontStyles(cardConfig.fonts.metadata),
                color: applyColorValue(cardConfig.colors.metadata)
              }}
            >
              <span className="font-medium">
                {locale === 'ko' ? '적용 분야: ' : 'Applications: '}
              </span>
              {product.applications[locale].slice(0, 2).join(', ')}
              {product.applications[locale].length > 2 && '...'}
            </div>

            <div className="flex items-center justify-between">
              <div 
                className="font-medium text-sm transition-colors"
                style={{ color: applyColorValue(cardConfig.colors.title) }}
              >
                {t('products.learnMore')}
              </div>
              <ArrowRightIcon 
                className="w-4 h-4 group-hover:translate-x-1 transition-all"
                style={{ color: applyColorValue(cardConfig.colors.title) }}
              />
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}

export function ProductsSection({ locale }: ProductsSectionProps) {
  const t = useTranslations();
  const { settings, loading } = useDesignSettings();
  
  // Get products section design settings
  const productsConfig = settings.sections.products;
  const cardConfig = settings.productCards;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const mapBackgroundType = (type: string): 'video' | 'image' | 'color' => {
    if (type === 'gradient') return 'color';
    if (type === 'video' || type === 'image') return type;
    return 'color';
  };

  return (
    <>
      <style jsx>{`
        #products .section-heading {
          font-family: '${productsConfig.fonts.heading.family}', sans-serif;
          font-weight: ${productsConfig.fonts.heading.weight};
          color: ${applyColorValue(productsConfig.colors.heading)};
        }
        #products .section-body {
          font-family: '${productsConfig.fonts.body.family}', sans-serif;
          font-weight: ${productsConfig.fonts.body.weight};
          color: ${applyColorValue(productsConfig.colors.text)};
        }
        #products .section-accent {
          color: ${applyColorValue(productsConfig.colors.accent)};
        }
      `}</style>
      
      <DynamicBackground 
        sectionId="products"
        className="min-h-screen flex items-center justify-center py-20"
        fallbackConfig={{
          backgroundType: mapBackgroundType(productsConfig.background.type),
          backgroundValue: productsConfig.background.value,
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
              <h2 className="section-heading text-5xl lg:text-6xl font-bold mb-6">
                {t('products.title')}
              </h2>
              <div 
                className="w-24 h-1 mx-auto mb-8 rounded-full"
                style={{ backgroundColor: applyColorValue(productsConfig.colors.accent) }}
              />
              <p className="section-body text-xl max-w-3xl mx-auto leading-relaxed mb-4">
                {t('products.subtitle')}
              </p>
              <p className="section-body text-lg max-w-2xl mx-auto" style={{ opacity: 0.8 }}>
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
                cardConfig={cardConfig}
              />
            ))}
          </div>

          {/* Call to Action */}
          <AnimatedSection animation="slideUp" delay={0.8}>
            <div className="text-center bg-gradient-to-r from-gray-50 to-white p-8 lg:p-12 rounded-2xl">
              <h3 className="section-heading text-2xl lg:text-3xl font-bold mb-4">
                {t('products.cta.title')}
              </h3>
              <p className="section-body mb-8 max-w-2xl mx-auto">
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
              <div 
                className="p-8 rounded-2xl text-white"
                style={{ 
                  background: `linear-gradient(to bottom right, ${applyColorValue(productsConfig.colors.accent)}, ${applyColorValue(productsConfig.colors.heading)})` 
                }}
              >
                <h4 className="text-2xl font-bold mb-4">
                  {t('products.categories.concrete.title')}
                </h4>
                <p className="text-white/90 mb-4">
                  {t('products.categories.concrete.description')}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <BrandText>{products[0].name[locale]}</BrandText>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <BrandText>{products[1].name[locale]}</BrandText>
                  </li>
                </ul>
              </div>
              
              <div 
                className="p-8 rounded-2xl text-white"
                style={{ 
                  background: `linear-gradient(to bottom right, ${applyColorValue(productsConfig.colors.heading)}, ${applyColorValue(productsConfig.colors.text)})` 
                }}
              >
                <h4 className="text-2xl font-bold mb-4">
                  {t('products.categories.specialty.title')}
                </h4>
                <p className="text-white/90 mb-4">
                  {t('products.categories.specialty.description')}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <BrandText>{products[2].name[locale]}</BrandText>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <BrandText>{products[3].name[locale]}</BrandText>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
        </section>
      </DynamicBackground>
    </>
  );
}

export default ProductsSection;