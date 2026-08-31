import { S3Client, PutObjectCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
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
  const baseName = path.basename(rawFileName || 'image');
  const safeName = baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  const parsedExt = path.extname(safeName).toLowerCase();
  const validExtensions = MIME_EXTENSION_MAP[fileType];
  const extension = validExtensions.includes(parsedExt) ? parsedExt : validExtensions[0];
  
  const nameWithoutExt = path.basename(safeName, parsedExt);
  const cleanName = (nameWithoutExt || 'image').slice(0, 60);
  
  const uniqueId = uuidv4();
  return `uploads/${Date.now()}-${uniqueId}-${cleanName}${extension}`;
}

/**
 * Returns S3Client configured for Backblaze B2 (S3-compatible)
 */
let s3ClientInstance: S3Client | null = null;

export function getB2Client(): { client: S3Client; bucketName: string; endpoint: string; region: string } {
  const keyId = process.env.B2_KEY_ID;
  const applicationKey = process.env.B2_APPLICATION_KEY;
  const bucketName = process.env.B2_BUCKET_NAME;
  const endpoint = process.env.B2_ENDPOINT || 's3.us-east-005.backblazeb2.com';
  
  if (!keyId || !applicationKey || !bucketName) {
    throw new Error(
      'Missing Backblaze B2 credentials in .env.local (B2_KEY_ID, B2_APPLICATION_KEY, or B2_BUCKET_NAME).'
    );
  }

  const regionMatch = endpoint.match(/s3\.([a-z0-9-]+)\.backblazeb2\.com/i);
  const region = process.env.B2_REGION || (regionMatch ? regionMatch[1] : 'us-east-005');

  if (!s3ClientInstance) {
    s3ClientInstance = new S3Client({
      endpoint: `https://${endpoint}`,
      region,
      credentials: {
        accessKeyId: keyId,
        secretAccessKey: applicationKey,
      },
      forcePathStyle: true, // Path-style ensures maximum compatibility across all B2 regions and bucket names
    });
  }

  return { client: s3ClientInstance, bucketName, endpoint, region };
}

/**
 * Diagnostic helper to test credentials and bucket access
 */
export async function testB2Connection(): Promise<{
  connected: boolean;
  bucketExists: boolean;
  bucketName: string;
  endpoint: string;
  error?: string;
  recommendation?: string;
}> {
  try {
    const { client, bucketName, endpoint } = getB2Client();
    
    try {
      await client.send(new HeadBucketCommand({ Bucket: bucketName }));
      return {
        connected: true,
        bucketExists: true,
        bucketName,
        endpoint,
      };
    } catch (err: any) {
      const errorMsg = err.message || '';
      let recommendation = 'Check your Backblaze B2 Bucket Settings and permissions.';

      if (err.name === 'NoSuchBucket' || err.name === 'NotFound' || errorMsg.includes('does not exist')) {
        recommendation = `The bucket '${bucketName}' does not exist in region '${process.env.B2_REGION || 'us-east-005'}'. Check Backblaze B2 dashboard to get the exact Bucket Name.`;
      } else if (err.name === 'Forbidden' || err.name === 'AccessDenied' || errorMsg.includes('Access Denied')) {
        recommendation = 'Your B2 Application Key does not have permission to access this bucket. Create an Application Key with Read/Write access to this bucket.';
      }

      return {
        connected: false,
        bucketExists: false,
        bucketName,
        endpoint,
        error: `${err.name || 'Error'}: ${err.message || 'Bucket not found or inaccessible'}`,
        recommendation,
      };
    }
  } catch (initErr: any) {
    return {
      connected: false,
      bucketExists: false,
      bucketName: process.env.B2_BUCKET_NAME || 'undefined',
      endpoint: process.env.B2_ENDPOINT || 'undefined',
      error: initErr.message,
      recommendation: 'Check that .env.local contains valid B2_KEY_ID, B2_APPLICATION_KEY, and B2_BUCKET_NAME.',
    };
  }
}

/**
 * Generates a presigned PUT URL for direct client-side upload to Backblaze B2
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

  const uploadUrl = await getSignedUrl(client, command, { expiresIn });

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

/**
 * Server-Side Direct Upload (Fallback Strategy)
 * Uploads directly from server buffer to B2 without CORS restrictions
 */
export async function uploadBufferDirectlyToB2({
  buffer,
  fileName,
  fileType,
}: {
  buffer: Buffer | Uint8Array;
  fileName: string;
  fileType: string;
}) {
  if (!isValidImageType(fileType)) {
    throw new Error(
      `Invalid file type '${fileType}'. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`
    );
  }

  const { client, bucketName, endpoint } = getB2Client();
  const fileKey = sanitizeAndGenerateKey(fileName, fileType as AllowedImageType);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: buffer,
    ContentType: fileType,
  });

  await client.send(command);

  const publicUrl = `https://${bucketName}.${endpoint}/${fileKey}`;
  const friendlyUrl = `https://${endpoint}/file/${bucketName}/${fileKey}`;

  return {
    fileKey,
    publicUrl,
    friendlyUrl,
    contentType: fileType,
    uploadMethod: 'server-proxy-fallback',
  };
}
