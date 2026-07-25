"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Building2, ShieldCheck, ExternalLink, X, MapPin } from "lucide-react";
import Link from "next/link";

interface DeveloperPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerName?: string;
}

export default function DeveloperPortfolioModal({
  isOpen,
  onClose,
  developerName = "Shivalik Group Developers"
}: DeveloperPortfolioModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    { name: "Shivalik Edge & Sky Villas", locality: "Bopal", category: "Ultra-Luxury 4 BHK", status: "READY_TO_MOVE", price: "₹ 3.62 Cr" },
    { name: "Shivalik Curv Commercial", locality: "GIFT City", category: "Grade A Offices", status: "UNDER_CONSTRUCTION", price: "₹ 1.85 Cr" },
    { name: "Shivalik Parkview Flats", locality: "Ambli-Bopal Road", category: "3 BHK Premium", status: "READY_TO_MOVE", price: "₹ 1.45 Cr" },
    { name: "Shivalik Highstreet Shops", locality: "Vastrapur", category: "Retail Showrooms", status: "UPCOMING", price: "₹ 95 Lac" },
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
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-xl font-black text-white font-display">{developerName}</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 font-medium">Developer Portfolio • 25+ Completed Projects in Gujarat</p>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {projects.map((p, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center gap-3">
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-white">{p.name}</h4>
                <p className="text-[10px] text-slate-400 font-medium">{p.locality} • {p.category}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-400 block">{p.price}</span>
                <span className="text-[9px] font-bold uppercase text-slate-500">{p.status.replace("_", " ")}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>,
    document.body
  );
}
