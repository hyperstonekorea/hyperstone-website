/**
 * Client-Safe Image Utilities
 * 
 * Utilities that can be safely imported in client components.
 * Does not include server-only dependencies like 'sharp'.
 */

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Calculate compression ratio
 */
export function calculateCompressionRatio(originalSize: number, compressedSize: number): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}

/**
 * Validate image file type
 */
export function isValidImageType(type: string, allowedFormats: string[]): boolean {
  return allowedFormats.includes(type);
}

/**
 * Validate image file size
 */
export function isValidFileSize(size: number, maxSize: number): boolean {
  return size <= maxSize;
}
