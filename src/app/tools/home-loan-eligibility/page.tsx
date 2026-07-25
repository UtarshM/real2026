"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { PlusCircle, MinusCircle, Calculator, Landmark } from "lucide-react";

export default function HomeLoanEligibilityPage() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000); // 10 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(6.5); // 6.5% default
  const [tenureYrs, setTenureYrs] = useState<number>(5); // 5 Yr default
  const [showAmortization, setShowAmortization] = useState(false);

  // EMI Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
  const r = interestRate / 12 / 100;
  const n = tenureYrs * 12;
  
  const monthlyEmi = r > 0 && n > 0
    ? Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
    : 0;

  const totalPayment = monthlyEmi * n;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  // Donut chart stroke calculations
  const principalPct = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 80;
  const interestPct = 100 - principalPct;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const interestStroke = (interestPct / 100) * circumference;

  // Track progress percentages for custom slider fills
  const loanPct = ((loanAmount - 100000) / (50000000 - 100000)) * 100;
  const ratePct = ((interestRate - 5.0) / (15.0 - 5.0)) * 100;
  const tenurePct = ((tenureYrs - 1) / (30 - 1)) * 100;

  const calculatorUI = (
    <div className="space-y-8 text-slate-900">
      
      {/* Title */}
      <h2 className="text-2xl font-black text-slate-800 font-display">EMI Calculator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Labeled Sliders with Highlighted Value Pills & Smooth Dynamic Fills */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">Loan amount</label>
              <span className="bg-emerald-100 text-emerald-700 text-sm font-extrabold px-3 py-1 rounded-md transition-all">
                ₹ {loanAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${loanPct}%, #e2e8f0 ${loanPct}%, #e2e8f0 100%)`
              }}
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all"
            />
          </div>

          {/* Rate of Interest */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">Rate of interest (p.a)</label>
              <span className="bg-emerald-100 text-emerald-700 text-sm font-extrabold px-3 py-1 rounded-md transition-all">
                {interestRate} %
              </span>
            </div>
            <input
              type="range"
              min="5.0"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${ratePct}%, #e2e8f0 ${ratePct}%, #e2e8f0 100%)`
              }}
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all"
            />
          </div>

          {/* Loan Tenure */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">Loan tenure</label>
              <span className="bg-emerald-100 text-emerald-700 text-sm font-extrabold px-3 py-1 rounded-md transition-all">
                {tenureYrs} Yr
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYrs}
              onChange={(e) => setTenureYrs(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${tenurePct}%, #e2e8f0 ${tenurePct}%, #e2e8f0 100%)`
              }}
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all"
            />
          </div>

        </div>

        {/* Right Column: Dynamic Real-time SVG Donut Chart Breakdown */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 pt-4 lg:pt-0">
          
          {/* Legend */}
          <div className="flex items-center space-x-6 text-xs font-bold text-slate-600">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-sm bg-indigo-100 border border-indigo-200" />
              <span>Principal amount</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-sm bg-blue-600" />
              <span>Interest amount</span>
            </div>
          </div>

          {/* SVG Donut Chart with Center Percentage Display */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="#e0e7ff"
                strokeWidth="26"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="26"
                strokeDasharray={`${interestStroke} ${circumference}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />
            </svg>

            {/* Live Center Percentage Breakdown */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Interest Ratio</span>
              <span className="text-xl font-black text-blue-600 font-display">{interestPct.toFixed(1)}%</span>
              <span className="text-[10px] font-bold text-slate-500 mt-0.5">Principal: {principalPct.toFixed(1)}%</span>
            </div>
          </div>

        </div>

      </div>

      {/* Results Summary Block Below */}
      <div className="max-w-md space-y-3 pt-6 border-t border-slate-100 font-bold text-sm text-slate-700">
        <div className="flex justify-between items-center">
          <span>Monthly EMI</span>
          <span className="text-slate-900 font-black text-base">₹{monthlyEmi.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Principal amount</span>
          <span className="text-slate-900 font-black text-base">₹{loanAmount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Total interest</span>
          <span className="text-slate-900 font-black text-base">₹{totalInterest.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Total amount</span>
          <span className="text-slate-900 font-black text-base">₹{totalPayment.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Amortization Details Toggle */}
      <div className="pt-6 border-t border-slate-100 text-center space-y-2">
        <span className="text-xs font-extrabold text-slate-600 block">Your Amortization Details (Yearly/Monthly)</span>
        <button
          type="button"
          onClick={() => setShowAmortization(!showAmortization)}
          className="mx-auto block text-slate-400 hover:text-orange-500 transition cursor-pointer p-1"
        >
          {showAmortization ? (
            <MinusCircle className="w-8 h-8 mx-auto text-orange-500" />
          ) : (
            <PlusCircle className="w-8 h-8 mx-auto text-slate-400 hover:text-orange-500" />
          )}
        </button>
      </div>

    </div>
  );

  const amortizationTable = (
    <div className="space-y-3 pt-2">
      <div className="grid grid-cols-4 text-xs font-black uppercase text-slate-500 border-b border-slate-200 pb-2">
        <span>Year</span>
        <span>Principal Paid</span>
        <span>Interest Paid</span>
        <span>Balance Loan</span>
      </div>
      {Array.from({ length: Math.min(tenureYrs, 10) }, (_, i) => i + 1).map((year) => (
        <div key={year} className="grid grid-cols-4 text-xs font-bold text-slate-800 py-2 border-b border-slate-100">
          <span>Year {year}</span>
          <span className="text-emerald-600">₹ {Math.round(loanAmount * (year / tenureYrs)).toLocaleString("en-IN")}</span>
          <span className="text-blue-600">₹ {Math.round(totalInterest / tenureYrs).toLocaleString("en-IN")}</span>
          <span>₹ {Math.max(0, Math.round(loanAmount - (loanAmount * (year / tenureYrs)))).toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );

  const faqs = [
    {
      question: "How do Indian banks calculate home loan EMI?",
      answer: "Banks use the Equated Monthly Installment (EMI) formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is Monthly Interest Rate, and N is Loan Tenure in Months."
    },
    {
      question: "Can I pre-pay my home loan early in Gujarat?",
      answer: "Yes, RBI guidelines mandate zero prepayment penalties on floating interest rate home loans for individual borrowers across all banks and NBFCs."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="home-loan-eligibility"
      title="Home Loan EMI Calculator 2026"
      categoryTag="Mortgage & Banking Tools"
      introParagraph="Calculate your exact monthly loan EMI, principal vs interest breakdown, and amortization schedule. Adjust loan amount, interest rate, and tenure to evaluate borrowing plans for properties across Ahmedabad and Gandhinagar."
      calculatorComponent={calculatorUI}
      amortizationDetails={showAmortization ? amortizationTable : undefined}
      promoTitle="AI Home Valuation Engine"
      promoDesc="Get Groq Llama-3.3 market valuations for properties in Ahmedabad & Gandhinagar."
      promoButtonText="Run AI Valuation"
      promoHref="/valuation"
      faqs={faqs}
    />
  );
}
