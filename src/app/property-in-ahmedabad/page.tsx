import React from "react";
import Link from "next/link";
import { seoPagesData } from "@/data/seo-pages";
import { MapPin, ArrowRight, Building2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Property in Ahmedabad 2026 | Buy & Rent Residential Flats & Offices - AddressBox",
  description: "Browse verified residential flats, luxury villas, commercial offices & plots in Ahmedabad across Bopal, Science City, Gota, SG Highway, Bodakdev, and Vaishno Devi Circle."
};

export default function PropertyInAhmedabadPage() {
  const ahmedabadLocalities = seoPagesData.filter(p => p.city === "Ahmedabad");

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-600 dark:text-orange-400 text-xs font-black">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>Ahmedabad Micro-Market Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Real Estate & Properties in Ahmedabad
          </h1>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-semibold leading-relaxed max-w-4xl">
            Explore 370+ verified hyper-local real estate pages across Ahmedabad. Discover 2 BHK, 3 BHK & 4 BHK flats, villas, plots, and commercial offices with zero brokerage terms and 100% GUJRERA verification.
          </p>
        </div>

        {/* Localities Links Directory */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-xl font-black font-display text-slate-900 dark:text-white">All Ahmedabad Locality & BHK Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ahmedabadLocalities.map((item, idx) => (
              <Link
                key={idx}
                href={item.slug}
                className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-orange-500 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 transition truncate flex items-center justify-between group"
              >
                <span className="truncate pr-2">{item.h1}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
