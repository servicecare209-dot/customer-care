import { NextRequest, NextResponse } from 'next/server';
import { uploadBufferDirectlyToB2, ALLOWED_IMAGE_TYPES, isValidImageType } from '@/lib/b2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'No file provided in form data. Field name must be "file".',
        },
        { status: 400 }
      );
    }

    const fileType = file.type.toLowerCase().trim();
    if (!isValidImageType(fileType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Disallowed format "${file.type}". Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Max 10MB limit
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
        },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload directly from server to B2
    const uploadResult = await uploadBufferDirectlyToB2({
      buffer,
      fileName: file.name,
      fileType,
    });

    return NextResponse.json({
      success: true,
      ...uploadResult,
      message: 'Image uploaded successfully via fallback server proxy.',
    });
  } catch (error: any) {
    console.error('[API /api/upload-fallback] Error:', error);
    
    let userMessage = error.message || 'Server-side upload failed.';
    let recommendation = '';

    if (error.name === 'NoSuchBucket' || userMessage.includes('does not exist')) {
      userMessage = `Backblaze B2 Bucket '${process.env.B2_BUCKET_NAME}' does not exist.`;
      recommendation = 'Please check your B2_BUCKET_NAME in .env.local.';
    } else if (error.name === 'InvalidAccessKeyId' || error.name === 'SignatureDoesNotMatch') {
      userMessage = 'Invalid Backblaze B2 credentials.';
      recommendation = 'Please verify B2_KEY_ID and B2_APPLICATION_KEY in .env.local.';
    }

    return NextResponse.json(
      {
        success: false,
        error: userMessage,
        recommendation,
        details: error.name,
      },
      { status: 500 }
    );
  }
}
