"use client";

import React, { useState } from "react";
import { Layers, X, ShieldCheck, CheckCircle2, Building2, MapPin } from "lucide-react";
import { initialProperties } from "@/data/properties";

interface PropertyCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyCompareModal({ isOpen, onClose }: PropertyCompareModalProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2]);

  const toggleSelectProperty = (id: number) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedProperties = initialProperties.filter((p) => selectedIds.includes(p.id));

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
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[85vh] overflow-y-auto cursor-default my-auto"
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
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">Side-by-Side Property Comparison Matrix</h3>
            <p className="text-xs text-slate-400">Compare specs, Vastu scores, RERA status, and pricing across up to 3 properties</p>
          </div>
        </div>

        {/* Property Selector Selector Strip */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Select Properties to Compare (Max 3):</label>
          <div className="flex flex-wrap gap-2">
            {initialProperties.slice(0, 6).map((p) => {
              const isSelected = selectedIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleSelectProperty(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 text-slate-500 font-extrabold uppercase text-[10px] w-1/4">Specification</th>
                {selectedProperties.map((p) => (
                  <th key={p.id} className="p-3 text-white font-extrabold text-sm w-1/3">
                    <div className="space-y-1">
                      <span className="block font-display text-blue-400">{p.name}</span>
                      <span className="block text-[11px] font-semibold text-slate-400">{p.locality}, {p.city}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              <tr>
                <td className="p-3 text-slate-400 font-bold">Price Benchmark</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-3 text-emerald-400 font-black text-sm">{p.priceString || `₹ ${(p.price / 100000).toFixed(0)} Lac`}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-bold">Layout / BHK</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-3 text-slate-200 font-semibold">{p.bhk ? `${p.bhk} BHK` : p.subType}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-bold">Carpet Area</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-3 text-slate-200 font-semibold">{p.area} Sq.Ft</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-bold">Vastu Score</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-3 text-amber-400 font-extrabold">{p.vastuScore || 90} / 100</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-bold">RERA Approval</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>RERA Verified</span>
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-bold">Possession Timeline</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-3 text-slate-300 font-semibold">{p.possessionDate || "Ready to Move"}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-bold">Furnishing Status</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} className="p-3 text-slate-300 font-semibold">{p.furnished || "Semi-Furnished"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>,
    document.body
  );
}
