# Backblaze B2 Direct Image Upload (Next.js 15 App Router)

A production-ready, high-performance image upload implementation for **Next.js 15** using **Backblaze B2** (S3-compatible object storage) and the **Presigned URL pattern**.

---

## 🌟 Features

- **Presigned PUT URL Pattern**: Client uploads directly to Backblaze B2, eliminating backend memory overhead, execution timeouts, and bandwidth costs.
- **Next.js 15 App Router API**: Fully integrated route handler at `app/api/get-upload-url/route.ts` using `NextRequest` and `NextResponse`.
- **Security & Validation**:
  - Whitelisted MIME types (`image/jpeg`, `image/png`, `image/webp`).
  - Path traversal and character injection sanitization.
  - Collision-proof keys prefixed with UUID and timestamp.
  - Short-lived signed URLs (expires in 5 minutes / 300 seconds).
  - In-memory rate limiting (30 requests/minute per client IP).
  - Master keys (`B2_APPLICATION_KEY`) are never sent to the browser.
- **Modern React Component**:
  - Drag-and-drop dropzone & file browser.
  - Client-side validation with instant image preview.
  - Real-time percentage progress bar via `XMLHttpRequest.upload.onprogress`.
  - Live preview of the uploaded image loaded directly from Backblaze B2.
  - One-click copy for both **Public S3 URL** and **B2 Friendly File URL**.

---

## ⚙️ Environment Variables

Create or update your `.env.local` file in the root directory:

```env
# Backblaze B2 S3-Compatible Credentials
B2_KEY_ID=your_key_id_here
B2_APPLICATION_KEY=your_application_key_here
B2_BUCKET_NAME=your_bucket_name_here
B2_ENDPOINT=s3.us-east-005.backblazeb2.com
B2_REGION=us-east-005
```

> **Note**: For public buckets, make sure your Backblaze B2 bucket access is set to **Public** if you want uploaded files to be accessible directly via public URL.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

The Next.js server will start on [http://localhost:3000](http://localhost:3000).

### 3. Open the Upload Test Page
Navigate to:
```
http://localhost:3000/upload
```

You can drag and drop any image (PNG, JPG, or WebP up to 10MB) and watch it upload directly to your Backblaze B2 bucket.

---

## 🧪 Automated Testing

We have included an automated test suite in `test-upload.js` that tests:
1. Rejection of missing parameters (400 Bad Request)
2. Rejection of invalid MIME types (e.g. `application/pdf` -> 400 Bad Request)
3. Directory traversal sanitization (`../../evil.png` -> sanitized safe key)
4. Presigned URL generation with S3 signature
5. **Live direct HTTP PUT upload to Backblaze B2** using the signed URL to verify credentials and bucket connectivity.

Run the test suite against the running server:
```bash
node test-upload.js
```

---

## 🌐 Backblaze B2 Bucket CORS Configuration

If you upload directly from a browser on a custom domain, configure CORS on your Backblaze B2 bucket:

1. Log in to the [Backblaze B2 Web Console](https://secure.backblaze.com/b2_buckets.htm).
2. Find your bucket -> Click **Bucket Settings** -> **CORS Rules**.
3. Add the following rule (or select "Share everything with every origin" for development):
```json
[
  {
    "corsRuleName": "allow-frontend-uploads",
    "allowedOrigins": [
      "http://localhost:3000",
      "https://yourdomain.com"
    ],
    "allowedOperations": [
      "s3_put",
      "s3_get",
      "s3_head"
    ],
    "allowedHeaders": [
      "*"
    ],
    "exposeHeaders": [
      "ETag"
    ],
    "maxAgeSeconds": 3600
  }
]
```

---

## 📦 Using the Component in Other Pages

You can easily embed `<ImageUploader />` anywhere in your application:

```tsx
import ImageUploader from '@/components/ImageUploader';

export default function ProfilePage() {
  const handleUploadSuccess = (result) => {
    console.log('Uploaded image URL:', result.publicUrl);
    console.log('Storage key:', result.fileKey);
    // Save result.publicUrl to your database (e.g. user profile avatar)
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload Profile Photo</h1>
      <ImageUploader 
        maxSizeMB={5}
        onUploadSuccess={handleUploadSuccess} 
      />
    </div>
  );
}
```
