'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white/95 backdrop-blur-md py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group transition-transform group-hover:scale-105">
          <Image 
            src="/images/logo.png"
            alt="Customer Care Logo"
            width={60}
            height={60}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="font-bold text-primary-navy tracking-tight text-lg sm:text-xl md:text-2xl whitespace-nowrap">
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

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <a
            href="tel:+918008070025"
            suppressHydrationWarning
            className="text-accent-red p-2 bg-red-50 rounded-full"
            aria-label="Call Now"
          >
            <Phone size={20} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            suppressHydrationWarning
            className="text-primary-navy p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            <div className="px-4 py-4 space-y-4 shadow-xl">
              {navLinks.map((link) => {
                if (link.dropdownItems) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <button
                        onClick={() => setMobileBrandOpen(!mobileBrandOpen)}
                        suppressHydrationWarning
                        className="flex items-center justify-between w-full text-left text-gray-700 font-medium py-2 hover:text-primary-navy transition-colors focus:outline-none"
                        aria-expanded={mobileBrandOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            mobileBrandOpen ? 'rotate-180 text-primary-navy' : 'text-gray-400'
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileBrandOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-2 space-y-1 overflow-hidden mt-1 ml-2 border-l-2 border-slate-100"
                          >
                            {link.dropdownItems.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block text-gray-500 font-medium py-2 pl-4 hover:text-primary-navy transition-colors text-sm"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileBrandOpen(false);
                                }}
                              >
                                {item.name}
                              </Link>
                            ))}
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
                    className="block text-gray-700 font-medium py-2 hover:text-primary-navy transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="tel:+918008070025"
                  suppressHydrationWarning
                  className="flex items-center justify-center gap-2 bg-primary-navy text-white px-5 py-3 rounded-xl font-semibold w-full"
                >
                  <Phone size={18} />
                  <span>+91 8008070025</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
