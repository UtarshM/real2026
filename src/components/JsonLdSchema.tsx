import React from "react";
import { siteConfig } from "@/config/siteConfig";

interface JsonLdSchemaProps {
  type: "Organization" | "FAQ" | "RealEstateListing" | "Breadcrumb";
  data?: any;
}

export default function JsonLdSchema({ type, data }: JsonLdSchemaProps) {
  let schemaData: any = null;

  if (type === "Organization") {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/logo.png`,
      "image": `${siteConfig.url}/og-image.jpg`,
      "description": siteConfig.description,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.street,
        "addressLocality": siteConfig.address.city,
        "addressRegion": siteConfig.address.state,
        "postalCode": siteConfig.address.zipCode,
        "addressCountry": "IN"
      },
      "areaServed": ["Ahmedabad", "Gandhinagar", "GIFT City"],
      "priceRange": "₹₹₹",
      "sameAs": [
        siteConfig.social.youtube
      ]
    };
  } else if (type === "FAQ") {
    const faqs = data || [
      {
        question: "Does AddressBox charge brokerage on property purchases in Ahmedabad?",
        answer: "No, AddressBox offers 100% zero brokerage advisory and direct developer pricing for verified residential and commercial buyers."
      },
      {
        question: "How are properties verified on AddressBox?",
        answer: "All project listings undergo 5-tier legal verification including RERA certificate verification, title deeds check, site inspections, and 3D video walkthrough audit."
      },
      {
        question: "Can I schedule a 3D virtual tour or physical site visit?",
        answer: "Yes, you can request an instant 3D virtual tour or book a complimentary site visit with a dedicated personal property manager."
      }
    ];

    schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq: { question: string; answer: string }) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  } else if (type === "Breadcrumb") {
    const items = data || [
      { name: "Home", url: siteConfig.url },
      { name: "Properties in Ahmedabad", url: `${siteConfig.url}/property-in-ahmedabad` }
    ];

    schemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item: any, idx: number) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  } else if (type === "RealEstateListing" && data) {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "SingleFamilyResidence",
      "name": data.title,
      "description": data.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": data.location || "Ahmedabad",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      },
      "offers": {
        "@type": "Offer",
        "price": data.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    };
  }

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
