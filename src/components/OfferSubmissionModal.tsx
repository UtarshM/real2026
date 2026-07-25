"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Tag, CheckCircle2, X, Send, IndianRupee, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

interface OfferSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
  askingPrice?: number;
}

export default function OfferSubmissionModal({
  isOpen,
  onClose,
  propertyName = "3 BHK Luxury Flat in Bopal",
  askingPrice = 12500000
}: OfferSubmissionModalProps) {
  const [mounted, setMounted] = useState(false);
  const [offerPrice, setOfferPrice] = useState<number>(askingPrice * 0.95);
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
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Make a Digital Price Offer</h3>
            <p className="text-xs text-slate-400">Direct Non-Binding Counter-Offer for <span className="text-blue-400 font-bold">{propertyName}</span></p>
          </div>
        </div>

        {/* Asking vs Offer Display */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
          <div>
            <span className="text-slate-500 font-bold block uppercase">Seller Asking Price</span>
            <span className="text-white font-black text-sm">₹ {(askingPrice / 100000).toFixed(0)} Lakhs</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 font-bold block uppercase">Your Counter Offer</span>
            <span className="text-emerald-400 font-black text-base font-display">₹ {(offerPrice / 100000).toFixed(0)} Lakhs</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white font-display">Offer Submitted to Seller!</h4>
            <p className="text-xs text-slate-300">The property developer/owner will review your offer of <span className="text-emerald-400 font-bold">₹ {(offerPrice / 100000).toFixed(0)} Lakhs</span> and contact you on {phone}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-slate-400">Set Counter Offer Amount</label>
              <input
                type="range"
                min={askingPrice * 0.75}
                max={askingPrice * 1.05}
                step={50000}
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-slate-400">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-slate-400">WhatsApp / Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center bg-emerald-600 hover:bg-emerald-500 border-none">
                <Send className="w-4 h-4 mr-2" />
                <span>Submit Non-Binding Price Offer</span>
              </Button>
            </div>

          </form>
        )}

      </div>
    </div>,
    document.body
  );
}
