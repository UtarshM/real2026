"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { Clock, MapPin } from "lucide-react";

export default function RecentlyViewed() {
  const [recentList, setRecentList] = useState<typeof initialProperties>([]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const ids: number[] = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
        if (ids.length > 0) {
          const matches = ids.map(id => initialProperties.find(p => p.id === id)).filter(Boolean) as typeof initialProperties;
          setRecentList(matches.slice(0, 4));
        }
      } catch {
        // fallback
      }
    });
  }, []);

  if (recentList.length === 0) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center space-x-2 border-b border-slate-850 pb-3">
        <Clock className="w-5 h-5 text-blue-500" />
        <h3 className="text-base sm:text-lg font-extrabold text-white font-display uppercase tracking-wider">Recently Viewed Properties</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentList.map(p => (
          <Link key={p.id} href={`/property/${p.id}`} className="block">
            <div className="bg-slate-950 border border-slate-850 hover:border-blue-600/40 rounded-2xl p-4 space-y-3 transition hover:scale-[1.02]">
              <div 
                className="h-32 rounded-xl bg-cover bg-center" 
                style={{ backgroundImage: `url(${p.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"})` }}
              />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white truncate">{p.name}</h4>
                <p className="text-slate-455 text-[11px] font-semibold flex items-center mt-0.5">
                  <MapPin className="w-3 h-3 text-blue-500 mr-1 flex-shrink-0" />
                  <span>{p.locality}, {p.city}</span>
                </p>
                <span className="text-blue-500 text-xs font-black block mt-1">
                  {p.priceString || (p.price ? `₹ ${(p.price / 100000).toFixed(0)} Lac` : "Contact Builder")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
