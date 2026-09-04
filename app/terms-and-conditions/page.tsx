import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Customer Care Home Appliance Support',
  description: 'Terms and Conditions governing doorstep appliance repair services, appointments, estimates, warranties, and liability for Customer Care Appliance Repair.',
};

export default function TermsAndConditionsPage() {
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
              <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-primary-navy flex items-center justify-center shadow-sm">
                <FileText size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy tracking-tight">
                Terms and Conditions
              </h1>
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Effective Date: <span className="text-gray-800">August 30, 2026</span> | Last Revised: August 2026
            </p>
          </div>

          {/* Terms Document Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-200/80 space-y-10 text-gray-700 leading-relaxed text-base">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">01.</span> Agreement to Terms
              </h2>
              <p>
                These Terms and Conditions constitute a legally binding agreement between you (&quot;Customer,&quot; &quot;User,&quot; or &quot;you&quot;) and <strong>Customer Care Appliance Repair</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), governing your access to and use of <strong>https://customercarerepaircenter.com</strong> as well as any appliance repair services scheduled through our telephone lines, booking forms, or messaging channels.
              </p>
              <p>
                By accessing this website, requesting a technician visit, or accepting a service estimate, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.
              </p>
            </section>

            {/* Section 2 - Independent Service Provider Disclaimer */}
            <section className="space-y-4 bg-amber-50/60 p-6 rounded-2xl border border-amber-200">
              <div className="flex items-center gap-2.5 text-amber-900 font-bold text-xl">
                <AlertTriangle className="text-amber-600 shrink-0" size={24} />
                <span>02. Independent Service Provider & Trademark Notice</span>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed">
                <strong>Customer Care Appliance Repair</strong> is an independent, out-of-warranty service and repair provider. We are <strong>not affiliated with, endorsed by, or an authorized service center of</strong> any manufacturer (including but not limited to LG, Samsung, Whirlpool, Bosch, IFB, Haier, Hitachi, Godrej, Sony, Panasonic, Sharp, or Marq).
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                All manufacturer names, logos, model designations, and trademarks displayed on this site are the property of their respective owners and are used strictly for informational identification and nominative fair use purposes. If your appliance is currently covered under an active manufacturer warranty, you should contact the official brand service channel.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">03.</span> Service Bookings & Technician Visits
              </h2>
              <p>
                Service appointments can be requested online or via telephone. While we strive to provide 30-minute callback confirmations and same-day doorstep technician visits across Delhi NCR, appointment times are subject to technician availability, traffic, and unforeseen logistical conditions.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">04.</span> Diagnostic Charges, Estimates & Payments
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Doorstep Inspection Fee:</strong> A nominal diagnosis/inspection fee applies for visiting your premises and troubleshooting the appliance fault.</li>
                <li><strong>Transparent Upfront Quotations:</strong> Following diagnosis, our technician will provide an itemized verbal or written cost estimate covering necessary spare parts and labor before commencing any repair work.</li>
                <li><strong>Approval to Proceed:</strong> Work will begin only upon your explicit approval. If you choose not to proceed with the repair after diagnosis, only the initial inspection charge is payable.</li>
                <li><strong>Payment Methods:</strong> Full payment is due immediately upon completion of service and testing. We accept UPI, bank transfer, and cash.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">05.</span> 30-Day Service Warranty & Exclusions
              </h2>
              <p>
                We stand behind our workmanship. Unless otherwise stated in writing, all replacement parts installed by our technicians and associated repair labor carry a <strong>30-day limited service warranty</strong>.
              </p>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-sm space-y-2">
                <p className="font-bold text-gray-800">Warranty Exclusions:</p>
                <p>The service warranty shall be null and void in cases of:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Electrical voltage fluctuations, short circuits, or improper external wiring.</li>
                  <li>Physical breakage, accidental damage, pest infestation, or water leakage from external sources.</li>
                  <li>Tampering, dismantling, or repair attempts by unauthorized third-party technicians following our visit.</li>
                  <li>Unrelated component failures in other sections of the appliance.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">06.</span> Customer Obligations
              </h2>
              <p>As a customer scheduling doorstep service, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide safe, clear, and unhindered access to the appliance requiring service.</li>
                <li>Ensure an adult (18 years or older) is present throughout the technician&apos;s visit.</li>
                <li>Provide accurate descriptions of the appliance brand, model, and symptoms of the issue.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">07.</span> Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, <strong>Customer Care Appliance Repair</strong> and its technicians shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of business, food spoilage, or pre-existing structural appliance defects. Our total liability for any claim arising from a service visit shall not exceed the total amount paid by the customer for that specific service.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">08.</span> Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes or claims arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>New Delhi, Delhi NCR, India</strong>.
              </p>
            </section>

            {/* Section 9 - Contact */}
            <section className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">09.</span> Inquiries & Service Support
              </h2>
              <p>For questions or warranty claims regarding these Terms and Conditions, please contact:</p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm space-y-2">
                <p><strong>Entity:</strong> Aksha Traders (Operating Customer Care Appliance Repair)</p>
                <p><strong>Email:</strong> <a href="mailto:support@customercarerepaircenter.com" className="text-primary-navy font-semibold hover:underline break-all">support@customercarerepaircenter.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+918008070025" className="text-primary-navy font-semibold hover:underline">+91 8008070025</a></p>
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
