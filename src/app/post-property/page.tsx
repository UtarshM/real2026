"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, MapPin, DollarSign, Calendar, Layers, ShieldCheck, 
  ChevronRight, ChevronLeft, CheckCircle2, Info, PlusCircle, Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAiDescription, generateAiTitle, estimatePrice } from "@/lib/ai";
import { uploadPropertyImage } from "@/lib/supabase";

export default function PostPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const publicUrl = await uploadPropertyImage(file);
      setFormData(prev => ({ ...prev, image: publicUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Form states
  const [formData, setFormData] = useState({
    // Step 1: Category
    purpose: "BUY", // BUY | RENT
    type: "RESIDENTIAL", // RESIDENTIAL | COMMERCIAL | PLOT
    subType: "Flat/Apartment",
    
    // Step 2: Specs
    name: "",
    bhk: "3",
    area: "",
    facing: "East",
    
    // Step 3: Location
    city: "Ahmedabad",
    locality: "",
    address: "",
    
    // Step 4: Cost
    price: "",
    maintenance: "2500",
    securityDeposit: "0",
    
    // Step 5: Age & RERA
    possessionDate: "Ready to Move",
    ageOfConstruction: "0-1 Years",
    reraId: "Not Applicable",
    
    // Step 6: Interiors
    furnished: "Semi-Furnished",
    bathrooms: "2",
    balconies: "1",
    
    // Step 7: Amenities
    amenities: [] as string[],
    
    // Step 8: Media
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    description: "",
    
    // Developer profile details
    postedBy: "Owner",
    developer: "Owner Listed"
  });

  const stepsList = [
    "Listing Intent",
    "Basic Details",
    "Location",
    "Price & Cost",
    "Possession",
    "Interiors",
    "Amenities",
    "Media Upload",
    "Review & Submit"
  ];

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const nextStep = () => {
    // Basic field validation checks per step
    if (step === 2 && !formData.name) {
      alert("Please enter a property title.");
      return;
    }
    if (step === 3 && (!formData.locality || !formData.address)) {
      alert("Please fill in locality and full address details.");
      return;
    }
    if (step === 4 && !formData.price) {
      alert("Please specify property listing valuation.");
      return;
    }
    setStep(prev => Math.min(prev + 1, 9));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Enforce subscription listing limits
    const sub = typeof window !== "undefined" ? localStorage.getItem("user_subscription") || "FREE" : "FREE";
    const stored = typeof window !== "undefined" ? localStorage.getItem("posted_properties") : null;
    const localProps = stored ? JSON.parse(stored) : [];
    if (sub === "FREE" && localProps.length >= 1) {
      alert("Free Plan Limit Reached! Free accounts can only publish 1 active property. Please upgrade your subscription inside our pricing page to list more properties.");
      router.push("/pricing");
      return;
    }

    const priceNum = Number(formData.price);
    let priceString = "";
    if (formData.purpose === "RENT") {
      priceString = `₹ ${priceNum.toLocaleString()} / Month`;
    } else {
      if (priceNum >= 10000000) {
        priceString = `₹ ${(priceNum / 10000000).toFixed(2)} Cr`;
      } else if (priceNum >= 100000) {
        priceString = `₹ ${(priceNum / 100000).toFixed(0)} Lac`;
      } else {
        priceString = `₹ ${priceNum.toLocaleString()}`;
      }
    }

    const newProperty = {
      id: Date.now(),
      name: formData.name,
      developer: formData.postedBy === "Owner" ? "Owner Listed" : formData.developer,
      type: formData.type,
      subType: formData.subType,
      category: formData.subType,
      bhk: formData.type === "RESIDENTIAL" ? Number(formData.bhk) : null,
      price: priceNum,
      priceUnit: formData.purpose === "RENT" ? "Month" : (priceNum >= 10000000 ? "Cr" : "Lac"),
      priceString,
      locality: formData.locality,
      city: formData.city,
      area: `${formData.area} sq ft`,
      launchDate: "Immediate",
      possessionDate: formData.possessionDate,
      totalUnits: 1,
      totalBlocks: 1,
      reraId: formData.reraId,
      ageOfConstruction: formData.ageOfConstruction,
      description: formData.description || `Premium property situated at ${formData.locality}, offering premium configurations and modern architecture setups.`,
      address: formData.address,
      mapCoords: { lat: 23.0303, lng: 72.5659 },
      vastuScore: 94,
      amenities: formData.amenities,
      developerInfo: {
        name: formData.postedBy === "Owner" ? "Owner Listed" : formData.developer,
        totalProjects: 0,
        completed: 0,
        ongoing: 0,
        tagline: "Direct list transaction",
        logo: ""
      },
      floorPlans: [],
      images: [formData.image],
      isTrending: true,
      isHighlighted: true,
      isNewLaunch: true,
      postedBy: formData.postedBy,
      targetGroup: "Family",
      furnished: formData.furnished,
      purpose: formData.purpose
    };

    // Save mock listings to local storage cache (prepend so new listing appears at the top)
    const currentStored = typeof window !== "undefined" ? localStorage.getItem("posted_properties") : null;
    const currentProps = currentStored ? JSON.parse(currentStored) : [];
    currentProps.unshift(newProperty);
    if (typeof window !== "undefined") {
      localStorage.setItem("posted_properties", JSON.stringify(currentProps));
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push(`/search?purpose=${formData.purpose}&city=${formData.city}&type=${formData.type}`);
    }, 2000);
  };

  const amenitiesList = [
    "Swimming Pool", "Lift", "Gymnasium", "Garden/Park", 
    "Security Guard", "CCTV Cameras", "Water Supply", "Vaastu Compliant", "Reserved Parking"
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title */}
        <div className="text-center">
          <span className="text-orange-600 font-extrabold text-xs uppercase tracking-widest">Listing Wizard Dashboard</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-2 font-display">List Your Property</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed font-medium">
            Sell or rent your apartments, commercial spaces, or land in Ahmedabad & Gandhinagar with zero brokerage commission.
          </p>
        </div>

        {/* 9-Step progress dashboard */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-4">
            <span>Step {step} of 9</span>
            <span className="text-orange-600">{stepsList[step - 1]}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200 flex">
            {stepsList.map((_, idx) => (
              <div 
                key={idx}
                className={`flex-1 h-full border-r border-white last:border-r-0 transition-colors duration-300 ${
                  idx + 1 <= step ? "bg-orange-600" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Form Base Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
          
          {success && (
            <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="font-extrabold text-2xl text-slate-900 font-display mb-2">Property Listed Successfully!</h3>
              <p className="text-slate-450 text-xs sm:text-sm max-w-sm leading-relaxed">
                Your listing has been compiled and is now live on our Ahmedabad & Gandhinagar search systems. Redirecting to search results...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: Listing Intent & Category */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">1. Listing Intent</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Purpose</label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="BUY">For Sale (Buy)</option>
                      <option value="RENT">For Rent</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Listing Created By</label>
                    <select
                      value={formData.postedBy}
                      onChange={(e) => setFormData({ ...formData, postedBy: e.target.value, developer: e.target.value === "Owner" ? "Owner Listed" : formData.developer })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="Owner">Property Owner</option>
                      <option value="Agent">Agent / Broker</option>
                      <option value="Builder">Builder / Developer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Property Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value, subType: e.target.value === "RESIDENTIAL" ? "Flat/Apartment" : "Office Space" })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="RESIDENTIAL">Residential</option>
                      <option value="COMMERCIAL">Commercial</option>
                      <option value="PLOT">Plot / Land</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Subcategory</label>
                    <select
                      value={formData.subType}
                      onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      {formData.type === "RESIDENTIAL" && (
                        <>
                          <option value="Flat/Apartment">Flat / Apartment</option>
                          <option value="Bungalow/Villa">Bungalow / Villa</option>
                          <option value="PG/Co-living">PG / Co-living</option>
                        </>
                      )}
                      {formData.type === "COMMERCIAL" && (
                        <>
                          <option value="Office Space">Office Space</option>
                          <option value="Shop">Shop</option>
                          <option value="Warehouse">Warehouse Space</option>
                        </>
                      )}
                      {formData.type === "PLOT" && (
                        <>
                          <option value="Plot">Residential Plot</option>
                          <option value="Land">Industrial Land</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Basic Property Information */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">2. Basic Specifications</h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Listing Title</label>
                    <button
                      type="button"
                      onClick={() => {
                        const title = generateAiTitle(formData.bhk, formData.subType, formData.postedBy === "Owner" ? "Owner Listed" : formData.developer, formData.locality || "Bopal");
                        setFormData(prev => ({ ...prev, name: title }));
                      }}
                      className="text-[10px] text-blue-500 hover:text-blue-405 font-bold cursor-pointer"
                    >
                      ⚡ Auto-Generate AI Title
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                    placeholder="e.g. Shaligram 3 BHK Premium Apartment"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Super Builtup Area (Sq.Ft)</label>
                    <input
                      type="number"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                      placeholder="e.g. 1650"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Configuration (BHK)</label>
                    <select
                      value={formData.bhk}
                      onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5">5+ BHK</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Facing / Direction</label>
                    <select
                      value={formData.facing}
                      onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Location Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">3. Location details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">City</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Gandhinagar">Gandhinagar</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Locality / Area</label>
                    <input
                      type="text"
                      required
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                      placeholder="e.g. Bopal, Sargasan, GIFT City"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Full Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                    placeholder="Enter building number, society, landmark name"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Pricing & Fees */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">4. Cost & Maintenance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">
                        {formData.purpose === "RENT" ? "Monthly Rent (INR)" : "Property Price (INR)"}
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const est = estimatePrice(formData.locality || "Bopal", Number(formData.area) || 1200, Number(formData.bhk) || 3, formData.amenities.length || 3);
                          const finalEst = formData.purpose === "RENT" ? Math.round(est.average / 250) : est.average;
                          setFormData(prev => ({ ...prev, price: String(finalEst) }));
                          alert(`AI Pricing Estimate for ${formData.locality || "Bopal"}:\nRange: ₹ ${formData.purpose === "RENT" ? Math.round(est.min / 250).toLocaleString() : est.min.toLocaleString()} - ₹ ${formData.purpose === "RENT" ? Math.round(est.max / 250).toLocaleString() : est.max.toLocaleString()}\nRecommended Valuation: ₹ ${finalEst.toLocaleString()}`);
                        }}
                        className="text-[10px] text-blue-500 hover:text-blue-405 font-bold cursor-pointer"
                      >
                        ⚡ AI Estimate
                      </button>
                    </div>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                      placeholder={formData.purpose === "RENT" ? "e.g. 25000" : "e.g. 8500000"}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Maintenance Cost /mo</label>
                    <input
                      type="number"
                      value={formData.maintenance}
                      onChange={(e) => setFormData({ ...formData, maintenance: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                      placeholder="e.g. 2000"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Security Deposit (INR)</label>
                    <input
                      type="number"
                      value={formData.securityDeposit}
                      onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                      placeholder="e.g. 50000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Possession & Construction Age */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">5. Construction & RERA</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Possession Status</label>
                    <select
                      value={formData.possessionDate}
                      onChange={(e) => setFormData({ ...formData, possessionDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Dec 2026">Dec 2026</option>
                      <option value="Mid 2027">Mid 2027</option>
                      <option value="Late 2028">Late 2028</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Age of Construction</label>
                    <select
                      value={formData.ageOfConstruction}
                      onChange={(e) => setFormData({ ...formData, ageOfConstruction: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="0-1 Years">0-1 Years</option>
                      <option value="2-5 Years">2-5 Years</option>
                      <option value="5-10 Years">5-10 Years</option>
                      <option value="Under Construction">Under Construction</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">RERA Registration ID</label>
                    <input
                      type="text"
                      value={formData.reraId}
                      onChange={(e) => setFormData({ ...formData, reraId: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                      placeholder="e.g. PR/GJ/AHMEDABAD/..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Interior Specifications */}
            {step === 6 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">6. Interiors & Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Furnishing</label>
                    <select
                      value={formData.furnished}
                      onChange={(e) => setFormData({ ...formData, furnished: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Furnished">Fully Furnished</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Bathrooms count</label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="1">1 Bathroom</option>
                      <option value="2">2 Bathrooms</option>
                      <option value="3">3 Bathrooms</option>
                      <option value="4+">4+ Bathrooms</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider">Balconies count</label>
                    <select
                      value={formData.balconies}
                      onChange={(e) => setFormData({ ...formData, balconies: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                    >
                      <option value="0">No Balcony</option>
                      <option value="1">1 Balcony</option>
                      <option value="2">2 Balconies</option>
                      <option value="3+">3+ Balconies</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Amenities Checklist */}
            {step === 7 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">7. Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-350 text-xs sm:text-sm font-semibold">
                  {amenitiesList.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-3 bg-slate-950 border border-slate-850 p-4 rounded-xl cursor-pointer hover:text-white hover:border-slate-800 transition">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="w-4 h-4 rounded border-slate-800 text-blue-600 bg-slate-950 accent-blue-600"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Upload Images & Description */}
            {step === 8 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">8. Image & Description</h3>
                
                <div className="space-y-3">
                  <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider font-sans">
                    Upload Property Banner (Supabase Storage)
                  </label>
                  <div className="flex items-center space-x-4 bg-slate-950 border border-slate-800 rounded-2xl p-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                    {uploadingImage && <span className="text-xs font-semibold text-blue-400 animate-pulse">Uploading to Supabase...</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider font-sans">
                      Or Image URL Link
                    </label>
                    <textarea
                      rows={2}
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700 resize-none font-sans"
                      placeholder="Enter image link"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-slate-450 text-xs font-semibold uppercase tracking-wider font-sans">
                      Property Description
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const desc = generateAiDescription(formData.bhk, formData.area || "1200", formData.subType, formData.locality || "Bopal");
                        setFormData(prev => ({ ...prev, description: desc }));
                      }}
                      className="text-[10px] text-blue-500 hover:text-blue-405 font-bold cursor-pointer"
                    >
                      ⚡ Auto-Generate AI Description
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700 resize-none font-sans"
                    placeholder="Enter unique descriptions or auto generate using AI..."
                  />
                </div>

              </div>
            )}

            {/* STEP 9: Review & Submit */}
            {step === 9 && (
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">9. Verify & Submit Listing</h3>
                
                <div className="bg-slate-950 border border-slate-850 p-6 rounded-2xl space-y-4 text-xs sm:text-sm font-semibold text-slate-455">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-600 block uppercase font-bold tracking-wider">Listing Title</span>
                      <span className="text-white">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 block uppercase font-bold tracking-wider">Price / rent</span>
                      <span className="text-blue-500 font-bold">₹ {Number(formData.price).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 block uppercase font-bold tracking-wider">Locality</span>
                      <span className="text-white">{formData.locality}, {formData.city}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 block uppercase font-bold tracking-wider">Category</span>
                      <span className="text-white">{formData.purpose} ({formData.subType})</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-500/25 p-4 rounded-xl flex items-start space-x-2 text-xs font-semibold text-blue-500 leading-relaxed">
                  <Info className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                  <span>By submitting this listing, you confirm that the details are accurate and you agree to deal directly with buyers/renters under zero agency brokerage terms.</span>
                </div>
              </div>
            )}

            {/* Step actions controllers footer */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-850 mt-8 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center space-x-2 border-slate-850 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              {step === 9 ? (
                <Button
                  type="submit"
                  variant="accent"
                  className="flex items-center space-x-2 hover:scale-[1.03]"
                >
                  <span>Submit Listing</span>
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  className="flex items-center space-x-2 hover:scale-[1.03]"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
