'use client';

import { useState } from 'react';
import { ProductDetailDesignConfig, SectionStyleConfig } from '@/lib/design/types';
import BackgroundControl from './BackgroundControl';
import ResponsiveSizeControl from './ResponsiveSizeControl';
import ShadowControl from './ShadowControl';

interface SectionStyleDesignerProps {
  config: ProductDetailDesignConfig['sections'];
  onChange: (config: ProductDetailDesignConfig['sections']) => void;
}

type SectionType = 'specifications' | 'applications' | 'features';

const SECTION_LABELS = {
  specifications: 'Specifications',
  applications: 'Applications',
  features: 'Features'
};

export default function SectionStyleDesigner({ config, onChange }: SectionStyleDesignerProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('specifications');

  const handleSectionChange = (updates: Partial<SectionStyleConfig>) => {
    onChange({
      ...config,
      [activeSection]: {
        ...config[activeSection],
        ...updates
      }
    });
  };

  const currentConfig = config[activeSection];

  return (
    <div className="space-y-6">
      {/* Section selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex gap-1">
          {(Object.keys(SECTION_LABELS) as SectionType[]).map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {SECTION_LABELS[section]}
            </button>
          ))}
        </div>
      </div>

      {/* Section configuration */}
      <div className="space-y-6">
        {/* Background */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <BackgroundControl
            value={currentConfig.background}
            onChange={(background) => handleSectionChange({ background })}
            label={`${SECTION_LABELS[activeSection]} Background`}
          />
        </div>

        {/* Padding */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ResponsiveSizeControl
            value={currentConfig.padding}
            onChange={(padding) => handleSectionChange({ padding })}
            label="Padding"
          />
        </div>

        {/* Border Radius */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Border Radius</label>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Radius: {currentConfig.borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              step="1"
              value={currentConfig.borderRadius}
              onChange={(e) => handleSectionChange({ borderRadius: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span>12px</span>
              <span>24px</span>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ShadowControl
            value={currentConfig.shadow || 'none'}
            onChange={(shadow) => handleSectionChange({ shadow })}
            label="Section Shadow"
          />
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Preview</label>
          <div
            className="p-8"
            style={{
              background: currentConfig.background.type === 'color' || currentConfig.background.type === 'gradient'
                ? currentConfig.background.value
                : '#f3f4f6',
              borderRadius: `${currentConfig.borderRadius}px`,
              boxShadow: currentConfig.shadow !== 'none' ? currentConfig.shadow : undefined,
              padding: currentConfig.padding.desktop
            }}
          >
            <div className="text-sm text-gray-700">
              {SECTION_LABELS[activeSection]} Section Content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
