'use client';

import Image from 'next/image';
import { ArrowRight, Phone, CalendarCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useBookingModal } from '@/context/BookingContext';

export default function Services() {
  const { openBookingModal } = useBookingModal();

  const services = [
    {
      title: 'Washing Machine Repair',
      desc: 'Expert troubleshooting, motor repairs, spin cycle issues, and water drainage fixes for top-load and front-load machines.',
      img: '/images/washing_machine_repair_1787330573959.jpg'
    },
    {
      title: 'Refrigerator Repair',
      desc: 'Professional refrigerator inspection, cooling diagnosis, compressor repair, and gas refilling for all fridge types.',
      img: '/images/refrigerator_repair_1787330589526.jpg'
    },
    {
      title: 'Air Conditioner Service',
      desc: 'AC troubleshooting, seasonal maintenance, filter cleaning, gas charging, and cooling repair for Split and Window ACs.',
      img: '/images/ac_repair_1787330633038.jpg'
    },
    {
      title: 'Microwave Repair',
      desc: 'Reliable microwave oven repair for heating issues, magnetron replacement, display errors, and keypad malfunctions.',
      img: '/images/microwave_repair_1787330645049.jpg'
    },
    {
      title: 'TV Repair',
      desc: 'Professional television troubleshooting, panel issues, sound repair, motherboard fixing, and display restoration.',
      img: '/images/tv_repair_1787330657558.jpg'
    },
    {
      title: 'Other Home Appliances',
      desc: 'Fast doorstep customer support for chimneys, geysers, water purifiers, and other essential household appliances.',
      img: '/images/other_appliances_1787330675935.jpg'
    }
  ];

  return (
    <section id="services" className="py-20 bg-background-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary-navy font-semibold text-xs tracking-wider uppercase mb-4">
            Doorstep Services
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-navy mb-4">
            Our Appliance Repair Services
          </h2>
          <p className="text-gray-600 text-lg">
            Professional doorstep assistance for all major home appliance brands across Delhi NCR.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service.title} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => openBookingModal(service.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openBookingModal(service.title);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Book ${service.title} service`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-navy hover:-translate-y-1"
            >
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <Image 
                  src={service.img} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs text-white font-semibold bg-accent-red px-2.5 py-1 rounded-full shadow">
                    Click to Book
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-primary-navy mb-2 group-hover:text-accent-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                  {service.desc}
                </p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openBookingModal(service.title);
                    }}
                    suppressHydrationWarning
                    className="flex items-center text-accent-red font-semibold text-sm hover:text-accent-red-hover transition-colors group/btn cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <span className="text-xs text-gray-400 font-medium">30-Min Response</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Fast Assistance Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-primary-navy mb-1">
              Need immediate doorstep assistance in Delhi NCR?
            </h4>
            <p className="text-gray-600 text-sm">
              Our verified technicians are available across Delhi, Noida, Gurugram, Ghaziabad & Faridabad.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openBookingModal('General Appliance Repair')}
              suppressHydrationWarning
              className="inline-flex items-center justify-center gap-2 bg-accent-red hover:bg-accent-red-hover active:scale-[0.99] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-accent-red/20 transition-all cursor-pointer"
            >
              <CalendarCheck size={16} />
              Book Online
            </button>
            <a
              href="tel:+918008070025"
              suppressHydrationWarning
              className="inline-flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-navy-light text-white px-5 py-3 rounded-xl font-bold text-sm transition-all"
            >
              <Phone size={16} />
              Call +91 8008070025
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
