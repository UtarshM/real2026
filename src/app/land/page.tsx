"use client";

import React from "react";
import SearchListings from "@/features/properties/SearchListings";

export default function LandPage() {
  return <SearchListings defaultPurpose="BUY" defaultType="PLOT" defaultCategory="Land" />;
}
