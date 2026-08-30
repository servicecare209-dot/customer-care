'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { useBookingModal } from '@/context/BookingContext';

export default function Footer() {
  const { openBookingModal } = useBookingModal();

  const services = [
    { name: 'Washing Machine Repair', serviceKey: 'Washing Machine Repair' },
    { name: 'Refrigerator Service', serviceKey: 'Refrigerator Service' },
    { name: 'Air Conditioner Repair', serviceKey: 'Air Conditioner Repair' },
    { name: 'Microwave Oven Repair', serviceKey: 'Microwave Oven Repair' },
    { name: 'LED / LCD TV Repair', serviceKey: 'LED/LCD TV Repair' },
    { name: 'Other Home Appliances', serviceKey: 'Other Appliances Repair' },
  ];

  const topBrands = [
    { name: 'LG Support', href: '/brand/lg' },
    { name: 'Samsung Support', href: '/brand/samsung' },
    { name: 'Whirlpool Support', href: '/brand/whirlpool' },
    { name: 'Bosch Support', href: '/brand/bosch' },
    { name: 'IFB Support', href: '/brand/ifb' },
    { name: 'Sony TV Support', href: '/brand/sony' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12 lg:mb-0 mb-20 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-navy via-accent-red to-primary-navy opacity-80" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          
          {/* Brand Col (Col 1) */}
          <div className="lg:col-span-2 pr-0 lg:pr-6">
            <Link href="/" className="flex items-center gap-3 group mb-6 inline-block">
              <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105 origin-left">
                <Image 
                  src="/images/logo.png"
                  alt="Customer Care Logo"
                  width={60}
                  height={60}
                  className="h-11 w-auto object-contain"
                  priority
                />
                <span className="font-extrabold text-primary-navy tracking-tight text-2xl">
                  Customer <span className="text-accent-red">Care</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
              We are India&apos;s premier out-of-warranty home appliance repair network operated by <strong>Aksha Traders</strong>. Certified technicians delivered directly to your doorstep across Delhi NCR for transparent, reliable service.
            </p>
            
            <div className="mb-4 text-xs text-gray-500 space-y-0.5">
              <p><strong>Office:</strong> 1009, Shiv Colony, Old Faridabad, Haryana 121002</p>
              <p><strong>GSTIN:</strong> 06DHFPA5392N2Z0</p>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3.5 rounded-2xl border border-gray-100 max-w-sm">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-primary-navy" size={20} />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-900">100% Satisfaction Guarantee</p>
                <p className="text-[11px] text-gray-500">Verified Technicians • 30-Day Warranty</p>
              </div>
            </div>
          </div>
          
          {/* Quick Links (Col 2) */}
          <div>
            <h4 className="font-extrabold text-gray-900 mb-5 text-base relative inline-block">
              Company
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-accent-red rounded-full"></span>
            </h4>
            <ul className="space-y-3 mt-3 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Services', href: '/#services' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'FAQ', href: '/#faq' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-accent-red font-medium transition-all duration-200 flex items-center group py-0.5"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 mr-1 text-accent-red shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Repair Services (Col 3) */}
          <div>
            <h4 className="font-extrabold text-gray-900 mb-5 text-base relative inline-block">
              Repair Services
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-accent-red rounded-full"></span>
            </h4>
            <ul className="space-y-3 mt-3 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    type="button"
                    onClick={() => openBookingModal(service.serviceKey)}
                    className="text-left text-gray-600 hover:text-accent-red font-medium transition-all duration-200 flex items-center group py-0.5 cursor-pointer w-full"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 mr-1 text-accent-red shrink-0" />
                    <span>{service.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Brands (Col 4) */}
          <div>
            <h4 className="font-extrabold text-gray-900 mb-5 text-base relative inline-block">
              Brand Support
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-accent-red rounded-full"></span>
            </h4>
            <ul className="space-y-3 mt-3 text-sm">
              {topBrands.map((brand) => (
                <li key={brand.name}>
                  <Link
                    href={brand.href}
                    className="text-gray-600 hover:text-accent-red font-medium transition-all duration-200 flex items-center group py-0.5"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 mr-1 text-accent-red shrink-0" />
                    <span>{brand.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Contact Strip Banner */}
        <div id="contact" className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-accent-red">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Helpline Number</p>
              <a href="tel:+918008070025" className="text-gray-900 font-bold hover:text-accent-red transition-colors text-base">
                +91 8008070025
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-primary-navy">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email Assistance</p>
              <a href="mailto:support@customercarerepaircenter.com" className="text-gray-900 font-bold hover:text-primary-navy transition-colors text-sm break-all">
                support@customercarerepaircenter.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Working Hours</p>
              <p className="text-gray-900 font-bold text-sm">
                Mon - Sun: 8:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright and compliance legal links */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-gray-500 font-medium text-center md:text-left">
            © {new Date().getFullYear()} Customer Care Appliance Repair. All rights reserved. Independent Out-of-Warranty Service.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-semibold">
            <Link href="/privacy-policy" className="text-gray-600 hover:text-accent-red transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-gray-600 hover:text-accent-red transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/disclaimer" className="text-gray-600 hover:text-accent-red transition-colors">
              Disclaimer
            </Link>
            <Link href="/cookie-policy" className="text-gray-600 hover:text-accent-red transition-colors">
              Cookie Policy
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-accent-red transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
