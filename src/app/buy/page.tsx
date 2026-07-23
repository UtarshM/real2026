"use client";

import React from "react";
import SearchListings from "@/features/properties/SearchListings";

export default function BuyPage() {
  return <SearchListings defaultPurpose="BUY" defaultType="RESIDENTIAL" />;
}
