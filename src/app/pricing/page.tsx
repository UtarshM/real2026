"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Sparkles, Building2, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const plans = [
    {
      name: "Free Plan",
      price: "₹0",
      period: "forever",
      description: "Ideal for individual home owners looking to list a single property.",
      cta: "Get Started",
      link: "/checkout?plan=free",
      popular: false,
      features: [
        "1 Active Property Listing",
        "Direct Contact from Buyers",
        "Basic Search Filter indexing",
        "Verification badge check",
        "30-day Listing expiration period"
      ]
    },
    {
      name: "Premium Agent",
      price: "₹1,499",
      period: "month",
      description: "Best for independent brokers looking to manage multiple leads.",
      cta: "Go Premium",
      link: "/checkout?plan=premium",
      popular: true,
      features: [
        "15 Active Property Listings",
        "5 Featured Listings (top ranking)",
        "Verified Agent Badge badge",
        "Priority Customer support",
        "Lead WhatsApp Alerts alerts",
        "Interactive floor plans rendering"
      ]
    },
    {
      name: "Unlimited Builder",
      price: "₹4,999",
      period: "month",
      description: "Designed for construction developers promoting complete housing layouts.",
      cta: "Partner With Us",
      link: "/checkout?plan=builder",
      popular: false,
      features: [
        "Unlimited Active Listings",
        "Unlimited Featured slots",
        "Verified Builder badge profile",
        "Dedicated Accounts Manager manager",
        "Map Proximity integrations",
        "Direct Lead CRM integration",
        "Premium support callbacks"
      ]
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-20 text-white relative">
      
      {/* Background glow graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">Subscription Packages</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-display">Simple, Transparent Pricing</h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Choose the ideal plan to list and manage your properties in Ahmedabad & Gandhinagar with zero brokerage commission.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-8">
          {plans.map((p, idx) => (
            <div 
              key={idx}
              className={`bg-slate-900 border ${
                p.popular ? "border-blue-600 shadow-xl" : "border-slate-800"
              } rounded-3xl p-8 flex flex-col justify-between space-y-6 relative hover:scale-[1.01] transition-transform`}
            >
              {p.popular && (
                <span className="absolute -top-3.5 right-6 bg-blue-600 border border-blue-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center space-x-1 shadow">
                  <Flame className="w-3.5 h-3.5 mr-0.5" />
                  <span>Most Popular</span>
                </span>
              )}

              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-white font-display uppercase tracking-wider">{p.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-5xl font-black text-white">{p.price}</span>
                  <span className="text-slate-500 text-xs font-semibold ml-1.5 uppercase">/ {p.period}</span>
                </div>
                <p className="text-slate-450 text-xs sm:text-sm leading-relaxed">{p.description}</p>
                <div className="w-full h-px bg-slate-850" />
                
                {/* Features list */}
                <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-slate-350">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Link href={p.link} className="block w-full">
                  <Button 
                    variant={p.popular ? "primary" : "outline"} 
                    className="w-full text-center"
                  >
                    {p.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Support Callout */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-xs font-semibold text-slate-450 max-w-xl mx-auto flex items-center justify-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <span>All payment transactions are mock verified under secure Sandbox environments. Need custom team seats? <a href="/contact" className="text-blue-500 hover:underline">Contact our corporate desk</a></span>
        </div>

        {/* Micro-Market Locality Price Index Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">Market Benchmark Index</span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">Ahmedabad & Gandhinagar Price Trends</h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full w-fit">
              Updated July 2026 Index
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { locality: "Bopal", avgPrice: "₹ 6,800 / sqft", growth: "+12.4% YoY", rating: "9.4 Connectivity" },
              { locality: "GIFT City", avgPrice: "₹ 9,200 / sqft", growth: "+18.6% YoY", rating: "9.8 Infrastructure" },
              { locality: "Gota", avgPrice: "₹ 5,800 / sqft", growth: "+9.2% YoY", rating: "9.1 Proximity" },
              { locality: "Prahladnagar", avgPrice: "₹ 11,500 / sqft", growth: "+14.1% YoY", rating: "9.7 Corporate Hub" },
              { locality: "Science City", avgPrice: "₹ 8,800 / sqft", growth: "+11.5% YoY", rating: "9.5 Education Sector" },
              { locality: "Sargasan", avgPrice: "₹ 5,200 / sqft", growth: "+8.7% YoY", rating: "9.0 Metro Access" }
            ].map((loc, idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-extrabold text-white font-display">{loc.locality}</h4>
                  <span className="text-xs font-black text-emerald-400">{loc.growth}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Avg Benchmark:</span>
                  <span className="text-blue-400 font-bold">{loc.avgPrice}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider pt-1 border-t border-slate-900">
                  {loc.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
