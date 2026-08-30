'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [mobileBrandOpen, setMobileBrandOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  interface NavItem {
    name: string;
    href: string;
    dropdownItems?: { name: string; href: string }[];
  }

  const navLinks: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    {
      name: 'Services by Brand',
      href: '/#services',
      dropdownItems: [
        { name: 'LG', href: '/brand/lg' },
        { name: 'Samsung', href: '/brand/samsung' },
        { name: 'Whirlpool', href: '/brand/whirlpool' },
        { name: 'Bosch', href: '/brand/bosch' },
        { name: 'IFB', href: '/brand/ifb' },
        { name: 'Haier', href: '/brand/haier' },
        { name: 'Hitachi', href: '/brand/hitachi' },
        { name: 'Godrej', href: '/brand/godrej' },
        { name: 'Sony', href: '/brand/sony' },
        { name: 'Panasonic', href: '/brand/panasonic' },
        { name: 'Sharp', href: '/brand/sharp' },
        { name: 'Marq', href: '/brand/marq' },
      ],
    },
    { name: 'Our Services', href: '/#services' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white/95 backdrop-blur-md py-3.5 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <Image 
              src="/images/logo.png"
              alt="Customer Care Logo"
              width={48}
              height={48}
              className="h-8 sm:h-10 w-auto object-contain shrink-0"
              priority
            />
            <span className="font-extrabold text-primary-navy tracking-tight text-lg sm:text-xl md:text-2xl whitespace-nowrap">
              Customer <span className="text-accent-red">Care</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.dropdownItems) {
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => setBrandDropdownOpen(true)}
                    onMouseLeave={() => setBrandDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      suppressHydrationWarning
                      className="flex items-center gap-1 text-gray-600 hover:text-primary-navy font-medium text-sm transition-colors cursor-pointer focus:outline-none"
                      aria-expanded={brandDropdownOpen}
                      aria-haspopup="true"
                      onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          brandDropdownOpen ? 'rotate-180 text-primary-navy' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {brandDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute left-1/2 -translate-x-1/2 mt-4 w-56 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 z-50 overflow-hidden"
                        >
                          <div className="py-2">
                            {link.dropdownItems.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-slate-50 hover:text-primary-navy transition-colors font-medium text-left relative group"
                                onClick={() => setBrandDropdownOpen(false)}
                              >
                                <span className="relative z-10">{item.name}</span>
                                <div className="absolute inset-y-0 left-0 w-1 bg-accent-red scale-y-0 group-hover:scale-y-100 transition-transform origin-left rounded-r-full" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-primary-navy font-medium text-sm transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Call CTA Desktop */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+918008070025"
              suppressHydrationWarning
              className="flex items-center gap-2 bg-accent-red hover:bg-accent-red-hover text-white px-5 py-2.5 rounded-full font-semibold transition-colors shadow-sm shadow-accent-red/20"
            >
              <Phone size={18} />
              <span>+91 8008070025</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <a
              href="tel:+918008070025"
              suppressHydrationWarning
              className="text-accent-red w-9 h-9 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded-full flex items-center justify-center transition-colors shrink-0 shadow-sm"
              aria-label="Call Now"
            >
              <Phone size={18} />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              suppressHydrationWarning
              className="text-primary-navy w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors shrink-0 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay (MNC Grade) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-white flex flex-col md:hidden w-full h-[100dvh] overflow-hidden"
          >
            {/* Drawer Header with Logo & Close Button */}
            <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image 
                  src="/images/logo.png"
                  alt="Customer Care Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto object-contain"
                  priority
                />
                <span className="font-extrabold text-primary-navy tracking-tight text-lg">
                  Customer <span className="text-accent-red">Care</span>
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                suppressHydrationWarning
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-accent-red active:text-white text-gray-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Drawer Body — Scrollable Nav Links */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2 overscroll-contain">
              {navLinks.map((link) => {
                if (link.dropdownItems) {
                  return (
                    <div key={link.name} className="py-1">
                      <button
                        type="button"
                        onClick={() => setMobileBrandOpen(!mobileBrandOpen)}
                        suppressHydrationWarning
                        className="flex items-center justify-between w-full text-left text-gray-800 font-bold text-lg py-2.5 hover:text-accent-red transition-colors focus:outline-none cursor-pointer"
                        aria-expanded={mobileBrandOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-200 text-gray-400 ${
                            mobileBrandOpen ? 'rotate-180 text-accent-red' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileBrandOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-1 pl-2 border-l-2 border-accent-red space-y-1"
                          >
                            <div className="flex flex-col space-y-1.5 py-2">
                              {link.dropdownItems.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center justify-between bg-gray-50 hover:bg-red-50/80 active:bg-red-100 text-gray-800 hover:text-accent-red font-medium py-3 px-3.5 rounded-xl transition-colors text-sm border border-gray-100 min-h-[44px]"
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileBrandOpen(false);
                                  }}
                                >
                                  <span className="font-semibold text-gray-900">{item.name} Support &amp; Service</span>
                                  <ChevronRight size={16} className="text-gray-400 shrink-0" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between text-gray-800 font-bold text-lg py-2.5 hover:text-accent-red transition-colors border-b border-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={18} className="text-gray-300" />
                  </Link>
                );
              })}

              {/* Service Trust Strip */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2.5 text-xs text-gray-500 bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100">
                <ShieldCheck size={18} className="text-primary-navy shrink-0" />
                <span className="font-medium text-gray-700">Verified Technicians • Doorstep Support Across India</span>
              </div>
            </div>

            {/* Drawer Footer — Helpline Number & Operating Hours */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/90 shrink-0 space-y-2.5">
              <a
                href="tel:+918008070025"
                suppressHydrationWarning
                className="flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-navy/95 active:scale-[0.99] text-white px-4 py-3.5 rounded-xl font-bold text-base w-full shadow-md transition-all min-h-[48px]"
              >
                <Phone size={18} className="text-accent-red" />
                <span className="tracking-tight font-extrabold text-white">+91 8008070025</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
                <Clock size={13} className="text-emerald-600" />
                <span>Operational: Mon – Sun: 8:00 AM – 9:00 PM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
