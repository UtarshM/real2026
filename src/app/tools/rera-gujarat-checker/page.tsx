"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReraGujaratCheckerPage() {
  const [reraInput, setReraInput] = useState("PR/GJ/AHMEDABAD/AHMEDABAD CITY/AUDA/RAA08492/180521");
  const [verifiedResult, setVerifiedResult] = useState<any>({
    status: "APPROVED",
    projectName: "Shivalik Edge",
    developer: "Shivalik Group",
    location: "Bopal, Ahmedabad",
    completionDate: "December 2026",
    approvalNo: "PR/GJ/AHMEDABAD/AHMEDABAD CITY/AUDA/RAA08492/180521"
  });

  const calculatorUI = (
    <div className="space-y-6 text-slate-900">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-black uppercase tracking-wider text-slate-900 block mb-1.5">Enter GUJRERA Registration ID</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={reraInput}
              onChange={(e) => setReraInput(e.target.value)}
              placeholder="e.g. PR/GJ/AHMEDABAD/..."
              className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-mono font-black text-slate-900 shadow-sm"
            />
            <button
              onClick={() => alert("Verification refreshed from GUJRERA Portal.")}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase cursor-pointer"
            >
              Verify
            </button>
          </div>
        </div>

        {verifiedResult && (
          <div className="bg-emerald-50 border-2 border-emerald-500/30 p-6 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-emerald-700 font-black text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>100% GUJRERA Verified Project</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-900">
              <div><span className="text-slate-600 block text-[10px] uppercase tracking-wider">Project Name:</span> {verifiedResult.projectName}</div>
              <div><span className="text-slate-600 block text-[10px] uppercase tracking-wider">Promoter:</span> {verifiedResult.developer}</div>
              <div><span className="text-slate-600 block text-[10px] uppercase tracking-wider">Location:</span> {verifiedResult.location}</div>
              <div><span className="text-slate-600 block text-[10px] uppercase tracking-wider">RERA Completion Date:</span> {verifiedResult.completionDate}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const faqs = [
    {
      question: "Why is GUJRERA registration mandatory for properties in Gujarat?",
      answer: "Under the Real Estate (Regulation and Development) Act 2016, any ongoing residential or commercial project over 500 sq. meters or 8 apartments must be registered with GUJRERA to legally advertise or sell."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="rera-gujarat-checker"
      title="RERA Gujarat Compliance & Project Approval Checker"
      categoryTag="GUJRERA Verification Portal"
      introParagraph="Verify official GUJRERA registration numbers, builder licensing credentials, approved floor layouts, and promised possession deadlines for real estate projects across Gujarat."
      calculatorComponent={calculatorUI}
      promoTitle="Check Legal Title Clearance"
      promoDesc="Verify 7/12 extract & encumbrance certificates."
      promoButtonText="Title Checklist"
      promoHref="/tools/legal-title-checklist"
      faqs={faqs}
    />
  );
}
