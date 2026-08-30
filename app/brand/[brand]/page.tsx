import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { brands, getBrandBySlug } from '@/lib/brandData';
import BrandHero from '@/components/brand/BrandHero';
import BrandBreadcrumbs from '@/components/brand/BrandBreadcrumbs';
import BrandOverview from '@/components/brand/BrandOverview';
import BrandServiceGrid from '@/components/brand/BrandServiceGrid';
import ServiceProcess from '@/components/brand/ServiceProcess';
import NCRCoverage from '@/components/brand/NCRCoverage';
import BrandFAQ from '@/components/brand/BrandFAQ';
import BrandGallery from '@/components/brand/BrandGallery';
import BrandCrossLinks from '@/components/brand/BrandCrossLinks';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

// In Next.js 15, route params are Promises.
type Props = {
  params: Promise<{ brand: string }>;
};

// Generate static routes for all 12 brands at build time
export async function generateStaticParams() {
  return brands.map((brand) => ({
    brand: brand.slug,
  }));
}

// Generate highly optimized technical SEO metadata per brand
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const brand = getBrandBySlug(resolvedParams.brand);
  
  if (!brand) return {};

  const pageUrl = `https://customercarerepaircenter.com/brand/${brand.slug}`;
  const imageUrl = `https://customercarerepaircenter.com${brand.heroImage}`;

  return {
    title: brand.seoTitle,
    description: brand.seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title: brand.seoTitle,
      description: brand.seoDescription,
      url: pageUrl,
      siteName: 'Customer Care Appliance Repair',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${brand.name} Appliance Repair Service in Delhi NCR`,
        }
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: brand.seoTitle,
      description: brand.seoDescription,
      images: [imageUrl],
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const resolvedParams = await params;
  const brand = getBrandBySlug(resolvedParams.brand);

  if (!brand) {
    notFound();
  }

  const pageUrl = `https://customercarerepaircenter.com/brand/${brand.slug}`;
  const imageUrl = `https://customercarerepaircenter.com${brand.heroImage}`;

  // Generate 4-Tier Structured Data (LocalBusiness + BreadcrumbList + FAQPage + Service)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. LocalBusiness / Service Provider Schema
      {
        '@type': 'LocalBusiness',
        '@id': `${pageUrl}#business`,
        'name': `Independent ${brand.name} Appliance Repair Service - Aksha Traders`,
        'alternateName': `Customer Care ${brand.name} Repair`,
        'image': imageUrl,
        'description': brand.seoDescription,
        'url': pageUrl,
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
          'Delhi', 'New Delhi', 'Noida', 'Greater Noida', 'Gurugram', 'Faridabad', 'Ghaziabad', 'Sonipat', 'Bahadurgarh'
        ],
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'reviewCount': '480',
          'bestRating': '5',
          'worstRating': '1'
        }
      },
      // 2. BreadcrumbList Schema
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://customercarerepaircenter.com/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Brands',
            'item': 'https://customercarerepaircenter.com/#services'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': `${brand.name} Service`,
            'item': pageUrl
          }
        ]
      },
      // 3. FAQPage Schema for Google Rich Snippets
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        'mainEntity': brand.faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.a
          }
        }))
      },
      // 4. Specific Service Offer Catalog Schema
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        'name': `${brand.name} Appliance Repair & Maintenance`,
        'serviceType': 'Appliance Repair',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Aksha Traders'
        },
        'areaServed': {
          '@type': 'State',
          'name': 'Delhi NCR'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': `${brand.name} Repair Solutions`,
          'itemListElement': brand.services.map((svc) => ({
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': svc.name,
              'description': svc.description
            }
          }))
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
      
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <BrandBreadcrumbs brand={brand} />
        <BrandHero brand={brand} />
        <BrandOverview brand={brand} />
        <BrandServiceGrid brand={brand} />
        <ServiceProcess />
        <NCRCoverage />
        <BrandGallery brand={brand} />
        <BrandFAQ brand={brand} />
        <BrandCrossLinks currentBrand={brand} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
