'use client';

import { motion } from 'motion/react';
import { BrandData } from '@/lib/brandData';
import { AlertCircle, CheckCircle2, Cpu, Wrench } from 'lucide-react';

export default function BrandOverview({ brand }: { brand: BrandData }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top: Rich Substantive Technical Overview (300+ Words) */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200/80">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary-navy font-semibold text-xs uppercase tracking-wider mb-4 border border-blue-100">
              <Cpu size={14} className="text-accent-red" />
              Technical Overview &amp; Expertise
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Specialized Doorstep Care for <span className="text-primary-navy">{brand.name}</span> Appliances
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
              {brand.overviewParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Supported Model Series Badges */}
            {brand.supportedModels && brand.supportedModels.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Wrench size={16} className="text-accent-red" />
                  Popular {brand.name} Models &amp; Series We Service:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {brand.supportedModels.map((model, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Grid: Common Issues & Service Guarantees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Common Brand Issues */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Common <span className="text-accent-red">{brand.name}</span> Malfunctions We Fix
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-base">
              Even high-end {brand.name} appliances face wear and tear over time. Our independent doorstep technicians carry the right diagnostic tools to resolve these issues promptly.
            </p>
            
            <div className="space-y-6">
              {brand.commonProblems.map((problem, i) => (
                <div key={i} className="flex gap-4 items-start bg-gray-50/60 p-4 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle size={20} className="text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{problem.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right: Why Choose Independent Service */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-navy rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 relative z-10">
              Why Choose Our Independent {brand.name} Repair Service?
            </h2>
            
            <ul className="space-y-5 relative z-10">
              {[
                `Specialized diagnostic experience with ${brand.name} electronics`,
                'Upfront pricing with transparent written quotations',
                'High-grade, genuine-compatible replacement spare parts',
                'Rapid 30 to 60-minute doorstep arrival across India',
                'Convenient on-site repair at your home or office',
                '30-Day warranty on all repairs and replaced components'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-accent-red shrink-0 mt-0.5" />
                  <span className="text-gray-200 font-medium text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
