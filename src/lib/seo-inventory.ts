import { siteConfig } from "@/config/siteConfig";
import inventoryIndexRaw from "@/data/inventory-index.json";

export interface InventoryPageData {
  slug: string;
  category: string;
  locality: string;
  city: string;
  h1: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  aeoAnswerSnippet: string;
  searchIntent: string;
  targetKeyword: string;
  secondaryKeywords: string;
  canonicalUrl: string;
}

const inventoryIndex = inventoryIndexRaw as Record<
  string,
  {
    cat: string;
    loc: string;
    city: string;
    title: string;
    desc: string;
    aeo: string;
    intent: string;
  }
>;

export function getInventoryPageBySlug(slugInput: string): InventoryPageData {
  // Normalize slug
  const cleanSlug = slugInput.replace(/^\/property-search\//, "").replace(/\/$/, "").trim();
  
  const exactMatch = inventoryIndex[cleanSlug];

  if (exactMatch) {
    const canonical = `${siteConfig.url}/property-search/${cleanSlug}`;
    const brandTitle = exactMatch.title.includes(siteConfig.name) 
      ? exactMatch.title 
      : `${exactMatch.title} | ${siteConfig.name}`;
    
    return {
      slug: cleanSlug,
      category: exactMatch.cat,
      locality: exactMatch.loc,
      city: exactMatch.city,
      h1: exactMatch.title,
      pageTitle: brandTitle,
      metaTitle: `${exactMatch.title} | Verified Listings - ${siteConfig.name}`,
      metaDescription: exactMatch.desc,
      aeoAnswerSnippet: exactMatch.aeo,
      searchIntent: exactMatch.intent || "Transactional",
      targetKeyword: exactMatch.title.toLowerCase(),
      secondaryKeywords: `${exactMatch.loc.toLowerCase()} real estate, ${exactMatch.cat.toLowerCase()} in ${exactMatch.loc.toLowerCase()}, ${exactMatch.city.toLowerCase()} properties`,
      canonicalUrl: canonical,
    };
  }

  // Algorithmic Fallback Generator if not found in exact index
  const formattedSlug = cleanSlug.replace(/-/g, " ");
  let city = "Ahmedabad";
  if (cleanSlug.includes("gandhinagar")) {
    city = "Gandhinagar";
  }

  // Extract locality if present
  const parts = cleanSlug.split("-in-");
  let locality = city;
  if (parts.length > 1) {
    const locPart = parts[1].replace("-ahmedabad", "").replace("-gandhinagar", "").replace(/-/g, " ");
    locality = locPart.charAt(0).toUpperCase() + locPart.slice(1);
  }

  const titleCase = formattedSlug
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const isRent = cleanSlug.includes("rent") || cleanSlug.includes("pg");
  const actionType = isRent ? "Rent" : "Buy";

  const metaDesc = `${actionType} ${titleCase.toLowerCase()} with ${siteConfig.name}. Compare verified listings, prices, floor plans, amenities, and photos, updated regularly.`;
  const aeo = `This page lists ${titleCase.toLowerCase()} with current ${isRent ? "rents and deposit terms" : "prices and configurations"}, updated regularly for ${isRent ? "renters" : "buyers"} comparing verified options in ${locality}, ${city}.`;

  return {
    slug: cleanSlug,
    category: isRent ? "Property for Rent" : "Property for Sale",
    locality,
    city,
    h1: titleCase,
    pageTitle: `${titleCase} | ${siteConfig.name}`,
    metaTitle: `${titleCase} | Verified Listings - ${siteConfig.name}`,
    metaDescription: metaDesc,
    aeoAnswerSnippet: aeo,
    searchIntent: `Transactional — ${actionType}`,
    targetKeyword: titleCase.toLowerCase(),
    secondaryKeywords: `${locality.toLowerCase()} real estate, properties in ${locality.toLowerCase()}`,
    canonicalUrl: `${siteConfig.url}/property-search/${cleanSlug}`,
  };
}

export function generateAeoJsonLdSchema(pageData: InventoryPageData) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What options are available for ${pageData.h1}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": pageData.aeoAnswerSnippet
            }
          },
          {
            "@type": "Question",
            "name": `Are properties listed on this ${pageData.locality} page verified?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, all residential and commercial property listings in ${pageData.locality}, ${pageData.city} on AddressBox undergo 5-tier verification including RERA compliance checks, site visits, and video walkthrough audits.`
            }
          }
        ]
      },
      {
        "@type": "SpeakableSpecification",
        "cssSelector": [".aeo-answer-snippet", ".page-h1-title"]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": pageData.city,
            "item": `${siteConfig.url}/property-in-${pageData.city.toLowerCase()}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": pageData.h1,
            "item": pageData.canonicalUrl
          }
        ]
      }
    ]
  };
}
