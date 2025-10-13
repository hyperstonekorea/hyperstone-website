'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product, Locale } from '@/types';
import { products } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { OptimizedImage, imageSizes } from '@/components/ui/OptimizedImage';
import { useDesignSettings } from '@/hooks/useDesignSettings';
import { applyColorValue, applyBackgroundStyles, applyFontStyles } from '@/lib/design/apply-styles';

interface ProductDetailPageProps {
  product: Product;
  locale: Locale;
}

export default function ProductDetailPage({ product, locale }: ProductDetailPageProps) {
  const t = useTranslations('product');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { settings, loading } = useDesignSettings();

  // Get related products (exclude current product)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  // Get product-specific design settings or use defaults
  const productConfig = settings.productDetails[product.slug];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Hero background styles
  const heroBackgroundStyles = productConfig 
    ? applyBackgroundStyles(productConfig.hero.background)
    : { background: 'linear-gradient(to right, #2563eb, #1e40af)' };

  const heroOverlayStyles = productConfig
    ? {
        backgroundColor: productConfig.hero.overlay.color,
        opacity: productConfig.hero.overlay.opacity
      }
    : { backgroundColor: 'rgba(0, 0, 0, 0.3)', opacity: 0.3 };

  // Content styles
  const contentBackgroundStyles = productConfig
    ? applyBackgroundStyles(productConfig.content.background)
    : { backgroundColor: '#f9fafb' };

  const headingColor = productConfig
    ? applyColorValue(productConfig.content.colors.heading)
    : '#111827';

  const bodyColor = productConfig
    ? applyColorValue(productConfig.content.colors.body)
    : '#374151';

  const accentColor = productConfig
    ? applyColorValue(productConfig.content.colors.accent)
    : '#2563eb';

  return (
    <div className="min-h-screen" style={contentBackgroundStyles}>
      {/* Hero Section */}
      <AnimatedSection>
        <div 
          className="text-white py-16 relative overflow-hidden"
          style={heroBackgroundStyles}
        >
          {productConfig && (
            <div 
              className="absolute inset-0"
              style={heroOverlayStyles}
            />
          )}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                style={productConfig ? applyFontStyles(productConfig.content.fonts.heading) : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {product.name[locale]}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl opacity-90"
                style={productConfig ? applyFontStyles(productConfig.content.fonts.body) : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {product.shortDescription[locale]}
              </motion.p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Product Overview */}
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              
              {/* Image Gallery */}
              <div className="space-y-4">
                <div 
                  className="aspect-video bg-gray-200 overflow-hidden"
                  style={{ 
                    borderRadius: productConfig ? `${productConfig.gallery.borderRadius}px` : '0.5rem'
                  }}
                >
                  <OptimizedImage
                    src={product.images.gallery[selectedImageIndex]}
                    alt={product.name[locale]}
                    width={800}
                    height={450}
                    className="w-full h-full"
                    priority
                    sizes={imageSizes.detail}
                    quality={90}
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                <div 
                  className="grid grid-cols-4"
                  style={{ gap: productConfig ? productConfig.gallery.spacing : '0.5rem' }}
                >
                  {product.images.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className="aspect-video bg-gray-200 overflow-hidden border-2 transition-colors"
                      style={{
                        borderRadius: productConfig ? `${productConfig.gallery.borderRadius}px` : '0.5rem',
                        borderColor: selectedImageIndex === index 
                          ? accentColor
                          : 'transparent'
                      }}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`${product.name[locale]} ${index + 1}`}
                        width={200}
                        height={113}
                        className="w-full h-full"
                        sizes={imageSizes.thumbnail}
                        quality={75}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h2 
                    className="text-2xl font-bold mb-4"
                    style={{
                      ...(productConfig ? applyFontStyles(productConfig.content.fonts.heading) : {}),
                      color: headingColor
                    }}
                  >
                    {t('overview')}
                  </h2>
                  <p 
                    className="leading-relaxed"
                    style={{
                      ...(productConfig ? applyFontStyles(productConfig.content.fonts.body) : {}),
                      color: bodyColor
                    }}
                  >
                    {product.fullDescription[locale]}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{
                      ...(productConfig ? applyFontStyles(productConfig.content.fonts.heading) : {}),
                      color: headingColor
                    }}
                  >
                    {t('keyFeatures')}
                  </h3>
                  <ul className="space-y-2">
                    {product.features[locale].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span 
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: accentColor }}
                        ></span>
                        <span 
                          style={{
                            ...(productConfig ? applyFontStyles(productConfig.content.fonts.body) : {}),
                            color: bodyColor
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Button */}
                <div className="pt-4">
                  <Button 
                    variant="primary" 
                    size="lg"
                    href="#contact"
                  >
                    {t('inquire')}
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Technical Specifications */}
          <AnimatedSection>
            <div 
              className="bg-white shadow-lg p-8 mb-16"
              style={{
                ...(productConfig ? applyBackgroundStyles(productConfig.sections.specifications.background) : {}),
                borderRadius: productConfig ? `${productConfig.sections.specifications.borderRadius}px` : '0.5rem',
                boxShadow: productConfig?.sections.specifications.shadow || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h2 
                className="text-2xl font-bold mb-6"
                style={{
                  ...(productConfig ? applyFontStyles(productConfig.content.fonts.heading) : {}),
                  color: headingColor
                }}
              >
                {t('specifications')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.specifications[locale].map((spec, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div 
                      className="text-sm mb-1"
                      style={{
                        ...(productConfig ? applyFontStyles(productConfig.content.fonts.specs) : {}),
                        color: productConfig ? applyColorValue(productConfig.content.colors.specLabel) : '#6b7280'
                      }}
                    >
                      {spec.label}
                    </div>
                    <div 
                      className="text-lg font-semibold"
                      style={{
                        ...(productConfig ? applyFontStyles(productConfig.content.fonts.specs) : {}),
                        color: productConfig ? applyColorValue(productConfig.content.colors.specValue) : '#111827'
                      }}
                    >
                      {spec.value} {spec.unit && (
                        <span 
                          className="text-sm"
                          style={{
                            color: productConfig ? applyColorValue(productConfig.content.colors.specLabel) : '#6b7280'
                          }}
                        >
                          {spec.unit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Applications */}
          <AnimatedSection>
            <div 
              className="bg-white shadow-lg p-8 mb-16"
              style={{
                ...(productConfig ? applyBackgroundStyles(productConfig.sections.applications.background) : {}),
                borderRadius: productConfig ? `${productConfig.sections.applications.borderRadius}px` : '0.5rem',
                boxShadow: productConfig?.sections.applications.shadow || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h2 
                className="text-2xl font-bold mb-6"
                style={{
                  ...(productConfig ? applyFontStyles(productConfig.content.fonts.heading) : {}),
                  color: headingColor
                }}
              >
                {t('applications')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications[locale].map((application, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-4 rounded-lg"
                    style={{
                      backgroundColor: `${accentColor}15`
                    }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    <span 
                      style={{
                        ...(productConfig ? applyFontStyles(productConfig.content.fonts.body) : {}),
                        color: bodyColor
                      }}
                    >
                      {application}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <AnimatedSection>
              <div 
                className="bg-white shadow-lg p-8"
                style={{
                  ...(productConfig ? applyBackgroundStyles(productConfig.sections.features.background) : {}),
                  borderRadius: productConfig ? `${productConfig.sections.features.borderRadius}px` : '0.5rem',
                  boxShadow: productConfig?.sections.features.shadow || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h2 
                  className="text-2xl font-bold mb-6"
                  style={{
                    ...(productConfig ? applyFontStyles(productConfig.content.fonts.heading) : {}),
                    color: headingColor
                  }}
                >
                  {t('relatedProducts')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <Link
                      key={relatedProduct.id}
                      href={`/${locale}/${relatedProduct.slug}`}
                      className="group"
                    >
                      <div className="bg-gray-50 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
                        <div className="aspect-video bg-gray-200">
                          <OptimizedImage
                            src={relatedProduct.images.thumbnail}
                            alt={relatedProduct.name[locale]}
                            width={400}
                            height={225}
                            className="w-full h-full rounded-t-lg"
                            sizes={imageSizes.card}
                            quality={80}
                          />
                        </div>
                        <div className="p-4">
                          <h3 
                            className="font-semibold mb-2 transition-colors"
                            style={{
                              ...(productConfig ? applyFontStyles(productConfig.content.fonts.heading) : {}),
                              color: headingColor
                            }}
                          >
                            {relatedProduct.name[locale]}
                          </h3>
                          <p 
                            className="text-sm"
                            style={{
                              ...(productConfig ? applyFontStyles(productConfig.content.fonts.body) : {}),
                              color: bodyColor
                            }}
                          >
                            {relatedProduct.shortDescription[locale]}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
}