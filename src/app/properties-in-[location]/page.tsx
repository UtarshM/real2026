import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { initialProperties } from "@/data/properties";
import { LOCALITIES_DATA } from "@/data/localities";
import { siteConfig } from "@/config/siteConfig";
import { getFaqSchema, getBreadcrumbSchema } from "@/lib/seo";
import { MapPin, Info, ArrowLeft, ShieldCheck, CheckCircle2, Building2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeoPageProps {
  params: Promise<{ location: string }>;
}

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locationSlug = resolvedParams?.location || "";
  const locality = LOCALITIES_DATA[locationSlug];
  
  const formattedName = locality 
    ? locality.name 
    : locationSlug.charAt(0).toUpperCase() + locationSlug.slice(1).replace("-", " ");

  return {
    title: `Properties in ${formattedName} | Buy & Rent Flats | ${siteConfig.name}`,
    description: locality 
      ? `Explore 100% RERA verified flats, commercial spaces, and villas in ${formattedName}, ${locality.city}. ${locality.agentSiteNotes}`
      : `Explore verified flats and commercial properties in ${formattedName} with zero brokerage and video walkthroughs from ${siteConfig.name}.`,
    alternates: {
      canonical: `${siteConfig.url}/properties-in-${locationSlug}`,
    },
    openGraph: {
      title: `Properties in ${formattedName} | ${siteConfig.name}`,
      description: `Browse verified listings in ${formattedName} with zero brokerage terms.`,
      url: `${siteConfig.url}/properties-in-${locationSlug}`,
    }
  };
}

export default async function SeoLocationPage({ params }: SeoPageProps) {
  const resolvedParams = await params;
  const locationSlug = resolvedParams?.location || "";
  const localityInfo = LOCALITIES_DATA[locationSlug];

  const formatLocationName = (slug: string) => {
    if (localityInfo) return localityInfo.name;
    if (!slug) return "Ahmedabad & Gandhinagar";
    if (slug.toLowerCase() === "gift-city") return "GIFT City";
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
  };

  const localityName = formatLocationName(locationSlug);
  const filteredProperties = locationSlug ? initialProperties.filter(
    p => p.locality.toLowerCase().includes(locationSlug.toLowerCase()) || 
         locationSlug.toLowerCase().includes(p.locality.toLowerCase()) ||
         p.locality.toLowerCase().replace(/\s+/g, '-') === locationSlug.toLowerCase()
  ) : [];

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(0)} Lac`;
    return `₹ ${price.toLocaleString()}`;
  };

  const faqs = localityInfo?.faqs || [
    {
      question: `Why buy property in ${localityName} through ${siteConfig.name}?`,
      answer: `${siteConfig.name} provides 100% RERA verified property listings, video walkthroughs, and zero brokerage terms in ${localityName}.`
    },
    {
      question: `Are RERA approved projects available in ${localityName}?`,
      answer: `Yes, all featured properties in ${localityName} undergo strict RERA certificate and title verification by our local team.`
    }
  ];

  const faqSchema = getFaqSchema(faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Micro-Markets", url: "/buy" },
    { name: `Properties in ${localityName}`, url: `/properties-in-${locationSlug}` }
  ]);

  return (
    <div className="bg-slate-950 min-h-screen py-12 text-white relative font-sans">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Dynamic SEO Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/30 px-3 py-1 rounded-full text-blue-400 text-xs font-extrabold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Rama Realty Micro-Market Index</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-display">
            Properties in {localityName}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Browse RERA-verified residential flats, commercial offices, and luxury bungalows in {localityName}. Personally inspected by {siteConfig.name}'s local agents with video walkthroughs and zero brokerage terms.
          </p>
        </div>

        {/* Deep Micro-Market Insight Box */}
        {localityInfo && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-800 pb-6">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">Average Price Benchmark</span>
                <span className="text-lg font-black text-blue-400">{localityInfo.avgPriceSqFt}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">Key Strategic Advantage</span>
                <span className="text-xs font-bold text-slate-200">{localityInfo.keyHighlight}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">Top RERA Projects</span>
                <span className="text-xs font-semibold text-slate-300">{localityInfo.topProjects.join(", ")}</span>
              </div>
            </div>

            {/* Agent Inspection Notes */}
            <div className="bg-slate-950/80 border border-amber-500/20 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>First-Hand Agent Inspection Note</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{localityInfo.agentSiteNotes}"
              </p>
            </div>
          </div>
        )}

        {/* Listings Display Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Active Verified Listings in {localityName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProperties.map(p => (
              <Link key={p.id} href={`/property/${p.id}`} className="block group">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group-hover:border-blue-500/50 transition duration-300 shadow-lg flex flex-col justify-between h-full">
                  
                  {/* Banner Photo */}
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"})` }}
                  >
                    <span className="absolute top-4 left-4 bg-blue-600 border border-blue-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded">
                      {p.purpose}
                    </span>
                    
                    <span className="absolute top-4 right-4 bg-emerald-500 border border-emerald-400 text-white font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded">
                      Video Walkthrough
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-base text-white group-hover:text-blue-400 transition">{p.name}</h3>
                      <p className="text-slate-400 text-xs font-semibold flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 mr-1 flex-shrink-0" />
                        <span>{p.locality}, {p.city}</span>
                      </p>
                      <div className="flex items-center space-x-3 text-[11px] font-bold text-slate-400">
                        <span>{p.bhk ? `${p.bhk} BHK` : p.subType}</span>
                        <span>•</span>
                        <span>{p.area} Sq.Ft</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-blue-400 text-base font-black">{formatPrice(p.price)}</span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">Zero Brokerage</span>
                    </div>
                  </div>

                </div>
              </Link>
            ))}

            {filteredProperties.length === 0 && (
              <div className="col-span-full text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                <Info className="w-10 h-10 text-slate-500 mx-auto" />
                <p className="text-xs sm:text-sm font-semibold text-slate-400">
                  New video-verified properties in {localityName} are being added by {siteConfig.name}'s agents.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="text-xs mt-2">Request Property Inspection in {localityName}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* AI Answer Engine / FAQ Block */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-2 text-blue-400">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Frequently Asked Questions — {localityName} Real Estate</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
