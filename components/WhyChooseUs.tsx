'use client';

import { CheckCircle, IndianRupee, Clock, Wrench, Award, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <CheckCircle className="text-white" size={24} />,
      title: 'Quality Service, Every Time',
      desc: 'Customer satisfaction is our top priority. From the moment you contact us to completion, expect professionalism and transparency.'
    },
    {
      icon: <IndianRupee className="text-white" size={24} />,
      title: 'Affordable Pricing',
      desc: 'Quality repair shouldn’t break the bank. We offer competitive pricing, upfront estimates, and complete transparency.'
    },
    {
      icon: <Clock className="text-white" size={24} />,
      title: 'Convenient Scheduling',
      desc: 'Appliance breakdowns disrupt routines. We offer flexible scheduling to accommodate your busy lifestyle, whether urgent or planned.'
    },
    {
      icon: <Wrench className="text-white" size={24} />,
      title: 'Our Expertise',
      desc: 'With years of industry experience, our technicians possess the deep knowledge needed to tackle any major or minor appliance issue.'
    },
    {
      icon: <Award className="text-white" size={24} />,
      title: 'Commitment to Excellence',
      desc: 'From our workmanship to exceptional customer service, we strive to exceed your expectations. Your satisfaction is strictly guaranteed.'
    },
    {
      icon: <PhoneCall className="text-white" size={24} />,
      title: 'Fast Response Time',
      desc: 'Get in touch and our expert engineer will contact you within half an hour. Schedule your out-of-warranty service request online right now.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-primary-navy relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-bold tracking-wider text-accent-red uppercase mb-3">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
              Welcome to Customer Care Support
            </h3>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">
              We provide highly specialized and experienced repair techniques for all major home appliances including Washing Machines, Refrigerators, Microwaves, ACs, and LCD/LED TVs. We exclusively specialize in <strong className="text-white font-semibold">out-of-warranty service and repair</strong>.
            </p>
            <p className="text-blue-100/80 mb-8 leading-relaxed">
              Don’t let appliance issues disrupt your household any longer. Contact us today to schedule your repair service and experience the difference our expertise and commitment to excellence can make. Let us help you get your appliances back up and running smoothly.
            </p>
            <div className="flex items-center gap-4">
               <a 
                 href="tel:+918008070025" 
                 suppressHydrationWarning
                 className="inline-flex items-center gap-2 bg-accent-red hover:bg-accent-red-hover text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-accent-red/20"
               >
                 <PhoneCall size={18} />
                 +91 8008070025
               </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden lg:block"
          >
             <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
                <div className="relative h-full w-full overflow-hidden group">
                  <Image src="/images/refrigerator_repair_1787330589526.jpg" alt="Refrigerator Repair" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="relative h-full w-full overflow-hidden group">
                  <Image src="/images/tv_repair_1787330657558.jpg" alt="TV Repair" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="relative h-full w-full overflow-hidden group">
                  <Image src="/images/ac_repair_1787330633038.jpg" alt="AC Repair" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="relative h-full w-full overflow-hidden group">
                  <Image src="/images/microwave_repair_1787330645049.jpg" alt="Microwave Repair" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/95 via-primary-navy/40 to-primary-navy/10 pointer-events-none" />
             <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 flex items-center gap-5 shadow-xl">
                   <div className="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-accent-red/30">
                      <Clock className="text-white" size={24} />
                   </div>
                   <div>
                     <p className="text-white font-bold text-lg mb-0.5">Half-an-hour Response</p>
                     <p className="text-blue-100 text-sm">Quick callbacks from our expert engineers</p>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Why Choose Us Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-blue-100 text-lg">
            Quality service, affordable pricing, and guaranteed satisfaction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-red flex items-center justify-center mb-6 shadow-lg shadow-accent-red/20 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-blue-100/80 leading-relaxed text-sm md:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
