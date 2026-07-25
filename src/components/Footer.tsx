"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Video, Target, Calculator } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing to AddressBox property alerts!");
  };

  const toolsList = [
    { title: "Gujarat Stamp Duty Calculator", href: "/tools/stamp-duty-calculator" },
    { title: "Home Loan Eligibility", href: "/tools/home-loan-eligibility" },
    { title: "NRI Currency Converter", href: "/tools/nri-currency-converter" },
    { title: "Rental Yield & ROI Estimator", href: "/tools/rental-yield-estimator" },
    { title: "Property Comparison Matrix", href: "/tools/property-comparison-matrix" },
    { title: "RERA Gujarat Checker", href: "/tools/rera-gujarat-checker" },
    { title: "Commute & Transit Calculator", href: "/tools/commute-calculator" },
    { title: "Legal Title Clearance", href: "/tools/legal-title-checklist" },
    { title: "Make Digital Price Offer", href: "/tools/make-price-offer" },
    { title: "Developer Portfolios", href: "/tools/developer-portfolios" },
    { title: "Verified Buyer Reviews", href: "/tools/buyer-reviews" },
    { title: "Share Property Card", href: "/tools/share-property-card" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-12 font-sans relative z-10">
      
      {/* Background Subtle glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Logo & Corporate Description */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-orange-500 p-2 rounded-xl text-white shadow-md shadow-orange-500/25">
                <Video className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight font-display">
                Address<span className="text-orange-500">Box</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {siteConfig.tagline}. Verified video walkthroughs and zero-brokerage advisory across top micro-markets in Ahmedabad & Gandhinagar.
            </p>

            <div className="space-y-3 text-xs font-medium">
              <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="flex items-center space-x-2.5 hover:text-white transition text-slate-300">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center space-x-2.5 hover:text-white transition text-slate-300">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-start space-x-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.address.street}, {siteConfig.address.city}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Micro-Markets */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">Micro-Markets</h4>
            <ul className="space-y-2 text-xs font-semibold">
              {siteConfig.primaryLocalities.slice(0, 6).map((loc) => (
                <li key={loc.slug}>
                  <Link href={`/properties-in-${loc.slug}`} className="hover:text-orange-400 transition">
                    Flats in {loc.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/property-in-ahmedabad" className="hover:text-orange-400 transition font-bold text-orange-400">View All Ahmedabad Localities →</Link></li>
              <li><Link href="/property-in-gandhinagar" className="hover:text-orange-400 transition font-bold text-orange-400">View All Gandhinagar Localities →</Link></li>
            </ul>
          </div>

          {/* Column 3: Tools & Calculators (NEW Dedicated Column) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase flex items-center space-x-1.5">
              <Calculator className="w-4 h-4 text-orange-500" />
              <span>Tools & Calculators</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {toolsList.map((tool, idx) => (
                <li key={idx}>
                  <Link href={tool.href} className="hover:text-orange-400 transition">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources & Requirements */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">Resources & Services</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/requirements" className="text-orange-400 hover:text-orange-300 font-bold flex items-center space-x-1">
                  <Target className="w-3.5 h-3.5" />
                  <span>Tell Us Your Requirement</span>
                </Link>
              </li>
              <li><Link href="/valuation" className="hover:text-blue-400 transition">Groq AI Property Valuation</Link></li>
              <li><Link href="/blog/rera-gujarat-guide" className="hover:text-blue-400 transition">GUJRERA Verification Guide</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
              <li><a href="/sitemap.xml" target="_blank" className="hover:text-blue-400 transition">XML Sitemap</a></li>
            </ul>
          </div>

          {/* Column 5: Newsletter Input */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">Video Alerts</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe for new property video walkthroughs and RERA project analysis in Gujarat.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative flex items-center mt-2">
              <input
                type="email"
                required
                placeholder="Enter email"
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pl-3 pr-10 py-2.5 text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition"
              />
              <button
                type="submit"
                className="absolute right-1 bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded-lg transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom copyright strip */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
          <p className="text-center md:text-left">
            Copyright © 2026 {siteConfig.name}. All rights reserved. RERA Registered Brokerage.
          </p>
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="YouTube">
              <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
