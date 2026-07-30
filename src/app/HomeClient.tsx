"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, MapPin, Building2, Sparkles, Compass, ShieldCheck, UserCheck, Key, 
  ArrowRight, Phone, MessageSquare, Star, Award, TrendingUp, CheckCircle2, ChevronDown, Mic, X,
  BadgeAlert, Landmark, Shield, Video, Calendar, Handshake, Check, Flame, Layers, ExternalLink, BookOpen, ArrowUpRight, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AHMEDABAD_GANDHINAGAR_IMAGES } from "@/data/ahmedabad_gandhinagar_images";
import { initialProperties } from "@/data/properties";
import EmiCalculator from "@/components/EmiCalculator";
import AiVoiceSearch from "@/components/AiVoiceSearch";
import VastuCalculatorModal from "@/components/VastuCalculatorModal";

export default function HomeClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("Ahmedabad");
  const [category, setCategory] = useState("Residential");
  const [subType, setSubType] = useState("Flat/Apartment");
  const [purpose, setPurpose] = useState<"Buy" | "Rent">("Buy");
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isVastuOpen, setIsVastuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const partnerDevelopers = [
    { name: "Shivalik Group", projects: 86 },
    { name: "Shaligram Space", projects: 42 },
    { name: "Shilp Group", projects: 65 },
    { name: "Swagat Group", projects: 38 },
    { name: "Adani Realty", projects: 95 },
    { name: "Arvind SmartSpaces", projects: 54 },
    { name: "Binori Infrastructure", projects: 29 },
    { name: "Venus Infrastructure", projects: 48 },
  ];

  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Discover Verified Properties",
      desc: "Explore 100% RERA registered 2, 3, 4 BHK flats, commercial offices & villas in Ahmedabad & Gandhinagar with zero brokerage.",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      num: "02",
      icon: Video,
      title: "Watch 4K Video Walkthrough",
      desc: "Experience real video property tours inspected by local AddressBox specialists with complete floor plan and location breakdowns.",
      color: "bg-orange-50 text-orange-600 border-orange-200"
    },
    {
      num: "03",
      icon: Calendar,
      title: "Schedule Free Site Visit",
      desc: "Book direct builder site visits with transparent legal title reports and pre-approved home loan options from SBI, HDFC & ICICI.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      num: "04",
      icon: Handshake,
      title: "Close Zero Brokerage Deal",
      desc: "Deal directly with property owners and developers. Save lakhs in hidden brokerage fees with full registration support.",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    }
  ];

  const trendingProjects = initialProperties.slice(0, 3);
  const topRatedProjects = initialProperties.slice(3, 6);
  const highlightedProjects = initialProperties.slice(6, 9);
  const newProjects = initialProperties.slice(9, 12);

  const trendingLocalities = [
    { name: "GIFT City", city: "Gandhinagar", count: 110, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.giftCity, href: "/locality/gift-city" },
    { name: "Science City", city: "Ahmedabad", count: 145, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.scienceCity, href: "/locality/science-city" },
    { name: "Sindhu Bhavan Road", city: "Ahmedabad", count: 98, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.sbr, href: "/locality/sindhu-bhavan-road" },
    { name: "Sargasan", city: "Gandhinagar", count: 82, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.sargasan, href: "/locality/sargasan" },
    { name: "South Bopal", city: "Ahmedabad", count: 160, image: AHMEDABAD_GANDHINAGAR_IMAGES.localities.bopal, href: "/locality/bopal" }
  ];

  const blogPosts = [
    {
      title: "GUJRERA Buying Guide 2026: RERA Verification Checklist in Ahmedabad",
      date: "July 24, 2026",
      readTime: "5 min read",
      href: "/blog/rera-gujarat-guide",
      tag: "RERA Guide"
    },
    {
      title: "GIFT City Commercial Real Estate: Rental Yields & Tax Exemptions Explained",
      date: "July 20, 2026",
      readTime: "7 min read",
      href: "/blog",
      tag: "Investment Analysis"
    },
    {
      title: "SG Highway vs Sindhu Bhavan Road: High-End Residential Price Comparison",
      date: "July 15, 2026",
      readTime: "4 min read",
      href: "/blog",
      tag: "Market Trends"
    }
  ];

  const faqData = [
    { q: "Is there any brokerage fee on AddressBox?", a: "No, AddressBox operates on a strict Zero Brokerage model. You deal directly with verified property owners and builders, saving lakhs in commissions." },
    { q: "How are properties verified on the platform?", a: "Every listing on AddressBox undergoes strict validation including RERA registration checks (GUJRERA / AUDA), map coordinate verification, and builder title verification." },
    { q: "Can I get home loan assistance through AddressBox?", a: "Yes! We partner with leading institutions like SBI, HDFC, ICICI, and Bank of Baroda to offer instant pre-approved loans with zero processing charges." },
    { q: "How does AddressBox AI Vastu Calculator work?", a: "Our AI Vastu tool evaluates direction, entrance placement, and kitchen/bedroom quadrants against ancient Vastu principles to generate a harmony score." },
    { q: "Which areas in Gandhinagar have high investment appreciation?", a: "Properties around GIFT City, Sargasan, Kudasan, and Randesan yield high rental returns and asset growth due to tech corridors and metro connectivity." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans transition-colors duration-300">
      
      {/* PURE LIGHT HERO SECTION MATCHING IMAGE 2 EXACTLY */}
      <section className="relative min-h-[540px] sm:min-h-[580px] flex items-center justify-center bg-gradient-to-b from-sky-100/60 via-amber-50/40 to-slate-50 overflow-hidden py-14 border-b border-slate-200">
        
        {/* Bright Aerial City Skyline Background Photo matching Image 2 */}
        <Image
          src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1920&q=80"
          alt="Ahmedabad Sabarmati Skyline"
          fill
          priority
          className="object-cover object-center opacity-30 transform scale-105"
          unoptimized
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Main Title matching Image 2 */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-black text-orange-500 tracking-tight font-display">
              Right Property, Right Now
            </h1>

            <p className="text-sm sm:text-base text-slate-800 max-w-xl mx-auto font-bold leading-relaxed">
              A new home, a new office or any other property you need, its all here. Get started.
            </p>
          </div>

          {/* Search Card Container matching Image 2 */}
          <div className="max-w-3xl mx-auto space-y-0">
            
            {/* Top Category Segmented Tabs matching Image 2 */}
            <div className="flex items-center bg-white border border-slate-200 rounded-t-2xl overflow-x-auto shadow-sm">
              {topCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`flex-1 min-w-max px-4 py-3 text-xs sm:text-sm font-extrabold transition relative flex items-center justify-center space-x-1 border-r border-slate-200 last:border-r-0 cursor-pointer ${
                    category === cat.value
                      ? "text-orange-500 bg-white font-black border-b-2 border-b-orange-500"
                      : "text-slate-700 hover:text-orange-500 bg-slate-50/50"
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.isNew && (
                    <span className="absolute -top-2 right-2 bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                      NEW
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Solid Pure White Main Inputs Box matching Image 2 */}
            <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl p-4 sm:p-5 shadow-2xl space-y-4">
              
              <div className="flex flex-col md:flex-row items-center gap-3">
                
                {/* Buy / Rent Dropdown */}
                <div className="relative w-full md:w-28 flex-shrink-0">
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value as "Buy" | "Rent")}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-extrabold px-3 py-3 rounded-xl focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                {/* City Dropdown */}
                <div className="relative w-full md:w-36 flex-shrink-0">
                  <select
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setSearchQuery("");
                    }}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-extrabold px-3 py-3 rounded-xl focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Gandhinagar">Gandhinagar</option>
                  </select>
                </div>

                {/* Locality, Project, Developer Input */}
                <div className="relative flex-1 w-full">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Locality, Project, Developer"
                      className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 font-bold text-xs sm:text-sm pl-9 pr-8 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 transition"
                    />
                    <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                  </div>

                  {/* Autocomplete Dropdown */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto text-left">
                      <div className="p-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 bg-slate-50 flex justify-between items-center">
                        <span>Top Localities in {city}</span>
                        <button onClick={() => setShowSuggestions(false)} className="hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
                      </div>
                      {filteredSuggestions.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSearchQuery(loc);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-orange-50 text-xs font-bold text-slate-800 flex items-center justify-between border-b border-slate-100"
                        >
                          <span className="flex items-center space-x-2">
                            <MapPin className="w-3.5 h-3.5 text-orange-500" />
                            <span>{loc}</span>
                          </span>
                          <span className="text-[10px] text-blue-500 font-semibold">{city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* SubType Selector */}
                <div className="relative w-full md:w-40 flex-shrink-0">
                  <select
                    value={subType}
                    onChange={(e) => setSubType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-extrabold px-3 py-3 rounded-xl focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Flat/Apartment">Flat/Apartment</option>
                    <option value="Villa/House">Villa/House</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Plot/Land">Plot/Land</option>
                  </select>
                </div>

                {/* SEARCH Button matching Image 2 */}
                <Button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer flex-shrink-0"
                >
                  <span>SEARCH</span>
                </Button>

              </div>

              {/* Bottom Feature Badges with Green Icons matching Image 2 */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-800">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500 text-white" />
                  <span>Personal Property Manager</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500 text-white" />
                  <span>Zero Brokerage</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500 text-white" />
                  <span>Verified Property Listing</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Partner Developers Logo Marquee */}
      <section className="bg-white border-b border-slate-200 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400">
            Trusted by Gujarat&apos;s 100+ RERA Registered Developers
          </span>
          
          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
            {partnerDevelopers.map((dev, idx) => (
              <Link 
                key={idx}
                href="/builders"
                className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:border-orange-500 transition duration-300 cursor-pointer shadow-sm"
              >
                <Building2 className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-extrabold text-slate-800 font-display">{dev.name}</span>
                <span className="bg-slate-200 text-slate-700 text-[9px] font-black px-1.5 py-0.5 rounded-full">{dev.projects}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* STEP BY STEP HOW IT WORKS SECTION */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-orange-50 text-orange-600 border border-orange-200 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
              How AddressBox Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Find, inspect, and close your dream property deal with zero brokerage fees in 4 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative hover:border-orange-500 transition duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl border ${step.color}`}>
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-black text-slate-300 font-display">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 font-display">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center space-x-1.5 text-[11px] font-bold text-orange-600">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Zero Brokerage Guaranteed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Trending Projects */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-orange-600 uppercase font-black tracking-widest flex items-center space-x-1">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>Highest Demand Projects</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Trending Projects in Gujarat</h2>
            </div>
            <Link href="/buy" className="text-xs font-extrabold text-orange-600 hover:underline flex items-center space-x-1">
              <span>View All Trending</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingProjects.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 space-y-4 flex flex-col justify-between p-5">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                    <Image src={p.images?.[0]} alt={p.name} fill className="object-cover" unoptimized />
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow flex items-center space-x-1">
                      <Flame className="w-3 h-3 fill-white" />
                      <span>Trending #1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">{p.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold flex items-center space-x-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{p.locality}, {p.city}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Price</span>
                    <span className="text-base font-black text-slate-900">{p.priceString}</span>
                  </div>
                  <Link href={`/property/${p.id}`} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Top-Rated Vastu Projects */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-amber-600 uppercase font-black tracking-widest flex items-center space-x-1">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>5-Star Vastu Ratings</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Top-Rated Vastu Compliant Projects</h2>
            </div>
            <Link href="/buy" className="text-xs font-extrabold text-orange-600 hover:underline flex items-center space-x-1">
              <span>View Top Rated</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRatedProjects.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 space-y-4 flex flex-col justify-between p-5">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                    <Image src={p.images?.[0]} alt={p.name} fill className="object-cover" unoptimized />
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow flex items-center space-x-1">
                      <Compass className="w-3 h-3" />
                      <span>{p.vastuScore}% Vastu Score</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">{p.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold flex items-center space-x-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{p.locality}, {p.city}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Starting Price</span>
                    <span className="text-base font-black text-slate-900">{p.priceString}</span>
                  </div>
                  <Link href={`/property/${p.id}`} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Highlighted Zero Brokerage Projects */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-emerald-600 uppercase font-black tracking-widest flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Brokerage Guaranteed</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Highlighted Direct Developer Deals</h2>
            </div>
            <Link href="/buy" className="text-xs font-extrabold text-orange-600 hover:underline flex items-center space-x-1">
              <span>View All Direct Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlightedProjects.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 space-y-4 flex flex-col justify-between p-5">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                    <Image src={p.images?.[0]} alt={p.name} fill className="object-cover" unoptimized />
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow">
                      Direct Developer Price
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">{p.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold flex items-center space-x-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{p.locality}, {p.city}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Developer Price</span>
                    <span className="text-base font-black text-slate-900">{p.priceString}</span>
                  </div>
                  <Link href={`/property/${p.id}`} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. New Projects Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-blue-600 uppercase font-black tracking-widest flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>2026 New Launches</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">New RERA Registered Projects</h2>
            </div>
            <Link href="/buy" className="text-xs font-extrabold text-orange-600 hover:underline flex items-center space-x-1">
              <span>Explore New Launches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newProjects.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 space-y-4 flex flex-col justify-between p-5">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                    <Image src={p.images?.[0]} alt={p.name} fill className="object-cover" unoptimized />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow">
                      New RERA Launch
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">{p.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold flex items-center space-x-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{p.locality}, {p.city}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Launch Price</span>
                    <span className="text-base font-black text-slate-900">{p.priceString}</span>
                  </div>
                  <Link href={`/property/${p.id}`} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Top Localities Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-orange-600 uppercase font-black tracking-widest">Explore Hot Hubs</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Prime Investment Localities</h2>
            </div>
            <Link href="/sitemap/html" className="text-xs font-extrabold text-orange-600 hover:underline flex items-center space-x-1">
              <span>View All Localities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {trendingLocalities.map((loc, idx) => (
              <Link
                key={idx}
                href={loc.href}
                className="group relative h-64 rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-end p-5"
              >
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="relative z-10 space-y-1">
                  <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                    {loc.count}+ Listings
                  </span>
                  <h3 className="text-lg font-black text-white font-display leading-tight">{loc.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{loc.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 12. Projects by Top Developers */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-blue-600 uppercase font-black tracking-widest">Developers Directory</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Projects by Top Gujarat Developers</h2>
            </div>
            <Link href="/builders" className="text-xs font-extrabold text-orange-600 hover:underline flex items-center space-x-1">
              <span>View All 46 Builders</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {partnerDevelopers.map((dev, idx) => (
              <Link 
                key={idx}
                href={`/builders?search=${encodeURIComponent(dev.name)}`}
                className="bg-slate-50 border border-slate-200 p-5 rounded-2xl hover:border-orange-500 transition duration-300 space-y-2 group cursor-pointer shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <Building2 className="w-6 h-6 text-orange-500" />
                  <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">RERA Approved</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-orange-600 transition font-display">{dev.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{dev.projects} Active & Completed Projects</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 16. Real Estate Blog & Market Guides Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-orange-600 uppercase font-black tracking-widest flex items-center space-x-1">
                <BookOpen className="w-4 h-4 text-orange-600" />
                <span>Market Insights & Advisory</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">AddressBox Real Estate Blog</h2>
            </div>
            <Link href="/blog" className="text-xs font-extrabold text-orange-600 hover:underline flex items-center space-x-1">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <Link key={idx} href={post.href} className="group">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-orange-500 transition duration-300 shadow-sm h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase inline-block">
                      {post.tag}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-orange-600 transition leading-snug font-display">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pt-4 border-t border-slate-100">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Home Loan EMI Calculator Module */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900 font-display">Instant Home Loan EMI Calculator</h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">Calculate monthly installment estimates with pre-approved banking partner rates.</p>
          </div>
          <EmiCalculator />
        </section>

        {/* Frequently Asked Questions (FAQ) with Schema */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs text-orange-600 font-black uppercase tracking-widest">Got Questions?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 font-extrabold text-xs sm:text-sm text-slate-900 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-orange-500 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-200 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Voice Search Modal */}
      {isVoiceSearchOpen && <AiVoiceSearch isOpen={isVoiceSearchOpen} onClose={() => setIsVoiceSearchOpen(false)} />}
      
      {/* Vastu Calculator Modal */}
      {isVastuOpen && <VastuCalculatorModal isOpen={isVastuOpen} onClose={() => setIsVastuOpen(false)} />}

    </div>
  );
}
