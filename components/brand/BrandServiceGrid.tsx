'use client';

import { motion } from 'motion/react';
import { BrandData } from '@/lib/brandData';
import { Wind, Snowflake, Monitor, Flame, Droplets } from 'lucide-react';

const iconMap = {
  'washing-machine': Droplets,
  'refrigerator': Snowflake,
  'ac': Wind,
  'microwave': Flame,
  'tv': Monitor,
};

export default function BrandServiceGrid({ brand }: { brand: BrandData }) {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Supported <span className="text-primary-navy">{brand.name}</span> Appliances
          </h2>
          <p className="text-gray-600 text-lg">
            Our specialized technicians are highly trained in servicing the full range of {brand.name} home appliances across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brand.services.map((service, i) => {
            const Icon = iconMap[service.iconType];
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:shadow-xl hover:shadow-primary-navy/5 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-navy transition-colors duration-300">
                  <Icon size={28} className="text-primary-navy group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}