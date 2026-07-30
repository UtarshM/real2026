"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryStats() {
  const stats = [
    {
      title: "Residential Buy",
      count: "18595 Properties",
      link: "/buy",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Commercial Buy",
      count: "4081 Properties",
      link: "/commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Plot Buy",
      count: "232 Properties",
      link: "/plots",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Land Buy",
      count: "43 Properties",
      link: "/plots",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Residential Rent",
      count: "819 Properties",
      link: "/rent",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="bg-slate-50 py-12 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Statistics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Verified active inventory across Ahmedabad & Gandhinagar</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <Link
              key={idx}
              href={stat.link}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 cursor-pointer flex flex-col justify-between p-5 text-white"
            >
              <Image
                src={stat.image}
                alt={stat.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500 brightness-75"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              <div className="relative z-10 space-y-1">
                <h3 className="text-lg font-black font-display leading-tight">{stat.title}</h3>
                <p className="text-xs font-bold text-orange-300">{stat.count}</p>
              </div>

              <div className="relative z-10 pt-4 flex items-center text-xs font-extrabold text-white group-hover:text-amber-300 transition">
                <span>Browse Category →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
