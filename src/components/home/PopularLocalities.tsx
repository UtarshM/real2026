"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PopularLocalities() {
  const localities = [
    {
      name: "Prahladnagar",
      city: "Ahmedabad",
      properties: "2,410+ Properties",
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Vaishno Devi Circle",
      city: "Ahmedabad",
      properties: "1,890+ Properties",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "GIFT City",
      city: "Gandhinagar",
      properties: "1,120+ Properties",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Zundal",
      city: "Gandhinagar",
      properties: "940+ Properties",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sola",
      city: "Ahmedabad",
      properties: "1,650+ Properties",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Bopal & Shela",
      city: "Ahmedabad",
      properties: "3,250+ Properties",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Science City",
      city: "Ahmedabad",
      properties: "1,420+ Properties",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sargasan",
      city: "Gandhinagar",
      properties: "870+ Properties",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="bg-white py-12 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Popular Localities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Explore high demand real estate hubs in Ahmedabad & Gandhinagar</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {localities.map((loc, idx) => (
            <Link
              key={idx}
              href={`/search?query=${encodeURIComponent(loc.name)}`}
              className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-[#ea580c] transition duration-300 shadow-xs flex flex-col cursor-pointer"
            >
              <div className="relative h-28 bg-slate-900 overflow-hidden">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  unoptimized
                />
              </div>
              <div className="p-2.5 text-center">
                <h3 className="text-xs font-black text-slate-900 group-hover:text-[#ea580c] transition font-display truncate">{loc.name}</h3>
                <span className="text-[10px] text-slate-400 font-semibold block">{loc.city}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
