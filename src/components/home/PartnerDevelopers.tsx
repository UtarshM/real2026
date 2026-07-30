"use client";

import React from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";

export default function PartnerDevelopers() {
  const partnerDevelopers = [
    { name: "Shivalik Group", projects: 86 },
    { name: "Shaligram Space", projects: 42 },
    { name: "Shilp Group", projects: 65 },
    { name: "Swagat Group", projects: 38 },
    { name: "Adani Realty", projects: 95 },
    { name: "Arvind SmartSpaces", projects: 54 },
    { name: "Binori Infrastructure", projects: 29 },
    { name: "Venus Infrastructure", projects: 48 },
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-8 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
          Our Partners
        </h2>
        <span className="text-[11px] uppercase tracking-widest font-extrabold text-slate-400 block">
          Trusted by Gujarat&apos;s 100+ RERA Registered Developers
        </span>
        
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap pt-2">
          {partnerDevelopers.map((dev, idx) => (
            <Link 
              key={idx}
              href="/builders"
              className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl hover:border-[#ea580c] transition duration-300 cursor-pointer shadow-xs hover:shadow-md"
            >
              <Building2 className="w-4 h-4 text-[#ea580c]" />
              <span className="text-xs font-extrabold text-slate-800 font-display">{dev.name}</span>
              <span className="bg-slate-200 text-slate-700 text-[9px] font-black px-2 py-0.5 rounded-full">{dev.projects}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
