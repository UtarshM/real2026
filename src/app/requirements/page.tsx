"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Building2, MapPin, DollarSign, User, Phone, Mail, Clock, 
  ChevronRight, ChevronLeft, CheckCircle2, Sparkles, ClipboardList, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RequirementsPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    purpose: "BUY", // BUY | RENT
    propertyType: "RESIDENTIAL", // RESIDENTIAL | COMMERCIAL | PLOT
    category: "Apartment",
    bhk: "3 BHK",
    city: "Ahmedabad",
    locality: "Bopal",
    minBudget: "5000000",
    maxBudget: "15000000",
    name: "",
    phone: "",
    email: "",
    contactTime: "Morning (9 AM - 12 PM)",
    notes: ""
  });

  const updateForm = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        // LocalStorage fallback sync
        const existing = JSON.parse(localStorage.getItem("posted_requirements") || "[]");
        existing.unshift(data.data);
        localStorage.setItem("posted_requirements", JSON.stringify(existing));

        setSuccess(true);
      } else {
        alert(data.error || "Submission failed. Please check your details.");
      }
    } catch (err) {
      console.error("Requirements submission error:", err);
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-600 dark:text-orange-400 text-xs font-bold shadow-sm">
            <Target className="w-4 h-4 text-orange-500" />
            <span>Tell Us Your Requirement & Let Specialists Find Your Match</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Can&apos;t Find Your Ideal Property?
          </h1>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold max-w-xl mx-auto leading-relaxed">
            Submit your specific requirements below. Our Rama Realty specialists will cross-reference unlisted verified inventory in Gujarat with zero brokerage fees.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Progress Indicator */}
          {!success && (
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
              {[
                { s: 1, label: "Intent & Category" },
                { s: 2, label: "Specs & Budget" },
                { s: 3, label: "Contact Details" }
              ].map((item) => (
                <div key={item.s} className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition ${
                    step === item.s 
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" 
                      : step > item.s 
                        ? "bg-emerald-500 text-white" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}>
                    {step > item.s ? "✓" : item.s}
                  </div>
                  <span className={`text-xs font-extrabold hidden sm:inline ${step === item.s ? "text-orange-600 dark:text-orange-400" : "text-slate-500"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* SUCCESS SCREEN */}
          {success ? (
            <div className="text-center py-10 space-y-6 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">Requirement Registered Successfully!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold max-w-md mx-auto">
                  Our Rama Realty property advisors are reviewing matching listings in <span className="text-orange-500 font-bold">{formData.locality}, {formData.city}</span> and will contact you at <span className="text-slate-900 dark:text-white font-bold">{formData.phone}</span>.
                </p>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/buy">
                  <Button variant="primary" size="md">Browse Catalog Listings</Button>
                </Link>
                <Button variant="outline" size="md" onClick={() => { setSuccess(false); setStep(1); }}>
                  Submit Another Requirement
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Intent & Category */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200 block mb-2">
                      Listing Purpose
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["BUY", "RENT"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => updateForm("purpose", p)}
                          className={`py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider border transition cursor-pointer ${
                            formData.purpose === p
                              ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                              : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400"
                          }`}
                        >
                          {p === "BUY" ? "Buying Property" : "Renting Property"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200 block mb-2">
                      Property Category
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "RESIDENTIAL", label: "Residential" },
                        { id: "COMMERCIAL", label: "Commercial" },
                        { id: "PLOT", label: "Plot / Land" }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => updateForm("propertyType", cat.id)}
                          className={`py-3 px-3 rounded-2xl text-xs font-black border transition cursor-pointer ${
                            formData.propertyType === cat.id
                              ? "bg-blue-600 text-white border-blue-600 shadow-md"
                              : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                      Property Sub-Type
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateForm("category", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                    >
                      <option value="Apartment">Apartment / High-Rise Flat</option>
                      <option value="Villa">Luxury Villa / Bungalow</option>
                      <option value="Penthouse">Sky Villa / Penthouse</option>
                      <option value="Office">Commercial Office Space</option>
                      <option value="Showroom">Retail Shop / Showroom</option>
                      <option value="Warehouse">Industrial Warehouse</option>
                      <option value="Plot">Residential / Commercial Plot</option>
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => setStep(2)}
                      className="px-8 justify-center"
                    >
                      <span>Next: Specs & Location</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>

                </div>
              )}

              {/* STEP 2: Specs, Location & Budget */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  
                  {formData.propertyType === "RESIDENTIAL" && (
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                        Preferred BHK Configuration
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => updateForm("bhk", b)}
                            className={`py-3 rounded-xl text-xs font-black border transition cursor-pointer ${
                              formData.bhk === b
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                        Target City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                      >
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                        Locality / Sector
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.locality}
                        onChange={(e) => updateForm("locality", e.target.value)}
                        placeholder="e.g. Bopal, GIFT City, Science City, Gota"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                        Minimum Budget (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.minBudget}
                        onChange={(e) => updateForm("minBudget", e.target.value)}
                        placeholder="e.g. 5000000"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                        Maximum Budget (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.maxBudget}
                        onChange={(e) => updateForm("maxBudget", e.target.value)}
                        placeholder="e.g. 15000000"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </Button>
                    <Button type="button" variant="primary" onClick={() => setStep(3)}>
                      <span>Next: Contact Details</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>

                </div>
              )}

              {/* STEP 3: Contact Details */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in">
                  
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      placeholder="e.g. Rahul Patel"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                      Preferred Contact Time
                    </label>
                    <select
                      value={formData.contactTime}
                      onChange={(e) => updateForm("contactTime", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white"
                    >
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                      <option value="Weekend Only">Weekend Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                      Additional Requirements / Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => updateForm("notes", e.target.value)}
                      placeholder="e.g. East facing, high floor, near SP Ring Road Metro..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-extrabold text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </Button>
                    <Button type="submit" disabled={isSubmitting} variant="primary" className="px-8">
                      {isSubmitting ? "Submitting Requirement..." : "Submit Property Requirement"}
                    </Button>
                  </div>

                </div>
              )}

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
