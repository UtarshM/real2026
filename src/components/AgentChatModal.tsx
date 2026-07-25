"use client";

import React, { useState } from "react";
import { MessageSquare, PhoneCall, Send, X, ShieldCheck, UserCheck, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface AgentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
  agentName?: string;
  agentPhone?: string;
}

export default function AgentChatModal({
  isOpen,
  onClose,
  propertyName = "Shivalik Edge 4 BHK",
  agentName = "Rama Realty Verified Agent",
  agentPhone = "+91 98765 43210"
}: AgentChatModalProps) {
  const [messages, setMessages] = useState<Array<{ sender: "agent" | "user"; text: string; time: string }>>([
    {
      sender: "agent",
      text: `Hello! I am ${agentName}. How can I assist you with ${propertyName}?`,
      time: "Just now"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const newMsg = { sender: "user" as const, text: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate Agent automated reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: `Thank you for reaching out! A dedicated agent will provide the floor plan and direct pricing for ${propertyName}.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const whatsappText = encodeURIComponent(`Hi ${agentName}, I am interested in ${propertyName} listed on Address Box. Please share details.`);
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

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
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 relative space-y-4 max-h-[85vh] overflow-y-auto cursor-default my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Agent Profile Header */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="w-11 h-11 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 font-black font-display text-base">
            {agentName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-base font-extrabold text-white">{agentName}</h3>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <p className="text-xs text-slate-400 font-medium">Official Agent • Responding live</p>
          </div>
        </div>

        {/* Chat History Container */}
        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Instant WhatsApp Redirection */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Switch to Instant WhatsApp Chat</span>
        </a>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="flex space-x-2 pt-1">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          />
          <Button type="submit" variant="primary" className="px-4">
            <Send className="w-4 h-4" />
          </Button>
        </form>

      </div>
    </div>,
    document.body
  );
}
