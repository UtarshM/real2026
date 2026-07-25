import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { seoPagesData } from "@/data/seo-pages";
import { getAllProperties } from "@/data/properties";
import SearchListings from "@/features/properties/SearchListings";
import { Navigation, MapPin, ChevronRight, ShieldCheck } from "lucide-react";

interface NearMePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NearMePageProps) {
  const resolvedParams = await params;
  const targetSlug = `/near-me/${resolvedParams.slug}/`;
  const pageData = seoPagesData.find((p) => p.slug === targetSlug || p.slug === `/near-me/${resolvedParams.slug}`);

  if (!pageData) {
    return {
      title: "Properties Near Me | AddressBox Real Estate",
      description: "Find flats, villas & commercial properties near your location in Ahmedabad & Gandhinagar."
    };
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: pageData.targetKeyword,
    alternates: {
      canonical: `https://www.addressbox.com${pageData.slug}`
    }
  };
}

export default async function NearMePage({ params }: NearMePageProps) {
  const resolvedParams = await params;
  const targetSlug = `/near-me/${resolvedParams.slug}/`;
  const pageData = seoPagesData.find((p) => p.slug === targetSlug || p.slug === `/near-me/${resolvedParams.slug}`);

  if (!pageData) {
    notFound();
  }

  const allProperties = getAllProperties();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black">
            <Navigation className="w-4 h-4 text-blue-500" />
            <span>Hyper-Local Near-Me Search — Gujarat</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-tight">
            {pageData.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-semibold leading-relaxed max-w-4xl">
            {pageData.metaDescription}
          </p>
        </div>

        {/* Live Filterable Catalog */}
        <SearchListings initialProperties={allProperties} />

      </div>
    </div>
  );
}
