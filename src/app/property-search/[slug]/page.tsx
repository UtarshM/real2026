import React from "react";
import Metadata from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { seoPagesData, SeoPageData } from "@/data/seo-pages";
import { getAllProperties } from "@/data/properties";
import SearchListings from "@/features/properties/SearchListings";
import { Building2, MapPin, Sparkles, ChevronRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface LocalitySeoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocalitySeoPageProps) {
  const resolvedParams = await params;
  const targetSlug = `/property-search/${resolvedParams.slug}/`;
  const pageData = seoPagesData.find((p) => p.slug === targetSlug || p.slug === `/property-search/${resolvedParams.slug}`);

  if (!pageData) {
    return {
      title: "Property Search | AddressBox Gujarat Real Estate",
      description: "Search residential flats, luxury villas, commercial office spaces & plots in Ahmedabad & Gandhinagar with zero brokerage."
    };
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: `${pageData.targetKeyword}, ${pageData.secondaryKeywords}`,
    alternates: {
      canonical: `https://www.addressbox.com${pageData.slug}`
    },
    openGraph: {
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      url: `https://www.addressbox.com${pageData.slug}`,
      siteName: "AddressBox",
      locale: "en_IN",
      type: "website"
    }
  };
}

export default async function LocalitySeoPage({ params }: LocalitySeoPageProps) {
  const resolvedParams = await params;
  const targetSlug = `/property-search/${resolvedParams.slug}/`;
  const pageData = seoPagesData.find((p) => p.slug === targetSlug || p.slug === `/property-search/${resolvedParams.slug}`);

  if (!pageData) {
    notFound();
  }

  // Live Catalog Filtering
  const allProperties = getAllProperties();
  const lowerSlug = resolvedParams.slug.toLowerCase();

  const matchingListings = allProperties.filter((p) => {
    const locMatch = p.locality && lowerSlug.includes(p.locality.toLowerCase().replace(/\s+/g, "-"));
    const cityMatch = p.city && lowerSlug.includes(p.city.toLowerCase());
    const bhkMatch = p.bhk && lowerSlug.includes(`${p.bhk}bhk`);
    return locMatch || cityMatch || bhkMatch;
  });

  const displayListings = matchingListings.length >= 2 ? matchingListings : allProperties.slice(0, 6);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/buy" className="hover:text-orange-500">{pageData.city}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-extrabold">{pageData.h1}</span>
        </div>

        {/* SEO Header Hero Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-600 dark:text-orange-400 text-xs font-black">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>Verified Micro-Market Catalog — {pageData.city}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-tight">
            {pageData.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-semibold leading-relaxed max-w-4xl">
            {pageData.metaDescription}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-extrabold text-slate-600 dark:text-slate-400">
            <span className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% GUJRERA Verified Listings</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Zero Brokerage Direct Deals</span>
            </span>
          </div>
        </div>

        {/* Live Filterable Catalog */}
        <SearchListings initialProperties={displayListings} />

      </div>
    </div>
  );
}
