"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Command, ArrowRight, ShieldCheck, PlusCircle, Bookmark, PhoneCall, HelpCircle, X } from "lucide-react";

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const items = [
    { label: "Search Buy properties", desc: "Browse properties for sale", shortcut: "G B", action: () => router.push("/buy") },
    { label: "Search Rent properties", desc: "Browse rental apartments & PGs", shortcut: "G R", action: () => router.push("/rent") },
    { label: "Post Property for Free", desc: "Open 9-step posting stepper", shortcut: "P P", action: () => router.push("/post-property") },
    { label: "Submit Requirements", desc: "Let managers match listings", shortcut: "S R", action: () => router.push("/requirements") },
    { label: "Open Billing Pricing", desc: "Explore agent plans", shortcut: "G P", action: () => router.push("/pricing") },
    { label: "Inquiries CRM Dashboard", desc: "Check lead followups pipeline", shortcut: "G C", action: () => router.push("/crm") },
    { label: "Towers Builder Portal", desc: "Check Towers occupancy availability", shortcut: "G T", action: () => router.push("/builder") },
    { label: "Administrative Control Panel", desc: "Verify listings & user suspend", shortcut: "G A", action: () => router.push("/admin") },
  ];

  const filtered = query
    ? items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()) || item.desc.toLowerCase().includes(query.toLowerCase()))
    : items;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Input area */}
        <div className="flex items-center border-b border-slate-850 px-4 py-3 bg-slate-950/40">
          <Search className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white border-none outline-none text-sm sm:text-base font-semibold placeholder:text-slate-655"
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-white p-1 hover:bg-slate-850 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results directory */}
        <div className="max-h-80 overflow-y-auto p-4 space-y-2">
          {filtered.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className="w-full text-left p-3 hover:bg-slate-850/50 rounded-2xl transition flex justify-between items-center group cursor-pointer"
            >
              <div className="flex items-start space-x-3.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0">
                  <Command className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm text-white font-bold block group-hover:text-blue-550 transition">{item.label}</span>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">{item.desc}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="bg-slate-950 border border-slate-850 text-slate-500 text-[9px] px-2 py-0.5 rounded font-black tracking-wider group-hover:text-white transition">
                  {item.shortcut}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-650 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-slate-500 space-y-1">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-650" />
              <p className="text-xs font-semibold">No commands matching query found.</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="bg-slate-950/80 px-5 py-3 border-t border-slate-850 text-[10px] text-slate-500 font-black flex justify-between items-center">
          <span>Press ESC to close</span>
          <span>Ctrl + K or ⌘ + K to toggle</span>
        </div>

      </div>
    </div>
  );
}
