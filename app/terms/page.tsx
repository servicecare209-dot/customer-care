import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Customer Care Appliance Repair',
  description: 'Terms and conditions for independent out-of-warranty appliance repair services in Delhi NCR by Customer Care.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-navy hover:text-accent-red font-semibold text-sm transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-navy flex items-center justify-center">
                <FileText size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-navy">
                Terms of Service
              </h1>
            </div>
            <p className="text-gray-500 text-sm">Last updated: August 2026</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-8 text-gray-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">1. Independent Service Provider Disclaimer</h2>
              <p>
                Customer Care is an independent service provider specializing in out-of-warranty home appliance repairs. We are not an authorized service center of any specific manufacturer unless explicitly stated. All brand names, trademarks, and logos are used strictly for descriptive and identification purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">2. Service Booking & Appointments</h2>
              <p>
                When you submit a service request via our website or telephone, our team will confirm appointment availability based on technician schedules in your Delhi NCR locality. We endeavor to offer rapid 30-minute callback times during standard operational hours (8:00 AM to 9:00 PM).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">3. Diagnostic Charges & Pricing</h2>
              <p>
                A standard inspection/diagnostic charge applies for doorstep visits. The technician will inspect the appliance and provide a clear, upfront estimate before any repair work or spare part replacement begins. You retain full freedom to accept or decline the estimate.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">4. Service Warranty & Spare Parts</h2>
              <p>
                Replaced spare parts and repair services carry a 30-day service warranty from the date of completion. This warranty covers the specific repair performed and parts replaced. It does not cover physical damage, electrical fluctuations, water damage, or tampering by unauthorized persons.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">5. Contact Information</h2>
              <p>
                For customer support, queries, or service warranty claims, please contact our support desk:
              </p>
              <p className="font-semibold text-primary-navy">
                Phone: +91 8008070025 | Email: <span className="break-all">support@customercarerepaircenter.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
