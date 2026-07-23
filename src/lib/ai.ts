/**
 * Heuristic AI Engine for AddressBox Property Marketplace
 */

const LOCALITY_MULTIPLIERS: Record<string, number> = {
  "gift city": 9200,
  "prahladnagar": 11500,
  "science city": 8800,
  "sindhu bhavan road": 13000,
  "bopal": 6800,
  "shela": 6500,
  "gota": 5800,
  "sargasan": 5200,
  "kudasan": 4900,
  "raysan": 5550,
  "koba": 5400,
};

const DEFAULT_MULTIPLIER = 6000;

export function generateAiDescription(bhk: string, area: string, subType: string, locality: string): string {
  const loc = locality || "prime sector";
  const b = bhk ? `${bhk} BHK` : "Spacious";
  
  return `Luxury ${b} ${subType.toLowerCase()} offering premium modern architecture features situated at the heart of ${loc}. Boasting an expansive carpet size of ${area} sq ft, this exquisite property has been meticulously designed to maximize natural lighting, cross-ventilation, and privacy. Includes premium bathroom fixtures, modern modular kitchen layout, and overlooks curated gardens. Excellent transport proximity connect directly with major corporate hubs and educational institutes. Ideal for professionals and families seeking a premium address with zero brokerage fees.`;
}

export function generateAiTitle(bhk: string, subType: string, developer: string, locality: string): string {
  const b = bhk ? `${bhk} BHK ` : "";
  const dev = developer && developer !== "Owner Listed" ? ` by ${developer}` : "";
  const loc = locality ? ` in ${locality}` : "";
  return `Verified Premium ${b}${subType}${dev}${loc}`;
}

export function estimatePrice(locality: string, sqft: number, bhk: number, amenitiesCount: number): { min: number; max: number; average: number } {
  const locKey = locality.toLowerCase().trim();
  const multiplier = LOCALITY_MULTIPLIERS[locKey] || DEFAULT_MULTIPLIER;
  
  let basePrice = sqft * multiplier;
  
  // Amenities premium adjustment
  basePrice += amenitiesCount * 150000;
  
  // BHK size premium adjustment
  if (bhk >= 4) basePrice *= 1.15;
  else if (bhk === 3) basePrice *= 1.08;

  const min = Math.round(basePrice * 0.95);
  const max = Math.round(basePrice * 1.05);
  const average = Math.round(basePrice);

  return { min, max, average };
}

export function checkDuplicateListing(name: string, locality: string, price: number): { isDuplicate: boolean; spamScore: number; reason: string } {
  const existingListings = [
    { name: "shaligram 3 bhk apartment", locality: "bopal", price: 8500000 },
    { name: "sun sky villas 4 bhk", locality: "gota", price: 18000000 }
  ];

  const searchName = name.toLowerCase();
  const searchLoc = locality.toLowerCase();

  for (const list of existingListings) {
    const nameSimilarity = searchName.includes(list.name) || list.name.includes(searchName);
    const locMatch = searchLoc.includes(list.locality) || list.locality.includes(searchLoc);
    const priceMatch = Math.abs(price - list.price) / list.price < 0.05; // 5% range check

    if (nameSimilarity && locMatch && priceMatch) {
      return {
        isDuplicate: true,
        spamScore: 98,
        reason: "Matches active verified property listing parameters with high correlation."
      };
    }
  }

  return {
    isDuplicate: false,
    spamScore: 4,
    reason: "Heuristic listing parameters are unique."
  };
}

export interface ParsedAiQuery {
  bhk?: string;
  purpose: "BUY" | "RENT";
  type: "RESIDENTIAL" | "COMMERCIAL" | "PLOT";
  locality?: string;
  city: string;
  maxPrice?: number;
  keyword?: string;
}

export function parseNaturalLanguageSearch(query: string): ParsedAiQuery {
  const lower = query.toLowerCase();

  let purpose: "BUY" | "RENT" = "BUY";
  if (lower.includes("rent") || lower.includes("lease") || lower.includes("pg")) {
    purpose = "RENT";
  }

  let type: "RESIDENTIAL" | "COMMERCIAL" | "PLOT" = "RESIDENTIAL";
  if (lower.includes("office") || lower.includes("shop") || lower.includes("commercial") || lower.includes("warehouse")) {
    type = "COMMERCIAL";
  } else if (lower.includes("plot") || lower.includes("land")) {
    type = "PLOT";
  }

  let bhk: string | undefined = undefined;
  const bhkMatch = lower.match(/(\d)\s*bhk/);
  if (bhkMatch) {
    bhk = bhkMatch[1];
  }

  let city = "Ahmedabad";
  if (lower.includes("gandhinagar") || lower.includes("gift city") || lower.includes("sargasan") || lower.includes("kudasan")) {
    city = "Gandhinagar";
  }

  let locality: string | undefined = undefined;
  const localities = ["bopal", "gota", "prahladnagar", "science city", "sindhu bhavan", "shela", "sargasan", "gift city", "kudasan", "memnagar"];
  for (const loc of localities) {
    if (lower.includes(loc)) {
      locality = loc.charAt(0).toUpperCase() + loc.slice(1);
      break;
    }
  }

  let maxPrice: number | undefined = undefined;
  const lakhMatch = lower.match(/(?:under|below|max)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|l)/);
  const crMatch = lower.match(/(?:under|below|max)?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)/);
  if (crMatch) {
    maxPrice = parseFloat(crMatch[1]) * 10000000;
  } else if (lakhMatch) {
    maxPrice = parseFloat(lakhMatch[1]) * 100000;
  }

  return {
    bhk,
    purpose,
    type,
    locality,
    city,
    maxPrice,
    keyword: query
  };
}

export function getSmartRecommendations<T extends { id: number; locality?: string; bhk?: number; price?: number }>(
  currentProperty: T,
  allProperties: T[]
): T[] {
  return allProperties
    .filter(p => p.id !== currentProperty.id)
    .map(p => {
      let score = 0;
      if (p.locality && currentProperty.locality && p.locality.toLowerCase() === currentProperty.locality.toLowerCase()) {
        score += 5;
      }
      if (p.bhk && currentProperty.bhk && p.bhk === currentProperty.bhk) {
        score += 3;
      }
      if (p.price && currentProperty.price) {
        const diff = Math.abs(p.price - currentProperty.price) / currentProperty.price;
        if (diff < 0.25) score += 4;
      }
      return { property: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.property);
}
