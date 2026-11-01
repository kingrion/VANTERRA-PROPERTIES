import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ArrowUp, Globe, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, navigateToSection, offices } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId: string, view?: 'home' | 'properties' | 'about' | 'services' | 'presence' | 'testimonials' | 'contact') => {
    if (view && view !== 'home') {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateToSection(sectionId);
    }
  };

  return (
    <footer className="bg-[#050505] text-[#A7A7A7] border-t border-[#C6A66B]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-neutral-900">
          {/* Brand Column (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#F5F1E8] uppercase block">
                VANTERRA
              </span>
              <span className="text-[10px] tracking-[0.4em] text-[#C6A66B] uppercase font-sans font-medium">
                PROPERTIES
              </span>
            </div>

            <p className="text-xs font-mono tracking-widest text-[#C6A66B] uppercase">
              LUXURY · POWER · PRESTIGE
            </p>

            <p className="text-xs font-serif italic text-[#F5F1E8]/90">
              "Building Legacies. Creating Wealth."
            </p>

            <p className="text-xs text-[#777] font-light leading-relaxed max-w-sm">
              An international luxury real estate brand connecting discerning clients, family offices, and sovereign investors with exceptional properties across the world's most distinguished destinations.
            </p>
          </div>

          {/* Navigation Column (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <button
                  onClick={() => handleNavClick('hero', 'home')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('properties-section', 'properties')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about-section', 'about')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services-section', 'services')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('presence-section', 'presence')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Global Presence
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('testimonials-section', 'testimonials')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact-section', 'contact')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* World Headquarters Column (Span 4) */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-2">
              World Headquarters
            </span>
            <p className="font-medium text-[#F5F1E8]">UNITED STATES</p>
            <p className="font-light text-[#A7A7A7] leading-relaxed">
              Eureka Curiel 5046 N 85th Street<br />
              Milwaukee, WI (Wisconsin) 5320, United States
            </p>
            <div className="pt-2 text-[11px] font-mono space-y-1.5 text-[#A7A7A7]">
              <div>
                <span className="text-[#777]">Tel: </span>
                <a href="tel:+13027296657" className="text-[#F5F1E8] hover:text-[#C6A66B] transition-colors">
                  +1 (302) 729-6657
                </a>
              </div>
              <div>
                <span className="text-[#777]">Telegram: </span>
                <a href="https://t.me/MariaGallo01" target="_blank" rel="noopener noreferrer" className="text-[#64b5f6] hover:text-[#C6A66B] transition-colors">
                  @MariaGallo01
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#777]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>© {new Date().getFullYear()} VANTERRA PROPERTIES. All rights reserved.</span>
            <span>·</span>
            <span>Equal Housing Opportunity</span>
            <span>·</span>
            <span>Strict Fiduciary Discretion</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C6A66B] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Administrative Workspace</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 border border-neutral-800 hover:border-[#C6A66B] text-[#A7A7A7] hover:text-[#C6A66B] transition-colors cursor-pointer"
              title="Return to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
