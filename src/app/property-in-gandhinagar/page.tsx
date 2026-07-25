import React from "react";
import Link from "next/link";
import { seoPagesData } from "@/data/seo-pages";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Property in Gandhinagar 2026 | Buy & Rent Flats & Offices in GIFT City - AddressBox",
  description: "Browse verified residential flats, luxury villas, commercial offices & plots in Gandhinagar & GIFT City SEZ across Kudasan, Sargasan, Raysan, Sector 1-30 & Infocity."
};

export default function PropertyInGandhinagarPage() {
  const gandhinagarLocalities = seoPagesData.filter(p => p.city === "Gandhinagar");

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>Gandhinagar & GIFT City Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Real Estate & Properties in Gandhinagar & GIFT City
          </h1>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-semibold leading-relaxed max-w-4xl">
            Explore 150+ verified hyper-local real estate pages across Gandhinagar and GIFT City SEZ. Discover luxury apartments, corporate commercial spaces, and residential plots.
          </p>
        </div>

        {/* Localities Links Directory */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-xl font-black font-display text-slate-900 dark:text-white">All Gandhinagar & GIFT City Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {gandhinagarLocalities.map((item, idx) => (
              <Link
                key={idx}
                href={item.slug}
                className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition truncate flex items-center justify-between group"
              >
                <span className="truncate pr-2">{item.h1}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
