"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Building2, PhoneCall, Calendar, User, Eye, PlusCircle, 
  Trash2, Edit, ClipboardList, CheckCircle2, Loader2, Bookmark 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Dashboard states
  const [myProperties, setMyProperties] = useState<any[]>([]);
  const [callbacks, setCallbacks] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  // Load dashboard mock metrics from localStorage
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    queueMicrotask(() => {
      const storedProps = localStorage.getItem("posted_properties");
      setMyProperties(storedProps ? JSON.parse(storedProps) : []);

      // Set mock lead callbacks
      setCallbacks([
        { id: 1, name: "Amit Patel", phone: "9825012345", property: "Shivalik Parkview 3 BHK", date: "2026-07-23" },
        { id: 2, name: "Pooja Shah", phone: "9099054321", property: "GIFT City Tech Tower", date: "2026-07-22" }
      ]);

      // Set mock appointments
      setAppointments([
        { id: 1, builder: "Adani Realty", property: "Adani Shantigram Flat", time: "2026-07-25 at 11:00 AM", status: "Confirmed" },
        { id: 2, builder: "Shilp Group", property: "Shilp Ananta Shop", time: "2026-07-28 at 03:30 PM", status: "Pending approval" }
      ]);
    });
  }, [status, router]);

  const handleDeleteProperty = (id: number) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      const updated = myProperties.filter(p => p.id !== id);
      setMyProperties(updated);
      localStorage.setItem("posted_properties", JSON.stringify(updated));
    }
  };

  if (status === "loading") {
    return (
      <div className="bg-slate-950 min-h-screen py-16 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
          <p className="text-slate-400 text-xs sm:text-sm font-semibold">Loading dashboard profile...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const role = (session.user as any)?.role || "BUYER";

  return (
    <div className="bg-slate-950 min-h-screen py-12 text-white relative">
      
      {/* Background glow graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-[350px] h-[350px] rounded-full bg-blue-600/5 blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-orange-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Header Profile Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                Welcome back, {session.user?.name || "Member"}
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm font-bold flex items-center space-x-2 mt-1">
                <span className="bg-blue-600/10 text-blue-500 border border-blue-500/25 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                  {role} ACCOUNT
                </span>
                <span>•</span>
                <span>{session.user?.email}</span>
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3 self-end md:self-auto">
            <Link href="/post-property">
              <Button variant="accent" size="sm" className="space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Post Property</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Dynamic view selection depending on user Role */}
        {role === "BUYER" ? (
          
          /* BUYER DASHBOARD */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bookmarks Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-extrabold text-lg text-white font-display flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-blue-500" />
                <span>My Bookmarks</span>
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-850 p-6 rounded-2xl text-center text-slate-550 text-xs sm:text-sm font-semibold">
                  No bookmarked properties yet. Save listings during searches to track them here.
                </div>
              </div>
            </div>

            {/* Scheduled Appointments Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-extrabold text-lg text-white font-display flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span>Site Visits & Appointments</span>
              </h3>

              <div className="space-y-4">
                {appointments.map((appt) => (
                  <div key={appt.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-white">{appt.property}</h4>
                      <p className="text-[10px] text-slate-500 font-bold mt-1">Organizer: {appt.builder}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Scheduled for: {appt.time}</p>
                    </div>
                    <div>
                      <span className={`text-[9px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider ${
                        appt.status === "Confirmed" 
                          ? "bg-green-500/10 text-green-400 border border-green-500/25" 
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        ) : (
          
          /* SELLER / BUILDER / AGENT DASHBOARD */
          <div className="space-y-8">
            
            {/* Stat Counters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-1 shadow-sm">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">Active Listings</span>
                <span className="text-3xl font-black text-blue-500 block">{myProperties.length}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-1 shadow-sm">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">Total lead views</span>
                <span className="text-3xl font-black text-blue-500 block">{myProperties.length * 14}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-1 shadow-sm">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">Callback leads</span>
                <span className="text-3xl font-black text-blue-500 block">{callbacks.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Listings Manager panel */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3">My Listings</h3>
                
                {myProperties.length === 0 ? (
                  <div className="bg-slate-950 border border-slate-850 p-12 rounded-2xl text-center space-y-3">
                    <Building2 className="w-8 h-8 text-slate-650 mx-auto" />
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold">You have not published any properties yet.</p>
                    <Link href="/post-property" className="inline-block pt-2">
                      <Button variant="outline" size="sm">Create First Listing</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myProperties.map((p) => (
                      <div key={p.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                            <Image src={p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"} alt="Prop" width={100} height={100} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm text-white">{p.name}</h4>
                            <p className="text-[10px] text-slate-500 font-semibold">{p.locality}, {p.city} • ₹ {p.price?.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => router.push(`/property/${p.id}`)}
                            className="p-2 text-slate-500 hover:text-white bg-slate-900 border border-slate-850 rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProperty(p.id)}
                            className="p-2 text-red-500 hover:text-red-400 bg-red-950/20 border border-red-900/25 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Callback Requests Leads panel */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl h-fit">
                <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-850 pb-3 flex items-center space-x-2">
                  <PhoneCall className="w-5 h-5 text-blue-500" />
                  <span>Callback requests</span>
                </h3>

                <div className="space-y-4">
                  {callbacks.map((lead) => (
                    <div key={lead.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-white">{lead.name}</h4>
                          <p className="text-[10px] text-slate-500 font-bold">{lead.phone}</p>
                        </div>
                        <span className="text-[9px] bg-blue-600/10 border border-blue-500/25 text-blue-500 px-2 py-0.5 rounded font-bold">New</span>
                      </div>
                      <div className="border-t border-slate-900 pt-2 text-[10px] text-slate-400 font-bold">
                        Property: <span className="text-slate-300 font-semibold">{lead.property}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}
