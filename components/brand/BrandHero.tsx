'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Phone, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';
import { BrandData } from '@/lib/brandData';
import BrandHeroForm from './BrandHeroForm';

export default function BrandHero({ brand }: { brand: BrandData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const heroSlides = brand.heroImages && brand.heroImages.length > 0 
    ? brand.heroImages 
    : [{ src: brand.heroImage, alt: `${brand.name} repair service`, tagline: `${brand.name} Certified Diagnostics` }];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  // Auto-play timer with 5-second interval
  useEffect(() => {
    if (isPaused || heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length, nextSlide]);

  // Touch swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section 
      className="relative min-h-[620px] lg:min-h-[660px] flex items-center py-12 sm:py-14 lg:py-16 overflow-hidden bg-gray-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Auto-Sliding Background Carousel */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* High-Contrast Multi-Layer Dark Gradients for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/85 to-gray-900/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/50 z-10" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Headings, Trust Badges & Call CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7"
          >
            {/* Top Brand Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles size={13} className="text-accent-red" />
              <span>Independent {brand.name} Support • India</span>
            </div>
            
            {/* Single H1 Tag */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-4 tracking-tight">
              {brand.title.split(brand.name).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i !== arr.length - 1 && <span className="text-accent-red">{brand.name}</span>}
                </span>
              ))}
            </h1>
            
            {/* Subtext / Value Prop */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-xl">
              {brand.description}
            </p>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mb-7">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs px-3 py-2 rounded-xl border border-white/10 text-white">
                <Clock size={16} className="text-accent-red shrink-0" />
                <span className="text-xs font-semibold leading-tight">30-Min Arrival</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs px-3 py-2 rounded-xl border border-white/10 text-white">
                <ShieldCheck size={16} className="text-green-400 shrink-0" />
                <span className="text-xs font-semibold leading-tight">Genuine Spares</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs px-3 py-2 rounded-xl border border-white/10 text-white">
                <Award size={16} className="text-yellow-400 shrink-0" />
                <span className="text-xs font-semibold leading-tight">30-Day Warranty</span>
              </div>
            </div>
            
            {/* CTA Button & Helpline */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a 
                href="tel:+918008070025" 
                suppressHydrationWarning
                className="group inline-flex items-center justify-center gap-2.5 bg-accent-red hover:bg-accent-red-hover text-white px-7 py-3.5 rounded-xl font-bold text-base transition-all duration-300 shadow-xl shadow-accent-red/25 hover:shadow-accent-red/40 hover:-translate-y-0.5"
              >
                <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                Call Helpline: +91 8008070025
              </a>
              <span className="text-xs text-gray-400 font-medium">
                8:00 AM – 9:00 PM • All 7 Days
              </span>
            </div>
          </motion.div>

          {/* Right Column: Lead Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
          >
            <BrandHeroForm brand={brand} />
          </motion.div>

        </div>

        {/* Bottom Hero Carousel Indicator Dots & Active Slide Chip */}
        {heroSlides.length > 1 && (
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                Technician Highlights:
              </span>
              <span className="text-xs font-bold text-white bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                {heroSlides[currentIndex]?.tagline || heroSlides[currentIndex]?.alt}
              </span>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  suppressHydrationWarning
                  className={`transition-all duration-300 h-2 rounded-full cursor-pointer ${
                    dotIdx === currentIndex 
                      ? 'w-8 bg-accent-red shadow-md shadow-accent-red/50' 
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
