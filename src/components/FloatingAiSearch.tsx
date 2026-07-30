"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Search } from "lucide-react";
import AiSearchModal from "./AiSearchModal";

export default function FloatingAiSearch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 bg-slate-900/90 backdrop-blur-xl border border-orange-500/40 hover:border-orange-500 text-white px-4 py-3 rounded-2xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          title="Ask AI Property Assistant"
        >
          {/* Glowing background animation pulse */}
          <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-30 group-hover:opacity-75 blur transition duration-300 pointer-events-none" />
          
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-orange-500 text-white shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          <div className="relative text-left hidden sm:block">
            <div className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">AI Voice & Smart Search</div>
            <div className="text-xs font-extrabold text-white flex items-center space-x-1">
              <span>Ask AI Property Finder</span>
              <Bot className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
        </button>
      </div>

      {isOpen && <AiSearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}
