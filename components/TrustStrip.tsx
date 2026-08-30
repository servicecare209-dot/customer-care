import { Wrench, Home, IndianRupee, Clock } from 'lucide-react';

export default function TrustStrip() {
  const features = [
    {
      icon: <Wrench className="text-accent-red" size={28} strokeWidth={1.5} />,
      title: 'Experienced Technicians',
      desc: 'Skilled professionals for appliance repair.'
    },
    {
      icon: <Home className="text-accent-red" size={28} strokeWidth={1.5} />,
      title: 'Doorstep Service',
      desc: 'Convenient service at your home.'
    },
    {
      icon: <IndianRupee className="text-accent-red" size={28} strokeWidth={1.5} />,
      title: 'Transparent Pricing',
      desc: 'Clear service information before work begins.'
    },
    {
      icon: <Clock className="text-accent-red" size={28} strokeWidth={1.5} />,
      title: 'Quick Response',
      desc: 'Fast assistance for service requests.'
    }
  ];

  return (
    <section className="bg-white border-y border-gray-100 relative z-10 -mt-8 mx-4 sm:mx-6 lg:mx-8 rounded-2xl shadow-sm lg:shadow-none lg:rounded-none lg:mx-0 lg:mt-0 lg:bg-transparent lg:border-none">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8 lg:py-12 lg:bg-white lg:rounded-3xl lg:shadow-xl lg:border lg:border-gray-100 lg:-translate-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {features.map((feature, i) => (
            <div key={i} className={`flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-4 ${i !== 0 ? 'pt-8 md:pt-0 md:pl-8 lg:pl-0' : ''}`}>
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-primary-navy mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
