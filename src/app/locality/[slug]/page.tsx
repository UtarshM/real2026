import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALITY_INTELLIGENCE } from "@/data/locality_intelligence";
import { initialProperties } from "@/data/properties";
import { generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { MapPin, Star, ShieldCheck, TrendingUp, School, Hospital, Train, Car, Droplets, CheckCircle2, ChevronRight, Calculator, Sparkles, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocalityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocalityPageProps) {
  const { slug } = await params;
  const locality = LOCALITY_INTELLIGENCE[slug];
  if (!locality) return { title: "Locality Not Found" };

  return {
    title: `${locality.name} Real Estate Guide, Price Trends & Properties | AddressBox`,
    description: `Explore ${locality.name} in ${locality.city}. Check price per sq.ft (${locality.avgPriceSqFt}), 5-year growth (${locality.priceGrowth5Yr}), walk score, nearby schools, hospitals & top projects.`
  };
}

export default async function LocalityPage({ params }: LocalityPageProps) {
  const { slug } = await params;
  const locality = LOCALITY_INTELLIGENCE[slug];

  if (!locality) {
    notFound();
  }

  const matchingProperties = initialProperties.filter(p => 
    p.locality.toLowerCase().includes(slug.replace("-", " ")) || 
    slug.replace("-", " ").includes(p.locality.toLowerCase())
  );

  const breadcrumbs = [
    { name: "Home", url: "https://addressbox.in" },
    { name: locality.city, url: `https://addressbox.in/search?city=${locality.city}` },
    { name: locality.name, url: `https://addressbox.in/locality/${locality.slug}` }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFaqSchema(locality.faqs);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-orange-950/60 via-slate-900 to-slate-950 border-b border-orange-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-orange-400">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <Link href={`/search?city=${locality.city}`} className="hover:text-orange-400">{locality.city}</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-orange-400 font-bold">{locality.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Locality Intelligence & Market Insights</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-display">{locality.name}</h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">{locality.tagline}</p>
            </div>

            {/* Quick Metrics Badge Group */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Price / Sq.Ft</span>
                <span className="text-sm font-black text-orange-400">{locality.avgPriceSqFt}</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">5-Yr Growth</span>
                <span className="text-sm font-black text-emerald-400">{locality.priceGrowth5Yr}</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Rental Yield</span>
                <span className="text-sm font-black text-blue-400">{locality.rentalYield}</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Walk Score</span>
                <span className="text-sm font-black text-amber-400">{locality.walkScore} / 100</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Locality Overview & Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white font-display flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <span>About {locality.name}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{locality.overview}</p>
            </div>

            {/* Infrastructure Ratings */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-extrabold text-white font-display">Livability & Infrastructure Scores</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-850">
                  <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Metro Connectivity</span>
                    <span className="text-xs text-white font-black">{locality.metroDistance}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-850">
                  <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl">
                    <Hospital className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Nearest Hospital</span>
                    <span className="text-xs text-white font-black">{locality.hospitalDistance}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-850">
                  <div className="p-2.5 bg-amber-600/20 text-amber-400 rounded-xl">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Nearest Schools</span>
                    <span className="text-xs text-white font-black">{locality.schoolDistance}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-850">
                  <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Water & Utility</span>
                    <span className="text-xs text-white font-black">{locality.waterQuality}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Projects */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-3">
              <h3 className="text-lg font-extrabold text-white font-display">Upcoming Infrastructure Growth</h3>
              <ul className="space-y-2">
                {locality.upcomingInfrastructure.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-850">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar: Locality CTA & Top Projects */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-orange-600/20 via-slate-900 to-slate-900 border border-orange-500/30 rounded-3xl p-6 space-y-4">
              <span className="text-xs uppercase font-extrabold text-orange-400 tracking-wider">Investment Rating</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-white font-display">Score {locality.investmentScore} / 100</span>
                <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>
              <p className="text-xs text-slate-300">High appreciation probability backed by infrastructure expansions and corporate migration.</p>
              <Link href={`/search?query=${encodeURIComponent(locality.name)}`} className="block">
                <Button variant="primary" className="w-full justify-center bg-orange-500 hover:bg-orange-600 font-bold text-xs uppercase tracking-wider text-white border-none py-3">
                  Browse {locality.name} Properties
                </Button>
              </Link>
            </div>

            {/* Top Projects */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top RERA Projects</h4>
              <div className="space-y-2">
                {locality.topProjects.map((proj, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center text-xs font-bold text-white">
                    <span>{proj}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Verified</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* FAQs */}
        {locality.faqs.length > 0 && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white font-display">Frequently Asked Questions — {locality.name}</h3>
            <div className="space-y-3">
              {locality.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-orange-400">{faq.q}</h4>
                  <p className="text-xs text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
