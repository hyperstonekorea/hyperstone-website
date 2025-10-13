'use client';

import { useState, useEffect } from 'react';
import { ColorConfig } from '@/lib/design/types';

interface ColorPickerProps {
  value: ColorConfig;
  onChange: (config: ColorConfig) => void;
  label: string;
  validateContrast?: boolean;
  contrastAgainst?: string;
}

const PRESET_COLORS = [
  '#000000', '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db',
  '#667eea', '#764ba2', '#fbbf24', '#ef4444', '#10b981',
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#14b8a6'
];

export default function ColorPicker({
  value,
  onChange,
  label,
  validateContrast = false,
  contrastAgainst
}: ColorPickerProps) {
  const [contrastRatio, setContrastRatio] = useState<number | null>(null);
  const [contrastValid, setContrastValid] = useState(true);

  useEffect(() => {
    if (validateContrast && contrastAgainst) {
      const ratio = calculateContrastRatio(value.value, contrastAgainst);
      setContrastRatio(ratio);
      setContrastValid(ratio >= 4.5); // WCAG AA standard
    }
  }, [value.value, contrastAgainst, validateContrast]);

  const handleColorChange = (newColor: string) => {
    onChange({ ...value, value: newColor });
  };

  const handleOpacityChange = (newOpacity: number) => {
    onChange({ ...value, opacity: newOpacity });
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Color input */}
      <div className="flex gap-2">
        <input
          type="color"
          value={value.value}
          onChange={(e) => handleColorChange(e.target.value)}
          className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value.value}
          onChange={(e) => handleColorChange(e.target.value)}
          placeholder="#ffffff"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
        />
      </div>

      {/* Preset colors */}
      <div>
        <label className="block text-xs text-gray-600 mb-2">Presets</label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map(color => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-8 h-8 rounded border-2 transition-all ${
                value.value.toLowerCase() === color.toLowerCase()
                  ? 'border-primary scale-110'
                  : 'border-gray-300 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Opacity control */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">
          Opacity: {((value.opacity || 1) * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={value.opacity || 1}
          onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Contrast validation */}
      {validateContrast && contrastAgainst && contrastRatio !== null && (
        <div className={`p-3 rounded-lg text-sm ${
          contrastValid ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">Contrast Ratio:</span>
            <span>{contrastRatio.toFixed(2)}:1</span>
          </div>
          <div className="mt-1 text-xs">
            {contrastValid ? (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Meets WCAG AA standards
              </span>
            ) : (
              <span>Below WCAG AA standards (4.5:1 minimum)</span>
            )}
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="mt-4">
        <label className="block text-xs text-gray-600 mb-2">Preview</label>
        <div
          className="h-16 rounded-lg border border-gray-300 flex items-center justify-center"
          style={{
            backgroundColor: value.value,
            opacity: value.opacity || 1
          }}
        >
          <span
            className="text-sm font-medium"
            style={{
              color: contrastAgainst || (isLightColor(value.value) ? '#000000' : '#ffffff')
            }}
          >
            Sample Text
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function calculateContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  hex = hex.replace('#', '');
  
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function isLightColor(color: string): boolean {
  return getLuminance(color) > 0.5;
}
