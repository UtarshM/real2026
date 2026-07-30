"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Search } from "lucide-react";

interface ZeroBrokerageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ZeroBrokerageModal({ isOpen, onClose }: ZeroBrokerageModalProps) {
  const [mounted, setMounted] = useState(false);
  const [purpose, setPurpose] = useState<"BUY" | "RENT">("BUY");
  const [city, setCity] = useState("Ahmedabad");
  const [propertyType, setPropertyType] = useState("Residential");
  const [subType, setSubType] = useState("Flat/Apartment");
  const [locality, setLocality] = useState("");
  const [role, setRole] = useState("Buyer/Owner/Tenant");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 relative space-y-6 animate-in zoom-in-95 duration-200 text-slate-900 my-auto border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
              ✓
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display">Requirement Registered!</h3>
            <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
              Our Property Manager will contact you shortly with zero brokerage options.
            </p>
          </div>
        ) : (
          <>
            {/* Modal Title */}
            <div className="text-center space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-[#ea580c] font-display" style={{ color: "#ea580c" }}>
                Zero Brokerage Offer
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-bold">
                Your Dream Home is calling you! Choose from 2 Lac+ properties
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-800">
              
              {/* Radio Buy/Rent & City */}
              <div className="flex flex-wrap items-center justify-center gap-4 bg-orange-50/50 p-3 rounded-2xl border border-orange-100">
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="radio"
                      name="purpose"
                      checked={purpose === "BUY"}
                      onChange={() => setPurpose("BUY")}
                      className="accent-[#ea580c]"
                    />
                    <span>BUY</span>
                  </label>
                  <label className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="radio"
                      name="purpose"
                      checked={purpose === "RENT"}
                      onChange={() => setPurpose("RENT")}
                      className="accent-[#ea580c]"
                    />
                    <span>RENT</span>
                  </label>
                </div>

                <span className="text-slate-400 font-normal">In</span>

                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="radio"
                      name="city"
                      checked={city === "Ahmedabad"}
                      onChange={() => setCity("Ahmedabad")}
                      className="accent-[#ea580c]"
                    />
                    <span>Ahmedabad</span>
                  </label>
                  <label className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="radio"
                      name="city"
                      checked={city === "Gandhinagar"}
                      onChange={() => setCity("Gandhinagar")}
                      className="accent-[#ea580c]"
                    />
                    <span>Gandhinagar</span>
                  </label>
                </div>
              </div>

              {/* Property & SubType Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-500 mb-1">Property Type*</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-[#ea580c]"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="PG/Co-living">PG/Co-living</option>
                    <option value="Plot/Land">Plot/Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-500 mb-1">Sub Type*</label>
                  <select
                    value={subType}
                    onChange={(e) => setSubType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-[#ea580c]"
                  >
                    <option value="Flat/Apartment">Flat/Apartment</option>
                    <option value="Villa/Bungalow">Villa/Bungalow</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>
              </div>

              {/* Interested Localities */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-500 mb-1">Interested Localities*</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="Select preferred localities (e.g. Bopal, GIFT City)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-3 pr-8 py-2.5 outline-none focus:border-[#ea580c]"
                  />
                  <Search className="absolute right-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Role Radio */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "Buyer/Owner/Tenant"}
                    onChange={() => setRole("Buyer/Owner/Tenant")}
                    className="accent-[#ea580c]"
                  />
                  <span>Buyer/Owner/Tenant</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "Agent"}
                    onChange={() => setRole("Agent")}
                    className="accent-[#ea580c]"
                  />
                  <span>Agent</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "Builder"}
                    onChange={() => setRole("Builder")}
                    className="accent-[#ea580c]"
                  />
                  <span>Builder</span>
                </label>
              </div>

              {/* Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-500 mb-1">Name*</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-[#ea580c]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-500 mb-1">Mobile Number*</label>
                  <div className="flex">
                    <span className="bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl px-3 py-2.5 text-slate-600 font-bold">+91</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-slate-50 border border-slate-300 rounded-r-xl px-3 py-2.5 outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-black text-sm px-8 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Submit
                </button>
              </div>

            </form>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
