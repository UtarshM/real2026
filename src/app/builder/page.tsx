"use client";

import React, { useState } from "react";
import { Building, Layers, Eye, Download, Info, CheckCircle, Flame, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Unit {
  id: string;
  floor: number;
  type: string;
  status: "Available" | "Sold" | "Booked" | "Blocked";
  price: string;
}

export default function BuilderPortal() {
  const [activeTower, setActiveTower] = useState("Tower A");
  
  const towers = ["Tower A", "Tower B", "Tower C"];
  
  const [units, setUnits] = useState<Record<string, Unit[]>>({
    "Tower A": [
      { id: "101", floor: 1, type: "3 BHK", status: "Sold", price: "₹85 Lac" },
      { id: "102", floor: 1, type: "3 BHK", status: "Available", price: "₹86 Lac" },
      { id: "201", floor: 2, type: "3 BHK", status: "Booked", price: "₹88 Lac" },
      { id: "202", floor: 2, type: "3 BHK", status: "Sold", price: "₹89 Lac" },
      { id: "301", floor: 3, type: "4 BHK", status: "Available", price: "₹1.1 Cr" },
      { id: "302", floor: 3, type: "4 BHK", status: "Blocked", price: "₹1.15 Cr" }
    ],
    "Tower B": [
      { id: "101", floor: 1, type: "2 BHK", status: "Available", price: "₹60 Lac" },
      { id: "102", floor: 1, type: "2 BHK", status: "Sold", price: "₹61 Lac" },
      { id: "201", floor: 2, type: "2 BHK", status: "Available", price: "₹62 Lac" },
      { id: "202", floor: 2, type: "2 BHK", status: "Sold", price: "₹63 Lac" }
    ],
    "Tower C": [
      { id: "101", floor: 1, type: "4 BHK Penthouse", status: "Booked", price: "₹2.2 Cr" },
      { id: "102", floor: 1, type: "4 BHK Penthouse", status: "Blocked", price: "₹2.25 Cr" }
    ]
  });

  const constructionMilestones = [
    { stage: "Excavation & Foundations", progress: 100 },
    { stage: "RCC Structure Frame", progress: 90 },
    { stage: "Masonry & Brickwork", progress: 75 },
    { stage: "Internal Plaster & Plumbing", progress: 50 },
    { stage: "External Finishing & Paints", progress: 20 }
  ];

  const handleUnitStatusChange = (tower: string, unitId: string, newStatus: Unit["status"]) => {
    setUnits(prev => ({
      ...prev,
      [tower]: prev[tower].map(u => u.id === unitId ? { ...u, status: newStatus } : u)
    }));
  };

  const currentUnitsList = units[activeTower] || [];

  return (
    <div className="bg-slate-950 min-h-screen py-12 text-white relative">
      
      {/* Background glow overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/5 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-850 pb-6">
          <div>
            <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">Builder Real-Time Inventory Control</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-display">Developer Inventory Portal</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium leading-relaxed">
              Verify towers, floor configurations, block units occupancy, and construction progress dashboards.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
            {towers.map(t => (
              <button
                key={t}
                onClick={() => setActiveTower(t)}
                className={`px-4 py-2.5 text-xs font-bold rounded-lg uppercase tracking-wider transition cursor-pointer ${
                  activeTower === t ? "bg-blue-600 text-white shadow" : "text-slate-450 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Floor Map Layout Unit Grid on Left */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-4">
              <h3 className="font-extrabold text-base sm:text-lg text-white font-display uppercase tracking-wider flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-500" />
                <span>{activeTower} Unit Allocations Grid</span>
              </h3>
              
              {/* Labels explanation tags */}
              <div className="flex items-center space-x-3 text-[10px] font-black uppercase text-slate-500">
                <span className="flex items-center"><span className="w-2.5 h-2.5 bg-green-500/20 border border-green-500 rounded mr-1.5" />Available</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 bg-red-500/20 border border-red-500 rounded mr-1.5" />Sold</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 bg-blue-500/20 border border-blue-500 rounded mr-1.5" />Booked</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 bg-slate-800 border border-slate-700 rounded mr-1.5" />Blocked</span>
              </div>
            </div>

            {/* Units Layout rendering grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentUnitsList.map(u => {
                const isAvailable = u.status === "Available";
                const isSold = u.status === "Sold";
                const isBooked = u.status === "Booked";
                const isBlocked = u.status === "Blocked";

                return (
                  <div 
                    key={u.id}
                    className={`border rounded-2xl p-5 space-y-3 relative group transition flex flex-col justify-between ${
                      isAvailable 
                        ? "border-green-500/20 bg-green-500/5 hover:border-green-500/40" 
                        : isSold 
                        ? "border-red-500/20 bg-red-500/5 hover:border-red-500/40"
                        : isBooked 
                        ? "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40"
                        : "border-slate-850 bg-slate-950 hover:border-slate-750"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-white text-base font-black">Flat {u.id}</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Floor {u.floor}</span>
                      </div>
                      <p className="text-slate-400 text-xs font-semibold">{u.type}</p>
                      <span className="text-blue-500 text-xs sm:text-sm font-black block pt-1.5">{u.price}</span>
                    </div>

                    {/* Status picker select control */}
                    <div className="pt-3 border-t border-slate-850 mt-4">
                      <label className="block text-[9px] text-slate-500 font-black uppercase tracking-wider mb-1.5">Action Status</label>
                      <select
                        value={u.status}
                        onChange={(e) => handleUnitStatusChange(activeTower, u.id, e.target.value as Unit["status"])}
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg py-1 px-2 outline-none focus:border-blue-600 cursor-pointer text-[10px] sm:text-xs font-bold"
                      >
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                        <option value="Booked">Booked</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Construction Progress Sliders on Right */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Milestones Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5">
              <h3 className="font-extrabold text-base text-white font-display uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-5 h-5 text-blue-500" />
                <span>Construction progress</span>
              </h3>

              <div className="space-y-4">
                {constructionMilestones.map((m, idx) => (
                  <div key={idx} className="space-y-1 text-xs sm:text-sm font-semibold">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-350">{m.stage}</span>
                      <span className="text-blue-500 font-bold">{m.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                      <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document brochure downloads card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="font-extrabold text-base text-white font-display uppercase tracking-wider">Project Documents</h3>
              <p className="text-slate-450 text-xs font-semibold leading-relaxed">
                Download verified building brochures, price sheets, and RERA approval layouts.
              </p>
              
              <div className="space-y-2 pt-2 text-xs sm:text-sm font-semibold text-slate-300">
                <button 
                  onClick={() => alert("Downloading Project Brochure PDF...")}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-850/50 border border-slate-850 hover:border-slate-800 rounded-xl transition cursor-pointer"
                >
                  <span className="flex items-center"><Download className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />Project Brochure</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => alert("Downloading Unit Pricing PDF Layout...")}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-850/50 border border-slate-850 hover:border-slate-800 rounded-xl transition cursor-pointer"
                >
                  <span className="flex items-center"><Download className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />Pricing Layout Sheet</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
