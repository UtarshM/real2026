import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { BookOpen, ShieldCheck, TrendingUp, ChevronRight, Clock, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Real Estate News, RERA Guides & Market Insights | AddressBox Blog",
  description: "Read latest Ahmedabad & Gandhinagar property market news, GUJRERA legal compliance guides, home loan advice, and real estate investment reports."
};

export default function BlogIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://addressbox.in" },
    { name: "Blog & Market Insights", url: "https://addressbox.in/blog" }
  ];

  const articles = [
    {
      slug: "rera-gujarat-guide",
      title: "GUJRERA Verification Guide 2026: How to Check Developer RERA Status in Gujarat",
      excerpt: "Step-by-step guide to verify GUJRERA numbers online, check project escrow compliance, and safeguard your home investment.",
      category: "Legal & RERA",
      readTime: "6 min read",
      date: "July 24, 2026",
      author: "AddressBox Advisory Team",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
    },
    {
      slug: "gift-city-investment-report-2026",
      title: "GIFT City Real Estate Outlook: Why IT Professionals & Investors are Buying in Gandhinagar",
      excerpt: "Analysis of commercial rental yields (7.5%+), tax exemptions, and residential appreciation corridors along GIFT City.",
      category: "Market Insights",
      readTime: "8 min read",
      date: "July 18, 2026",
      author: "Market Intelligence Cell",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    },
    {
      slug: "ahmedabad-metro-phase-2-impact",
      title: "Ahmedabad Metro Phase 2 Impact on Property Prices in Bopal, Motera & Kudasan",
      excerpt: "Detailed breakdown of price density surges around upcoming metro stations along SP Ring Road and Koba Circle.",
      category: "Infrastructure",
      readTime: "5 min read",
      date: "July 12, 2026",
      author: "Urban Infrastructure Desk",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-orange-400">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400 font-bold">Blog & News</span>
        </div>

        {/* Header */}
        <div className="bg-slate-900 border border-orange-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
            <BookOpen className="w-4 h-4" />
            <span>AddressBox Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display">Real Estate Guides & Market News</h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">
            Expert analysis on Gujarat real estate, RERA compliance checklists, price trend reports, and smart buyer strategies.
          </p>
        </div>

        {/* Featured Article Hero Card */}
        <div className="bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-3xl overflow-hidden transition group grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 relative h-64 sm:h-96">
            <Image
              src={articles[0].image}
              alt={articles[0].title}
              width={1000}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-orange-400 uppercase bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
                {articles[0].category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-orange-400 transition font-display">
                {articles[0].title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">{articles[0].excerpt}</p>
            </div>
            
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{articles[0].readTime} • {articles[0].date}</span>
              <Link href={`/blog/${articles[0].slug}`}>
                <Button variant="primary" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl border-none">
                  <span>Read Article →</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-orange-500/40 transition group flex flex-col justify-between">
              <div className="relative h-48 w-full">
                <Image src={art.image} alt={art.title} width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-orange-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border border-slate-800">
                  {art.category}
                </span>
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition line-clamp-2">{art.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{art.excerpt}</p>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                  <span>{art.readTime}</span>
                  <Link href={`/blog/${art.slug}`} className="text-orange-400 font-extrabold hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
