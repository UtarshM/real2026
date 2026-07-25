"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Navigation } from "lucide-react";

export default function CommuteCalculatorPage() {
  const [origin, setOrigin] = useState("Bopal");
  const [destination, setDestination] = useState("GIFT City");

  const destinations: Record<string, number> = {
    "GIFT City": 38,
    "SVP International Airport": 22,
    "SG Highway IT Parks": 12,
    "Kalupur Railway Station": 18
  };

  const km = destinations[destination] || 20;
  const driveTime = Math.round(km * 1.8);
  const metroTime = Math.round(km * 1.2);

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block mb-1">Select Property Locality</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold">
            <option value="Bopal">Bopal</option>
            <option value="Science City">Science City</option>
            <option value="Gota">Gota</option>
            <option value="Bodakdev">Bodakdev</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block mb-1">Target Work / Transit Hub</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold">
            <option value="GIFT City">GIFT City SEZ</option>
            <option value="SVP International Airport">SVP International Airport</option>
            <option value="SG Highway IT Parks">SG Highway IT Hub</option>
            <option value="Kalupur Railway Station">Kalupur Railway Station</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-4 text-center">
        <div>
          <span className="text-[10px] font-black uppercase text-slate-500 block">Car / Taxi Commute</span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{driveTime} mins ({km} km)</span>
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-slate-500 block">Ahmedabad Metro Transit</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{metroTime} mins</span>
        </div>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "How does Metro connectivity impact travel time in Ahmedabad?",
      answer: "Phase 2 of Ahmedabad Metro directly connects APMC/Thaltej to GIFT City and Gandhinagar, reducing peak hour transit times by up to 40%."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="commute-calculator"
      title="Commute & Transit Time Calculator"
      categoryTag="Location Intelligence"
      introParagraph="Estimate driving distance and Ahmedabad Metro transit times from any residential locality to major employment centers, airports, and railway stations."
      calculatorComponent={calculatorUI}
      promoTitle="View Map Search"
      promoDesc="Plot properties on interactive geographic maps."
      promoButtonText="Open Interactive Map"
      promoHref="/map"
      faqs={faqs}
    />
  );
}
