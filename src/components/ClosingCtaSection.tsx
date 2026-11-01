import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, PhoneCall } from 'lucide-react';

export const ClosingCtaSection: React.FC = () => {
  const { navigateToSection, setCurrentView } = useApp();

  return (
    <section className="relative py-28 bg-[#080808] border-t border-neutral-900 overflow-hidden">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/image_d0c4bca0.png"
          alt="VANTERRA Legacy Architecture"
          className="w-full h-full object-cover filter brightness-[0.22] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-[#080808]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C6A66B] font-mono mb-4">
          VANTERRA PROPERTIES
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5F1E8] tracking-tight leading-tight mb-4">
          Building Legacies.{' '}
          <span className="italic text-[#C6A66B] font-normal block sm:inline">Creating Wealth.</span>
        </h2>

        <p className="font-serif italic text-lg sm:text-2xl text-[#F5F1E8]/90 font-light max-w-3xl mb-10 text-balance">
          "Where Exceptional Properties Meet Extraordinary Possibilities."
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button
            onClick={() => navigateToSection('properties-section')}
            className="w-full sm:w-auto px-10 py-4 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl shadow-[#C6A66B]/20 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Your Next Property</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('consultation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-10 py-4 border border-[#C6A66B]/70 hover:border-[#C6A66B] text-[#F5F1E8] hover:bg-[#C6A66B]/10 text-xs font-semibold uppercase tracking-[0.25em] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#C6A66B]" />
            <span>Private Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
};
