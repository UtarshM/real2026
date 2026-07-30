"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

export default function VideoWalkthroughReels() {
  const reels = [
    {
      id: "v-1",
      title: "Arcadia 77 | 4 & 5 BHK Apartments in Gota, Ahmedabad",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "v-2",
      title: "Madhuban Kadamb | Modern Living in the Heart of Sola",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "v-3",
      title: "Vivaan Ixora | Premium 3 BHK Living in Zundal, Ahmedabad",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "v-4",
      title: "Vivaan Essence | 2 BHK in Zundal, Ahmedabad",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "v-5",
      title: "Vivaan Aura | 2 & 3 BHK Apartments in Ahmedabad",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="bg-white py-12 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Video Property Tours
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Watch authentic 4K video walkthroughs inspected by AddressBox specialists</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveVideo(reel.title)}
              className="group relative h-80 rounded-3xl overflow-hidden bg-slate-950 shadow-lg hover:shadow-2xl transition duration-500 cursor-pointer flex flex-col justify-end p-4 text-white border border-slate-800"
            >
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500 opacity-80"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:scale-110 transition duration-300 shadow-xl">
                  <Play className="w-6 h-6 fill-white text-white ml-1" />
                </div>
              </div>

              <div className="relative z-10 space-y-1">
                <h3 className="text-xs font-bold leading-snug line-clamp-2 drop-shadow">{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 bg-slate-800 rounded-full cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-extrabold text-white pr-8">{activeVideo}</h4>
            <div className="aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center text-slate-500 font-bold text-xs">
              <span>Video Walkthrough Player Placeholder</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
