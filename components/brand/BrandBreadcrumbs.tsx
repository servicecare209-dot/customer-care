import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BrandData } from '@/lib/brandData';

export default function BrandBreadcrumbs({ brand }: { brand: BrandData }) {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-primary-navy transition-colors flex items-center gap-1">
              <Home size={14} />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li>
            <ChevronRight size={14} className="text-gray-400" />
          </li>
          <li>
            <Link href="/#services" className="hover:text-primary-navy transition-colors">
              Brands
            </Link>
          </li>
          <li>
            <ChevronRight size={14} className="text-gray-400" />
          </li>
          <li>
            <span className="text-primary-navy font-semibold" aria-current="page">
              {brand.name} Service
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}