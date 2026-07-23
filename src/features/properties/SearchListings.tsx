"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { initialProperties } from "@/data/properties";
import { MapPin, SlidersHorizontal, Grid, List, PhoneCall, Sparkles, X, CheckCircle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchListingsProps {
  defaultPurpose?: "BUY" | "RENT";
  defaultType?: "RESIDENTIAL" | "COMMERCIAL" | "PLOT";
  defaultCategory?: string;
}

export default function SearchListings({
  defaultPurpose,
  defaultType,
  defaultCategory,
}: SearchListingsProps) {
  // Properties state
  const [properties, setProperties] = useState<any[]>([]);

  // Filtering Parameters
  const [purpose, setPurpose] = useState<"BUY" | "RENT">(defaultPurpose || "BUY");
  const [type, setType] = useState<"RESIDENTIAL" | "COMMERCIAL" | "PLOT">(defaultType || "RESIDENTIAL");
  const [category, setCategory] = useState(defaultCategory || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxBudget, setMaxBudget] = useState<number>(purpose === "RENT" ? 150000 : 80000000);
  const [selectedBhk, setSelectedBhk] = useState<string[]>([]);
  const [selectedFurnishing, setSelectedFurnishing] = useState<string[]>([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState<string[]>([]);
  const [isReadyToMove, setIsReadyToMove] = useState<boolean | null>(null);

  // Selected Property for Callback
  const [activeProperty, setActiveProperty] = useState<any | null>(null);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  // View state: Grid vs List
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Load initial property records
  useEffect(() => {
    // Map initialProperties formatting (matching DB expectations)
    const formatted = initialProperties.map((p) => ({
      ...p,
      purpose: p.purpose.toUpperCase() as "BUY" | "RENT",
      type: p.type.toUpperCase() as "RESIDENTIAL" | "COMMERCIAL" | "PLOT",
      category: p.subType,
    }));
    setProperties(formatted);
  }, []);

  const handleBhkChange = (bhk: string) => {
    setSelectedBhk(prev =>
      prev.includes(bhk) ? prev.filter(item => item !== bhk) : [...prev, bhk]
    );
  };

  const handleFurnishingChange = (f: string) => {
    setSelectedFurnishing(prev =>
      prev.includes(f) ? prev.filter(item => item !== f) : [...prev, f]
    );
  };

  const handlePostedByChange = (p: string) => {
    setSelectedPostedBy(prev =>
      prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
    );
  };

  // Filter Algorithm
  const filtered = properties.filter((p) => {
    // 1. Purpose check
    if (p.purpose !== purpose) return false;

    // 2. Property Type
    if (p.type !== type) return false;

    // 3. Category/Subtype
    if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;

    // 4. Locality text search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchLocality = p.locality.toLowerCase().includes(q);
      const matchDeveloper = p.developer.toLowerCase().includes(q);
      if (!matchName && !matchLocality && !matchDeveloper) return false;
    }

    // 5. Budget ceiling
    if (p.price > maxBudget) return false;

    // 6. BHK selector
    if (selectedBhk.length > 0) {
      if (!p.bhk) return false;
      const bhkStr = p.bhk >= 4 ? "4+" : String(p.bhk);
      if (!selectedBhk.includes(bhkStr)) return false;
    }

    // 7. Furnished status
    if (selectedFurnishing.length > 0) {
      if (!p.furnished) return false;
      if (!selectedFurnishing.includes(p.furnished)) return false;
    }

    // 8. Posted By
    if (selectedPostedBy.length > 0 && !selectedPostedBy.includes(p.postedBy)) return false;

    // 9. Construction Status
    if (isReadyToMove !== null) {
      const readyVal = p.possessionDate.toLowerCase().includes("ready") || p.ageOfConstruction?.toLowerCase().includes("ready");
      if (isReadyToMove && !readyVal) return false;
      if (!isReadyToMove && readyVal) return false;
    }

    return true;
  });

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSuccess(true);
    setTimeout(() => {
      setCallbackSuccess(false);
      setActiveProperty(null);
      setCallbackName("");
      setCallbackPhone("");
    }, 2000);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(0)} Lac`;
    return `₹ ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-slate-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Search header controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-900 pb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {filtered.length} Premium Verified Listings
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-semibold">
              Ahmedabad & Gandhinagar • Zero Brokerage • Direct Owner & Builder Listings
            </p>
          </div>
          
          <div className="flex items-center space-x-3 self-end">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border ${viewMode === "grid" ? "border-blue-600 bg-blue-600/10 text-white" : "border-slate-800 text-slate-500"} transition`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border ${viewMode === "list" ? "border-blue-600 bg-blue-600/10 text-white" : "border-slate-800 text-slate-500"} transition`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global parameter toggler bar */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
          <div className="bg-slate-950 p-1 rounded-xl flex border border-slate-800 w-full sm:w-auto">
            {(["BUY", "RENT"] as const).map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPurpose(p);
                  setMaxBudget(p === "RENT" ? 150000 : 80000000);
                }}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition capitalize cursor-pointer ${
                  purpose === p ? "bg-blue-600 text-white" : "text-slate-500"
                }`}
              >
                {p === "BUY" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 p-1 rounded-xl flex border border-slate-800 w-full sm:w-auto">
            {(["RESIDENTIAL", "COMMERCIAL", "PLOT"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition capitalize cursor-pointer ${
                  type === t ? "bg-blue-600 text-white" : "text-slate-500"
                }`}
              >
                {t.toLowerCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 flex-grow">
            <MapPin className="w-4 h-4 text-slate-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Locality, Project or Builder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-white text-xs sm:text-sm outline-none w-full font-semibold placeholder:text-slate-655"
            />
          </div>
        </div>

        {/* Dual layout panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Advanced Filters Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="font-bold text-sm uppercase tracking-wider text-slate-400">Advanced Filters</span>
              <button 
                onClick={() => {
                  setSelectedBhk([]);
                  setSelectedFurnishing([]);
                  setSelectedPostedBy([]);
                  setIsReadyToMove(null);
                  setMaxBudget(purpose === "RENT" ? 150000 : 80000000);
                  setSearchQuery("");
                }}
                className="text-xs text-blue-500 hover:text-blue-400 font-semibold"
              >
                Clear All
              </button>
            </div>

            {/* Budget range slider */}
            <div className="space-y-2">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Max Budget: {formatPrice(maxBudget)}
              </label>
              <input
                type="range"
                min={purpose === "RENT" ? 5000 : 1000000}
                max={purpose === "RENT" ? 250000 : 120000000}
                step={purpose === "RENT" ? 5000 : 1000000}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-blue-600 bg-slate-800 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* BHK select (Only for Residential) */}
            {type === "RESIDENTIAL" && (
              <div className="space-y-3">
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">BHK Type</label>
                <div className="flex flex-col space-y-2 text-xs sm:text-sm font-semibold text-slate-350">
                  {["1", "2", "3", "4+"].map((bhk) => (
                    <label key={bhk} className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition">
                      <input
                        type="checkbox"
                        checked={selectedBhk.includes(bhk)}
                        onChange={() => handleBhkChange(bhk)}
                        className="w-4 h-4 rounded border-slate-800 text-blue-650 focus:ring-blue-650 bg-slate-950 accent-blue-600"
                      />
                      <span>{bhk} BHK</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Furnishing Status */}
            {type === "RESIDENTIAL" && (
              <div className="space-y-3">
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Furnishing</label>
                <div className="flex flex-col space-y-2 text-xs sm:text-sm font-semibold text-slate-350">
                  {["Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
                    <label key={f} className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition">
                      <input
                        type="checkbox"
                        checked={selectedFurnishing.includes(f)}
                        onChange={() => handleFurnishingChange(f)}
                        className="w-4 h-4 rounded border-slate-800 text-blue-650 focus:ring-blue-650 bg-slate-950 accent-blue-600"
                      />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Posted By listing source */}
            <div className="space-y-3">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Listed By</label>
              <div className="flex flex-col space-y-2 text-xs sm:text-sm font-semibold text-slate-350">
                {["Owner", "Agent", "Builder"].map((p) => (
                  <label key={p} className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition">
                    <input
                      type="checkbox"
                      checked={selectedPostedBy.includes(p)}
                      onChange={() => handlePostedByChange(p)}
                      className="w-4 h-4 rounded border-slate-800 text-blue-650 focus:ring-blue-650 bg-slate-950 accent-blue-600"
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Possession construction status */}
            <div className="space-y-3">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Possession Status</label>
              <div className="flex flex-col space-y-2 text-xs sm:text-sm font-semibold text-slate-350">
                <label className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition">
                  <input
                    type="radio"
                    name="possession"
                    checked={isReadyToMove === true}
                    onChange={() => setIsReadyToMove(true)}
                    className="w-4 h-4 rounded-full border-slate-800 text-blue-650 focus:ring-blue-650 bg-slate-950 accent-blue-600"
                  />
                  <span>Ready to Move</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition">
                  <input
                    type="radio"
                    name="possession"
                    checked={isReadyToMove === false}
                    onChange={() => setIsReadyToMove(false)}
                    className="w-4 h-4 rounded-full border-slate-800 text-blue-650 focus:ring-blue-650 bg-slate-950 accent-blue-600"
                  />
                  <span>Under Construction</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition">
                  <input
                    type="radio"
                    name="possession"
                    checked={isReadyToMove === null}
                    onChange={() => setIsReadyToMove(null)}
                    className="w-4 h-4 rounded-full border-slate-800 text-blue-650 focus:ring-blue-650 bg-slate-950 accent-blue-600"
                  />
                  <span>Any</span>
                </label>
              </div>
            </div>

          </div>

          {/* Properties Listings Grid */}
          <div className="lg:col-span-3 space-y-6">
            {filtered.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center space-y-4">
                <Sparkles className="w-12 h-12 text-slate-650 mx-auto" />
                <h3 className="font-extrabold text-white text-lg">No properties match your filter</h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-xs mx-auto">
                  Try widening your budget filter, clearing BHK selectors, or updating your text search to find listings.
                </p>
                <Button 
                  onClick={() => {
                    setSelectedBhk([]);
                    setSelectedFurnishing([]);
                    setSelectedPostedBy([]);
                    setIsReadyToMove(null);
                    setMaxBudget(purpose === "RENT" ? 150000 : 80000000);
                    setSearchQuery("");
                  }}
                  variant="primary"
                  size="sm"
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className={`bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow transition duration-300 hover:border-blue-600/20 group hover-card-trigger ${
                      viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col"
                    }`}
                  >
                    {/* Visual slider block */}
                    <div className={`relative bg-slate-950 overflow-hidden ${viewMode === "list" ? "md:w-72 h-64 md:h-auto flex-shrink-0" : "h-56"}`}>
                      <img
                        src={p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"}
                        alt={p.name}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-103"
                      />
                      <span className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 text-slate-300 text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg shadow-sm">
                        {p.postedBy} Listing
                      </span>
                    </div>

                    {/* Information cards */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-blue-500 transition tracking-tight">
                              {p.name}
                            </h3>
                            <p className="text-slate-500 text-xs font-bold">By {p.developer}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm sm:text-base font-black text-blue-500 block">{formatPrice(p.price)}</span>
                            <span className="text-[9px] text-slate-500 font-extrabold uppercase">Zero Brokerage</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 text-xs font-semibold text-slate-400 mt-2">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          <span>{p.locality}, {p.city}</span>
                        </div>

                        {/* Highlighting tags */}
                        <div className="grid grid-cols-3 gap-2 bg-slate-950 border border-slate-800/40 p-3 rounded-xl text-[10px] font-bold text-slate-400 mt-4">
                          <div>
                            <span className="text-[9px] text-slate-600 block uppercase font-bold tracking-wider">Area</span>
                            <span>{p.area}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-600 block uppercase font-bold tracking-wider">Type</span>
                            <span>{p.category}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-600 block uppercase font-bold tracking-wider">Possession</span>
                            <span>{p.possessionDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex items-center space-x-3 pt-3 border-t border-slate-850">
                        <Link 
                          href={`/property/${p.id}`}
                          className="flex-1 text-center"
                        >
                          <Button variant="outline" size="sm" className="w-full">View Details</Button>
                        </Link>
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1 space-x-2"
                          onClick={() => setActiveProperty(p)}
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Call Seller</span>
                        </Button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Callback Contact modal overlay */}
      {activeProperty && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setActiveProperty(null)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-lg sm:text-xl text-white font-display mb-2">Request callback</h3>
            <p className="text-slate-450 text-xs font-semibold mb-6">
              You are requesting a secure callback for <span className="text-white font-bold">{activeProperty.name}</span> with zero agency commissions.
            </p>

            {callbackSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base">Request Submitted!</h4>
                <p className="text-slate-450 text-xs font-medium">The manager or property owner will call you back within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600"
                    placeholder="10-digit number"
                  />
                </div>
                <Button type="submit" variant="accent" className="w-full mt-6">
                  Verify & Request Callback
                </Button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
