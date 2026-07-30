"use client";

import React from "react";
import Image from "next/image";
import { QrCode, Smartphone } from "lucide-react";

export default function AppDownloadBanner() {
  return (
    <section className="bg-slate-900 text-white py-14 font-sans border-b border-slate-800 relative overflow-hidden">
      
      {/* Soft Orange Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ backgroundColor: "#ea580c" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Mobile Phone Mockup */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-[420px] bg-slate-950 border-4 border-slate-700 rounded-[40px] shadow-2xl overflow-hidden p-2 flex flex-col justify-between">
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
              
              <div className="bg-slate-900 rounded-[28px] p-4 flex-1 flex flex-col justify-between border border-slate-800 text-center space-y-4">
                <div className="space-y-2 pt-4">
                  <span className="text-[10px] uppercase tracking-wider font-black text-orange-400">AddressBox Mobile App</span>
                  <h4 className="text-sm font-black text-white">Exploring Properties in Ahmedabad</h4>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-[10px] text-slate-300 font-bold">Zero Brokerage Guarantee</div>
                  <div className="text-xs font-extrabold text-white">2 Lac+ Verified Listings</div>
                </div>

                <div className="pb-2">
                  <span className="bg-[#ea580c] text-white text-[10px] font-black px-4 py-2 rounded-xl inline-block" style={{ backgroundColor: "#ea580c" }}>
                    Download App Now
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Copy & Download Buttons */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            
            <div className="space-y-3">
              <span className="bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Official Mobile App
              </span>

              <h2 className="text-3xl sm:text-5xl font-black font-display leading-tight text-white">
                FREE APP <span className="text-[#ea580c]" style={{ color: "#ea580c" }}>AddressBox</span>
              </h2>
              <p className="text-lg sm:text-xl font-extrabold text-slate-100">
                Find Your Perfect Property Anytime, Anywhere!
              </p>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
                Download The App For Seamless Property Searches, Instant Alerts, And Hassle-Free Buying, Selling, Or Renting In Ahmedabad & Gandhinagar. Your Dream Home Is Just A Tap Away!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center space-x-2 transition shadow-md cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-orange-400" />
                <div className="text-left">
                  <div className="text-[9px] uppercase text-slate-400">Get it on</div>
                  <div className="text-xs font-black">Google Play</div>
                </div>
              </a>

              <a
                href="https://apple.com"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center space-x-2 transition shadow-md cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-orange-400" />
                <div className="text-left">
                  <div className="text-[9px] uppercase text-slate-400">Download on the</div>
                  <div className="text-xs font-black">App Store</div>
                </div>
              </a>

              <div className="bg-slate-950 border border-slate-800 p-2 rounded-2xl flex items-center space-x-2 text-slate-300">
                <QrCode className="w-7 h-7 text-[#ea580c]" />
                <div className="text-left text-[10px] font-bold leading-tight">
                  <div>Scan QR to</div>
                  <div className="text-white font-extrabold">Download App</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
