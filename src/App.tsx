/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedPropertiesSection } from './components/FeaturedPropertiesSection';
import { PropertyDetailPage } from './components/PropertyDetailPage';
import { SoldTransactionsSection } from './components/SoldTransactionsSection';
import { GlobalPresenceSection } from './components/GlobalPresenceSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ConsultationSection } from './components/ConsultationSection';
import { ContactSection } from './components/ContactSection';
import { ClosingCtaSection } from './components/ClosingCtaSection';
import { Footer } from './components/Footer';
import { FavouritesDrawer } from './components/FavouritesDrawer';
import { MediaModal } from './components/MediaModal';
import { ToastContainer } from './components/Toast';
import { AdminDashboard } from './components/AdminDashboard';
import { ItalianTranscriptionModal } from './components/ItalianTranscriptionModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F1E8] flex flex-col justify-between selection:bg-[#C6A66B]/30 selection:text-[#F5F1E8]">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <FeaturedPropertiesSection />
            <SoldTransactionsSection />
            <GlobalPresenceSection />
            <AboutSection />
            <ServicesSection />
            <TestimonialsSection />
            <ConsultationSection />
            <ContactSection />
            <ClosingCtaSection />
          </>
        )}

        {currentView === 'properties' && (
          <div className="pt-16">
            <FeaturedPropertiesSection />
            <SoldTransactionsSection />
            <ClosingCtaSection />
          </div>
        )}

        {currentView === 'property-detail' && (
          <PropertyDetailPage />
        )}

        {currentView === 'about' && (
          <div className="pt-16">
            <AboutSection />
            <GlobalPresenceSection />
            <ClosingCtaSection />
          </div>
        )}

        {currentView === 'services' && (
          <div className="pt-16">
            <ServicesSection />
            <ConsultationSection />
            <ClosingCtaSection />
          </div>
        )}

        {currentView === 'presence' && (
          <div className="pt-16">
            <GlobalPresenceSection />
            <ContactSection />
            <ClosingCtaSection />
          </div>
        )}

        {currentView === 'testimonials' && (
          <div className="pt-16">
            <TestimonialsSection />
            <ConsultationSection />
            <ClosingCtaSection />
          </div>
        )}

        {currentView === 'consultation' && (
          <div className="pt-16">
            <ConsultationSection />
            <ContactSection />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="pt-16">
            <ContactSection />
            <GlobalPresenceSection />
          </div>
        )}

        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      <Footer />
      <FavouritesDrawer />
      <MediaModal />
      <ToastContainer />
      <ItalianTranscriptionModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
