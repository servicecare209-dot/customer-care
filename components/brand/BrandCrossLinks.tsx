'use client';

import Link from 'next/link';
import { brands, BrandData } from '@/lib/brandData';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BrandCrossLinks({ currentBrand }: { currentBrand: BrandData }) {
  const otherBrands = brands.filter((b) => b.slug !== currentBrand.slug);

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary-navy font-semibold text-xs uppercase tracking-wider mb-4 border border-blue-100">
            <Sparkles size={14} className="text-accent-red" />
            Complete Brand Network
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Explore Other <span className="text-primary-navy">Appliance Brands</span> We Service
          </h2>
          <p className="text-gray-600 text-base">
            In addition to {currentBrand.name}, our certified technicians provide prompt doorstep diagnostics and out-of-warranty repair for all leading home appliance manufacturers across Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {otherBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brand/${brand.slug}`}
              className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-primary-navy hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <p className="font-bold text-gray-900 group-hover:text-primary-navy transition-colors text-base">
                  {brand.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Appliance Support
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-accent-red group-hover:translate-x-1 transition-transform">
                <span>View Service</span>
                <ArrowRight size={12} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
