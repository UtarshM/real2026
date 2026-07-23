"use client";

import React from "react";
import SearchListings from "@/features/properties/SearchListings";

export default function PgPage() {
  return <SearchListings defaultPurpose="RENT" defaultType="RESIDENTIAL" defaultCategory="PG/Co-living" />;
}
