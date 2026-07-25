"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Layout } from "lucide-react";

export default function FloorPlanViewerPage() {
  const [bhk, setBhk] = useState("3 BHK");

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div className="flex justify-between items-center">
        <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300">Select Architecture Floor Plan</label>
        <div className="flex gap-2">
          {["2 BHK", "3 BHK", "4 BHK Sky Villa"].map((b) => (
            <button
              key={b}
              onClick={() => setBhk(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer ${bhk === b ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl text-center space-y-4 text-slate-900 dark:text-white shadow-sm">
        <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded-full flex items-center justify-center mx-auto">
          <Layout className="w-10 h-10" />
        </div>
        <div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white">{bhk} Standard Architectural Blueprint (Vastu Compliant)</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Super Built-up: 1850 Sq.Ft | Carpet Area Efficiency: 68% | Balconies: 2</p>
        </div>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "What is the difference between Carpet Area and Super Built-Up Area in Gujarat?",
      answer: "Carpet area is the net usable floor area inside the apartment walls. Super built-up area includes proportional common areas like staircases, lobbies, and elevator shafts."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="floor-plan-viewer"
      title="Interactive 2D/3D Floor Plan Dimensions Viewer"
      categoryTag="Architectural Visualization"
      introParagraph="Explore standard 2D and 3D architectural floor layouts, carpet area ratios, room dimensions, and Vastu orientation diagrams for 2 BHK, 3 BHK, and 4 BHK apartments."
      calculatorComponent={calculatorUI}
      promoTitle="Post Property Requirement"
      promoDesc="Request custom floor plans from builders."
      promoButtonText="Post Requirement"
      promoHref="/requirements"
      faqs={faqs}
    />
  );
}
