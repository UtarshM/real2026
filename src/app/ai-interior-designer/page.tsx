"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Palette, CheckCircle2, ChevronRight, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiInteriorDesignerPage() {
  const [selectedStyle, setSelectedStyle] = useState<"MODERN" | "SCANDINAVIAN" | "ITALIAN_LUXURY" | "NEO_CLASSICAL">("MODERN");
  const [isGenerating, setIsGenerating] = useState(false);

  const stylePreviews = {
    MODERN: {
      title: "Warm Modern Minimalist",
      desc: "Neutral tones, concealed warm LED cove lighting, textured wall panels, and sleek low-profile furniture.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      estCost: "₹ 12.5 Lacs (3 BHK Full Turnkey)"
    },
    SCANDINAVIAN: {
      title: "Nordic Wood & Pastel Scandinavian",
      desc: "Light oak wood flooring, soft linen upholstery, indoor planter alcoves, and functional open-concept layouts.",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      estCost: "₹ 9.8 Lacs (3 BHK Turnkey)"
    },
    ITALIAN_LUXURY: {
      title: "High-Gloss Italian Marble & Brass",
      desc: "Italian Statuario marble flooring, brushed brass metal accents, custom veneer wardrobe panels, and fluted glass partitions.",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      estCost: "₹ 18.2 Lacs (3 BHK Luxury Turnkey)"
    },
    NEO_CLASSICAL: {
      title: "Contemporary Neo-Classical Elegance",
      desc: "Wainscoting wall moldings, crystal chandeliers, velvet seating, and timeless symmetrical architectural trims.",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      estCost: "₹ 15.0 Lacs (3 BHK Turnkey)"
    }
  };

  const handleStyleChange = (style: "MODERN" | "SCANDINAVIAN" | "ITALIAN_LUXURY" | "NEO_CLASSICAL") => {
    setSelectedStyle(style);
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 600);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI Interior Decorator & 3D Render Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">AI Interior Design & Style Staging Simulator</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Visualize your home in 4 distinct high-end architectural interior styles with instant estimated turnkey execution budgets for Ahmedabad & Gandhinagar.
          </p>
        </div>

        {/* Style Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["MODERN", "SCANDINAVIAN", "ITALIAN_LUXURY", "NEO_CLASSICAL"] as const).map((style) => (
            <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`p-3.5 rounded-2xl border text-xs font-bold transition text-center cursor-pointer ${
                selectedStyle === style
                  ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/25"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {style === "MODERN" ? "Warm Modern" : style === "SCANDINAVIAN" ? "Nordic Wood" : style === "ITALIAN_LUXURY" ? "Italian Marble" : "Neo-Classical"}
            </button>
          ))}
        </div>

        {/* Workspace Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-800">
            <Image
              src={stylePreviews[selectedStyle].img}
              alt={stylePreviews[selectedStyle].title}
              width={1200}
              height={800}
              className="w-full h-full object-cover"
            />
            {isGenerating && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-10 h-10 text-orange-400 animate-spin" />
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider animate-pulse">Rendering 3D AI Interior Style...</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-slate-800 pt-6">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Selected Interior Concept</span>
              <h3 className="text-xl font-black text-white font-display">{stylePreviews[selectedStyle].title}</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">{stylePreviews[selectedStyle].desc}</p>
            </div>
            
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Turnkey Budget</span>
              <span className="text-base font-black text-emerald-400">{stylePreviews[selectedStyle].estCost}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
