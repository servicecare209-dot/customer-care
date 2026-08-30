'use client';

import Image from 'next/image';
import { ShieldCheck, PhoneCall, CalendarCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useBookingModal } from '@/context/BookingContext';

export default function Hero() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background-soft via-white to-gray-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary-navy font-semibold text-xs tracking-wider uppercase mb-6">
              <ShieldCheck size={16} className="text-accent-red" />
              Trusted Home Appliance Service
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-navy leading-tight mb-6">
              Doorstep Appliance Repair &amp; Service in <span className="text-accent-red relative inline-block">
                Delhi NCR
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-red/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              Fast, reliable and professional repair services for washing machines, refrigerators, air conditioners, microwaves, and TVs across Delhi, Noida, Gurgaon, Ghaziabad &amp; Faridabad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                type="button"
                onClick={() => openBookingModal('General Appliance Repair')}
                suppressHydrationWarning
                className="flex items-center justify-center gap-2 bg-accent-red hover:bg-accent-red-hover active:scale-[0.99] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-accent-red/25 hover:shadow-accent-red/40 hover:-translate-y-0.5 cursor-pointer"
              >
                <CalendarCheck size={20} />
                Book a Service
              </button>
              <a href="tel:+918008070025" className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-primary-navy text-primary-navy px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-gray-50">
                <PhoneCall size={20} />
                +91 8008070025
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                Professional Technicians
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                Doorstep Service
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                Transparent Pricing
              </div>
            </div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              {/* Fallback pattern if image is missing */}
              <div className="absolute inset-0 bg-gray-200" />
              <Image 
                src="/images/hero.jpg" 
                alt="Professional Indian technician repairing washing machine" 
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-4 left-4 sm:bottom-8 sm:-left-12 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-100 max-w-[180px] sm:max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-navy">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="font-bold text-primary-navy leading-tight">Professional Service</p>
              <p className="text-xs text-gray-500 mt-1">Trusted by Homeowners</p>
            </motion.div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-red-50 rounded-full blur-2xl" />
            <div className="absolute -z-10 -bottom-10 right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
