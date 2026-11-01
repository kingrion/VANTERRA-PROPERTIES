import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Review, ConsultationInquiry, GlobalOffice, PropertyFilters } from '../types';
import { INITIAL_PROPERTIES, INITIAL_OFFICES, INITIAL_REVIEWS, INITIAL_SERVICES } from '../data/initialData';

export type AppView = 
  | 'home' 
  | 'properties' 
  | 'property-detail' 
  | 'about' 
  | 'services' 
  | 'presence' 
  | 'testimonials' 
  | 'consultation' 
  | 'contact' 
  | 'admin';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedPropertyId: string | null;
  openPropertyDetail: (id: string) => void;
  navigateToSection: (sectionId: string) => void;

  // Properties CRUD
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  selectedProperty: Property | undefined;

  // Filtering & Search
  filters: PropertyFilters;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilters>>;
  resetFilters: () => void;
  filteredProperties: Property[];

  // Favourites
  favourites: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  clearFavourites: () => void;
  isFavouritesDrawerOpen: boolean;
  setIsFavouritesDrawerOpen: (open: boolean) => void;

  // Reviews & Ratings
  reviews: Review[];
  approvedReviews: Review[];
  submitReview: (reviewData: {
    clientName: string;
    clientEmail: string;
    rating: number;
    propertyOrService: string;
    reviewText: string;
  }) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;
  toggleVerifiedReview: (id: string) => void;
  addReviewResponse: (id: string, response: string) => void;
  ratingMetrics: {
    averageRating: number;
    totalReviews: number;
    fiveStarPercentage: number;
    ratingDistribution: { [key: number]: number };
  };

  // Consultations & Inquiries
  consultations: ConsultationInquiry[];
  submitConsultation: (inquiry: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateConsultationStatus: (id: string, status: ConsultationInquiry['status'], notes?: string) => void;
  deleteConsultation: (id: string) => void;

  // Global Offices
  offices: GlobalOffice[];
  addOffice: (office: Omit<GlobalOffice, 'id'>) => void;
  updateOffice: (id: string, updates: Partial<GlobalOffice>) => void;
  deleteOffice: (id: string) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Lightbox & Video Player Modal
  activeMediaModal: {
    isOpen: boolean;
    type: 'image' | 'video';
    url: string;
    title?: string;
  } | null;
  openMediaModal: (media: { type: 'image' | 'video'; url: string; title?: string }) => void;
  closeMediaModal: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Italian Transcription & Dual Currency
  currencyMode: 'USD' | 'EUR' | 'BOTH';
  setCurrencyMode: (mode: 'USD' | 'EUR' | 'BOTH') => void;
  activeItalianTranscription: Property | null;
  openItalianTranscription: (property: Property) => void;
  closeItalianTranscription: () => void;
  formatDualPrice: (property: Property) => { usd: string; eur: string; full: string };
}

const DEFAULT_FILTERS: PropertyFilters = {
  searchQuery: '',
  country: 'all',
  city: 'all',
  category: 'all',
  availability: 'all',
  minPrice: 450000,
  maxPrice: 850000,
  bedrooms: 'all',
  bathrooms: 'all',
  sortBy: 'featured'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isFavouritesDrawerOpen, setIsFavouritesDrawerOpen] = useState(false);

  // Persistence: Properties (v5 with 80 Broad Street NY for Contemporary Villa, 3 beds, 500k-800k prices)
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('vanterra_properties_v5');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_PROPERTIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('vanterra_properties_v5', JSON.stringify(properties));
    } catch {
      // storage quota or disabled
    }
  }, [properties]);

  // Persistence: Favourites
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('vanterra_favourites');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('vanterra_favourites', JSON.stringify(favourites));
    } catch {
      // fallback
    }
  }, [favourites]);

  // Persistence: Reviews (v3 with 4-5 star range)
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem('vanterra_reviews_v3');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('vanterra_reviews_v3', JSON.stringify(reviews));
    } catch {
      // fallback
    }
  }, [reviews]);

  // Persistence: Consultations
  const [consultations, setConsultations] = useState<ConsultationInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('vanterra_consultations_v2');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        id: 'inq-initial-01',
        fullName: 'Baroness Caroline de Saint-Germain',
        email: 'c.stgermain@monacotrust.mc',
        phone: '+377 98 98 00 12',
        countryOfResidence: 'Monaco',
        preferredLocation: 'New York, USA',
        interestedProperty: 'The Contemporary Villa at 80 Broad Street',
        budgetRange: '$600,000 (ca. €552.000)',
        enquiryType: 'Acquisition',
        preferredContactMethod: 'Telegram',
        message: 'Requesting confidential briefing regarding floor plans and private acquisition terms.',
        createdAt: '2026-10-29T11:20:00Z',
        status: 'new'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('vanterra_consultations_v2', JSON.stringify(consultations));
    } catch {
      // fallback
    }
  }, [consultations]);

  // Persistence: Global Offices (v4 with World HQ at Eureka Curiel 5046 N 85th Street Milwaukee WI)
  const [offices, setOffices] = useState<GlobalOffice[]>(() => {
    try {
      const stored = localStorage.getItem('vanterra_offices_v4');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_OFFICES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('vanterra_offices_v4', JSON.stringify(offices));
    } catch {
      // fallback
    }
  }, [offices]);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('vanterra_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const loginAdmin = (password: string): boolean => {
    // Admin password for Vanterra management
    if (password === 'vanterra2026' || password === 'admin' || password === 'prestige') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('vanterra_admin_auth', 'true');
      addToast({
        type: 'success',
        title: 'Authentication Granted',
        message: 'Welcome to the VANTERRA PROPERTIES Management Suite.'
      });
      return true;
    }
    addToast({
      type: 'error',
      title: 'Access Denied',
      message: 'Invalid administrative credential. Discretion required.'
    });
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('vanterra_admin_auth');
    addToast({
      type: 'info',
      title: 'Session Concluded',
      message: 'Logged out of administrator workspace.'
    });
    setCurrentView('home');
  };

  // Filters State
  const [filters, setFilters] = useState<PropertyFilters>(DEFAULT_FILTERS);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Media Lightbox Modal
  const [activeMediaModal, setActiveMediaModal] = useState<{
    isOpen: boolean;
    type: 'image' | 'video';
    url: string;
    title?: string;
  } | null>(null);

  const openMediaModal = (media: { type: 'image' | 'video'; url: string; title?: string }) => {
    setActiveMediaModal({
      isOpen: true,
      ...media
    });
  };

  const closeMediaModal = () => {
    setActiveMediaModal(null);
  };

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Italian Transcription & Dual Currency State
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'EUR' | 'BOTH'>('BOTH');
  const [activeItalianTranscription, setActiveItalianTranscription] = useState<Property | null>(null);

  const openItalianTranscription = (property: Property) => {
    setActiveItalianTranscription(property);
  };

  const closeItalianTranscription = () => {
    setActiveItalianTranscription(null);
  };

  const formatDualPrice = (prop: Property) => {
    const usd = prop.priceDisplay || `$${prop.price.toLocaleString('en-US')}`;
    const eurAmount = prop.italianCounterpartAmount || Math.round(prop.price * 0.92);
    const eur = prop.italianPriceDisplay || `€${eurAmount.toLocaleString('it-IT')}`;
    return {
      usd,
      eur,
      full: `${usd} (Controvalore Italiano: ${eur})`
    };
  };

  // Navigation handlers
  const openPropertyDetail = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentView('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Selected property helper
  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);

  // Property CRUD
  const addProperty = (newProp: Omit<Property, 'id' | 'createdAt'>) => {
    const id = `prop-${Date.now()}`;
    const property: Property = {
      ...newProp,
      id,
      createdAt: new Date().toISOString()
    };
    setProperties((prev) => [property, ...prev]);
    addToast({
      type: 'success',
      title: 'Property Listed',
      message: `${property.name} has been published to the portfolio.`
    });
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast({
      type: 'success',
      title: 'Property Updated',
      message: 'Modifications saved successfully to portfolio records.'
    });
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'info',
      title: 'Listing Removed',
      message: 'The selected property has been decommissioned from active listings.'
    });
  };

  // Filtered Properties Computation
  const filteredProperties = properties.filter((p) => {
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(query);
      const matchCity = p.city.toLowerCase().includes(query);
      const matchCountry = p.country.toLowerCase().includes(query);
      const matchCategory = p.category.toLowerCase().includes(query);
      const matchRef = p.referenceNumber.toLowerCase().includes(query);
      if (!matchName && !matchCity && !matchCountry && !matchCategory && !matchRef) {
        return false;
      }
    }

    if (filters.country !== 'all' && p.country.toLowerCase() !== filters.country.toLowerCase()) {
      return false;
    }

    if (filters.city !== 'all' && !p.city.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    if (filters.category !== 'all' && p.category !== filters.category) {
      return false;
    }

    if (filters.availability !== 'all' && p.availability !== filters.availability) {
      return false;
    }

    if (filters.bedrooms !== 'all' && p.bedrooms < Number(filters.bedrooms)) {
      return false;
    }

    if (filters.bathrooms !== 'all' && p.bathrooms < Number(filters.bathrooms)) {
      return false;
    }

    if (p.price < filters.minPrice || p.price > filters.maxPrice) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (filters.sortBy === 'price_asc') {
      return a.price - b.price;
    }
    if (filters.sortBy === 'price_desc') {
      return b.price - a.price;
    }
    // featured
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Favourites System
  const toggleFavourite = (id: string) => {
    setFavourites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Portfolio',
          message: 'Property removed from your private shortlisted collection.'
        });
        return prev.filter((itemId) => itemId !== id);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Portfolio',
          message: 'Property added to your private shortlisted collection.'
        });
        return [...prev, id];
      }
    });
  };

  const isFavourite = (id: string) => favourites.includes(id);

  const clearFavourites = () => {
    setFavourites([]);
    addToast({
      type: 'info',
      title: 'Portfolio Cleared',
      message: 'All saved listings have been removed.'
    });
  };

  // Reviews & Rating System (1.0 – 5.0 range)
  const approvedReviews = reviews.filter((r) => r.status === 'approved');

  const ratingMetrics = React.useMemo(() => {
    const total = approvedReviews.length;
    if (total === 0) {
      return {
        averageRating: 5.0,
        totalReviews: 0,
        fiveStarPercentage: 100,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }
    // Enforce 1-5 rating range bounds
    const clampedReviews = approvedReviews.map((r) => ({
      ...r,
      rating: Math.max(1, Math.min(5, r.rating))
    }));
    const sum = clampedReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = Number((sum / total).toFixed(1));
    const dist: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    clampedReviews.forEach((r) => {
      const starFloor = Math.max(1, Math.min(5, Math.floor(r.rating)));
      dist[starFloor] = (dist[starFloor] || 0) + 1;
    });
    const fiveStarPct = Math.round(((dist[5] || 0) / total) * 100);

    return {
      averageRating: Math.max(1.0, Math.min(5.0, avg)),
      totalReviews: total,
      fiveStarPercentage: fiveStarPct,
      ratingDistribution: dist
    };
  }, [approvedReviews]);

  const submitReview = (reviewData: {
    clientName: string;
    clientEmail: string;
    rating: number;
    propertyOrService: string;
    reviewText: string;
  }) => {
    // Strictly clamp ratings to 1.0 – 5.0 range
    const validRating = Math.max(1, Math.min(5, Number(reviewData.rating) || 5));
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      ...reviewData,
      rating: validRating,
      createdAt: new Date().toISOString(),
      status: 'pending', // all submitted reviews enter pending approval queue
      verifiedCustomer: false
    };
    setReviews((prev) => [newRev, ...prev]);
    addToast({
      type: 'success',
      title: 'Feedback Received',
      message: 'Your review has been submitted for executive moderation within our client review ledger.'
    });
  };

  const approveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    addToast({
      type: 'success',
      title: 'Review Approved',
      message: 'Testimonial is now live on the public reputation showcase.'
    });
  };

  const rejectReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
    addToast({
      type: 'info',
      title: 'Review Rejected',
      message: 'Testimonial status updated to rejected.'
    });
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    addToast({
      type: 'info',
      title: 'Review Deleted',
      message: 'Record removed from moderation ledger.'
    });
  };

  const toggleVerifiedReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verifiedCustomer: !r.verifiedCustomer } : r))
    );
  };

  const addReviewResponse = (id: string, response: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, adminResponse: response } : r))
    );
    addToast({
      type: 'success',
      title: 'Executive Response Posted',
      message: 'Official response attached to customer feedback.'
    });
  };

  // Consultations & Inquiries
  const submitConsultation = (inquiry: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: ConsultationInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    setConsultations((prev) => [newInq, ...prev]);
    addToast({
      type: 'success',
      title: 'Consultation Scheduled',
      message: 'A Senior Partner will contact you discreetly within 24 hours.'
    });
  };

  const updateConsultationStatus = (id: string, status: ConsultationInquiry['status'], notes?: string) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, ...(notes !== undefined ? { notes } : {}) } : c))
    );
    addToast({
      type: 'success',
      title: 'Inquiry Status Updated',
      message: `Status marked as ${status.replace('_', ' ').toUpperCase()}.`
    });
  };

  const deleteConsultation = (id: string) => {
    setConsultations((prev) => prev.filter((c) => c.id !== id));
    addToast({
      type: 'info',
      title: 'Inquiry Cleared',
      message: 'Record archived and removed from inbox.'
    });
  };

  // Global Offices CRUD
  const addOffice = (officeData: Omit<GlobalOffice, 'id'>) => {
    const newOff: GlobalOffice = {
      ...officeData,
      id: `off-${Date.now()}`
    };
    setOffices((prev) => [...prev, newOff]);
    addToast({
      type: 'success',
      title: 'Office Added',
      message: `${newOff.title} added to global presence registry.`
    });
  };

  const updateOffice = (id: string, updates: Partial<GlobalOffice>) => {
    setOffices((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updates } : o))
    );
    addToast({
      type: 'success',
      title: 'Office Details Updated',
      message: 'Global presence record modified.'
    });
  };

  const deleteOffice = (id: string) => {
    setOffices((prev) => prev.filter((o) => o.id !== id));
    addToast({
      type: 'info',
      title: 'Office Removed',
      message: 'Location removed from global network map.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedPropertyId,
        openPropertyDetail,
        navigateToSection,

        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        selectedProperty,

        filters,
        setFilters,
        resetFilters,
        filteredProperties,

        favourites,
        toggleFavourite,
        isFavourite,
        clearFavourites,
        isFavouritesDrawerOpen,
        setIsFavouritesDrawerOpen,

        reviews,
        approvedReviews,
        submitReview,
        approveReview,
        rejectReview,
        deleteReview,
        toggleVerifiedReview,
        addReviewResponse,
        ratingMetrics,

        consultations,
        submitConsultation,
        updateConsultationStatus,
        deleteConsultation,

        offices,
        addOffice,
        updateOffice,
        deleteOffice,

        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,

        activeMediaModal,
        openMediaModal,
        closeMediaModal,

        toasts,
        addToast,
        removeToast,

        currencyMode,
        setCurrencyMode,
        activeItalianTranscription,
        openItalianTranscription,
        closeItalianTranscription,
        formatDualPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
