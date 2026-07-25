"use client";

import React, { useState } from "react";
import { Flame, ArrowDownRight, X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PriceDropAlertBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-amber-600 to-blue-600 text-white py-2.5 px-4 text-xs font-extrabold relative shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        <div className="flex items-center space-x-2">
          <span className="bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center space-x-1">
            <Flame className="w-3 h-3 fill-white" />
            <span>Hot Price Drop</span>
          </span>
          <span>
            Shivalik Edge 4 BHK price reduced by <span className="underline decoration-2">₹ 4.0 Lakhs</span> in Bopal!
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/property/1"
            className="inline-flex items-center space-x-1 bg-white text-slate-950 px-3 py-1 rounded-lg text-xs font-black hover:bg-slate-100 transition shadow cursor-pointer"
          >
            <span>View Deal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
