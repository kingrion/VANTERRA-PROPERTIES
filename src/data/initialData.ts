import { Property, GlobalOffice, Review, ServiceItem } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-stone-residence',
    name: 'The Stone Residence',
    category: 'Contemporary Villas',
    country: 'United States',
    city: 'Greenwich, Connecticut',
    address: 'Private Ridge Road, Greenwich',
    price: 750000,
    currency: 'USD',
    priceDisplay: '$750,000',
    italianPriceDisplay: '€690.000',
    italianCounterpartAmount: 690000,
    italianName: 'La Residenza Stone',
    italianShortDescription: 'Residenza moderna su due livelli con muratura in pietra lavorata a mano, balconata a sbalzo, soppalco scenografico e interni d\'autore.',
    bedrooms: 5,
    bathrooms: 6,
    livingAreaSqFt: 6850,
    landAreaSqFt: 38500,
    availability: 'AVAILABLE',
    featured: true,
    isSoldCollection: false,
    shortDescription: 'Modern two-storey residence with hand-cut stone masonry, cantilevered terrace balcony, dramatic mezzanine gallery, and curated designer interiors.',
    fullDescription: 'The Stone Residence is a masterclass in modern architectural refinement. Clad in warm natural stone accents with expansive black-framed glazing and deep covered porticos, this two-storey sanctuary commands an elevated private parcel. The grand interior reveals soaring double-height ceilings, a sculptural black steel staircase, open-plan entertaining zones, and an expansive chef\'s kitchen. The primary suite offers a private retreat with tailored millwork and a spa-inspired bath, while the mezzanine level provides dramatic sightlines across the light-filled main salon.',
    amenities: [
      'Hand-Cut Architectural Stone Detailing',
      'Double-Height Great Room with Mezzanine',
      'Bespoke Sculptural Iron & Steel Staircase',
      'Dual-Level Entertaining Covered Terraces',
      'Designer Chef\'s Kitchen with Quartzite Waterfall Island',
      'Primary Sanctuary with Custom Wardrobes',
      'Integrated Smart Home Automation & Climate Zones',
      'Three-Car Climate-Controlled Showcase Garage'
    ],
    media: [
      {
        id: 'stone-ext',
        type: 'image',
        url: '/assets/aistudio/image_d0c4bca0.png',
        caption: 'Modern two-storey exterior with hand-cut stone detailing, covered loggia, and second-floor balcony',
        isPrimary: true
      },
      {
        id: 'stone-living',
        type: 'image',
        url: '/assets/aistudio/image_5bcd0bb1.png',
        caption: 'Formal living salon featuring plush grey upholstery, fireplace, and bespoke black staircase',
        isPrimary: false
      },
      {
        id: 'stone-mezzanine',
        type: 'image',
        url: '/assets/aistudio/image_c04ae52a.png',
        caption: 'Open-plan living and formal dining area with cathedral ceilings and mezzanine gallery balcony',
        isPrimary: false
      },
      {
        id: 'stone-bedroom',
        type: 'image',
        url: '/assets/aistudio/image_12c85a82.png',
        caption: 'Primary bedroom sanctuary with custom furniture, plantation shutters, and ambient lighting',
        isPrimary: false
      }
    ],
    referenceNumber: 'VAN-US-001',
    createdAt: '2026-10-15T08:00:00Z',
    completionYear: 2024
  },
  {
    id: 'prop-contemporary-villa',
    name: 'The Contemporary Villa',
    category: 'Luxury Mansions',
    country: 'United States',
    city: 'New York, NY',
    address: '80 Broad Street, New York, NY 10004, USA',
    price: 600000,
    currency: 'USD',
    priceDisplay: '$600,000',
    italianPriceDisplay: '€552.000',
    italianCounterpartAmount: 552000,
    italianName: 'Villa Contemporanea',
    italianShortDescription: 'Spettacolare villa contemporanea bianca in 80 Broad Street, New York, NY 10004, USA, con monumentale scala in cristallo, suite padronali in marmo italiano, cucina gourmet e terrazza solarium.',
    italianDescription: 'Situata in 80 Broad Street, New York, NY 10004, USA, la Villa Contemporanea rappresenta l\'apice del lusso moderno. Definita da puri volumi architettonici candidi e ampie vetrate a tutta altezza, la residenza offre una perfetta fusione tra spazi interni ed esterni. Tra i dettagli di maggior pregio: monumentale scala sospesa in cristallo e acciaio, atrio a doppia altezza, finiture in marmo italiano a macchia aperta, cucina catering professionale per chef, loggia con cucina estiva alfresco e suite padronale con vasca freestanding affacciata sul giardino privato.',
    italianAmenities: [
      'Tenuta privata recintata con corte d\'ingresso lastricata',
      'Scala architettonica sospesa in cristallo e legno massello',
      'Bagno padronale in marmo italiano a macchia aperta con vasca freestanding',
      'Salone di ricevimento open-space con vetrate a scomparsa',
      'Cucina per chef con elettrodomestici Miele e isola centrale',
      'Ampia balconata perimetrale al primo piano con vista parco',
      'Cucina estiva esterna coperta e padiglione lounge alfresco',
      'Predisposizione sala cinema privata e caveau vini climatizzato'
    ],
    bedrooms: 3,
    bathrooms: 7,
    livingAreaSqFt: 8400,
    landAreaSqFt: 22000,
    availability: 'EXCLUSIVE',
    featured: true,
    isSoldCollection: false,
    shortDescription: 'Spectacular contemporary white villa situated at 80 Broad Street, New York, NY 10004, USA, featuring glass architectural staircase, bespoke marble bath suites, expansive gourmet kitchen, and rooftop sun deck.',
    fullDescription: 'Located at 80 Broad Street, New York, NY 10004, USA, The Contemporary Villa represents uncompromising modern luxury. Framed by brilliant architectural white volumes and floor-to-ceiling glass curtain walls, the residence offers seamless indoor-outdoor living. Highlights include a dramatic suspended glass and steel staircase, double-height foyer, custom marble countertops, professional catering kitchen, outdoor kitchen loggia, and a primary suite with a freestanding soaking tub overlooking private manicured grounds.',
    amenities: [
      'Gated Private Compound with Paver Motor Court',
      'Floating Glass & Timber Architectural Staircase',
      'Book-Matched Italian Marble Primary Bath with Freestanding Soaking Tub',
      'Expansive Open-Concept Entertaining Salon with Pocket Glass Doors',
      'Professional Chef\'s Kitchen with Miele Appliances and Island Seating',
      'Second-Floor Wraparound Balcony Overlooking Gardens',
      'Full Outdoor Summer Kitchen and Covered Alfresco Pavilion',
      'Pre-Wired Private Cinema and Wine Gallery'
    ],
    media: [
      {
        id: 'villa-video-main',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.18_AM_f179ca0d.mp4',
        caption: 'Cinematic video walkthrough of The Contemporary Villa showcasing exterior, glass staircase, and luxury suites',
        isPrimary: true
      },
      {
        id: 'villa-img-1',
        type: 'image',
        url: '/assets/aistudio/image_d0c4bca0.png',
        caption: 'Architectural facade and grounds overview',
        isPrimary: false
      }
    ],
    videoWalkthroughUrl: '/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.18_AM_f179ca0d.mp4',
    referenceNumber: 'VAN-US-002',
    createdAt: '2026-10-20T10:30:00Z',
    completionYear: 2025
  },
  {
    id: 'prop-poolside-estate',
    name: 'The Poolside Estate',
    category: 'Waterfront Properties',
    country: 'United States',
    city: 'Miami Beach, Florida',
    address: 'Biscayne Palms Way, Miami Beach',
    price: 795000,
    currency: 'USD',
    priceDisplay: '$795,000',
    italianPriceDisplay: '€731.000',
    italianCounterpartAmount: 731000,
    italianName: 'La Tenuta con Piscina',
    italianShortDescription: 'Cinematografica tenuta fronte mare con piscina a corsie privata, cucina estiva, loggia pranzo tropicale e raffinati saloni moderni.',
    bedrooms: 6,
    bathrooms: 8,
    livingAreaSqFt: 9200,
    landAreaSqFt: 28000,
    availability: 'EXCLUSIVE',
    featured: true,
    isSoldCollection: false,
    shortDescription: 'Cinematic waterfront estate with private lap pool, outdoor summer kitchen, tropical dining loggia, and light-filled architectural salons.',
    fullDescription: 'The Poolside Estate delivers the definitive South Florida resort lifestyle with international sophistication. Featuring an azure private swimming pool surrounded by polished stone terraces and lush subtropical flora, this estate was crafted for grand entertaining. The open-plan ground level merges effortlessly with the pool deck through motorized vanishing glass panels, connecting the interior marble kitchen, wet bar, and outdoor barbecue lounge.',
    amenities: [
      'Heated Designer Swimming Pool with Integrated Spa & Sun Shelf',
      'Covered Outdoor Entertaining Loggia with Gas Fire Lounge',
      'Stainless Steel Alfresco Kitchen & Barbecue Suite',
      'Double-Story Glass Foyer with Suspended Chandelier',
      'Gourmet Marble Kitchen with Walk-in Butler\'s Pantry',
      'Executive Home Office with Pool Views',
      'Private Fitness & Wellness Studio',
      'Deepwater Yacht Mooring Option'
    ],
    media: [
      {
        id: 'estate-video-main',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.17_AM_27cc9320.mp4',
        caption: 'Cinematic walkthrough featuring the private pool, outdoor lounge, and luxury interior design',
        isPrimary: true
      },
      {
        id: 'estate-img-1',
        type: 'image',
        url: '/assets/aistudio/image_c04ae52a.png',
        caption: 'Expansive living and dining interior looking toward gardens',
        isPrimary: false
      }
    ],
    videoWalkthroughUrl: '/assets/aistudio/WhatsApp_Video_2026-11-01_at_12.09.17_AM_27cc9320.mp4',
    referenceNumber: 'VAN-US-003',
    createdAt: '2026-10-25T14:15:00Z',
    completionYear: 2025
  },
  {
    id: 'prop-manhattan-crown-penthouse',
    name: 'The Crown Penthouse at Broad Street',
    category: 'Penthouses',
    country: 'United States',
    city: 'New York, NY',
    address: '80 Broad Street Enclave, Financial District, Manhattan',
    price: 800000,
    currency: 'USD',
    priceDisplay: '$800,000',
    italianPriceDisplay: '€736.000',
    italianCounterpartAmount: 736000,
    italianName: 'Attico Crown a Broad Street, Manhattan',
    italianShortDescription: 'Attico angolare a piano intero con viste panoramiche a 360° sul porto di New York e sullo storico Financial District di Manhattan.',
    bedrooms: 4,
    bathrooms: 5,
    livingAreaSqFt: 6200,
    landAreaSqFt: 1800,
    availability: 'SOLD OUT',
    featured: true,
    isSoldCollection: true,
    shortDescription: 'Full-floor corner penthouse with 360-degree panoramic views of New York Harbor, the Statue of Liberty, and the historic Manhattan Financial District.',
    fullDescription: 'Commanding the pinnacle of Manhattan\'s Financial District, The Crown Penthouse stands as one of the most prestigious downtown residential transactions of the year. Spanning an entire private floor with direct high-speed elevator access, the residence features 14-foot floor-to-ceiling windows, two expansive landscaped terraces overlooking the harbor, a 40-foot corner living gallery, and a primary suite occupying the entire southern wing. Successfully represented and closed exclusively by VANTERRA PROPERTIES.',
    transactionStory: 'Represented exclusively by VANTERRA PROPERTIES on behalf of a distinguished European private investment fund. The transaction was executed off-market with total discretion, establishing a new price-per-square-foot benchmark for the historic Financial District corridor.',
    amenities: [
      'Private Keyed Elevator Foyer',
      'Dual Wraparound Sky Terraces with Harbor Vistas',
      'Custom Boffi Kitchen with Calacatta Gold Marble',
      'Primary Wing with Dual Dressing Rooms and Steam Showers',
      '24/7 White-Glove Doorman and Concierge',
      'Private Temperature-Controlled Wine Vault',
      'Automated Valet Parking Facility'
    ],
    media: [
      {
        id: 'ny-penthouse-img',
        type: 'image',
        url: '/assets/aistudio/image_5bcd0bb1.png',
        caption: 'Formal gallery and skyline living salon',
        isPrimary: true
      }
    ],
    referenceNumber: 'VAN-TX-NYC-80B',
    createdAt: '2026-09-10T16:00:00Z',
    completionYear: 2023
  },
  {
    id: 'prop-milan-palazzo-brera',
    name: 'Palazzo Brera Moderno',
    category: 'Luxury Apartments',
    country: 'Italy',
    city: 'Milan',
    address: 'Near Piazzale Biancamano, Brera Design District',
    price: 710000,
    currency: 'USD',
    priceDisplay: '$710,000',
    italianPriceDisplay: '€650.000',
    italianCounterpartAmount: 650000,
    italianName: 'Palazzo Brera Moderno',
    italianShortDescription: 'Dimora nobiliare milanese restaurata che unisce soffitti storici con minimalismo contemporaneo e corte giardino interna privata.',
    bedrooms: 3,
    bathrooms: 4,
    livingAreaSqFt: 3950,
    availability: 'UNDER OFFER',
    featured: false,
    isSoldCollection: false,
    shortDescription: 'Restored Milanese noble residence blending historic ceiling heights with contemporary Italian minimalism and private interior garden terrace.',
    fullDescription: 'Located moments from Milan\'s cultural epicentre and the Piazzale Biancamano district, this exceptional apartment offers timeless Italian elegance. Crafted with herringbone oak parquetry, bespoke bronze door hardware, Poliform custom cabinetry, and a private courtyard terrace shaded by historic olive trees.',
    amenities: [
      'Historic 4.2m Ceiling Heights with Restored Stucco',
      'Private 80 sqm Interior Garden Loggia',
      'Custom Poliform Kitchen with Ceppo di Gré Stone',
      'Dedicated Sommelier Wine Tasting Room',
      'Concierge and Private Underground Garage'
    ],
    media: [
      {
        id: 'milan-img-1',
        type: 'image',
        url: '/assets/aistudio/image_c04ae52a.png',
        caption: 'Grand salon with dining space and courtyard light',
        isPrimary: true
      }
    ],
    referenceNumber: 'VAN-IT-MIL-04',
    createdAt: '2026-10-01T11:00:00Z',
    completionYear: 2024
  },
  {
    id: 'prop-london-belgravia',
    name: 'The Eaton Mews Residence',
    category: 'Modern Residences',
    country: 'England',
    city: 'London',
    address: 'Belgravia, London SW1X',
    price: 680000,
    currency: 'USD',
    priceDisplay: '$680,000',
    italianPriceDisplay: '€625.000',
    italianCounterpartAmount: 625000,
    italianName: 'Residenza Eaton Mews, Belgravia',
    italianShortDescription: 'Prestigiosa residenza a schiera nel cuore di Belgravia, riprogettata con piscina benessere sotterranea, ascensore privato e terrazza sul tetto.',
    bedrooms: 4,
    bathrooms: 5,
    livingAreaSqFt: 4800,
    availability: 'AVAILABLE',
    featured: false,
    isSoldCollection: false,
    shortDescription: 'Freehold Belgravia mews house re-engineered with subterranean wellness pool, passenger lift to all levels, and private roof garden.',
    fullDescription: 'An extraordinary turnkey freehold mews residence in London\'s most exclusive residential address. Completely re-engineered behind an understated classic facade, the property encompasses five levels of bespoke living, including a private elevator, indoor swimming pool, gym, media room, and rooftop terrace.',
    amenities: [
      'Turnkey Freehold Belgravia Address',
      'Subterranean Swimming Pool and Sauna Suite',
      'Glass Passenger Lift to All 5 Levels',
      'Private Roof Garden with Belgravia Skyline Views',
      'Integrated Garage with Turntable'
    ],
    media: [
      {
        id: 'london-img-1',
        type: 'image',
        url: '/assets/aistudio/image_12c85a82.png',
        caption: 'Tailored master bedroom suite with bespoke cabinetry',
        isPrimary: true
      }
    ],
    referenceNumber: 'VAN-UK-LDN-09',
    createdAt: '2026-10-18T09:30:00Z',
    completionYear: 2024
  }
];

export const INITIAL_OFFICES: GlobalOffice[] = [
  {
    id: 'office-us-hq',
    title: 'UNITED STATES — WORLD HEADQUARTERS',
    subtitle: 'Principal Corporate Operations & Global Client Advisory',
    country: 'United States',
    city: 'Milwaukee, WI (Wisconsin)',
    address: 'Eureka Curiel 5046 N 85th Street',
    postalCode: 'Milwaukee, WI (Wisconsin) 5320, United States',
    description: 'Our principal World Headquarters in the United States serves as the central command for our global real estate portfolio, international investment opportunities, and strategic sovereign partnerships across the Americas and world markets.',
    email: '@MariaGallo01',
    telegram: '@MariaGallo01',
    phone: '+1 (302) 729-6657',
    hours: 'Monday – Friday: 08:30 – 18:30 CST (Private consultations by appointment)',
    isHeadquarters: true,
    coordinates: {
      lat: 43.1098,
      lng: -88.0195
    }
  },
  {
    id: 'office-milan',
    title: 'MILAN, ITALY — EUROPEAN OFFICE',
    subtitle: 'Continental Europe & Mediterranean Advisory',
    country: 'Italy',
    city: 'Milano',
    address: 'Piazzale Biancamano 8',
    postalCode: '20121 Milano, Italy',
    description: 'Our Milan office extends our international presence into Europe, connecting clients and investors with premium property opportunities across Italy and beyond.',
    email: '@MariaGallo01',
    telegram: '@MariaGallo01',
    phone: '+1 (302) 729-6657',
    hours: 'Monday – Friday: 09:00 – 19:00 CET (Private consultations by appointment)',
    isHeadquarters: false,
    coordinates: {
      lat: 45.4782,
      lng: 9.1824
    }
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-acquisition',
    title: 'Luxury Property Acquisition',
    category: 'Acquisition',
    shortDescription: 'Tailored private search and confidential negotiation for premier residential estates and penthouses worldwide.',
    fullDescription: 'Our acquisition desk represents discerning buyers seeking extraordinary residences across prime international capitals. We provide discreet off-market access, rigorous architectural diligence, valuation intelligence, and comprehensive transaction structuring.',
    benefits: [
      'Exclusive off-market and pre-market access',
      'Confidential price and contract negotiations',
      'International legal and structural coordination',
      'Private architectural & engineering assessments'
    ],
    iconName: 'Building2'
  },
  {
    id: 'serv-investment',
    title: 'International Property Investment',
    category: 'Capital Advisory',
    shortDescription: 'Strategic capital deployment into prime yielding assets, heritage redevelopments, and trophy portfolios.',
    fullDescription: 'Connecting global family offices, private wealth investors, and sovereign entities with high-barrier-to-entry international real estate opportunities engineered for long-term capital preservation and exceptional appreciation.',
    benefits: [
      'Cross-border portfolio diversification',
      'Macroeconomic market yield forecasting',
      'Tax-efficient asset holding structures',
      'Direct co-investment syndicate access'
    ],
    iconName: 'TrendingUp'
  },
  {
    id: 'serv-sales',
    title: 'Exclusive Property Sales',
    category: 'Representation',
    shortDescription: 'Bespoke marketing campaigns commanding international reach to qualified ultra-high-net-worth buyers.',
    fullDescription: 'Representing sellers of world-class properties requires more than standard brokerage. We curate cinema-grade media, tailored global press placements, and targeted private roadshows across financial hubs.',
    benefits: [
      'Bespoke cinematic video walkthroughs & imagery',
      'Direct distribution to global wealth networks',
      'Strict verification of potential purchasers',
      'Maximized transaction value and confidentiality'
    ],
    iconName: 'KeyRound'
  },
  {
    id: 'serv-marketing',
    title: 'Property Marketing',
    category: 'Brand & Media',
    shortDescription: 'Hollywood-grade architectural filmmaking, editorial publishing, and private international showcases.',
    fullDescription: 'Every exceptional property possesses a story. Our in-house creative agency produces cinema-quality architectural film, editorial monographs, and private immersive digital experiences that captivate the world\'s most discerning clientele.',
    benefits: [
      '4K cinematic aerial and walkthrough production',
      'Bespoke hardcover property monographs',
      'Targeted digital marketing across elite demographics',
      'Global luxury lifestyle publication editorial features'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'serv-consultation',
    title: 'Private Property Consultation',
    category: 'Private Client',
    shortDescription: 'One-on-one strategic advisory regarding portfolio restructuring, family succession, and acquisitions.',
    fullDescription: 'Whether planning a generational estate transfer, assessing prime market liquidity, or commissioning an architect for a greenfield compound, our senior partners provide bespoke counsel anchored in decades of institutional real estate insight.',
    benefits: [
      'Confidential partner-led advisory sessions',
      'Generational asset transfer guidance',
      'Real-time valuation benchmarking',
      'Custom market feasibility studies'
    ],
    iconName: 'ShieldCheck'
  },
  {
    id: 'serv-commercial',
    title: 'Commercial Real Estate',
    category: 'Institutional',
    shortDescription: 'Trophy headquarters, boutique hospitality assets, and flagship retail spaces in premier global corridors.',
    fullDescription: 'Structuring high-profile commercial real estate transactions in financial centers including New York, Milan, and London. We advise institutional funds and private enterprises on acquiring, re-tenanting, and disposing of premier commercial assets.',
    benefits: [
      'Core CBD office and retail flagship positioning',
      'Boutique luxury hospitality opportunities',
      'Single-tenant triple net lease acquisitions',
      'Institutional underwriting and debt structuring'
    ],
    iconName: 'Landmark'
  },
  {
    id: 'serv-residential-advisory',
    title: 'Luxury Residential Advisory',
    category: 'Design & Build',
    shortDescription: 'End-to-end guidance from site selection and master planning to interior furnishing and estate commissioning.',
    fullDescription: 'For clients commissioning bespoke estates from the ground up, we orchestrate the finest international architects, interior designers, landscape masters, and security consultants to ensure absolute perfection.',
    benefits: [
      'Elite architect and designer introductions',
      'Permitting, zoning, and historic preservation review',
      'Procurement oversight and project auditing',
      'Complete estate commissioning and staffing'
    ],
    iconName: 'Compass'
  },
  {
    id: 'serv-global-opportunities',
    title: 'International Real Estate Opportunities',
    category: 'Global Expansion',
    shortDescription: 'Cross-border intelligence connecting buyers with emerging wealth centers and golden visa programs.',
    fullDescription: 'Navigating international property jurisdictions requires unmatched global perspective. We guide clients through currency considerations, tax treaties, residency-by-investment guidelines, and regulatory nuances across premier sovereign jurisdictions.',
    benefits: [
      'Multinational residency & investment advisory',
      'Currency hedging and international banking liaison',
      'Comparative tax efficiency across jurisdictions',
      'Direct liaison with consular & legal authorities'
    ],
    iconName: 'Globe'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    clientName: 'Alexander von H.',
    clientEmail: 'a.vonh@swissfamilyoffice.ch',
    rating: 5,
    propertyOrService: 'The Contemporary Villa at 80 Broad Street',
    reviewText: 'VANTERRA PROPERTIES conducted the entire Manhattan transaction with immaculate precision and complete discretion. Their market intelligence in New York is matched only by their European sophistication. An exemplary partnership.',
    createdAt: '2026-10-04T12:00:00Z',
    status: 'approved',
    verifiedCustomer: true,
    adminResponse: 'Thank you for your trust, Alexander. It was a privilege to orchestrate such a landmark acquisition for your family office.'
  },
  {
    id: 'rev-02',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@rostova-holdings.co.uk',
    rating: 4.8,
    propertyOrService: 'International Property Investment',
    reviewText: 'From our initial private consultation to managing our premier estate holdings, the team\'s caliber, attention to detail, and responsiveness were world-class. They understand true luxury.',
    createdAt: '2026-10-18T15:30:00Z',
    status: 'approved',
    verifiedCustomer: true,
    adminResponse: 'We are delighted to continue supporting your international property portfolio, Elena.'
  },
  {
    id: 'rev-03',
    clientName: 'Marcus C. Sterling',
    clientEmail: 'm.sterling@sterlingcap.com',
    rating: 5,
    propertyOrService: 'The Stone Residence',
    reviewText: 'The architectural curation of The Stone Residence was breathtaking. The digital presentation, walkthrough, and subsequent private viewing exceeded every expectation. VANTERRA defines the pinnacle of real estate.',
    createdAt: '2026-10-28T09:15:00Z',
    status: 'approved',
    verifiedCustomer: true
  },
  {
    id: 'rev-04',
    clientName: 'Countess Camilla V.',
    clientEmail: 'c.valier@veneziaholdings.it',
    rating: 4.9,
    propertyOrService: 'Private Client Advisory Desk',
    reviewText: 'Exceptional discretion and bespoke guidance throughout our global acquisitions. The five-star standard of excellence is evident in every single interaction with VANTERRA leadership.',
    createdAt: '2026-10-29T14:20:00Z',
    status: 'approved',
    verifiedCustomer: true
  }
];
