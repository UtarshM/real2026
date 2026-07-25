"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { initialProperties } from "@/data/properties";
import { AHMEDABAD_GANDHINAGAR_IMAGES } from "@/data/ahmedabad_gandhinagar_images";
import { Search, MapPin, Building, ArrowRight, ShieldCheck, UserCheck, Key, PlusCircle, CheckCircle, ChevronDown, X, Mic, Compass, Calculator, Sparkles, Building2, Landmark, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentlyViewed from "@/components/RecentlyViewed";
import AiVoiceSearch from "@/components/AiVoiceSearch";
import VastuCalculatorModal from "@/components/VastuCalculatorModal";
import EmiCalculator from "@/components/EmiCalculator";

export default function HomePage() {
  const router = useRouter();

  // Search parameters states
  const [purpose, setPurpose] = useState<"BUY" | "RENT">("BUY");
  const [city, setCity] = useState("Ahmedabad");
  const [propertyCategory, setPropertyCategory] = useState<string>("RESIDENTIAL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Modal controls
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isVastuOpen, setIsVastuOpen] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { label: "Residential", value: "RESIDENTIAL" },
    { label: "Commercial", value: "COMMERCIAL" },
    { label: "PG/Co-living", value: "PG" },
    { label: "Plot", value: "PLOT" },
    { label: "Land", value: "LAND" },
    { label: "Bank Auction Property", value: "BANK_AUCTION", isNew: true }
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
      purpose,
      city,
      category: propertyCategory,
      query: searchQuery
    });
    router.push(`/search?${queryParams.toString()}`);
  };

  const faqData = [
    { q: "Is there any brokerage fee on AddressBox?", a: "No, AddressBox operates on a strict Zero Brokerage model. You deal directly with verified property owners and builders, saving lakhs in commissions." },
    { q: "How are properties verified on the platform?", a: "Every listing on AddressBox undergoes strict validation including RERA registration checks (GUJRERA / AUDA), map coordinate verification, and builder title verification." },
    { q: "Can I get home loan assistance through AddressBox?", a: "Yes! We partner with leading institutions like SBI, HDFC, ICICI, and Bank of Baroda to offer instant pre-approved loans with zero processing charges." },
    { q: "How does Rama AI Vastu Calculator work?", a: "Our AI Vastu tool evaluates direction, entrance placement, and kitchen/bedroom quadrants against ancient Vastu principles to generate a harmony score." },
    { q: "Which areas in Gandhinagar have high investment appreciation?", a: "Properties around GIFT City, Sargasan, Kudasan, and Randesan yield high rental returns and asset growth due to tech corridors and metro connectivity." }
  ];

  const trendingLocalities = [
    { name: "GIFT City", city: "Gandhinagar", count: 110, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.giftCity, href: "/search?city=Gandhinagar&query=GIFT+City" },
    { name: "Science City", city: "Ahmedabad", count: 145, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.scienceCity, href: "/search?city=Ahmedabad&query=Science+City" },
    { name: "Sindhu Bhavan Road", city: "Ahmedabad", count: 98, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.sbr, href: "/search?city=Ahmedabad&query=Sindhu+Bhavan+Road" },
    { name: "Sargasan", city: "Gandhinagar", count: 82, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.sargasan, href: "/search?city=Gandhinagar&query=Sargasan" },
    { name: "South Bopal", city: "Ahmedabad", count: 160, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.bopal, href: "/search?city=Ahmedabad&query=Bopal" }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-white relative">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[680px] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 z-10 border-b border-slate-900">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={AHMEDABAD_GANDHINAGAR_IMAGES.hero.ramarealtyBg} 
            alt="Real Estate Ahmedabad Gandhinagar"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Top Pill Header */}
          <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-blue-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-extrabold text-blue-400 tracking-wider uppercase">
              Ahmedabad & Gandhinagar #1 Property Portal
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight font-display leading-tight drop-shadow-xl">
            Right Property, <span className="text-blue-500">Right Now</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Find 100% RERA-verified residential flats, commercial offices, villas, and plots in Ahmedabad & Gandhinagar with zero brokerage.
          </p>

          {/* Integrated Search Box Console */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto glass-panel mt-8">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-6 border-b border-slate-800/80 pb-5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setPropertyCategory(cat.value)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-extrabold tracking-wider transition cursor-pointer flex items-center space-x-1.5 ${
                    propertyCategory === cat.value
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.isNew && (
                    <span className="badge-new">NEW</span>
                  )}
                </button>
              ))}
            </div>

            {/* Search Core Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Buy / Rent Purpose Toggle */}
              <div className="md:col-span-3 bg-slate-950 p-1.5 rounded-xl flex border border-slate-800">
                {(["BUY", "RENT"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPurpose(p)}
                    className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition capitalize cursor-pointer ${
                      purpose === p
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {p === "BUY" ? "Buy" : "Rent"}
                  </button>
                ))}
              </div>

              {/* City selector */}
              <div className="md:col-span-3">
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setSearchQuery("");
                  }}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
                >
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                </select>
              </div>

              {/* Locality Autocomplete input */}
              <div className="md:col-span-4 relative">
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 py-1.5 focus-within:border-blue-600">
                  <MapPin className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Locality, Project, Developer"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full bg-transparent text-white border-none py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 font-semibold"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-slate-500 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Autocomplete suggestions */}
                {showSuggestions && (
                  <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-slate-900 rounded-xl shadow-xl border border-slate-800 overflow-hidden text-left max-h-60 overflow-y-auto">
                    <div className="bg-slate-950 px-4 py-2 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      Top Localities in {city}
                    </div>
                    {filteredSuggestions.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setSearchQuery(loc);
                          setShowSuggestions(false);
                        }}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm text-slate-300 hover:bg-slate-800 font-medium text-left border-b border-slate-850 last:border-b-0 transition flex justify-between"
                      >
                        <span>{loc}</span>
                        <span className="text-[10px] text-blue-400 font-bold">{city}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search trigger button */}
              <div className="md:col-span-2 flex space-x-2">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3 px-4 rounded-xl transition flex items-center justify-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Button>
              </div>

            </div>

            {/* AI Voice & Vastu Tools Action Bar */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap justify-between items-center gap-3">
              
              {/* Voice search trigger */}
              <button
                onClick={() => setIsVoiceSearchOpen(true)}
                className="flex items-center space-x-2 bg-slate-950 hover:bg-slate-800 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                <Mic className="w-4 h-4 text-blue-400 animate-pulse" />
                <span>AI Voice Search (EN/HI/GU)</span>
              </button>

              {/* Vastu Score Calculator trigger */}
              <button
                onClick={() => setIsVastuOpen(true)}
                className="flex items-center space-x-2 bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>AI Vastu Calculator</span>
              </button>

            </div>

          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-xs sm:text-sm text-slate-300 font-semibold pt-4">
            <span className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Personal Property Manager</span>
            </span>
            <span className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>Zero Brokerage</span>
            </span>
            <span className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-emerald-400" />
              <span>100% RERA Verified Listings</span>
            </span>
          </div>

        </div>

      </section>

      {/* Builder Marquee */}
      <section className="bg-slate-900/50 py-6 overflow-hidden border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
          <h3 className="text-slate-500 font-extrabold text-[10px] uppercase tracking-widest">
            Partnered with 50+ Top Builders in Ahmedabad & Gandhinagar
          </h3>
        </div>
        <div className="relative w-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex space-x-12 items-center">
            {AHMEDABAD_GANDHINAGAR_IMAGES.builders.concat(AHMEDABAD_GANDHINAGAR_IMAGES.builders).map((b, index) => (
              <div key={index} className="flex items-center space-x-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-300">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Localities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest">Prime Micro-Markets</span>
            <h2 className="text-3xl font-black text-white font-display mt-1">Trending Localities in Ahmedabad & Gandhinagar</h2>
          </div>
          <Link href="/search" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 mt-4 md:mt-0">
            <span>Explore All Localities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {trendingLocalities.map((loc, idx) => (
            <Link key={idx} href={loc.href} className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-blue-500 transition duration-300">
              <div className="h-44 w-full relative">
                <Image src={loc.image} alt={loc.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-bold uppercase text-blue-400">{loc.city}</span>
                  <h4 className="text-base font-extrabold text-white">{loc.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{loc.count}+ Active Properties</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties Slider / Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">Verified Listings</span>
            <h2 className="text-3xl font-black text-white font-display mt-1">Featured Properties & Projects</h2>
          </div>
          <Link href="/buy" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 mt-4 md:mt-0">
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialProperties.map((prop) => (
            <div key={prop.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition duration-300 group flex flex-col justify-between">
              
              {/* Image & Badges */}
              <div className="relative h-56 w-full">
                <Image src={prop.images[0]} alt={prop.name} width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="bg-emerald-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Zero Brokerage</span>
                  {prop.isTrending && <span className="bg-blue-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Trending</span>}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <span className="text-xs text-amber-400 font-extrabold flex items-center space-x-1">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{prop.vastuScore}% Vastu Score</span>
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-0.5">{prop.name}</h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-400 flex items-center space-x-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{prop.locality}, {prop.city}</span>
                  </p>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Configuration</span>
                      <span>{prop.bhk ? `${prop.bhk} BHK` : prop.subType}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Super Area</span>
                      <span>{prop.area}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-400">
                    <span className="font-extrabold text-slate-300">RERA: </span>
                    <span className="truncate block font-mono">{prop.reraId}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Price</span>
                    <span className="text-lg font-black text-blue-400">{prop.priceString}</span>
                  </div>
                  <Link href={`/property/${prop.id}`}>
                    <Button variant="primary" size="sm">View Details</Button>
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* AddressBox Home Loan Calculator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <EmiCalculator />
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest">Got Questions?</span>
          <h2 className="text-3xl font-black text-white font-display mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left p-5 text-sm sm:text-base font-bold text-white flex justify-between items-center transition hover:text-blue-400"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === index ? "rotate-180 text-blue-400" : "text-slate-500"}`} />
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <AiVoiceSearch isOpen={isVoiceSearchOpen} onClose={() => setIsVoiceSearchOpen(false)} />
      <VastuCalculatorModal isOpen={isVastuOpen} onClose={() => setIsVastuOpen(false)} />

    </div>
  );
}
