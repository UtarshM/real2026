"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PhoneCall, CheckCircle2, X, ShieldCheck, Building2, FileText, Send } from "lucide-react";
import { Button } from "./ui/button";

interface LeadGenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  category?: "LEGAL" | "LOAN" | "VALUATION" | "ONBOARDING";
}

export default function LeadGenModal({
  isOpen,
  onClose,
  title = "Request Assistance & Callback",
  subtitle = "Our verified real estate expert will connect with you within 15 minutes.",
  category = "LEGAL"
}: LeadGenModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
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
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-2xl text-orange-400">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">{title}</h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white font-display">Callback Request Registered!</h4>
            <p className="text-xs text-slate-300">Thank you <span className="text-orange-400 font-bold">{name}</span>. Our expert will call <span className="text-white font-bold">{phone}</span> shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priyesh Shah"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Mobile Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center bg-orange-500 hover:bg-orange-600 font-black text-xs uppercase tracking-wider text-white border-none py-3">
                <Send className="w-4 h-4 mr-2" />
                <span>Submit Instant Request</span>
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>,
    document.body
  );
}
