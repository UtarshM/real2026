"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchListings from "@/features/properties/SearchListings";
import { Loader2 } from "lucide-react";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const purpose = (searchParams.get("purpose")?.toUpperCase() as "BUY" | "RENT") || "BUY";
  const type = (searchParams.get("type")?.toUpperCase() as "RESIDENTIAL" | "COMMERCIAL" | "PLOT") || "RESIDENTIAL";
  const query = searchParams.get("query") || "";
  const bhk = searchParams.get("bhk") || "";
  const maxBudget = searchParams.get("maxBudget") ? Number(searchParams.get("maxBudget")) : undefined;

  return (
    <SearchListings
      defaultPurpose={purpose}
      defaultType={type}
      defaultQuery={query}
      defaultBhk={bhk}
      defaultMaxBudget={maxBudget}
    />
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-slate-950 min-h-screen py-16 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
            <p className="text-slate-400 text-xs sm:text-sm font-semibold">Loading verified property listings...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
