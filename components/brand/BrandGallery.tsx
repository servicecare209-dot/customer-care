'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { BrandData } from '@/lib/brandData';
import { Camera, Eye, X, ChevronLeft, ChevronRight, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export default function BrandGallery({ brand }: { brand: BrandData }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = brand.gallery || [];
  const activeImage = selectedIndex !== null ? images[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, handlePrev, handleNext]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-navy/5 text-primary-navy font-bold text-xs uppercase tracking-wider mb-4 border border-primary-navy/10 shadow-2xs">
            <Camera size={14} className="text-accent-red" />
            Field Service Gallery
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our <span className="text-primary-navy">{brand.name}</span> Repair &amp; Service Gallery
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Real doorstep technician diagnostics, genuine component replacements, and completed repairs for {brand.name} appliances across India.
          </p>
        </div>

        {/* 2-Row x 3-Column Uniform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/80 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              {/* Image Container with Exact 4:3 Aspect Ratio */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-950/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                
                {/* Category Pill Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="bg-white/95 backdrop-blur-md text-primary-navy text-[11px] font-bold px-3 py-1 rounded-full shadow-sm border border-white/50 flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-accent-red" />
                    {item.category}
                  </span>
                </div>

                {/* Floating Quick-View Icon on Hover */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  <Eye size={15} />
                </div>

                {/* Title In Overlay */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <p className="text-sm sm:text-base font-bold leading-tight drop-shadow-sm">
                    {item.title}
                  </p>
                </div>
              </div>

              {/* Card Footer Text */}
              <div className="p-4 bg-white flex-grow flex flex-col justify-between">
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {item.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* MNC-Grade Fullscreen Immersive Lightbox */}
      <AnimatePresence>
        {activeImage && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Bar: Brand Identifier + Counter + Close Button */}
            <div className="flex items-center justify-between w-full max-w-5xl mx-auto text-white z-20" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold">
                <Sparkles size={13} className="text-accent-red" />
                <span>{brand.name} Service Highlights</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-300 font-mono">{selectedIndex + 1} / {images.length}</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                suppressHydrationWarning
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent-red text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 backdrop-blur-md shadow-lg"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Center Stage: Hero Image with Prev/Next Navigation */}
            <div className="relative flex-1 flex items-center justify-center my-auto w-full max-w-4xl mx-auto py-2">
              
              {/* Previous Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                suppressHydrationWarning
                className="absolute left-0 sm:-left-14 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-gray-900 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Main Image Frame (4:3 Uniform Aspect Ratio) */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-3xl aspect-[4/3] max-h-[66vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                suppressHydrationWarning
                className="absolute right-0 sm:-right-14 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-gray-900 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Floating Frosted Glass Caption & CTA Bar */}
            <div className="w-full max-w-3xl mx-auto z-20" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent-red bg-accent-red/10 px-2 py-0.5 rounded-md border border-accent-red/20">
                      {activeImage.category}
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-xs text-gray-300 font-medium">
                      {brand.name} Appliance Service
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {activeImage.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                    {activeImage.alt}
                  </p>
                </div>

                <a
                  href="tel:+918008070025"
                  className="shrink-0 w-full sm:w-auto text-center bg-accent-red hover:bg-accent-red-hover text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall size={14} />
                  Book This Service
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
