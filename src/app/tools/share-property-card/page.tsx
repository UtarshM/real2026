"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Share2, Check } from "lucide-react";

export default function SharePropertyCardPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://addressbox.com/buy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-4">
        <Share2 className="w-10 h-10 text-orange-500 mx-auto" />
        <h4 className="text-base font-black">Share Property Card on WhatsApp & Social Media</h4>
        <button
          onClick={handleCopy}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
        >
          {copied ? "Link Copied to Clipboard! ✓" : "Copy Shareable Link"}
        </button>
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      toolSlug="share-property-card"
      title="Share Property Card & Brochure Generator"
      categoryTag="Property Sharing Tools"
      introParagraph="Generate instant shareable property cards, PDF brochures, and WhatsApp links for listings in Ahmedabad and Gandhinagar."
      calculatorComponent={calculatorUI}
      promoTitle="Post Property Requirement"
      promoDesc="Share your requirement with advisors."
      promoButtonText="Post Requirement"
      promoHref="/requirements"
    />
  );
}
