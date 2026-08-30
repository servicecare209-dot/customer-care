import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Services from '@/components/Services';
import HomeBrands from '@/components/HomeBrands';
import FeaturedService from '@/components/FeaturedService';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServiceExperience from '@/components/ServiceExperience';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';

export const metadata: Metadata = {
  title: 'Home Appliance Repair & Service in India | Customer Care',
  description: 'Expert doorstep home appliance repair in India. Certified technicians for washing machines, fridges, ACs, microwaves & TVs. Call +91 8008070025!',
  alternates: {
    canonical: 'https://customercarerepaircenter.com/',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Home Appliance Repair & Service in India | Customer Care',
    description: 'Expert doorstep home appliance repair in India. Certified technicians for washing machines, fridges, ACs, microwaves & TVs. Call +91 8008070025!',
    url: 'https://customercarerepaircenter.com/',
    siteName: 'Customer Care Appliance Repair',
    images: [
      {
        url: 'https://customercarerepaircenter.com/images/indian_customer_repair_1787336376855.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Home Appliance Repair Technician in India',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Appliance Repair & Service in India | Customer Care',
    description: 'Expert doorstep home appliance repair in India. Certified technicians for washing machines, fridges, ACs, microwaves & TVs.',
    images: ['https://customercarerepaircenter.com/images/indian_customer_repair_1787336376855.jpg'],
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Organization Schema
      {
        '@type': 'Organization',
        '@id': 'https://customercarerepaircenter.com/#organization',
        'name': 'Aksha Traders',
        'alternateName': 'Customer Care Appliance Repair',
        'url': 'https://customercarerepaircenter.com/',
        'logo': 'https://customercarerepaircenter.com/images/logo.png',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+91-8008070025',
          'contactType': 'customer support',
          'areaServed': 'IN',
          'availableLanguage': ['en', 'hi']
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '1009, Shiv Colony, Old Faridabad',
          'addressLocality': 'Faridabad',
          'addressRegion': 'Haryana',
          'postalCode': '121002',
          'addressCountry': 'IN'
        }
      },
      // 2. LocalBusiness Schema with AggregateRating
      {
        '@type': 'LocalBusiness',
        '@id': 'https://customercarerepaircenter.com/#business',
        'name': 'Customer Care Appliance Repair - Aksha Traders',
        'image': 'https://customercarerepaircenter.com/images/indian_customer_repair_1787336376855.jpg',
        'description': 'Leading independent doorstep appliance repair service provider across India for washing machines, refrigerators, air conditioners, microwaves, and TVs.',
        'url': 'https://customercarerepaircenter.com/',
        'telephone': '+918008070025',
        'priceRange': '₹₹',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '1009, Shiv Colony, Old Faridabad',
          'addressLocality': 'Faridabad',
          'addressRegion': 'Haryana',
          'postalCode': '121002',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 28.4089,
          'longitude': 77.3178
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
              'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
            ],
            'opens': '08:00',
            'closes': '21:00'
          }
        ],
        'areaServed': [
          'Bangalore', 'Hyderabad', 'Lucknow', 'Mumbai', 'Gurugram', 'Greater Faridabad', 'Faridabad', 'Ghaziabad', 'Noida & Greater Noida', 'East Delhi', 'West Delhi', 'South Delhi', 'North West Delhi', 'Central Delhi', 'North East Delhi'
        ],
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'reviewCount': '1420',
          'bestRating': '5',
          'worstRating': '1'
        }
      },
      // 3. WebSite Schema with SearchAction
      {
        '@type': 'WebSite',
        '@id': 'https://customercarerepaircenter.com/#website',
        'url': 'https://customercarerepaircenter.com/',
        'name': 'Customer Care Appliance Repair',
        'publisher': {
          '@id': 'https://customercarerepaircenter.com/#organization'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <Hero />
        <TrustStrip />
        <Services />
        <HomeBrands />
        <FeaturedService />
        <HowItWorks />
        <WhyChooseUs />
        <ServiceExperience />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
