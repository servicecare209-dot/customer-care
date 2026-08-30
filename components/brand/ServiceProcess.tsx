'use client';

import { motion } from 'motion/react';
import { PhoneCall, Wrench, Settings, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function ServiceProcess() {
  const steps = [
    { id: '01', title: 'Contact', desc: 'Call us or book online to schedule a visit.', icon: PhoneCall },
    { id: '02', title: 'Diagnosis', desc: 'Technician arrives to evaluate the appliance.', icon: Wrench },
    { id: '03', title: 'Service', desc: 'We fix the issue using genuine spare parts.', icon: Settings },
    { id: '04', title: 'Testing', desc: 'Rigorous post-repair checks are performed.', icon: ShieldCheck },
    { id: '05', title: 'Completion', desc: 'Your appliance is fully restored.', icon: ThumbsUp },
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Our Transparent <span className="text-primary-navy">Repair Process</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 mb-6 relative z-10 text-primary-navy group hover:bg-primary-navy hover:text-white transition-colors duration-300">
                  <Icon size={32} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-red text-white flex items-center justify-center text-xs font-bold shadow-md">
                    {step.id}
                  </div>
                </div>
                
                {/* Connecting Line (hidden on mobile, visible on md+) */}
                {i !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-gray-200 -z-0">
                    <motion.div 
                      className="h-full bg-accent-red/50" 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                    />
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}