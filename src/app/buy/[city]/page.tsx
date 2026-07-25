import React from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo";
import { MapPin, Building2, CheckCircle2, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuyCityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: BuyCityPageProps) {
  const { city } = await params;
  const capitalized = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Properties for Sale in ${capitalized} | AddressBox Zero Brokerage Portal`,
    description: `Find 100% RERA verified flats, villas, plots, and commercial offices for sale in ${capitalized} with zero brokerage and 3D virtual tours.`
  };
}

export default async function BuyCityPage({ params }: BuyCityPageProps) {
  const { city } = await params;
  const capitalized = city.charAt(0).toUpperCase() + city.slice(1);

  const filtered = initialProperties.filter(p => p.city.toLowerCase() === city.toLowerCase() || p.city.toLowerCase().includes(city.toLowerCase()));
  const displayListings = filtered.length > 0 ? filtered : initialProperties;

  const breadcrumbs = [
    { name: "Home", url: "https://addressbox.in" },
    { name: "Buy Properties", url: "https://addressbox.in/buy" },
    { name: capitalized, url: `https://addressbox.in/buy/${city}` }
  ];

  const faqs = [
    { q: `What are the top residential areas to buy property in ${capitalized}?`, a: `Top localities in ${capitalized} include Bopal, GIFT City, Science City, Sindhu Bhavan Road, and Sargasan.` }
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
          <Link href="/buy" className="hover:text-orange-400">Buy</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400 font-bold">{capitalized}</span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-950 border border-orange-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">Properties & Apartments for Sale in {capitalized}</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">100% RERA Verified listings with zero brokerage fees directly from owners & developers</p>
          </div>
          <Link href={`/search?city=${encodeURIComponent(capitalized)}`}>
            <Button variant="primary" className="bg-orange-500 hover:bg-orange-600 font-bold text-xs px-5 py-3 rounded-xl border-none">
              <Filter className="w-4 h-4 mr-2" />
              <span>Refine Filters</span>
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayListings.map(p => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 hover:border-orange-500/40 transition group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-extrabold uppercase bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full">Verified Sale</span>
                <span className="text-xs font-black text-emerald-400">{p.price}</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition">{p.title}</h3>
              <p className="text-xs text-slate-400 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-slate-500 mr-1" />
                <span>{p.locality}, {p.city}</span>
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">{p.bhk} BHK • {p.area}</span>
                <Link href={`/property/${p.id}`} className="text-orange-400 font-extrabold hover:underline">View Listing →</Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
