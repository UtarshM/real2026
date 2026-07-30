import React from "react";
import Link from "next/link";
import { seoPagesData } from "@/data/seo-pages";
import JsonLdSchema from "@/components/JsonLdSchema";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const formattedCategory = category.replace(/-/g, " ").toUpperCase();
  return {
    title: `${formattedCategory} - HTML Locality Directory | AddressBox`,
    description: `Complete HTML sitemap directory of ${formattedCategory} listings, prices, floor plans, and verified properties across Ahmedabad & Gandhinagar.`,
    alternates: {
      canonical: `https://addressbox.in/sitemap/html/${category}`,
    },
  };
}

export default async function HtmlCategorySitemapPage({ params }: PageProps) {
  const { category } = await params;

  // Filter pages matching category pattern or fall back to general list
  const matchedPages = seoPagesData.filter((p) => {
    const slugLower = p.slug.toLowerCase();
    const query = category.toLowerCase();
    return (
      slugLower.includes(query) ||
      (query.includes("flats") && slugLower.includes("flats")) ||
      (query.includes("rent") && slugLower.includes("rent")) ||
      (query.includes("commercial") && slugLower.includes("commercial")) ||
      (query.includes("plots") && slugLower.includes("plot")) ||
      (query.includes("gandhinagar") && p.city === "Gandhinagar")
    );
  });

  const displayList = matchedPages.length > 0 ? matchedPages : seoPagesData.slice(0, 80);
  const formattedTitle = category.replace(/-/g, " ").toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <JsonLdSchema type="Breadcrumb" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumb & Header */}
        <div className="mb-10 border-b border-slate-200 dark:border-slate-800 pb-8">
          <nav className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition">Home</Link>
            <span>/</span>
            <Link href="/sitemap/html" className="hover:text-orange-600 dark:hover:text-orange-400 transition">HTML Sitemap</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">{category}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            HTML Sitemap: {formattedTitle}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm max-w-3xl font-medium leading-relaxed">
            Browse all indexable hyper-local landing pages for {formattedTitle} across Ahmedabad & Gandhinagar. Click any link to view current active inventory, floor plans, and pricing trends.
          </p>
        </div>

        {/* Locality Links List */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Indexed Locality Landing Pages ({displayList.length})
            </h2>
            <Link href="/sitemap/html" className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline">
              &larr; Back to Sitemap Hub
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {displayList.map((page, idx) => (
              <Link
                key={idx}
                href={page.slug}
                className="text-xs text-slate-800 dark:text-slate-200 font-semibold hover:text-orange-600 dark:hover:text-orange-400 bg-slate-50 dark:bg-slate-950 hover:bg-orange-50/50 dark:hover:bg-orange-500/10 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-300 transition flex flex-col justify-between"
              >
                <span className="font-bold text-slate-900 dark:text-white truncate mb-1">{page.h1}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{page.city} • {page.pageType}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
