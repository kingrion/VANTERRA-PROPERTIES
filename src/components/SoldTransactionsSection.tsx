import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowUpRight, Award, Lock } from 'lucide-react';

export const SoldTransactionsSection: React.FC = () => {
  const { properties, openPropertyDetail, setCurrentView, formatDualPrice, openItalianTranscription } = useApp();

  // Filter properties that have been completed/sold
  const soldProperties = properties.filter(
    (p) => p.availability === 'SOLD' || p.availability === 'SOLD OUT' || p.isSoldCollection
  );

  return (
    <section id="sold-section" className="py-24 bg-[#0d0d0d] border-t border-neutral-900 relative overflow-hidden">
      {/* Background architectural glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A66B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-neutral-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
                CONFIDENTIAL PORTFOLIO TRACK RECORD
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1E8] tracking-tight">
              Exceptional Properties.{' '}
              <span className="italic text-[#C6A66B]">Extraordinary Transactions.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#A7A7A7] font-light mt-4 md:mt-0 leading-relaxed">
            Representing premier acquisitions and off-market disposals across global financial capitals with absolute discretion and market-defining benchmarks.
          </p>
        </div>

        {/* Featured Manhattan Transaction Spotlight */}
        {soldProperties.map((prop) => (
          <div
            key={prop.id}
            className="mb-12 bg-[#151515] border border-[#C6A66B]/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
          >
            {/* Visual media half */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[460px] bg-[#000]">
              <img
                src={prop.media[0]?.url || '/assets/aistudio/image_5bcd0bb1.png'}
                alt={prop.name}
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/40" />

              {/* Gold SOLD OUT Seal */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <div className="px-4 py-2 bg-[#C6A66B] text-[#080808] font-bold text-xs tracking-[0.25em] uppercase border border-[#e2c792] shadow-2xl flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>SOLD OUT</span>
                </div>
                <div className="px-3 py-2 bg-[#080808]/90 text-[#F5F1E8] text-[10px] font-mono tracking-widest uppercase border border-neutral-700 backdrop-blur-md">
                  TRANSACTION CONCLUDED
                </div>
              </div>

              {/* Location Badge */}
              <div className="absolute bottom-6 left-6 text-xs text-[#F5F1E8] font-mono tracking-wider bg-[#080808]/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
                {prop.city}, {prop.country}
              </div>
            </div>

            {/* Narrative and Transaction Record */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] font-mono mb-2">
                  <span>{prop.category}</span>
                  <span>·</span>
                  <span>Financial District, Manhattan</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1E8] mb-4">
                  {prop.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed mb-6">
                  {prop.shortDescription}
                </p>

                {/* Published Transaction Story */}
                {prop.transactionStory && (
                  <div className="p-4 bg-[#0e0e0e] border-l-2 border-[#C6A66B] mb-6">
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-[#C6A66B] font-mono mb-1">
                      Certified Transaction Brief
                    </span>
                    <p className="text-xs text-[#F5F1E8]/90 font-light leading-relaxed italic">
                      "{prop.transactionStory}"
                    </p>
                  </div>
                )}

                {/* Specifications snapshot */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800 text-xs text-[#A7A7A7] font-sans">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#777] font-mono">Bedrooms</span>
                    <span className="font-mono text-sm text-[#F5F1E8] font-semibold">{prop.bedrooms} Suites</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#777] font-mono">Bathrooms</span>
                    <span className="font-mono text-sm text-[#F5F1E8] font-semibold">{prop.bathrooms} Baths</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#777] font-mono">Interior</span>
                    <span className="font-mono text-sm text-[#F5F1E8] font-semibold">{prop.livingAreaSqFt.toLocaleString()} sq ft</span>
                  </div>
                </div>
              </div>

              {/* Transaction Action & Dual Price */}
              <div className="mt-8 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-[#777] font-mono">
                    Prezzo di Riferimento (USD)
                  </span>
                  <span className="font-serif text-xl sm:text-2xl text-[#F5F1E8] font-normal block">
                    {formatDualPrice(prop).usd}
                  </span>
                  <span className="text-[10px] text-[#C6A66B] font-mono block mt-0.5">
                    Controvalore Italiano: <span className="font-semibold">{formatDualPrice(prop).eur}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openItalianTranscription(prop)}
                    className="inline-flex items-center gap-1 px-3 py-2 border border-neutral-700 hover:border-[#C6A66B] text-[11px] uppercase tracking-wider text-[#A7A7A7] hover:text-[#C6A66B] cursor-pointer"
                    title="Trascrizione in Italiano"
                  >
                    <span>🇮🇹 Trascrizione</span>
                  </button>

                  <button
                    onClick={() => openPropertyDetail(prop.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#C6A66B]/50 hover:border-[#C6A66B] text-[#C6A66B] hover:text-[#080808] hover:bg-[#C6A66B] transition-colors text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap"
                  >
                    <span>Scheda Transazione</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Private Mandate Advisory CTA */}
        <div className="mt-12 p-8 bg-[#121212] border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#C6A66B]/40 bg-[#C6A66B]/10 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-[#C6A66B]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#F5F1E8]">Seeking an Off-Market Acquisition or Disposal?</h4>
              <p className="text-xs text-[#A7A7A7] font-light mt-0.5">
                The majority of VANTERRA's premier transactions occur confidentially outside public MLS listings.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('consultation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] whitespace-nowrap cursor-pointer shadow-lg transition-colors"
          >
            Initiate Confidential Mandate
          </button>
        </div>
      </div>
    </section>
  );
};
