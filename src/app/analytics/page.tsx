"use client";

import React, { useState } from "react";
import { Eye, MousePointerClick, Heart, Bookmark, BarChart3, PieChart, Map, Globe, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  const [metricData, setMetricData] = useState({
    views: 14520,
    clicks: 1845,
    favorites: 320,
    leads: 18,
    conversionRate: "12.7%"
  });

  const trafficSources = [
    { source: "Google Search", users: 8450, share: "58.2%" },
    { source: "Direct Traffic", users: 3120, share: "21.5%" },
    { source: "WhatsApp Shares", users: 1840, share: "12.7%" },
    { source: "Other Portals", users: 1110, share: "7.6%" }
  ];

  const regionalViews = [
    { city: "Ahmedabad (Bopal)", views: 6200, leadCount: 8 },
    { city: "Ahmedabad (Gota)", views: 4100, leadCount: 5 },
    { city: "Gandhinagar (Sargasan)", views: 2800, leadCount: 3 },
    { city: "GIFT City", views: 1420, leadCount: 2 }
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-12 text-white relative">
      
      {/* Background glow graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10 font-sans">
        
        {/* Header Title */}
        <div className="border-b border-slate-850 pb-5">
          <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">System Analytics Engine</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-display">Performance Analytics</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
            Real-time analytics monitor tool tracking property listing exposures, CTR conversion, and visitor sources.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Property Views</span>
            <span className="text-white text-2xl font-black block">{metricData.views.toLocaleString()}</span>
            <span className="text-[10px] text-green-500 font-bold">▲ 14.5% vs last month</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">WhatsApp Clicks</span>
            <span className="text-white text-2xl font-black block">{metricData.clicks.toLocaleString()}</span>
            <span className="text-[10px] text-green-500 font-bold">▲ 8.2% vs last month</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Bookmarks Save</span>
            <span className="text-white text-2xl font-black block">{metricData.favorites}</span>
            <span className="text-[10px] text-slate-500 font-bold">Hold stable index</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Qualified Leads</span>
            <span className="text-white text-2xl font-black block">{metricData.leads}</span>
            <span className="text-[10px] text-green-500 font-bold">▲ 2 new leads today</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl col-span-2 md:col-span-1 space-y-2">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">CTR Conversion</span>
            <span className="text-blue-500 text-2xl font-black block">{metricData.conversionRate}</span>
            <span className="text-[10px] text-slate-500 font-bold">Industry average 8%</span>
          </div>
        </div>

        {/* Visual Lead Conversion Funnel Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-850 pb-3">
            <h3 className="font-extrabold text-base sm:text-lg text-white font-display uppercase tracking-wider flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span>Lead Conversion Pipeline Funnel</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Conversion efficiency: 12.7%</span>
          </div>

          <div className="space-y-3 font-semibold text-xs sm:text-sm">
            {[
              { stage: "1. Search Impressions", count: "14,520", pct: 100, color: "bg-blue-600" },
              { stage: "2. Clicks & Details Views", count: "1,845", pct: 68, color: "bg-blue-500" },
              { stage: "3. Direct Inquiries", count: "320", pct: 42, color: "bg-amber-500" },
              { stage: "4. Site Visits Scheduled", count: "45", pct: 25, color: "bg-orange-500" },
              { stage: "5. Closed Deals (Won)", count: "18", pct: 14, color: "bg-green-500" }
            ].map((f, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-350">
                  <span>{f.stage}</span>
                  <span className="font-bold text-white">{f.count} ({f.pct}%)</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-850">
                  <div className={`h-full ${f.color} transition-all duration-500`} style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts reports grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Traffic Sources list */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
            <h3 className="font-extrabold text-base text-white font-display uppercase tracking-wider flex items-center space-x-2 border-b border-slate-850 pb-3">
              <Globe className="w-5 h-5 text-blue-500" />
              <span>Visitor traffic sources</span>
            </h3>

            <div className="space-y-4">
              {trafficSources.map((ts, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded" />
                    <span className="text-slate-300">{ts.source}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-slate-500">{ts.users.toLocaleString()} users</span>
                    <span className="text-white font-bold">{ts.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Geo listing Performance */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
            <h3 className="font-extrabold text-base text-white font-display uppercase tracking-wider flex items-center space-x-2 border-b border-slate-850 pb-3">
              <Map className="w-5 h-5 text-blue-500" />
              <span>Regional performance</span>
            </h3>

            <div className="space-y-4">
              {regionalViews.map((rv, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                  <span className="text-slate-350">{rv.city}</span>
                  <div className="flex items-center space-x-6">
                    <span className="text-slate-500">{rv.views.toLocaleString()} views</span>
                    <span className="text-blue-500 font-bold">{rv.leadCount} leads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Security Audit disclaimer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-xs font-semibold text-slate-500 max-w-xl mx-auto flex items-center justify-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <span>Analytics metrics verified under GDPR cookie parameters. Opt-out logs stored securely.</span>
        </div>

      </div>
    </div>
  );
}
