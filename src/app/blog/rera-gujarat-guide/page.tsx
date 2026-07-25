import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getFaqSchema, getBreadcrumbSchema } from "@/lib/seo";
import { FileCheck, ShieldCheck, CheckCircle2, HelpCircle, ArrowLeft, BookOpen, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: `GUJRERA Verification Guide 2026: How to Check RERA Registration in Gujarat | ${siteConfig.name}`,
  description: "Complete guide on how to verify GUJRERA numbers, check developer registration status, file RERA complaints in Gujarat, and ensure buyer legal safety.",
  alternates: {
    canonical: `${siteConfig.url}/blog/rera-gujarat-guide`,
  },
};

export default function ReraGuidePage() {
  const faqs = [
    {
      question: "How do I verify a property's GUJRERA number online?",
      answer: "Visit the official Gujarat RERA portal (gujrera.gujarat.gov.in), navigate to 'Registered Projects', and search using the developer name or the PR/GJ RERA registration number."
    },
    {
      question: "Why should home buyers in Ahmedabad only purchase RERA registered properties?",
      answer: "RERA registration guarantees title verification, builder accountability for project deadlines, mandatory 70% escrow funding, and protection against misleading developer advertisements."
    },
    {
      question: "What is the process to file a RERA complaint in Gujarat?",
      answer: "Complaints are submitted through the GUJRERA online portal by filing Form A along with supporting booking receipts and developer communication history."
    }
  ];

  const faqSchema = getFaqSchema(faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "RERA Resource Center", url: "/blog/rera-gujarat-guide" }
  ]);

  return (
    <div className="bg-slate-950 min-h-screen py-12 text-slate-300 relative font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Rama Realty Buyer Protection Series</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
            How to Verify GUJRERA Registration & Check Builder Certificates in Gujarat (2026 Guide)
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Published by {siteConfig.name} Editorial Team • Inspected by RERA Certified Brokerage Specialist
          </p>
        </div>

        {/* Article Body */}
        <div className="space-y-8 text-sm leading-relaxed text-slate-300">
          
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <span>Step-by-Step GUJRERA Online Verification Checklist</span>
            </h2>
            
            <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
              <li>Visit the official portal at <strong className="text-white">gujrera.gujarat.gov.in</strong></li>
              <li>Click on <strong className="text-white">&quot;Projects&quot;</strong> ➔ <strong className="text-white">&quot;Search Registered Projects&quot;</strong></li>
              <li>Enter the project RERA registration number (formatted as <code className="text-emerald-400 font-mono">PR/GJ/AHMEDABAD/...</code>)</li>
              <li>Verify the approved completion date, building layouts, bank escrow account details, and RERA quarterly progress reports (QPR).</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Why RERA Verification Matters Before Paying Booking Token</h2>
            <p>
              Under the Real Estate (Regulation and Development) Act in Gujarat, developers cannot advertise, book, or collect advance payments without an active GUJRERA registration number. Working with certified local specialists like {siteConfig.name} ensures every property has been physically cross-verified against municipal approvals.
            </p>
          </section>

          {/* FAQ Block */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-2 text-emerald-400">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">GUJRERA Buyer FAQs</h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
