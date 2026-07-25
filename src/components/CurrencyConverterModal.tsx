"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Globe, X, RefreshCw, DollarSign, Coins } from "lucide-react";

interface CurrencyConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CurrencyConverterModal({ isOpen, onClose }: CurrencyConverterModalProps) {
  const [mounted, setMounted] = useState(false);
  const [inrPrice, setInrPrice] = useState<number>(15000000); // 1.5 Crores
  const [targetCurrency, setTargetCurrency] = useState<"USD" | "AED" | "GBP" | "EUR">("USD");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Approximate NRI FX Exchange Rates (July 2026)
  const rates = {
    USD: 0.012,   // 1 INR = $0.012 USD (~83.3 INR/USD)
    AED: 0.044,   // 1 INR = 0.044 AED (~22.7 INR/AED)
    GBP: 0.0094,  // 1 INR = £0.0094 GBP (~106 INR/GBP)
    EUR: 0.011,   // 1 INR = €0.011 EUR (~91 INR/EUR)
  };

  const currencySymbols = {
    USD: "$",
    AED: "AED ",
    GBP: "£",
    EUR: "€",
  };

  const convertedValue = Math.round(inrPrice * rates[targetCurrency]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 font-sans flex min-h-full items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[85vh] overflow-y-auto cursor-default my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">NRI Multi-Currency Price Converter</h3>
            <p className="text-xs text-slate-400">Live property valuation converter for international buyers & investors</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          
          {/* INR Property Price Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-slate-400 uppercase">Property Value (INR)</label>
              <span className="text-blue-400 text-sm font-black">₹ {(inrPrice / 10000000).toFixed(2)} Cr</span>
            </div>
            <input
              type="range"
              min="2000000"
              max="100000000"
              step="1000000"
              value={inrPrice}
              onChange={(e) => setInrPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Currency Selection */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-extrabold uppercase text-slate-400 block">Target Foreign Currency</label>
            <div className="grid grid-cols-4 gap-2">
              {(["USD", "AED", "GBP", "EUR"] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setTargetCurrency(curr)}
                  className={`py-2.5 rounded-xl text-xs font-extrabold border transition cursor-pointer text-center ${
                    targetCurrency === curr
                      ? "bg-blue-600 border-blue-500 text-white shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Converted Output Display */}
        <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-5 text-center space-y-1">
          <span className="text-slate-400 text-xs font-semibold block uppercase">Converted International Valuation</span>
          <div className="text-3xl font-black text-emerald-400 font-display">
            {currencySymbols[targetCurrency]} {convertedValue.toLocaleString("en-US")}
          </div>
          <span className="text-[10px] text-slate-500 font-bold block pt-1">
            Exchange Rate Benchmark: 1 INR = {rates[targetCurrency]} {targetCurrency}
          </span>
        </div>

      </div>
    </div>,
    document.body
  );
}
