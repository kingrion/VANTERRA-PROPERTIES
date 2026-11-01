import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, MapPin, Mail, Phone, Clock, Globe, ArrowRight, Shield, Send } from 'lucide-react';

export const GlobalPresenceSection: React.FC = () => {
  const { offices, setCurrentView } = useApp();
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>(offices[0]?.id || 'office-us-hq');

  const activeOffice = offices.find((o) => o.id === selectedOfficeId) || offices[0];

  // International Property Markets (distinct from corporate offices, as instructed)
  const internationalMarkets = [
    {
      country: 'United States',
      hubs: 'New York, Greenwich, Palm Beach, Miami Beach',
      role: 'Principal Global Market & Headquarters Hub',
      currency: 'USD ($)'
    },
    {
      country: 'Italy',
      hubs: 'Milan, Lake Como, Tuscany, Rome',
      role: 'European Corporate Hub & Mediterranean Portfolios',
      currency: 'EUR (€)'
    },
    {
      country: 'England',
      hubs: 'London (Belgravia, Mayfair, Knightsbridge), Surrey',
      role: 'Prime Central London Residential Advisory',
      currency: 'GBP (£)'
    },
    {
      country: 'Global Expansion Corridors',
      hubs: 'Switzerland, French Riviera, Dubai & Singapore',
      role: 'Strategic Family Office Cross-Border Networks',
      currency: 'Multi-Currency Mandates'
    }
  ];

  return (
    <section id="presence-section" className="py-24 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Globe className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
              INTERNATIONAL REAL ESTATE NETWORK
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1E8] tracking-tight mb-4">
            Our Global Presence
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-[#C6A66B] font-normal mb-3">
            "Connecting Exceptional Properties with Extraordinary Opportunities."
          </p>

          <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
            VANTERRA operates from premier world financial and cultural centres, bridging sovereign private clients and cross-border portfolios with unmatched international perspective.
          </p>
        </div>

        {/* Corporate Office Locations Tabs / Cards */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {offices.map((office) => (
              <button
                key={office.id}
                onClick={() => setSelectedOfficeId(office.id)}
                className={`w-full sm:w-auto px-6 py-3 border text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                  selectedOfficeId === office.id
                    ? 'border-[#C6A66B] bg-[#C6A66B]/15 text-[#C6A66B]'
                    : 'border-neutral-800 text-[#A7A7A7] hover:text-[#F5F1E8] hover:border-neutral-700 bg-[#151515]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{office.title.split('—')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Active Office Spotlight Card */}
          {activeOffice && (
            <div className="bg-[#121212] border border-[#C6A66B]/30 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
              {/* Left Column: Office Details */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C6A66B]/10 border border-[#C6A66B]/40 text-[#C6A66B] text-[10px] uppercase tracking-[0.25em] font-mono mb-4">
                  {activeOffice.isHeadquarters ? 'WORLD HEADQUARTERS' : 'CONTINENTAL EUROPEAN OFFICE'}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] font-light mb-2">
                  {activeOffice.title}
                </h3>
                <p className="text-xs text-[#C6A66B] uppercase tracking-wider mb-6 font-mono">
                  {activeOffice.subtitle}
                </p>

                <p className="text-sm text-[#F5F1E8]/90 font-light leading-relaxed mb-8">
                  "{activeOffice.description}"
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-800 pt-6 text-xs text-[#A7A7A7]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#777] font-mono">Address</span>
                      <span className="text-[#F5F1E8] font-medium">{activeOffice.address}</span>
                      <span className="block text-[#A7A7A7]">{activeOffice.postalCode}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#777] font-mono">Private Appointment Desk</span>
                      <span className="text-[#F5F1E8] font-medium">{activeOffice.hours}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Send className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#777] font-mono">Telegram Address</span>
                      <a
                        href="https://t.me/MariaGallo01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#64b5f6] hover:text-[#C6A66B] font-mono transition-colors"
                      >
                        @MariaGallo01
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#777] font-mono">Direct Contact Telephone</span>
                      <a
                        href="tel:+13027296657"
                        className="text-[#F5F1E8] hover:text-[#C6A66B] font-mono transition-colors"
                      >
                        +1 (302) 729-6657
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center gap-4">
                  <button
                    onClick={() => {
                      setCurrentView('consultation');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer shadow-md"
                  >
                    Schedule Office Appointment
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 border border-neutral-700 hover:border-[#C6A66B] text-[#F5F1E8] text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  >
                    View Directory
                  </button>
                </div>
              </div>

              {/* Right Column: Architectural Schematic / Map Coordinates */}
              <div className="lg:col-span-5 bg-[#080808] border border-neutral-800 p-6 flex flex-col justify-between min-h-[340px]">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#A7A7A7] font-mono uppercase tracking-widest border-b border-neutral-800 pb-3 mb-4">
                    <span>GEOGRAPHIC COORDINATES</span>
                    <span className="text-[#C6A66B]">{activeOffice.coordinates.lat}° N, {Math.abs(activeOffice.coordinates.lng)}° {activeOffice.coordinates.lng < 0 ? 'W' : 'E'}</span>
                  </div>

                  {/* Stylized Minimalist Map Blueprint */}
                  <div className="w-full aspect-video bg-[#0d0d0d] border border-neutral-800 relative flex items-center justify-center overflow-hidden p-4 text-center">
                    {/* Architectural grid background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border border-[#C6A66B] bg-[#C6A66B]/20 flex items-center justify-center mb-2 animate-pulse">
                        <MapPin className="w-5 h-5 text-[#C6A66B]" />
                      </div>
                      <span className="font-serif text-lg text-[#F5F1E8] font-light">{activeOffice.city}</span>
                      <span className="text-[10px] text-[#A7A7A7] uppercase tracking-widest font-mono mt-0.5">{activeOffice.country}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-[#A7A7A7]">
                  <span>Private Boardrooms Available</span>
                  <span className="text-[#C6A66B]">Compliant with Diplomatic Protocols</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* International Property Markets Grid (Distinct from Offices as mandated) */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono">
                MARKET COVERAGE
              </span>
              <h3 className="font-serif text-2xl text-[#F5F1E8] font-light">
                Active International Property Markets
              </h3>
            </div>
            <p className="text-xs text-[#A7A7A7] hidden sm:block font-light">
              Listing availability is independent of physical office locations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internationalMarkets.map((market, idx) => (
              <div key={idx} className="p-6 bg-[#121212] border border-neutral-800/80 hover:border-[#C6A66B]/40 transition-colors">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A66B] font-mono block mb-2">
                  Market 0{idx + 1} · {market.currency}
                </span>
                <h4 className="font-serif text-xl text-[#F5F1E8] mb-2">{market.country}</h4>
                <p className="text-xs text-[#A7A7A7] font-light leading-relaxed mb-4">
                  {market.hubs}
                </p>
                <div className="text-[11px] text-[#C6A66B]/90 font-mono tracking-wider pt-3 border-t border-neutral-800">
                  {market.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
