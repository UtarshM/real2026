"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileCheck, ShieldCheck, CheckCircle2, X, AlertCircle } from "lucide-react";

interface LegalTitleCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

export default function LegalTitleCheckerModal({
  isOpen,
  onClose,
  projectName = "Shivalik Edge & Sky Villas"
}: LegalTitleCheckerModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checks = [
    { title: "AUDA Urban Zoning Clearance", status: "VERIFIED", details: "Zone R1 Residential Approved" },
    { title: "NA (Non-Agricultural) Land Order", status: "VERIFIED", details: "Collector Order #7782/2020" },
    { title: "7/12 Land Title Revenue Record", status: "VERIFIED", details: "Clear Title - Zero Litigation" },
    { title: "Environment & Fire NOC", status: "VERIFIED", details: "State Environment Approval Granted" },
    { title: "Pre-Approved Housing Loans", status: "VERIFIED", details: "SBI, HDFC, ICICI, Bank of Baroda" },
  ];

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
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Legal Title & Clearance Checklist</h3>
            <p className="text-xs text-slate-400">Government land registry compliance for <span className="text-blue-400 font-bold">{projectName}</span></p>
          </div>
        </div>

        {/* Legal Checks List */}
        <div className="space-y-3">
          {checks.map((c, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-white">{c.title}</h4>
                  <span className="text-[10px] text-slate-500 font-semibold">{c.details}</span>
                </div>
              </div>
              <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                {c.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>,
    document.body
  );
}
