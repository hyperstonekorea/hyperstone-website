'use client';

import { useState } from 'react';
import { ProductDetailDesignConfig } from '@/lib/design/types';
import HeroDesigner from './HeroDesigner';
import ContentDesigner from './ContentDesigner';
import GalleryDesigner from './GalleryDesigner';
import SectionStyleDesigner from './SectionStyleDesigner';

interface ProductDetailDesignerProps {
  productSlug: string;
  config: ProductDetailDesignConfig;
  onChange: (config: ProductDetailDesignConfig) => void;
}

const PRODUCT_OPTIONS = [
  { slug: 'readymixconcrete', label: 'Ready Mix Concrete' },
  { slug: 'precast', label: 'Precast' },
  { slug: 'groutingagent', label: 'Grouting Agent' },
  { slug: 'waterproofagent', label: 'Waterproof Agent' }
];

type TabType = 'hero' | 'content' | 'gallery' | 'sections';

export default function ProductDetailDesigner({
  productSlug,
  config,
  onChange
}: ProductDetailDesignerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  const tabs = [
    { id: 'hero' as TabType, label: 'Hero Section' },
    { id: 'content' as TabType, label: 'Content' },
    { id: 'gallery' as TabType, label: 'Gallery' },
    { id: 'sections' as TabType, label: 'Sections' }
  ];

  const handleApplyToAll = () => {
    setShowApplyDialog(true);
  };

  const confirmApplyToAll = () => {
    // This would trigger a parent component to apply these settings to all products
    // For now, we'll just close the dialog
    setShowApplyDialog(false);
    // Parent component should handle this via a callback
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('applyDesignToAllProducts', { detail: config }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Product Detail Page Design</h3>
            <p className="text-sm text-gray-600 mt-1">
              Customize the appearance of individual product detail pages
            </p>
          </div>
          <button
            onClick={handleApplyToAll}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            Apply to All Products
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showApplyDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Apply to All Products?
            </h4>
            <p className="text-sm text-gray-600 mb-6">
              This will apply the current design settings to all product detail pages. 
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowApplyDialog(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmApplyToAll}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Apply to All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selected Product
        </label>
        <div className="text-base font-semibold text-primary">
          {PRODUCT_OPTIONS.find(p => p.slug === productSlug)?.label || productSlug}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'hero' && (
          <HeroDesigner
            config={config.hero}
            onChange={(hero) => onChange({ ...config, hero })}
          />
        )}
        {activeTab === 'content' && (
          <ContentDesigner
            config={config.content}
            onChange={(content) => onChange({ ...config, content })}
          />
        )}
        {activeTab === 'gallery' && (
          <GalleryDesigner
            config={config.gallery}
            onChange={(gallery) => onChange({ ...config, gallery })}
          />
        )}
        {activeTab === 'sections' && (
          <SectionStyleDesigner
            config={config.sections}
            onChange={(sections) => onChange({ ...config, sections })}
          />
        )}
      </div>
    </div>
  );
}
