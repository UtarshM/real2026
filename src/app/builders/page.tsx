"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AHMEDABAD_GANDHINAGAR_IMAGES } from "@/data/ahmedabad_gandhinagar_images";
import { Building2, Award, CheckCircle2, ShieldCheck, MapPin, ExternalLink, Search, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuilderProfile {
  id: string;
  name: string;
  logo: string;
  established: string;
  totalProjects: number;
  completed: number;
  ongoing: number;
  sqftDelivered: string;
  tagline: string;
  headquarters: string;
  featuredProjects: string[];
  reraVerified: boolean;
}

export default function BuildersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const builders: BuilderProfile[] = [
    {
      id: "shivalik-group",
      name: "Shivalik Group",
      logo: "https://www.addressbox.com/assets/images/A%20shridhar.png",
      established: "1998",
      totalProjects: 86,
      completed: 75,
      ongoing: 11,
      sqftDelivered: "12.5 Million Sq. Ft.",
      tagline: "Building Spaces That Define Elegance",
      headquarters: "Ambawadi, Ahmedabad",
      featuredProjects: ["Shivalik Edge (Bopal)", "Shivalik Parkview", "Shivalik Shilp"],
      reraVerified: true
    },
    {
      id: "shaligram-space",
      name: "Shaligram Space",
      logo: "https://www.addressbox.com/assets/images/Shaligram.png",
      established: "2006",
      totalProjects: 28,
      completed: 22,
      ongoing: 6,
      sqftDelivered: "6.8 Million Sq. Ft.",
      tagline: "Quality Living Spaces For Modern Families",
      headquarters: "SG Highway, Ahmedabad",
      featuredProjects: ["Super Shaligram (Gota)", "Shaligram Square", "Shaligram Corporate Park"],
      reraVerified: true
    },
    {
      id: "shilp-group",
      name: "Shilp Group",
      logo: "https://www.addressbox.com/assets/images/Shilp.png",
      established: "2004",
      totalProjects: 52,
      completed: 46,
      ongoing: 6,
      sqftDelivered: "9.2 Million Sq. Ft.",
      tagline: "Structuring Tomorrow's Landmarks",
      headquarters: "Sindhu Bhavan Road, Ahmedabad",
      featuredProjects: ["Sindhu Bhavan Signature Plaza", "Shilp Aaron", "Shilp Revanta"],
      reraVerified: true
    },
    {
      id: "swagat-group",
      name: "Swagat Group",
      logo: "https://www.addressbox.com/assets/images/Swagat%20group.png",
      established: "1995",
      totalProjects: 32,
      completed: 28,
      ongoing: 4,
      sqftDelivered: "5.5 Million Sq. Ft.",
      tagline: "Redefining Commercial & Residential Architecture",
      headquarters: "Kudasan, Gandhinagar",
      featuredProjects: ["GIFT City Financial Tower", "Swagat Holiday Homes", "Swagat Blossom"],
      reraVerified: true
    },
    {
      id: "adani-realty",
      name: "Adani Realty",
      logo: "https://www.addressbox.com/assets/images/Adani-Realty.png",
      established: "2010",
      totalProjects: 45,
      completed: 38,
      ongoing: 7,
      sqftDelivered: "18.0 Million Sq. Ft.",
      tagline: "Thinking Big, Doing Better",
      headquarters: "Shantigram, Ahmedabad",
      featuredProjects: ["Sargasan Grandeur", "Adani Shantigram Waterlily", "Adani Atelier Greens"],
      reraVerified: true
    },
    {
      id: "arvind-smartspaces",
      name: "Arvind SmartSpaces",
      logo: "https://www.addressbox.com/assets/images/arvind.png",
      established: "2009",
      totalProjects: 24,
      completed: 18,
      ongoing: 6,
      sqftDelivered: "4.2 Million Sq. Ft.",
      tagline: "Building Lifestyles, Creating Value",
      headquarters: "Naroda, Ahmedabad",
      featuredProjects: ["Arvind Citadel", "Arvind Alcove", "Arvind Bel Air"],
      reraVerified: true
    }
  ];

  const filteredBuilders = builders.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-950 min-h-screen py-10 text-white relative">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Title Header */}
        <div className="border-b border-slate-850 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600/20 text-blue-400 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30">
                100% RERA Verified Partners
              </span>
              <span className="text-slate-500 text-xs font-bold">• 50+ Builders Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-2 font-display">
              Premier Builders in Ahmedabad & Gandhinagar
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              Explore track records, completed square footage, and active RERA registered projects from Gujarat's top developers.
            </p>
          </div>

          {/* Search Builder Bar */}
          <div className="w-full md:w-72 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Developer or Area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white text-xs outline-none placeholder:text-slate-500 font-semibold"
            />
          </div>
        </div>

        {/* Builders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBuilders.map((b) => (
            <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition duration-300 flex flex-col justify-between space-y-6 group">
              
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center overflow-hidden">
                    <img src={b.logo} alt={b.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>RERA Verified</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white font-display group-hover:text-blue-400 transition">{b.name}</h3>
                  <p className="text-xs text-slate-400 italic mt-0.5 font-medium">"{b.tagline}"</p>
                </div>
              </div>

              {/* Stats Matrix */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Delivered</span>
                  <span className="font-extrabold text-blue-400">{b.sqftDelivered}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Completed</span>
                  <span className="font-extrabold text-emerald-400">{b.completed} Projects</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Ongoing</span>
                  <span className="font-extrabold text-amber-400">{b.ongoing} Projects</span>
                </div>
              </div>

              {/* Featured Projects list */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Key Developments:</span>
                <div className="flex flex-wrap gap-1.5">
                  {b.featuredProjects.map((proj, idx) => (
                    <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-lg">
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
                <span className="text-xs text-slate-400 font-medium flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{b.headquarters}</span>
                </span>

                <Link href={`/builder/${b.id}`}>
                  <Button variant="primary" size="sm" className="flex items-center space-x-1">
                    <span>View Inventory</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
