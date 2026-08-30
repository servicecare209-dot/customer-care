'use client';

import { Phone, CalendarCheck } from 'lucide-react';
import { useBookingModal } from '@/context/BookingContext';

export default function MobileStickyCTA() {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] z-40 px-2.5 py-2.5 sm:px-4 sm:py-3 flex gap-2 sm:gap-3">
      <a 
        href="tel:+918008070025" 
        suppressHydrationWarning
        className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-primary-navy active:bg-primary-navy/90 text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-[0.98] min-h-[44px]"
      >
        <Phone size={15} className="shrink-0 text-accent-red" />
        <span className="hidden xs:inline tracking-tight">+91 8008070025</span>
        <span className="xs:hidden tracking-tight">Call Now</span>
      </a>
      <button 
        type="button"
        onClick={() => openBookingModal('General Appliance Repair')}
        suppressHydrationWarning
        className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-accent-red hover:bg-accent-red-hover active:bg-accent-red-hover text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-accent-red/25 transition-transform active:scale-[0.98] cursor-pointer min-h-[44px]"
      >
        <CalendarCheck size={15} className="shrink-0" />
        <span className="tracking-tight whitespace-nowrap">Book Service</span>
      </button>
    </div>
  );
}
