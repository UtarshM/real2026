"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, CheckCircle2, X } from "lucide-react";
import { Button } from "./ui/button";

interface SavedSearchAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
}

export default function SavedSearchAlertModal({
  isOpen,
  onClose,
  searchQuery = "4 BHK Luxury Flats in Bopal"
}: SavedSearchAlertModalProps) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<"INSTANT" | "DAILY" | "WEEKLY">("INSTANT");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      onClose();
    }, 2200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 font-sans flex min-h-full items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[85vh] overflow-y-auto cursor-default my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Create Property Alert</h3>
            <p className="text-xs text-slate-400">Get notified when new listings match <span className="text-blue-400 font-bold">{searchQuery}</span></p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white font-display">Alert Created Successfully!</h4>
            <p className="text-xs text-slate-300">We will send new property updates to <span className="text-emerald-400 font-bold">{email}</span>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-slate-400">Notification Email</label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Alert Frequency */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-extrabold uppercase text-slate-400">Alert Frequency</label>
              <div className="grid grid-cols-3 gap-2">
                {(["INSTANT", "DAILY", "WEEKLY"] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    className={`py-2.5 rounded-xl text-xs font-extrabold border transition cursor-pointer text-center ${
                      frequency === freq
                        ? "bg-blue-600 border-blue-500 text-white shadow-md"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {freq === "INSTANT" ? "Instant" : freq === "DAILY" ? "Daily" : "Weekly Digest"}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center">
                <Bell className="w-4 h-4 mr-2" />
                <span>Save Property Search Alert</span>
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>,
    document.body
  );
}
