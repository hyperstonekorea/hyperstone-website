'use client';

import { ProductCardDesignConfig } from '@/lib/design/types';
import BackgroundControl from './BackgroundControl';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';
import ShadowControl from './ShadowControl';

interface ProductCardDesignerProps {
  config: ProductCardDesignConfig;
  onChange: (config: ProductCardDesignConfig) => void;
}

export default function ProductCardDesigner({
  config,
  onChange
}: ProductCardDesignerProps) {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Product Card Design</h3>
        <p className="text-sm text-gray-600 mt-1">
          Customize the appearance of product cards on the main page
        </p>
      </div>

      {/* Background */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BackgroundControl
          value={config.background}
          onChange={(background) => onChange({ ...config, background })}
          label="Card Background"
          allowedTypes={['color', 'gradient']}
        />
      </div>

      {/* Border */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Border</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Width (px)</label>
              <input
                type="number"
                value={config.border.width}
                onChange={(e) => onChange({
                  ...config,
                  border: { ...config.border, width: parseInt(e.target.value) || 0 }
                })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Radius (px)</label>
              <input
                type="number"
                value={config.border.radius}
                onChange={(e) => onChange({
                  ...config,
                  border: { ...config.border, radius: parseInt(e.target.value) || 0 }
                })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Style</label>
            <select
              value={config.border.style}
              onChange={(e) => onChange({
                ...config,
                border: { ...config.border, style: e.target.value as any }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="none">None</option>
            </select>
          </div>
          <ColorPicker
            value={config.border.color}
            onChange={(color) => onChange({
              ...config,
              border: { ...config.border, color }
            })}
            label="Border Color"
          />
        </div>
      </div>

      {/* Shadows */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Shadows</h4>
        <div className="space-y-6">
          <ShadowControl
            value={config.shadow.default}
            onChange={(shadow) => onChange({
              ...config,
              shadow: { ...config.shadow, default: shadow }
            })}
            label="Default Shadow"
          />
          <div className="border-t pt-6">
            <ShadowControl
              value={config.shadow.hover}
              onChange={(shadow) => onChange({
                ...config,
                shadow: { ...config.shadow, hover: shadow }
              })}
              label="Hover Shadow"
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Typography</h4>
        <div className="space-y-6">
          <FontSelector
            value={config.fonts.title}
            onChange={(title) => onChange({
              ...config,
              fonts: { ...config.fonts, title }
            })}
            label="Title Font"
          />
          <div className="border-t pt-6">
            <FontSelector
              value={config.fonts.description}
              onChange={(description) => onChange({
                ...config,
                fonts: { ...config.fonts, description }
              })}
              label="Description Font"
            />
          </div>
          <div className="border-t pt-6">
            <FontSelector
              value={config.fonts.metadata}
              onChange={(metadata) => onChange({
                ...config,
                fonts: { ...config.fonts, metadata }
              })}
              label="Metadata Font"
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Text Colors</h4>
        <div className="space-y-6">
          <ColorPicker
            value={config.colors.title}
            onChange={(title) => onChange({
              ...config,
              colors: { ...config.colors, title }
            })}
            label="Title Color"
          />
          <ColorPicker
            value={config.colors.description}
            onChange={(description) => onChange({
              ...config,
              colors: { ...config.colors, description }
            })}
            label="Description Color"
          />
          <ColorPicker
            value={config.colors.metadata}
            onChange={(metadata) => onChange({
              ...config,
              colors: { ...config.colors, metadata }
            })}
            label="Metadata Color"
          />
        </div>
      </div>

      {/* Spacing */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Spacing</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Padding</label>
            <input
              type="text"
              value={config.spacing.padding}
              onChange={(e) => onChange({
                ...config,
                spacing: { ...config.spacing, padding: e.target.value }
              })}
              placeholder="1.5rem"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Gap</label>
            <input
              type="text"
              value={config.spacing.gap}
              onChange={(e) => onChange({
                ...config,
                spacing: { ...config.spacing, gap: e.target.value }
              })}
              placeholder="1rem"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Hover Effects</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Transform</label>
            <input
              type="text"
              value={config.hover.transform}
              onChange={(e) => onChange({
                ...config,
                hover: { ...config.hover, transform: e.target.value }
              })}
              placeholder="translateY(-4px)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Transition</label>
            <input
              type="text"
              value={config.hover.transition}
              onChange={(e) => onChange({
                ...config,
                hover: { ...config.hover, transition: e.target.value }
              })}
              placeholder="all 0.3s ease"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
