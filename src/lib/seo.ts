export function generatePropertySchema(property: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "name": property.title || property.name,
    "description": property.description || `${property.title || property.name} located in ${property.locality}, ${property.city}`,
    "url": `https://addressbox.in/property/${property.id}`,
    "image": property.images || ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.locality,
      "addressRegion": property.city,
      "addressCountry": "IN"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": property.price || property.priceString,
      "availability": "https://schema.org/InStock"
    }
  };
}

export function getRealEstateSchema(property: any) {
  return generatePropertySchema(property);
}

export function getVideoObjectSchema(video: any) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video?.title || "Property Virtual Tour",
    "description": video?.description || "3D Virtual Tour Walkthrough",
    "thumbnailUrl": video?.thumbnailUrl || ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    "uploadDate": "2026-01-01"
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return generateBreadcrumbSchema(items);
}

export function generateFaqSchema(faqs: { q?: string; a?: string; question?: string; answer?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q || faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a || faq.answer
      }
    }))
  };
}

export function getFaqSchema(faqs: any[]) {
  return generateFaqSchema(faqs);
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "AddressBox Real Estate",
    "image": "https://addressbox.in/logo.png",
    "url": "https://addressbox.in",
    "telephone": "+91 98765 43210",
    "priceRange": "₹30 Lakhs - ₹10 Crores"
  };
}

export function getOrganizationSchema() {
  return generateLocalBusinessSchema();
}
