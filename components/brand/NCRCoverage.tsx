'use client';

import { motion } from 'motion/react';
import { MapPin, Globe, CheckCircle2, ShieldCheck, Phone } from 'lucide-react';

export default function NCRCoverage() {
  // Exact 15 Location Service Areas requested by user
  const locationList = [
    'Bangalore',
    'Hyderabad',
    'Lucknow',
    'Mumbai',
    'Gurugram',
    'Greater Faridabad',
    'Faridabad',
    'Ghaziabad',
    'Noida & Greater Noida',
    'East Delhi',
    'West Delhi',
    'South Delhi',
    'North West Delhi',
    'Central Delhi',
    'North East Delhi',
  ];

  // Concentric 2-Ring Node Layout (Guarantees zero overlap & minimum 20% clearance between pills)
  const allNodes = [
    // Inner Ring — Metro Hubs (Radius ~26%)
    { name: 'Bangalore', top: '22%', left: '50%', ring: 'metro', delay: 0.1 },
    { name: 'Mumbai', top: '38%', left: '72%', ring: 'metro', delay: 0.15 },
    { name: 'Hyderabad', top: '62%', left: '72%', ring: 'metro', delay: 0.2 },
    { name: 'Lucknow', top: '62%', left: '28%', ring: 'metro', delay: 0.25 },
    { name: 'Gurugram', top: '38%', left: '28%', ring: 'metro', delay: 0.3 },

    // Outer Ring — NCR & Delhi Zones (Radius ~45%)
    { name: 'Noida & Greater Noida', top: '8%', left: '78%', ring: 'ncr', delay: 0.35 },
    { name: 'Ghaziabad', top: '24%', left: '92%', ring: 'ncr', delay: 0.4 },
    { name: 'Greater Faridabad', top: '50%', left: '94%', ring: 'ncr', delay: 0.45 },
    { name: 'Faridabad', top: '76%', left: '92%', ring: 'ncr', delay: 0.5 },
    { name: 'South Delhi', top: '92%', left: '74%', ring: 'ncr', delay: 0.55 },
    { name: 'Central Delhi', top: '95%', left: '50%', ring: 'ncr', delay: 0.6 },
    { name: 'East Delhi', top: '92%', left: '26%', ring: 'ncr', delay: 0.65 },
    { name: 'West Delhi', top: '76%', left: '8%', ring: 'ncr', delay: 0.7 },
    { name: 'North West Delhi', top: '50%', left: '6%', ring: 'ncr', delay: 0.75 },
    { name: 'North East Delhi', top: '24%', left: '8%', ring: 'ncr', delay: 0.8 },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50/60 to-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary-navy font-bold text-[11px] sm:text-xs tracking-wider uppercase mb-3 shadow-2xs">
            <MapPin size={13} className="text-accent-red" />
            <span>Location Service Area</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">
            Serving Customers Across <span className="text-primary-navy">India</span> Service Providers
          </h2>

          <p className="text-gray-600 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Doorstep home appliance service &amp; certified technician network available across all 15 operational service areas.
          </p>
        </div>

        {/* Desktop View: Multi-Orbit Radial Network Hub (Zero Overlap Guaranteed) */}
        <div className="hidden lg:block relative w-full max-w-5xl mx-auto h-[620px] mb-12 select-none">
          {/* Concentric Orbit Rings & Connecting Radial Fiber Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Inner Metro Orbit Circle */}
            <circle
              cx="50%"
              cy="50%"
              r="26%"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            {/* Outer NCR Orbit Circle */}
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            {/* Connecting Radial Lines from Center to all 15 Nodes */}
            {allNodes.map((node, i) => (
              <motion.line
                key={`line-${i}`}
                x1="50%"
                y1="50%"
                x2={node.left}
                y2={node.top}
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: node.delay * 0.4 }}
              />
            ))}
          </svg>

          {/* Central India Hub Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-28 h-28 bg-primary-navy rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative border-4 border-white">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary-navy rounded-full -z-10"
              />
              <Globe size={24} className="text-accent-red mb-1 animate-pulse" />
              <span className="font-extrabold text-sm tracking-wide">India</span>
              <span className="text-[9px] text-blue-200 uppercase font-semibold">Service Hub</span>
            </div>
          </motion.div>

          {/* All 15 Surrounding Location Nodes with Generous Clearances */}
          {allNodes.map((node) => (
            <motion.div
              key={node.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 16, delay: node.delay * 0.5 }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ top: node.top, left: node.left }}
            >
              <div className={`bg-white border shadow-md px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1.5 hover:border-primary-navy hover:text-primary-navy hover:shadow-lg transition-all hover:scale-105 cursor-default group whitespace-nowrap ${
                node.ring === 'metro' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200/90'
              }`}>
                <div className="w-2 h-2 rounded-full bg-accent-red group-hover:scale-125 transition-transform shrink-0" />
                <span>{node.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 15 Location Service Area Cards (Mobile & Tablet Optimized Grid) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-primary-navy flex items-center gap-1.5 sm:gap-2">
                <MapPin size={17} className="text-accent-red shrink-0" />
                <span>All 15 Location Service Areas</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                Verified doorstep technician support available across all zones
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-emerald-100 self-start sm:self-auto shrink-0">
              <CheckCircle2 size={13} className="shrink-0" />
              <span>30-Min Rapid Doorstep Dispatch</span>
            </div>
          </div>

          {/* Exact 15 Items Grid (2 cols on mobile, 3 cols on sm, 4 cols on md, 5 cols on lg) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {locationList.map((locationName, idx) => (
              <motion.div
                key={locationName}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: idx * 0.015 }}
                className="bg-gray-50/90 hover:bg-red-50/60 hover:border-accent-red/40 border border-gray-200/80 rounded-xl p-2.5 sm:p-3 transition-all group cursor-default flex items-start sm:items-center gap-2 min-h-[44px]"
              >
                <div className="w-2 h-2 rounded-full bg-accent-red shrink-0 mt-1 sm:mt-0 group-hover:scale-125 transition-transform" />
                <span className="font-bold text-xs sm:text-[13px] text-gray-900 group-hover:text-accent-red transition-colors leading-snug break-words">
                  {locationName}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Service Guarantee Footer */}
          <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[11px] sm:text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-primary-navy shrink-0" />
              <span><strong>Doorstep Support:</strong> Serving all 15 locations with verified multi-brand appliance experts.</span>
            </div>
            <a 
              href="tel:+918008070025" 
              className="font-bold text-primary-navy hover:text-accent-red transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <Phone size={12} className="text-accent-red" />
              <span>Helpline: +91 8008070025</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
