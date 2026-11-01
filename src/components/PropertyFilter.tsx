import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, SlidersHorizontal, RotateCcw, X, ChevronDown } from 'lucide-react';
import { PropertyCategory, PropertyAvailability } from '../types';

export const PropertyFilter: React.FC = () => {
  const { filters, setFilters, resetFilters, properties } = useApp();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Extract unique countries and cities from properties
  const countries = Array.from(new Set(properties.map((p) => p.country))).sort();
  const cities = Array.from(new Set(properties.map((p) => p.city))).sort();

  const categories: PropertyCategory[] = [
    'Luxury Mansions',
    'Contemporary Villas',
    'Luxury Apartments',
    'Penthouses',
    'Modern Residences',
    'Waterfront Properties',
    'Commercial Real Estate',
    'Investment Properties',
    'Exclusive Estates'
  ];

  const availabilities: PropertyAvailability[] = [
    'AVAILABLE',
    'EXCLUSIVE',
    'UNDER OFFER',
    'SOLD',
    'SOLD OUT'
  ];

  return (
    <div className="w-full bg-[#151515] border border-neutral-800 p-4 sm:p-6 mb-8">
      {/* Primary Discovery Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Keyword Input */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-[#A7A7A7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search address, city, estate name, reference..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] placeholder-[#777] outline-none transition-colors"
          />
        </div>

        {/* Country Selector */}
        <div className="md:col-span-3">
          <select
            value={filters.country}
            onChange={(e) => setFilters((prev) => ({ ...prev, country: e.target.value }))}
            className="w-full px-3 py-2.5 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none cursor-pointer uppercase tracking-wider"
          >
            <option value="all">All Countries / Territories</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selector */}
        <div className="md:col-span-3">
          <select
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2.5 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none cursor-pointer uppercase tracking-wider"
          >
            <option value="all">All Property Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Filters Toggle & Reset */}
        <div className="md:col-span-2 flex items-center gap-2">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 border text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              isAdvancedOpen
                ? 'border-[#C6A66B] text-[#C6A66B] bg-[#080808]'
                : 'border-neutral-700 text-[#A7A7A7] hover:text-[#F5F1E8] hover:border-neutral-600 bg-[#080808]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <button
            onClick={resetFilters}
            className="p-2.5 border border-neutral-700 hover:border-[#C6A66B] text-[#A7A7A7] hover:text-[#C6A66B] bg-[#080808] transition-colors cursor-pointer"
            title="Reset filters"
            aria-label="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Advanced Expandable Filter Panel */}
      {isAdvancedOpen && (
        <div className="mt-5 pt-5 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
          {/* City */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] mb-1.5 font-mono">
              City / Enclave
            </label>
            <select
              value={filters.city}
              onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
              className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
            >
              <option value="all">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Status */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] mb-1.5 font-mono">
              Availability Status
            </label>
            <select
              value={filters.availability}
              onChange={(e) => setFilters((prev) => ({ ...prev, availability: e.target.value }))}
              className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
            >
              <option value="all">All Statuses</option>
              {availabilities.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] mb-1.5 font-mono">
              Minimum Bedrooms
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  bedrooms: e.target.value === 'all' ? 'all' : Number(e.target.value)
                }))
              }
              className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
            >
              <option value="all">Any Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
              <option value="6">6+ Bedrooms</option>
            </select>
          </div>

          {/* Price Range (500k - 800k) */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] mb-1.5 font-mono">
              Fascia di Prezzo / Price (USD & EUR)
            </label>
            <select
              value={`${filters.minPrice}-${filters.maxPrice}`}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'all') {
                  setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 10000000 }));
                } else {
                  const [min, max] = val.split('-').map(Number);
                  setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
                }
              }}
              className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none font-mono"
            >
              <option value="all">Tutti i Prezzi / All ($500k – $800k)</option>
              <option value="500000-650000">$500k – $650k (ca. €460k – €598k)</option>
              <option value="600000-600000">$600,000 Contemporary Villa (€552k)</option>
              <option value="650000-750000">$650k – $750k (ca. €598k – €690k)</option>
              <option value="750000-800000">$750k – $800k (ca. €690k – €736k)</option>
            </select>
          </div>

          {/* Sorting Order */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] mb-1.5 font-mono">
              Sort Portfolio By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as any
                }))
              }
              className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
            >
              <option value="featured">Featured Curated Listings</option>
              <option value="newest">Newest Acquisitions</option>
              <option value="price_desc">Price: Highest to Lowest</option>
              <option value="price_asc">Price: Lowest to Highest</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
