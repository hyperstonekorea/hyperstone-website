'use client';

import { useState, useEffect } from 'react';
import { FontConfig, FontOption } from '@/lib/design/types';

interface FontSelectorProps {
  value: FontConfig;
  onChange: (config: FontConfig) => void;
  label?: string;
  showWeights?: boolean;
  showSizes?: boolean;
}

export default function FontSelector({
  value,
  onChange,
  label = 'Font',
  showWeights = true,
  showSizes = true
}: FontSelectorProps) {
  const [fonts, setFonts] = useState<FontOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      const response = await fetch('/api/admin/fonts');
      const data = await response.json();
      setFonts(data.fonts || []);
    } catch (error) {
      console.error('Failed to load fonts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFonts = fonts.filter(font => {
    const matchesSearch = font.family.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedFont = fonts.find(f => f.family === value.family);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Search and filter */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search fonts..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All</option>
          <option value="sans-serif">Sans Serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="display">Display</option>
        </select>
      </div>

      {/* Font family selector */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Font Family</label>
        {loading ? (
          <div className="text-sm text-gray-500">Loading fonts...</div>
        ) : (
          <select
            value={value.family}
            onChange={(e) => {
              const font = fonts.find(f => f.family === e.target.value);
              if (font) {
                onChange({
                  ...value,
                  family: font.family,
                  source: font.source,
                  weight: Array.isArray(font.weights) && font.weights.length > 0 
                    ? font.weights[0] 
                    : 400
                });
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {filteredFonts.map(font => (
              <option key={font.family} value={font.family}>
                {font.family} ({font.source})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Weight selector */}
      {showWeights && selectedFont && (
        <div>
          <label className="block text-xs text-gray-600 mb-1">Font Weight</label>
          <select
            value={value.weight}
            onChange={(e) => onChange({ ...value, weight: isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {selectedFont.weights.map(weight => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Size controls */}
      {showSizes && (
        <div className="space-y-2">
          <label className="block text-xs text-gray-600">Font Size</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Mobile</label>
              <input
                type="text"
                value={value.size.mobile}
                onChange={(e) => onChange({
                  ...value,
                  size: { ...value.size, mobile: e.target.value }
                })}
                placeholder="1rem"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Tablet</label>
              <input
                type="text"
                value={value.size.tablet}
                onChange={(e) => onChange({
                  ...value,
                  size: { ...value.size, tablet: e.target.value }
                })}
                placeholder="1.125rem"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Desktop</label>
              <input
                type="text"
                value={value.size.desktop}
                onChange={(e) => onChange({
                  ...value,
                  size: { ...value.size, desktop: e.target.value }
                })}
                placeholder="1.25rem"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="mt-4">
        <label className="block text-xs text-gray-600 mb-2">Preview</label>
        <div
          className="p-4 border border-gray-300 rounded-lg space-y-2"
          style={{
            fontFamily: value.family,
            fontWeight: value.weight,
            fontSize: value.size.desktop
          }}
        >
          <div>The quick brown fox jumps over the lazy dog</div>
          <div>빠른 갈색 여우가 게으른 개를 뛰어넘습니다</div>
          <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div>0123456789 !@#$%^&*()</div>
        </div>
      </div>
    </div>
  );
}
