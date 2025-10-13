'use client';

import { ResponsiveSize } from '@/lib/design/types';

interface SpacingControlProps {
  value: ResponsiveSize;
  onChange: (spacing: ResponsiveSize) => void;
  label?: string;
  type?: 'padding' | 'margin';
}

export default function SpacingControl({
  value,
  onChange,
  label,
  type = 'padding'
}: SpacingControlProps) {
  const displayLabel = label || (type === 'padding' ? 'Padding' : 'Margin');

  const handleChange = (device: keyof ResponsiveSize, newValue: string) => {
    onChange({
      ...value,
      [device]: newValue
    });
  };

  const presets = [
    { label: 'None', value: '0' },
    { label: 'Small', value: type === 'padding' ? '1rem' : '0.5rem' },
    { label: 'Medium', value: type === 'padding' ? '2rem' : '1rem' },
    { label: 'Large', value: type === 'padding' ? '4rem' : '2rem' }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{displayLabel}</label>

      <div className="grid grid-cols-3 gap-3">
        {/* Mobile */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Mobile</label>
          <input
            type="text"
            value={value.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            placeholder="1rem"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded"
          />
        </div>

        {/* Tablet */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Tablet</label>
          <input
            type="text"
            value={value.tablet}
            onChange={(e) => handleChange('tablet', e.target.value)}
            placeholder="2rem"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded"
          />
        </div>

        {/* Desktop */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Desktop</label>
          <input
            type="text"
            value={value.desktop}
            onChange={(e) => handleChange('desktop', e.target.value)}
            placeholder="4rem"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Presets */}
      <div>
        <label className="block text-xs text-gray-600 mb-2">Quick Presets</label>
        <div className="flex gap-2">
          {presets.map(preset => (
            <button
              key={preset.label}
              onClick={() => onChange({
                mobile: preset.value,
                tablet: preset.value,
                desktop: preset.value
              })}
              className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Help text */}
      <div className="text-xs text-gray-500">
        <p>Examples: 1rem, 2rem 1rem, 1rem 2rem 1rem 2rem (top right bottom left)</p>
      </div>
    </div>
  );
}
