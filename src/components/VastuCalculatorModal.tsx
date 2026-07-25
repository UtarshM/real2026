"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Compass, CheckCircle2, AlertCircle, X, Sparkles } from "lucide-react";

interface VastuCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VastuCalculatorModal({ isOpen, onClose }: VastuCalculatorModalProps) {
  const [facing, setFacing] = useState<string>("NORTH_EAST");
  const [entrance, setEntrance] = useState<string>("NORTH_EAST");
  const [kitchen, setKitchen] = useState<string>("SOUTH_EAST");
  const [masterBedroom, setMasterBedroom] = useState<string>("SOUTH_WEST");
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateVastu = () => {
    let score = 50;
    const tips: string[] = [];

    if (facing === "NORTH_EAST" || facing === "NORTH" || facing === "EAST") {
      score += 20;
      tips.push("Excellent primary orientation! North/East facing invites positive solar energy and prosperity.");
    } else if (facing === "WEST") {
      score += 10;
      tips.push("West facing is favorable for business owners and commercial space investments.");
    } else {
      score += 5;
      tips.push("South facing properties can be balanced with a heavy wooden main door and brass pyramid thresholds.");
    }

    if (entrance === "NORTH_EAST" || entrance === "NORTH" || entrance === "EAST") {
      score += 15;
      tips.push("Main entrance in North-East quadrant maximizes Ishanya Kona (divine energy flow).");
    } else {
      tips.push("Ensure main entrance has adequate lighting and Om/Swastik auspicious symbols.");
    }

    if (kitchen === "SOUTH_EAST") {
      score += 15;
      tips.push("Kitchen in Agni Kona (South-East) ensures health and culinary vitality.");
    } else if (kitchen === "NORTH_WEST") {
      score += 10;
      tips.push("North-West kitchen is a good secondary choice (Air element quadrant).");
    } else {
      tips.push("Place cooking stove facing East to mitigate non-South-East kitchen placement.");
    }

    if (masterBedroom === "SOUTH_WEST") {
      score += 15;
      tips.push("Master Bedroom in Nairrutya Kona (South-West) promotes stability, leadership, and peace.");
    } else {
      tips.push("Avoid sleeping with head facing West or North to ensure restful sleep cycles.");
    }

    setCalculatedScore(Math.min(100, score));
    setRecommendations(tips);
  };

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
      className="fixed inset-0 z-[9999] overflow-y-auto p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 font-sans flex min-h-full items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto cursor-default my-auto space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Glow Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-display">Vastu Shastra Compliance Calculator</h3>
              <p className="text-xs text-slate-400">Calculate 100-point Vastu score for directional energy alignment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Main Orientation Facing</label>
            <select
              value={facing}
              onChange={(e) => setFacing(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="NORTH_EAST">North-East (Ishanya)</option>
              <option value="NORTH">North (Kuber Kona)</option>
              <option value="EAST">East (Indra Kona)</option>
              <option value="WEST">West (Varun Kona)</option>
              <option value="SOUTH">South (Yama Kona)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Main Door Entrance</label>
            <select
              value={entrance}
              onChange={(e) => setEntrance(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="NORTH_EAST">North-East Entrance</option>
              <option value="NORTH">North Entrance</option>
              <option value="EAST">East Entrance</option>
              <option value="SOUTH_EAST">South-East Entrance</option>
              <option value="WEST">West Entrance</option>
              <option value="SOUTH_WEST">South-West Entrance</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Kitchen Location</label>
            <select
              value={kitchen}
              onChange={(e) => setKitchen(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="SOUTH_EAST">South-East (Agni Kona) - Recommended</option>
              <option value="NORTH_WEST">North-West (Vayu Kona)</option>
              <option value="NORTH_EAST">North-East</option>
              <option value="SOUTH_WEST">South-West</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Master Bedroom</label>
            <select
              value={masterBedroom}
              onChange={(e) => setMasterBedroom(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="SOUTH_WEST">South-West (Nairrutya) - Recommended</option>
              <option value="NORTH_WEST">North-West</option>
              <option value="SOUTH_EAST">South-East</option>
              <option value="NORTH_EAST">North-East</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateVastu}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculate AI Vastu Score</span>
        </button>

        {/* Results */}
        {calculatedScore !== null && (
          <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Vastu Score Result</span>
                <h4 className="text-2xl font-black text-white flex items-center space-x-2 mt-1">
                  <span>{calculatedScore}%</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {calculatedScore >= 85 ? "Excellent Compliance" : calculatedScore >= 70 ? "Good Vastu Balance" : "Moderate Harmony"}
                  </span>
                </h4>
              </div>

              {/* Radial Meter Visual */}
              <div className="w-16 h-16 rounded-full border-4 border-amber-500 flex items-center justify-center bg-amber-500/10 text-amber-400 font-extrabold text-xs">
                {calculatedScore} / 100
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Expert Insights & Energy Tips:</p>
              {recommendations.map((tip, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
