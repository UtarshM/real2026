import React from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo";
import { Building2, MapPin, CheckCircle2, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfficeSpaceLocationPageProps {
  params: Promise<{ location: string }>;
}

export async function generateMetadata({ params }: OfficeSpaceLocationPageProps) {
  const { location } = await params;
  const formattedLoc = location.replace("-", " ");
  const capitalized = formattedLoc.charAt(0).toUpperCase() + formattedLoc.slice(1);

  return {
    title: `Commercial Office Spaces for Rent & Sale in ${capitalized} | AddressBox`,
    description: `Browse Grade-A IT corporate office spaces, plug-and-play furnished offices, and bare shell commercial units in ${capitalized}.`
  };
}

export default async function OfficeSpaceLocationPage({ params }: OfficeSpaceLocationPageProps) {
  const { location } = await params;
  const formattedLoc = location.toLowerCase().replace("-", " ");
  const capitalized = formattedLoc.charAt(0).toUpperCase() + formattedLoc.slice(1);

  const displayListings = initialProperties.slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: "https://addressbox.in" },
    { name: "Commercial Offices", url: "https://addressbox.in/commercial" },
    { name: capitalized, url: `https://addressbox.in/office-space/${location}` }
  ];

  const faqs = [
    { q: `What is the average lease rate for office space in ${capitalized}?`, a: `Office leases in ${capitalized} range from ₹ 45 to ₹ 85 per sq ft monthly depending on furnishing and corporate building class.` }
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
          <Link href="/commercial" className="hover:text-orange-400">Commercial Offices</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400 font-bold">{capitalized}</span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-blue-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">Office Spaces & Corporate Towers in {capitalized}</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Plug & Play IT offices and commercial space with zero brokerage fees</p>
          </div>
          <Link href={`/commercial?query=${encodeURIComponent(capitalized)}`}>
            <Button variant="primary" className="bg-blue-600 hover:bg-blue-500 font-bold text-xs px-5 py-3 rounded-xl border-none">
              <span>View Office Spaces</span>
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayListings.map(c => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 hover:border-blue-500/40 transition group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-extrabold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full">Plug & Play Office</span>
                <span className="text-xs font-black text-blue-400">₹ 65,000 / mo</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">{c.title}</h3>
              <p className="text-xs text-slate-400 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-slate-500 mr-1" />
                <span>{capitalized}</span>
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Seats: 25 Workstations</span>
                <Link href={`/property/${c.id}`} className="text-blue-400 font-extrabold hover:underline">View Office →</Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
