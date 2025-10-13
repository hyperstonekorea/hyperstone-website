'use client';

import { useState } from 'react';
import { BackgroundConfig } from '@/lib/design/types';
import ImageUploader from './ImageUploader';

interface BackgroundControlProps {
  value: BackgroundConfig;
  onChange: (config: BackgroundConfig) => void;
  allowedTypes?: ('color' | 'image' | 'gradient' | 'video')[];
  label?: string;
}

export default function BackgroundControl({
  value,
  onChange,
  allowedTypes = ['color', 'image', 'gradient'],
  label = 'Background'
}: BackgroundControlProps) {
  const [showOverlay, setShowOverlay] = useState(!!value.overlay);

  const handleTypeChange = (type: BackgroundConfig['type']) => {
    onChange({
      ...value,
      type,
      value: type === 'color' ? '#ffffff' : ''
    });
  };

  const handleValueChange = (newValue: string) => {
    onChange({ ...value, value: newValue });
  };

  const handleOverlayChange = (overlayConfig: Partial<BackgroundConfig['overlay']>) => {
    onChange({
      ...value,
      overlay: {
        color: value.overlay?.color || '#000000',
        opacity: value.overlay?.opacity || 0.5,
        blendMode: value.overlay?.blendMode || 'normal',
        ...overlayConfig
      }
    });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Type selector */}
      <div className="flex gap-2">
        {allowedTypes.map(type => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              value.type === type
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Value input based on type */}
      <div>
        {value.type === 'color' && (
          <div className="flex gap-2">
            <input
              type="color"
              value={value.value}
              onChange={(e) => handleValueChange(e.target.value)}
              className="h-10 w-20 rounded border border-gray-300"
            />
            <input
              type="text"
              value={value.value}
              onChange={(e) => handleValueChange(e.target.value)}
              placeholder="#ffffff"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        )}

        {value.type === 'image' && (
          <div className="space-y-2">
            <input
              type="text"
              value={value.value}
              onChange={(e) => handleValueChange(e.target.value)}
              placeholder="https://example.com/image.jpg or /uploads/image.webp"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <ImageUploader
              onUpload={(url) => handleValueChange(url)}
              section={label.toLowerCase().replace(/\s+/g, '-')}
            />
          </div>
        )}

        {value.type === 'gradient' && (
          <input
            type="text"
            value={value.value}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        )}

        {value.type === 'video' && (
          <input
            type="text"
            value={value.value}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="https://example.com/video.mp4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        )}
      </div>

      {/* Overlay controls */}
      {(value.type === 'image' || value.type === 'video') && (
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOverlay}
              onChange={(e) => {
                setShowOverlay(e.target.checked);
                if (!e.target.checked) {
                  onChange({ ...value, overlay: undefined });
                } else {
                  handleOverlayChange({});
                }
              }}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Add overlay</span>
          </label>

          {showOverlay && (
            <div className="pl-6 space-y-3 border-l-2 border-gray-200">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Overlay Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={value.overlay?.color || '#000000'}
                    onChange={(e) => handleOverlayChange({ color: e.target.value })}
                    className="h-8 w-16 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={value.overlay?.color || '#000000'}
                    onChange={(e) => handleOverlayChange({ color: e.target.value })}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Opacity: {((value.overlay?.opacity || 0.5) * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={value.overlay?.opacity || 0.5}
                  onChange={(e) => handleOverlayChange({ opacity: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      <div className="mt-4">
        <label className="block text-xs text-gray-600 mb-2">Preview</label>
        <div
          className="h-24 rounded-lg border border-gray-300"
          style={{
            background: value.type === 'color' || value.type === 'gradient' 
              ? value.value 
              : value.type === 'image' 
                ? `url(${value.value})` 
                : '#f3f4f6',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          {value.overlay && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: value.overlay.color,
                opacity: value.overlay.opacity,
                borderRadius: 'inherit'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
