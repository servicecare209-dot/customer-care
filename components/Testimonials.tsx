import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Priya Sharma',
      role: 'Homeowner',
      text: 'Professional service experience and very easy booking process. The technician arrived on time and fixed my washing machine efficiently.',
      rating: 5,
      isDemo: true
    },
    {
      name: 'Rahul Verma',
      role: 'Customer',
      text: 'Great experience with my AC repair. The pricing was transparent and the technician was very knowledgeable. Highly recommended.',
      rating: 5,
      isDemo: true
    },
    {
      name: 'Anita Desai',
      role: 'Homeowner',
      text: 'I booked a refrigerator repair service and got a quick response. The issue was resolved the same day. Very satisfied with the service.',
      rating: 5,
      isDemo: true
    }
  ];

  return (
    <section className="py-24 bg-background-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-navy mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg">
            Read about the experiences of our satisfied customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative">
              {review.isDemo && (
                <div className="absolute top-0 right-0 bg-gray-100 text-gray-400 text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg rounded-tr-2xl">
                  Demo
                </div>
              )}
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-6 flex-grow italic">
                "{review.text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary-navy font-bold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
