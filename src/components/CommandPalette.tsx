"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, Command, ArrowRight, ShieldCheck, PlusCircle, Bookmark, PhoneCall, HelpCircle, X, CornerDownLeft } from "lucide-react";

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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans cursor-pointer overflow-y-auto"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default max-h-[85vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
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
            className="text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
          {filtered.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-800/80 transition text-left group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition">
                  <CornerDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition">{item.label}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                </div>
              </div>

              {item.shortcut && (
                <kbd className="text-[9px] font-black text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg">
                  {item.shortcut}
                </kbd>
              )}
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-slate-500 space-y-1">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-655" />
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
    </div>,
    document.body
  );
}
