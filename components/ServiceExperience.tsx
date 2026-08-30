import Image from 'next/image';

export default function ServiceExperience() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-navy leading-tight mb-6">
              Professional Service.<br />Simple Experience.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              We focus on providing a seamless repair experience from the moment you book until your appliance is up and running.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-primary-navy font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Easy Booking</h4>
                  <p className="text-gray-500 mt-1">Schedule a visit with just a few clicks or a quick phone call.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-primary-navy font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Expert Diagnosis</h4>
                  <p className="text-gray-500 mt-1">Our technicians arrive fully equipped to identify the issue.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-primary-navy font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Reliable Repair</h4>
                  <p className="text-gray-500 mt-1">Professional service using proper tools and techniques.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/experience.jpg" 
                alt="Professional technician working"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating UI Card 1 */}
            <div className="absolute top-10 -left-6 md:-left-12 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 min-w-[200px] animate-[fade-up_1s_ease-out_0.5s_both]">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Service Requested</p>
              <p className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>
                Washing Machine Repair
              </p>
            </div>
            
            {/* Floating UI Card 2 */}
            <div className="absolute top-1/2 -right-6 md:-right-10 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 min-w-[180px] animate-[fade-up_1s_ease-out_0.7s_both]">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Status</p>
              <p className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 block"></span>
                Technician Assigned
              </p>
            </div>
            
            {/* Floating UI Card 3 */}
            <div className="absolute bottom-16 -left-4 md:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 min-w-[180px] animate-[fade-up_1s_ease-out_0.9s_both]">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Service</p>
              <p className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
                Doorstep Visit
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
