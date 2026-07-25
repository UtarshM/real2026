import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { initialProperties } from "@/data/properties";
import { generateBreadcrumbSchema, generateFaqSchema } from "@/lib/seo";
import { ShieldCheck, MapPin, Building2, CheckCircle2, ChevronRight, Phone, MessageSquare, Compass, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const formattedName = slug.replace("-", " ");
  const capitalized = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

  return {
    title: `${capitalized} Project — RERA Verified Specs, Pricing & Floor Plans | AddressBox`,
    description: `Detailed project brochure, RERA verification ID, floor plans, construction status, and direct builder prices for ${capitalized}.`
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const formattedName = slug.replace("-", " ");

  const property = initialProperties[0]; // Sample property details fallback

  const breadcrumbs = [
    { name: "Home", url: "https://addressbox.in" },
    { name: "Projects", url: "https://addressbox.in/buy" },
    { name: property.title, url: `https://addressbox.in/project/${slug}` }
  ];

  const faqs = [
    { q: "What is the RERA registration number of this project?", a: `RERA ID: ${property.reraId}` },
    { q: "What are the pre-approved home loan banks?", a: "SBI, HDFC Bank, ICICI Bank, Bank of Baroda, Axis Bank." }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFaqSchema(faqs);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-orange-400">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/buy" className="hover:text-orange-400">Projects</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400 font-bold">{property.title}</span>
        </div>

        {/* Project Hero Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GUJRERA Verified Project</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-display">{property.title}</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center">
                <MapPin className="w-4 h-4 text-orange-400 mr-1" />
                <span>{property.locality}, {property.city} • Developed by Shivalik Group</span>
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase font-bold block">Starting Price</span>
              <span className="text-2xl sm:text-3xl font-black text-orange-400 font-display">{property.price}</span>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">RERA Registration</span>
              <span className="font-mono text-orange-400 font-bold truncate block">{property.reraId}</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Vastu Score</span>
              <span className="font-black text-amber-400">{property.vastuScore}% Harmony</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Configuration</span>
              <span className="font-bold text-white">3 & 4 BHK Luxury</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Possession</span>
              <span className="font-bold text-emerald-400">Ready to Move</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="https://wa.me/919876543210?text=Hi,%20I%20am%20interested%20in%20project%20details." target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl border-none">
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Get Direct Builder Offer on WhatsApp</span>
              </Button>
            </a>

            <Link href="/valuation">
              <Button variant="outline" className="border-orange-500/40 text-orange-400 hover:bg-orange-500/10 text-xs px-5 py-3 rounded-xl">
                <span>Check AI Valuation & Rental Yield</span>
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
