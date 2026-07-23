"use client";

import React from "react";
import SearchListings from "@/features/properties/SearchListings";

export default function PlotsPage() {
  return <SearchListings defaultPurpose="BUY" defaultType="PLOT" defaultCategory="Plot" />;
}
