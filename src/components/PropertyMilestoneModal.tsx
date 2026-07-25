"use client";

import React from "react";
import { CheckCircle2, Clock, Building2, X, ShieldCheck } from "lucide-react";

interface PropertyMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

export default function PropertyMilestoneModal({
  isOpen,
  onClose,
  projectName = "Shivalik Edge & Sky Villas"
}: PropertyMilestoneModalProps) {
  const milestones = [
    { stage: "Excavation & Site Clearing", status: "COMPLETED", date: "Jan 2024", percent: 100 },
    { stage: "Substructure & Plinth Level", status: "COMPLETED", date: "Jun 2024", percent: 100 },
    { stage: "Superstructure RCC Frame Slabs", status: "COMPLETED", date: "Dec 2024", percent: 100 },
    { stage: "Masonry Brickwork & Internal Plaster", status: "COMPLETED", date: "Jul 2025", percent: 100 },
    { stage: "Flooring, Electrical & Plumbing", status: "IN_PROGRESS", date: "Nov 2025", percent: 85 },
    { stage: "Final Exterior Painting & Possession", status: "UPCOMING", date: "Dec 2026", percent: 0 },
  ];

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
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 sm:p-8 relative space-y-6 max-h-[85vh] overflow-y-auto cursor-default my-auto"
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
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-display">Construction Progress & Timeline</h3>
            <p className="text-xs text-slate-400">Real-time site construction milestones for <span className="text-blue-400 font-bold">{projectName}</span></p>
          </div>
        </div>

        {/* Overall Completion Bar */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400 uppercase">Overall Project Progress</span>
            <span className="text-emerald-400 font-black">65% Completed</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "65%" }} />
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-3">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center gap-3">
              <div className="flex items-center space-x-3">
                {m.status === "COMPLETED" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : m.status === "IN_PROGRESS" ? (
                  <Clock className="w-5 h-5 text-amber-400 animate-spin flex-shrink-0" />
                ) : (
                  <Clock className="w-5 h-5 text-slate-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className="text-xs font-extrabold text-white">{m.stage}</h4>
                  <span className="text-[10px] text-slate-500 font-semibold">Expected: {m.date}</span>
                </div>
              </div>
              <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${
                m.status === "COMPLETED"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : m.status === "IN_PROGRESS"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-slate-900 border-slate-800 text-slate-500"
              }`}>
                {m.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>,
    document.body
  );
}
