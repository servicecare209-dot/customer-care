import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, AlertOctagon, ShieldAlert, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer & Non-Affiliation Notice | Customer Care',
  description: 'Legal disclaimer and non-affiliation notice for Customer Care independent out-of-warranty home appliance repair services.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-navy hover:text-accent-red font-semibold text-sm transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center shadow-sm">
                <AlertOctagon size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy tracking-tight">
                Disclaimer
              </h1>
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Effective Date: <span className="text-gray-800">August 30, 2026</span>
            </p>
          </div>

          {/* Disclaimer Document Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-200/80 space-y-10 text-gray-700 leading-relaxed text-base">
            
            {/* Primary Non-Affiliation Box */}
            <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-amber-900 font-bold text-xl">
                <ShieldAlert className="text-amber-600 shrink-0" size={26} />
                <h2>1. Independent Service Provider & Non-Affiliation Notice</h2>
              </div>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <strong>Customer Care Appliance Repair</strong> operates as a strictly <strong>independent third-party service provider</strong> specializing in out-of-warranty repairs and maintenance for residential home appliances across Delhi NCR.
              </p>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                We are <strong>NOT affiliated with, sponsored by, authorized by, or associated with</strong> any appliance manufacturer, brand, or trademark holder (including but not limited to <em>LG Electronics, Samsung, Whirlpool Corporation, Robert Bosch GmbH, IFB Industries, Haier Group, Hitachi, Godrej & Boyce, Sony Corporation, Panasonic, Sharp Corporation, or Marq by Flipkart</em>).
              </p>
            </div>

            {/* Section 2 - Trademark Usage */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">02.</span> Trademark & Brand Name Attribution
              </h2>
              <p>
                All brand names, product logos, registered trademarks, service marks, and model descriptions mentioned throughout <strong>https://customercarerepaircenter.com</strong> are the sole intellectual property of their respective trademark holders.
              </p>
              <p>
                Their display and mention on our website are solely for nominative fair use, identification, compatibility, and descriptive purposes to indicate the types of appliance mechanisms our technicians are qualified to repair.
              </p>
            </section>

            {/* Section 3 - Manufacturer Warranty Advisory */}
            <section className="space-y-4 bg-blue-50/60 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2.5 text-primary-navy font-bold text-lg">
                <Info size={22} className="text-primary-navy" />
                <h3>03. Active Manufacturer Warranty Advisory</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                If your appliance is currently within its original manufacturer warranty period (or covered under an extended manufacturer warranty scheme), repair by an independent technician may void your manufacturer warranty. If your appliance is within warranty, we strongly advise contacting the authorized brand service helpline directly.
              </p>
            </section>

            {/* Section 4 - Website Content Disclaimer */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">04.</span> Website Content & General Information
              </h2>
              <p>
                The information provided on this website is for general informational and service booking purposes only. While we strive to ensure that technical details, service categories, and descriptions are accurate and current, we make no representations or warranties of any kind, express or implied, about the completeness, reliability, or accuracy of the website content.
              </p>
            </section>

            {/* Section 5 - External Links */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">05.</span> External Links Disclaimer
              </h2>
              <p>
                Our website may contain links to external third-party websites or services (e.g. WhatsApp, Google Maps, Google Ad Settings). We do not investigate, monitor, or endorse the accuracy or policies of these external sites and accept no liability for any content or transactions conducted thereon.
              </p>
            </section>

            {/* Section 6 - Limitation of Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">06.</span> Limitation of Liability
              </h2>
              <p>
                In no event shall <strong>Customer Care Appliance Repair</strong>, its owners, or its technical service personnel be liable for any loss or damage (including without limitation indirect or consequential loss) arising from the use of this website or reliance on any information contained herein.
              </p>
            </section>

            {/* Section 7 - Contact */}
            <section className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">07.</span> Contact & Clarifications
              </h2>
              <p>For any questions or legal inquiries regarding this Disclaimer, please reach out to:</p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm space-y-2">
                <p><strong>Entity:</strong> Aksha Traders (Customer Care Appliance Repair)</p>
                <p><strong>Email:</strong> <a href="mailto:support@customercarerepaircenter.com" className="text-primary-navy font-semibold hover:underline break-all">support@customercarerepaircenter.com</a></p>
                <p><strong>Telephone:</strong> <a href="tel:+918008070025" className="text-primary-navy font-semibold hover:underline">+91 8008070025</a></p>
                <p><strong>Office Address:</strong> 1009, Shiv Colony, Old Faridabad, Faridabad, Haryana, 121002</p>
                <p><strong>GSTIN:</strong> 06DHFPA5392N2Z0</p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
