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

interface ProductDetailPageProps {
  product: Product;
  locale: Locale;
}

export default function ProductDetailPage({ product, locale }: ProductDetailPageProps) {
  const t = useTranslations('product');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get related products (exclude current product)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {product.name[locale]}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl opacity-90"
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
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={product.images.gallery[selectedImageIndex]}
                    alt={product.name[locale]}
                    width={800}
                    height={450}
                    className="w-full h-full rounded-lg"
                    priority
                    sizes={imageSizes.detail}
                    quality={90}
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {product.images.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-video bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index 
                          ? 'border-blue-500' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`${product.name[locale]} ${index + 1}`}
                        width={200}
                        height={113}
                        className="w-full h-full rounded-lg"
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('overview')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {product.fullDescription[locale]}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('keyFeatures')}
                  </h3>
                  <ul className="space-y-2">
                    {product.features[locale].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{feature}</span>
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
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('specifications')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.specifications[locale].map((spec, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">{spec.label}</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {spec.value} {spec.unit && <span className="text-sm text-gray-600">{spec.unit}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Applications */}
          <AnimatedSection>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('applications')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications[locale].map((application, index) => (
                  <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-800">{application}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {relatedProduct.name[locale]}
                          </h3>
                          <p className="text-sm text-gray-600">
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