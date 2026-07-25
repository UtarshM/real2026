"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calculator, ArrowRight, Sparkles, ChevronUp, ChevronDown, 
  HelpCircle, TrendingUp, ShieldCheck, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { all12Tools } from "@/data/tools";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedTool {
  title: string;
  desc: string;
  href: string;
}

interface ToolPageLayoutProps {
  toolSlug: string;
  title: string;
  categoryTag: string;
  introParagraph: string;
  calculatorComponent: React.ReactNode;
  amortizationDetails?: React.ReactNode;
  promoTitle: string;
  promoDesc: string;
  promoButtonText: string;
  promoHref: string;
  faqs?: FAQItem[];
  relatedTools?: RelatedTool[];
}

export default function ToolPageLayout({
  toolSlug,
  title,
  categoryTag,
  introParagraph,
  calculatorComponent,
  amortizationDetails,
  promoTitle,
  promoDesc,
  promoButtonText,
  promoHref,
  faqs,
  relatedTools,
}: ToolPageLayoutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAmortization, setShowAmortization] = useState(false);

  const popularTools = all12Tools.filter((t) => t.slug !== toolSlug).slice(0, 11);

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Schema Injection */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-600 text-xs font-bold shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-orange-500" />
            <span>{categoryTag}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
            {title}
          </h1>

          {/* 150-250 Word Intro Paragraph */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 text-sm text-slate-700 font-semibold leading-relaxed shadow-sm">
            <p>{introParagraph}</p>
          </div>
        </div>

        {/* Two Column Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Interactive Calculator & Results */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Calculator Card Shell */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-slate-900">
              {calculatorComponent}
            </div>

            {/* Optional Amortization Table Accordion */}
            {amortizationDetails && (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg text-slate-900">
                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full flex justify-between items-center p-6 text-left font-black text-sm text-slate-900 hover:bg-slate-50 transition cursor-pointer"
                >
                  <span className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>Amortization Schedule & Yearly Breakdown</span>
                  </span>
                  {showAmortization ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {showAmortization && (
                  <div className="p-6 pt-0 border-t border-slate-200">
                    {amortizationDetails}
                  </div>
                )}
              </div>
            )}

            {/* FAQ Accordion Section */}
            {faqs && faqs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-slate-900">
                <h3 className="text-xl font-black text-slate-900 font-display flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full p-4 text-left font-black text-xs sm:text-sm text-slate-900 flex justify-between items-center hover:bg-slate-50 transition cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {openFaq === idx ? <ChevronUp className="w-4 h-4 text-orange-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>
                      {openFaq === idx && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Cross-Links Section */}
            {relatedTools && relatedTools.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-black uppercase text-slate-600 tracking-wider">Related Real Estate Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedTools.map((rt, idx) => (
                    <Link
                      key={idx}
                      href={rt.href}
                      className="bg-white border border-slate-200 p-4.5 rounded-2xl hover:border-orange-500 shadow-sm transition space-y-1.5 group text-slate-900"
                    >
                      <h4 className="text-xs font-black text-slate-900 group-hover:text-orange-500 transition">{rt.title}</h4>
                      <p className="text-[11px] text-slate-600 font-medium line-clamp-2">{rt.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR: Promo Card + Popular Tools Bordered List */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Promo / Cross-Sell Card */}
            <div className="bg-white border-2 border-orange-500/30 rounded-3xl p-6 shadow-xl space-y-4 text-slate-900">
              <div className="w-10 h-10 bg-orange-500 rounded-2xl text-white flex items-center space-x-1 justify-center shadow-md shadow-orange-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 font-display">{promoTitle}</h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">{promoDesc}</p>
              </div>
              <Link href={promoHref} className="block pt-1">
                <Button variant="primary" size="md" className="w-full justify-center text-xs font-black uppercase tracking-wider">
                  <span>{promoButtonText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Popular Calculators / Tools List */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xl space-y-4 text-slate-900">
              <h3 className="text-xs font-black uppercase text-slate-600 tracking-wider px-1">
                Popular Calculators & Tools
              </h3>
              <div className="divide-y divide-slate-100">
                {popularTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="flex items-center justify-between py-3 px-2 rounded-xl text-xs font-black text-slate-800 hover:text-orange-600 hover:bg-orange-50 transition group"
                  >
                    <span className="truncate pr-2">{tool.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
