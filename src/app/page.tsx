"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import HeroSection from "@/components/home/HeroSection";
import PartnerDevelopers from "@/components/home/PartnerDevelopers";
import NewProjectsSlider from "@/components/home/NewProjectsSlider";
import PopularLocalities from "@/components/home/PopularLocalities";
import CategoryStats from "@/components/home/CategoryStats";
import OwnerProperties from "@/components/home/OwnerProperties";
import VideoWalkthroughReels from "@/components/home/VideoWalkthroughReels";
import PopularDirectoryLinks from "@/components/home/PopularDirectoryLinks";
import StickyRequirementTab from "@/components/StickyRequirementTab";
import ZeroBrokerageModal from "@/components/ZeroBrokerageModal";
import EmiCalculator from "@/components/EmiCalculator";
import VastuCalculatorModal from "@/components/VastuCalculatorModal";
import AiVoiceSearch from "@/components/AiVoiceSearch";
import { getAllProperties } from "@/data/properties";

export default function HomePage() {
  const router = useRouter();
  const [propertiesList, setPropertiesList] = useState<any[]>([]);

  React.useEffect(() => {
    setPropertiesList(getAllProperties());
  }, []);

  // Search parameters states matching addressbox.com
  const [purpose, setPurpose] = useState<"Buy" | "Rent">("Buy");
  const [city, setCity] = useState("Ahmedabad");
  const [category, setCategory] = useState("Residential");
  const [subType, setSubType] = useState("Flat/Apartment");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Modal controls
  const [isZeroBrokerageOpen, setIsZeroBrokerageOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isVastuOpen, setIsVastuOpen] = useState(false);

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

  const trendingProjects = propertiesList.slice(0, 3);
  const topRatedProjects = propertiesList.slice(3, 6);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans transition-colors duration-300 relative">
      
      {/* Right Edge Vertical Sticky Requirement Tab */}
      <StickyRequirementTab />

      {/* HERO SEARCH SECTION MATCHING ADDRESSBOX.COM */}
      <HeroSection onOpenZeroBrokerage={() => setIsZeroBrokerageOpen(true)} />

      {/* OUR PARTNERS MARQUEE SECTION */}
      <PartnerDevelopers />

      {/* POPULAR LOCALITIES SECTION */}
      <PopularLocalities />

      {/* STATISTICS SECTION */}
      <CategoryStats />

      {/* TRENDING PROJECTS SECTION */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-[#ea580c] uppercase font-black tracking-widest flex items-center space-x-1" style={{ color: "#ea580c" }}>
                <span>Highest Demand Projects</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">Trending Projects in Gujarat</h2>
            </div>
            <Link href="/buy" className="text-xs font-extrabold text-[#ea580c] hover:underline flex items-center space-x-1" style={{ color: "#ea580c" }}>
              <span>View All Trending →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingProjects.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 space-y-4 flex flex-col justify-between p-5">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                    <Image src={p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"} alt={p.name} fill className="object-cover" unoptimized />
                    <div className="absolute top-3 left-3 bg-[#ea580c] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow flex items-center space-x-1" style={{ backgroundColor: "#ea580c" }}>
                      <span>Trending #1</span>
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
                  <Link href={`/property/${p.id}`} className="px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow transition" style={{ backgroundColor: "#ea580c", color: "#ffffff" }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW PROJECTS SLIDER SECTION */}
      <NewProjectsSlider />

      {/* OWNER PROPERTIES SECTION */}
      <OwnerProperties />

      {/* VIDEO WALKTHROUGH REELS SECTION */}
      <VideoWalkthroughReels />

      {/* HOME LOAN EMI CALCULATOR MODULE */}
      <section className="bg-slate-50 border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-900 font-display">Instant Home Loan EMI Calculator</h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">Calculate monthly installment estimates with pre-approved banking partner rates.</p>
            </div>
            <EmiCalculator />
          </div>
        </div>
      </section>

      {/* POPULAR DIRECTORY LINKS SECTION */}
      <PopularDirectoryLinks />

      {/* LEAD CAPTURE ZERO BROKERAGE MODAL */}
      <ZeroBrokerageModal isOpen={isZeroBrokerageOpen} onClose={() => setIsZeroBrokerageOpen(false)} />

      {/* VOICE SEARCH MODAL */}
      {isVoiceSearchOpen && <AiVoiceSearch isOpen={isVoiceSearchOpen} onClose={() => setIsVoiceSearchOpen(false)} />}
      
      {/* VASTU CALCULATOR MODAL */}
      {isVastuOpen && <VastuCalculatorModal isOpen={isVastuOpen} onClose={() => setIsVastuOpen(false)} />}

    </div>
  );
}
