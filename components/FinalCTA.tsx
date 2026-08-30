'use client';

import { Phone, CalendarCheck } from 'lucide-react';
import { useBookingModal } from '@/context/BookingContext';

export default function FinalCTA() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-20 sm:py-24 bg-primary-navy relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-red rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
          Need Appliance Repair? <br className="hidden sm:block" />
          <span className="text-accent-red">We're Ready to Help.</span>
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Contact our customer care team for instant doorstep service assistance today.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openBookingModal('General Appliance Repair')}
            suppressHydrationWarning
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent-red hover:bg-accent-red-hover active:scale-[0.99] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-accent-red/25 hover:shadow-accent-red/40 hover:-translate-y-0.5 cursor-pointer"
          >
            <CalendarCheck size={20} />
            Book a Service
          </button>
          <a 
            href="tel:+918008070025" 
            suppressHydrationWarning
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm hover:-translate-y-0.5"
          >
            <Phone size={20} />
            +91 8008070025
          </a>
        </div>
      </div>
    </section>
  );
}
