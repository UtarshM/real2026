"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { CheckCircle2 } from "lucide-react";

export default function LegalTitleChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true });

  const checklist = [
    { title: "GUJRERA Registration Certificate", desc: "Verify project status on gujrera.gujarat.gov.in" },
    { title: "7/12 & 8A Land Revenue Extracts", desc: "Ownership proof from Revenue Department" },
    { title: "Non-Agricultural (NA) Permission", desc: "Order converting agricultural land for residential/commercial use" },
    { title: "Commencement Certificate (CC)", desc: "Urban development authority (AUDA/GDA) building plan approval" },
    { title: "Search Report & Title Clearance Certificate", desc: "30-year lawyer search report confirming zero legal disputes" },
    { title: "Encumbrance Certificate (EC)", desc: "Confirms property has zero registered bank mortgages" }
  ];

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const count = Object.values(checkedItems).filter(Boolean).length;

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Property Due Diligence Checklist</h3>
        <span className="bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-black px-3 py-1 rounded-full">
          {count} of {checklist.length} Verified
        </span>
      </div>

      <div className="space-y-3">
        {checklist.map((item, idx) => (
          <div
            key={idx}
            onClick={() => toggleCheck(idx)}
            className={`p-4 rounded-xl border flex items-start space-x-3 cursor-pointer transition ${
              checkedItems[idx]
                ? "bg-emerald-500/10 border-emerald-500/30 text-slate-900 dark:text-white"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-500"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 mt-0.5 ${checkedItems[idx] ? "text-emerald-500" : "text-slate-400"}`} />
            <div>
              <h4 className="text-xs font-black">{item.title}</h4>
              <p className="text-[11px] font-medium text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const faqs = [
    {
      question: "Why is a 30-year Search Report critical before buying property in Gujarat?",
      answer: "A legal search report prepared by a High Court advocate traces the property's chain of ownership across 30 years to verify clear marketability, absence of litigation, and valid title deeds."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="legal-title-checklist"
      title="Property Legal Title Clearance & Due Diligence Checklist"
      categoryTag="Legal Verification"
      introParagraph="Ensure 100% legal safety before buying property in Gujarat. Verify 7/12 revenue extracts, NA permissions, AUDA building plans, and 30-year lawyer search reports."
      calculatorComponent={calculatorUI}
      promoTitle="Verify GUJRERA Status"
      promoDesc="Verify builder RERA registration credentials."
      promoButtonText="Run RERA Checker"
      promoHref="/tools/rera-gujarat-checker"
      faqs={faqs}
    />
  );
}
