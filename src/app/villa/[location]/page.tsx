import React from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo";
import { MapPin, ShieldCheck, CheckCircle2, ChevronRight, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VillaLocationPageProps {
  params: Promise<{ location: string }>;
}

export async function generateMetadata({ params }: VillaLocationPageProps) {
  const { location } = await params;
  const formattedLoc = location.replace("-", " ");
  const capitalized = formattedLoc.charAt(0).toUpperCase() + formattedLoc.slice(1);

  return {
    title: `Luxury Villas & Independent Houses for Sale in ${capitalized} | AddressBox Zero Brokerage`,
    description: `Browse 4 BHK & 5 BHK luxury villas, gated community bungalows, and farmhouses in ${capitalized} with private gardens and zero brokerage.`
  };
}

export default async function VillaLocationPage({ params }: VillaLocationPageProps) {
  const { location } = await params;
  const formattedLoc = location.toLowerCase().replace("-", " ");
  const capitalized = formattedLoc.charAt(0).toUpperCase() + formattedLoc.slice(1);

  const villas = initialProperties.slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: "https://addressbox.in" },
    { name: "Luxury Villas", url: "https://addressbox.in/buy?category=villa" },
    { name: capitalized, url: `https://addressbox.in/villa/${location}` }
  ];

  const faqs = [
    { q: `What is the price range of luxury villas in ${capitalized}?`, a: `Independent villas and gated bungalows in ${capitalized} start from ₹ 2.25 Crores up to ₹ 7.50 Crores depending on plot size and private pool amenities.` }
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
          <Link href="/buy?category=villa" className="hover:text-orange-400">Villas</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400 font-bold">{capitalized}</span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">Luxury Villas & Bungalows in {capitalized}</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Exclusive 4 BHK & 5 BHK gated community villas with private pools and landscaped gardens</p>
          </div>
          <Link href={`/search?category=villa&query=${encodeURIComponent(capitalized)}`}>
            <Button variant="primary" className="bg-amber-500 hover:bg-amber-600 font-bold text-xs px-5 py-3 rounded-xl border-none text-slate-950">
              <span>Explore Villa Listings</span>
            </Button>
          </Link>
        </div>

        {/* Villas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {villas.map(v => (
            <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 hover:border-amber-500/40 transition group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">Gated Villa</span>
                <span className="text-xs font-black text-amber-400">{v.price}</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">{v.title}</h3>
              <p className="text-xs text-slate-400 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-slate-500 mr-1" />
                <span>{v.locality}, {v.city}</span>
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Plot: 4,500 sq.ft</span>
                <Link href={`/property/${v.id}`} className="text-amber-400 font-extrabold hover:underline">View Villa Details →</Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
