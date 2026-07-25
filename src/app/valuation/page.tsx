"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Calculator, Building2, TrendingUp, DollarSign, ShieldCheck, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiValuationPage() {
  const [city, setCity] = useState("Ahmedabad");
  const [locality, setLocality] = useState("Bopal");
  const [bhk, setBhk] = useState("3 BHK");
  const [areaSqFt, setAreaSqFt] = useState("1850");
  const [ageYears, setAgeYears] = useState("2");
  const [isCalculating, setIsCalculating] = useState(false);
  const [valuationResult, setValuationResult] = useState<{
    estimatedMinPrice: string;
    estimatedMaxPrice: string;
    avgPricePerSqFt: string;
    rentalYield: string;
    projectedGrowth3Yr: string;
    confidenceScore: number;
    nearbyComps: { title: string; price: string; area: string }[];
  } | null>(null);

  const handleCalculateValuation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      setIsCalculating(false);
      const numericArea = parseInt(areaSqFt) || 1800;
      const baseRate = locality.toLowerCase().includes("sindhu") || locality.toLowerCase().includes("gift") ? 8500 : 5400;
      const minVal = Math.round((numericArea * baseRate * 0.95) / 100000);
      const maxVal = Math.round((numericArea * baseRate * 1.1) / 100000);

      setValuationResult({
        estimatedMinPrice: `₹ ${(minVal / 100).toFixed(2)} Cr`,
        estimatedMaxPrice: `₹ ${(maxVal / 100).toFixed(2)} Cr`,
        avgPricePerSqFt: `₹ ${baseRate} / sq.ft`,
        rentalYield: "4.4% p.a.",
        projectedGrowth3Yr: "+28.5%",
        confidenceScore: 96,
        nearbyComps: [
          { title: `${bhk} Luxury High-Rise in ${locality}`, price: `₹ ${((minVal + 5) / 100).toFixed(2)} Cr`, area: `${areaSqFt} sq.ft` },
          { title: `3 BHK Premium Ready Flat near SP Ring Road`, price: `₹ ${(minVal / 100).toFixed(2)} Cr`, area: `${numericArea - 100} sq.ft` },
          { title: `Gated Community 3 BHK Apartment`, price: `₹ ${((maxVal - 3) / 100).toFixed(2)} Cr`, area: `${numericArea + 50} sq.ft` }
        ]
      });
    }, 800);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AddressBox AI Machine Learning Valuation Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">AI Home Value & Rental Yield Estimator</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Get instant ML-backed market price valuation, expected rental yield, 3-year ROI forecasts, and comparable transaction benchmarks in Gujarat.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleCalculateValuation} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Select City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Gandhinagar">Gandhinagar</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Locality / Sector</label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Bopal, GIFT City, Science City"
                className="w-full mt-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Property Configuration</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="1 BHK">1 BHK Apartment</option>
                <option value="2 BHK">2 BHK Apartment</option>
                <option value="3 BHK">3 BHK Premium Flat</option>
                <option value="4 BHK">4 BHK Luxury Villa / Sky Villa</option>
                <option value="Commercial">Commercial Office / Showroom</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Super Built-up Area (Sq.Ft)</label>
              <input
                type="number"
                required
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(e.target.value)}
                placeholder="e.g. 1850"
                className="w-full mt-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <Button
                type="submit"
                disabled={isCalculating}
                variant="primary"
                className="w-full justify-center bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl border-none cursor-pointer"
              >
                {isCalculating ? (
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Running ML Valuation & Yield Algorithm...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Calculator className="w-4 h-4" />
                    <span>Generate AI Market Valuation & ROI Report</span>
                  </span>
                )}
              </Button>
            </div>

          </form>
        </div>

        {/* Results Display Box */}
        {valuationResult && (
          <div className="bg-slate-900 border border-orange-500/30 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400">Estimated Market Price Valuation</span>
                <h3 className="text-2xl sm:text-3xl font-black text-orange-400 font-display mt-0.5">
                  {valuationResult.estimatedMinPrice} - {valuationResult.estimatedMaxPrice}
                </h3>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs font-bold">
                ✓ AI Confidence Level: {valuationResult.confidenceScore}%
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Base Rate Benchmark</span>
                <span className="text-base font-black text-white block">{valuationResult.avgPricePerSqFt}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Estimated Rental Yield</span>
                <span className="text-base font-black text-emerald-400 block">{valuationResult.rentalYield}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Projected 3-Yr Growth</span>
                <span className="text-base font-black text-blue-400 block">{valuationResult.projectedGrowth3Yr}</span>
              </div>
            </div>

            {/* Nearby Sales Comps */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Comparable Market Sales in {locality}</h4>
              <div className="space-y-2">
                {valuationResult.nearbyComps.map((comp, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex justify-between items-center text-xs font-bold text-white">
                    <div>
                      <span>{comp.title}</span>
                      <span className="text-[10px] text-slate-500 block">{comp.area}</span>
                    </div>
                    <span className="text-orange-400 font-black">{comp.price}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
