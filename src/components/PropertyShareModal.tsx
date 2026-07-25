"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Share2, Copy, Check, X, MessageSquare, Mail } from "lucide-react";
import { Button } from "./ui/button";

interface PropertyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export default function PropertyShareModal({
  isOpen,
  onClose,
  propertyName = "Shivalik Edge 4 BHK"
}: PropertyShareModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://addressbox.in/property/1";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Share Property Card</h3>
            <p className="text-xs text-slate-400">Export listing details for <span className="text-blue-400 font-bold">{propertyName}</span></p>
          </div>
        </div>

        {/* Shortened URL Bar */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold uppercase text-slate-400">Direct Listing Link</label>
          <div className="flex space-x-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
            />
            <Button type="button" onClick={handleCopy} variant="primary" className="px-4">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* WhatsApp & Email Export Shortcuts */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Check out ${propertyName} on Address Box: ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/20 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(propertyName)}&body=${encodeURIComponent(`Check out ${propertyName} on Address Box: ${shareUrl}`)}`}
            className="py-3 px-4 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

      </div>
    </div>,
    document.body
  );
}
