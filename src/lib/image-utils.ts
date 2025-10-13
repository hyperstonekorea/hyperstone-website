/**
 * Image Utilities
 * 
 * Provides reusable functions for image validation, optimization, and processing.
 */

import sharp from 'sharp';

export interface ImageConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  maxFileSize: number;
  allowedFormats: string[];
  outputFormat: 'webp' | 'jpeg' | 'png';
}

export interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export interface OptimizationResult {
  buffer: Buffer<ArrayBuffer>;
  format: string;
  width: number;
  height: number;
  size: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
}

// Default configuration
export const DEFAULT_IMAGE_CONFIG: ImageConfig = {
  maxWidth: 2400,
  maxHeight: 2400,
  quality: 85,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  outputFormat: 'webp',
};

/**
 * Validate image file
 */
export function validateImage(
  file: File,
  config: ImageConfig = DEFAULT_IMAGE_CONFIG
): ValidationResult {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!config.allowedFormats.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file format. Allowed: ${config.allowedFormats.join(', ')}`,
    };
  }

  if (file.size > config.maxFileSize) {
    const maxSizeMB = config.maxFileSize / (1024 * 1024);
    return {
      valid: false,
      error: `File size exceeds maximum of ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Optimize image using sharp
 */
export async function optimizeImage(
  buffer: Buffer,
  options: OptimizationOptions = {}
): Promise<OptimizationResult> {
  const {
    maxWidth = DEFAULT_IMAGE_CONFIG.maxWidth,
    maxHeight = DEFAULT_IMAGE_CONFIG.maxHeight,
    quality = DEFAULT_IMAGE_CONFIG.quality,
    format = DEFAULT_IMAGE_CONFIG.outputFormat,
  } = options;

  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Resize if image exceeds max dimensions
    let resized = image;
    if (metadata.width && metadata.height) {
      if (metadata.width > maxWidth || metadata.height > maxHeight) {
        resized = image.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }
    }

    // Convert to specified format with quality compression
    let optimized;
    switch (format) {
      case 'webp':
        optimized = resized.webp({ quality });
        break;
      case 'jpeg':
        optimized = resized.jpeg({ quality, mozjpeg: true });
        break;
      case 'png':
        optimized = resized.png({ quality, compressionLevel: 9 });
        break;
      default:
        optimized = resized.webp({ quality });
    }

    const optimizedBuffer = await optimized.toBuffer();
    const optimizedMetadata = await sharp(optimizedBuffer).metadata();

    return {
      buffer: optimizedBuffer as Buffer<ArrayBuffer>,
      format,
      width: optimizedMetadata.width || 0,
      height: optimizedMetadata.height || 0,
      size: optimizedBuffer.length,
    };
  } catch (error) {
    console.error('Image optimization error:', error);
    throw new Error('Failed to optimize image');
  }
}

/**
 * Get image metadata without optimization
 */
export async function getImageMetadata(buffer: Buffer): Promise<ImageMetadata> {
  try {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || 'unknown',
      size: buffer.length,
    };
  } catch (error) {
    console.error('Failed to read image metadata:', error);
    throw new Error('Failed to read image metadata');
  }
}

/**
 * Generate safe filename
 */
export function generateSafeFilename(
  originalName: string,
  prefix: string = '',
  format?: string
): string {
  const timestamp = Date.now();
  const sanitized = originalName
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[^a-zA-Z0-9-]/g, '_') // Replace special chars
    .substring(0, 50); // Limit length

  const ext = format || originalName.split('.').pop() || 'jpg';
  const prefixPart = prefix ? `${prefix}_` : '';

  return `${prefixPart}${timestamp}_${sanitized}.${ext}`;
}

/**
 * Calculate compression ratio
 */
export function calculateCompressionRatio(
  originalSize: number,
  optimizedSize: number
): string {
  if (originalSize === 0) return '0%';
  const ratio = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
  return `${ratio}%`;
}

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
 * Resize image to specific dimensions
 */
export async function resizeImage(
  buffer: Buffer,
  width: number,
  height: number,
  options: {
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): Promise<OptimizationResult> {
  const {
    fit = 'cover',
    quality = DEFAULT_IMAGE_CONFIG.quality,
    format = DEFAULT_IMAGE_CONFIG.outputFormat,
  } = options;

  try {
    let resized = sharp(buffer).resize(width, height, { fit });

    // Apply format
    switch (format) {
      case 'webp':
        resized = resized.webp({ quality });
        break;
      case 'jpeg':
        resized = resized.jpeg({ quality, mozjpeg: true });
        break;
      case 'png':
        resized = resized.png({ quality, compressionLevel: 9 });
        break;
    }

    const resultBuffer = await resized.toBuffer();
    const metadata = await sharp(resultBuffer).metadata();

    return {
      buffer: resultBuffer as Buffer<ArrayBuffer>,
      format,
      width: metadata.width || width,
      height: metadata.height || height,
      size: resultBuffer.length,
    };
  } catch (error) {
    console.error('Image resize error:', error);
    throw new Error('Failed to resize image');
  }
}

/**
 * Create thumbnail from image
 */
export async function createThumbnail(
  buffer: Buffer,
  size: number = 200,
  options: {
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): Promise<OptimizationResult> {
  return resizeImage(buffer, size, size, {
    fit: 'cover',
    ...options,
  });
}

/**
 * Convert image format
 */
export async function convertImageFormat(
  buffer: Buffer,
  format: 'webp' | 'jpeg' | 'png',
  quality: number = DEFAULT_IMAGE_CONFIG.quality
): Promise<OptimizationResult> {
  try {
    let converter = sharp(buffer);

    switch (format) {
      case 'webp':
        converter = converter.webp({ quality });
        break;
      case 'jpeg':
        converter = converter.jpeg({ quality, mozjpeg: true });
        break;
      case 'png':
        converter = converter.png({ quality, compressionLevel: 9 });
        break;
    }

    const resultBuffer = await converter.toBuffer();
    const metadata = await sharp(resultBuffer).metadata();

    return {
      buffer: resultBuffer as Buffer<ArrayBuffer>,
      format,
      width: metadata.width || 0,
      height: metadata.height || 0,
      size: resultBuffer.length,
    };
  } catch (error) {
    console.error('Image format conversion error:', error);
    throw new Error('Failed to convert image format');
  }
}
