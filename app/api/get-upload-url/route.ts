import { NextRequest, NextResponse } from 'next/server';
import { createPresignedUploadUrl, ALLOWED_IMAGE_TYPES, isValidImageType } from '@/lib/b2';

// In-memory rate limiting store: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 presigned URLs per minute per IP

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetInSec: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - record.count,
    resetInSec: Math.ceil((record.resetTime - now) / 1000),
  };
}

export async function POST(request: NextRequest) {
  try {
    // 1. Client IP Detection & Rate Limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1';

    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit exceeded. Please wait ${rateLimit.resetInSec} seconds before requesting another upload URL.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetInSec),
            'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // 2. Parse & Validate JSON Payload
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON request body. Expected { fileName: string, fileType: string }',
        },
        { status: 400 }
      );
    }

    const { fileName, fileType, fileSize } = body || {};

    // Validate fileName
    if (!fileName || typeof fileName !== 'string' || fileName.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid "fileName". A non-empty string is required.',
        },
        { status: 400 }
      );
    }

    if (fileName.length > 255) {
      return NextResponse.json(
        {
          success: false,
          error: 'File name is too long. Maximum allowed length is 255 characters.',
        },
        { status: 400 }
      );
    }

    // Validate fileType
    if (!fileType || typeof fileType !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: `Missing "fileType". Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const normalizedFileType = fileType.toLowerCase().trim();
    if (!isValidImageType(normalizedFileType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type "${fileType}". Only image formats (${ALLOWED_IMAGE_TYPES.join(', ')}) are supported.`,
          allowedTypes: ALLOWED_IMAGE_TYPES,
        },
        { status: 400 }
      );
    }

    // Optional fileSize validation (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (typeof fileSize === 'number' && fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 10MB limit. Provided size: ${(fileSize / (1024 * 1024)).toFixed(2)}MB.`,
        },
        { status: 400 }
      );
    }

    // 3. Generate Presigned PUT URL
    const presignedData = await createPresignedUploadUrl({
      fileName: fileName.trim(),
      fileType: normalizedFileType,
      expiresIn: 300, // 5 minutes expiration
    });

    return NextResponse.json(
      {
        success: true,
        ...presignedData,
        message: 'Presigned upload URL generated successfully. Upload directly using HTTP PUT.',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  } catch (error: any) {
    console.error('[API /api/get-upload-url] Error generating presigned URL:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate presigned upload URL. Please check server configuration.',
      },
      { status: 500 }
    );
  }
}
