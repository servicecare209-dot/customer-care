'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const faqs = [
    {
      q: 'Which home appliances do you repair?',
      a: 'We specialize in out-of-warranty repairs for all major home appliances including Washing Machines, Refrigerators, ACs (Split & Window), Microwaves, and LCD/LED Televisions across all major brands.'
    },
    {
      q: 'Do you provide doorstep repair services?',
      a: 'Yes! We provide 100% doorstep repair services. Our expert technicians come directly to your home fully equipped to diagnose and fix the issue on the spot.'
    },
    {
      q: 'How fast can a technician reach my home?',
      a: 'We pride ourselves on our rapid response time. Once you book a service, our expert engineer will contact you within half an hour to schedule a visit at your earliest convenience.'
    },
    {
      q: 'Are your repair technicians qualified?',
      a: 'Absolutely. We deploy only highly trained, background-verified, and experienced professionals who have deep expertise in handling complex appliance mechanisms.'
    },
    {
      q: 'What is the cost of an inspection?',
      a: 'We offer highly competitive and transparent pricing. The technician will diagnose the issue and provide an upfront estimate before proceeding. There are no hidden charges.'
    },
    {
      q: 'Do you use genuine spare parts?',
      a: 'Yes, we prioritize using high-quality, authentic spare parts for all replacements to ensure the longevity and optimal performance of your valuable appliances.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent-red/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-primary-navy/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-primary-navy font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm border border-gray-100">
            <MessageCircleQuestion size={16} className="text-accent-red" /> FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Got Questions? <span className="text-primary-navy">We've Got Answers</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our appliance repair services, pricing, and process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
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
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
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
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
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
