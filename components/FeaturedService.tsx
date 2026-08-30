'use client';

import Image from 'next/image';
import { CheckCircle2, CalendarCheck } from 'lucide-react';
import { useBookingModal } from '@/context/BookingContext';

export default function FeaturedService() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gray-200" />
              <Image 
                src="/images/featured.jpg" 
                alt="Washing machine repair service"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative background shape */}
            <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-accent-red font-semibold text-xs tracking-wider uppercase mb-6">
              Featured Service
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-navy leading-tight mb-6">
              Washing Machine Repair at Your Doorstep
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Having trouble with your washing machine? Get professional assistance from trained service technicians without the hassle of visiting a service center.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700 font-medium">Professional diagnosis</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700 font-medium">Doorstep assistance</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700 font-medium">Convenient booking</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700 font-medium">Transparent service process</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => openBookingModal('Washing Machine Repair')}
              suppressHydrationWarning
              className="flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-navy-light active:scale-[0.99] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all w-full sm:w-auto shadow-lg shadow-primary-navy/20 cursor-pointer"
            >
              <CalendarCheck size={20} />
              Book Washing Machine Service
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
