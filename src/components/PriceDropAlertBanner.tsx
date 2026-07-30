"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";

export default function PriceDropAlertBanner() {
  return (
    <div className="bg-[#ea580c] text-white py-2 px-4 sm:px-8 text-xs font-bold relative z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:space-x-6">
        
        <a 
          href="mailto:sales@addressbox.com" 
          className="flex items-center space-x-1.5 text-white hover:opacity-90 transition cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5 fill-white/20 stroke-[2.5] text-white" />
          <span className="tracking-wide text-white">sales@addressbox.com</span>
        </a>

        <a 
          href="tel:+919327494799" 
          className="flex items-center space-x-1.5 text-white hover:opacity-90 transition cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 fill-white/20 stroke-[2.5] text-white" />
          <span className="tracking-wide text-white">+91 93274 94799</span>
        </a>

      </div>
    </div>
  );
}
