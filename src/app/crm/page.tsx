"use client";

import React, { useState } from "react";
import { User, Phone, Mail, Award, CheckCircle, Clock, Calendar, MessageSquare, AlertCircle, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  property: string;
  status: "New" | "Contacted" | "Scheduled" | "Closed";
  priority: "HOT" | "WARM" | "COLD";
  commission: number;
  notes: string;
}

export default function CrmPage() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, name: "Amit Shah", phone: "+91 98980 12345", email: "amit.shah@gmail.com", property: "Shaligram 3 BHK Bopal", status: "Scheduled", priority: "HOT", commission: 85000, notes: "Site visit booked for this Sunday. Highly interested." },
    { id: 2, name: "Pooja Patel", phone: "+91 97240 56789", email: "pooja.patel@yahoo.com", property: "Sun Sky Villas Gota", status: "Contacted", priority: "WARM", commission: 180000, notes: "Shared brochures. Awaiting feedback on carpet area options." },
    { id: 3, name: "Rajesh Mehta", phone: "+91 96011 98765", email: "rajesh.mehta@hotmail.com", property: "GIFT City Office Space", status: "New", priority: "COLD", commission: 250000, notes: "Left callback message. Inquired via web form." },
    { id: 4, name: "Vikram Rathod", phone: "+91 94250 43210", email: "vikram.rathod@outlook.com", property: "Bopal Residency 2 BHK", status: "Closed", priority: "HOT", commission: 55000, notes: "Deal closed. Advance token deposit verified." }
  ]);

  const [activeTab, setActiveTab] = useState<"pipeline" | "commissions" | "campaigns">("pipeline");
  const [newNoteText, setNewNoteText] = useState<Record<number, string>>({});

  const updateStatus = (id: number, status: Lead["status"]) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleAddNote = (id: number) => {
    const text = newNoteText[id] || "";
    if (!text.trim()) return;

    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        return { ...l, notes: `${l.notes}\n- ${text}` };
      }
      return l;
    }));
    setNewNoteText(prev => ({ ...prev, [id]: "" }));
  };

  const columns: { title: string; key: Lead["status"]; color: string }[] = [
    { title: "New Inquiries", key: "New", color: "border-slate-800 bg-slate-900/40" },
    { title: "Contacted", key: "Contacted", color: "border-amber-500/20 bg-amber-500/5" },
    { title: "Site Visit Scheduled", key: "Scheduled", color: "border-blue-500/20 bg-blue-500/5" },
    { title: "Deal Closed (Won)", key: "Closed", color: "border-green-500/20 bg-green-500/5" }
  ];

  const totalCommissions = leads.filter(l => l.status === "Closed").reduce((sum, l) => sum + l.commission, 0);

  return (
    <div className="bg-slate-950 min-h-screen py-12 text-white relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">Leads & Relationship Workspace</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-display">Broker & Agent CRM</h1>
          </div>
          
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            {(["pipeline", "commissions", "campaigns"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition cursor-pointer ${
                  activeTab === tab ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Pipeline Kanban Columns */}
        {activeTab === "pipeline" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
            {columns.map(col => {
              const colLeads = leads.filter(l => l.status === col.key);
              return (
                <div key={col.key} className={`border rounded-2xl p-5 flex flex-col space-y-4 ${col.color}`}>
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <h3 className="font-extrabold text-xs sm:text-sm tracking-tight text-white uppercase">{col.title}</h3>
                    <span className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-full font-black">
                      {colLeads.length}
                    </span>
                  </div>

                  <div className="space-y-4 flex-1 overflow-y-auto max-h-[500px] pr-1">
                    {colLeads.map(lead => (
                      <div key={lead.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 shadow relative group hover:border-slate-700 transition">
                        
                        {/* Priority Badge */}
                        <span className={`absolute top-4 right-4 text-[9px] font-black px-2 py-0.5 rounded-full border ${
                          lead.priority === "HOT" 
                            ? "bg-red-500/10 border-red-500/25 text-red-500" 
                            : lead.priority === "WARM" 
                            ? "bg-amber-500/10 border-amber-500/25 text-amber-500" 
                            : "bg-blue-500/10 border-blue-500/25 text-blue-500"
                        }`}>
                          {lead.priority}
                        </span>

                        <div className="space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm text-white">{lead.name}</h4>
                          <span className="text-[10px] text-slate-500 font-bold block">{lead.property}</span>
                        </div>

                        {/* Contacts details links */}
                        <div className="space-y-1 text-[11px] font-bold text-slate-450">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5">
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              <span>{lead.phone}</span>
                            </div>
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, contacting you regarding your inquiry for ${lead.property} on AddressBox.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] bg-green-500/10 border border-green-500/25 text-green-400 hover:bg-green-500/20 px-2 py-0.5 rounded font-black flex items-center space-x-1"
                            >
                              <span>WhatsApp</span>
                            </a>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-slate-950/80 border border-slate-850 p-2.5 rounded-lg space-y-1">
                          <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Notes / Follow-ups</span>
                          <p className="text-[10px] text-slate-400 font-medium leading-normal whitespace-pre-line">{lead.notes}</p>
                        </div>

                        {/* Add Note inputs */}
                        <div className="flex items-center space-x-2 pt-1">
                          <input
                            type="text"
                            placeholder="Add memo..."
                            value={newNoteText[lead.id] || ""}
                            onChange={(e) => setNewNoteText({ ...newNoteText, [lead.id]: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 text-[11px] text-white rounded-lg px-2 py-1 outline-none focus:border-blue-600"
                          />
                          <button
                            onClick={() => handleAddNote(lead.id)}
                            className="bg-blue-600 hover:bg-blue-500 p-1.5 rounded-lg text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Status controllers buttons */}
                        <div className="pt-2 border-t border-slate-850/50 flex flex-wrap gap-1.5">
                          {lead.status !== "New" && (
                            <button
                              onClick={() => updateStatus(lead.id, "New")}
                              className="text-[9px] font-black uppercase text-slate-500 hover:text-white"
                            >
                              New
                            </button>
                          )}
                          {lead.status !== "Contacted" && (
                            <button
                              onClick={() => updateStatus(lead.id, "Contacted")}
                              className="text-[9px] font-black uppercase text-amber-500 hover:text-amber-400"
                            >
                              Contact
                            </button>
                          )}
                          {lead.status !== "Scheduled" && (
                            <button
                              onClick={() => updateStatus(lead.id, "Scheduled")}
                              className="text-[9px] font-black uppercase text-blue-500 hover:text-blue-400"
                            >
                              Schedule
                            </button>
                          )}
                          {lead.status !== "Closed" && (
                            <button
                              onClick={() => updateStatus(lead.id, "Closed")}
                              className="text-[9px] font-black uppercase text-green-500 hover:text-green-400"
                            >
                              Close
                            </button>
                          )}
                        </div>

                      </div>
                    ))}

                    {colLeads.length === 0 && (
                      <div className="text-center py-10 border border-dashed border-slate-850 rounded-xl text-slate-550 text-xs font-semibold">
                        No leads in column
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Agent Commissions payout tracker */}
        {activeTab === "commissions" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-white font-display uppercase tracking-wider">Commission Payout Dashboard</h3>
                <p className="text-slate-450 text-xs mt-0.5">Summary of broker earnings matching closed listings</p>
              </div>
              
              <div className="text-right">
                <span className="text-[10px] text-slate-550 block uppercase tracking-wider font-extrabold">Total Earned</span>
                <span className="text-green-500 text-xl sm:text-2xl font-black">₹ {totalCommissions.toLocaleString()}</span>
              </div>
            </div>

            {/* Commissions List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm font-semibold">
                <thead>
                  <tr className="border-b border-slate-850 text-slate-500 uppercase tracking-wider text-[10px] font-black">
                    <th className="py-3 px-2">Client Name</th>
                    <th className="py-3 px-2">Property Address</th>
                    <th className="py-3 px-2">Lead Qualification</th>
                    <th className="py-3 px-2 text-right">Commission Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/60 text-slate-300">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-850/10 transition">
                      <td className="py-3.5 px-2 font-bold text-white">{lead.name}</td>
                      <td className="py-3.5 px-2">{lead.property}</td>
                      <td className="py-3.5 px-2">
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${
                          lead.status === "Closed" 
                            ? "bg-green-500/10 border-green-500/20 text-green-400" 
                            : "bg-slate-950 border-slate-850 text-slate-500"
                        }`}>
                          {lead.status === "Closed" ? "PAYMENT APPROVED" : "PENDING CLOSURE"}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right font-black text-white">₹ {lead.commission.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 3: Marketing Campaigns logging panel */}
        {activeTab === "campaigns" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-extrabold text-base sm:text-lg text-white font-display uppercase tracking-wider border-b border-slate-850 pb-2">SMS & Email Campaigns</h3>
              <p className="text-slate-450 text-xs">Blast promotion announcements to target buyer requirements database.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); alert("Campaign broadcasted in sandbox mode!"); }} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Campaign Target</label>
                  <select className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 outline-none focus:border-blue-600 cursor-pointer text-xs sm:text-sm font-semibold">
                    <option>All Inquired Leads (Cold + Warm)</option>
                    <option>Hot leads seeking 3 BHK Bopal</option>
                    <option>Builders seeking GIFT City listings</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">SMS / WhatsApp Message Text</label>
                  <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-600 text-xs sm:text-sm font-semibold placeholder:text-slate-700 resize-none" placeholder="Enter message text... e.g. Special price discount for Shaligram Residency!"></textarea>
                </div>
                <Button type="submit" variant="primary" className="w-full py-3">Launch Campaign Broadcast</Button>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-extrabold text-base sm:text-lg text-white font-display uppercase tracking-wider border-b border-slate-850 pb-2">Campaign Analytics</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Emails Sent</span>
                  <span className="text-white text-lg font-black block mt-1">1,245</span>
                </div>
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">SMS Delivered</span>
                  <span className="text-white text-lg font-black block mt-1">450</span>
                </div>
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">CTR Conversion</span>
                  <span className="text-blue-500 text-lg font-black block mt-1">4.2 %</span>
                </div>
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Opt-outs logs</span>
                  <span className="text-red-500 text-lg font-black block mt-1">12</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
