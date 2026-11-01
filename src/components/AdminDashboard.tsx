import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property, PropertyCategory, PropertyAvailability, GlobalOffice } from '../types';
import { 
  Shield, Building2, MessageSquare, Star, Globe, Plus, Trash2, Edit3, 
  Check, X, Eye, Video, Image, LogOut, Lock, Search, Filter, AlertCircle 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    setCurrentView,
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    consultations,
    updateConsultationStatus,
    deleteConsultation,
    reviews,
    approveReview,
    rejectReview,
    deleteReview,
    toggleVerifiedReview,
    addReviewResponse,
    offices,
    addOffice,
    updateOffice,
    deleteOffice,
    ratingMetrics,
    addToast
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'media' | 'inquiries' | 'reviews' | 'offices'>('overview');

  // Property modal state
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Property form state
  const [propForm, setPropForm] = useState({
    name: '',
    category: 'Contemporary Villas' as PropertyCategory,
    country: 'United States',
    city: '',
    address: '',
    price: 600000,
    priceDisplay: '$600,000',
    bedrooms: 4,
    bathrooms: 4,
    livingAreaSqFt: 5000,
    landAreaSqFt: 15000,
    availability: 'AVAILABLE' as PropertyAvailability,
    featured: false,
    shortDescription: '',
    fullDescription: '',
    amenities: 'Private Pool, Concierge, High Ceilings, Chef Kitchen',
    photoUrl1: '/assets/aistudio/image_d0c4bca0.png',
    photoUrl2: '/assets/aistudio/image_5bcd0bb1.png',
    videoUrl: '/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.18_AM_f179ca0d.mp4',
    referenceNumber: 'VAN-NEW-01'
  });

  // Review reply state
  const [replyReviewId, setReplyReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Office form state
  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);
  const [officeForm, setOfficeForm] = useState({
    title: '',
    subtitle: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    description: '',
    email: '@MariaGallo01',
    telegram: '@MariaGallo01',
    phone: '+1 (302) 729-6657',
    hours: 'Monday – Friday: 09:00 – 18:00',
    isHeadquarters: false
  });

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(passwordInput);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full bg-[#151515] border border-[#C6A66B]/40 p-8 shadow-2xl relative">
          <div className="w-14 h-14 rounded-full border border-[#C6A66B] bg-[#C6A66B]/10 flex items-center justify-center mx-auto mb-6 text-[#C6A66B]">
            <Shield className="w-7 h-7" />
          </div>

          <span className="block text-center text-[10px] uppercase tracking-[0.3em] text-[#C6A66B] font-mono mb-2">
            VANTERRA PROPERTIES
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] text-center mb-2 font-light">
            Executive Portal
          </h2>

          <p className="text-xs text-[#A7A7A7] text-center font-light leading-relaxed mb-6">
            Authentication required for property catalog management, private client inquiries, and moderation ledger.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                Administrative Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter executive passcode (e.g. vanterra2026)"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              Authenticate Executive Session
            </button>

            <div className="pt-4 border-t border-neutral-800 text-center">
              <span className="text-[10px] text-[#A7A7A7] font-mono block">
                Default Evaluation Key: <span className="text-[#C6A66B]">vanterra2026</span>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalListings = properties.length;
  const availableCount = properties.filter((p) => p.availability === 'AVAILABLE' || p.availability === 'EXCLUSIVE').length;
  const soldCount = properties.filter((p) => p.availability === 'SOLD' || p.availability === 'SOLD OUT').length;
  const pendingInquiriesCount = consultations.filter((c) => c.status === 'new').length;
  const pendingReviewsCount = reviews.filter((r) => r.status === 'pending').length;

  const handleOpenAddProperty = () => {
    setEditingPropertyId(null);
    setPropForm({
      name: '',
      category: 'Contemporary Villas',
      country: 'United States',
      city: '',
      address: '',
      price: 600000,
      priceDisplay: '$600,000',
      bedrooms: 5,
      bathrooms: 5,
      livingAreaSqFt: 6200,
      landAreaSqFt: 20000,
      availability: 'AVAILABLE',
      featured: true,
      shortDescription: '',
      fullDescription: '',
      amenities: 'Private Pool, Glass Staircase, Marble Bathrooms, Gated Compound',
      photoUrl1: '/assets/aistudio/image_d0c4bca0.png',
      photoUrl2: '/assets/aistudio/image_5bcd0bb1.png',
      videoUrl: '/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.18_AM_f179ca0d.mp4',
      referenceNumber: `VAN-${Math.floor(100 + Math.random() * 900)}`
    });
    setIsPropertyModalOpen(true);
  };

  const handleOpenEditProperty = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setPropForm({
      name: prop.name,
      category: prop.category,
      country: prop.country,
      city: prop.city,
      address: prop.address || '',
      price: prop.price,
      priceDisplay: prop.priceDisplay || `$${prop.price.toLocaleString()}`,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      livingAreaSqFt: prop.livingAreaSqFt,
      landAreaSqFt: prop.landAreaSqFt || 0,
      availability: prop.availability,
      featured: prop.featured,
      shortDescription: prop.shortDescription,
      fullDescription: prop.fullDescription,
      amenities: prop.amenities.join(', '),
      photoUrl1: prop.media[0]?.url || '/assets/aistudio/image_d0c4bca0.png',
      photoUrl2: prop.media[1]?.url || '/assets/aistudio/image_5bcd0bb1.png',
      videoUrl: prop.videoWalkthroughUrl || '',
      referenceNumber: prop.referenceNumber
    });
    setIsPropertyModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const mediaArray: Property['media'] = [
      {
        id: 'media-1',
        type: 'image',
        url: propForm.photoUrl1 || '/assets/aistudio/image_d0c4bca0.png',
        caption: 'Primary architectural photography',
        isPrimary: true
      }
    ];

    if (propForm.photoUrl2) {
      mediaArray.push({
        id: 'media-2',
        type: 'image',
        url: propForm.photoUrl2,
        caption: 'Interior gallery'
      });
    }

    if (propForm.videoUrl) {
      mediaArray.push({
        id: 'media-video',
        type: 'video',
        url: propForm.videoUrl,
        caption: 'Cinematic video walkthrough'
      });
    }

    const payload = {
      name: propForm.name,
      category: propForm.category,
      country: propForm.country,
      city: propForm.city,
      address: propForm.address,
      price: Number(propForm.price),
      currency: propForm.country === 'Italy' ? 'EUR' : propForm.country === 'England' ? 'GBP' : 'USD',
      priceDisplay: propForm.priceDisplay,
      bedrooms: Number(propForm.bedrooms),
      bathrooms: Number(propForm.bathrooms),
      livingAreaSqFt: Number(propForm.livingAreaSqFt),
      landAreaSqFt: Number(propForm.landAreaSqFt),
      availability: propForm.availability,
      featured: propForm.featured,
      isSoldCollection: propForm.availability === 'SOLD' || propForm.availability === 'SOLD OUT',
      shortDescription: propForm.shortDescription,
      fullDescription: propForm.fullDescription,
      amenities: propForm.amenities.split(',').map((s) => s.trim()).filter(Boolean),
      media: mediaArray,
      videoWalkthroughUrl: propForm.videoUrl,
      referenceNumber: propForm.referenceNumber,
      italianCounterpartAmount: Math.round(Number(propForm.price) * 0.92),
      italianPriceDisplay: `€${Math.round(Number(propForm.price) * 0.92).toLocaleString('it-IT')}`
    };

    if (editingPropertyId) {
      updateProperty(editingPropertyId, payload);
    } else {
      addProperty(payload);
    }

    setIsPropertyModalOpen(false);
  };

  const handleSaveReply = (id: string) => {
    if (replyText.trim()) {
      addReviewResponse(id, replyText.trim());
      setReplyReviewId(null);
      setReplyText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F1E8] pt-24 pb-20">
      {/* Top Admin Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-[#C6A66B]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
              EXECUTIVE MANAGEMENT CONSOLE
            </span>
          </div>
          <h1 className="font-serif text-3xl font-light text-[#F5F1E8]">
            VANTERRA Administrative Workspace
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 border border-neutral-700 hover:border-[#C6A66B] text-xs text-[#A7A7A7] hover:text-[#F5F1E8] uppercase tracking-wider cursor-pointer transition-colors"
          >
            View Live Site
          </button>

          <button
            onClick={logoutAdmin}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-950/60 border border-red-800/80 hover:bg-red-900 text-red-200 text-xs uppercase tracking-wider cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Conclude Session</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-neutral-800 pb-2 text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#C6A66B] text-[#C6A66B] font-bold'
                : 'border-transparent text-[#A7A7A7] hover:text-[#F5F1E8]'
            }`}
          >
            Overview ({totalListings})
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'properties'
                ? 'border-[#C6A66B] text-[#C6A66B] font-bold'
                : 'border-transparent text-[#A7A7A7] hover:text-[#F5F1E8]'
            }`}
          >
            Property Management
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'inquiries'
                ? 'border-[#C6A66B] text-[#C6A66B] font-bold'
                : 'border-transparent text-[#A7A7A7] hover:text-[#F5F1E8]'
            }`}
          >
            <span>Consultations</span>
            {pendingInquiriesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C6A66B] text-[#080808] text-[9px] flex items-center justify-center font-bold">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-[#C6A66B] text-[#C6A66B] font-bold'
                : 'border-transparent text-[#A7A7A7] hover:text-[#F5F1E8]'
            }`}
          >
            <span>Review Moderation</span>
            {pendingReviewsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-[#080808] text-[9px] flex items-center justify-center font-bold">
                {pendingReviewsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'media'
                ? 'border-[#C6A66B] text-[#C6A66B] font-bold'
                : 'border-transparent text-[#A7A7A7] hover:text-[#F5F1E8]'
            }`}
          >
            Media Assets Organizer
          </button>

          <button
            onClick={() => setActiveTab('offices')}
            className={`px-4 py-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'offices'
                ? 'border-[#C6A66B] text-[#C6A66B] font-bold'
                : 'border-transparent text-[#A7A7A7] hover:text-[#F5F1E8]'
            }`}
          >
            Global Offices ({offices.length})
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-5 bg-[#141414] border border-neutral-800">
                <span className="text-[10px] uppercase tracking-wider text-[#A7A7A7] font-mono block mb-1">
                  Total Portfolio Listings
                </span>
                <span className="font-mono text-3xl text-[#F5F1E8] font-bold">{totalListings}</span>
              </div>

              <div className="p-5 bg-[#141414] border border-neutral-800">
                <span className="text-[10px] uppercase tracking-wider text-[#C6A66B] font-mono block mb-1">
                  Active / Available
                </span>
                <span className="font-mono text-3xl text-[#C6A66B] font-bold">{availableCount}</span>
              </div>

              <div className="p-5 bg-[#141414] border border-neutral-800">
                <span className="text-[10px] uppercase tracking-wider text-[#A7A7A7] font-mono block mb-1">
                  Transactions Sold / Closed
                </span>
                <span className="font-mono text-3xl text-[#F5F1E8] font-bold">{soldCount}</span>
              </div>

              <div className="p-5 bg-[#141414] border border-neutral-800">
                <span className="text-[10px] uppercase tracking-wider text-[#A7A7A7] font-mono block mb-1">
                  Client Consultations (New)
                </span>
                <span className="font-mono text-3xl text-emerald-400 font-bold">{pendingInquiriesCount}</span>
              </div>

              <div className="p-5 bg-[#141414] border border-neutral-800">
                <span className="text-[10px] uppercase tracking-wider text-[#A7A7A7] font-mono block mb-1">
                  Audited Review Rating
                </span>
                <span className="font-mono text-3xl text-[#C6A66B] font-bold">{ratingMetrics.averageRating}★</span>
              </div>
            </div>

            {/* Quick Actions & Recent Consultations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-[#141414] border border-neutral-800 p-6">
                <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
                  <h3 className="font-serif text-xl text-[#F5F1E8]">Recent Client Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-[#C6A66B] hover:underline uppercase tracking-wider"
                  >
                    View All ({consultations.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {consultations.slice(0, 4).map((inq) => (
                    <div key={inq.id} className="p-4 bg-[#0a0a0a] border border-neutral-800/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-[#F5F1E8]">{inq.fullName}</span>
                          <span className="text-[10px] text-[#A7A7A7] font-mono">({inq.countryOfResidence})</span>
                          <span className={`px-2 py-0.5 text-[9px] font-mono uppercase ${
                            inq.status === 'new' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-neutral-800 text-neutral-300'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-[#A7A7A7] text-[11px] line-clamp-1">{inq.message}</p>
                      </div>

                      <div className="text-right shrink-0 ml-4">
                        <span className="font-mono text-[#C6A66B] text-xs block">{inq.budgetRange}</span>
                        <span className="text-[10px] text-[#777] font-mono">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Column */}
              <div className="lg:col-span-4 bg-[#141414] border border-neutral-800 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#F5F1E8] mb-4 border-b border-neutral-800 pb-3">
                    Portfolio Controls
                  </h3>

                  <div className="space-y-3">
                    <button
                      onClick={handleOpenAddProperty}
                      className="w-full py-2.5 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Property Listing</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="w-full py-2.5 border border-neutral-700 hover:border-[#C6A66B] text-xs uppercase tracking-wider text-[#F5F1E8] transition-colors flex items-center justify-center gap-2"
                    >
                      <Star className="w-4 h-4 text-[#C6A66B]" />
                      <span>Moderate Pending Reviews ({pendingReviewsCount})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('media')}
                      className="w-full py-2.5 border border-neutral-700 hover:border-[#C6A66B] text-xs uppercase tracking-wider text-[#F5F1E8] transition-colors flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4 text-[#C6A66B]" />
                      <span>Inspect Company Media Files</span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 text-[11px] text-[#A7A7A7] font-mono">
                  <span>VANTERRA Server-Side Validation: Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROPERTY MANAGEMENT */}
        {activeTab === 'properties' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-[#F5F1E8]">Property Catalog Ledger</h3>
                <p className="text-xs text-[#A7A7A7]">Add, edit, or adjust availability statuses across all territories.</p>
              </div>

              <button
                onClick={handleOpenAddProperty}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>

            <div className="bg-[#141414] border border-neutral-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0a0a0a] text-[10px] uppercase font-mono tracking-wider text-[#A7A7A7] border-b border-neutral-800">
                  <tr>
                    <th className="p-4">Property</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Specs</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {properties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-[#1a1a1a]/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prop.media[0]?.url || '/assets/aistudio/image_d0c4bca0.png'}
                            alt={prop.name}
                            className="w-12 h-10 object-cover border border-neutral-800"
                          />
                          <div>
                            <span className="font-medium text-[#F5F1E8] block">{prop.name}</span>
                            <span className="text-[10px] text-[#A7A7A7] font-mono">{prop.referenceNumber}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-[#A7A7A7]">
                        {prop.city}, {prop.country}
                      </td>

                      <td className="p-4 text-[#C6A66B] font-mono text-[11px]">
                        {prop.category}
                      </td>

                      <td className="p-4 font-mono font-medium text-[#F5F1E8]">
                        {prop.priceDisplay || `$${prop.price.toLocaleString()}`}
                      </td>

                      <td className="p-4 font-mono text-[11px] text-[#A7A7A7]">
                        {prop.bedrooms}B / {prop.bathrooms}Ba · {prop.livingAreaSqFt.toLocaleString()} sq ft
                      </td>

                      <td className="p-4">
                        <select
                          value={prop.availability}
                          onChange={(e) => updateProperty(prop.id, { 
                            availability: e.target.value as PropertyAvailability,
                            isSoldCollection: e.target.value === 'SOLD' || e.target.value === 'SOLD OUT'
                          })}
                          className="px-2 py-1 bg-[#0a0a0a] border border-neutral-700 text-[10px] font-mono uppercase tracking-wider text-[#C6A66B] outline-none"
                        >
                          <option value="AVAILABLE">AVAILABLE</option>
                          <option value="EXCLUSIVE">EXCLUSIVE</option>
                          <option value="UNDER OFFER">UNDER OFFER</option>
                          <option value="SOLD">SOLD</option>
                          <option value="SOLD OUT">SOLD OUT</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProperty(prop)}
                            className="p-1.5 border border-neutral-700 hover:border-[#C6A66B] text-[#A7A7A7] hover:text-[#C6A66B] cursor-pointer"
                            title="Edit Property"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProperty(prop.id)}
                            className="p-1.5 border border-neutral-700 hover:border-red-600 text-[#A7A7A7] hover:text-red-400 cursor-pointer"
                            title="Delete Property"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES & CONSULTATIONS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-[#F5F1E8]">Private Client Consultations Ledger</h3>
                <p className="text-xs text-[#A7A7A7]">Encrypted incoming requests from private investors and prospective purchasers.</p>
              </div>
            </div>

            <div className="space-y-4">
              {consultations.map((inq) => (
                <div key={inq.id} className="p-6 bg-[#141414] border border-neutral-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3 mb-4">
                    <div>
                      <span className="font-serif text-xl text-[#F5F1E8] block">{inq.fullName}</span>
                      <div className="flex items-center gap-3 text-xs text-[#A7A7A7] font-mono mt-0.5">
                        <span>{inq.email}</span>
                        <span>·</span>
                        <span>{inq.phone}</span>
                        <span>·</span>
                        <span className="text-[#C6A66B]">{inq.countryOfResidence}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => updateConsultationStatus(inq.id, e.target.value as any)}
                        className="px-2.5 py-1 bg-[#080808] border border-neutral-700 text-xs font-mono uppercase tracking-wider text-[#C6A66B]"
                      >
                        <option value="new">NEW INQUIRY</option>
                        <option value="contacted">PARTNER CONTACTED</option>
                        <option value="in_progress">IN PROGRESS / NDA</option>
                        <option value="archived">ARCHIVED</option>
                      </select>

                      <button
                        onClick={() => deleteConsultation(inq.id)}
                        className="p-1.5 border border-neutral-800 hover:border-red-600 text-neutral-500 hover:text-red-400"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono mb-4 text-[#A7A7A7]">
                    <div>
                      <span className="block text-[10px] text-[#777] uppercase">Budget Range</span>
                      <span className="text-[#F5F1E8]">{inq.budgetRange}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#777] uppercase">Enquiry Focus</span>
                      <span className="text-[#F5F1E8]">{inq.enquiryType} · {inq.preferredLocation}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#777] uppercase">Channel & Timestamp</span>
                      <span className="text-[#F5F1E8]">{inq.preferredContactMethod} · {new Date(inq.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0a0a0a] border border-neutral-800/80 text-xs text-[#F5F1E8]/90 font-light leading-relaxed">
                    <span className="block text-[9px] uppercase tracking-wider text-[#C6A66B] font-mono mb-1">
                      Confidential Mandate Details:
                    </span>
                    {inq.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REVIEW MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-serif text-2xl text-[#F5F1E8]">Customer Review Moderation Queue</h3>
              <p className="text-xs text-[#A7A7A7]">
                Strict verification workflow. All submissions enter pending queue before public publication.
              </p>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-6 bg-[#141414] border ${
                    rev.status === 'pending'
                      ? 'border-amber-400/60'
                      : rev.status === 'approved'
                      ? 'border-[#C6A66B]/30'
                      : 'border-neutral-800 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg text-[#F5F1E8]">{rev.clientName}</span>
                        <span className="text-xs font-mono text-[#A7A7A7]">({rev.clientEmail})</span>
                        <span className={`px-2 py-0.5 text-[9px] font-mono uppercase ${
                          rev.status === 'approved' ? 'bg-emerald-950 text-emerald-400' : rev.status === 'pending' ? 'bg-amber-950 text-amber-300' : 'bg-red-950 text-red-300'
                        }`}>
                          {rev.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#C6A66B] font-mono">{rev.propertyOrService}</span>
                        <span className="text-[11px] font-mono text-[#F5F1E8] bg-[#0a0a0a] px-2 py-0.5 border border-neutral-800">
                          {rev.rating.toFixed(1)} / 5.0
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleVerifiedReview(rev.id)}
                        className={`px-2.5 py-1 border text-[10px] font-mono uppercase tracking-wider ${
                          rev.verifiedCustomer
                            ? 'border-[#C6A66B] text-[#C6A66B]'
                            : 'border-neutral-700 text-[#777]'
                        }`}
                      >
                        {rev.verifiedCustomer ? 'Verified Client' : 'Mark Verified'}
                      </button>

                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => approveReview(rev.id)}
                          className="px-3 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 text-xs uppercase tracking-wider"
                        >
                          Approve
                        </button>
                      )}

                      {rev.status !== 'rejected' && (
                        <button
                          onClick={() => rejectReview(rev.id)}
                          className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-[#A7A7A7] text-xs uppercase tracking-wider"
                        >
                          Reject
                        </button>
                      )}

                      <button
                        onClick={() => deleteReview(rev.id)}
                        className="p-1 border border-neutral-700 hover:border-red-600 text-neutral-400 hover:text-red-400"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#F5F1E8]/90 italic mb-4">
                    "{rev.reviewText}"
                  </p>

                  {/* Existing executive response */}
                  {rev.adminResponse && (
                    <div className="p-3 bg-[#0a0a0a] border-l-2 border-[#C6A66B] text-xs text-[#A7A7A7] mb-3">
                      <span className="block text-[9px] uppercase tracking-wider text-[#C6A66B] font-mono mb-1">
                        Executive Response Attached:
                      </span>
                      {rev.adminResponse}
                    </div>
                  )}

                  {/* Add response input */}
                  {replyReviewId === rev.id ? (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write executive feedback response..."
                        className="flex-1 px-3 py-1.5 bg-[#080808] border border-neutral-700 text-xs text-[#F5F1E8] outline-none"
                      />
                      <button
                        onClick={() => handleSaveReply(rev.id)}
                        className="px-3 py-1.5 bg-[#C6A66B] text-[#080808] text-xs uppercase tracking-wider font-semibold"
                      >
                        Post
                      </button>
                      <button
                        onClick={() => setReplyReviewId(null)}
                        className="px-2 py-1.5 text-xs text-[#A7A7A7]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setReplyReviewId(rev.id);
                        setReplyText(rev.adminResponse || '');
                      }}
                      className="text-xs text-[#C6A66B] hover:underline uppercase tracking-wider font-mono"
                    >
                      {rev.adminResponse ? 'Edit Executive Response' : '+ Add Executive Response'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MEDIA ASSETS ORGANIZER */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-serif text-2xl text-[#F5F1E8]">Official Media Collections</h3>
              <p className="text-xs text-[#A7A7A7]">
                Authentic uploaded company footage: four photographs and two vertical cinematic walkthrough videos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Collection 01 Assets */}
              <div className="p-6 bg-[#141414] border border-neutral-800">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A66B] font-mono block mb-1">
                  PROPERTY COLLECTION 01
                </span>
                <h4 className="font-serif text-xl text-[#F5F1E8] mb-4">The Stone Residence (4 Photographs)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <img src="/assets/aistudio/image_d0c4bca0.png" alt="Exterior" className="w-full aspect-[4/3] object-cover border border-neutral-800" />
                    <span className="text-[10px] text-[#A7A7A7] font-mono block truncate">1. Exterior & Balcony</span>
                  </div>
                  <div className="space-y-1">
                    <img src="/assets/aistudio/image_5bcd0bb1.png" alt="Living Room" className="w-full aspect-[4/3] object-cover border border-neutral-800" />
                    <span className="text-[10px] text-[#A7A7A7] font-mono block truncate">2. Living Room & Staircase</span>
                  </div>
                  <div className="space-y-1">
                    <img src="/assets/aistudio/image_c04ae52a.png" alt="Mezzanine" className="w-full aspect-[4/3] object-cover border border-neutral-800" />
                    <span className="text-[10px] text-[#A7A7A7] font-mono block truncate">3. Mezzanine Interior</span>
                  </div>
                  <div className="space-y-1">
                    <img src="/assets/aistudio/image_12c85a82.png" alt="Master Bedroom" className="w-full aspect-[4/3] object-cover border border-neutral-800" />
                    <span className="text-[10px] text-[#A7A7A7] font-mono block truncate">4. Master Bedroom</span>
                  </div>
                </div>
              </div>

              {/* Collections 02 & 03 Videos */}
              <div className="p-6 bg-[#141414] border border-neutral-800">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A66B] font-mono block mb-1">
                  PROPERTY COLLECTIONS 02 & 03
                </span>
                <h4 className="font-serif text-xl text-[#F5F1E8] mb-4">Cinematic 4K Walkthrough Videos</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="aspect-[9/16] bg-[#0a0a0a] border border-neutral-800 relative overflow-hidden">
                      <video
                        src="/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.18_AM_f179ca0d.mp4"
                        controls
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-[#F5F1E8] font-medium block">The Contemporary Villa</span>
                    <span className="text-[10px] text-[#A7A7A7] font-mono block">Glass staircase, luxury bath</span>
                  </div>

                  <div className="space-y-2">
                    <div className="aspect-[9/16] bg-[#0a0a0a] border border-neutral-800 relative overflow-hidden">
                      <video
                        src="/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.17_AM_27cc9320.mp4"
                        controls
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-[#F5F1E8] font-medium block">The Poolside Estate</span>
                    <span className="text-[10px] text-[#A7A7A7] font-mono block">Lap pool, alfresco lounge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: GLOBAL OFFICES */}
        {activeTab === 'offices' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-[#F5F1E8]">Global Corporate Offices Registry</h3>
                <p className="text-xs text-[#A7A7A7]">
                  Manage New York Headquarters, Milan European Office, and authorized future regional corporate outposts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offices.map((office) => (
                <div key={office.id} className="p-6 bg-[#141414] border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#C6A66B]">
                        {office.isHeadquarters ? 'GLOBAL HEADQUARTERS' : 'EUROPEAN OFFICE'}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl text-[#F5F1E8] mb-1">{office.title}</h4>
                    <p className="text-xs text-[#A7A7A7] font-mono mb-4">{office.address}, {office.postalCode}</p>

                    <p className="text-xs text-[#F5F1E8]/80 leading-relaxed font-light mb-4">
                      "{office.description}"
                    </p>

                    <div className="space-y-1 text-xs text-[#A7A7A7] font-mono border-t border-neutral-800 pt-3">
                      <div>Telegram: <a href="https://t.me/MariaGallo01" target="_blank" rel="noopener noreferrer" className="text-[#64b5f6] hover:underline">{office.telegram || office.email}</a></div>
                      <div>Phone: <a href="tel:+13027296657" className="text-[#F5F1E8] hover:underline">{office.phone}</a></div>
                      <div>Hours: {office.hours}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Property Modal (Add / Edit) */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#151515] border border-[#C6A66B]/50 max-w-3xl w-full p-8 my-8 relative shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPropertyModalOpen(false)}
              className="absolute top-5 right-5 text-[#A7A7A7] hover:text-[#F5F1E8]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono block mb-1">
              VANTERRA PORTFOLIO RECORD
            </span>

            <h3 className="font-serif text-2xl text-[#F5F1E8] mb-6">
              {editingPropertyId ? 'Modify Property Record' : 'Publish New Luxury Property'}
            </h3>

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Property Name *</label>
                  <input
                    type="text"
                    required
                    value={propForm.name}
                    onChange={(e) => setPropForm({ ...propForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Category</label>
                  <select
                    value={propForm.category}
                    onChange={(e) => setPropForm({ ...propForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none"
                  >
                    <option value="Luxury Mansions">Luxury Mansions</option>
                    <option value="Contemporary Villas">Contemporary Villas</option>
                    <option value="Luxury Apartments">Luxury Apartments</option>
                    <option value="Penthouses">Penthouses</option>
                    <option value="Modern Residences">Modern Residences</option>
                    <option value="Waterfront Properties">Waterfront Properties</option>
                    <option value="Commercial Real Estate">Commercial Real Estate</option>
                    <option value="Investment Properties">Investment Properties</option>
                    <option value="Exclusive Estates">Exclusive Estates</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={propForm.country}
                    onChange={(e) => setPropForm({ ...propForm, country: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">City / Enclave *</label>
                  <input
                    type="text"
                    required
                    value={propForm.city}
                    onChange={(e) => setPropForm({ ...propForm, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Address / Street</label>
                  <input
                    type="text"
                    value={propForm.address}
                    onChange={(e) => setPropForm({ ...propForm, address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Price (Numeric USD) *</label>
                  <input
                    type="number"
                    required
                    value={propForm.price}
                    onChange={(e) => setPropForm({ ...propForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Price Display Label</label>
                  <input
                    type="text"
                    value={propForm.priceDisplay}
                    onChange={(e) => setPropForm({ ...propForm, priceDisplay: e.target.value })}
                    placeholder="e.g. $14,500,000 or Price upon request"
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Availability Status</label>
                  <select
                    value={propForm.availability}
                    onChange={(e) => setPropForm({ ...propForm, availability: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="EXCLUSIVE">EXCLUSIVE</option>
                    <option value="UNDER OFFER">UNDER OFFER</option>
                    <option value="SOLD">SOLD</option>
                    <option value="SOLD OUT">SOLD OUT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={propForm.bedrooms}
                    onChange={(e) => setPropForm({ ...propForm, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={propForm.bathrooms}
                    onChange={(e) => setPropForm({ ...propForm, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Living Area (sq ft)</label>
                  <input
                    type="number"
                    value={propForm.livingAreaSqFt}
                    onChange={(e) => setPropForm({ ...propForm, livingAreaSqFt: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Reference Code</label>
                  <input
                    type="text"
                    value={propForm.referenceNumber}
                    onChange={(e) => setPropForm({ ...propForm, referenceNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={propForm.shortDescription}
                  onChange={(e) => setPropForm({ ...propForm, shortDescription: e.target.value })}
                  placeholder="Single sentence luxury editorial summary..."
                  className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Full Architectural Narrative</label>
                <textarea
                  rows={4}
                  required
                  value={propForm.fullDescription}
                  onChange={(e) => setPropForm({ ...propForm, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Curated Amenities (Comma-separated)</label>
                <input
                  type="text"
                  value={propForm.amenities}
                  onChange={(e) => setPropForm({ ...propForm, amenities: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Primary Photograph Path / URL</label>
                  <input
                    type="text"
                    value={propForm.photoUrl1}
                    onChange={(e) => setPropForm({ ...propForm, photoUrl1: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#A7A7A7] font-mono mb-1">Walkthrough Video Path / URL</label>
                  <input
                    type="text"
                    value={propForm.videoUrl}
                    onChange={(e) => setPropForm({ ...propForm, videoUrl: e.target.value })}
                    placeholder="/assets/aistudio/WhatsApp_Video_..."
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-[#F5F1E8] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={propForm.featured}
                  onChange={(e) => setPropForm({ ...propForm, featured: e.target.checked })}
                  className="accent-[#C6A66B] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="featured-check" className="text-xs text-[#F5F1E8] cursor-pointer">
                  Feature this residence prominently on homepage editorial carousel
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPropertyModalOpen(false)}
                  className="px-4 py-2 border border-neutral-700 text-[#A7A7A7] uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-wider"
                >
                  {editingPropertyId ? 'Save Changes' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
