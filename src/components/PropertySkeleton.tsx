"use client";

import React from "react";

export default function PropertySkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg animate-pulse flex flex-col justify-between h-[420px]">
      <div className="h-48 bg-slate-800/60 w-full relative" />
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-5 bg-slate-800/80 rounded-lg w-3/4" />
          <div className="h-3 bg-slate-800/50 rounded-lg w-1/2" />
          <div className="flex space-x-2 pt-2">
            <div className="h-4 bg-slate-800/60 rounded-md w-16" />
            <div className="h-4 bg-slate-800/60 rounded-md w-20" />
          </div>
        </div>
        <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center">
          <div className="h-6 bg-slate-800/80 rounded-lg w-28" />
          <div className="h-4 bg-slate-800/50 rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}
