'use client';

import { SectionDesignConfig } from '@/lib/design/types';
import BackgroundControl from './BackgroundControl';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';
import SpacingControl from './SpacingControl';

interface SectionDesignerProps {
  sectionId: 'hero' | 'about' | 'products' | 'contact';
  config: SectionDesignConfig;
  onChange: (config: SectionDesignConfig) => void;
}

const SECTION_LABELS = {
  hero: 'Hero Section',
  about: 'About Section',
  products: 'Products Section',
  contact: 'Contact Section'
};

export default function SectionDesigner({
  sectionId,
  config,
  onChange
}: SectionDesignerProps) {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {SECTION_LABELS[sectionId]}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Customize the appearance of the {sectionId} section
        </p>
      </div>

      {/* Background */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BackgroundControl
          value={config.background}
          onChange={(background) => onChange({ ...config, background })}
          label="Section Background"
        />
      </div>

      {/* Fonts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Typography</h4>
        <div className="space-y-6">
          <FontSelector
            value={config.fonts.heading}
            onChange={(heading) => onChange({
              ...config,
              fonts: { ...config.fonts, heading }
            })}
            label="Heading Font"
          />
          <div className="border-t pt-6">
            <FontSelector
              value={config.fonts.body}
              onChange={(body) => onChange({
                ...config,
                fonts: { ...config.fonts, body }
              })}
              label="Body Font"
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Colors</h4>
        <div className="space-y-6">
          <ColorPicker
            value={config.colors.heading}
            onChange={(heading) => onChange({
              ...config,
              colors: { ...config.colors, heading }
            })}
            label="Heading Color"
            validateContrast
            contrastAgainst={config.background.type === 'color' ? config.background.value : '#ffffff'}
          />
          <ColorPicker
            value={config.colors.text}
            onChange={(text) => onChange({
              ...config,
              colors: { ...config.colors, text }
            })}
            label="Text Color"
            validateContrast
            contrastAgainst={config.background.type === 'color' ? config.background.value : '#ffffff'}
          />
          <ColorPicker
            value={config.colors.accent}
            onChange={(accent) => onChange({
              ...config,
              colors: { ...config.colors, accent }
            })}
            label="Accent Color"
          />
        </div>
      </div>

      {/* Spacing */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Spacing</h4>
        <div className="space-y-6">
          <SpacingControl
            value={config.spacing.padding}
            onChange={(padding) => onChange({
              ...config,
              spacing: { ...config.spacing, padding }
            })}
            label="Padding"
            type="padding"
          />
          <div className="border-t pt-6">
            <SpacingControl
              value={config.spacing.margin}
              onChange={(margin) => onChange({
                ...config,
                spacing: { ...config.spacing, margin }
              })}
              label="Margin"
              type="margin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
