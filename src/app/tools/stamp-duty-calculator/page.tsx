"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";

export default function StampDutyCalculatorPage() {
  const [propertyValue, setPropertyValue] = useState(8500000);
  const [gender, setGender] = useState<"male" | "female" | "joint">("male");
  const [isUrban, setIsUrban] = useState(true);

  // Gujarat Stamp Duty: 4.9% (1% discount for females = 3.9%), Registration Fee: 1%
  const stampRate = gender === "female" ? 0.039 : 0.049;
  const regRate = 0.01;

  const stampDutyAmount = Math.round(propertyValue * stampRate);
  const registrationAmount = Math.round(propertyValue * regRate);
  const totalGovtCharges = stampDutyAmount + registrationAmount;
  const netTotalCost = propertyValue + totalGovtCharges;

  // Donut chart angles
  const propPct = (propertyValue / netTotalCost) * 100;
  const stampPct = (stampDutyAmount / netTotalCost) * 100;

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Sliders & Controls */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Property Agreement Value</label>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black px-3 py-1 rounded-full">
                ₹ {(propertyValue / 100000).toFixed(2)} Lakhs
              </span>
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="500000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">Buyer Category (Gender Concession)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "male", label: "Male (4.9%)" },
                { id: "female", label: "Female (3.9%)" },
                { id: "joint", label: "Joint (4.9%)" }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGender(g.id as any)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-black border transition cursor-pointer ${
                    gender === g.id
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Breakout & Results */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Total Government Acquisition Charges</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">
              ₹ {totalGovtCharges.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-3 text-xs font-bold">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Gujarat Stamp Duty Fee ({gender === "female" ? "3.9%" : "4.9%"}):</span>
              <span className="font-black text-slate-900 dark:text-white">₹ {stampDutyAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Registration Charge (1.0%):</span>
              <span className="font-black text-slate-900 dark:text-white">₹ {registrationAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700 font-black text-sm">
              <span>Net All-In Property Outlay:</span>
              <span className="text-orange-600 dark:text-orange-400">₹ {netTotalCost.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );

  const faqs = [
    {
      question: "What is the current Stamp Duty rate in Gujarat for 2026?",
      answer: "In Gujarat, the standard stamp duty rate for male buyers is 4.9% of the property market value or agreement value (whichever is higher). Female buyers receive a 1% concession, making their effective stamp duty 3.9%."
    },
    {
      question: "How much are property registration charges in Ahmedabad & Gandhinagar?",
      answer: "Property registration charges across Gujarat urban municipal limits (AMC, GMC) are fixed at 1.0% of the total property valuation."
    },
    {
      question: "Can Stamp Duty and Registration fees be included in home loan amounts?",
      answer: "RBI guidelines prohibit banks from including government stamp duty and registration charges directly in the home loan LTV (Loan-to-Value) calculation. Buyers must pay these fees out of pocket during property registration."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="stamp-duty-calculator"
      title="Gujarat Stamp Duty & Registration Fee Calculator 2026"
      categoryTag="Gujarat Real Estate Legal Tools"
      introParagraph="Calculate exact government stamp duty and property registration charges for residential flats, villas, commercial office spaces, and land across Ahmedabad and Gandhinagar. Includes updated 2026 Gujarat Revenue Department gender concession rates (4.9% standard / 3.9% female buyers) and 1% registration fees."
      calculatorComponent={calculatorUI}
      promoTitle="Get Home Loan Pre-Approval"
      promoDesc="Check your bank loan eligibility with zero processing fees across SBI, HDFC Bank, ICICI & Axis Bank."
      promoButtonText="Calculate Loan Eligibility"
      promoHref="/tools/home-loan-eligibility"
      faqs={faqs}
    />
  );
}
