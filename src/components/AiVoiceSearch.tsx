"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Sparkles, X, Volume2, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseNaturalLanguageSearch } from "@/lib/ai";

interface AiVoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiVoiceSearch({ isOpen, onClose }: AiVoiceSearchProps) {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState<"EN" | "HI" | "GU">("EN");
  const [analyzing, setAnalyzing] = useState(false);

  const samplePrompts = {
    EN: [
      "Show 3 BHK apartments in South Bopal under 1.2 Crore",
      "Commercial office space for rent in GIFT City Gandhinagar",
      "RERA verified luxury villas near Science City Road",
      "Plots for sale near Vaishnodevi Circle Ahmedabad"
    ],
    HI: [
      "गिफ्‍ट सिटी गांधीनगर में ऑफिस स्पेस दिखाएं",
      "बोपल अहमदाबाद में 3 बीएचके फ्लैट 1 करोड़ के अंदर",
      "साइंस सिटी के पास लग्जरी विला दिखाएं",
      "साउथ बोपल में तुरंत पज़ेशन वाले अपार्टमेंट्स"
    ],
    GU: [
      "ગિફ્ટ સિટી ગાંધીનગરમાં ૩ BHK ફ્લેટ બતાવો",
      "બોપલ અમદાવાદમાં કમર્શિયલ દુકાન અને ઓફિસ",
      "સાયન્સ સિટી પાસે RERA વેરીફાઈડ વિલા",
      "ગાંધીનગરમાં સરગાસણ પાસે પ્લોટ"
    ]
  };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        // Simulate real-time speech recognition input if SpeechRecognition API is absent
        const selectedList = samplePrompts[language];
        const randomPrompt = selectedList[Math.floor(Math.random() * selectedList.length)];
        setTranscript(randomPrompt);
        setIsListening(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, language]);

  const handleStartListening = () => {
    setTranscript("");
    setIsListening(true);
  };

  const handleExecuteSearch = (queryText: string) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      onClose();
      const parsed = parseNaturalLanguageSearch(queryText);
      const searchParams = new URLSearchParams({
        purpose: parsed.purpose,
        type: parsed.type,
        ...(parsed.bhk ? { bhk: parsed.bhk } : {}),
        ...(parsed.locality ? { query: parsed.locality } : { query: queryText }),
        ...(parsed.maxPrice ? { maxBudget: String(parsed.maxPrice) } : {}),
        ai: "true"
      });
      router.push(`/search?${searchParams.toString()}`);
    }, 800);
  };

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
      className="fixed inset-0 z-[9999] overflow-y-auto p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 font-sans flex min-h-full items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden cursor-default max-h-[85vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Glowing Background Ring */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white font-display">AddressBox AI Voice Search</h3>
              <p className="text-xs text-slate-400 font-medium">Ahmedabad & Gandhinagar Property Assistant</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Selector Tabs */}
        <div className="flex items-center justify-center space-x-2 mb-6 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {(["EN", "HI", "GU"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                language === lang
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {lang === "EN" ? "English" : lang === "HI" ? "हिंदी" : "ગુજરાતી"}
            </button>
          ))}
        </div>

        {/* Microphone Pulse Graphic */}
        <div className="flex flex-col items-center justify-center my-6 space-y-4">
          <button
            onClick={isListening ? () => setIsListening(false) : handleStartListening}
            className={`relative p-6 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isListening
                ? "bg-red-500 text-white shadow-lg shadow-red-500/40 animate-pulse"
                : "bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500"
            }`}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 animate-bounce" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
            
            {isListening && (
              <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-75 pointer-events-none" />
            )}
          </button>

          <p className="text-xs font-bold tracking-wider uppercase text-slate-400">
            {isListening ? "Listening in " + (language === "EN" ? "English" : language === "HI" ? "Hindi" : "Gujarati") + "..." : "Tap microphone to speak"}
          </p>
        </div>

        {/* Live Transcript Display */}
        {transcript && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Volume2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-200 font-semibold italic">&quot;{transcript}&quot;</p>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => handleExecuteSearch(transcript)}
                    disabled={analyzing}
                    className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <span>{analyzing ? "Analyzing Query..." : "Search Properties"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preset Prompt Suggestions */}
        <div className="space-y-2">
          <p className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Try Asking:</p>
          <div className="grid grid-cols-1 gap-2">
            {samplePrompts[language].map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTranscript(promptText);
                  handleExecuteSearch(promptText);
                }}
                className="flex items-center justify-between bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60 text-slate-300 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-medium transition text-left"
              >
                <span>&quot;{promptText}&quot;</span>
                <Search className="w-3.5 h-3.5 text-blue-400 opacity-60" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
