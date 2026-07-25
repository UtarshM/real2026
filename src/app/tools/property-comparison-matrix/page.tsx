"use client";

import React from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";

export default function PropertyComparisonMatrixPage() {
  const sampleComps = [
    { name: "Shivalik Edge", location: "Bopal", price: "₹ 1.35 Cr", rate: "₹ 7,297/sq.ft", bhk: "3 BHK", area: "1850 sq.ft", rera: "PR/GJ/AHMEDABAD/1029", score: "96%" },
    { name: "Super Shaligram", location: "Gota", price: "₹ 98 Lakhs", rate: "₹ 6,125/sq.ft", bhk: "3 BHK", area: "1600 sq.ft", rera: "PR/GJ/AHMEDABAD/8472", score: "92%" },
    { name: "Sky Deck Towers", location: "Bodakdev", price: "₹ 2.40 Cr", rate: "₹ 9,600/sq.ft", bhk: "4 BHK", area: "2500 sq.ft", rera: "PR/GJ/AHMEDABAD/9910", score: "98%" }
  ];

  const calculatorUI = (
    <div className="space-y-6 text-slate-900 dark:text-white">
      <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Side-by-Side Property Feature Matrix</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-semibold border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-black">
              <th className="p-3">Attribute</th>
              {sampleComps.map((c, i) => <th key={i} className="p-3">{c.name}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr><td className="p-3 font-bold text-slate-500">Locality</td>{sampleComps.map((c, i) => <td key={i} className="p-3">{c.location}</td>)}</tr>
            <tr><td className="p-3 font-bold text-slate-500">Listed Price</td>{sampleComps.map((c, i) => <td key={i} className="p-3 font-black text-orange-600 dark:text-orange-400">{c.price}</td>)}</tr>
            <tr><td className="p-3 font-bold text-slate-500">Price / Sq.Ft</td>{sampleComps.map((c, i) => <td key={i} className="p-3 font-black text-emerald-600">{c.rate}</td>)}</tr>
            <tr><td className="p-3 font-bold text-slate-500">Configuration</td>{sampleComps.map((c, i) => <td key={i} className="p-3">{c.bhk}</td>)}</tr>
            <tr><td className="p-3 font-bold text-slate-500">Vastu Score</td>{sampleComps.map((c, i) => <td key={i} className="p-3 font-black text-blue-600">{c.score}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "How does the Property Comparison Matrix work?",
      answer: "Compare up to 3 shortlisted properties across price per sq.ft, Vastu compliance scores, carpet vs super built-up area ratios, and RERA registration credentials."
    }
  ];

  return (
    <ToolPageLayout
      toolSlug="property-comparison-matrix"
      title="Property Comparison Matrix & Feature Evaluator"
      categoryTag="Property Decision Tools"
      introParagraph="Compare shortlisted apartments, villas, and commercial properties side-by-side in Gujarat across pricing, super built-up area, rate per sq.ft, and RERA certification status."
      calculatorComponent={calculatorUI}
      promoTitle="Post Property Requirement"
      promoDesc="Let specialists find matching unlisted properties."
      promoButtonText="Post Requirement"
      promoHref="/requirements"
      faqs={faqs}
    />
  );
}
