import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { ArrowLeft, ShieldCheck, Wrench, Clock, Award, Users, CheckCircle2, PhoneCall } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Customer Care Home Appliance Support',
  description: 'Learn about Customer Care - India\'s premier independent out-of-warranty appliance repair service delivering fast doorstep assistance across Delhi NCR.',
};

export default function AboutPage() {
  const pillars = [
    {
      icon: <Wrench className="text-accent-red" size={28} />,
      title: 'Technical Mastery',
      desc: 'Our certified engineers bring extensive field experience diagnosing both inverter and conventional appliances.',
    },
    {
      icon: <Clock className="text-accent-red" size={28} />,
      title: '30-Minute Response',
      desc: 'Fast callback and doorstep scheduling so appliance breakdowns disrupt your household as little as possible.',
    },
    {
      icon: <ShieldCheck className="text-accent-red" size={28} />,
      title: 'Genuine Spares & Warranty',
      desc: 'We install high-quality replacement parts backed by our comprehensive 30-day service warranty.',
    },
    {
      icon: <Award className="text-accent-red" size={28} />,
      title: 'Transparent Pricing',
      desc: 'Upfront diagnostic estimates before any work begins. No hidden costs or surprise surcharges.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-navy hover:text-accent-red font-semibold text-sm transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary-navy font-semibold text-xs tracking-wider uppercase">
                <ShieldCheck size={16} className="text-accent-red" />
                About Customer Care
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy tracking-tight leading-tight">
                Reliable Doorstep Appliance Repair Across <span className="text-accent-red">Delhi NCR</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded with a mission to eliminate the frustration of appliance breakdowns, <strong>Customer Care</strong> provides dependable, professional, and rapid out-of-warranty repair services directly at your home.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We understand how essential washing machines, refrigerators, air conditioners, microwaves, and televisions are to your daily routine. That is why our team of vetted, background-verified technicians brings specialized diagnostic tools and authentic replacement components right to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="tel:+918008070025"
                  className="inline-flex items-center gap-2.5 bg-accent-red hover:bg-accent-red-hover text-white px-7 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg shadow-accent-red/20 hover:-translate-y-0.5"
                >
                  <PhoneCall size={18} />
                  Call +91 8008070025
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <Image
                  src="/images/experience.jpg"
                  alt="Technician repairing home appliance"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Core Values / Why We Are Different */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl font-extrabold text-primary-navy mb-4">
                Our Service Standards
              </h2>
              <p className="text-gray-600 text-lg">
                We have built our reputation on four foundational pillars of customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/80 hover:shadow-xl transition-all duration-300 flex flex-col items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary-navy mb-2">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Coverage */}
          <div className="bg-primary-navy text-white rounded-3xl p-8 sm:p-12 lg:p-14 mb-20 relative overflow-hidden shadow-xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Extensive Delhi NCR Operational Network
                </h2>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Our network of certified technicians is strategically distributed across major hubs to ensure rapid doorstep dispatch within 30 minutes.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
                  {[
                    'Central & South Delhi',
                    'Noida & Greater Noida',
                    'Gurugram (Gurgaon)',
                    'Ghaziabad & Indirapuram',
                    'Faridabad',
                    'Sonipat & Kundli',
                  ].map((city) => (
                    <div key={city} className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-accent-red shrink-0" />
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/15 space-y-3 text-sm">
                <h3 className="text-xl font-bold text-white">Independent Support Notice</h3>
                <p className="text-blue-100/90 leading-relaxed">
                  Customer Care is operated by <strong>Aksha Traders</strong> as an independent repair provider specializing in out-of-warranty home appliance repairs. We are not an official manufacturer service center. All trademarks belong to their respective owners.
                </p>
                <div className="pt-2 border-t border-white/10 text-xs text-blue-200 space-y-1">
                  <p><strong>Registered Office:</strong> 1009, Shiv Colony, Old Faridabad, Faridabad, Haryana, 121002</p>
                  <p><strong>GSTIN:</strong> 06DHFPA5392N2Z0</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <FinalCTA />
      <Footer />
    </div>
  );
}
