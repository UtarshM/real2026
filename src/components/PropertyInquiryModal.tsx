"use client";

import React, { useState } from "react";
import { MessageCircle, PhoneCall, Calendar, X, CheckCircle2, Send, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface PropertyInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export default function PropertyInquiryModal({ isOpen, onClose, propertyName = "Shivalik Edge 4 BHK" }: PropertyInquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
      setVisitDate("");
      onClose();
    }, 2500);
  };

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return require("react-dom").createPortal(
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 font-sans flex min-h-full items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[85vh] overflow-y-auto cursor-default my-auto"
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
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Schedule Guided Site Visit</h3>
            <p className="text-xs text-slate-400">Direct Developer Inquiry for <span className="text-blue-400 font-bold">{propertyName}</span></p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white font-display">Inquiry Registered!</h4>
            <p className="text-xs text-slate-300">Our dedicated Rama Realty agent will contact you on <span className="text-emerald-400 font-bold">{phone}</span> shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-slate-400">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-slate-400">Phone Number (WhatsApp Verified)</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-slate-400">Preferred Visit Date</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center">
                <Send className="w-4 h-4 mr-2" />
                <span>Confirm Free Site Visit Request</span>
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>,
    document.body
  );
}
