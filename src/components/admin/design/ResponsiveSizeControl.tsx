'use client';

import { ResponsiveSize } from '@/lib/design/types';

interface ResponsiveSizeControlProps {
  value: ResponsiveSize;
  onChange: (size: ResponsiveSize) => void;
  label?: string;
  unit?: 'px' | 'rem' | 'em' | '%';
  min?: number;
  max?: number;
}

export default function ResponsiveSizeControl({
  value,
  onChange,
  label = 'Size',
  unit = 'rem',
  min,
  max
}: ResponsiveSizeControlProps) {
  const handleChange = (device: keyof ResponsiveSize, newValue: string) => {
    onChange({
      ...value,
      [device]: newValue
    });
  };

  const validateValue = (val: string): boolean => {
    const numericValue = parseFloat(val);
    if (isNaN(numericValue)) return false;
    if (min !== undefined && numericValue < min) return false;
    if (max !== undefined && numericValue > max) return false;
    return true;
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="grid grid-cols-3 gap-3">
        {/* Mobile */}
        <div>
          <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Mobile
          </label>
          <input
            type="text"
            value={value.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            placeholder={`1${unit}`}
            className={`w-full px-2 py-1.5 text-sm border rounded ${
              validateValue(value.mobile) ? 'border-gray-300' : 'border-red-300'
            }`}
          />
        </div>

        {/* Tablet */}
        <div>
          <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Tablet
          </label>
          <input
            type="text"
            value={value.tablet}
            onChange={(e) => handleChange('tablet', e.target.value)}
            placeholder={`1.125${unit}`}
            className={`w-full px-2 py-1.5 text-sm border rounded ${
              validateValue(value.tablet) ? 'border-gray-300' : 'border-red-300'
            }`}
          />
        </div>

        {/* Desktop */}
        <div>
          <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
            </svg>
            Desktop
          </label>
          <input
            type="text"
            value={value.desktop}
            onChange={(e) => handleChange('desktop', e.target.value)}
            placeholder={`1.25${unit}`}
            className={`w-full px-2 py-1.5 text-sm border rounded ${
              validateValue(value.desktop) ? 'border-gray-300' : 'border-red-300'
            }`}
          />
        </div>
      </div>

      {/* Validation hints */}
      {(min !== undefined || max !== undefined) && (
        <div className="text-xs text-gray-500">
          {min !== undefined && max !== undefined && (
            <span>Valid range: {min}{unit} - {max}{unit}</span>
          )}
          {min !== undefined && max === undefined && (
            <span>Minimum: {min}{unit}</span>
          )}
          {min === undefined && max !== undefined && (
            <span>Maximum: {max}{unit}</span>
          )}
        </div>
      )}

      {/* Quick presets */}
      <div className="flex gap-2">
        <button
          onClick={() => onChange({
            mobile: `1${unit}`,
            tablet: `1${unit}`,
            desktop: `1${unit}`
          })}
          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          Same for all
        </button>
        <button
          onClick={() => onChange({
            mobile: `0.875${unit}`,
            tablet: `1${unit}`,
            desktop: `1.125${unit}`
          })}
          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          Progressive
        </button>
      </div>
    </div>
  );
}
