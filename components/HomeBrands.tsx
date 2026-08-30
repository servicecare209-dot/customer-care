'use client';

import Link from 'next/link';
import { brands } from '@/lib/brandData';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function HomeBrands() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary-navy font-semibold text-xs tracking-wider uppercase mb-4">
            <Sparkles size={14} className="text-accent-red" />
            Specialized Brand Support
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-navy mb-4">
            Major Appliance Brands We Service
          </h2>
          <p className="text-gray-600 text-lg">
            We provide expert out-of-warranty doorstep diagnostic and repair solutions for all premier Indian and international home appliance manufacturers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
            >
              <Link
                href={`/brand/${brand.slug}`}
                className="h-full bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-navy hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-extrabold text-primary-navy group-hover:text-accent-red transition-colors">
                      {brand.name}
                    </span>
                    <span className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 shadow-2xs flex items-center gap-1">
                      <ShieldCheck size={12} className="text-accent-red" /> Support
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed mb-4">
                    {brand.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs font-bold text-accent-red group-hover:text-accent-red-hover">
                  <span>{brand.name} Repair Service</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
