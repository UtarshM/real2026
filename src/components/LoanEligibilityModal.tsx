"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Landmark, Calculator, X, IndianRupee, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

interface LoanEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoanEligibilityModal({ isOpen, onClose }: LoanEligibilityModalProps) {
  const [mounted, setMounted] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(120000); // 1.2 Lakhs/mo
  const [existingEmis, setExistingEmis] = useState<number>(15000); // 15k existing EMIs
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  useEffect(() => {
    setMounted(true);
  }, []);

  // Standard Banking FOIR (Fixed Obligation to Income Ratio) calculation = 50% FOIR
  const maxAvailableEmi = Math.max(0, monthlyIncome * 0.5 - existingEmis);
  
  // Rate = 8.5% p.a., monthly rate r = 8.5 / 12 / 100
  const monthlyRate = 8.5 / 12 / 100;
  const totalMonths = tenureYears * 12;

  // Loan Amount Formula P = EMI * [((1+r)^n - 1) / (r * (1+r)^n)]
  const maxLoanAmount = Math.round(
    maxAvailableEmi * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)))
  );

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
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Home Loan Eligibility Calculator</h3>
            <p className="text-xs text-slate-400">Estimate your maximum borrowing capacity across SBI, HDFC & ICICI Bank</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          
          {/* Monthly Gross Income */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-slate-400 uppercase">Gross Monthly Salary / Income</label>
              <span className="text-blue-400 text-sm font-black">₹ {(monthlyIncome / 1000).toFixed(0)}k / month</span>
            </div>
            <input
              type="range"
              min="25000"
              max="1000000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Existing EMIs */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-slate-400 uppercase">Existing Monthly Loan EMIs</label>
              <span className="text-amber-400 text-sm font-black">₹ {(existingEmis / 1000).toFixed(0)}k / month</span>
            </div>
            <input
              type="range"
              min="0"
              max="250000"
              step="2500"
              value={existingEmis}
              onChange={(e) => setExistingEmis(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Loan Tenure */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-slate-400 uppercase">Desired Tenure</label>
              <span className="text-blue-400 text-sm font-black">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

        </div>

        {/* Calculation Result */}
        <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-slate-400">Max Recommended EMI Capacity:</span>
            <span className="text-white font-bold">₹ {maxAvailableEmi.toLocaleString("en-IN")} / mo</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-black">
            <span className="text-white">Estimated Maximum Home Loan Amount (@ 8.5%):</span>
            <span className="text-emerald-400 text-base font-display">₹ {(maxLoanAmount / 100000).toFixed(1)} Lakhs</span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
