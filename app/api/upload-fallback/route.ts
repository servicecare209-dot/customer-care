import { NextRequest, NextResponse } from 'next/server';
import { ALLOWED_IMAGE_TYPES, isValidImageType } from '@/lib/b2';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate safe file name
    const ext = path.extname(file.name) || (fileType === 'image/png' ? '.png' : fileType === 'image/webp' ? '.webp' : '.jpg');
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40) || 'image';
    const uniqueFileName = `${Date.now()}-${uuidv4().slice(0, 8)}-${baseName}${ext}`;
    const targetFilePath = path.join(uploadsDir, uniqueFileName);

    // Save locally to public/uploads
    await fs.promises.writeFile(targetFilePath, buffer);

    // Determine base URL
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const origin = `${protocol}://${host}`;

    const localRelativeUrl = `/uploads/${uniqueFileName}`;
    const fullPublicUrl = `${origin}${localRelativeUrl}`;

    return NextResponse.json({
      success: true,
      fileKey: `uploads/${uniqueFileName}`,
      publicUrl: fullPublicUrl,
      friendlyUrl: localRelativeUrl,
      contentType: fileType,
      uploadMethod: 'free-local-storage',
      message: 'Image uploaded and saved successfully (100% Free - No Card Required)!',
    });
  } catch (error: any) {
    console.error('[API /api/upload-fallback] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Server-side upload failed.',
      },
      { status: 500 }
    );
  }
}

