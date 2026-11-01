import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { 
  ArrowLeft, Bookmark, Share2, Video, Bed, Bath, Maximize2, 
  MapPin, Calendar, Check, Send, PhoneCall, Shield, Compass, Sparkles, Building
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { 
    selectedProperty, 
    setCurrentView, 
    openPropertyDetail,
    properties, 
    toggleFavourite, 
    isFavourite, 
    submitConsultation,
    openMediaModal,
    addToast,
    openItalianTranscription,
    formatDualPrice
  } = useApp();

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isItalianView, setIsItalianView] = useState(false);

  // Private viewing enquiry form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredContactMethod: 'Telegram' as 'Telegram' | 'Phone' | 'WhatsApp' | 'Email',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!selectedProperty) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 bg-[#080808]">
        <h2 className="font-serif text-3xl text-[#F5F1E8] mb-4">Property Not Found</h2>
        <p className="text-[#A7A7A7] text-sm mb-6">The requested listing may have concluded or been archived.</p>
        <button
          onClick={() => setCurrentView('properties')}
          className="px-6 py-2.5 bg-[#C6A66B] text-[#080808] text-xs font-semibold uppercase tracking-widest"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  const isFav = isFavourite(selectedProperty.id);
  const activeMedia = selectedProperty.media[activeMediaIndex] || selectedProperty.media[0];
  const hasVideoWalkthrough = !!selectedProperty.videoWalkthroughUrl || selectedProperty.media.some(m => m.type === 'video');

  const similarProperties = properties
    .filter((p) => p.id !== selectedProperty.id)
    .slice(0, 3);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      addToast({
        type: 'error',
        title: 'Missing Information',
        message: 'Please provide your full name and confidential email.'
      });
      return;
    }

    submitConsultation({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      countryOfResidence: selectedProperty.country,
      preferredLocation: `${selectedProperty.city}, ${selectedProperty.country}`,
      interestedProperty: `${selectedProperty.name} (${selectedProperty.referenceNumber})`,
      budgetRange: selectedProperty.priceDisplay || `$${selectedProperty.price.toLocaleString()}`,
      enquiryType: selectedProperty.isSoldCollection ? 'Advisory' : 'Acquisition',
      preferredContactMethod: formData.preferredContactMethod,
      message: formData.message || `Requesting private viewing and disclosure package for ${selectedProperty.name}. Preferred date: ${formData.preferredDate || 'Earliest discreet arrangement'}.`
    });

    setFormSubmitted(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'info',
        title: 'Portfolio Link Copied',
        message: 'Listing reference copied to clipboard for private review.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-20 text-[#F5F1E8]">
      {/* Top Breadcrumb & Action Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-neutral-800/80 mb-6 text-xs text-[#A7A7A7]">
        <button
          onClick={() => {
            setCurrentView('properties');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 hover:text-[#C6A66B] transition-colors uppercase tracking-[0.15em] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[#C6A66B] tracking-wider hidden sm:inline">
            REF: {selectedProperty.referenceNumber}
          </span>
          <button
            onClick={handleShare}
            className="p-2 border border-neutral-800 hover:border-[#C6A66B] hover:text-[#C6A66B] transition-colors cursor-pointer"
            title="Share property reference"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => toggleFavourite(selectedProperty.id)}
            className={`p-2 border transition-colors cursor-pointer ${
              isFav
                ? 'border-[#C6A66B] text-[#C6A66B]'
                : 'border-neutral-800 hover:border-[#C6A66B] hover:text-[#C6A66B]'
            }`}
            title={isFav ? 'Remove from saved' : 'Save to private portfolio'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Media Showcase (Cinematic Gallery / Video) */}
        <div className="relative w-full aspect-[16/9] max-h-[70vh] bg-[#111] overflow-hidden border border-neutral-800">
          {isVideoActive && (selectedProperty.videoWalkthroughUrl || activeMedia?.type === 'video') ? (
            <video
              src={selectedProperty.videoWalkthroughUrl || activeMedia?.url}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={activeMedia?.url || '/assets/aistudio/image_d0c4bca0.png'}
              alt={selectedProperty.name}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => {
                if (activeMedia?.url) {
                  openMediaModal({
                    type: activeMedia.type,
                    url: activeMedia.url,
                    title: selectedProperty.name
                  });
                }
              }}
            />
          )}

          {/* Availability Status Badge */}
          <div className="absolute top-4 left-4 z-10">
            {selectedProperty.availability === 'SOLD OUT' || selectedProperty.availability === 'SOLD' ? (
              <span className="px-3.5 py-1.5 text-xs font-bold tracking-[0.25em] uppercase bg-[#C6A66B] text-[#080808] border border-[#e2c792] shadow-2xl">
                {selectedProperty.availability}
              </span>
            ) : (
              <span className="px-3.5 py-1.5 text-xs font-semibold tracking-[0.25em] uppercase bg-[#080808]/90 text-[#C6A66B] border border-[#C6A66B]/50 backdrop-blur-md">
                {selectedProperty.availability}
              </span>
            )}
          </div>

          {/* Video Toggle Button (if available) */}
          {hasVideoWalkthrough && (
            <button
              onClick={() => setIsVideoActive(!isVideoActive)}
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-2 bg-[#080808]/90 hover:bg-[#C6A66B] text-[#F5F1E8] hover:text-[#080808] border border-[#C6A66B]/60 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer backdrop-blur-md"
            >
              <Video className="w-4 h-4" />
              <span>{isVideoActive ? 'View Photo Gallery' : 'Play Walkthrough Film'}</span>
            </button>
          )}
        </div>

        {/* Thumbnail Selector Strip */}
        {selectedProperty.media.length > 1 && (
          <div className="flex items-center gap-3 mt-4 overflow-x-auto no-scrollbar pb-2">
            {selectedProperty.media.map((media, idx) => (
              <button
                key={media.id}
                onClick={() => {
                  setActiveMediaIndex(idx);
                  setIsVideoActive(media.type === 'video');
                }}
                className={`relative w-24 h-16 shrink-0 border overflow-hidden transition-all cursor-pointer ${
                  activeMediaIndex === idx
                    ? 'border-[#C6A66B] ring-1 ring-[#C6A66B]'
                    : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
              >
                {media.type === 'video' ? (
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                    <Video className="w-5 h-5 text-[#C6A66B]" />
                  </div>
                ) : (
                  <img
                    src={media.url}
                    alt={media.caption || `View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Headline & Overview Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Specifications, Narrative & Amenities */}
          <div className="lg:col-span-8">
            {/* Category, City, Country */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C6A66B] font-medium mb-2">
              <span>{selectedProperty.category}</span>
              <span>·</span>
              <span className="text-[#A7A7A7]">{selectedProperty.city}, {selectedProperty.country}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1E8] tracking-tight mb-4">
              {selectedProperty.name}
            </h1>

            {selectedProperty.address && (
              <div className="flex items-center gap-2 text-xs text-[#A7A7A7] font-sans mb-6">
                <MapPin className="w-3.5 h-3.5 text-[#C6A66B]" />
                <span>{selectedProperty.address}</span>
              </div>
            )}

            {/* Enhanced Dual Price Banner & Italian Transcription Action */}
            <div className="p-5 bg-[#151515] border border-[#C6A66B]/40 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#A7A7A7] font-mono">
                  Prezzo Ufficiale in Dollari (USD)
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#F5F1E8] font-light tracking-tight block">
                  {formatDualPrice(selectedProperty).usd}
                </span>
                <div className="inline-flex items-center gap-2 pt-1">
                  <span className="text-xs font-mono font-semibold text-[#C6A66B]">
                    Controvalore Italiano: {formatDualPrice(selectedProperty).eur}
                  </span>
                  <span className="text-[10px] text-[#A7A7A7] font-mono">
                    (ca. EUR per investitori europei)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  onClick={() => openItalianTranscription(selectedProperty)}
                  className="px-4 py-2.5 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.18em] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>🇮🇹</span>
                  <span>Trascrizione in Italiano</span>
                </button>

                <button
                  onClick={() => setIsItalianView(!isItalianView)}
                  className={`px-3 py-2.5 border text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer text-center ${
                    isItalianView
                      ? 'border-[#C6A66B] text-[#C6A66B] bg-[#0a0a0a]'
                      : 'border-neutral-700 text-[#A7A7A7] hover:text-[#F5F1E8]'
                  }`}
                >
                  {isItalianView ? 'Visualizza in Inglese' : 'Traduci Pagina in IT'}
                </button>
              </div>
            </div>

            {/* Key Metrics Strip: Unboxed tabular figures */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#121212] border border-neutral-800 mb-8">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#A7A7A7] mb-1">
                  <Bed className="w-4 h-4 text-[#C6A66B]" />
                  <span>Bedrooms</span>
                </div>
                <span className="font-mono text-xl text-[#F5F1E8] tabular-nums font-semibold">
                  {selectedProperty.bedrooms}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#A7A7A7] mb-1">
                  <Bath className="w-4 h-4 text-[#C6A66B]" />
                  <span>Bathrooms</span>
                </div>
                <span className="font-mono text-xl text-[#F5F1E8] tabular-nums font-semibold">
                  {selectedProperty.bathrooms}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#A7A7A7] mb-1">
                  <Maximize2 className="w-4 h-4 text-[#C6A66B]" />
                  <span>Interior Area</span>
                </div>
                <span className="font-mono text-xl text-[#F5F1E8] tabular-nums font-semibold">
                  {selectedProperty.livingAreaSqFt.toLocaleString()} <span className="text-xs text-[#A7A7A7] font-normal">sq ft</span>
                </span>
              </div>

              {selectedProperty.landAreaSqFt && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#A7A7A7] mb-1">
                    <Compass className="w-4 h-4 text-[#C6A66B]" />
                    <span>Parcel Size</span>
                  </div>
                  <span className="font-mono text-xl text-[#F5F1E8] tabular-nums font-semibold">
                    {selectedProperty.landAreaSqFt.toLocaleString()} <span className="text-xs text-[#A7A7A7] font-normal">sq ft</span>
                  </span>
                </div>
              )}
            </div>

            {/* Narrative / Full Description */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-light text-[#F5F1E8] tracking-wide">
                  {isItalianView ? 'Relazione Architettonica (Italiano)' : 'Architectural Statement'}
                </h2>
                {selectedProperty.italianDescription && (
                  <button
                    onClick={() => setIsItalianView(!isItalianView)}
                    className="text-xs text-[#C6A66B] hover:underline font-mono"
                  >
                    {isItalianView ? 'Switch to English' : 'Leggi in Italiano'}
                  </button>
                )}
              </div>
              <p className="text-[#A7A7A7] text-sm sm:text-base leading-relaxed font-light mb-4 whitespace-pre-line">
                {isItalianView
                  ? (selectedProperty.italianDescription || selectedProperty.italianShortDescription || selectedProperty.fullDescription)
                  : selectedProperty.fullDescription}
              </p>
            </div>

            {/* Transaction Story (For Sold Records) */}
            {selectedProperty.transactionStory && (
              <div className="mb-10 p-6 bg-[#181818] border border-[#C6A66B]/30">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#C6A66B] uppercase mb-2">
                  <Shield className="w-4 h-4" />
                  <span>Transaction Record & Discretion Briefing</span>
                </div>
                <p className="text-sm text-[#F5F1E8]/90 font-light leading-relaxed">
                  {selectedProperty.transactionStory}
                </p>
              </div>
            )}

            {/* Amenities Grid */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-light text-[#F5F1E8] mb-4 tracking-wide">
                {isItalianView ? 'Dotazioni e Finiture di Pregio' : 'Curated Amenities & Features'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isItalianView && selectedProperty.italianAmenities
                  ? selectedProperty.italianAmenities
                  : selectedProperty.amenities
                ).map((amenity, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[#151515] border border-neutral-800 text-xs text-[#F5F1E8]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C6A66B] shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Simulation */}
            <div className="mb-10 p-5 bg-[#151515] border border-neutral-800">
              <h2 className="font-serif text-xl font-light text-[#F5F1E8] mb-2 tracking-wide">
                Global Positioning
              </h2>
              <p className="text-xs text-[#A7A7A7] mb-4">
                Exact geographic coordinates and private access route disclosures are provided exclusively to verified prospective clients upon private registration.
              </p>
              <div className="w-full h-44 bg-[#0a0a0a] border border-neutral-800 flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="w-8 h-8 text-[#C6A66B] mb-2 animate-pulse" />
                <span className="font-serif text-lg text-[#F5F1E8]">{selectedProperty.city}, {selectedProperty.country}</span>
                <span className="text-[11px] font-mono text-[#A7A7A7] mt-1">Discreet Residential Corridor · Tier 1 Security Enclave</span>
              </div>
            </div>
          </div>

          {/* Right Column: Private Consultation & Viewing Desk */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#151515] border border-[#C6A66B]/30 p-6 shadow-2xl">
              <div className="border-b border-neutral-800 pb-4 mb-5">
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono mb-1">
                  Private Client Desk
                </span>
                <h3 className="font-serif text-xl text-[#F5F1E8] font-light">
                  Schedule Private Viewing
                </h3>
                <p className="text-xs text-[#A7A7A7] font-light mt-1">
                  Direct liaison with our Senior Real Estate Partners. Discretion assured.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-8 text-center animate-fadeIn">
                  <div className="w-12 h-12 rounded-full border border-[#C6A66B] text-[#C6A66B] flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg text-[#F5F1E8] mb-1">Inquiry Registered</h4>
                  <p className="text-xs text-[#A7A7A7] leading-relaxed">
                    Our Senior Partner representing {selectedProperty.country} has been notified and will contact you via your preferred method.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 text-xs text-[#C6A66B] hover:underline uppercase tracking-wider"
                  >
                    Submit additional inquiries
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Lord Harrington / Elena Rostova"
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Confidential Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@familyoffice.com"
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (212) ... / +39 ..."
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Preferred Viewing Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Preferred Channel
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {(['Telegram', 'Phone', 'WhatsApp', 'Email'] as const).map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                          className={`py-1.5 text-[10px] uppercase tracking-wider border text-center transition-colors ${
                            formData.preferredContactMethod === method
                              ? 'border-[#C6A66B] text-[#C6A66B] bg-[#080808]'
                              : 'border-neutral-800 text-[#777] hover:text-[#A7A7A7]'
                          }`}
                        >
                          {method === 'Telegram' ? '@MariaGallo01' : method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Confidential Notes / Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specific architectural requirements, timing preferences, or NDA requirements..."
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer shadow-lg shadow-[#C6A66B]/10 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Private Viewing</span>
                  </button>

                  <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-1.5 text-center">
                    <div className="text-[11px] font-mono text-[#A7A7A7]">
                      Direct Partner Hotline: <a href="tel:+13027296657" className="text-[#F5F1E8] hover:text-[#C6A66B] font-semibold">+1 (302) 729-6657</a>
                    </div>
                    <div className="text-[11px] font-mono text-[#A7A7A7]">
                      Telegram: <a href="https://t.me/MariaGallo01" target="_blank" rel="noopener noreferrer" className="text-[#64b5f6] hover:text-[#C6A66B] font-semibold">@MariaGallo01</a>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#777] text-center font-mono">
                    Strict Client Confidentiality & Non-Disclosure Enforced
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Curated Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono">
                  Curated Portfolio
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] font-light">
                  Similar Exceptional Residences
                </h3>
              </div>

              <button
                onClick={() => {
                  setCurrentView('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-[#C6A66B] hover:underline uppercase tracking-wider"
              >
                View Complete Portfolio →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
