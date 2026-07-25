"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { initialProperties, getAllProperties } from "@/data/properties";
import { siteConfig } from "@/config/siteConfig";
import { 
  MapPin, CheckCircle, Calculator, ChevronLeft, ChevronRight, 
  Download, PhoneCall, Building2, Layers, Calendar, User, 
  CheckCircle2, X, Compass, Maximize2, ShieldAlert, Sparkles, MessageCircle, FileCheck, Share2, Landmark, Check, Play, Video, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRealEstateSchema, getVideoObjectSchema } from "@/lib/seo";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const resolvedParams = React.use(params);
  const propertyId = Number(resolvedParams.id);

  const [property, setProperty] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  
  // Modals
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showReraModal, setShowReraModal] = useState(false);
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const all = getAllProperties();
      const found = all.find(p => Number(p.id) === propertyId);
      if (found) {
        setProperty(found);
        try {
          const existing: number[] = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
          const updated = Array.from(new Set([found.id, ...existing]));
          localStorage.setItem("recently_viewed", JSON.stringify(updated));
        } catch {}
      }
    });
  }, [propertyId]);

  if (!property) {
    return (
      <div className="bg-slate-950 min-h-screen py-16 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-xs sm:text-sm font-semibold">Locating verified property details for Rama Realty...</p>
        </div>
      </div>
    );
  }

  const handleModalForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowBrochureModal(false);
      setShowManagerModal(false);
    }, 2000);
  };

  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
  const propertyImages = (property?.images || []).filter((img: any) => typeof img === "string" && img.trim().length > 0);
  if (propertyImages.length === 0) {
    propertyImages.push(FALLBACK_IMAGE);
  }

  const videoData = {
    title: `${property.name} ${property.locality} ${property.city} Video Walkthrough`,
    description: `Full 4K video walkthrough tour of ${property.name} in ${property.locality}, ${property.city} by ${siteConfig.name}.`,
    thumbnailUrl: propertyImages[0],
    uploadDate: "2026-01-15",
    contentUrl: "https://www.youtube.com/watch?v=mock_rama_realty_walkthrough"
  };

  const videoSchema = getVideoObjectSchema(videoData);

  return (
    <div className="bg-slate-950 min-h-screen py-10 text-white relative font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getRealEstateSchema(property))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoSchema)
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb & Trust Action Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-850 pb-4">
          <Link href="/" className="flex items-center space-x-1.5 text-slate-400 hover:text-white text-xs font-bold transition">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Property Search</span>
          </Link>

          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center space-x-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-400 px-3 py-1.5 rounded-xl text-xs font-extrabold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Inspected by Rama Realty Specialist</span>
            </div>

            <button
              onClick={() => setShowReraModal(true)}
              className="flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-extrabold transition hover:bg-emerald-500/30"
            >
              <FileCheck className="w-4 h-4" />
              <span>100% GUJRERA Verified</span>
            </button>
            
            <button
              onClick={() => setShowManagerModal(true)}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Rama Realty Agent</span>
            </button>
          </div>
        </div>

        {/* Gallery & Core Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Slideshow */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 group">
              <Image
                src={propertyImages[activeImage] || FALLBACK_IMAGE}
                alt={property.name}
                width={1200}
                height={800}
                className="w-full h-full object-cover transition duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase shadow">Zero Brokerage</span>
                <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase shadow">{property.city}</span>
              </div>

              {/* Slider Prev Next */}
              {propertyImages.length > 1 && (
                <div className="absolute inset-y-0 inset-x-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => setActiveImage((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1))}
                    className="p-2.5 bg-slate-950/80 hover:bg-slate-900 text-white rounded-full shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1))}
                    className="p-2.5 bg-slate-950/80 hover:bg-slate-900 text-white rounded-full shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-xs text-amber-400 font-extrabold flex items-center space-x-1">
                    <Compass className="w-4 h-4" />
                    <span>{property.vastuScore}% Vastu Score Compliant</span>
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black text-white font-display mt-0.5">{property.name}</h1>
                  <p className="text-xs sm:text-sm text-slate-300 flex items-center space-x-1 mt-1">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>{property.address}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {propertyImages.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                    activeImage === idx ? "border-blue-500 scale-105" : "border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="thumb" width={200} height={150} className="w-full h-full object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>

          {/* Right Pricing & Quick Inquiry Console */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Direct Developer Price</span>
              <h2 className="text-3xl sm:text-4xl font-black text-blue-400 mt-1 font-display">{property.priceString}</h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">No hidden commission • Zero brokerage terms</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block font-bold uppercase">Configuration</span>
                <span className="font-extrabold text-slate-200">{property.bhk ? `${property.bhk} BHK` : property.subType}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block font-bold uppercase">Super Area</span>
                <span className="font-extrabold text-slate-200">{property.area}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block font-bold uppercase">Possession</span>
                <span className="font-extrabold text-emerald-400">{property.possessionDate}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block font-bold uppercase">Developer</span>
                <span className="font-extrabold text-slate-200">{property.developer}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setShowManagerModal(true)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Schedule Guided Site Visit with Rama Agent</span>
              </button>

              <button
                onClick={() => setShowBrochureModal(true)}
                className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Verified PDF Brochure</span>
              </button>
            </div>

          </div>

        </div>

        {/* Video Walkthrough Differentiation Module */}
        <div className="bg-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <span className="text-xs text-blue-400 font-extrabold uppercase tracking-widest flex items-center space-x-1.5">
                <Video className="w-4 h-4" />
                <span>Rama Realty Video-First Asset</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">4K Guided Video Walkthrough Tour</h3>
            </div>
            <span className="bg-red-600/20 text-red-400 border border-red-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1.5 w-fit">
              <Play className="w-3.5 h-3.5 fill-red-400" />
              <span>Watch Property Tour Video</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Video Player Card */}
            <div className="lg:col-span-7 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group flex items-center justify-center">
              <Image src={propertyImages[0]} alt="video thumbnail" width={800} height={600} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition duration-500" unoptimized />
              <button 
                onClick={() => alert(`Playing ${property.name} video walkthrough by Rama Realty.`)}
                className="absolute p-5 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-2xl transition transform group-hover:scale-110"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 p-3 rounded-xl backdrop-blur text-xs">
                <p className="font-bold text-slate-200">Video Walkthrough hosted by Rama Realty Local Agent</p>
              </div>
            </div>

            {/* Indexed Video Transcript Text (For Video Pack & Organic Ranking Indexability) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Video Walkthrough Transcript Summary:</h4>
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed font-mono max-h-64 overflow-y-auto">
                <p><strong className="text-blue-400">[00:05]</strong> &quot;Welcome to {property.name} in {property.locality}, {property.city}. Today we are walking through this spacious {property.bhk ? `${property.bhk} BHK` : property.subType} residence...&quot;</p>
                <p><strong className="text-blue-400">[00:45]</strong> &quot;Notice the cross-ventilation in the main living hall with expansive glass balconies looking out towards {property.locality} green corridors...&quot;</p>
                <p><strong className="text-blue-400">[01:30]</strong> &quot;The modular kitchen includes premium fitting provisions, adhering strictly to South-East Agni Kona Vastu orientation...&quot;</p>
                <p><strong className="text-blue-400">[02:15]</strong> &quot;This unit comes with {property.parking || 1} designated covered parking slots and 100% power backup provisions.&quot;</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RERA Certificate Modal */}
      {showReraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span>GUJRERA Verified Certificate</span>
              </h3>
              <button onClick={() => setShowReraModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold block">RERA Registration Number</span>
                <span className="font-mono text-emerald-400 font-bold">{property.reraId}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold block">Developer</span>
                <span className="text-slate-200 font-bold">{property.developer}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] font-bold block">Verifying Brokerage</span>
                <span className="text-slate-200 font-bold">{siteConfig.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent Callback Modal */}
      {showManagerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white">Call Rama Realty Specialist</h3>
              <button onClick={() => setShowManagerModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Inspection Call Scheduled!</h4>
                <p className="text-xs text-slate-400">A Rama Realty agent will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleModalForm} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Your Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Phone Number</label>
                  <input required type="tel" placeholder="+91 98250 79334" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
                </div>
                <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow">
                  Request Property Video Inspection Call
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
