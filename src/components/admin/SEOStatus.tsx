'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface SEOMetrics {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  lastUpdated: string;
}

export default function SEOStatus() {
  const t = useTranslations();
  const [seoData, setSeoData] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading SEO data
    const timer = setTimeout(() => {
      setSeoData({
        title: 'HYPERSTONE - Professional Construction Solutions',
        description: 'Leading provider of DULITE concrete products and construction solutions in Korea.',
        keywords: ['HYPERSTONE', 'DULITE', 'concrete', 'construction', 'Korea'],
        ogImage: '/images/og-image.jpg',
        lastUpdated: new Date().toISOString()
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">SEO Status</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">SEO Status</h2>
      
      {seoData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meta Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <p className="mt-1 text-sm text-gray-900">{seoData.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-900">{seoData.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {seoData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Page Speed</span>
                <span className="text-sm text-green-600 font-semibold">95/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">SEO Score</span>
                <span className="text-sm text-green-600 font-semibold">98/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Accessibility</span>
                <span className="text-sm text-green-600 font-semibold">100/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Best Practices</span>
                <span className="text-sm text-green-600 font-semibold">92/100</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
            <div className="text-sm text-gray-600">
              Last updated: {new Date(seoData.lastUpdated).toLocaleDateString()}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Sitemap updated automatically</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Meta tags optimized for all pages</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Open Graph images configured</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}