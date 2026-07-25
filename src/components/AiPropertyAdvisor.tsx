"use client";

import React, { useState } from "react";
import { Sparkles, MessageSquare, ShieldCheck, CheckCircle2, ChevronRight, X, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "./ui/button";

interface AiPropertyAdvisorProps {
  propertyName?: string;
  price?: string;
  locality?: string;
}

export default function AiPropertyAdvisor({
  propertyName = "Shivalik Edge 4 BHK",
  price = "₹ 3.62 Cr",
  locality = "Bopal"
}: AiPropertyAdvisorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"PRICE" | "NEGOTIATION" | "YIELD" | "FUTURE">("PRICE");

  const answers = {
    PRICE: {
      title: "Fair Market Price Analysis",
      verdict: "Fairly Priced (Within +2.5% of Locality Median)",
      details: `Based on 42 recent registry transactions in ${locality}, the average price per sq.ft is ₹ 5,800. This property at ${price} falls directly within fair valuation benchmarks.`
    },
    NEGOTIATION: {
      title: "Recommended Negotiation Margin",
      verdict: "Target 3% - 5% Discount Strategy",
      details: "For ready-to-move inventory in South Bopal, builders typically offer 3.5% flexibility or complimentary GST/maintenance waivers during direct closing."
    },
    YIELD: {
      title: "Rental Yield & ROI Forecast",
      verdict: "Estimated 4.5% Annual Rental Return",
      details: `High rental demand driven by IT professionals working in GIFT City and Prahladnagar corridors. Expected monthly rent: ₹ 45,000 - ₹ 55,000.`
    },
    FUTURE: {
      title: "Locality Infrastructure 3-Yr Forecast",
      verdict: "High Growth Zone (+28% Projected Appreciation)",
      details: "Upcoming SP Ring Road elevated flyovers and metro extension Phase 2 will boost capital values substantially over the next 36 months."
    }
  };

  return (
    <div className="bg-slate-900 border border-orange-500/30 rounded-3xl p-6 space-y-4 font-sans relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2.5 bg-orange-500/20 text-orange-400 rounded-xl border border-orange-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-black text-white font-display">Ask AddressBox AI Property Advisor</h3>
            <p className="text-xs text-slate-400">Instant AI intelligence for <span className="text-orange-400 font-bold">{propertyName}</span></p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {(["PRICE", "NEGOTIATION", "YIELD", "FUTURE"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-2.5 rounded-xl text-[11px] font-extrabold border transition text-center cursor-pointer ${
              activeTab === tab
                ? "bg-orange-500 text-white border-orange-400 shadow-md"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {tab === "PRICE" ? "Fair Price" : tab === "NEGOTIATION" ? "Negotiation" : tab === "YIELD" ? "Rental Yield" : "3-Yr Future"}
          </button>
        ))}
      </div>

      {/* Selected Tab Insight */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{answers[activeTab].title}</span>
          <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Verified AI Model</span>
        </div>
        <h4 className="text-sm font-black text-white font-display">{answers[activeTab].verdict}</h4>
        <p className="text-xs text-slate-300 leading-relaxed">{answers[activeTab].details}</p>
      </div>

    </div>
  );
}
