"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { MapPin, ShieldAlert, Navigation, School, Activity, Radio, Plus, RotateCcw, Layers, Eye, Compass, ArrowRight, Building, Search, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocalityPin {
  id: number;
  name: string;
  developer: string;
  priceString: string;
  locality: string;
  city: string;
  bhk: number;
  type: string;
  lat: number;
  lng: number;
  xPercent: number; // For SVG map display
  yPercent: number;
  image: string;
  vastuScore: number;
}

export default function AdvancedMapPage() {
  const [selectedCity, setSelectedCity] = useState<"All" | "Ahmedabad" | "Gandhinagar">("All");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedPin, setSelectedPin] = useState<LocalityPin | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawnBoundary, setDrawnBoundary] = useState<{ x: number; y: number }[]>([]);

  // Map pins with SVG coordinates relative to map backdrop
  const localityPins: LocalityPin[] = [
    {
      id: 1,
      name: "Shivalik Edge",
      developer: "Shivalik Group",
      priceString: "₹ 3.62 Cr",
      locality: "Bopal",
      city: "Ahmedabad",
      bhk: 4,
      type: "Residential",
      lat: 23.0303,
      lng: 72.5659,
      xPercent: 32,
      yPercent: 62,
      image: "https://www.addressbox.com/uploads/large/ae7734e3-9f21-4282-ac19-4d06723fc6ae_large.jpg",
      vastuScore: 94
    },
    {
      id: 2,
      name: "Super Shaligram",
      developer: "Shaligram Space",
      priceString: "₹ 1.83 Cr",
      locality: "Gota",
      city: "Ahmedabad",
      bhk: 3,
      type: "Residential",
      lat: 23.0894,
      lng: 72.5445,
      xPercent: 42,
      yPercent: 48,
      image: "https://www.addressbox.com/uploads/large/e7ecb703-9101-406e-b886-6892b1e26cf7_large.jpg",
      vastuScore: 89
    },
    {
      id: 3,
      name: "GIFT City Financial Tower",
      developer: "Swagat Group",
      priceString: "₹ 2.45 Cr",
      locality: "GIFT City",
      city: "Gandhinagar",
      bhk: 0,
      type: "Commercial",
      lat: 23.1600,
      lng: 72.6800,
      xPercent: 78,
      yPercent: 22,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      vastuScore: 92
    },
    {
      id: 4,
      name: "Sargasan Grandeur",
      developer: "Adani Realty",
      priceString: "₹ 1.35 Cr",
      locality: "Sargasan",
      city: "Gandhinagar",
      bhk: 3,
      type: "Residential",
      lat: 23.1895,
      lng: 72.6289,
      xPercent: 65,
      yPercent: 28,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      vastuScore: 91
    },
    {
      id: 5,
      name: "Sindhu Bhavan Signature",
      developer: "Shilp Group",
      priceString: "₹ 3.20 Cr",
      locality: "Sindhu Bhavan Road",
      city: "Ahmedabad",
      bhk: 0,
      type: "Commercial",
      lat: 23.0410,
      lng: 72.5050,
      xPercent: 28,
      yPercent: 55,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      vastuScore: 88
    },
    {
      id: 6,
      name: "Science City Horizon Villa",
      developer: "A Shridhar",
      priceString: "₹ 6.80 Cr",
      locality: "Science City",
      city: "Ahmedabad",
      bhk: 5,
      type: "Residential",
      lat: 23.0780,
      lng: 72.5020,
      xPercent: 24,
      yPercent: 42,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      vastuScore: 96
    }
  ];

  const filteredPins = localityPins.filter(pin => {
    if (selectedCity !== "All" && pin.city !== selectedCity) return false;
    if (activeCategory !== "ALL" && pin.type.toUpperCase() !== activeCategory) return false;
    return true;
  });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawingMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setDrawnBoundary(prev => [...prev, { x, y }]);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-10 text-white relative">
      
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-850 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600/20 text-blue-400 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30">
                Rama Interactive Map Search
              </span>
              <span className="text-slate-500 text-xs font-bold">• Ahmedabad & Gandhinagar GIS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-2 font-display">
              Polygon & Pin Map Explorer
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              Click property pins or enable draw mode to create custom boundary zones across GIFT City, SBR, Science City & Bopal.
            </p>
          </div>

          {/* City switcher */}
          <div className="mt-4 md:mt-0 flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
            {(["All", "Ahmedabad", "Gandhinagar"] as const).map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCity === c ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Map Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Bar on Left */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
            
            {/* Category Filters */}
            <div>
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-3">Property Category</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "All Properties", val: "ALL" },
                  { label: "Residential", val: "RESIDENTIAL" },
                  { label: "Commercial", val: "COMMERCIAL" }
                ].map(cat => (
                  <button
                    key={cat.val}
                    onClick={() => setActiveCategory(cat.val)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition ${
                      activeCategory === cat.val
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Boundary Draw Button */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Custom Polygon Boundary</span>
                <span className="text-[10px] text-blue-400 font-bold">{drawnBoundary.length} Points</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsDrawingMode(!isDrawingMode)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-1.5 ${
                    isDrawingMode
                      ? "bg-amber-500 text-slate-950 font-black shadow-lg animate-pulse"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{isDrawingMode ? "Click Map to Draw" : "Draw Boundary"}</span>
                </button>

                {drawnBoundary.length > 0 && (
                  <button
                    onClick={() => setDrawnBoundary([])}
                    className="p-2.5 bg-red-950/40 border border-red-800/40 text-red-400 rounded-xl hover:bg-red-900/40 transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Selected Property Card */}
            {selectedPin ? (
              <div className="bg-slate-950 border border-blue-500/30 p-4 rounded-2xl animate-in fade-in duration-200">
                <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
                  <img src={selectedPin.image} alt={selectedPin.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                    Zero Brokerage
                  </div>
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="absolute top-2 right-2 p-1 bg-slate-950/80 rounded-full text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                  <Compass className="w-3 h-3" />
                  <span>{selectedPin.vastuScore}% Vastu Score</span>
                </span>
                <h4 className="text-lg font-black text-white mt-0.5">{selectedPin.name}</h4>
                <p className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{selectedPin.locality}, {selectedPin.city}</span>
                </p>

                <div className="mt-4 flex justify-between items-center border-t border-slate-800 pt-3">
                  <span className="text-base font-black text-blue-400">{selectedPin.priceString}</span>
                  <Link href={`/property/${selectedPin.id}`}>
                    <Button variant="primary" size="sm">View Listing</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950/60 border border-dashed border-slate-800 p-6 rounded-2xl text-center space-y-2">
                <MapPin className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-semibold">Click any map pin to inspect property details</p>
              </div>
            )}

          </div>

          {/* Interactive Map Visual Panel on Right */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 relative overflow-hidden h-[600px] flex flex-col justify-between">
            
            {/* Map Canvas Window */}
            <div 
              onClick={handleMapClick}
              className="relative w-full h-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden cursor-crosshair group"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            >

              {/* Vector Road Lines Mock */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <path d="M 0 150 Q 200 120 400 300 T 800 450" fill="none" stroke="#2563eb" strokeWidth="4" />
                <path d="M 300 0 L 300 600" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 6" />
                <path d="M 600 0 L 600 600" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 0 350 L 800 350" fill="none" stroke="#f59e0b" strokeWidth="3" />
              </svg>

              {/* Zone Labels */}
              <div className="absolute top-4 left-4 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-blue-400 pointer-events-none">
                GIFT City Financial Corridor (Gandhinagar)
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-emerald-400 pointer-events-none">
                S.G. Highway & SBR Belt (Ahmedabad)
              </div>

              {/* Polygon Path Overlay */}
              {drawnBoundary.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <polygon
                    points={drawnBoundary.map(p => `${p.x}%,${p.y}%`).join(" ")}
                    fill="rgba(37, 99, 235, 0.25)"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>
              )}

              {/* Map Pins */}
              {filteredPins.map(pin => (
                <button
                  key={pin.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPin(pin);
                  }}
                  style={{ top: `${pin.yPercent}%`, left: `${pin.xPercent}%` }}
                  className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 hover:scale-125 cursor-pointer ${
                    selectedPin?.id === pin.id ? "scale-125 z-30" : ""
                  }`}
                >
                  <div className="relative group/pin">
                    <div className={`p-2.5 rounded-full shadow-xl font-bold text-xs flex items-center space-x-1 border ${
                      selectedPin?.id === pin.id
                        ? "bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-400/30"
                        : "bg-blue-600 text-white border-blue-400 hover:bg-blue-500"
                    }`}>
                      <MapPin className="w-4 h-4" />
                      <span className="hidden sm:inline font-extrabold text-[11px]">{pin.priceString}</span>
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover/pin:block bg-slate-900 border border-slate-800 text-white text-xs p-2 rounded-xl shadow-2xl whitespace-nowrap z-40">
                      <span className="font-extrabold block">{pin.name}</span>
                      <span className="text-[10px] text-slate-400">{pin.locality}, {pin.city}</span>
                    </div>
                  </div>
                </button>
              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
