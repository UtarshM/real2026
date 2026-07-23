"use client";

import React, { useState } from "react";
import { Calculator, Landmark, ArrowRight, ShieldCheck, Percent, IndianRupee } from "lucide-react";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(7500000); // 75 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years default

  // Formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEmi = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureYears * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const monthlyEmi = calculateEmi();
  const totalPayment = monthlyEmi * tenureYears * 12;
  const totalInterest = totalPayment - loanAmount;

  const partnerBanks = [
    { name: "State Bank of India (SBI)", rate: "8.40%", maxTenure: "30 Yrs", fee: "Zero Processing Fee" },
    { name: "HDFC Bank", rate: "8.45%", maxTenure: "30 Yrs", fee: "Minimal Documentation" },
    { name: "ICICI Bank", rate: "8.50%", maxTenure: "30 Yrs", fee: "Instant Online Approval" },
    { name: "Bank of Baroda", rate: "8.40%", maxTenure: "30 Yrs", fee: "Concession for Women" }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white font-display">AddressBox Home Loan EMI Calculator</h3>
          <p className="text-xs text-slate-400 font-medium">Calculate your monthly loan payments for Ahmedabad & Gandhinagar properties</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Loan Amount */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-extrabold uppercase text-slate-400">Loan Amount</label>
              <span className="text-sm font-bold text-blue-400">₹ {(loanAmount / 100000).toFixed(1)} Lakhs</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="500000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-bold">
              <span>₹10 Lakhs</span>
              <span>₹5 Crores</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-extrabold uppercase text-slate-400">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-400">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="6.5"
              max="14.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-bold">
              <span>6.5%</span>
              <span>14.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-extrabold uppercase text-slate-400">Loan Tenure (Years)</label>
              <span className="text-sm font-bold text-blue-400">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-bold">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* Right Summary Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950 border border-blue-500/20 rounded-3xl p-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Estimated Monthly EMI</span>
            <h4 className="text-3xl sm:text-4xl font-black text-white mt-1 text-blue-400 font-display">
              ₹ {monthlyEmi.toLocaleString("en-IN")} <span className="text-xs font-normal text-slate-400">/ month</span>
            </h4>

            <div className="mt-6 space-y-3 border-t border-slate-800/80 pt-4">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Principal Amount:</span>
                <span className="text-white">₹ {loanAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Total Interest Payable:</span>
                <span className="text-amber-400">₹ {totalInterest.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-xs font-extrabold border-t border-slate-800 pt-2">
                <span className="text-slate-300">Total Amount Payable:</span>
                <span className="text-emerald-400">₹ {totalPayment.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2">
              <Landmark className="w-4 h-4" />
              <span>Apply for Pre-Approved Home Loan</span>
            </button>
          </div>
        </div>

      </div>

      {/* Partner Banks Grid */}
      <div className="mt-10 border-t border-slate-800 pt-6">
        <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-4">Partnered Financial Institutions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partnerBanks.map((bank, i) => (
            <div key={i} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-white">{bank.name}</span>
                <span className="text-xs font-black text-emerald-400">{bank.rate}</span>
              </div>
              <p className="text-[11px] text-slate-400">{bank.fee}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
