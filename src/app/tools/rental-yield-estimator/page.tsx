"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";

export default function RentalYieldEstimatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(12000000); // 1.2 Cr
  const [monthlyRent, setMonthlyRent] = useState(45000);
  const [appreciationRate, setAppreciationRate] = useState(7.5);

  const annualRent = monthlyRent * 12;
  const grossYield = ((annualRent / propertyPrice) * 100).toFixed(2);
  const valueIn5Yrs = Math.round(propertyPrice * Math.pow(1 + appreciationRate / 100, 5));
  const totalReturn5Yrs = Math.round(valueIn5Yrs + annualRent * 5 - propertyPrice);

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Property Purchase Price</label>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black px-3 py-1 rounded-full">
                ₹ {(propertyPrice / 100000).toFixed(2)} Lakhs
              </span>
            </div>
            <input
              type="range"
              min="2500000"
              max="50000000"
              step="500000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Expected Monthly Rent</label>
              <span className="bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-black px-3 py-1 rounded-full">
                ₹ {monthlyRent.toLocaleString("en-IN")} / mo
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="2500"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Gross Annual Rental Yield</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-display">
              {grossYield} % p.a.
            </div>
          </div>
          <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-3 text-xs font-bold">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Annual Rental Income:</span>
              <span className="font-black text-slate-900 dark:text-white">₹ {annualRent.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Estimated 5-Year Capital Gain:</span>
              <span className="font-black text-slate-900 dark:text-white">₹ {((valueIn5Yrs - propertyPrice) / 100000).toFixed(2)} Lakhs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "What is a good rental yield in Ahmedabad and Gandhinagar?",
      answer: "Residential properties in prime Ahmedabad localities (Bopal, Gota, Vaishno Devi) typically yield 3.5%–4.8% p.a., while commercial offices and GIFT City properties yield up to 6.5%–8.5% p.a."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="rental-yield-estimator"
      title="Rental Yield & 5-Year ROI Estimator"
      categoryTag="Investment Analytics"
      introParagraph="Evaluate expected annual rental yield percentage and 5-year capital appreciation returns for residential and commercial investments in Gujarat."
      calculatorComponent={calculatorUI}
      promoTitle="Run AI Valuation"
      promoDesc="Get machine-learning property price benchmarks."
      promoButtonText="Run Groq AI Valuation"
      promoHref="/valuation"
      faqs={faqs}
    />
  );
}
