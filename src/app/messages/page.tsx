"use client";

import React, { useState } from "react";
import { Send, Calendar, User, UserCheck, MessageSquare, Clock, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Chat {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  messages: { sender: "user" | "other"; text: string; time: string }[];
}

export default function MessagesPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Sun Buildcon Developer",
      role: "BUILDER",
      avatar: "S",
      lastMessage: "Hi, sure! We can arrange a site visit for Sun Sky villas this Saturday.",
      messages: [
        { sender: "other", text: "Hello! Thank you for inquiring about Sun Sky villas.", time: "10:30 AM" },
        { sender: "user", text: "Hi, is it possible to schedule a site visit this week?", time: "10:32 AM" },
        { sender: "other", text: "Hi, sure! We can arrange a site visit for Sun Sky villas this Saturday.", time: "10:35 AM" }
      ]
    },
    {
      id: 2,
      name: "Kishore Patel (Agent)",
      role: "AGENT",
      avatar: "K",
      lastMessage: "I'll share the floor plan PDF with RERA certificates directly over WhatsApp.",
      messages: [
        { sender: "user", text: "Hi Kishore, do you have the layout diagrams for Bopal Residency?", time: "Yesterday" },
        { sender: "other", text: "I'll share the floor plan PDF with RERA certificates directly over WhatsApp.", time: "Yesterday" }
      ]
    },
    {
      id: 3,
      name: "Neeta Shah (Owner)",
      role: "OWNER",
      avatar: "N",
      lastMessage: "The apartment is ready to occupy. Maintenance is ₹2,000.",
      messages: [
        { sender: "other", text: "The apartment is ready to occupy. Maintenance is ₹2,000.", time: "2 days ago" }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState(1);
  const [typedMessage, setTypedMessage] = useState("");
  
  // Appointment Scheduler states
  const [showScheduler, setShowScheduler] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [schedulerSuccess, setSchedulerSuccess] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessage: typedMessage,
          messages: [
            ...chat.messages,
            { sender: "user", text: typedMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
        };
      }
      return chat;
    }));
    setTypedMessage("");
  };

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setSchedulerSuccess(true);
    
    // Save to appointments in localStorage
    const appts = JSON.parse(localStorage.getItem("appointments") || "[]");
    appts.push({
      id: Date.now(),
      property: "Sun Sky Villas",
      builder: activeChat.name,
      time: `${visitDate} at ${visitTime}`,
      status: "Confirmed"
    });
    localStorage.setItem("appointments", JSON.stringify(appts));

    setTimeout(() => {
      setSchedulerSuccess(false);
      setShowScheduler(false);
      setVisitDate("");
      setVisitTime("");
    }, 2000);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-10 text-white relative flex flex-col justify-center">
      
      {/* Background glow graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-[650px] grid grid-cols-1 md:grid-cols-12 border border-slate-800 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl relative z-10">
        
        {/* Conversations Sidebar on Left */}
        <div className="md:col-span-4 border-r border-slate-850 flex flex-col h-full bg-slate-900/60">
          <div className="p-5 border-b border-slate-850">
            <h1 className="text-lg font-extrabold text-white tracking-tight font-display">Inquiries Messages</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Zero Brokerage direct logs</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-850/40">
            {chats.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChatId(c.id)}
                className={`w-full p-4 text-left hover:bg-slate-850/20 transition flex items-start space-x-3 cursor-pointer ${
                  activeChatId === c.id ? "bg-slate-850/30" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center font-extrabold uppercase">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate">{c.name}</h4>
                    <span className="text-[9px] bg-slate-950 border border-slate-850 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      {c.role}
                    </span>
                  </div>
                  <p className="text-slate-450 text-xs truncate font-medium">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat message panel on Right */}
        <div className="md:col-span-8 flex flex-col h-full bg-slate-950/30">
          
          {/* Active Chat Header */}
          <div className="p-4 border-b border-slate-850 flex justify-between items-center bg-slate-900/40">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center font-extrabold">
                {activeChat.avatar}
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white tracking-tight">{activeChat.name}</h4>
                <span className="text-[9px] text-slate-500 font-bold uppercase">{activeChat.role} • Verified Contact</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="space-x-2 flex items-center"
              onClick={() => setShowScheduler(true)}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Site Visit</span>
            </Button>
          </div>

          {/* Messages list feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {activeChat.messages.map((m, idx) => {
              const isUser = m.sender === "user";
              return (
                <div 
                  key={idx} 
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium leading-relaxed ${
                    isUser 
                      ? "bg-blue-600 text-white shadow shadow-blue-500/10 rounded-tr-none" 
                      : "bg-slate-900 border border-slate-850 text-slate-200 rounded-tl-none"
                  }`}>
                    <p>{m.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1 font-bold">{m.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Typing inputs footer */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-850 flex items-center space-x-3 bg-slate-900/20">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600 transition font-semibold placeholder:text-slate-700"
              placeholder="Type message directly to seller..."
            />
            <Button type="submit" variant="primary" className="p-2.5 rounded-xl flex items-center justify-center">
              <Send className="w-4.5 h-4.5" />
            </Button>
          </form>

        </div>

      </div>

      {/* Appointment Scheduler modal */}
      {showScheduler && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowScheduler(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-lg sm:text-xl text-white font-display mb-2">Book Site Visit Appointment</h3>
            <p className="text-slate-450 text-xs font-semibold mb-6">
              Schedule a secure direct inspection meeting with <span className="text-white font-bold">{activeChat.name}</span>.
            </p>

            {schedulerSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto shadow">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base">Appointment Booked!</h4>
                <p className="text-slate-455 text-xs font-medium">Your site visit has been scheduled. View details inside Dashboard panel.</p>
              </div>
            ) : (
              <form onSubmit={handleScheduleVisit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Select Date</label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Select Time</label>
                  <input
                    type="time"
                    required
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600 transition"
                  />
                </div>
                <Button type="submit" variant="accent" className="w-full mt-6">
                  Schedule Site Visit
                </Button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
