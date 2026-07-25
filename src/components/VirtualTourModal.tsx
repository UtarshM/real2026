"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Video, CheckCircle2, X, Calendar, Clock, UserCheck } from "lucide-react";
import { Button } from "./ui/button";

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export default function VirtualTourModal({
  isOpen,
  onClose,
  propertyName = "Shivalik Edge 4 BHK"
}: VirtualTourModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("11:00 AM - 12:00 PM");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !preferredDate) return;
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
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-red-600/20 border border-red-500/30 rounded-2xl text-red-400">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Book Guided 3D Virtual Tour</h3>
            <p className="text-xs text-slate-400">Interactive live walk-through with agent for <span className="text-blue-400 font-bold">{propertyName}</span></p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white font-display">Virtual Tour Scheduled!</h4>
            <p className="text-xs text-slate-300">Agent invitation sent to <span className="text-emerald-400 font-bold">{phone}</span> for <span className="text-white font-bold">{preferredDate} at {timeSlot}</span>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amit Varma"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Mobile Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Preferred Date */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Select Date</label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Preferred Time Slot */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Select Time Window</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 cursor-pointer"
              >
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM (Morning)</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM (Afternoon)</option>
                <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM (Evening)</option>
              </select>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full justify-center bg-red-600 hover:bg-red-500 border-none">
                <Video className="w-4 h-4 mr-2" />
                <span>Confirm Virtual Tour Slot</span>
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>,
    document.body
  );
}
