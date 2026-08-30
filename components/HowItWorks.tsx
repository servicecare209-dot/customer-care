export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Book a Service',
      desc: 'Submit your service request.'
    },
    {
      num: '02',
      title: 'Get a Confirmation',
      desc: 'Our team confirms your request.'
    },
    {
      num: '03',
      title: 'Technician Visit',
      desc: 'A technician visits your location.'
    },
    {
      num: '04',
      title: 'Get Your Appliance Serviced',
      desc: 'Your appliance is inspected and serviced.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-navy mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            A simple 4-step process to get your appliance running again.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border-8 border-background-soft shadow-lg flex items-center justify-center relative z-10 mb-6">
                  <span className="text-2xl font-bold text-accent-red">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
