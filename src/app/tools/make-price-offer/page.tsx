"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Tag, Send } from "lucide-react";

export default function MakePriceOfferPage() {
  const [offerPrice, setOfferPrice] = useState("12500000");
  const [submitted, setSubmitted] = useState(false);

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      {submitted ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-2">
          <Tag className="w-8 h-8 text-emerald-500 mx-auto" />
          <h4 className="text-base font-black text-emerald-600">Digital Counter-Offer Submitted</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">Your price offer of ₹ {(parseInt(offerPrice) / 100000).toFixed(2)} Lakhs has been relayed to the property owner/builder team.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block mb-1">Your Binding Offer Amount (₹)</label>
            <input
              type="number"
              required
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-black"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black text-xs uppercase cursor-pointer">
            Submit Binding Counter-Offer
          </button>
        </form>
      )}
    </div>
  );

  return (
    <ToolPageLayout
      toolSlug="make-price-offer"
      title="Make Digital Price Offer & Counter-Offer Tool"
      categoryTag="AddressBox Buyer Negotiation"
      introParagraph="Submit direct digital price offers to property owners and developers without brokerage intermediaries. Lock in zero-brokerage negotiations in Ahmedabad & Gandhinagar."
      calculatorComponent={calculatorUI}
      promoTitle="Post Property Requirement"
      promoDesc="Let specialists find properties matching your budget."
      promoButtonText="Post Requirement"
      promoHref="/requirements"
    />
  );
}
