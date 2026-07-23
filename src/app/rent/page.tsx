"use client";

import React from "react";
import SearchListings from "@/features/properties/SearchListings";

export default function RentPage() {
  return <SearchListings defaultPurpose="RENT" defaultType="RESIDENTIAL" />;
}
