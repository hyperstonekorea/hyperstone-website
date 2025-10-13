import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { validateAdminAccess, logRequest, RATE_LIMITS } from '@/lib/auth-middleware';
import {
  validateImage,
  optimizeImage,
  getImageMetadata,
  generateSafeFilename,
  calculateCompressionRatio,
  DEFAULT_IMAGE_CONFIG,
} from '@/lib/image-utils';

/**
 * POST /api/admin/upload
 * Upload and optimize images
 * Requirements: 1.2, Security
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // Validate admin access with stricter rate limiting for uploads
  const accessCheck = validateAdminAccess(request, RATE_LIMITS.UPLOAD_IMAGE);
  if (!accessCheck.valid) {
    logRequest(request, '/api/admin/upload', accessCheck.response!.status, Date.now() - startTime);
    return accessCheck.response;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const section = (formData.get('section') as string) || 'general';
    const shouldOptimize = formData.get('optimize') !== 'false'; // Default to true
    const maxWidth = parseInt(formData.get('maxWidth') as string) || DEFAULT_IMAGE_CONFIG.maxWidth;
    const maxHeight = parseInt(formData.get('maxHeight') as string) || DEFAULT_IMAGE_CONFIG.maxHeight;
    const quality = parseInt(formData.get('quality') as string) || DEFAULT_IMAGE_CONFIG.quality;

    // Validate image
    const validation = validateImage(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    // Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(bytes));

    let finalBuffer = buffer;
    let format = file.type.split('/')[1];
    let width = 0;
    let height = 0;
    let originalSize = file.size;
    let optimizedSize = file.size;

    // Optimize image if requested
    if (shouldOptimize) {
      try {
        const optimized = await optimizeImage(buffer, {
          maxWidth,
          maxHeight,
          quality,
          format: DEFAULT_IMAGE_CONFIG.outputFormat,
        });
        
        finalBuffer = optimized.buffer;
        format = optimized.format;
        width = optimized.width;
        height = optimized.height;
        optimizedSize = optimized.size;
      } catch (error) {
        console.error('Optimization failed, using original:', error);
        // Fall back to original if optimization fails
      }
    } else {
      // Get metadata even if not optimizing
      try {
        const metadata = await getImageMetadata(buffer);
        width = metadata.width;
        height = metadata.height;
        format = metadata.format;
      } catch (error) {
        console.error('Failed to read image metadata:', error);
      }
    }

    // Generate filename
    const filename = generateSafeFilename(file.name, section, format);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Save file
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, finalBuffer);

    // Return the public URL and metadata
    const publicUrl = `/uploads/${filename}`;
    const compressionRatio = calculateCompressionRatio(originalSize, optimizedSize);

    const response = NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      url: publicUrl,
      filename: filename,
      metadata: {
        width,
        height,
        format,
        originalSize,
        optimizedSize,
        compressionRatio,
        optimized: shouldOptimize,
      },
    });
    
    logRequest(request, '/api/admin/upload', 200, Date.now() - startTime);
    return response;
  } catch (error) {
    console.error('File upload error:', error);
    const response = NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'File upload failed',
      },
      { status: 500 }
    );
    
    logRequest(request, '/api/admin/upload', 500, Date.now() - startTime);
    return response;
  }
}