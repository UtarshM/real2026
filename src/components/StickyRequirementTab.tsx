"use client";

import React from "react";
import Link from "next/link";

export default function StickyRequirementTab() {
  return (
    <Link
      href="/requirements"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#ea580c] hover:bg-orange-600 text-white text-[11px] font-black tracking-widest px-2.5 py-5 rounded-l-2xl shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer group"
      style={{ backgroundColor: "#ea580c", writingMode: "vertical-rl" }}
      title="Tell Us Your Requirement"
    >
      <span className="group-hover:scale-105 transition-transform uppercase">
        TELL US YOUR REQUIREMENT
      </span>
    </Link>
  );
}
