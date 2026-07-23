"use client";

import React from "react";
import SearchListings from "@/features/properties/SearchListings";

export default function CommercialPage() {
  return <SearchListings defaultPurpose="BUY" defaultType="COMMERCIAL" />;
}
