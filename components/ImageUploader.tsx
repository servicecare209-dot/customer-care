'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  Loader2, 
  FileImage,
  RefreshCw,
  ShieldCheck,
  Code2,
  Image as ImageIcon,
  Trash2,
  Sparkles
} from 'lucide-react';

export interface UploadedMediaItem {
  id: string;
  name: string;
  publicUrl: string;
  friendlyUrl: string;
  fileKey: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface UploadResult {
  uploadUrl: string;
  fileKey: string;
  publicUrl: string;
  friendlyUrl: string;
  expiresIn: number;
}

interface ImageUploaderProps {
  onUploadSuccess?: (result: UploadResult) => void;
  maxSizeMB?: number;
  className?: string;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function ImageUploader({
  onUploadSuccess,
  maxSizeMB = 10,
  className = '',
}: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<'idle' | 'requesting-url' | 'uploading-b2' | 'completed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'next' | 'url' | 'html' | 'markdown'>('url');
  
  // Media library stored in localStorage
  const [mediaLibrary, setMediaLibrary] = useState<UploadedMediaItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentXhrRef = useRef<XMLHttpRequest | null>(null);

  // Load previously uploaded images from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('b2_uploaded_media');
      if (stored) {
        setMediaLibrary(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read uploaded media from localStorage', e);
    }
  }, []);

  const saveToMediaLibrary = (newItem: UploadedMediaItem) => {
    try {
      const updated = [newItem, ...mediaLibrary.filter(item => item.fileKey !== newItem.fileKey)].slice(0, 30);
      setMediaLibrary(updated);
      localStorage.setItem('b2_uploaded_media', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const removeFromMediaLibrary = (id: string) => {
    try {
      const updated = mediaLibrary.filter(item => item.id !== id);
      setMediaLibrary(updated);
      localStorage.setItem('b2_uploaded_media', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not update localStorage', e);
    }
  };

  const cleanupPreview = useCallback(() => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Invalid format (${file.type || 'unknown'}). Allowed: JPG, PNG, WebP.`;
    }
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the ${maxSizeMB} MB limit.`;
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    cleanupPreview();
    setErrorMessage(null);
    setUploadResult(null);
    setUploadProgress(0);
    setUploadStage('idle');

    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleCancelUpload = () => {
    if (currentXhrRef.current) {
      currentXhrRef.current.abort();
      currentXhrRef.current = null;
    }
    setIsUploading(false);
    setUploadStage('idle');
    setUploadProgress(0);
  };

  const handleReset = () => {
    handleCancelUpload();
    cleanupPreview();
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadResult(null);
    setErrorMessage(null);
    setUploadProgress(0);
    setUploadStage('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage(null);
    setUploadProgress(0);
    setUploadStage('requesting-url');

    try {
      // Step 1: Request presigned PUT URL from our Next.js API route
      const response = await fetch('/api/get-upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileSize: selectedFile.size,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Server returned ${response.status}: Failed to get upload authorization`);
      }

      const { uploadUrl, fileKey, publicUrl, friendlyUrl, expiresIn } = data;

      // Step 2: Upload directly to Backblaze B2 using presigned PUT URL
      setUploadStage('uploading-b2');

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        currentXhrRef.current = xhr;

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          currentXhrRef.current = null;
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(
              new Error(
                `Direct upload to Backblaze B2 failed (HTTP ${xhr.status}). ${
                  xhr.status === 404
                    ? 'Bucket not found. Check B2_BUCKET_NAME in .env.local.'
                    : 'Check B2 bucket CORS & S3 Put permissions.'
                }`
              )
            );
          }
        };

        xhr.onerror = () => {
          currentXhrRef.current = null;
          reject(
            new Error(
              'Network error during direct upload to Backblaze B2. Check bucket CORS configuration in B2 console.'
            )
          );
        };

        xhr.onabort = () => {
          currentXhrRef.current = null;
          reject(new Error('Upload cancelled.'));
        };

        xhr.open('PUT', uploadUrl, true);
        xhr.setRequestHeader('Content-Type', selectedFile.type);
        xhr.send(selectedFile);
      });

      // Step 3: Successfully completed
      const resultObj: UploadResult = {
        uploadUrl,
        fileKey,
        publicUrl,
        friendlyUrl,
        expiresIn,
      };

      setUploadResult(resultObj);
      setUploadStage('completed');
      setIsUploading(false);
      setUploadProgress(100);

      // Save to media history
      const newMediaItem: UploadedMediaItem = {
        id: fileKey,
        name: selectedFile.name,
        publicUrl,
        friendlyUrl,
        fileKey,
        size: selectedFile.size,
        type: selectedFile.type,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      saveToMediaLibrary(newMediaItem);

      if (onUploadSuccess) {
        onUploadSuccess(resultObj);
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setIsUploading(false);
      setUploadStage('error');
      setErrorMessage(err.message || 'An unexpected error occurred during upload.');
    }
  };

  const copyToClipboard = async (text: string, copyKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(copyKey);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const getSnippetCode = (url: string, type: 'url' | 'next' | 'html' | 'markdown', altName = 'Image') => {
    switch (type) {
      case 'url':
        return url;
      case 'next':
        return `<Image \n  src="${url}" \n  alt="${altName}" \n  width={600} \n  height={400} \n  className="rounded-xl object-cover" \n/>`;
      case 'html':
        return `<img src="${url}" alt="${altName}" class="rounded-xl" />`;
      case 'markdown':
        return `![${altName}](${url})`;
      default:
        return url;
    }
  };

  return (
    <div className={`space-y-8 w-full max-w-2xl mx-auto ${className}`}>
      {/* Main Upload Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-blue-950/5 p-6 sm:p-8 transition-all">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary-navy">
              <UploadCloud size={22} className="text-primary-navy" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Upload Image &amp; Get Link</h2>
              <p className="text-xs text-gray-500">Backblaze B2 Direct Storage</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary-navy text-xs font-semibold">
            <ShieldCheck size={14} className="text-accent-red" />
            <span>Presigned S3</span>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleInputChange}
          className="hidden"
          id="b2-file-input"
          disabled={isUploading}
        />

        {/* Upload Box / Dropzone */}
        {!selectedFile && (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-primary-navy bg-blue-50/50 scale-[1.01]'
                : 'border-gray-300 hover:border-primary-navy/70 hover:bg-gray-50/70'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-primary-navy shadow-sm">
              <FileImage size={28} />
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-1">
              Click to select an image or drag &amp; drop here
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Supports JPG, PNG, and WebP (Up to {maxSizeMB} MB)
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-navy text-white text-xs font-semibold shadow-md shadow-primary-navy/15 hover:bg-primary-navy-light transition-all">
              <UploadCloud size={16} />
              <span>Browse Image from PC</span>
            </div>
          </div>
        )}

        {/* File Selected & Preview Mode */}
        {selectedFile && uploadStage !== 'completed' && (
          <div className="space-y-5">
            <div className="relative flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
              {previewUrl && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate" title={selectedFile.name}>
                  {selectedFile.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-mono uppercase px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                    {selectedFile.type.split('/')[1]}
                  </span>
                </div>
              </div>
              {!isUploading && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-2 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center justify-between text-xs font-medium text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <Loader2 size={14} className="animate-spin text-primary-navy" />
                    {uploadStage === 'requesting-url' && 'Getting secure upload authorization...'}
                    {uploadStage === 'uploading-b2' && `Streaming directly to Backblaze B2 (${uploadProgress}%)`}
                  </span>
                  <span className="font-mono font-bold text-primary-navy">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-primary-navy h-2.5 rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {!isUploading ? (
                <>
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-navy-light text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-primary-navy/20 active:scale-[0.99] cursor-pointer"
                  >
                    <UploadCloud size={18} />
                    <span>Upload &amp; Generate Link</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-3.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleCancelUpload}
                  className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer"
                >
                  <X size={16} />
                  <span>Cancel Upload</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Success State & Link Usage Generator */}
        {uploadStage === 'completed' && uploadResult && (
          <div className="space-y-6 animate-fade-up">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-emerald-900">Image Uploaded Successfully!</h3>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Link generated. Copy the URL or code snippet below to use anywhere on your website.
                </p>
              </div>
            </div>

            {/* Live Uploaded Image Preview */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-4">
              <div className="relative w-full h-52 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadResult.publicUrl}
                  alt="Uploaded image preview"
                  className="max-h-full max-w-full object-contain rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = uploadResult.friendlyUrl;
                  }}
                />
              </div>

              {/* Code Snippet Tabs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Use In Your Website:
                  </span>
                  <div className="flex bg-gray-200/80 p-1 rounded-lg gap-1">
                    <button
                      type="button"
                      onClick={() => setActiveSnippetTab('url')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        activeSnippetTab === 'url' ? 'bg-white text-primary-navy shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Direct URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSnippetTab('next')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        activeSnippetTab === 'next' ? 'bg-white text-primary-navy shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Next.js &lt;Image /&gt;
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSnippetTab('html')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        activeSnippetTab === 'html' ? 'bg-white text-primary-navy shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      HTML &lt;img&gt;
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSnippetTab('markdown')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        activeSnippetTab === 'markdown' ? 'bg-white text-primary-navy shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Markdown
                    </button>
                  </div>
                </div>

                {/* Snippet Display Box with One-Click Copy */}
                <div className="relative">
                  <pre className="p-3.5 bg-gray-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto border border-gray-800 whitespace-pre-wrap break-all pr-24">
                    {getSnippetCode(uploadResult.publicUrl, activeSnippetTab, selectedFile?.name || 'Image')}
                  </pre>
                  <div className="absolute right-2 top-2 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(getSnippetCode(uploadResult.publicUrl, activeSnippetTab, selectedFile?.name || 'Image'), 'main-snippet')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
                    >
                      {copiedId === 'main-snippet' ? (
                        <>
                          <Check size={14} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <a
                      href={uploadResult.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                      title="Open image in new tab"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500">
                  Tip: Direct URL can be used in your components, CSS backgrounds, database records, or image tags.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer"
            >
              <RefreshCw size={16} />
              <span>Upload Another Image</span>
            </button>
          </div>
        )}

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 animate-fade-up">
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-red-900">Upload Failed</h4>
              <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-700 p-1 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Uploaded Images Gallery / Media Library */}
      {mediaLibrary.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <ImageIcon className="text-primary-navy" size={20} />
              <h3 className="font-bold text-gray-900 text-base">Your Uploaded Media Library</h3>
              <span className="text-xs bg-blue-100 text-primary-navy font-semibold px-2 py-0.5 rounded-full">
                {mediaLibrary.length}
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">Click any image to copy its URL</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mediaLibrary.map((item) => (
              <div 
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-primary-navy/40 hover:shadow-sm transition-all group"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.publicUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.friendlyUrl;
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-gray-900 truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {(item.size / (1024 * 1024)).toFixed(2)} MB • {item.uploadedAt}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.publicUrl, item.id)}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-primary-navy hover:border-primary-navy/40 transition-all cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? (
                      <Check size={14} className="text-emerald-600" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                  <a
                    href={item.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 transition-all"
                    title="Open in new tab"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => removeFromMediaLibrary(item.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 transition-all cursor-pointer"
                    title="Remove from history"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Website Integration Guide */}
      <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl border border-blue-100 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-primary-navy font-bold text-sm">
          <Sparkles size={18} className="text-accent-red" />
          <span>How to use this link on your website</span>
        </div>

        <div className="space-y-3 text-xs text-gray-700">
          <p>
            Once you upload any image here, you get a <strong>permanent public Backblaze B2 link</strong>. You can use it anywhere in your code:
          </p>

          <div className="bg-white p-4 rounded-xl border border-blue-100 space-y-2 font-mono text-[11px] text-gray-800">
            <span className="text-gray-400 block">// Example 1: In your Next.js Page or Component</span>
            <span className="text-purple-700">import</span> Image <span className="text-purple-700">from</span> <span className="text-emerald-700">&apos;next/image&apos;</span>;
            <br /><br />
            <span className="text-blue-700">&lt;Image</span>
            <br />&nbsp;&nbsp;src=<span className="text-emerald-700">&quot;https://my-app-key.s3.us-east-005.backblazeb2.com/uploads/...&quot;</span>
            <br />&nbsp;&nbsp;alt=<span className="text-emerald-700">&quot;Appliance Service Banner&quot;</span>
            <br />&nbsp;&nbsp;width=&#123;800&#125;
            <br />&nbsp;&nbsp;height=&#123;500&#125;
            <br /><span className="text-blue-700">/&gt;</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-blue-100 space-y-2 font-mono text-[11px] text-gray-800">
            <span className="text-gray-400 block">// Example 2: In brandData.ts or database objects</span>
            image: <span className="text-emerald-700">&apos;https://my-app-key.s3.us-east-005.backblazeb2.com/uploads/...&apos;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
