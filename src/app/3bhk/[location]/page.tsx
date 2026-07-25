import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialProperties } from "@/data/properties";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo";
import { MapPin, Building2, CheckCircle2, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThreeBhkLocationPageProps {
  params: Promise<{ location: string }>;
}

export async function generateMetadata({ params }: ThreeBhkLocationPageProps) {
  const { location } = await params;
  const formattedLoc = location.replace("-", " ");
  const capitalized = formattedLoc.charAt(0).toUpperCase() + formattedLoc.slice(1);

  return {
    title: `3 BHK Flats & Luxury Apartments in ${capitalized} | AddressBox Zero Brokerage`,
    description: `Find 3 BHK ready to move and under construction apartments for sale in ${capitalized}. RERA verified properties with price trends, virtual tours, and zero brokerage.`
  };
}

export default async function ThreeBhkLocationPage({ params }: ThreeBhkLocationPageProps) {
  const { location } = await params;
  const formattedLoc = location.toLowerCase().replace("-", " ");
  const capitalized = formattedLoc.charAt(0).toUpperCase() + formattedLoc.slice(1);

  const filtered = initialProperties.filter(p => 
    p.bhk === 3 || 
    p.title.toLowerCase().includes("3 bhk") || 
    p.locality.toLowerCase().includes(formattedLoc) ||
    p.city.toLowerCase().includes(formattedLoc)
  );

  const breadcrumbs = [
    { name: "Home", url: "https://addressbox.in" },
    { name: "3 BHK Properties", url: "https://addressbox.in/buy" },
    { name: capitalized, url: `https://addressbox.in/3bhk/${location}` }
  ];

  const faqs = [
    { q: `What is the average price of 3 BHK flats in ${capitalized}?`, a: `3 BHK apartments in ${capitalized} range between ₹ 65 Lakhs to ₹ 1.45 Crores depending on carpet area, amenities, and developer reputation.` },
    { q: `Are these 3 BHK properties RERA approved?`, a: `Yes, 100% of project listings on AddressBox undergo GUJRERA verification prior to publishing.` }
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
          <Link href="/buy" className="hover:text-orange-400">Buy Properties</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400 font-bold">3 BHK in {capitalized}</span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-950 border border-orange-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">3 BHK Apartments & Flats in {capitalized}</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Verified 3 BHK properties with zero brokerage fees, direct owner & builder listings</p>
          </div>
          <Link href={`/search?bhk=3&query=${encodeURIComponent(capitalized)}`}>
            <Button variant="primary" className="bg-orange-500 hover:bg-orange-600 font-bold text-xs px-5 py-3 rounded-xl border-none">
              <Filter className="w-4 h-4 mr-2" />
              <span>Refine 3 BHK Filters</span>
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 hover:border-orange-500/40 transition group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-extrabold uppercase bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full">3 BHK Luxury</span>
                <span className="text-xs font-black text-emerald-400">{p.price}</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition">{p.title}</h3>
              <p className="text-xs text-slate-400 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-slate-500 mr-1" />
                <span>{p.locality}, {p.city}</span>
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Carpet: 1,850 sq.ft</span>
                <Link href={`/property/${p.id}`} className="text-orange-400 font-extrabold hover:underline">View Property →</Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white font-display">Frequently Asked Questions — 3 BHK in {capitalized}</h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1">
                <h4 className="text-xs font-bold text-orange-400">{faq.q}</h4>
                <p className="text-xs text-slate-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
