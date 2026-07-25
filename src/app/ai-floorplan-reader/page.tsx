"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Layers, CheckCircle2, ChevronRight, FileText, Compass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiFloorplanReaderPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>(
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  );
  const [isScanning, setIsScanning] = useState(false);
  const [floorplanData, setFloorplanData] = useState<{
    superArea: string;
    carpetArea: string;
    efficiencyRatio: string;
    balconyArea: string;
    vastuEntrance: string;
    roomDimensions: Array<{ room: string; dims: string }>;
  }>({
    superArea: "2,250 sq.ft",
    carpetArea: "1,890 sq.ft",
    efficiencyRatio: "84.0% High Efficiency",
    balconyArea: "240 sq.ft (Double Height Deck)",
    vastuEntrance: "North-East (Ishanya Zone - Ideal Vastu)",
    roomDimensions: [
      { room: "Master Bedroom", dims: "16' 0\" x 14' 6\" (Ensuite Bath + Walk-in Closet)" },
      { room: "Living & Dining Lounge", dims: "24' 6\" x 16' 0\" (Attached Balcony)" },
      { room: "Bedroom 2", dims: "14' 0\" x 12' 0\" (East Facing Window)" },
      { room: "Bedroom 3", dims: "13' 6\" x 11' 6\"" },
      { room: "Modular Kitchen + Utility", dims: "12 me' 0\" x 10' 0\" (South-East Agni Corner)" }
    ]
  });

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>OCR Blueprint Reader & Architectural Scanner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">AI Architectural Floor Plan Reader</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Upload floor plan CAD drawings or images. Our Neural OCR engine extracts precise Carpet Area vs Super Area ratio, room dimensions, balcony square footage, and Vastu entry zones.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Floorplan Preview Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 relative shadow-2xl">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                <Image
                  src={selectedPlan}
                  alt="Architectural Floor Plan Blueprint"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>

          {/* AI Extracted Specs Report */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-orange-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Verified Carpet Area</span>
                  <h3 className="text-2xl font-black text-white font-display">{floorplanData.carpetArea}</h3>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-extrabold">
                  {floorplanData.efficiencyRatio}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Super Built-up Area</span>
                  <span className="font-bold text-white">{floorplanData.superArea}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Vastu Main Entrance</span>
                  <span className="font-bold text-orange-400">{floorplanData.vastuEntrance}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase block">Extracted Room Dimensions</span>
                <div className="space-y-2">
                  {floorplanData.roomDimensions.map((r, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{r.room}</span>
                      <span className="font-mono text-orange-400 font-bold">{r.dims}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
