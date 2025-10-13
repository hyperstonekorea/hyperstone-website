'use client';

import { ProductDetailDesignConfig } from '@/lib/design/types';
import BackgroundControl from './BackgroundControl';

interface HeroDesignerProps {
  config: ProductDetailDesignConfig['hero'];
  onChange: (config: ProductDetailDesignConfig['hero']) => void;
}

export default function HeroDesigner({ config, onChange }: HeroDesignerProps) {
  return (
    <div className="space-y-6">
      {/* Background */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BackgroundControl
          value={config.background}
          onChange={(background) => onChange({ ...config, background })}
          label="Hero Background"
        />
      </div>

      {/* Overlay */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Overlay</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Overlay Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.overlay.color}
                onChange={(e) => onChange({
                  ...config,
                  overlay: { ...config.overlay, color: e.target.value }
                })}
                className="h-10 w-20 rounded border border-gray-300"
              />
              <input
                type="text"
                value={config.overlay.color}
                onChange={(e) => onChange({
                  ...config,
                  overlay: { ...config.overlay, color: e.target.value }
                })}
                placeholder="#000000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Opacity: {(config.overlay.opacity * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={config.overlay.opacity}
              onChange={(e) => onChange({
                ...config,
                overlay: { ...config.overlay, opacity: parseFloat(e.target.value) }
              })}
              className="w-full"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="mt-4">
          <label className="block text-xs text-gray-600 mb-2">Preview</label>
          <div
            className="h-32 rounded-lg relative overflow-hidden"
            style={{
              background: config.background.type === 'color' || config.background.type === 'gradient'
                ? config.background.value
                : config.background.type === 'image'
                  ? `url(${config.background.value})`
                  : '#f3f4f6',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: config.overlay.color,
                opacity: config.overlay.opacity
              }}
            >
              <span className="text-white text-sm font-medium relative z-10">
                Hero Content
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
