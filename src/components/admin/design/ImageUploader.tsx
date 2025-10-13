'use client';

import { useState, useRef } from 'react';
import { formatFileSize } from '@/lib/image-utils';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  section?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  buttonText?: string;
  showPreview?: boolean;
}

interface UploadMetadata {
  width: number;
  height: number;
  format: string;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: string;
  optimized: boolean;
}

export default function ImageUploader({
  onUpload,
  section = 'general',
  maxWidth,
  maxHeight,
  quality,
  buttonText = 'Upload Image',
  showPreview = true,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<UploadMetadata | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    setMetadata(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('section', section);
      
      if (maxWidth) formData.append('maxWidth', maxWidth.toString());
      if (maxHeight) formData.append('maxHeight', maxHeight.toString());
      if (quality) formData.append('quality', quality.toString());

      // Upload
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Upload failed');
      }

      // Set metadata and preview
      setMetadata(result.metadata);
      setPreviewUrl(result.url);
      
      // Call onUpload callback
      onUpload(result.url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {/* Upload button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={uploading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            uploading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {uploading ? 'Uploading...' : buttonText}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Success message with metadata */}
      {metadata && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg space-y-2">
          <p className="text-sm font-medium text-green-800">Upload successful!</p>
          <div className="text-xs text-green-700 space-y-1">
            <div className="flex justify-between">
              <span>Dimensions:</span>
              <span className="font-medium">{metadata.width} × {metadata.height}px</span>
            </div>
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="font-medium uppercase">{metadata.format}</span>
            </div>
            <div className="flex justify-between">
              <span>Original size:</span>
              <span className="font-medium">{formatFileSize(metadata.originalSize)}</span>
            </div>
            {metadata.optimized && (
              <>
                <div className="flex justify-between">
                  <span>Optimized size:</span>
                  <span className="font-medium">{formatFileSize(metadata.optimizedSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Compression:</span>
                  <span className="font-medium text-green-600">{metadata.compressionRatio}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Preview */}
      {showPreview && previewUrl && (
        <div className="space-y-2">
          <label className="block text-xs text-gray-600">Preview</label>
          <div className="relative rounded-lg overflow-hidden border border-gray-300">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="w-full h-32 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
