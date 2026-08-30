import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Cookie, Settings, Eye, CheckCircle2, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | Customer Care Home Appliance Support',
  description: 'Cookie Policy for Customer Care. Learn about how cookies and tracking technologies are used, including Google Ads advertising cookies and management settings.',
};

export default function CookiePolicyPage() {
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
                <Cookie size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy tracking-tight">
                Cookie Policy
              </h1>
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Effective Date: <span className="text-gray-800">August 30, 2026</span>
            </p>
          </div>

          {/* Cookie Document Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-200/80 space-y-10 text-gray-700 leading-relaxed text-base">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">01.</span> What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that websites place on your device (computer, smartphone, or tablet) as you browse. They are widely used to make websites work efficiently, remember user preferences, and provide analytical reporting to website owners.
              </p>
              <p>
                This Cookie Policy explains how <strong>Customer Care Appliance Repair</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) uses cookies and similar technologies on <strong>https://customercarerepaircenter.com</strong>.
              </p>
            </section>

            {/* Section 2 - Types of Cookies */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">02.</span> Categories of Cookies We Use
              </h2>

              <div className="grid gap-5">
                {/* Category 1 */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                    <Shield className="text-primary-navy shrink-0" size={20} />
                    <h3>A. Strictly Necessary & Essential Cookies</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    These cookies are necessary for the website to function properly. They enable core functionality such as secure form submissions, service booking dialogue states, and cookie preference retention. The website cannot function optimally without these cookies.
                  </p>
                </div>

                {/* Category 2 */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                    <Eye className="text-accent-red shrink-0" size={20} />
                    <h3>B. Performance & Analytics Cookies (Google Analytics)</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    We use analytical cookies, including those provided by <strong>Google Analytics</strong>, to collect anonymous statistical information regarding visitor volume, popular pages, bounce rates, and traffic sources. This helps us improve our website structure and service discovery.
                  </p>
                </div>

                {/* Category 3 */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                    <Settings className="text-primary-navy shrink-0" size={20} />
                    <h3>C. Marketing & Google Advertising Cookies</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    These cookies are set by third-party advertising partners, including <strong>Google Ads</strong>, to track conversions from advertising campaigns and build a profile of your interests to show you relevant advertisements across the internet.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 - Third-Party Disclosures */}
            <section className="space-y-4 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h2 className="text-xl font-bold text-primary-navy">
                03. Google Advertising & Cookie Controls
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Google, as a third-party vendor, uses cookies to serve ads on our site and across the web. You can review and manage how Google uses cookies and data for personalized advertising:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Google Ad Settings:</strong> Customize your ads or opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-navy font-bold underline hover:text-accent-red"
                  >
                    https://adssettings.google.com
                  </a>.
                </li>
                <li>
                  <strong>Google Analytics Opt-out:</strong> You can download the{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-navy font-bold underline hover:text-accent-red"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>{' '}
                  to prevent your data from being used by Google Analytics.
                </li>
              </ul>
            </section>

            {/* Section 4 - Managing in Browsers */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">04.</span> How to Manage Cookies in Your Browser
              </h2>
              <p>
                Most web browsers allow you to manage cookie preferences through their settings menu. You can configure your browser to reject all cookies, accept only first-party cookies, or alert you when a cookie is placed:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600 text-sm">
                <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
                <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection</li>
                <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
                <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and Site Permissions</li>
              </ul>
              <p className="text-xs text-gray-500 italic">
                Note: Disabling essential cookies may impact certain interactive features on our site, such as booking form dialogues.
              </p>
            </section>

            {/* Section 5 - Contact */}
            <section className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-accent-red font-mono text-xl">05.</span> Contact Us
              </h2>
              <p>If you have any questions regarding our use of cookies or tracking technologies, please contact:</p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm space-y-2">
                <p><strong>Operating Entity:</strong> Aksha Traders (Customer Care Appliance Repair)</p>
                <p><strong>Support Email:</strong> <a href="mailto:support@customercarerepaircenter.com" className="text-primary-navy font-semibold hover:underline break-all">support@customercarerepaircenter.com</a></p>
                <p><strong>Customer Helpline:</strong> <a href="tel:+918008070025" className="text-primary-navy font-semibold hover:underline">+91 8008070025</a></p>
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
