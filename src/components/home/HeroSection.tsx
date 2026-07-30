"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Check } from "lucide-react";

interface HeroSectionProps {
  onOpenZeroBrokerage: () => void;
}

export default function HeroSection({ onOpenZeroBrokerage }: HeroSectionProps) {
  const router = useRouter();

  const [purpose, setPurpose] = useState<"Buy" | "Rent">("Buy");
  const [city, setCity] = useState("Ahmedabad");
  const [category, setCategory] = useState("Residential");
  const [subType, setSubType] = useState("Flat/Apartment");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const topCategories = [
    { label: "Residential", value: "Residential" },
    { label: "Commercial", value: "Commercial" },
    { label: "PG/Co-living", value: "PG/Co-living" },
    { label: "Plot", value: "Plot" },
    { label: "Land", value: "Land" },
    { label: "Bank Auction Property", value: "Bank Auction Property", isNew: true }
  ];

  const suggestions: Record<string, string[]> = {
    Ahmedabad: ["Bopal", "Gota", "Prahladnagar", "Science City", "Sindhu Bhavan Road", "Shela", "Jagatpur", "Vastrapur", "Bodakdev", "Sola"],
    Gandhinagar: ["GIFT City", "Sargasan", "Kudasan", "Randesan", "Koba", "Raysan", "Infocity", "PDPU Road"]
  };

  const filteredSuggestions = searchQuery
    ? suggestions[city].filter(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()))
    : suggestions[city];

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      purpose: purpose.toUpperCase(),
      city,
      category,
      subType,
      query: searchQuery
    });
    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <section className="relative min-h-[580px] sm:min-h-[620px] flex items-center justify-center bg-slate-900 overflow-hidden py-16 font-sans">
      
      {/* Sabarmati Riverfront Background Photo matching addressbox.com */}
      <Image
        src="https://www.addressbox.com/assets/images/home-page-new-bg.jpg"
        alt="Ahmebad and Gandhinagar Properties"
        fill
        priority
        className="object-cover object-center opacity-85"
        unoptimized
      />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Title & Subtitle matching addressbox.com */}
        <div className="space-y-3">
          <h1 
            className="text-4xl sm:text-6xl font-black tracking-tight font-display text-[#ea580c] drop-shadow-sm"
            style={{ color: "#ea580c" }}
          >
            Right Property, Right Now
          </h1>

          <p className="text-sm sm:text-base text-slate-800 max-w-xl mx-auto font-extrabold leading-relaxed">
            A new home, a new office or any other property you need, its all here. Get started.
          </p>
        </div>

        {/* Hero Search Box Wrapper */}
        <div className="w-full max-w-4xl mx-auto space-y-0">
          
          {/* Connected Category Tab Bar matching Image 2 */}
          <div className="w-full max-w-3xl mx-auto flex items-center bg-white border border-slate-200/90 rounded-t-2xl shadow-xs relative z-20 mb-[-1px] px-1">
            {topCategories.map((cat, index) => {
              const isFirst = index === 0;
              const isLast = index === topCategories.length - 1;
              const isActive = category === cat.value;

              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`relative flex-1 py-3 px-2 sm:px-3 text-[11px] sm:text-xs md:text-sm font-bold transition-all duration-150 flex items-center justify-center border-r border-slate-200/80 last:border-r-0 cursor-pointer whitespace-nowrap ${
                    isFirst ? "rounded-tl-2xl" : ""
                  } ${isLast ? "rounded-tr-2xl" : ""} ${
                    isActive
                      ? "text-[#ea580c] bg-white font-black border-t-2 border-t-[#ea580c]"
                      : "text-slate-700 hover:text-[#ea580c] bg-white/95"
                  }`}
                  style={isActive ? { color: "#ea580c", borderTopColor: "#ea580c" } : {}}
                >
                  <span>{cat.label}</span>

                  {/* NEW Badge pill floating cleanly on top right edge without touching text */}
                  {cat.isNew && (
                    <span 
                      className="absolute -top-3 right-1 bg-[#ea580c] text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-sm border border-white tracking-wider pointer-events-none z-30"
                      style={{ backgroundColor: "#ea580c", color: "#ffffff" }}
                    >
                      NEW
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Solid White Main Search Card matching Image 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-100 relative z-10">
            
            {/* Single Horizontal Input Row (Matching Image 2 Exactly) */}
            <div className="flex flex-col md:flex-row items-center border border-slate-200/90 rounded-xl p-1 bg-white shadow-xs w-full">
              
              {/* Field 1: Buy / Rent Select */}
              <div className="w-full md:w-24 flex items-center relative px-3 py-2">
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as "Buy" | "Rent")}
                  className="w-full bg-transparent text-slate-900 text-xs sm:text-sm font-bold focus:outline-none cursor-pointer appearance-none pr-4"
                >
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
              </div>

              {/* Vertical Line 1 */}
              <div className="hidden md:block h-6 w-[1px] bg-slate-200 flex-shrink-0" />

              {/* Field 2: City Select */}
              <div className="w-full md:w-36 flex items-center relative px-3 py-2">
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setSearchQuery("");
                  }}
                  className="w-full bg-transparent text-slate-900 text-xs sm:text-sm font-bold focus:outline-none cursor-pointer appearance-none pr-4"
                >
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
              </div>

              {/* Vertical Line 2 */}
              <div className="hidden md:block h-6 w-[1px] bg-slate-200 flex-shrink-0" />

              {/* Field 3: Locality, Project, Developer Input with Search Glass on Right */}
              <div className="w-full md:flex-1 relative px-3 py-2">
                <div className="relative flex items-center justify-between">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Locality, Project, Developer"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 font-medium text-xs sm:text-sm pr-6 focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0 ml-1 pointer-events-none" />
                </div>

                {/* Autocomplete Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto text-left">
                    <div className="p-2.5 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 bg-slate-50 flex justify-between items-center border-b border-slate-100">
                      <span>Top Localities in {city}</span>
                      <button onClick={() => setShowSuggestions(false)} className="hover:text-slate-600 font-bold">✕</button>
                    </div>
                    {filteredSuggestions.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSearchQuery(loc);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-orange-50 text-xs font-bold text-slate-800 flex items-center justify-between border-b border-slate-100 cursor-pointer"
                      >
                        <span>{loc}</span>
                        <span className="text-[10px] text-orange-600 font-extrabold">{city}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Vertical Line 3 */}
              <div className="hidden md:block h-6 w-[1px] bg-slate-200 flex-shrink-0" />

              {/* Field 4: Property SubType Select */}
              <div className="w-full md:w-40 flex items-center relative px-3 py-2">
                <select
                  value={subType}
                  onChange={(e) => setSubType(e.target.value)}
                  className="w-full bg-transparent text-slate-900 text-xs sm:text-sm font-medium focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="Flat/Apartment">Flat/Apartment</option>
                  <option value="Villa/House">Villa/House</option>
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="Plot/Land">Plot/Land</option>
                </select>
              </div>

              {/* Field 5: SEARCH Button */}
              <button
                onClick={handleSearch}
                className="w-full md:w-auto px-7 py-2.5 bg-[#ea580c] hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-sm transition duration-200 flex items-center justify-center flex-shrink-0 cursor-pointer md:ml-1"
                style={{ backgroundColor: "#ea580c", color: "#ffffff" }}
              >
                <span>SEARCH</span>
              </button>

            </div>

            {/* Bottom Green Circular Checkmarks matching Image 2 */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-slate-700">
              
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Personal Property Manager</span>
              </div>

              <button 
                onClick={onOpenZeroBrokerage}
                className="flex items-center space-x-2 hover:text-[#ea580c] transition cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Zero Brokerage</span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Verified Property Listing</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
