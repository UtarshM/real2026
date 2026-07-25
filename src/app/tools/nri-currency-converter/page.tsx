"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";

export default function NriCurrencyConverterPage() {
  const [inrAmount, setInrAmount] = useState(15000000); // 1.5 Cr
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "AED" | "GBP" | "EUR" | "CAD">("USD");

  const rates: Record<string, { rate: number; symbol: string; flag: string }> = {
    USD: { rate: 86.5, symbol: "$", flag: "🇺🇸" },
    AED: { rate: 23.55, symbol: "AED ", flag: "🇦🇪" },
    GBP: { rate: 108.2, symbol: "£", flag: "🇬🇧" },
    EUR: { rate: 91.4, symbol: "€", flag: "🇪🇺" },
    CAD: { rate: 61.8, symbol: "CA$", flag: "🇨🇦" }
  };

  const current = rates[selectedCurrency];
  const convertedValue = Math.round(inrAmount / current.rate);

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Property Price in INR (₹)</label>
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black px-3 py-1 rounded-full">
              ₹ {(inrAmount / 10000000).toFixed(2)} Crore
            </span>
          </div>
          <input
            type="range"
            min="2500000"
            max="100000000"
            step="2500000"
            value={inrAmount}
            onChange={(e) => setInrAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">Target Currency</label>
          <div className="grid grid-cols-5 gap-2">
            {Object.keys(rates).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCurrency(c as any)}
                className={`py-3 px-2 rounded-xl text-xs font-black border transition cursor-pointer flex flex-col items-center space-y-1 ${
                  selectedCurrency === c
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <span className="text-base">{rates[c].flag}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center space-y-2">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Converted Investment Amount ({selectedCurrency})</span>
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-display">
            {current.symbol} {convertedValue.toLocaleString("en-US")}
          </div>
          <p className="text-xs text-slate-500 font-bold">1 {selectedCurrency} ≈ ₹ {current.rate} INR</p>
        </div>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "Can NRIs buy residential and commercial properties in Gujarat?",
      answer: "Yes! Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) can freely acquire residential and commercial properties in Gujarat without prior RBI permission. Agricultural land, plantation property, and farm houses are restricted."
    },
    {
      question: "What are the tax implications for NRIs repatriating property funds from GIFT City?",
      answer: "Investments in GIFT City International Financial Services Centre (IFSC) enjoy special tax exemptions and full foreign currency repatriation benefits under FEMA guidelines."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="nri-currency-converter"
      title="NRI Multi-Currency Real Estate Investment Converter"
      categoryTag="NRI Investment & Foreign Exchange"
      introParagraph="Convert property valuations in Gujarat (Ahmedabad & GIFT City) to USD, AED, GBP, EUR, and CAD in real-time. Calculate your foreign currency capital outlay and repatriation guidelines for NRI real estate purchases."
      calculatorComponent={calculatorUI}
      promoTitle="Explore GIFT City Projects"
      promoDesc="View RERA-verified luxury apartments & commercial offices in GIFT SEZ."
      promoButtonText="View GIFT City Listings"
      promoHref="/buy?locality=gift-city"
      faqs={faqs}
    />
  );
}
