"use client";

import React from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { Building2, MapPin, Award, CheckCircle2, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuilderPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default function BuilderShowcasePage({ params }: BuilderPageProps) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams?.slug || "";

  const formatBuilderName = (str: string) => {
    if (!str) return "Verified Builder";
    return str
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const builderName = formatBuilderName(slug);

  // Filter listings matching builder name or developer info
  const builderProperties = initialProperties.filter(
    p => p.developer.toLowerCase().includes(slug.replace("-", " ").toLowerCase()) ||
         slug.replace("-", " ").toLowerCase().includes(p.developer.toLowerCase())
  );

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(0)} Lac`;
    return `₹ ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16 text-white relative font-sans">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Back link */}
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Builder Hero Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 font-extrabold text-xl font-display">
                <Building2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">{builderName}</h1>
                  <span className="bg-amber-500/10 border border-amber-500/25 text-amber-400 font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>RERA Certified</span>
                  </span>
                </div>
                <p className="text-slate-455 text-xs sm:text-sm font-semibold">
                  Premier Gujarat Real Estate Developer • Ahmedabad & Gandhinagar Portfolio
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-center border-t md:border-t-0 md:border-l border-slate-850 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-around">
              <div>
                <span className="text-[10px] text-slate-550 block uppercase font-bold tracking-wider">Completed</span>
                <span className="text-white text-lg font-black block mt-0.5">45+ Projects</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-550 block uppercase font-bold tracking-wider">Ongoing</span>
                <span className="text-blue-500 text-lg font-black block mt-0.5">8 Active</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-550 block uppercase font-bold tracking-wider">Zero Brokerage</span>
                <span className="text-green-500 text-lg font-black block mt-0.5">100% Direct</span>
              </div>
            </div>

          </div>
        </div>

        {/* Builder Listings Header */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">Active Projects by {builderName}</h2>
          <p className="text-slate-455 text-xs font-semibold">Explore verified residential apartments and commercial floor plans</p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(builderProperties.length > 0 ? builderProperties : initialProperties.slice(0, 3)).map(p => (
            <Link key={p.id} href={`/property/${p.id}`} className="block">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:scale-[1.01] transition shadow-lg flex flex-col justify-between h-full">
                
                {/* Image */}
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"})` }}
                >
                  <span className="absolute top-4 left-4 bg-blue-600 border border-blue-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded">
                    {p.purpose}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-xs sm:text-sm truncate text-white">{p.name}</h3>
                    <p className="text-slate-400 text-xs font-semibold flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 mr-1 flex-shrink-0" />
                      <span>{p.locality}, {p.city}</span>
                    </p>
                    <div className="flex items-center space-x-3 text-[10px] font-bold text-slate-500">
                      <span>{p.bhk} BHK</span>
                      <span>•</span>
                      <span>{p.area} Sq.Ft</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-850 flex justify-between items-center mt-4">
                    <span className="text-blue-550 text-sm font-black">{formatPrice(p.price)}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Direct Builder</span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
