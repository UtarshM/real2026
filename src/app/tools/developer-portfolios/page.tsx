"use client";

import React from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Building, ShieldCheck } from "lucide-react";

export default function DeveloperPortfoliosPage() {
  const builders = [
    { name: "Shivalik Group", projects: "14 Delivered | 4 Ongoing", rating: "4.9 ★", rera: "GUJRERA A Grade" },
    { name: "Shilp Group", projects: "22 Delivered | 6 Ongoing", rating: "4.8 ★", rera: "GUJRERA A Grade" },
    { name: "Venus Infrastructure", projects: "18 Delivered | 3 Ongoing", rating: "4.9 ★", rera: "GUJRERA A Grade" }
  ];

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <h3 className="text-sm font-black uppercase text-slate-700 dark:text-slate-300">Top Tier-1 Gujarat Builders Directory</h3>
      <div className="space-y-3">
        {builders.map((b, i) => (
          <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-center text-xs">
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm">{b.name}</h4>
              <p className="text-slate-500 font-bold">{b.projects}</p>
            </div>
            <div className="text-right">
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black px-2.5 py-1 rounded-full">{b.rera}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      toolSlug="developer-portfolios"
      title="Gujarat Builder Portfolios & Track Records"
      categoryTag="Developer Directory"
      introParagraph="Browse RERA-verified project portfolios, past delivery history, and track records of top real estate developers in Ahmedabad and Gandhinagar."
      calculatorComponent={calculatorUI}
      promoTitle="View RERA Checker"
      promoDesc="Verify developer registration credentials."
      promoButtonText="Verify RERA Number"
      promoHref="/tools/rera-gujarat-checker"
    />
  );
}
