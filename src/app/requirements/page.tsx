"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RequirementsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "BUY",
    city: "Ahmedabad",
    type: "RESIDENTIAL",
    bhk: "3 BHK",
    maxBudget: "",
    notes: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = JSON.parse(localStorage.getItem("user_requirements") || "[]");
    requirements.push({
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    });
    localStorage.setItem("user_requirements", JSON.stringify(requirements));
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        purpose: "BUY",
        city: "Ahmedabad",
        type: "RESIDENTIAL",
        bhk: "3 BHK",
        maxBudget: "",
        notes: ""
      });
    }, 3000);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16 text-white relative">
      
      {/* Background glow graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Title Header */}
        <div className="text-center">
          <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">Share Your Needs</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-display">Tell us Your Requirement</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Can&apos;t find the perfect property? Let us know what you&apos;re looking for, and we will find the ideal listings with Zero Brokerage.
          </p>
        </div>

        {/* Requirements Submission Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {success && (
            <div className="absolute inset-0 bg-slate-950/95 z-20 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
              <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mb-4 shadow">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="font-extrabold text-2xl text-white font-display mb-2">Requirements Submitted!</h3>
              <p className="text-slate-455 text-xs sm:text-sm max-w-sm leading-relaxed mb-6">
                Thank you! We&apos;ve received your criteria. Our personal property manager will contact you with matching verified listings shortly.
              </p>
              <Link href="/">
                <Button variant="primary" size="sm">Go Back Home</Button>
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Purpose & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">I want to</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  {["BUY", "RENT"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, purpose: p })}
                      className={`py-2 text-center text-xs font-bold rounded-lg transition capitalize cursor-pointer ${
                        formData.purpose === p
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {p === "BUY" ? "Buy" : "Rent"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Target City</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-955 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                >
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                </select>
              </div>
            </div>

            {/* Property Category Type & Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Property Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3.5 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                >
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="PLOT">Plot / Land</option>
                </select>
              </div>
              {formData.type === "RESIDENTIAL" ? (
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Configuration</label>
                  <select
                    value={formData.bhk}
                    onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                    className="w-full bg-slate-955 border border-slate-800 text-white rounded-xl py-3.5 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="5+ BHK">5+ BHK / Villa</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-1.5 opacity-40 pointer-events-none">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Configuration</label>
                  <input
                    type="text"
                    disabled
                    value="Not Applicable"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-500 rounded-xl py-3 px-4 outline-none text-xs sm:text-sm font-semibold"
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Max Budget (INR)</label>
                <input
                  type="number"
                  required
                  value={formData.maxBudget}
                  onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                  placeholder="e.g. 8500000"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="border-t border-slate-850 pt-6 space-y-4">
              <h3 className="font-extrabold text-base text-white tracking-tight font-display">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                    placeholder="10-digit number"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* Custom Notes */}
            <div className="space-y-1.5">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Additional Requirements Details</label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700 resize-none font-sans"
                placeholder="Mention preferred localities, specific amenities, launch year, age of construction, or any special specifications."
              />
            </div>

            <Button type="submit" variant="accent" className="w-full mt-6 flex items-center justify-center space-x-2 py-3.5 hover:scale-[1.01]">
              <Send className="w-4.5 h-4.5" />
              <span>Submit Requirements</span>
            </Button>

          </form>
        </div>

      </div>
    </div>
  );
}
