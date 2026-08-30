'use client';

import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function NCRCoverage() {
  const nodes = [
    { name: 'Sonipat', top: '10%', left: '50%', delay: 0.8 },
    { name: 'Ghaziabad', top: '35%', left: '85%', delay: 0.5 },
    { name: 'Noida & Gr. Noida', top: '75%', left: '80%', delay: 0.6 },
    { name: 'Faridabad', top: '90%', left: '50%', delay: 0.7 },
    { name: 'Gurugram', top: '75%', left: '20%', delay: 0.4 },
    { name: 'Bahadurgarh', top: '35%', left: '15%', delay: 0.9 },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Serving Customers Across <span className="text-primary-navy">Delhi NCR</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Our specialized engineers are stationed across the National Capital Region to provide rapid, doorstep service whenever you need it.
          </p>
        </div>

        {/* Mobile View: Simple Grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-primary-navy text-white rounded-2xl p-4 flex items-center justify-center font-bold text-lg shadow-lg">
            <MapPin className="mr-2 text-accent-red" /> Central Delhi
          </div>
          {nodes.map((node) => (
            <div key={node.name} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center text-sm font-semibold text-gray-700">
              {node.name}
            </div>
          ))}
        </div>

        {/* Desktop View: Node Visualization */}
        <div className="hidden md:block relative w-full max-w-3xl mx-auto h-[500px]">
          {/* Connecting Lines (Simulated via SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {nodes.map((node, i) => (
              <motion.line
                key={`line-${i}`}
                x1="50%"
                y1="50%"
                x2={node.left}
                y2={node.top}
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: node.delay - 0.2 }}
              />
            ))}
          </svg>

          {/* Central Delhi Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-24 h-24 bg-primary-navy rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary-navy rounded-full -z-10"
              />
              <MapPin size={24} className="text-accent-red mb-1" />
              <span className="font-bold text-sm">Delhi</span>
            </div>
          </motion.div>

          {/* Surrounding Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: node.delay }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ top: node.top, left: node.left }}
            >
              <div className="bg-white border border-gray-200 shadow-lg px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center gap-2 hover:border-primary-navy hover:text-primary-navy transition-colors cursor-default">
                <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
                {node.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}