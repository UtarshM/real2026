export interface LocalityInfo {
  slug: string;
  name: string;
  city: string;
  avgPriceSqFt: string;
  keyHighlight: string;
  connectivity: string[];
  topProjects: string[];
  agentSiteNotes: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const LOCALITIES_DATA: Record<string, LocalityInfo> = {
  "gift-city": {
    slug: "gift-city",
    name: "GIFT City",
    city: "Gandhinagar",
    avgPriceSqFt: "₹ 8,500 - ₹ 13,000 / sq ft",
    keyHighlight: "India's Premier International Financial Services Centre (IFSC) & Fintech Tech Zone",
    connectivity: ["15 min to Sardar Vallabhbhai Patel International Airport", "Direct Metro Phase-2 Line to Ahmedabad", "Connected via 8-lane Gandhinagar Highway"],
    topProjects: ["GIFT Financial Tower One", "Hiranandani Signature", "Brigade International Financial Center", "Sobha Dream Heights"],
    agentSiteNotes: "Rama Realty site inspection note: Commercial office demand in GIFT SEZ is outstripping residential supply. Commercial spaces command 8-10% rental yields, while 2-3 BHK residential units near Infocity corridor offer high long-term asset appreciation.",
    faqs: [
      {
        question: "Is GIFT City a good investment for residential properties in 2026?",
        answer: "Yes, GIFT City offers tax incentives for financial firms, driving sustained demand for corporate housing, executive rentals, and high rental yields."
      },
      {
        question: "What is the average property price in GIFT City Gandhinagar?",
        answer: "Residential properties range from ₹ 8,500 to ₹ 13,000 per sq ft depending on SEZ/Non-SEZ classification and RERA approval status."
      }
    ]
  },
  "science-city": {
    slug: "science-city",
    name: "Science City",
    city: "Ahmedabad",
    avgPriceSqFt: "₹ 7,800 - ₹ 11,500 / sq ft",
    keyHighlight: "Upscale residential hub near SG Highway with luxury 4 & 5 BHK bungalows and high-rises",
    connectivity: ["Direct access to SG Highway & SP Ring Road", "Minutes from Sola Civil Hospital & Zydus Cadila Corporate Office", "Close to Science City Metro Station"],
    topProjects: ["Science City Horizon Villa", "Shaligram Prime", "Shaival Sky", "Silver Harmony"],
    agentSiteNotes: "Rama Realty site inspection note: Science City Road has evolved into Ahmedabad's premier luxury bungalow corridor. Families prioritize East-facing 4 BHK inventory with Vastu compliance.",
    faqs: [
      {
        question: "Are luxury villas available near Science City Road Ahmedabad?",
        answer: "Yes, Science City features exclusive gated communities with 4 BHK and 5 BHK bungalows equipped with private pools and RERA approval."
      },
      {
        question: "What is the price trend in Science City Ahmedabad?",
        answer: "Property values in Science City have appreciated by 12% year-on-year due to metro connectivity and proximity to SG Highway corporate parks."
      }
    ]
  },
  "sindhu-bhavan-road": {
    slug: "sindhu-bhavan-road",
    name: "Sindhu Bhavan Road",
    city: "Ahmedabad",
    avgPriceSqFt: "₹ 11,000 - ₹ 18,000 / sq ft",
    keyHighlight: "Ahmedabad's most affluent commercial high-street and ultra-luxury residential corridor",
    connectivity: ["Connects SG Highway directly to SP Ring Road", "Walkable luxury dining, international brands & financial hubs", "20 mins to GIFT City via Ring Road"],
    topProjects: ["Sindhu Bhavan Signature Plaza", "Shilp Corporate Park", "Venus Stratum", "Taj Skyline Hub"],
    agentSiteNotes: "Rama Realty site inspection note: SBR commercial retail showrooms command high capital value. High-street footfall makes ground-floor showrooms highly sought after by national brands.",
    faqs: [
      {
        question: "Why is Sindhu Bhavan Road considered prime real estate in Ahmedabad?",
        answer: "SBR hosts Ahmedabad's top luxury brands, corporate headquarters, and high-end dining, offering top-tier asset prestige."
      }
    ]
  },
  "bopal": {
    slug: "bopal",
    name: "Bopal",
    city: "Ahmedabad",
    avgPriceSqFt: "₹ 5,800 - ₹ 8,500 / sq ft",
    keyHighlight: "Family-friendly suburban hub with top schools, hospitals, and modern high-rises",
    connectivity: ["Direct SP Ring Road access", "BRTS Bus Rapid Transit corridor", "10 mins to TRP Mall and South Bopal commercial hubs"],
    topProjects: ["Shivalik Edge", "Aarohi Crest", "Safal Parisar", "Goyal Riviera"],
    agentSiteNotes: "Rama Realty site inspection note: Bopal and South Bopal offer the optimal balance of price and family infrastructure. 3 BHK apartments between ₹ 90 Lac and ₹ 1.4 Cr are the fastest-moving segment.",
    faqs: [
      {
        question: "What is the average budget for a 3 BHK flat in Bopal Ahmedabad?",
        answer: "A RERA-approved 3 BHK flat in Bopal typically ranges between ₹ 90 Lakhs and ₹ 1.4 Crores depending on carpet area and amenities."
      }
    ]
  },
  "gota": {
    slug: "gota",
    name: "Gota",
    city: "Ahmedabad",
    avgPriceSqFt: "₹ 5,200 - ₹ 7,500 / sq ft",
    keyHighlight: "Rapidly growing residential sector on SG Highway near Vaishnodevi Circle",
    connectivity: ["On main SG Highway corridor", "Close to Nirma University & SGVP Circle", "Direct link to Chandkheda and Airport Road"],
    topProjects: ["Super Shaligram", "Vande Mataram Icon", "Goyal Intercity", "Shree Vishnudhara"],
    agentSiteNotes: "Rama Realty site inspection note: Gota offers prime value for IT professionals working along the SG Highway corridor. Ready-to-move 2 BHK and 3 BHK flats see rapid rental turnaround.",
    faqs: [
      {
        question: "Is Gota Ahmedabad good for rental income investment?",
        answer: "Yes, proximity to Nirma University, SG Highway IT parks, and metro lines guarantees high occupancy for 2 and 3 BHK flats."
      }
    ]
  },
  "sargasan": {
    slug: "sargasan",
    name: "Sargasan",
    city: "Gandhinagar",
    avgPriceSqFt: "₹ 4,800 - ₹ 7,200 / sq ft",
    keyHighlight: "Gandhinagar's fastest growing residential neighborhood for IT executives",
    connectivity: ["SG Highway Gandhinagar entry point", "5 mins from Infocity & TCS Garima Park", "Direct metro line to GIFT City"],
    topProjects: ["Sargasan Grandeur", "Swagat Flamingo", "Pramukh Elegance", "Shree Rang Sky"],
    agentSiteNotes: "Rama Realty site inspection note: Sargasan's wide 30m roads and proximity to TCS/Infocity make it the top choice for IT engineers moving to Gandhinagar.",
    faqs: [
      {
        question: "How far is Sargasan Gandhinagar from Infocity?",
        answer: "Sargasan is situated just 5 to 7 minutes from Infocity Gandhinagar along the SG Highway corridor."
      }
    ]
  }
};
