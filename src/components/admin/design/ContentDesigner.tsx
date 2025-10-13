'use client';

import { ProductDetailDesignConfig } from '@/lib/design/types';
import BackgroundControl from './BackgroundControl';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';

interface ContentDesignerProps {
  config: ProductDetailDesignConfig['content'];
  onChange: (config: ProductDetailDesignConfig['content']) => void;
}

export default function ContentDesigner({ config, onChange }: ContentDesignerProps) {
  return (
    <div className="space-y-6">
      {/* Background */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BackgroundControl
          value={config.background}
          onChange={(background) => onChange({ ...config, background })}
          label="Content Background"
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
          <div className="border-t pt-6">
            <FontSelector
              value={config.fonts.specs}
              onChange={(specs) => onChange({
                ...config,
                fonts: { ...config.fonts, specs }
              })}
              label="Specifications Font"
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
            value={config.colors.body}
            onChange={(body) => onChange({
              ...config,
              colors: { ...config.colors, body }
            })}
            label="Body Text Color"
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
          <ColorPicker
            value={config.colors.specLabel}
            onChange={(specLabel) => onChange({
              ...config,
              colors: { ...config.colors, specLabel }
            })}
            label="Spec Label Color"
          />
          <ColorPicker
            value={config.colors.specValue}
            onChange={(specValue) => onChange({
              ...config,
              colors: { ...config.colors, specValue }
            })}
            label="Spec Value Color"
          />
        </div>
      </div>
    </div>
  );
}
