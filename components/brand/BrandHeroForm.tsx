'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, CheckCircle, Loader2 } from 'lucide-react';
import { BrandData } from '@/lib/brandData';
import { brandBookingSchema, BrandBookingFormData } from '@/lib/validations/bookingSchema';

interface BrandHeroFormProps {
  brand: BrandData;
}

export default function BrandHeroForm({ brand }: BrandHeroFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Available service options based on the brand's services
  const defaultServices = [
    'Washing Machine Repair',
    'Refrigerator Service',
    'Air Conditioner Repair',
    'Microwave Oven Repair',
    'LED/LCD TV Repair',
  ];

  const serviceOptions = brand.services && brand.services.length > 0
    ? brand.services.map((s) => s.name)
    : defaultServices;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandBookingFormData>({
    resolver: zodResolver(brandBookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      service: serviceOptions[0] || 'Washing Machine Repair',
    },
  });

  const onSubmit = async (data: BrandBookingFormData) => {
    setServerError(null);
    try {
      // 1. Send data to backend API for Google Sheets & record keeping
      try {
        await fetch('/api/book-service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            brand: brand.name,
          }),
        });
      } catch (e) {
        console.error('API log error:', e);
      }

      // 2. Format clean, professional message for WhatsApp without corrupt unicode characters
      const whatsappNumber = '918008070025';
      const textMessage = [
        `*NEW APPLIANCE SERVICE REQUEST*`,
        `----------------------------------------`,
        `*Brand:* ${brand.name}`,
        `*Service:* ${data.service}`,
        ``,
        `*Customer Details:*`,
        `*Name:* ${data.name}`,
        `*Phone:* ${data.phone}`,
        `*Email:* ${data.email}`,
        `*Address:* ${data.address}`,
        `----------------------------------------`,
        `_Source: 1800 Customer Care_`,
      ].join('\n');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

      // 3. Open WhatsApp directly in new window / app
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Something went wrong. Please call us directly.');
      }
    }
  };

  return (
    <div className="w-full bg-[#374151]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl border border-white/10 text-white">
      {/* Brand Title Header */}
      <div className="text-center mb-3 sm:mb-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
          {brand.name}
        </h3>
        <p className="text-gray-200 text-xs sm:text-sm font-normal leading-snug mt-1 max-w-xs mx-auto">
          Kindly fill all required details below, our team will contact you soon.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-5 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={28} />
          </div>
          <h4 className="text-lg font-bold text-white">Request Received!</h4>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Thank you! Our expert technician for <strong className="text-white">{brand.name}</strong> support will contact you within 15 minutes.
          </p>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            suppressHydrationWarning
            className="mt-1 text-xs font-semibold text-emerald-300 hover:text-emerald-200 underline"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3" noValidate suppressHydrationWarning>
          {serverError && (
            <div className="bg-red-900/40 border border-red-500/40 rounded-lg p-2.5 text-red-200 text-xs font-medium">
              {serverError}
            </div>
          )}

          {/* Name Field */}
          <div>
            <input
              type="text"
              autoComplete="name"
              autoCapitalize="words"
              placeholder="Name"
              {...register('name')}
              suppressHydrationWarning
              className={`w-full bg-white text-gray-900 placeholder:text-gray-400 rounded-xl px-3.5 py-3 border-0 focus:outline-none focus:ring-2 ${
                errors.name ? 'focus:ring-red-400 ring-2 ring-red-400' : 'focus:ring-accent-red'
              } text-base transition-all min-h-[44px]`}
            />
            {errors.name && (
              <p className="text-red-300 text-[11px] sm:text-xs mt-1 font-medium pl-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck="false"
              placeholder="Email"
              {...register('email')}
              suppressHydrationWarning
              className={`w-full bg-white text-gray-900 placeholder:text-gray-400 rounded-xl px-3.5 py-3 border-0 focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-400 ring-2 ring-red-400' : 'focus:ring-accent-red'
              } text-base transition-all min-h-[44px]`}
            />
            {errors.email && (
              <p className="text-red-300 text-[11px] sm:text-xs mt-1 font-medium pl-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel"
              maxLength={10}
              placeholder="Phone Number"
              {...register('phone')}
              suppressHydrationWarning
              className={`w-full bg-white text-gray-900 placeholder:text-gray-400 rounded-xl px-3.5 py-3 border-0 focus:outline-none focus:ring-2 ${
                errors.phone ? 'focus:ring-red-400 ring-2 ring-red-400' : 'focus:ring-accent-red'
              } text-base transition-all min-h-[44px]`}
            />
            {errors.phone && (
              <p className="text-red-300 text-[11px] sm:text-xs mt-1 font-medium pl-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <input
              type="text"
              autoComplete="street-address"
              placeholder="Address"
              {...register('address')}
              suppressHydrationWarning
              className={`w-full bg-white text-gray-900 placeholder:text-gray-400 rounded-xl px-3.5 py-3 border-0 focus:outline-none focus:ring-2 ${
                errors.address ? 'focus:ring-red-400 ring-2 ring-red-400' : 'focus:ring-accent-red'
              } text-base transition-all min-h-[44px]`}
            />
            {errors.address && (
              <p className="text-red-300 text-[11px] sm:text-xs mt-1 font-medium pl-1">{errors.address.message}</p>
            )}
          </div>

          {/* Choose Your Service Select Field */}
          <div>
            <label className="block text-left text-white font-medium text-xs sm:text-sm mb-1.5 pl-0.5">
              Choose Your Service
            </label>
            <div className="relative">
              <select
                {...register('service')}
                suppressHydrationWarning
                className={`w-full bg-white text-gray-900 rounded-xl pl-3.5 pr-10 py-3 border-0 focus:outline-none focus:ring-2 ${
                  errors.service ? 'focus:ring-red-400 ring-2 ring-red-400' : 'focus:ring-accent-red'
                } text-base appearance-none cursor-pointer transition-all font-normal min-h-[44px]`}
              >
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-gray-900 py-1">
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-700">
                <ChevronDown size={18} />
              </div>
            </div>
            {errors.service && (
              <p className="text-red-300 text-[11px] sm:text-xs mt-1 font-medium pl-1">{errors.service.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            suppressHydrationWarning
            className="w-full bg-accent-red hover:bg-accent-red-hover active:scale-[0.99] text-white font-bold tracking-wider py-3.5 rounded-xl text-base uppercase transition-all duration-200 shadow-lg shadow-accent-red/25 hover:shadow-accent-red/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 sm:mt-5 cursor-pointer min-h-[48px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>SENDING...</span>
              </>
            ) : (
              'SEND'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
