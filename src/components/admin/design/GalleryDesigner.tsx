'use client';

import { ProductDetailDesignConfig } from '@/lib/design/types';

interface GalleryDesignerProps {
  config: ProductDetailDesignConfig['gallery'];
  onChange: (config: ProductDetailDesignConfig['gallery']) => void;
}

export default function GalleryDesigner({ config, onChange }: GalleryDesignerProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Gallery Settings</h4>
        <div className="space-y-4">
          {/* Thumbnail Size */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Thumbnail Size</label>
            <input
              type="text"
              value={config.thumbnailSize}
              onChange={(e) => onChange({ ...config, thumbnailSize: e.target.value })}
              placeholder="80px"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Examples: 80px, 5rem, 100px
            </p>
          </div>

          {/* Spacing */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Spacing Between Thumbnails</label>
            <input
              type="text"
              value={config.spacing}
              onChange={(e) => onChange({ ...config, spacing: e.target.value })}
              placeholder="0.5rem"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Examples: 0.5rem, 8px, 1rem
            </p>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Border Radius: {config.borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={config.borderRadius}
              onChange={(e) => onChange({ ...config, borderRadius: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px (Square)</span>
              <span>20px (Rounded)</span>
            </div>
          </div>

          {/* Lightbox Background */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Lightbox Background</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.lightboxBackground}
                onChange={(e) => onChange({ ...config, lightboxBackground: e.target.value })}
                className="h-10 w-20 rounded border border-gray-300"
              />
              <input
                type="text"
                value={config.lightboxBackground}
                onChange={(e) => onChange({ ...config, lightboxBackground: e.target.value })}
                placeholder="rgba(0, 0, 0, 0.9)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Background color when viewing full-size images
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6">
          <label className="block text-xs text-gray-600 mb-2">Preview</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="bg-gray-200 flex items-center justify-center text-xs text-gray-500"
                style={{
                  width: config.thumbnailSize,
                  height: config.thumbnailSize,
                  borderRadius: `${config.borderRadius}px`,
                  marginRight: i < 4 ? config.spacing : 0
                }}
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
