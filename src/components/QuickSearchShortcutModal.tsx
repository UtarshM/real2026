"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, X, MapPin, Building2, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { initialProperties } from "@/data/properties";

export default function QuickSearchShortcutModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filtered = initialProperties.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.locality.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const handleSelectProperty = (id: number) => {
    setIsOpen(false);
    router.push(`/property/${id}`);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 font-sans cursor-pointer"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-4 sm:p-6 relative space-y-4 cursor-default max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center space-x-3 bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800">
          <Search className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Quick Spotlight Search... (Type Bopal, Villa, 3 BHK)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Results List */}
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelectProperty(p.id)}
                className="p-3 bg-slate-950 hover:bg-slate-800/60 rounded-2xl border border-slate-850 flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{p.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{p.locality}, {p.city} • ₹ {(p.price / 100000).toFixed(0)} Lac</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 text-center py-4">No matching properties found.</p>
          )}
        </div>

        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-center pt-1">
          Press <kbd className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-300">Esc</kbd> to close
        </div>

      </div>
    </div>,
    document.body
  );
}
