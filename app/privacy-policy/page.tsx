import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Shield, Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Customer Care Home Appliance Support',
  description: 'Comprehensive Privacy Policy detailing how Customer Care collects, uses, protects user data, and complies with Google Ads and analytics advertising standards.',
};

export default function PrivacyPolicyPage() {
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
                <Shield size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy tracking-tight">
                Privacy Policy
              </h1>
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Effective Date: <span className="text-gray-800">August 30, 2026</span> | Last Revised: August 2026
            </p>
          </div>

          {/* Policy Document Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-200/80 space-y-10 text-gray-700 leading-relaxed text-base">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">01.</span> Introduction & Scope
              </h2>
              <p>
                Welcome to <strong>Customer Care Appliance Repair</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operating the website located at <strong>https://customercarerepaircenter.com</strong>. We provide independent, out-of-warranty doorstep home appliance repair services across Delhi NCR, India.
              </p>
              <p>
                We are committed to maintaining the trust and confidence of our visitors and customers. This Privacy Policy outlines the types of personal information we collect, how it is used, how we safeguard your data, and your privacy rights under applicable data protection laws.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">02.</span> Information We Collect
              </h2>
              <p>
                We collect personal information that you voluntarily provide to us when scheduling a repair service, contacting customer support, or submitting an online enquiry form. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Contact Information:</strong> Full name, phone number, and email address.</li>
                <li><strong>Service Address:</strong> Street address, locality, city (Delhi, Noida, Gurugram, Ghaziabad, Faridabad), and PIN code.</li>
                <li><strong>Appliance Information:</strong> Brand, model, appliance category (Washing Machine, Refrigerator, AC, Microwave, TV), and description of the malfunction.</li>
                <li><strong>Communication Logs:</strong> Records of telephone calls, WhatsApp communications, and customer service email exchanges.</li>
                <li><strong>Automated Device & Technical Data:</strong> IP address, browser type, operating system, referring URLs, and interaction data collected automatically via log files and analytics tags.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">03.</span> How We Use Your Information
              </h2>
              <p>We process your personal information strictly for legitimate business purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>To dispatch verified technicians to your address for inspection and doorstep repair.</li>
                <li>To contact you for appointment confirmations, repair estimates, and service warranty follow-ups.</li>
                <li>To process invoices and payments upon completion of service.</li>
                <li>To detect, prevent, and address technical issues or fraudulent service requests.</li>
                <li>To measure website performance, optimize user experience, and comply with statutory obligations.</li>
              </ul>
            </section>

            {/* Section 4 - Google Ads & Analytics Compliance */}
            <section className="space-y-4 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <Cookie className="text-primary-navy" size={24} />
                <h2 className="text-xl font-bold text-primary-navy">
                  04. Third-Party Advertising & Google Analytics Disclosures
                </h2>
              </div>
              <p className="text-sm text-gray-700">
                This website uses third-party analytics and advertising tools, including <strong>Google Analytics</strong> and <strong>Google Ads (AdWords)</strong>, to understand visitor behavior and deliver relevant advertising.
              </p>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Google Advertising Cookies:</strong> Third-party vendors, including Google, use cookies (such as the Google Analytics cookie and Google advertising cookie) to serve ads based on someone&apos;s past visits to our website.
                </p>
                <p>
                  <strong>Remarketing & Audience Targeting:</strong> We may use Google Ads remarketing features to display customized advertisements across the Google Display Network to users who have previously visited our site.
                </p>
                <p>
                  <strong>Opting Out of Personalized Advertising:</strong> Visitors can customize their Google ad preferences or opt out of Google&apos;s personalized advertising by visiting the{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-navy font-semibold underline hover:text-accent-red"
                  >
                    Google Ad Settings
                  </a>
                  . You can also review how Google uses data when you use partner sites by visiting{' '}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-navy font-semibold underline hover:text-accent-red"
                  >
                    Google&apos;s Partner Technologies Policy
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">05.</span> Information Sharing & Disclosure
              </h2>
              <p>
                <strong>We do not sell, rent, or trade your personal data.</strong> Your information is shared only under strict operational confidentiality:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Assigned Technicians:</strong> Contact and address details are provided to the technician scheduled to perform your repair.</li>
                <li><strong>Service Providers:</strong> Cloud hosting, database recording, and SMS/WhatsApp notification partners who assist our operational delivery.</li>
                <li><strong>Legal Requirements:</strong> If required by law, court order, or governmental authority under the laws of <strong>India</strong>.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">06.</span> Data Security & Retention
              </h2>
              <p>
                We implement robust technical and administrative security measures to protect your personal information against unauthorized access, loss, or misuse. We retain personal service records only for the duration necessary to satisfy service warranties, tax obligations, and dispute resolutions.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">07.</span> Your Rights & Choices
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Request access to the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete contact information.</li>
                <li>Request deletion of your data from our customer service records.</li>
                <li>Opt out of promotional communications at any time.</li>
              </ul>
            </section>

            {/* Section 8 - Contact */}
            <section className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">08.</span> Privacy Officer & Contact Details
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy, please contact our designated privacy officer:
              </p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm space-y-2">
                <p><strong>Operating Entity:</strong> Aksha Traders (Customer Care Appliance Repair)</p>
                <p><strong>Support Email:</strong> <a href="mailto:support@customercarerepaircenter.com" className="text-primary-navy font-semibold hover:underline break-all">support@customercarerepaircenter.com</a></p>
                <p><strong>Customer Care Helpline:</strong> <a href="tel:+918008070025" className="text-primary-navy font-semibold hover:underline">+91 8008070025</a></p>
                <p><strong>Registered Address:</strong> 1009, Shiv Colony, Old Faridabad, Faridabad, Haryana, 121002</p>
                <p><strong>GSTIN:</strong> 06DHFPA5392N2Z0</p>
                <p><strong>Jurisdiction:</strong> Faridabad, Haryana / Delhi NCR, India</p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
