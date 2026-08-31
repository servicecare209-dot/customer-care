import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

/**
 * Allowed MIME types for image uploads
 */
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

const MIME_EXTENSION_MAP: Record<AllowedImageType, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

/**
 * Validates whether the provided MIME type is an allowed image type
 */
export function isValidImageType(type: string): type is AllowedImageType {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(type);
}

/**
 * Sanitizes a file name:
 * 1. Removes path traversal components (e.g., ../ or /)
 * 2. Replaces unsafe characters with underscores
 * 3. Ensures the extension matches the MIME type
 * 4. Prefixes with UUID and timestamp to prevent collisions
 */
export function sanitizeAndGenerateKey(rawFileName: string, fileType: AllowedImageType): string {
  // Extract base filename only
  const baseName = path.basename(rawFileName || 'image');
  
  // Strip non-alphanumeric (except dot, dash, underscore)
  const safeName = baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  // Extract extension or default according to MIME type
  const parsedExt = path.extname(safeName).toLowerCase();
  const validExtensions = MIME_EXTENSION_MAP[fileType];
  const extension = validExtensions.includes(parsedExt) ? parsedExt : validExtensions[0];
  
  // Strip existing extension from base to avoid double extensions like .png.png
  const nameWithoutExt = path.basename(safeName, parsedExt);
  
  // Clean, truncated name component (max 60 chars)
  const cleanName = (nameWithoutExt || 'image').slice(0, 60);
  
  // Unique collision-proof key with timestamp and UUID
  const uniqueId = uuidv4();
  return `uploads/${Date.now()}-${uniqueId}-${cleanName}${extension}`;
}

/**
 * Singleton S3Client configured for Backblaze B2 (S3-compatible)
 */
let s3ClientInstance: S3Client | null = null;

export function getB2Client(): { client: S3Client; bucketName: string; endpoint: string } {
  const keyId = process.env.B2_KEY_ID;
  const applicationKey = process.env.B2_APPLICATION_KEY;
  const bucketName = process.env.B2_BUCKET_NAME;
  const endpoint = process.env.B2_ENDPOINT || 's3.us-east-005.backblazeb2.com';
  
  if (!keyId || !applicationKey || !bucketName) {
    throw new Error(
      'Missing Backblaze B2 credentials. Please set B2_KEY_ID, B2_APPLICATION_KEY, and B2_BUCKET_NAME in .env.local.'
    );
  }

  if (!s3ClientInstance) {
    // Extract region from endpoint (e.g. s3.us-east-005.backblazeb2.com -> us-east-005)
    const regionMatch = endpoint.match(/s3\.([a-z0-9-]+)\.backblazeb2\.com/i);
    const region = process.env.B2_REGION || (regionMatch ? regionMatch[1] : 'us-east-005');

    s3ClientInstance = new S3Client({
      endpoint: `https://${endpoint}`,
      region,
      credentials: {
        accessKeyId: keyId,
        secretAccessKey: applicationKey,
      },
      // Backblaze B2 supports path-style / virtual-host style
      forcePathStyle: false,
    });
  }

  return { client: s3ClientInstance, bucketName, endpoint };
}

/**
 * Generates a presigned PUT URL for direct client-side upload to Backblaze B2
 * @param fileName Original file name
 * @param fileType MIME type (must be in ALLOWED_IMAGE_TYPES)
 * @param expiresIn Expiration time in seconds (default: 300s / 5 mins)
 */
export async function createPresignedUploadUrl({
  fileName,
  fileType,
  expiresIn = 300,
}: {
  fileName: string;
  fileType: string;
  expiresIn?: number;
}) {
  if (!isValidImageType(fileType)) {
    throw new Error(
      `Invalid file type '${fileType}'. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`
    );
  }

  const { client, bucketName, endpoint } = getB2Client();
  const fileKey = sanitizeAndGenerateKey(fileName, fileType);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    ContentType: fileType,
  });

  // Generate 5-minute presigned PUT URL
  const uploadUrl = await getSignedUrl(client, command, { expiresIn });

  // S3 format and B2 Native Friendly download URLs
  const publicUrl = `https://${bucketName}.${endpoint}/${fileKey}`;
  const friendlyUrl = `https://${endpoint}/file/${bucketName}/${fileKey}`;

  return {
    uploadUrl,
    fileKey,
    publicUrl,
    friendlyUrl,
    expiresIn,
    contentType: fileType,
  };
}
