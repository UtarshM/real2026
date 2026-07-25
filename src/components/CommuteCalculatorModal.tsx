"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Navigation, MapPin, Car, Train, Plane, Building2, X } from "lucide-react";

interface CommuteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  localityName?: string;
}

export default function CommuteCalculatorModal({
  isOpen,
  onClose,
  localityName = "Bopal, Ahmedabad"
}: CommuteCalculatorModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hubs = [
    { name: "SG Highway Corporate Hub", distance: "4.5 km", time: "10 mins", icon: Building2 },
    { name: "Sardar Vallabhbhai Patel Airport (AMD)", distance: "22.0 km", time: "35 mins", icon: Plane },
    { name: "Ahmedabad Junction Railway Station", distance: "16.5 km", time: "28 mins", icon: Train },
    { name: "GIFT City Financial Tower", distance: "31.0 km", time: "42 mins", icon: Navigation },
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
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Neighborhood Commute & Transit</h3>
            <p className="text-xs text-slate-400">Drive times & transit connectivity from <span className="text-blue-400 font-bold">{localityName}</span></p>
          </div>
        </div>

        {/* Transit Hubs Grid */}
        <div className="space-y-3">
          {hubs.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{h.name}</h4>
                    <span className="text-[10px] text-slate-500 font-semibold">{h.distance} via Drive</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    {h.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>,
    document.body
  );
}
