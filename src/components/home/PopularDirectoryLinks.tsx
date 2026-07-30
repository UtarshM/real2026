"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PopularDirectoryLinks() {
  const [activeTab, setActiveTab] = useState<"rent" | "sale" | "commercial" | "projects">("rent");

  const rentLinks = [
    "Flats for Rent in Prahladnagar", "Flats for Rent in Thaltej", "Flats for Rent in Narol",
    "Flats for Rent in Vastral", "Flats for Rent in Bopal", "Flats for Rent in Gota",
    "Flats for Rent in SG Highway", "Flats for Rent in Science City", "Flats for Rent in GIFT City",
    "Flats for Rent in Sargasan", "Flats for Rent in Kudasan", "Flats for Rent in Randesan"
  ];

  const saleLinks = [
    "2 BHK Flat for Sale in Bopal", "3 BHK Flat for Sale in Gota", "4 BHK Luxury Flat in Bodakdev",
    "Flats for Sale in Science City", "Flats for Sale in Shela", "Flats for Sale in Jagatpur",
    "Bungalows for Sale in Thaltej", "Flats for Sale in Sargasan", "Flats for Sale in Kudasan",
    "Penthouse for Sale in Sola", "Flats for Sale in Randesan", "Villa for Sale in Koba"
  ];

  const commercialLinks = [
    "Commercial Office in GIFT City", "Office Space on SGRoad", "Showroom Space in Prahladnagar",
    "Shop for Rent in Bopal", "Office Space in Science City", "Commercial Property in Gota",
    "Office Space in Infocity Gandhinagar", "Showroom on C.G. Road", "Commercial Land in Changodar"
  ];

  const projectLinks = [
    "NORTH PARK (Phase-5)", "SHIVALIK EDGE", "The Storeys", "Venus Pashmina", "THE 31ST",
    "SHALIGRAM LUXURIA", "RIVIERA MAJESTICA", "Aranyam", "Super Shaligram", "Shilp Ananta"
  ];

  const currentLinks = 
    activeTab === "rent" ? rentLinks :
    activeTab === "sale" ? saleLinks :
    activeTab === "commercial" ? commercialLinks : projectLinks;

  return (
    <section className="bg-slate-50 py-12 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Popular Directory Links
            </h2>
            <p className="text-xs text-slate-500 font-medium">Browse properties by top localities and premier project names</p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                activeTab === "rent" ? "bg-[#ea580c] text-white" : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
              style={activeTab === "rent" ? { backgroundColor: "#ea580c" } : {}}
            >
              Flats for Rent
            </button>
            <button
              onClick={() => setActiveTab("sale")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                activeTab === "sale" ? "bg-[#ea580c] text-white" : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
              style={activeTab === "sale" ? { backgroundColor: "#ea580c" } : {}}
            >
              Flats for Sale
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                activeTab === "commercial" ? "bg-[#ea580c] text-white" : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
              style={activeTab === "commercial" ? { backgroundColor: "#ea580c" } : {}}
            >
              Commercial
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                activeTab === "projects" ? "bg-[#ea580c] text-white" : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
              style={activeTab === "projects" ? { backgroundColor: "#ea580c" } : {}}
            >
              Popular Projects
            </button>
          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-bold text-slate-700">
          {currentLinks.map((linkText, idx) => (
            <Link
              key={idx}
              href={`/search?query=${encodeURIComponent(linkText)}`}
              className="bg-white border border-slate-200 p-3 rounded-xl hover:border-[#ea580c] hover:text-[#ea580c] transition duration-200 text-ellipsis overflow-hidden whitespace-nowrap shadow-xs"
            >
              {linkText}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
