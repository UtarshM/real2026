"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileText, Calculator, X, IndianRupee, ShieldCheck } from "lucide-react";

interface StampDutyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StampDutyCalculatorModal({ isOpen, onClose }: StampDutyCalculatorModalProps) {
  const [mounted, setMounted] = useState(false);
  const [propertyValue, setPropertyValue] = useState<number>(7500000); // 75 Lakhs
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "JOINT">("MALE");

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Gujarat Stamp Duty Rates: Male 4.9% + 1% surcharge = 5.9%, Female 4.9% total (1% concession), Joint 5.4%
  const getStampDutyRate = () => {
    if (gender === "FEMALE") return 4.9;
    if (gender === "JOINT") return 5.4;
    return 5.9;
  };

  const stampDutyRate = getStampDutyRate();
  const registrationRate = 1.0; // 1% registration fee

  const stampDutyAmount = Math.round((propertyValue * stampDutyRate) / 100);
  const registrationAmount = Math.round((propertyValue * registrationRate) / 100);
  const totalGovtFees = stampDutyAmount + registrationAmount;
  const netAcquisitionCost = propertyValue + totalGovtFees;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 font-sans flex min-h-full items-center justify-center cursor-pointer"
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
        <div className="flex items-center space-x-3 pr-8">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Gujarat Stamp Duty & Registration Calculator</h3>
            <p className="text-xs text-slate-400">Calculate exact government registration fees for properties in Gujarat</p>
          </div>
        </div>

        {/* Input Controls */}
        <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          
          {/* Property Agreement Value */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-slate-400 uppercase">Property Agreement Value</label>
              <span className="text-emerald-400 text-sm font-black">₹ {(propertyValue / 100000).toFixed(1)} Lakhs</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="500000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Buyer Gender Selection */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-400 uppercase block">Primary Buyer Ownership Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(["MALE", "FEMALE", "JOINT"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border transition cursor-pointer text-center ${
                    gender === g
                      ? "bg-emerald-600 border-emerald-500 text-white shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {g === "MALE" ? "Male Buyer" : g === "FEMALE" ? "Female (1% Rebate)" : "Joint Ownership"}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Fee Breakdown Summary */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-slate-400">Stamp Duty Rate ({stampDutyRate}%):</span>
            <span className="text-white font-bold">₹ {stampDutyAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-slate-400">Registration Fee (1.0%):</span>
            <span className="text-white font-bold">₹ {registrationAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-extrabold">
            <span className="text-slate-300">Total Govt Taxes & Fees:</span>
            <span className="text-emerald-400 text-sm">₹ {totalGovtFees.toLocaleString("en-IN")}</span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-xs font-black">
            <span className="text-white">Net Total Property Cost:</span>
            <span className="text-blue-400 text-base font-display">₹ {netAcquisitionCost.toLocaleString("en-IN")}</span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
