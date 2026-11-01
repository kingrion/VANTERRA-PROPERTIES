import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark, Shield, Menu, X, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    navigateToSection,
    favourites,
    setIsFavouritesDrawerOpen,
    isAdminLoggedIn,
    properties,
    openItalianTranscription
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, view?: 'home' | 'properties' | 'about' | 'services' | 'presence' | 'testimonials' | 'contact') => {
    setIsMobileMenuOpen(false);
    if (view && view !== 'home') {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateToSection(sectionId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || currentView !== 'home'
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#C6A66B]/20 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#080808]/85 via-[#080808]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element wordmark, tracking-widest, display serif) */}
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group cursor-pointer focus:outline-none whitespace-nowrap shrink-0"
            aria-label="VANTERRA PROPERTIES Home"
          >
            <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.22em] text-[#F5F1E8] group-hover:text-[#C6A66B] transition-colors uppercase">
              VANTERRA
            </span>
            <span className="block text-[9px] tracking-[0.38em] text-[#C6A66B] uppercase font-sans -mt-1 font-medium">
              PROPERTIES
            </span>
          </button>

          {/* Zone 2: Nav Links (Clean single-line text links with subtle hover effect) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-[0.18em] text-[#A7A7A7] uppercase">
            <button
              onClick={() => handleNavClick('hero', 'home')}
              className={`hover:text-[#C6A66B] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'home' ? 'text-[#F5F1E8] font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('properties-section', 'properties')}
              className={`hover:text-[#C6A66B] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'properties' ? 'text-[#C6A66B] font-semibold' : ''
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => handleNavClick('about-section', 'about')}
              className={`hover:text-[#C6A66B] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'about' ? 'text-[#C6A66B] font-semibold' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('services-section', 'services')}
              className={`hover:text-[#C6A66B] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'services' ? 'text-[#C6A66B] font-semibold' : ''
              }`}
            >
              Our Services
            </button>
            <button
              onClick={() => handleNavClick('presence-section', 'presence')}
              className={`hover:text-[#C6A66B] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'presence' ? 'text-[#C6A66B] font-semibold' : ''
              }`}
            >
              Global Presence
            </button>
            <button
              onClick={() => handleNavClick('testimonials-section', 'testimonials')}
              className={`hover:text-[#C6A66B] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'testimonials' ? 'text-[#C6A66B] font-semibold' : ''
              }`}
            >
              Testimonials
            </button>
            <button
              onClick={() => handleNavClick('contact-section', 'contact')}
              className={`hover:text-[#C6A66B] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'contact' ? 'text-[#C6A66B] font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action & Shortcuts */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Italian Transcription Shortcut (Contemporary Villa 600k) */}
            <button
              onClick={() => {
                const villa = properties.find((p) => p.id === 'prop-contemporary-villa') || properties[0];
                if (villa) openItalianTranscription(villa);
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-[#C6A66B]/60 bg-[#C6A66B]/10 hover:bg-[#C6A66B] hover:text-[#080808] text-[#C6A66B] text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
              title="Apri trascrizione in Italiano per Villa Contemporanea ($600k / €552k)"
            >
              <span>🇮🇹</span>
              <span>Villa $600k (IT)</span>
            </button>

            {/* Favourites Portfolio Button */}
            <button
              onClick={() => setIsFavouritesDrawerOpen(true)}
              className="relative p-2 text-[#A7A7A7] hover:text-[#C6A66B] transition-colors focus:outline-none cursor-pointer"
              title="Saved Properties Portfolio"
              aria-label="View Saved Properties"
            >
              <Bookmark className="w-4 h-4" />
              {favourites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C6A66B] text-[#080808] text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                  {favourites.length}
                </span>
              )}
            </button>

            {/* Admin Management Workspace */}
            <button
              onClick={() => {
                setCurrentView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2 transition-colors cursor-pointer focus:outline-none ${
                isAdminLoggedIn
                  ? 'text-[#C6A66B] hover:text-[#F5F1E8]'
                  : 'text-[#A7A7A7]/70 hover:text-[#C6A66B]'
              }`}
              title={isAdminLoggedIn ? 'Executive Dashboard' : 'Admin Portal Login'}
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Primary Action Button: PRIVATE CONSULTATION */}
            <button
              onClick={() => {
                setCurrentView('consultation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#C6A66B] bg-[#C6A66B]/10 hover:bg-[#C6A66B] text-[#C6A66B] hover:text-[#080808] transition-all duration-300 text-[11px] font-semibold tracking-[0.2em] uppercase rounded-none whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Private Consultation</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#F5F1E8] hover:text-[#C6A66B] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6 pb-8 border-b border-[#C6A66B]/20 overflow-y-auto">
          <div className="flex flex-col gap-6 text-sm font-medium tracking-[0.2em] text-[#A7A7A7] uppercase">
            <button
              onClick={() => handleNavClick('hero', 'home')}
              className="text-left py-2 hover:text-[#C6A66B] border-b border-[#222]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('properties-section', 'properties')}
              className="text-left py-2 hover:text-[#C6A66B] border-b border-[#222]"
            >
              Properties Portfolio
            </button>
            <button
              onClick={() => handleNavClick('about-section', 'about')}
              className="text-left py-2 hover:text-[#C6A66B] border-b border-[#222]"
            >
              About Vanterra
            </button>
            <button
              onClick={() => handleNavClick('services-section', 'services')}
              className="text-left py-2 hover:text-[#C6A66B] border-b border-[#222]"
            >
              Our Services
            </button>
            <button
              onClick={() => handleNavClick('presence-section', 'presence')}
              className="text-left py-2 hover:text-[#C6A66B] border-b border-[#222]"
            >
              Global Presence (NY & Milan)
            </button>
            <button
              onClick={() => handleNavClick('testimonials-section', 'testimonials')}
              className="text-left py-2 hover:text-[#C6A66B] border-b border-[#222]"
            >
              Client Reputation
            </button>
            <button
              onClick={() => handleNavClick('contact-section', 'contact')}
              className="text-left py-2 hover:text-[#C6A66B] border-b border-[#222]"
            >
              Contact Offices
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left py-2 hover:text-[#C6A66B] border-b border-[#222] flex items-center justify-between text-[#C6A66B]"
            >
              <span>Executive Portal</span>
              <Shield className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 pt-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentView('consultation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 border border-[#C6A66B] bg-[#C6A66B] text-[#080808] font-semibold text-xs tracking-[0.25em] uppercase"
            >
              Private Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
};
