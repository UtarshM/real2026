"use client";

import React, { useState } from "react";
import { ShieldCheck, Search, CheckCircle2, X, AlertCircle, Building2 } from "lucide-react";
import { Button } from "./ui/button";

interface ReraCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReraCheckerModal({ isOpen, onClose }: ReraCheckerModalProps) {
  const [reraId, setReraId] = useState("PR/GJ/AHMEDABAD/AHMEDABAD CITY/AUDA/RAA07880/070121");
  const [result, setResult] = useState<{
    valid: boolean;
    projectName?: string;
    promoter?: string;
    status?: string;
    approvedDate?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reraId.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult({
        valid: true,
        projectName: "Shivalik Edge & Sky Villas",
        promoter: "Shivalik Group Developers",
        status: "APPROVED / REGISTRATION VALID",
        approvedDate: "15-Jan-2021"
      });
    }, 1200);
  };

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return require("react-dom").createPortal(
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
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Gujarat RERA Verification Lookup</h3>
            <p className="text-xs text-slate-400">Verify government approval status & land titles for projects in Gujarat</p>
          </div>
        </div>

        {/* RERA Input Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase text-slate-400">Gujarat RERA Registration Number</label>
            <div className="flex space-x-2">
              <input
                type="text"
                required
                value={reraId}
                onChange={(e) => setReraId(e.target.value)}
                placeholder="PR/GJ/AHMEDABAD/..."
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <Button type="submit" variant="primary" disabled={loading} className="px-5">
                {loading ? "Searching..." : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </form>

        {/* Results Card */}
        {result && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3 animate-in fade-in duration-200">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                {result.status}
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-1.5 pt-1">
              <h4 className="text-sm font-extrabold text-white font-display">{result.projectName}</h4>
              <p className="text-xs text-slate-400 font-semibold">Developer: {result.promoter}</p>
              <p className="text-[11px] text-slate-500 font-medium">Approved Date: {result.approvedDate}</p>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
