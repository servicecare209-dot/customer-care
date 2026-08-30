'use client';

import { Phone, CalendarCheck } from 'lucide-react';
import { useBookingModal } from '@/context/BookingContext';

export default function MobileStickyCTA() {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 px-4 py-3 flex gap-3">
      <a 
        href="tel:+918008070025" 
        className="flex-1 flex items-center justify-center gap-2 bg-primary-navy text-white py-3 rounded-xl font-bold text-sm shadow-sm"
      >
        <Phone size={16} />
        +91 8008070025
      </a>
      <button 
        type="button"
        onClick={() => openBookingModal('General Appliance Repair')}
        suppressHydrationWarning
        className="flex-1 flex items-center justify-center gap-2 bg-accent-red active:scale-[0.99] text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-accent-red/20 cursor-pointer"
      >
        <CalendarCheck size={16} />
        Book Service
      </button>
    </div>
  );
}
