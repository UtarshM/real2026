import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { seoPagesData } from "@/data/seo-pages";
import { LOCALITIES_DATA } from "@/data/localities";
import masterLocalities from "@/data/master-localities.json";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: "HTML Sitemap | Localities & Property Directories - AddressBox",
  description: "Browse the complete directory of real estate listings, flats for sale, rental properties, commercial spaces, plots, and 600+ localities across Ahmedabad & Gandhinagar.",
  keywords: "HTML sitemap, Ahmedabad real estate directory, Gandhinagar flats sitemap, property listings directory, 600 localities ahmedabad",
  alternates: {
    canonical: "https://addressbox.in/sitemap/html",
  },
};

export default function HtmlSitemapHubPage() {
  const categories = [
    {
      title: "Flats for Sale in Ahmedabad Localities",
      slug: "flats-for-sale-in-ahmedabad",
      description: "2 BHK, 3 BHK, and 4 BHK RERA-verified apartments for sale across top micro-markets in Ahmedabad.",
      count: masterLocalities.filter(p => p.city === "Ahmedabad").length,
      icon: "🏢",
    },
    {
      title: "Properties for Rent in Ahmedabad",
      slug: "property-for-rent-in-ahmedabad",
      description: "Furnished & semi-furnished flats, houses, and commercial spaces for rent with zero brokerage.",
      count: masterLocalities.filter(p => p.city === "Ahmedabad").length,
      icon: "🔑",
    },
    {
      title: "Commercial Spaces & Offices in Ahmedabad",
      slug: "commercial-property-in-ahmedabad",
      description: "High-street retail showrooms, corporate office spaces, and IT parks on SG Highway & SBR.",
      count: 50,
      icon: "💼",
    },
    {
      title: "Residential Plots & Land in Ahmedabad",
      slug: "plots-for-sale-in-ahmedabad",
      description: "NA approved residential plots, villa land, and agricultural land near SP Ring Road & Bopal.",
      count: 40,
      icon: "📐",
    },
    {
      title: "GIFT City & Gandhinagar Properties",
      slug: "property-in-gandhinagar",
      description: "SEZ commercial towers, luxury high-rises, and executive flats in GIFT City & Sargasan.",
      count: masterLocalities.filter(p => p.city === "Gandhinagar").length,
      icon: "🏙️",
    },
    {
      title: "PG & Co-Living Spaces",
      slug: "pg-in-ahmedabad",
      description: "Student & working professional PGs near Nirma University, Navrangpura, and SG Highway IT hubs.",
      count: 35,
      icon: "🛏️",
    },
  ];

  const groupedByLocality = Object.values(LOCALITIES_DATA);
  const masterLocList = masterLocalities as Array<{ name: string; slug: string; city: string }>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <JsonLdSchema type="Breadcrumb" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        
        {/* Header Banner */}
        <div className="text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <nav className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">HTML Sitemap Hub</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Complete Real Estate HTML Sitemap & Locality Index ({masterLocList.length} Localities)
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed font-medium">
            Explore over 30,000+ hyper-local property search pages, RERA-verified project directories, and micro-market guides across 629 master localities in Ahmedabad and Gandhinagar.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/sitemap/html/${cat.slug}`}
              className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-orange-500 hover:shadow-lg transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-500/30">
                    {cat.count}+ Localities
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition mb-2">
                  {cat.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {cat.description}
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-extrabold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                Explore Directory &rarr;
              </div>
            </Link>
          ))}
        </div>

        {/* Prime Micro-Market Hubs */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-orange-500 pl-3 font-display">
            Prime Micro-Market Hubs (Ahmedabad & Gandhinagar)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {groupedByLocality.map((loc) => (
              <div key={loc.slug} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:border-slate-300 dark:hover:border-slate-700">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">{loc.name} ({loc.city})</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">{loc.avgPriceSqFt}</p>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <Link
                    href={`/locality/${loc.slug}`}
                    className="text-orange-600 dark:text-orange-400 hover:underline font-bold"
                  >
                    Locality Guide
                  </Link>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <Link
                    href={`/property-search/properties-for-sale-in-${loc.slug}-${loc.city.toLowerCase()}`}
                    className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold"
                  >
                    Flats for Sale
                  </Link>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <Link
                    href={`/property-search/properties-for-rent-in-${loc.slug}-${loc.city.toLowerCase()}`}
                    className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold"
                  >
                    Rent
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Master Directory of 629 Localities */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              All {masterLocList.length} Master Localities Directory (Ahmedabad & Gandhinagar)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Direct links to search pages for every master locality in the inventory
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2">
            {masterLocList.map((loc, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white block">{loc.name} ({loc.city})</span>
                <div className="flex gap-2 text-[10px] text-orange-600 dark:text-orange-400 font-bold">
                  <Link href={`/property-search/properties-for-sale-in-${loc.slug}-${loc.city.toLowerCase()}`} className="hover:underline">
                    Buy
                  </Link>
                  <span>•</span>
                  <Link href={`/property-search/properties-for-rent-in-${loc.slug}-${loc.city.toLowerCase()}`} className="hover:underline">
                    Rent
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
