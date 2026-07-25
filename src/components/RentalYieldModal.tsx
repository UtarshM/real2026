"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { TrendingUp, Calculator, X, IndianRupee, Percent } from "lucide-react";

interface RentalYieldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RentalYieldModal({ isOpen, onClose }: RentalYieldModalProps) {
  const [mounted, setMounted] = useState(false);
  const [propertyCost, setPropertyCost] = useState<number>(8500000); // 85 Lakhs
  const [expectedRent, setExpectedRent] = useState<number>(32000); // 32k/month

  useEffect(() => {
    setMounted(true);
  }, []);

  const grossAnnualRent = expectedRent * 12;
  const grossRentalYield = ((grossAnnualRent / propertyCost) * 100).toFixed(2);
  const projected5YrValue = Math.round(propertyCost * 1.55); // 55% 5-yr growth in Bopal/SG Highway

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
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[85vh] overflow-y-auto cursor-default my-auto"
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
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Rental Yield & Investment ROI Estimator</h3>
            <p className="text-xs text-slate-400">Project annual rental yields & 5-year capital appreciation for Ahmedabad properties</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          
          {/* Property Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-slate-400 uppercase">Total Property Value</label>
              <span className="text-emerald-400 text-sm font-black">₹ {(propertyCost / 100000).toFixed(1)} Lakhs</span>
            </div>
            <input
              type="range"
              min="2500000"
              max="100000000"
              step="500000"
              value={propertyCost}
              onChange={(e) => setPropertyCost(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Monthly Expected Rent */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-slate-400 uppercase">Estimated Monthly Rent</label>
              <span className="text-emerald-400 text-sm font-black">₹ {(expectedRent / 1000).toFixed(0)}k / month</span>
            </div>
            <input
              type="range"
              min="8000"
              max="350000"
              step="2000"
              value={expectedRent}
              onChange={(e) => setExpectedRent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

        </div>

        {/* ROI Breakdown Summary */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-slate-400">Gross Annual Rental Income:</span>
            <span className="text-white font-bold">₹ {grossAnnualRent.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-slate-400">Gross Annual Rental Yield:</span>
            <span className="text-emerald-400 font-extrabold text-sm">{grossRentalYield}% p.a.</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-extrabold">
            <span className="text-slate-300">Projected Property Value (5 Years @ ~9%/yr):</span>
            <span className="text-blue-400 text-sm">₹ {(projected5YrValue / 100000).toFixed(1)} Lakhs</span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
