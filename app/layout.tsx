import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

const poppinsSerif = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Appliance Repair & Customer Care Service | Customer Care',
  description: 'Expert appliance repair at your doorstep. Professional technicians for washing machine, refrigerator, AC, microwave, and TV repair.',
  icons: {
    icon: '/images/logo.png',
  },
  verification: {
    google: 'eL8UXy8K0Un895mx8W0lpfAFtRvieTkBoJfHC39v6GU',
  },
};

import { BookingProvider } from '@/context/BookingContext';
import BookingModal from '@/components/BookingModal';
import CookieBanner from '@/components/CookieBanner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppinsSerif.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased text-gray-900 bg-gray-50 flex flex-col min-h-screen" suppressHydrationWarning>
        <BookingProvider>
          {children}
          <BookingModal />
          <CookieBanner />
        </BookingProvider>
      </body>
    </html>
  );
}
