import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_SERVICES } from '../data/initialData';
import { ServiceItem } from '../types';
import { 
  Building2, TrendingUp, KeyRound, Sparkles, ShieldCheck, 
  Landmark, Compass, Globe, ArrowRight, X, Check, PhoneCall 
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Building2,
  TrendingUp,
  KeyRound,
  Sparkles,
  ShieldCheck,
  Landmark,
  Compass,
  Globe
};

export const ServicesSection: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services-section" className="py-24 bg-[#0d0d0d] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-neutral-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
                BESPOKE REAL ESTATE SERVICES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1E8] tracking-tight">
              Bespoke Advisory.{' '}
              <span className="italic text-[#C6A66B]">Uncompromising Standards.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#A7A7A7] font-light mt-4 md:mt-0 leading-relaxed">
            Tailored property acquisition, disposition, asset structuring, and international private client services orchestrated with institutional precision.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_SERVICES.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Building2;
            return (
              <div
                key={service.id}
                className="bg-[#151515] border border-neutral-800/80 hover:border-[#C6A66B]/60 p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 border border-[#C6A66B]/30 bg-[#C6A66B]/10 flex items-center justify-center text-[#C6A66B] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#777]">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-1">
                    {service.category}
                  </span>

                  <h3 className="font-serif text-xl text-[#F5F1E8] font-normal group-hover:text-[#C6A66B] transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[#C6A66B] hover:text-[#F5F1E8] font-semibold transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-[#C6A66B]/50 max-w-xl w-full p-8 relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 text-[#A7A7A7] hover:text-[#F5F1E8] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-2">
              {activeModalService.category} · VANTERRA PRACTICE
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] mb-4">
              {activeModalService.title}
            </h3>

            <p className="text-sm text-[#F5F1E8]/90 font-light leading-relaxed mb-6">
              {activeModalService.fullDescription}
            </p>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A7A7A7] font-mono block mb-3">
                Key Strategic Deliverables
              </span>
              <div className="space-y-2">
                {activeModalService.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#A7A7A7]">
                    <Check className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex items-center gap-4">
              <button
                onClick={() => {
                  setActiveModalService(null);
                  setCurrentView('consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Inquire On This Service</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
