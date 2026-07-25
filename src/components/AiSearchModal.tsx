"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Sparkles, Search, X, Lightbulb } from "lucide-react";

export default function AiSearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const samplePrompts = [
    "3 BHK flat under 90 Lakhs in Bopal",
    "Commercial office space in GIFT City",
    "Rental 2 BHK in Sargasan under 25k",
    "4 BHK luxury bungalow in Gota for sale"
  ];

  const handleExecuteAiSearch = (textToParse: string) => {
    if (!textToParse.trim()) return;

    const queryParams = new URLSearchParams({
      query: textToParse
    });

    setIsOpen(false);
    setPrompt("");
    router.push(`/search?${queryParams.toString()}`);
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md overflow-y-auto flex min-h-full items-center justify-center p-4 font-sans cursor-pointer"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 sm:p-8 relative space-y-6 animate-in fade-in zoom-in-95 duration-200 cursor-default max-h-[85vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-slate-500 hover:text-white p-1 hover:bg-slate-850 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white font-display">AI Natural Language Search</h3>
            <p className="text-slate-455 text-xs">Search properties using conversational plain text prompts</p>
          </div>
        </div>

        {/* Prompt Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleExecuteAiSearch(prompt);
          }}
          className="space-y-4"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4.5 h-4.5 text-slate-500" />
            <input
              type="text"
              autoFocus
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 3 BHK flat under 90L in Bopal with pool"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-2xl pl-11 pr-24 py-3.5 text-xs sm:text-sm outline-none focus:border-blue-600 font-semibold"
            />
            <button
              type="submit"
              className="absolute right-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center space-x-1 cursor-pointer"
            >
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Sample Chips */}
        <div className="space-y-2">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider flex items-center">
            <Lightbulb className="w-3 h-3 text-amber-400 mr-1" />
            Try Sample AI Prompts
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleExecuteAiSearch(sp)}
                className="bg-slate-950 border border-slate-850 hover:border-blue-600/40 text-slate-300 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer text-left"
              >
                &quot;{sp}&quot;
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl flex items-center space-x-2 border border-blue-400/40 hover:scale-105 transition cursor-pointer"
      >
        <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
        <span>Ask AI Search</span>
      </button>

      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
