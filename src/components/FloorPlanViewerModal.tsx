"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Layout, X, Download, Maximize2, Sparkles, Building2 } from "lucide-react";
import { Button } from "./ui/button";

interface FloorPlanViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export default function FloorPlanViewerModal({
  isOpen,
  onClose,
  propertyName = "Shivalik Edge 4 BHK"
}: FloorPlanViewerModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rooms = [
    { name: "Grand Living & Dining Hall", dimension: "22' 0\" x 15' 6\"", area: "341 Sq.Ft" },
    { name: "Master Bedroom 1 (Ensuite)", dimension: "14' 6\" x 16' 0\"", area: "232 Sq.Ft" },
    { name: "Master Bedroom 2 (Ensuite)", dimension: "13' 0\" x 15' 0\"", area: "195 Sq.Ft" },
    { name: "Modular Kitchen & Utility Store", dimension: "11' 6\" x 12' 0\"", area: "138 Sq.Ft" },
    { name: "Private Deck Balcony", dimension: "12' 0\" x 6' 0\"", area: "72 Sq.Ft" },
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
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[85vh] overflow-y-auto cursor-default my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 pr-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-display">Architectural Floor Plan & Dimensions</h3>
              <p className="text-xs text-slate-400">Layout blueprint details for <span className="text-blue-400 font-bold">{propertyName}</span></p>
            </div>
          </div>
        </div>

        {/* Architectural Layout Badge */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Architectural Layout Blueprint</span>
          <span className="text-blue-400 font-black bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
            Total Carpet Area: 978 Sq.Ft
          </span>
        </div>

        {/* Room Dimensions Table */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Room Square-Footage Breakdown:</h4>
          <div className="space-y-2">
            {rooms.map((r, idx) => (
              <div key={idx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850 flex justify-between items-center text-xs">
                <span className="font-extrabold text-white">{r.name}</span>
                <div className="text-right space-x-3">
                  <span className="text-slate-400 font-semibold">{r.dimension}</span>
                  <span className="text-blue-400 font-black bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-md">{r.area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blueprint Download Button */}
        <div className="pt-2">
          <button
            onClick={() => alert(`Downloading official PDF architectural blueprint for ${propertyName}.`)}
            className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-xs rounded-xl transition flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Download Architectural CAD Blueprint PDF</span>
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
