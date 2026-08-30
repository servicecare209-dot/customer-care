'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandData } from '@/lib/brandData';

export default function BrandFAQ({ brand }: { brand: BrandData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent-red/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-primary-navy/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-primary-navy font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm border border-gray-100">
            <MessageCircleQuestion size={16} className="text-accent-red" /> {brand.name} FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Frequently Asked Questions About <span className="text-primary-navy">{brand.name} Service</span>
          </h2>
        </div>

        <div className="space-y-4">
          {brand.faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'border-primary-navy/30 shadow-lg shadow-primary-navy/5 bg-white scale-[1.01]' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:shadow-gray-100'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`brand-faq-answer-${index}`}
                id={`brand-faq-question-${index}`}
                suppressHydrationWarning
                className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy group cursor-pointer"
              >
                <span className={`font-bold pr-8 text-lg transition-colors ${
                  openIndex === index ? 'text-primary-navy' : 'text-gray-900 group-hover:text-primary-navy'
                }`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  openIndex === index ? 'bg-primary-navy/10' : 'bg-gray-50 group-hover:bg-gray-100'
                }`}>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-primary-navy' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                    size={20} 
                  />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`brand-faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`brand-faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed text-base md:text-lg border-t border-gray-100 mt-2 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}