"use client";

import React, { useState } from "react";
import { 
  Users, Building, ShieldCheck, Mail, UserCheck, 
  Trash2, AlertTriangle, CheckCircle, BarChart3, LineChart 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"users" | "verification" | "listings">("users");

  // Mock Admin Dashboard Data
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "BUYER", status: "Active" },
    { id: 2, name: "Adani Smart LLC", email: "realty@adani.com", role: "BUILDER", status: "Active" },
    { id: 3, name: "Kishore Patel", email: "kishore@broker.com", role: "AGENT", status: "Active" },
    { id: 4, name: "Spam Account", email: "spam@bot.com", role: "SELLER", status: "Suspended" },
  ]);

  const [pendingListings, setPendingListings] = useState([
    { id: 101, name: "Shivalik Highstreet Commercial", builder: "Shivalik Group", locality: "Bopal", price: "₹ 1.8 Cr", status: "Pending Verification" },
    { id: 102, name: "GIFT City Residency Flat", builder: "Sun Developers", locality: "GIFT City", price: "₹ 75 Lac", status: "Pending Verification" },
  ]);

  const [activeListings, setActiveListings] = useState([
    { id: 201, name: "Shilp Ananta Shop", builder: "Shilp Group", locality: "Shela", price: "₹ 1.2 Cr", views: 240, reports: 0 },
    { id: 202, name: "Spam Fake Villa 10 BHK", builder: "Fake Owner", locality: "Bopal", price: "₹ 10 Lac", views: 980, reports: 12 },
  ]);

  // Actions handlers
  const handleToggleUserStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
  };

  const handleApproveListing = (id: number) => {
    setPendingListings(prev => prev.filter(l => l.id !== id));
    alert("Listing approved and added to search indexes.");
  };

  const handleRejectListing = (id: number) => {
    setPendingListings(prev => prev.filter(l => l.id !== id));
    alert("Listing rejected and notify email dispatched.");
  };

  const handleDeleteListing = (id: number) => {
    setActiveListings(prev => prev.filter(l => l.id !== id));
    alert("Listing permanently deleted from database.");
  };

  return (
    <div className="bg-slate-950 min-h-screen py-10 text-white font-sans relative">
      
      {/* Background glow graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Title Block Header */}
        <div>
          <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">Administrative Control Panel</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-display">System Overview</h1>
        </div>

        {/* Counters summary board */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4 shadow">
            <div className="bg-blue-650/10 p-3 rounded-xl text-blue-500"><Users className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] text-slate-550 block font-extrabold uppercase tracking-wider">Total Users</span>
              <span className="text-xl sm:text-2xl font-black text-white">1,240</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4 shadow">
            <div className="bg-blue-650/10 p-3 rounded-xl text-blue-500"><Building className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] text-slate-550 block font-extrabold uppercase tracking-wider">Active Listings</span>
              <span className="text-xl sm:text-2xl font-black text-white">842</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4 shadow">
            <div className="bg-blue-650/10 p-3 rounded-xl text-blue-500"><ShieldCheck className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] text-slate-550 block font-extrabold uppercase tracking-wider">Verified Listings</span>
              <span className="text-xl sm:text-2xl font-black text-white">780</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4 shadow">
            <div className="bg-blue-650/10 p-3 rounded-xl text-blue-500"><Mail className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] text-slate-550 block font-extrabold uppercase tracking-wider">Total Leads</span>
              <span className="text-xl sm:text-2xl font-black text-white">3,120</span>
            </div>
          </div>
        </div>

        {/* Charts & Analytical Graphs (Visual SVG Layouts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* User Signups trend chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-sm sm:text-base font-bold">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span>Inquiries Inflow (Last 6 Months)</span>
            </div>
            
            {/* SVG Bar Chart mockup */}
            <div className="h-48 w-full flex items-end justify-between pt-6 border-b border-slate-800 px-4">
              {[45, 60, 80, 55, 95, 120].map((val, idx) => (
                <div key={idx} className="flex flex-col items-center w-10 space-y-2">
                  <div 
                    style={{ height: `${val * 1.2}px` }}
                    className="w-6 bg-blue-600 rounded-t-md hover:bg-blue-500 transition duration-300 shadow-lg shadow-blue-500/10"
                  />
                  <span className="text-[9px] text-slate-500 font-bold uppercase">
                    {["Feb", "Mar", "Apr", "May", "Jun", "Jul"][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User signups growth trend chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-sm sm:text-base font-bold">
              <LineChart className="w-5 h-5 text-blue-500" />
              <span>Registered Accounts Trend</span>
            </div>

            {/* SVG Line path Graph mockup */}
            <div className="relative h-48 w-full border-b border-slate-800 pt-6">
              <svg className="w-full h-full" viewBox="0 0 300 120">
                <path 
                  d="M0,100 Q50,90 100,70 T200,40 T300,10" 
                  fill="none" 
                  stroke="#2563eb" 
                  strokeWidth="3.5"
                  className="drop-shadow-[0_4px_8px_rgba(37,99,235,0.25)]"
                />
                {/* Dots along path */}
                <circle cx="10" cy="98" r="4.5" fill="#2563eb" />
                <circle cx="100" cy="70" r="4.5" fill="#2563eb" />
                <circle cx="200" cy="40" r="4.5" fill="#2563eb" />
                <circle cx="290" cy="12" r="4.5" fill="#2563eb" />
              </svg>
              <div className="flex justify-between text-[9px] text-slate-500 font-bold px-2 mt-1">
                <span>Q1 2026</span>
                <span>Q2 2026</span>
                <span>Q3 2026</span>
              </div>
            </div>
          </div>

        </div>

        {/* Tab selection grid */}
        <div className="flex border-b border-slate-800 pb-2 gap-4 flex-wrap">
          {(["users", "verification", "listings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide capitalize transition cursor-pointer ${
                activeTab === tab 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" 
                  : "text-slate-455 hover:text-white hover:bg-slate-900"
              }`}
            >
              {tab === "users" ? "User Directory" : tab === "verification" ? "Verification Queue" : "Active listings"}
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          
          {/* USER DIRECTORY TAB */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-800 pb-3">User Directory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm font-semibold text-slate-350 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Account Type</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-slate-850 hover:bg-slate-950/20 transition">
                        <td className="py-4 px-4 text-white">{u.name}</td>
                        <td className="py-4 px-4">{u.email}</td>
                        <td className="py-4 px-4">
                          <span className="bg-slate-950 text-slate-400 px-2.5 py-0.5 border border-slate-800 rounded text-[9px] font-black uppercase">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`text-[10px] ${u.status === "Active" ? "text-green-400" : "text-red-400"}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleToggleUserStatus(u.id)}
                            className="text-xs bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer"
                          >
                            {u.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VERIFICATION QUEUE TAB */}
          {activeTab === "verification" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-800 pb-3">Pending Verification</h3>
              {pendingListings.length === 0 ? (
                <p className="text-slate-500 text-xs sm:text-sm font-semibold py-6 text-center">No listings are pending in verification queue.</p>
              ) : (
                <div className="space-y-4">
                  {pendingListings.map((l) => (
                    <div key={l.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-white">{l.name}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold">{l.locality} • By {l.builder} • Price: {l.price}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleApproveListing(l.id)}
                          className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition flex items-center space-x-1 cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRejectListing(l.id)}
                          className="bg-red-950/20 hover:bg-red-900/20 text-red-400 border border-red-900/25 font-bold text-xs px-3.5 py-2 rounded-lg transition flex items-center space-x-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ACTIVE LISTINGS TAB */}
          {activeTab === "listings" && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-white font-display border-b border-slate-800 pb-3">Active Listings</h3>
              <div className="space-y-4">
                {activeListings.map((l) => (
                  <div key={l.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-xs sm:text-sm text-white">{l.name}</h4>
                        {l.reports > 0 && (
                          <span className="bg-red-500/10 border border-red-500/25 text-red-500 text-[9px] px-2 py-0.5 rounded font-black flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3 mr-0.5" />
                            <span>{l.reports} Reports</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold">{l.locality} • Views: {l.views} • Price: {l.price}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteListing(l.id)}
                      className="bg-red-950/20 hover:bg-red-900/20 text-red-400 border border-red-900/25 font-bold text-xs px-3.5 py-2 rounded-lg transition flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete (Spam)</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
