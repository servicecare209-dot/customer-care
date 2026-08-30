'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        // Show after a brief delay so page loads smoothly
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie_consent', 'accepted');
    } catch {}
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('cookie_consent', 'essential_only');
    } catch {}
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-gray-200/90 text-gray-800"
          role="region"
          aria-label="Cookie consent banner"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-primary-navy flex items-center justify-center shrink-0">
                <Cookie size={20} />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Cookie & Privacy Notice</h3>
            </div>
            <button
              onClick={handleDecline}
              aria-label="Close cookie banner"
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            We use cookies and third-party advertising tools (including Google Ads & Analytics) to enhance your browsing experience and analyze site traffic. Read our{' '}
            <Link href="/cookie-policy" className="text-primary-navy font-semibold underline hover:text-accent-red">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-primary-navy font-semibold underline hover:text-accent-red">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 bg-primary-navy hover:bg-primary-navy-light text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 px-3.5 rounded-xl transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
