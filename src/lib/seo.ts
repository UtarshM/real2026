import { siteConfig } from "@/config/siteConfig";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "image": `${siteConfig.url}/og-image.jpg`,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "priceRange": "₹₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.street,
      "addressLocality": siteConfig.address.locality,
      "addressRegion": siteConfig.address.state,
      "postalCode": siteConfig.address.zipCode,
      "addressCountry": siteConfig.address.country
    },
    "sameAs": [
      siteConfig.social.youtube,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Ahmedabad" },
      { "@type": "AdministrativeArea", "name": "Gandhinagar" }
    ]
  };
}

export function getRealEstateSchema(property: {
  id: string | number;
  name: string;
  price: number;
  locality: string;
  city: string;
  description: string;
  images: string[];
  developer: string;
  videoUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "name": property.name,
    "description": property.description,
    "url": `${siteConfig.url}/property/${property.id}`,
    "image": property.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.locality,
      "addressRegion": "Gujarat",
      "addressCountry": "IN",
      "addressLocalityCity": property.city
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": property.price,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": siteConfig.name,
        "telephone": siteConfig.contact.phone,
        "email": siteConfig.contact.email
      }
    }
  };
}

export function getFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`
    }))
  };
}

export function getVideoObjectSchema(video: {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": [video.thumbnailUrl],
    "uploadDate": video.uploadDate,
    "contentUrl": video.contentUrl
  };
}
