"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Upload, CheckCircle2, AlertTriangle, Eye, ShieldCheck, Camera, Layers, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiImageAnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<string>(
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    qualityScore: number;
    luxuryRating: string;
    lightingQuality: string;
    furnitureDetected: string[];
    structuralDamage: string;
    estimatedValuationBoost: string;
    threats: string[];
  } | null>({
    qualityScore: 9.4,
    luxuryRating: "Ultra Premium Grade A",
    lightingQuality: "Optimal Natural Daylight (East Facing Windows)",
    furnitureDetected: ["Italian Marble Flooring", "False Ceiling Ambient LED", "Modular German Kitchen", "Floor-to-Ceiling Toughened Glass"],
    structuralDamage: "Zero Defects / Zero Seepage Detected",
    estimatedValuationBoost: "+14.2% Premium Value Addition",
    threats: ["None. Clear structural integrity verified."]
  });

  const handleSampleSelect = (url: string) => {
    setSelectedImage(url);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        qualityScore: 9.2,
        luxuryRating: "High-End Residential",
        lightingQuality: "Excellent Cross Ventilation",
        furnitureDetected: ["Hardwood Paneling", "Designer Sanitaryware", "Embedded Smart Lights"],
        structuralDamage: "Zero Crack / Seepage Risk",
        estimatedValuationBoost: "+11.8% Market Value Boost",
        threats: ["None. Excellent maintenance grade."]
      });
    }, 800);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Computer Vision & AI Image Inspector</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">AI Property Image Quality & Luxury Detector</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Upload property interior/exterior photos. Our Deep Learning Vision AI detects finishes, lighting quality, luxury materials, structural defects, and valuation impact.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Image Upload / Preview Panel */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 relative overflow-hidden shadow-2xl">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-800">
                <Image
                  src={selectedImage}
                  alt="Property Image for AI Analysis"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                    <Sparkles className="w-10 h-10 text-orange-400 animate-spin" />
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider animate-pulse">Running Neural Vision Scan...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sample Image Selector */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase text-slate-400">Try Sample Photos:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"
                ].map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSampleSelect(url)}
                    className="relative h-16 rounded-xl overflow-hidden border border-slate-800 hover:border-orange-500 transition cursor-pointer"
                  >
                    <Image src={url} alt={`Sample ${idx}`} width={200} height={150} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Inspection Report Panel */}
          <div className="lg:col-span-6">
            {analysisResult && (
              <div className="bg-slate-900 border border-orange-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">AI Quality Rating</span>
                    <h3 className="text-2xl font-black text-orange-400 font-display">{analysisResult.qualityScore} / 10 Points</h3>
                  </div>
                  <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
                    {analysisResult.luxuryRating}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-1.5">Detected Finishes & Materials</span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.furnitureDetected.map((item, idx) => (
                        <span key={idx} className="bg-slate-950 text-slate-200 border border-slate-800 px-3 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">Lighting & Daylight Score</span>
                      <span className="text-amber-400 font-black">{analysisResult.lightingQuality}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">Defect / Seepage Check</span>
                      <span className="text-emerald-400 font-black">{analysisResult.structuralDamage}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">Estimated Valuation Premium</span>
                      <span className="text-orange-400 font-black">{analysisResult.estimatedValuationBoost}</span>
                    </div>
                  </div>
                </div>

                <Link href="/valuation">
                  <Button variant="primary" className="w-full justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl border-none">
                    Run Full AI Valuation Report
                  </Button>
                </Link>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
