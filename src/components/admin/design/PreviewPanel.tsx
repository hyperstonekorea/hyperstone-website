'use client';

import { useState, useRef } from 'react';
import { DesignSettings } from '@/lib/design/types';

type DeviceSize = 'mobile' | 'tablet' | 'desktop';

interface PreviewPanelProps {
  settings: DesignSettings;
  previewUrl?: string;
}

const DEVICE_SIZES = {
  mobile: { width: 375, height: 667, label: '📱 Mobile' },
  tablet: { width: 768, height: 1024, label: '📱 Tablet' },
  desktop: { width: 1440, height: 900, label: '🖥️ Desktop' }
};

export default function PreviewPanel({ settings, previewUrl = '/' }: PreviewPanelProps) {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPreviewKey(prev => prev + 1);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const currentDevice = DEVICE_SIZES[deviceSize];

  // Build preview URL with settings as query parameter
  const buildPreviewUrl = () => {
    const baseUrl = previewUrl;
    const params = new URLSearchParams({
      preview: 'true',
      settings: JSON.stringify(settings),
      timestamp: Date.now().toString()
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        <div className="flex items-center gap-3">
          {/* Device Size Toggles */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(Object.keys(DEVICE_SIZES) as DeviceSize[]).map((size) => (
              <button
                key={size}
                onClick={() => setDeviceSize(size)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  deviceSize === size
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title={DEVICE_SIZES[size].label}
              >
                {DEVICE_SIZES[size].label}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
            title="Refresh preview"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-8">
        <div
          className="bg-white shadow-2xl transition-all duration-300 ease-in-out"
          style={{
            width: `${currentDevice.width}px`,
            height: `${currentDevice.height}px`,
            maxWidth: '100%',
            maxHeight: '70vh'
          }}
        >
          {/* Loading Overlay */}
          {isRefreshing && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-gray-600">Refreshing preview...</div>
            </div>
          )}

          {/* Preview iframe */}
          <iframe
            key={previewKey}
            ref={iframeRef}
            src={buildPreviewUrl()}
            className="w-full h-full border-0"
            title="Design Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      {/* Device Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        {currentDevice.width} × {currentDevice.height}px
      </div>
    </div>
  );
}
