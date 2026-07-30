"use client";

import React from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";

export default function PartnerDevelopers() {
  const partnerDevelopers = [
    { name: "Shilp Group", category: "Commercial & Residential" },
    { name: "Samatva Group", category: "Luxury Apartments" },
    { name: "Shaligram Group", category: "High-rise Towers" },
    { name: "Dobariya Group", category: "Residential Projects" },
    { name: "Venus Infrastructure", category: "Commercial Spaces" },
    { name: "Godrej Properties", category: "Townships & Villas" },
    { name: "Adani Realty", category: "Integrated Townships" },
    { name: "Arvind SmartSpaces", category: "Gated Communities" },
    { name: "Sun Builders", category: "Premium Residences" },
  ];

  return (
    <section className="bg-slate-50 border-b border-slate-200 py-10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Our Partners
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Trusted by Gujarat&apos;s 100+ RERA Registered Developers
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 pt-2">
          {partnerDevelopers.map((dev, idx) => (
            <Link 
              key={idx}
              href={`/builders?search=${encodeURIComponent(dev.name)}`}
              className="bg-white border border-slate-200/90 rounded-2xl p-3 text-center hover:border-[#ea580c] hover:shadow-md transition duration-300 flex flex-col items-center justify-center space-y-1.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center group-hover:bg-[#ea580c] group-hover:text-white transition duration-300 shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-slate-800 group-hover:text-[#ea580c] transition font-display leading-snug">
                {dev.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
