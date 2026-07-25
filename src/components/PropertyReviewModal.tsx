"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Star, CheckCircle2, X, Send, Sparkles, UserCheck } from "lucide-react";
import { Button } from "./ui/button";

interface PropertyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export default function PropertyReviewModal({
  isOpen,
  onClose,
  propertyName = "Shivalik Edge 4 BHK"
}: PropertyReviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewText) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReviewerName("");
      setReviewText("");
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
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Write a Verified Buyer Review</h3>
            <p className="text-xs text-slate-400">Rate construction quality & locality for <span className="text-blue-400 font-bold">{propertyName}</span></p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white font-display">Review Published!</h4>
            <p className="text-xs text-slate-300">Thank you, <span className="text-emerald-400 font-bold">{reviewerName}</span>. Your verified review is now live on Address Box.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Star Rating Bar */}
            <div className="space-y-1.5 text-center">
              <label className="text-xs font-extrabold uppercase text-slate-400 block">Overall Experience Rating</label>
              <div className="flex justify-center space-x-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Reviewer Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Your Name</label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Rahul Patel"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Review Text */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Review Feedback</label>
              <textarea
                required
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your honest opinion about amenities, floor plan, and builder response..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-black border-none">
                <Send className="w-4 h-4 mr-2" />
                <span>Submit Verified Review</span>
              </Button>
            </div>

          </form>
        )}

      </div>
    </div>,
    document.body
  );
}
