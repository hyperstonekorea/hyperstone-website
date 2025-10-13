'use client';

import { useState } from 'react';

interface ShadowControlProps {
  value: string;
  onChange: (shadow: string) => void;
  label?: string;
}

const SHADOW_PRESETS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  { label: 'Medium', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  { label: 'Large', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
  { label: 'XL', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
  { label: 'Inner', value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' }
];

export default function ShadowControl({
  value,
  onChange,
  label = 'Shadow'
}: ShadowControlProps) {
  const [customMode, setCustomMode] = useState(
    !SHADOW_PRESETS.some(preset => preset.value === value)
  );

  const handlePresetClick = (presetValue: string) => {
    setCustomMode(false);
    onChange(presetValue);
  };

  const handleCustomChange = (newValue: string) => {
    setCustomMode(true);
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Presets */}
      <div>
        <label className="block text-xs text-gray-600 mb-2">Presets</label>
        <div className="grid grid-cols-3 gap-2">
          {SHADOW_PRESETS.map(preset => (
            <button
              key={preset.label}
              onClick={() => handlePresetClick(preset.value)}
              className={`px-3 py-2 text-xs rounded transition-all ${
                !customMode && value === preset.value
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 hover:border-gray-400'
              }`}
              style={{
                boxShadow: preset.value !== 'none' ? preset.value : undefined
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Custom Shadow</label>
        <input
          type="text"
          value={value}
          onChange={(e) => handleCustomChange(e.target.value)}
          placeholder="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded font-mono"
        />
      </div>

      {/* Preview */}
      <div className="mt-4">
        <label className="block text-xs text-gray-600 mb-2">Preview</label>
        <div className="p-8 bg-gray-50 rounded-lg flex items-center justify-center">
          <div
            className="w-32 h-32 bg-white rounded-lg flex items-center justify-center"
            style={{ boxShadow: value !== 'none' ? value : undefined }}
          >
            <span className="text-xs text-gray-500">Shadow</span>
          </div>
        </div>
      </div>

      {/* Help text */}
      <div className="text-xs text-gray-500">
        <p>Format: offset-x offset-y blur-radius spread-radius color</p>
        <p className="mt-1">Example: 0 4px 6px -1px rgba(0, 0, 0, 0.1)</p>
      </div>
    </div>
  );
}
