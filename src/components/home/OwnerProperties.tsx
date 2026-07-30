"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, UserCheck } from "lucide-react";
import { initialProperties } from "@/data/properties";

export default function OwnerProperties() {
  const ownerListings = initialProperties.slice(0, 3);

  return (
    <section className="bg-white py-12 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-[#ea580c] font-black uppercase tracking-wider flex items-center space-x-1" style={{ color: "#ea580c" }}>
              <UserCheck className="w-4 h-4" />
              <span>Direct Owner Deals</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Owner Properties
            </h2>
          </div>

          <Link 
            href="/buy" 
            className="text-xs font-extrabold text-[#ea580c] hover:underline flex items-center space-x-1"
            style={{ color: "#ea580c" }}
          >
            <span>View All Owner Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ownerListings.map((p) => (
            <div 
              key={p.id} 
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between p-5"
            >
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                  <Image 
                    src={p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"} 
                    alt={p.name} 
                    fill 
                    className="object-cover" 
                    unoptimized 
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow flex items-center space-x-1">
                    <UserCheck className="w-3 h-3" />
                    <span>Direct Owner</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{p.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold flex items-center space-x-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
                    <span>{p.locality}, {p.city}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Price</span>
                  <span className="text-base font-black text-slate-900">{p.priceString}</span>
                </div>
                <Link 
                  href={`/property/${p.id}`} 
                  className="px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow transition"
                  style={{ backgroundColor: "#ea580c", color: "#ffffff" }}
                >
                  Contact Owner
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
