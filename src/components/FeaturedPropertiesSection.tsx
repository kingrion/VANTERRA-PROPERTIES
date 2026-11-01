import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { PropertyFilter } from './PropertyFilter';
import { Compass, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PropertyCategory } from '../types';

export const FeaturedPropertiesSection: React.FC = () => {
  const { filteredProperties, setFilters, filters } = useApp();
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');

  const categoryShortcuts = [
    { label: 'All Curated Residences', value: 'all' },
    { label: 'Contemporary Villas', value: 'Contemporary Villas' },
    { label: 'Luxury Mansions', value: 'Luxury Mansions' },
    { label: 'Waterfront Estates', value: 'Waterfront Properties' },
    { label: 'Penthouses', value: 'Penthouses' },
    { label: 'Modern Residences', value: 'Modern Residences' }
  ];

  const handleCategoryTabClick = (val: string) => {
    setActiveCategoryTab(val);
    setFilters((prev) => ({ ...prev, category: val }));
  };

  return (
    <section id="properties-section" className="py-24 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Compass className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
                INTERNATIONAL RESIDENTIAL PORTFOLIO
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1E8] tracking-tight">
              Exceptional Properties.{' '}
              <span className="italic text-[#C6A66B] font-normal">Prestigious Addresses.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#A7A7A7] font-light mt-4 md:mt-0 leading-relaxed">
            Representing architectural sanctuaries across premier global markets, presented with cinema-grade fidelity and verified specifications.
          </p>
        </div>

        {/* Quick Category Tabs (§1.A: Functional buttons with click handlers) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {categoryShortcuts.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryTabClick(cat.value)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                activeCategoryTab === cat.value
                  ? 'border-[#C6A66B] bg-[#C6A66B] text-[#080808] font-bold shadow-md'
                  : 'border-neutral-800 bg-[#121212] text-[#A7A7A7] hover:text-[#F5F1E8] hover:border-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Comprehensive Discovery Search & Filter Component */}
        <PropertyFilter />

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#121212] border border-neutral-800 p-8">
            <Compass className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#F5F1E8] mb-2 font-light">No Properties Match Your Criteria</h3>
            <p className="text-xs text-[#A7A7A7] max-w-md mx-auto mb-6">
              Adjust your filter parameters or request a confidential off-market search through our private client desk.
            </p>
            <button
              onClick={() => setFilters({
                searchQuery: '',
                country: 'all',
                city: 'all',
                category: 'all',
                availability: 'all',
                minPrice: 0,
                maxPrice: 100000000,
                bedrooms: 'all',
                bathrooms: 'all',
                sortBy: 'featured'
              })}
              className="px-6 py-2.5 bg-[#C6A66B] text-[#080808] text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
