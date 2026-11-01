export type PropertyAvailability = 'AVAILABLE' | 'EXCLUSIVE' | 'UNDER OFFER' | 'SOLD' | 'SOLD OUT';

export type PropertyCategory = 
  | 'Luxury Mansions'
  | 'Contemporary Villas'
  | 'Luxury Apartments'
  | 'Penthouses'
  | 'Modern Residences'
  | 'Waterfront Properties'
  | 'Commercial Real Estate'
  | 'Investment Properties'
  | 'Exclusive Estates';

export interface PropertyMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface Property {
  id: string;
  name: string;
  category: PropertyCategory;
  country: string;
  city: string;
  address?: string;
  price: number; // in USD or equivalent
  currency: string;
  priceDisplay?: string; // e.g. "$14,500,000" or "Price upon request"
  bedrooms: number;
  bathrooms: number;
  livingAreaSqFt: number;
  landAreaSqFt?: number;
  availability: PropertyAvailability;
  featured: boolean;
  isSoldCollection?: boolean;
  shortDescription: string;
  fullDescription: string;
  amenities: string[];
  media: PropertyMedia[];
  videoWalkthroughUrl?: string;
  transactionStory?: string;
  completionYear?: number;
  referenceNumber: string;
  createdAt: string;
  italianName?: string;
  italianDescription?: string;
  italianShortDescription?: string;
  italianAmenities?: string[];
  italianPriceDisplay?: string;
  italianCounterpartAmount?: number;
}

export interface Review {
  id: string;
  clientName: string;
  clientEmail: string;
  rating: number; // 1 to 5
  propertyOrService: string;
  reviewText: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  verifiedCustomer: boolean;
  adminResponse?: string;
}

export interface ConsultationInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  countryOfResidence: string;
  preferredLocation: string;
  interestedProperty?: string;
  budgetRange: string;
  enquiryType: 'Acquisition' | 'Investment' | 'Private Sale' | 'Advisory' | 'General';
  preferredContactMethod: 'Email' | 'Phone' | 'WhatsApp' | 'Telegram';
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'archived';
  notes?: string;
}

export interface GlobalOffice {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  description: string;
  email: string;
  telegram?: string;
  phone: string;
  hours: string;
  isHeadquarters?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  iconName: string;
}

export interface PropertyFilters {
  searchQuery: string;
  country: string;
  city: string;
  category: string;
  availability: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
  bathrooms: number | 'all';
  sortBy: 'featured' | 'newest' | 'price_asc' | 'price_desc';
}
