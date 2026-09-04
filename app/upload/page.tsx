import React from 'react';
import type { Metadata } from 'next';
import ImageUploader from '@/components/ImageUploader';
import { 
  CloudUpload, 
  Zap, 
  Terminal, 
  Layers, 
  Lock
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Backblaze B2 Direct Image Upload Demo | Next.js 15',
  description: 'Production-ready presigned URL direct-to-storage image upload feature for Backblaze B2 S3 storage.',
};

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary-navy font-semibold text-xs tracking-wider uppercase">
            <CloudUpload size={16} className="text-primary-navy" />
            Backblaze B2 S3 Storage
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Direct-to-B2 Image Uploader
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
            Secure presigned URL pattern. The backend issues a short-lived authorization token, and your browser streams the file directly to Backblaze B2 object storage.
          </p>
        </div>

        {/* The React Upload Component */}
        <section className="relative">
          <ImageUploader maxSizeMB={10} />
        </section>

        {/* How It Works & Architecture Overview */}
        <section className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Layers className="text-primary-navy" size={24} />
            <h2 className="text-xl font-bold text-gray-900">How the Presigned URL Pattern Works</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-primary-navy flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Request Upload URL</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Frontend sends <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-[11px]">fileName</code> and <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-[11px]">fileType</code> to Next.js API <code className="text-primary-navy font-mono text-[11px]">/api/get-upload-url</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Validate &amp; Sign</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Backend sanitizes the filename, prevents directory traversal, checks rate limits, and signs a 5-minute AWS S3 PUT URL.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Direct B2 Stream</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Browser executes a direct HTTP <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-[11px]">PUT</code> to Backblaze B2, bypassing your application server completely.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
              <Lock className="text-primary-navy mt-0.5 shrink-0" size={18} />
              <div className="text-xs text-gray-700">
                <strong className="text-gray-900 block font-semibold">Zero Secret Exposure:</strong>
                Application Keys and Master Credentials never reach the browser or client-side JavaScript.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
              <Zap className="text-emerald-700 mt-0.5 shrink-0" size={18} />
              <div className="text-xs text-gray-700">
                <strong className="text-gray-900 block font-semibold">Zero Server Bandwidth Load:</strong>
                High-resolution images don&apos;t consume your Vercel/Node.js memory, execution limits, or bandwidth.
              </div>
            </div>
          </div>
        </section>

        {/* API Endpoint & Curl Verification Info */}
        <section className="bg-gray-900 text-gray-100 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
            <Terminal size={16} />
            <span>API TEST ENDPOINT</span>
          </div>

          <p className="text-xs text-gray-300">
            You can also test the API route directly via curl or any API client:
          </p>

          <pre className="bg-black/50 p-4 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto border border-gray-800">
{`curl -X POST http://localhost:3000/api/get-upload-url \\
  -H "Content-Type: application/json" \\
  -d '{"fileName": "sample-avatar.png", "fileType": "image/png"}'`}
          </pre>

          <div className="text-xs text-gray-400 pt-2 flex items-center justify-between">
            <span>Allowed MIME Types: <code className="text-gray-200">image/jpeg</code>, <code className="text-gray-200">image/png</code>, <code className="text-gray-200">image/webp</code></span>
            <span>Expiry: 300s (5 mins)</span>
          </div>
        </section>

        {/* Return to Home */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-navy hover:underline"
          >
            <span>&larr; Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
