'use client';

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  X, 
  ChevronDown, 
  CheckCircle, 
  Loader2, 
  CalendarCheck, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Check, 
  Wrench, 
  Wind, 
  Flame, 
  Tv, 
  Sparkles,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBookingModal } from '@/context/BookingContext';
import { brandBookingSchema, BrandBookingFormData } from '@/lib/validations/bookingSchema';

interface ServiceOptionItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const serviceItems: ServiceOptionItem[] = [
  { 
    name: 'Washing Machine Repair', 
    category: 'Front/Top Load & Semi-Automatic',
    icon: <Wrench size={14} className="text-accent-red" /> 
  },
  { 
    name: 'Refrigerator Service', 
    category: 'Single/Double Door & Side-by-Side',
    icon: <Sparkles size={14} className="text-blue-600" /> 
  },
  { 
    name: 'Air Conditioner Repair', 
    category: 'Split, Window & Inverter AC',
    icon: <Wind size={14} className="text-cyan-600" /> 
  },
  { 
    name: 'Microwave Oven Repair', 
    category: 'Convection, Grill & Solo',
    icon: <Flame size={14} className="text-amber-600" /> 
  },
  { 
    name: 'LED/LCD TV Repair', 
    category: 'Smart TV, 4K & OLED/QLED Displays',
    icon: <Tv size={14} className="text-purple-600" /> 
  },
  { 
    name: 'Other Appliances Repair', 
    category: 'Chimney, Hob & Kitchen Appliances',
    icon: <Layers size={14} className="text-gray-600" /> 
  },
];

export default function BookingModal() {
  const { modalState, closeBookingModal } = useBookingModal();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BrandBookingFormData>({
    resolver: zodResolver(brandBookingSchema),
    defaultValues: {
      brand: modalState.brand || 'General',
      name: '',
      email: '',
      phone: '',
      address: '',
      service: modalState.service || serviceItems[0].name,
    },
  });

  const selectedServiceName = watch('service') || modalState.service || serviceItems[0].name;
  const activeServiceItem = serviceItems.find((s) => s.name === selectedServiceName) || serviceItems[0];

  // Sync selected service / brand when modal opens
  useEffect(() => {
    if (modalState.isOpen) {
      setIsSuccess(false);
      setServerError(null);
      setDropdownOpen(false);
      if (modalState.service) {
        setValue('service', modalState.service, { shouldValidate: true });
      }
      if (modalState.brand) {
        setValue('brand', modalState.brand);
      }
    }
  }, [modalState.isOpen, modalState.service, modalState.brand, setValue]);

  // Click outside to close custom dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Lock background scroll & listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalState.isOpen) {
        if (dropdownOpen) {
          setDropdownOpen(false);
        } else {
          closeBookingModal();
        }
      }
    };

    if (modalState.isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalState.isOpen, dropdownOpen, closeBookingModal]);

  const onSubmit = async (data: BrandBookingFormData) => {
    setServerError(null);
    try {
      // 1. Post lead data to backend API for Google Sheets webhook recording
      try {
        await fetch('/api/book-service', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            brand: data.brand || modalState.brand || 'General',
            source: 'Booking Modal (Direct CTA)',
          }),
        });
      } catch (e) {
        console.error('API logging notice:', e);
      }

      // 2. Format clean WhatsApp Message for instant technician dispatch
      const whatsappNumber = '918008070025';
      const textMessage = [
        `*NEW APPLIANCE SERVICE BOOKING*`,
        `----------------------------------------`,
        `*Service:* ${data.service}`,
        `*Brand:* ${data.brand || modalState.brand || 'General'}`,
        ``,
        `*Customer Information:*`,
        `*Name:* ${data.name}`,
        `*Phone:* ${data.phone}`,
        `*Email:* ${data.email}`,
        `*Address:* ${data.address}`,
        `----------------------------------------`,
        `_Source: Customer Care India Website_`,
      ].join('\n');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

      // 3. Open WhatsApp in background
      if (typeof window !== 'undefined') window.open(whatsappUrl, '_blank');

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please call us directly.');
    }
  };

  return (
    <AnimatePresence>
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookingModal}
            className="fixed inset-0 bg-gray-950/75 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Card — Sleek, Compact Premium Bottom Sheet / Centered Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col my-0 sm:my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Header: Compact Navy Banner */}
            <div className="bg-primary-navy px-4 py-3 sm:px-5 sm:py-3.5 text-white shrink-0 relative">
              {/* Mobile Drag Indicator */}
              <div className="w-8 h-1 bg-white/25 rounded-full mx-auto mb-1.5 sm:hidden" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center text-accent-red shrink-0 shadow-inner">
                    <CalendarCheck size={16} />
                  </div>
                  <div>
                    <h3 id="modal-title" className="text-sm sm:text-base font-bold tracking-tight text-white leading-snug">
                      Book Doorstep Service
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-blue-100/85 flex items-center gap-1 font-normal">
                      <Clock size={10} className="text-accent-red shrink-0" />
                      <span>30-min callback in India</span>
                    </p>
                  </div>
                </div>

                {/* Compact Close Button */}
                <button
                  type="button"
                  onClick={closeBookingModal}
                  suppressHydrationWarning
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-accent-red text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 focus:outline-none"
                  aria-label="Close dialog"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* 2. Success State View */}
            {isSuccess ? (
              <div className="p-5 sm:p-6 text-center space-y-3.5 overflow-y-auto flex-1">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle size={28} />
                </div>
                <h4 className="text-lg font-bold text-gray-900">
                  Booking Request Sent!
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                  Thank you! Our verified appliance service technician will call you within 30 minutes to confirm your appointment.
                </p>
                
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                  <a
                    href="tel:+918008070025"
                    className="inline-flex items-center justify-center gap-2 bg-accent-red hover:bg-accent-red-hover text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-accent-red/20 transition-all min-h-[40px]"
                  >
                    <Phone size={14} />
                    Call +91 8008070025
                  </a>
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    suppressHydrationWarning
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors min-h-[40px] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* 3. Compact Form Body & Anchored Footer */
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden" noValidate suppressHydrationWarning>
                
                {/* Scrollable Input Fields Area with Tight, Refined Margins */}
                <div className="p-3.5 sm:p-4 overflow-y-auto overscroll-contain flex-1 space-y-2.5">
                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-red-700 text-xs font-medium">
                      {serverError}
                    </div>
                  )}

                  {/* Hidden field registered for form validation */}
                  <input type="hidden" {...register('service')} />

                  {/* Custom Luxury Appliance Dropdown Selector */}
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-[10px] sm:text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Appliance Type *
                    </label>

                    {/* Custom Dropdown Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      suppressHydrationWarning
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                      className={`w-full bg-gray-50/70 hover:bg-white active:bg-white text-gray-900 rounded-xl px-3 py-2 border ${
                        errors.service 
                          ? 'border-red-400 ring-1 ring-red-200' 
                          : dropdownOpen 
                            ? 'border-primary-navy ring-1 ring-primary-navy/20 bg-white' 
                            : 'border-gray-200/90 hover:border-gray-300'
                      } flex items-center justify-between transition-all cursor-pointer h-[38px] sm:h-[40px]`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden pr-2">
                        <div className="w-5 h-5 rounded-md bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-2xs">
                          {activeServiceItem.icon}
                        </div>
                        <span className="font-semibold text-xs sm:text-[13px] text-gray-900 truncate">
                          {activeServiceItem.name}
                        </span>
                      </div>
                      <ChevronDown
                        size={15}
                        className={`text-gray-400 transition-transform duration-200 shrink-0 ${
                          dropdownOpen ? 'rotate-180 text-primary-navy' : ''
                        }`}
                      />
                    </button>

                    {/* Custom Floating Options Menu */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{ duration: 0.12 }}
                          role="listbox"
                          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1 max-h-48 overflow-y-auto overscroll-contain"
                        >
                          {serviceItems.map((item) => {
                            const isSelected = item.name === selectedServiceName;
                            return (
                              <button
                                key={item.name}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setValue('service', item.name, { shouldValidate: true });
                                  setDropdownOpen(false);
                                }}
                                className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors cursor-pointer ${
                                  isSelected 
                                    ? 'bg-red-50/80 text-accent-red font-bold' 
                                    : 'hover:bg-gray-50 text-gray-700'
                                }`}
                              >
                                <div className="flex items-center gap-2 pr-2">
                                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                                    isSelected ? 'bg-white shadow-2xs' : 'bg-gray-100'
                                  }`}>
                                    {item.icon}
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold leading-tight">
                                      {item.name}
                                    </p>
                                    <p className="text-[9px] text-gray-400 font-normal">
                                      {item.category}
                                    </p>
                                  </div>
                                </div>

                                {isSelected && (
                                  <Check size={13} className="text-accent-red shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {errors.service && (
                      <p className="text-red-500 text-[10px] mt-0.5 font-medium pl-0.5">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Compact 2-Col Grid for Name & Phone */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {/* Customer Name */}
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        autoCapitalize="words"
                        placeholder="e.g. Rajesh Kumar"
                        {...register('name')}
                        suppressHydrationWarning
                        className={`w-full bg-gray-50/70 text-gray-900 placeholder:text-gray-400 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 border ${
                          errors.name ? 'border-red-400 ring-1 ring-red-200' : 'border-gray-200/90'
                        } focus:bg-white focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy/20 text-xs sm:text-[13px] transition-all h-[38px] sm:h-[40px]`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] mt-0.5 font-medium pl-0.5 leading-tight">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="tel"
                        maxLength={10}
                        placeholder="10-digit number"
                        {...register('phone')}
                        suppressHydrationWarning
                        className={`w-full bg-gray-50/70 text-gray-900 placeholder:text-gray-400 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 border ${
                          errors.phone ? 'border-red-400 ring-1 ring-red-200' : 'border-gray-200/90'
                        } focus:bg-white focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy/20 text-xs sm:text-[13px] transition-all h-[38px] sm:h-[40px]`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-[10px] mt-0.5 font-medium pl-0.5 leading-tight">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck="false"
                      placeholder="name@example.com"
                      {...register('email')}
                      suppressHydrationWarning
                      className={`w-full bg-gray-50/70 text-gray-900 placeholder:text-gray-400 rounded-xl px-3 py-1.5 sm:py-2 border ${
                        errors.email ? 'border-red-400 ring-1 ring-red-200' : 'border-gray-200/90'
                      } focus:bg-white focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy/20 text-xs sm:text-[13px] transition-all h-[38px] sm:h-[40px]`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] mt-0.5 font-medium pl-0.5">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Service Locality / Address */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Service Address in India *
                    </label>
                    <input
                      type="text"
                      autoComplete="street-address"
                      placeholder="e.g. Flat 302, Sector 62, Noida"
                      {...register('address')}
                      suppressHydrationWarning
                      className={`w-full bg-gray-50/70 text-gray-900 placeholder:text-gray-400 rounded-xl px-3 py-1.5 sm:py-2 border ${
                        errors.address ? 'border-red-400 ring-1 ring-red-200' : 'border-gray-200/90'
                      } focus:bg-white focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy/20 text-xs sm:text-[13px] transition-all h-[38px] sm:h-[40px]`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-[10px] mt-0.5 font-medium pl-0.5">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Subtle Trust Pill */}
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 pt-0.5">
                    <ShieldCheck size={13} className="text-accent-red shrink-0" />
                    <span>No advance payment • Pay after inspection</span>
                  </div>
                </div>

                {/* 4. Compact Anchored Submit Button */}
                <div className="p-3 sm:p-3.5 bg-gray-50/80 border-t border-gray-100 shrink-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    className="w-full bg-accent-red hover:bg-accent-red-hover active:scale-[0.99] text-white font-bold tracking-wider py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm uppercase transition-all shadow-sm shadow-accent-red/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer h-[40px] sm:h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Confirming Request...</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck size={15} />
                        <span>Confirm Doorstep Booking</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
