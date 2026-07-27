"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      featuredProjects: ["Arvind Uplands", "Arvind Aqua City", "Arvind Alcove", "Arvind Forreste"],
      reraVerified: true
    },
    {
      id: "hn-safal",
      name: "HN Safal",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "2010",
      totalProjects: 42,
      completed: 36,
      ongoing: 6,
      sqftDelivered: "15.0 Million Sq. Ft.",
      tagline: "Building Benchmark Infrastructure",
      headquarters: "Prahlad Nagar, Ahmedabad",
      featuredProjects: ["Applewoods Township", "Orchid Harmony", "Orchid Legacy", "Safal Prelude", "Mondeal Heights"],
      reraVerified: true
    },
    {
      id: "bakeri-group",
      name: "Bakeri Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1959",
      totalProjects: 65,
      completed: 58,
      ongoing: 7,
      sqftDelivered: "18.5 Million Sq. Ft.",
      tagline: "Trusted Real Estate Pioneers Since 1959",
      headquarters: "Ashram Road, Ahmedabad",
      featuredProjects: ["Bakeri City", "Bakeri Serenity", "Bakeri Sakar IX", "Bakeri Swara"],
      reraVerified: true
    },
    {
      id: "godrej-properties",
      name: "Godrej Properties",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1990",
      totalProjects: 85,
      completed: 70,
      ongoing: 15,
      sqftDelivered: "25.0 Million Sq. Ft.",
      tagline: "Innovation, Sustainability & Excellence",
      headquarters: "Gota SG Highway, Ahmedabad",
      featuredProjects: ["Godrej Garden City", "Godrej Vanaangan", "Godrej Green Glades", "Godrej Skyline"],
      reraVerified: true
    },
    {
      id: "ganesh-housing",
      name: "Ganesh Housing",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1991",
      totalProjects: 38,
      completed: 32,
      ongoing: 6,
      sqftDelivered: "22.0 Million Sq. Ft.",
      tagline: "Transforming Skylines Across Gujarat",
      headquarters: "Thaltej, Ahmedabad",
      featuredProjects: ["Malabar County", "Malabar Exotica", "Maple Tree Garden Homes", "Elita"],
      reraVerified: true
    },
    {
      id: "goyal-and-co",
      name: "Goyal & Co.",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1970",
      totalProjects: 75,
      completed: 68,
      ongoing: 7,
      sqftDelivered: "16.0 Million Sq. Ft.",
      tagline: "Crafting Timeless Structures",
      headquarters: "Corporate Road, Ahmedabad",
      featuredProjects: ["Riviera Prestige", "Orchid Whitefield", "Goyal Intercity", "Goyal Olive Greens"],
      reraVerified: true
    },
    {
      id: "swati-procon",
      name: "Swati Procon",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "2005",
      totalProjects: 22,
      completed: 18,
      ongoing: 4,
      sqftDelivered: "8.5 Million Sq. Ft.",
      tagline: "Uncompromising Architectural Precision",
      headquarters: "Ambli Road, Ahmedabad",
      featuredProjects: ["Swati Crimson", "Swati Premier", "Swati Symphony", "Swati Chrysantha"],
      reraVerified: true
    },
    {
      id: "vishwanath-group",
      name: "Vishwanath Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1996",
      totalProjects: 30,
      completed: 25,
      ongoing: 5,
      sqftDelivered: "7.2 Million Sq. Ft.",
      tagline: "Integrity, Quality & Community Focus",
      headquarters: "Shela, Ahmedabad",
      featuredProjects: ["Vishwanath Sarathya", "Vishwanath Sharanam", "Vishwanath Ishaan", "Vishwanath Skyline"],
      reraVerified: true
    },
    {
      id: "savvy-group",
      name: "Savvy Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1996",
      totalProjects: 40,
      completed: 34,
      ongoing: 6,
      sqftDelivered: "11.0 Million Sq. Ft.",
      tagline: "Eco-Friendly Smart Infrastructure",
      headquarters: "SG Highway, Ahmedabad",
      featuredProjects: ["Savvy Swaraj", "Savvy Strata", "Savvy Solaris", "Savvy GIFT Residences"],
      reraVerified: true
    },
    {
      id: "sangath-infrastructure",
      name: "Sangath Infrastructure",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1983",
      totalProjects: 35,
      completed: 30,
      ongoing: 5,
      sqftDelivered: "9.0 Million Sq. Ft.",
      tagline: "Sustainable Green Building Innovators",
      headquarters: "Motera, Ahmedabad",
      featuredProjects: ["Sangath IPL Smart Life", "Sangath Terraces", "Sangath GIFT Towers", "Sangath Gateway"],
      reraVerified: true
    },
    {
      id: "dev-aashish-group",
      name: "Dev Aashish Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "2008",
      totalProjects: 20,
      completed: 16,
      ongoing: 4,
      sqftDelivered: "5.0 Million Sq. Ft.",
      tagline: "Comfort Homes for Modern Living",
      headquarters: "Bopal, Ahmedabad",
      featuredProjects: ["Dev Aashish Divine", "Dev Aashish Pride", "Dev Aashish Sky", "Dev Aashish Meadows"],
      reraVerified: true
    },
    {
      id: "pacifica-companies",
      name: "Pacifica Companies",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1978",
      totalProjects: 50,
      completed: 42,
      ongoing: 8,
      sqftDelivered: "20.0 Million Sq. Ft.",
      tagline: "Global Real Estate Excellence",
      headquarters: "SG Highway, Ahmedabad",
      featuredProjects: ["Pacifica Reflections", "Pacifica North Enclave", "Pacifica Green Acres", "Pacifica Amara"],
      reraVerified: true
    },
    {
      id: "satyam-developers",
      name: "Satyam Developers",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "2002",
      totalProjects: 25,
      completed: 21,
      ongoing: 4,
      sqftDelivered: "6.5 Million Sq. Ft.",
      tagline: "Defining Skyline Architectural Marvels",
      headquarters: "Science City, Ahmedabad",
      featuredProjects: ["Satyam Skyline", "Satyam Sentossa", "Satyam Heights", "Satyam Residency"],
      reraVerified: true
    },
    {
      id: "kavisha-group",
      name: "Kavisha Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "2012",
      totalProjects: 18,
      completed: 14,
      ongoing: 4,
      sqftDelivered: "4.8 Million Sq. Ft.",
      tagline: "Creating Urban Living Masterpieces",
      headquarters: "South Bopal, Ahmedabad",
      featuredProjects: ["Kavisha Aer", "Kavisha Pebble Bay", "Kavisha The Canvas", "Kavisha Urbania"],
      reraVerified: true
    },
    {
      id: "deep-group",
      name: "Deep Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1994",
      totalProjects: 28,
      completed: 24,
      ongoing: 4,
      sqftDelivered: "8.0 Million Sq. Ft.",
      tagline: "Benchmark Residential & Commercial Solutions",
      headquarters: "Drive-In Road, Ahmedabad",
      featuredProjects: ["Deep Indraprasth", "Deep Shikhar", "Deep Prime"],
      reraVerified: true
    },
    {
      id: "siddhraj-developers",
      name: "Siddhraj Developers",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "2011",
      totalProjects: 16,
      completed: 12,
      ongoing: 4,
      sqftDelivered: "3.5 Million Sq. Ft.",
      tagline: "Gandhinagar Premier Real Estate",
      headquarters: "Kudasan, Gandhinagar",
      featuredProjects: ["Siddhraj Z Square", "Siddhraj Heights", "Siddhraj Residency"],
      reraVerified: true
    },
    {
      id: "hari-group",
      name: "Hari Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "2000",
      totalProjects: 22,
      completed: 19,
      ongoing: 3,
      sqftDelivered: "4.5 Million Sq. Ft.",
      tagline: "Quality Living for Every Family",
      headquarters: "Naranpura, Ahmedabad",
      featuredProjects: ["Hari Aangan", "Hari Om Residency", "Hari Heights"],
      reraVerified: true
    },
    {
      id: "brigade-group",
      name: "Brigade Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1986",
      totalProjects: 120,
      completed: 100,
      ongoing: 20,
      sqftDelivered: "30.0 Million Sq. Ft.",
      tagline: "Building Positive Experiences",
      headquarters: "GIFT City SEZ, Gandhinagar",
      featuredProjects: ["Brigade Gateway GIFT City", "Brigade International Financial Centre"],
      reraVerified: true
    },
    {
      id: "hiranandani-group",
      name: "Hiranandani Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1978",
      totalProjects: 90,
      completed: 80,
      ongoing: 10,
      sqftDelivered: "35.0 Million Sq. Ft.",
      tagline: "Creating Better Communities",
      headquarters: "GIFT City SEZ, Gandhinagar",
      featuredProjects: ["Hiranandani Signature GIFT City", "Hiranandani Financial Park"],
      reraVerified: true
    },
    {
      id: "sun-builders",
      name: "Sun Builders Group",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
      established: "1981",
      totalProjects: 45,
      completed: 40,
      ongoing: 5,
      sqftDelivered: "14.0 Million Sq. Ft.",
      tagline: "Setting Standards in Construction",
      headquarters: "Ashram Road, Ahmedabad",
      featuredProjects: ["Sun Westbank", "Sun Embark", "Sun Solace"],
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
              Explore track records, completed square footage, and active RERA registered projects from Gujarat&apos;s top developers.
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
                    <Image src={b.logo} alt={b.name} width={100} height={100} className="w-full h-full object-contain" />
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>RERA Verified</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white font-display group-hover:text-blue-400 transition">{b.name}</h3>
                  <p className="text-xs text-slate-400 italic mt-0.5 font-medium">&quot;{b.tagline}&quot;</p>
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
