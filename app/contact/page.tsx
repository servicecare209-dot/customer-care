'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { brandBookingSchema, BrandBookingFormData } from '@/lib/validations/bookingSchema';
import { ArrowLeft, Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle, Loader2, Send, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandBookingFormData>({
    resolver: zodResolver(brandBookingSchema),
    defaultValues: {
      brand: 'General',
      name: '',
      email: '',
      phone: '',
      address: '',
      service: 'Washing Machine Repair',
    },
  });

  const onSubmit = async (data: BrandBookingFormData) => {
    setServerError(null);
    try {
      // 1. Post to booking API
      try {
        await fetch('/api/book-service', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            source: 'Contact Page Form',
          }),
        });
      } catch (e) {
        console.error('API log error:', e);
      }

      // 2. Dispatch to WhatsApp
      const whatsappNumber = '918008070025';
      const textMessage = [
        `*NEW CONTACT / SERVICE INQUIRY*`,
        `----------------------------------------`,
        `*Service Requested:* ${data.service}`,
        `*Customer Name:* ${data.name}`,
        `*Phone:* ${data.phone}`,
        `*Email:* ${data.email}`,
        `*Address:* ${data.address}`,
        `----------------------------------------`,
        `_Source: Contact Us Page_`,
      ].join('\n');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Something went wrong. Please call our helpline directly.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-navy hover:text-accent-red font-semibold text-sm transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary-navy font-semibold text-xs tracking-wider uppercase mb-4">
              <Mail size={16} className="text-accent-red" />
              Contact Customer Support
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy tracking-tight mb-4">
              We&apos;re Here to Help You
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Have a query or need fast doorstep appliance repair in India? Reach out via phone, email, or send us a message below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Left: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Phone */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200/80 flex items-start gap-4 hover:border-primary-navy transition-all">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-accent-red flex items-center justify-center shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Customer Helpline</p>
                  <a
                    href="tel:+918008070025"
                    className="text-xl font-extrabold text-primary-navy hover:text-accent-red transition-colors"
                  >
                    +91 8008070025
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Prompt 30-min callback across India</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200/80 flex items-start gap-4 hover:border-primary-navy transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-navy flex items-center justify-center shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Inquiries</p>
                  <a
                    href="mailto:support@customercarerepaircenter.com"
                    className="text-base sm:text-lg font-bold text-primary-navy hover:text-accent-red transition-colors break-all"
                  >
                    support@customercarerepaircenter.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Written support & service warranty queries</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200/80 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Operational Hours</p>
                  <p className="text-base font-bold text-gray-900">Monday – Sunday: 8:00 AM – 9:00 PM</p>
                  <p className="text-xs text-gray-500 mt-1">365 Days Doorstep Support</p>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200/80 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Office &amp; Registered Entity</p>
                  <p className="text-base font-bold text-gray-900">Aksha Traders</p>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    1009, Shiv Colony, Old Faridabad, Faridabad, Haryana, 121002
                  </p>
                  <p className="text-xs font-semibold text-primary-navy pt-1">
                    GSTIN: <span className="font-mono text-gray-800">06DHFPA5392N2Z0</span>
                  </p>
                  <p className="text-xs text-gray-500 pt-0.5">Prompt doorstep repair across Delhi, Noida, Gurugram, Ghaziabad &amp; Faridabad</p>
                </div>
              </div>

            </div>

            {/* Right: Working Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200/80">
              <h2 className="text-2xl font-bold text-primary-navy mb-2">Send Us a Message</h2>
              <p className="text-gray-600 text-sm mb-6">
                Fill in your details below and our service team will connect with you shortly.
              </p>

              {isSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Message Received!</h3>
                  <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Our customer service executive will contact you within 30 minutes to assist with your request.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 text-sm font-semibold text-primary-navy hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm font-medium">
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        autoCapitalize="words"
                        placeholder="e.g. Amit Sharma"
                        {...register('name')}
                        suppressHydrationWarning
                        className={`w-full bg-gray-50 text-gray-900 rounded-xl px-3.5 py-3 border ${
                          errors.name ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                        } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy text-base sm:text-sm transition-all min-h-[44px]`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 font-medium pl-0.5">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        {...register('phone')}
                        suppressHydrationWarning
                        className={`w-full bg-gray-50 text-gray-900 rounded-xl px-3.5 py-3 border ${
                          errors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                        } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy text-base sm:text-sm transition-all min-h-[44px]`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-medium pl-0.5">{errors.phone.message}</p>
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
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck="false"
                      placeholder="name@example.com"
                      {...register('email')}
                      suppressHydrationWarning
                      className={`w-full bg-gray-50 text-gray-900 rounded-xl px-3.5 py-3 border ${
                        errors.email ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                      } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy text-base sm:text-sm transition-all min-h-[44px]`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 font-medium pl-0.5">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Appliance Type *
                    </label>
                    <div className="relative">
                      <select
                        {...register('service')}
                        suppressHydrationWarning
                        className={`w-full bg-gray-50 text-gray-900 rounded-xl pl-3.5 pr-10 py-3 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy appearance-none font-medium text-base sm:text-sm transition-all cursor-pointer min-h-[44px]`}
                      >
                        <option value="Washing Machine Repair">Washing Machine Repair</option>
                        <option value="Refrigerator Service">Refrigerator Service</option>
                        <option value="Air Conditioner Repair">Air Conditioner Repair</option>
                        <option value="Microwave Oven Repair">Microwave Oven Repair</option>
                        <option value="LED/LCD TV Repair">LED/LCD TV Repair</option>
                        <option value="Other Appliances Repair">Other Home Appliances</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Locality / Address in India *
                    </label>
                    <textarea
                      rows={3}
                      autoComplete="street-address"
                      placeholder="Enter your street address, apartment, locality, or sector..."
                      {...register('address')}
                      suppressHydrationWarning
                      className={`w-full bg-gray-50 text-gray-900 rounded-xl px-3.5 py-3 border ${
                        errors.address ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'
                      } focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-navy text-base sm:text-sm transition-all`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1 font-medium pl-0.5">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    className="w-full bg-accent-red hover:bg-accent-red-hover active:scale-[0.99] text-white font-bold tracking-wide py-3.5 sm:py-4 rounded-xl text-sm sm:text-base uppercase transition-all shadow-lg shadow-accent-red/25 hover:shadow-accent-red/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-3 cursor-pointer min-h-[48px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message & Book Service</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
