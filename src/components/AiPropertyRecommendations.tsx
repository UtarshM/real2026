"use client";

import React from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";

interface AiPropertyRecommendationsProps {
  currentId?: number | string;
}

export default function AiPropertyRecommendations({ currentId = 1 }: AiPropertyRecommendationsProps) {
  const recommendations = initialProperties.filter(p => String(p.id) !== String(currentId)).slice(0, 3);

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-orange-400" />
        <h3 className="text-xl font-black text-white font-display">People Who Liked This Also Viewed</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {recommendations.map(p => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 space-y-2 transition group">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">98% AI Match</span>
              <span className="font-black text-white">{p.price}</span>
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition line-clamp-1">{p.title}</h4>
            <p className="text-[11px] text-slate-400">{p.locality}, {p.city}</p>
            <Link href={`/property/${p.id}`} className="block pt-2 border-t border-slate-800 text-[10px] text-orange-400 font-bold hover:underline flex items-center justify-between">
              <span>View Property Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
