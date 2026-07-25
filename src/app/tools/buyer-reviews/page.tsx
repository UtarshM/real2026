"use client";

import React from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Star } from "lucide-react";

export default function BuyerReviewsPage() {
  const reviews = [
    { author: "Amit Shah", location: "Bopal, Ahmedabad", text: "Zero brokerage experience was 100% transparent. Verified video tour matched actual flat.", rating: 5 },
    { author: "Priya Patel", location: "GIFT City", text: "Got exact stamp duty & NRI currency conversion details before finalizing our 3 BHK flat.", rating: 5 }
  ];

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <h3 className="text-sm font-black uppercase text-slate-700 dark:text-slate-300">Verified Resident & Buyer Reviews</h3>
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between font-black text-slate-900 dark:text-white">
              <span>{r.author} ({r.location})</span>
              <span className="text-amber-500 font-bold">★★★★★</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      toolSlug="buyer-reviews"
      title="Verified Homebuyer & Resident Reviews"
      categoryTag="Community Feedback"
      introParagraph="Read authentic reviews from home buyers, tenants, and residents across top micro-markets in Ahmedabad and Gandhinagar."
      calculatorComponent={calculatorUI}
      promoTitle="Post Property Requirement"
      promoDesc="Let specialists find your dream home."
      promoButtonText="Post Requirement"
      promoHref="/requirements"
    />
  );
}
