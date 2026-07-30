"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="w-full font-sans border-t border-slate-800" 
      style={{ backgroundColor: "#0b1222", color: "#cbd5e1" }}
    >
      
      {/* Top Header Callout Strip */}
      <div 
        className="w-full py-6 border-b border-slate-800" 
        style={{ backgroundColor: "#070c18" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="space-y-0.5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black font-display" style={{ color: "#ffffff" }}>
              AddressBox <span style={{ color: "#ea580c" }}>Real Estate</span>
            </h3>
            <p className="text-xs font-medium" style={{ color: "#94a3b8" }}>
              A Unit of ARDH Realty Services Pvt. Ltd. | Premier Real Estate Platform in Gujarat
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-extrabold">
            <a 
              href="mailto:sales@addressbox.com" 
              className="flex items-center space-x-2 border border-slate-700/80 px-4 py-2 rounded-xl hover:border-[#ea580c] transition"
              style={{ backgroundColor: "#121b2d", color: "#f1f5f9" }}
            >
              <Mail className="w-4 h-4" style={{ color: "#ea580c" }} />
              <span>sales@addressbox.com</span>
            </a>
            <a 
              href="tel:+919327494799" 
              className="flex items-center space-x-2 border border-slate-700/80 px-4 py-2 rounded-xl hover:border-[#ea580c] transition"
              style={{ backgroundColor: "#121b2d", color: "#f1f5f9" }}
            >
              <Phone className="w-4 h-4" style={{ color: "#ea580c" }} />
              <span>+91 93274 94799</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main 4 Horizontal Columns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
          
          {/* Column 1: Brand & RERA Verification */}
          <div className="space-y-4 flex flex-col justify-start">
            <Link href="/" className="inline-block">
              <span className="font-black text-2xl sm:text-3xl tracking-tighter font-display" style={{ color: "#ffffff" }}>
                address<span className="font-black" style={{ color: "#ea580c" }}>box</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed font-medium" style={{ color: "#94a3b8" }}>
              AddressBox is a comprehensive real estate platform offering solutions for all property needs in Ahmedabad and Gandhinagar with zero brokerage.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs font-bold" style={{ color: "#34d399" }}>
              <ShieldCheck className="w-4.5 h-4.5 flex-shrink-0" />
              <span>GUJRERA Verified Platform</span>
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-3.5 flex flex-col justify-start">
            <h4 className="text-xs font-black uppercase tracking-widest font-display" style={{ color: "#ffffff" }}>
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs font-bold" style={{ color: "#94a3b8" }}>
              <li><Link href="/buy" className="hover:text-white transition-colors">Buy Properties</Link></li>
              <li><Link href="/rent" className="hover:text-white transition-colors">Rent Properties</Link></li>
              <li><Link href="/commercial" className="hover:text-white transition-colors">Commercial Investment</Link></li>
              <li><Link href="/plots" className="hover:text-white transition-colors">Plots & Land</Link></li>
              <li><Link href="/builders" className="hover:text-white transition-colors">Verified Builders</Link></li>
            </ul>
          </div>

          {/* Column 3: PROPERTY CATEGORIES */}
          <div className="space-y-3.5 flex flex-col justify-start">
            <h4 className="text-xs font-black uppercase tracking-widest font-display" style={{ color: "#ffffff" }}>
              PROPERTY CATEGORIES
            </h4>
            <ul className="space-y-2.5 text-xs font-bold" style={{ color: "#94a3b8" }}>
              <li><Link href="/search?category=Residential" className="hover:text-white transition-colors">2 BHK & 3 BHK Flats</Link></li>
              <li><Link href="/search?subType=Villa" className="hover:text-white transition-colors">Luxury Villas & Bungalows</Link></li>
              <li><Link href="/search?category=Commercial" className="hover:text-white transition-colors">GIFT City Commercial Offices</Link></li>
              <li><Link href="/search?category=PG" className="hover:text-white transition-colors">PG & Co-living Spaces</Link></li>
              <li><Link href="/search?category=Auction" className="hover:text-white transition-colors">Bank Auction Properties</Link></li>
            </ul>
          </div>

          {/* Column 4: TOP LOCALITIES */}
          <div className="space-y-3.5 flex flex-col justify-start">
            <h4 className="text-xs font-black uppercase tracking-widest font-display" style={{ color: "#ffffff" }}>
              TOP LOCALITIES
            </h4>
            <ul className="space-y-2.5 text-xs font-bold" style={{ color: "#94a3b8" }}>
              <li><Link href="/search?query=Prahladnagar" className="hover:text-white transition-colors">Prahladnagar, Ahmedabad</Link></li>
              <li><Link href="/search?query=Bopal" className="hover:text-white transition-colors">Bopal & Shela, Ahmedabad</Link></li>
              <li><Link href="/search?query=Gota" className="hover:text-white transition-colors">Gota & Sola, Ahmedabad</Link></li>
              <li><Link href="/search?query=GIFT+City" className="hover:text-white transition-colors">GIFT City, Gandhinagar</Link></li>
              <li><Link href="/search?query=Sargasan" className="hover:text-white transition-colors">Sargasan & Kudasan, Gandhinagar</Link></li>
            </ul>
          </div>

        </div>

        {/* Horizontal Divider, Disclaimer & Copyright */}
        <div 
          className="mt-12 pt-8 border-t border-slate-800 text-[11px] space-y-4 text-center sm:text-left"
          style={{ color: "#64748b" }}
        >
          <p className="leading-relaxed font-medium">
            Disclaimer: AddressBox (A Unit of ARDH Realty Services Pvt. Ltd.) is an online real estate platform. All project details, RERA numbers, images, and prices are fetched from authorized developer listings and public GUJRERA records. Users are advised to verify property title documents before entering into financial transactions.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-bold pt-2" style={{ color: "#94a3b8" }}>
            <p>© {new Date().getFullYear()} AddressBox. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
