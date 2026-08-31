/**
 * Automated Test Script for Backblaze B2 Presigned Upload API & Direct S3 Upload
 * Run with: node test-upload.js
 */

import dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env
dotenv.config({ path: resolve(process.cwd(), '.env') });

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

// 1x1 Transparent PNG buffer for live test
const SAMPLE_PNG_BUFFER = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

async function runTests() {
  console.log('='.repeat(60));
  console.log('  BACKBLAZE B2 PRESIGNED URL & UPLOAD VERIFICATION SUITE');
  console.log('='.repeat(60));
  console.log(`Target URL: ${BASE_URL}\n`);

  let totalPassed = 0;
  let totalTests = 0;

  async function testCase(name, fn) {
    totalTests++;
    process.stdout.write(`[TEST ${totalTests}] ${name} ... `);
    try {
      await fn();
      console.log('✅ PASS');
      totalPassed++;
    } catch (err) {
      console.log(`❌ FAIL`);
      console.error(`   Error: ${err.message}\n`);
    }
  }

  // TEST 1: Missing fileName or fileType
  await testCase('Reject missing parameters (400)', async () => {
    const res = await fetch(`${BASE_URL}/api/get-upload-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const data = await res.json();
    if (res.status !== 400 || data.success !== false) {
      throw new Error(`Expected 400, got ${res.status}: ${JSON.stringify(data)}`);
    }
  });

  // TEST 2: Disallowed MIME Type
  await testCase('Reject disallowed MIME type application/pdf (400)', async () => {
    const res = await fetch(`${BASE_URL}/api/get-upload-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: 'document.pdf',
        fileType: 'application/pdf',
      }),
    });

    const data = await res.json();
    if (res.status !== 400 || data.success !== false) {
      throw new Error(`Expected 400, got ${res.status}: ${JSON.stringify(data)}`);
    }
  });

  // TEST 3: Path Traversal Sanitization
  await testCase('Sanitize directory traversal from fileName', async () => {
    const res = await fetch(`${BASE_URL}/api/get-upload-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: '../../../../etc/malicious_photo.png',
        fileType: 'image/png',
      }),
    });

    const data = await res.json();
    if (res.status !== 200 || !data.success) {
      throw new Error(`Expected 200, got ${res.status}: ${JSON.stringify(data)}`);
    }

    if (data.fileKey.includes('..') || data.fileKey.includes('/etc/')) {
      throw new Error(`Path traversal was not sanitized properly! Key: ${data.fileKey}`);
    }
  });

  // TEST 4: Generate Valid Presigned PUT URL for Image (PNG)
  let presignedData = null;
  await testCase('Generate valid presigned URL for image/png', async () => {
    const res = await fetch(`${BASE_URL}/api/get-upload-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: 'test-profile-avatar.png',
        fileType: 'image/png',
        fileSize: SAMPLE_PNG_BUFFER.length,
      }),
    });

    presignedData = await res.json();
    if (res.status !== 200 || !presignedData.success) {
      throw new Error(`API failed with status ${res.status}: ${JSON.stringify(presignedData)}`);
    }

    if (!presignedData.uploadUrl || !presignedData.uploadUrl.startsWith('https://')) {
      throw new Error(`Invalid uploadUrl returned: ${presignedData.uploadUrl}`);
    }

    if (!presignedData.publicUrl || !presignedData.fileKey) {
      throw new Error(`Missing publicUrl or fileKey in response`);
    }
  });

  // TEST 5: Direct HTTP PUT to Backblaze B2 using the Presigned URL
  await testCase('Direct HTTP PUT stream to Backblaze B2 using presigned URL', async () => {
    if (!presignedData || !presignedData.uploadUrl) {
      throw new Error('No presigned URL available from previous test');
    }

    console.log(`\n   -> Uploading to B2 object: ${presignedData.fileKey}`);

    const uploadRes = await fetch(presignedData.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png',
      },
      body: SAMPLE_PNG_BUFFER,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text().catch(() => '');
      throw new Error(`B2 direct PUT failed with HTTP status ${uploadRes.status}: ${errText}`);
    }

    console.log(`   -> Upload verified successfully! Status: ${uploadRes.status}`);
    console.log(`   -> Public S3 URL: ${presignedData.publicUrl}`);
    console.log(`   -> B2 Friendly URL: ${presignedData.friendlyUrl}`);
  });

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`TEST RESULTS: ${totalPassed}/${totalTests} tests passed (${Math.round((totalPassed/totalTests)*100)}%)`);
  console.log('='.repeat(60));

  if (totalPassed !== totalTests) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
