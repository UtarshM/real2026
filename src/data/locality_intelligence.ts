export interface LocalityInfo {
  slug: string;
  name: string;
  city: string;
  tagline: string;
  overview: string;
  avgPriceSqFt: string;
  priceGrowth5Yr: string;
  rentalYield: string;
  walkScore: number;
  safetyScore: number;
  metroDistance: string;
  hospitalDistance: string;
  schoolDistance: string;
  waterQuality: string;
  trafficRating: string;
  investmentScore: number;
  nearbySchools: string[];
  nearbyHospitals: string[];
  upcomingInfrastructure: string[];
  topProjects: string[];
  faqs: { q: string; a: string }[];
}

export const LOCALITY_INTELLIGENCE: Record<string, LocalityInfo> = {
  bopal: {
    slug: "bopal",
    name: "Bopal & South Bopal",
    city: "Ahmedabad",
    tagline: "Ahmedabad's Premier Fast-Growing Residential Hub",
    overview: "Bopal and South Bopal have transformed into top-tier residential corridors with wide 45m roads, SP Ring Road connectivity, thriving educational institutions, and luxury residential high-rises.",
    avgPriceSqFt: "₹ 4,850 - ₹ 6,200",
    priceGrowth5Yr: "+34.5%",
    rentalYield: "4.2% p.a.",
    walkScore: 82,
    safetyScore: 92,
    metroDistance: "1.8 km (Thaltej / Bopal Extension)",
    hospitalDistance: "0.5 km (Krishna Shalby)",
    schoolDistance: "0.8 km (DPS Bopal, Zydus School)",
    waterQuality: "24/7 AUDA Treated Municipal Water",
    trafficRating: "Moderate (Ring Road flyovers active)",
    investmentScore: 94,
    nearbySchools: ["Delhi Public School (DPS Bopal)", "Zydus School for Excellence", "TULIP International School"],
    nearbyHospitals: ["Krishna Shalby Hospital", "Mamta Hospital", "Saraswati Hospital"],
    upcomingInfrastructure: ["SP Ring Road 6-Lane Elevated Corridor", "Underground Drainage Upgrade", "Bopal Lakefront Promenade Park"],
    topProjects: ["Shivalik Edge & Sky Villas", "Gala Swing 3 BHK", "Safal Parisar"],
    faqs: [
      { q: "Is South Bopal good for family residence?", a: "Yes, South Bopal offers clean air, wide internal roads, top schools like DPS, and 24/7 security gated communities." },
      { q: "What is the expected ROI for property in Bopal?", a: "Historical 5-year price appreciation stands at +34.5% with annual rental yields averaging 4.2%." }
    ]
  },
  "gift-city": {
    slug: "gift-city",
    name: "GIFT City (Gandhinagar)",
    city: "Gandhinagar",
    tagline: "India's Premier International Financial Services Centre (IFSC)",
    overview: "GIFT City is a smart business district featuring Grade-A commercial towers, international stock exchanges, high-density residential towers, and automated utility tunnels.",
    avgPriceSqFt: "₹ 7,200 - ₹ 9,800",
    priceGrowth5Yr: "+52.0%",
    rentalYield: "6.8% p.a.",
    walkScore: 95,
    safetyScore: 98,
    metroDistance: "0.2 km (GIFT City Metro Station)",
    hospitalDistance: "2.0 km (Apollo Hospitals)",
    schoolDistance: "1.5 km (GIFT International School)",
    waterQuality: "Potable Direct Tap Water (Smart Utility District)",
    trafficRating: "Zero Traffic (Underground Logistics Tunnels)",
    investmentScore: 99,
    nearbySchools: ["GIFT International School", "PDPU Campus", "GNLU Gandhinagar"],
    nearbyHospitals: ["Apollo Hospitals Gandhinagar", "KD Hospital Corridor"],
    upcomingInfrastructure: ["Formula 1 Test Track & Tech Park Expansion", "High-Speed Rail Bullet Train Link", "International Financial Tower 3"],
    topProjects: ["Shivalik Curv Commercial", "Sobha Dream Heights", "Grand Mercure Residences"],
    faqs: [
      { q: "Why is GIFT City attracting global investors?", a: "Tax exemptions for foreign banks, high rental yield (6.8%), and state-of-the-art smart city infrastructure make GIFT City a prime investment zone." }
    ]
  },
  "science-city": {
    slug: "science-city",
    name: "Science City Road",
    city: "Ahmedabad",
    tagline: "High-End Luxury Living Corridor along SG Highway",
    overview: "Science City Road is synonymous with luxury 4 BHK apartments, opulent bungalows, fine dining avenues, and proximity to Gujarat Science City.",
    avgPriceSqFt: "₹ 6,500 - ₹ 8,500",
    priceGrowth5Yr: "+41.2%",
    rentalYield: "4.5% p.a.",
    walkScore: 88,
    safetyScore: 94,
    metroDistance: "1.2 km (Science City Metro Link)",
    hospitalDistance: "0.8 km (CIMS Hospital)",
    schoolDistance: "1.0 km (HB Kapadia School)",
    waterQuality: "AMC Supply + Softener Systems",
    trafficRating: "Smooth (SG Highway Flyover Network)",
    investmentScore: 91,
    nearbySchools: ["H B Kapadia New High School", "Sal Educational Campus"],
    nearbyHospitals: ["CIMS Hospital (Marengo CIMS)", "Shalby Hospital Science City"],
    upcomingInfrastructure: ["Science City Phase 3 Robotic Gallery", "SG Highway Underpass Link"],
    topProjects: ["Shreeya Amaranta", "Sun Westbank", "Arvind Uplands"],
    faqs: [
      { q: "What property types dominate Science City Road?", a: "Mainly 3 BHK & 4 BHK luxury apartments, penthouses, and gated villa communities." }
    ]
  },
  "sindhu-bhavan-road": {
    slug: "sindhu-bhavan-road",
    name: "Sindhu Bhavan Road (SBR)",
    city: "Ahmedabad",
    tagline: "Ahmedabad's Billionaire Mile & Retail Epicenter",
    overview: "Sindhu Bhavan Road features ultra-luxury commercial showrooms, 5-star hotels (Taj Skyline), corporate headquarters, and high-end residential penthouses.",
    avgPriceSqFt: "₹ 9,500 - ₹ 14,000",
    priceGrowth5Yr: "+48.0%",
    rentalYield: "5.1% p.a.",
    walkScore: 90,
    safetyScore: 96,
    metroDistance: "2.5 km (Thaltej Metro Station)",
    hospitalDistance: "1.0 km (Zydus Hospital)",
    schoolDistance: "1.2 km (Udgam School for Children)",
    waterQuality: "AMC Municipal Water",
    trafficRating: "Vibrant Commercial Corridor",
    investmentScore: 96,
    nearbySchools: ["Udgam School for Children", "Anand Niketan Bodakdev"],
    nearbyHospitals: ["Zydus Hospital", "Sterling Hospital"],
    upcomingInfrastructure: ["SBR Multi-Level Automated Parking", "Pedestrian Boulevard Transformation"],
    topProjects: ["Shivalik Shilp 2", "BSafal Synthesis", "Sharanya Skyvue"],
    faqs: [
      { q: "Is Sindhu Bhavan Road ideal for commercial investment?", a: "Yes, SBR commands highest commercial footfall and rental growth in Gujarat." }
    ]
  }
};
