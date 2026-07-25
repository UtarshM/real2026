import React from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo";
import { MapPin, Building2, CheckCircle2, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RentCityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: RentCityPageProps) {
  const { city } = await params;
  const capitalized = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Flats & House for Rent in ${capitalized} | AddressBox Zero Brokerage`,
    description: `Browse 1 BHK, 2 BHK, 3 BHK flats and houses for rent in ${capitalized}. Zero brokerage rentals, owner listings, and verified tenant agreements.`
  };
}

export default async function RentCityPage({ params }: RentCityPageProps) {
  const { city } = await params;
  const capitalized = city.charAt(0).toUpperCase() + city.slice(1);

  const displayListings = initialProperties;

  const breadcrumbs = [
    { name: "Home", url: "https://addressbox.in" },
    { name: "Rent Properties", url: "https://addressbox.in/rent" },
    { name: capitalized, url: `https://addressbox.in/rent/${city}` }
  ];

  const faqs = [
    { q: `What is the average monthly rent for 2 BHK flats in ${capitalized}?`, a: `Monthly rentals range between ₹ 18,000 to ₹ 35,000 depending on furnishing status and locality.` }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFaqSchema(faqs);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-orange-400">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/rent" className="hover:text-orange-400">Rent</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400 font-bold">{capitalized}</span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-blue-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">Flats & Apartments for Rent in {capitalized}</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Zero brokerage rentals directly from verified owners & property managers</p>
          </div>
          <Link href={`/rent?city=${encodeURIComponent(capitalized)}`}>
            <Button variant="primary" className="bg-blue-600 hover:bg-blue-500 font-bold text-xs px-5 py-3 rounded-xl border-none">
              <span>Filter Rental Listings</span>
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayListings.map(p => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 hover:border-blue-500/40 transition group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-extrabold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full">Zero Brokerage Rent</span>
                <span className="text-xs font-black text-emerald-400">₹ 35,000 / mo</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">{p.title}</h3>
              <p className="text-xs text-slate-400 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-slate-500 mr-1" />
                <span>{p.locality}, {p.city}</span>
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Fully Furnished</span>
                <Link href={`/property/${p.id}`} className="text-blue-400 font-extrabold hover:underline">View Rental Details →</Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
