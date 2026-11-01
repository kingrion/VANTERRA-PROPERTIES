import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Eye, Target, Compass, Award, Gem, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setCurrentView } = useApp();

  const values = [
    {
      title: 'Discretion & Integrity',
      desc: 'Protecting the confidentiality, privacy, and sovereignty of our private clients and family offices without compromise.'
    },
    {
      title: 'Architectural Discernment',
      desc: 'Curating only residences and investments that exhibit masterclass engineering, pedigree design, and enduring material value.'
    },
    {
      title: 'Global Intelligence',
      desc: 'Bridging financial capitals with nuanced cross-border legal, fiscal, and sovereign property intelligence.'
    },
    {
      title: 'Generational Stewardship',
      desc: 'Structuring property portfolios designed to preserve capital, foster prosperity, and endure across generations.'
    }
  ];

  const reasons = [
    'Private access to verified off-market estates and penthouses before public disclosure',
    'Senior Partner representation on every transaction with full institutional underwriting',
    'Direct operational presence across our World Headquarters and international partner networks',
    'Integrated high-definition architectural media production and international syndicate marketing',
    'Decades of collective advisory experience advising multinational family offices and royal estates'
  ];

  return (
    <section id="about-section" className="py-24 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <Gem className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
                THE VANTERRA PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5F1E8] tracking-tight leading-[1.1] mb-6">
              More Than Real Estate.{' '}
              <span className="italic text-[#C6A66B] font-normal block sm:inline">We Build Legacies.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#F5F1E8]/90 font-light leading-relaxed">
              <p>
                VANTERRA PROPERTIES represents a refined approach to luxury real estate, connecting discerning clients and investors with exceptional properties and extraordinary opportunities.
              </p>
              <p>
                Our vision extends beyond property ownership. We believe real estate represents ambition, achievement, lifestyle, and lasting value.
              </p>
              <p className="text-[#A7A7A7]">
                Through our international outlook, commitment to excellence, and passion for exceptional properties, we aim to create meaningful relationships and lasting legacies.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => {
                  setCurrentView('consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.22em] transition-colors cursor-pointer shadow-lg"
              >
                Engage Our Advisory
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Architecture Photo Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#C6A66B]/30 p-2 bg-[#121212]">
              <img
                src="/assets/aistudio/image_c04ae52a.png"
                alt="VANTERRA Curated Living Architecture"
                className="w-full aspect-[4/5] object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#080808]/90 backdrop-blur-md border border-neutral-800">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A66B] font-mono block mb-1">
                  CORE BRAND ETHOS
                </span>
                <p className="font-serif italic text-base text-[#F5F1E8]">
                  "Where Exceptional Properties Meet Extraordinary Possibilities."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* OUR VISION */}
          <div className="p-8 sm:p-10 bg-[#121212] border border-neutral-800 relative group hover:border-[#C6A66B]/40 transition-colors">
            <div className="w-12 h-12 border border-[#C6A66B]/40 bg-[#C6A66B]/10 flex items-center justify-center mb-6">
              <Eye className="w-5 h-5 text-[#C6A66B]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-2">
              FOUNDATIONAL PURPOSE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1E8] mb-4">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed font-light">
              To define the global pinnacle of international luxury real estate advisory—setting an uncompromising standard where architectural grandeur, private client discretion, and generational wealth compounding converge effortlessly.
            </p>
          </div>

          {/* OUR MISSION */}
          <div className="p-8 sm:p-10 bg-[#121212] border border-neutral-800 relative group hover:border-[#C6A66B]/40 transition-colors">
            <div className="w-12 h-12 border border-[#C6A66B]/40 bg-[#C6A66B]/10 flex items-center justify-center mb-6">
              <Target className="w-5 h-5 text-[#C6A66B]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-2">
              EXECUTIVE MANDATE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F1E8] mb-4">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed font-light">
              To connect the world's most discerning buyers, sellers, and capital stewards with rare properties through bespoke cinema-grade storytelling, unassailable fiduciary diligence, and privileged access to private international opportunities.
            </p>
          </div>
        </div>

        {/* OUR VALUES */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-2">
              PILLARS OF DISTINCTION
            </span>
            <h3 className="font-serif text-3xl font-light text-[#F5F1E8]">
              Our Guiding Values
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="p-6 bg-[#141414] border border-neutral-800/80">
                <span className="text-xs text-[#C6A66B] font-mono block mb-3">0{idx + 1}.</span>
                <h4 className="font-serif text-lg text-[#F5F1E8] mb-2">{val.title}</h4>
                <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE VANTERRA */}
        <div className="p-8 sm:p-12 bg-[#121212] border border-[#C6A66B]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-2">
                UNRIVALLED EXCELLENCE
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-light text-[#F5F1E8] mb-4">
                Why Discerning Clients Choose VANTERRA
              </h3>
              <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
                When acquiring or marketing a trophy property, standard brokerage is insufficient. Our clients entrust us with their most substantial real estate decisions because we provide genuine international reach, uncompromised confidentiality, and sovereign-level execution.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0a] border border-neutral-800/80 text-xs text-[#F5F1E8]/90">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                  <span className="font-light">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
