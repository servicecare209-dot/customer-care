'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, ChevronDown, CheckCircle, Loader2, CalendarCheck, Phone, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBookingModal } from '@/context/BookingContext';
import { brandBookingSchema, BrandBookingFormData } from '@/lib/validations/bookingSchema';

const serviceOptions = [
  'Washing Machine Repair',
  'Refrigerator Service',
  'Air Conditioner Repair',
  'Microwave Oven Repair',
  'LED/LCD TV Repair',
  'Other Appliances Repair',
];

export default function BookingModal() {
  const { modalState, closeBookingModal } = useBookingModal();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BrandBookingFormData>({
    resolver: zodResolver(brandBookingSchema),
    defaultValues: {
      brand: modalState.brand || 'General',
      name: '',
      email: '',
      phone: '',
      address: '',
      service: modalState.service || 'Washing Machine Repair',
    },
  });

  // Update default service when modal opens with a specific service
  useEffect(() => {
    if (modalState.isOpen) {
      setIsSuccess(false);
      setServerError(null);
      if (modalState.service) {
        setValue('service', modalState.service);
      }
      if (modalState.brand) {
        setValue('brand', modalState.brand);
      }
    }
  }, [modalState.isOpen, modalState.service, modalState.brand, setValue]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalState.isOpen) {
        closeBookingModal();
      }
    };
    if (modalState.isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalState.isOpen, closeBookingModal]);

  const onSubmit = async (data: BrandBookingFormData) => {
    setServerError(null);
    try {
      // 1. Post to internal booking API
      try {
        await fetch('/api/book-service', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            brand: data.brand || modalState.brand || 'General',
          }),
        });
      } catch (e) {
        console.error('API logging notice:', e);
      }

      // 2. Format WhatsApp Message
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
        `_Source: Customer Care Delhi NCR Website_`,
      ].join('\n');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

      // 3. Open WhatsApp in new tab
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Something went wrong. Please call us directly at +91 8008070025.');
      }
    }
  };

  return (
    <AnimatePresence>
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookingModal}
            className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="bg-primary-navy px-6 py-5 text-white flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-accent-red">
                  <CalendarCheck size={22} />
                </div>
                <div>
                  <h3 id="modal-title" className="text-xl font-bold tracking-tight">
                    Book Doorstep Service
                  </h3>
                  <p className="text-xs text-blue-100/90">
                    Prompt 30-min callback across Delhi NCR
                  </p>
                </div>
              </div>
              <button
                onClick={closeBookingModal}
                className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-red"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {isSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    Booking Request Sent!
                  </h4>
                  <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you! Our dedicated service technician will reach out to you within 30 minutes to confirm your appointment.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="tel:+918008070025"
                      className="inline-flex items-center justify-center gap-2 bg-accent-red hover:bg-accent-red-hover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-accent-red/20 transition-all"
                    >
                      <Phone size={16} />
                      Call +91 8008070025
                    </a>
                    <button
                      type="button"
                      onClick={closeBookingModal}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm font-medium">
                      {serverError}
                    </div>
                  )}

                  {/* Appliance Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Select Appliance / Service *
                    </label>
                    <div className="relative">
                      <select
                        {...register('service')}
                        className={`w-full bg-gray-50 text-gray-900 rounded-xl px-4 py-3 border ${
                          errors.service ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                        } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy appearance-none font-medium text-sm transition-all`}
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.service.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Customer Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Kumar"
                        {...register('name')}
                        className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 border ${
                          errors.name ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                        } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy text-sm transition-all`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        {...register('phone')}
                        className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 border ${
                          errors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                        } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy text-sm transition-all`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      {...register('email')}
                      className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 border ${
                        errors.email ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                      } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy text-sm transition-all`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Service Address / Locality in Delhi NCR *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 302, Sector 62, Noida"
                      {...register('address')}
                      className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 border ${
                        errors.address ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                      } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy text-sm transition-all`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Trust indicator */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                    <ShieldCheck size={16} className="text-accent-red shrink-0" />
                    <span>No advance payment needed. Pay after inspection & approval.</span>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-red hover:bg-accent-red-hover active:scale-[0.99] text-white font-bold tracking-wide py-3.5 rounded-xl text-base uppercase transition-all shadow-lg shadow-accent-red/25 hover:shadow-accent-red/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Confirming Request...</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck size={18} />
                        <span>Confirm Doorstep Booking</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
