"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, Home, Mail, Phone } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 font-sans shadow-md">
      {/* Top Banner Above Header matching addressbox.com */}
      <div 
        className="bg-orange-600 text-white py-2 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#ea580c" }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-end space-x-6 text-xs font-semibold">
          <a
            href="mailto:sales@addressbox.com"
            className="flex items-center space-x-1.5 text-white hover:text-amber-100 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-white" />
            <span className="text-white">sales@addressbox.com</span>
          </a>
          <a
            href="tel:+919327494799"
            className="flex items-center space-x-1.5 text-white hover:text-amber-100 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span className="text-white">+91 93274 94799</span>
          </a>
        </div>
      </div>

      {/* Main Header Navigation Bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Brand Logo (Left) */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-1">
                <span className="font-black text-2xl sm:text-3xl tracking-tighter font-display text-slate-800">
                  address<span className="text-orange-600 font-black" style={{ color: "#ea580c" }}>box</span>
                </span>
              </Link>
            </div>

            {/* Action Links & Pill Buttons (Right) */}
            <div className="hidden sm:flex items-center space-x-4 md:space-x-6 lg:space-x-8 flex-shrink-0">
              
              <Link
                href="/requirements"
                className="text-xs sm:text-sm font-extrabold text-slate-700 hover:text-orange-600 transition font-display whitespace-nowrap hidden md:inline-block"
              >
                Tell us Your Requirement
              </Link>

              <Link
                href="/commercial"
                className="text-xs sm:text-sm font-extrabold text-slate-700 hover:text-orange-600 transition font-display whitespace-nowrap hidden md:inline-block"
              >
                Investment Opportunity
              </Link>

              {/* Profile Combo Pill Button matching reference screenshot */}
              <div className="relative group py-2">
                <button 
                  className="flex items-center space-x-2 bg-white border border-slate-300 hover:border-orange-500 rounded-full px-3.5 py-1.5 shadow-xs transition cursor-pointer"
                  aria-label="User menu"
                >
                  <Menu className="w-4 h-4 text-slate-700 stroke-[2.5]" />
                  <span className="w-px h-4 bg-slate-300" />
                  <div 
                    className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold shadow-xs"
                    style={{ backgroundColor: "#ea580c" }}
                  >
                    <User className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                <div className="absolute right-0 top-full pt-1 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-2xl">
                    {session ? (
                      <>
                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                          <p className="text-xs font-extrabold text-slate-900 truncate">{session.user?.name || "User"}</p>
                          <p className="text-[10px] text-slate-500 truncate">{session.user?.email}</p>
                        </div>
                        <Link href="/dashboard" className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl">Dashboard</Link>
                        <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center space-x-1.5 cursor-pointer">
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="block px-3 py-2 text-xs font-bold text-slate-800 hover:bg-orange-50 hover:text-orange-600 rounded-xl">Sign In</Link>
                        <Link href="/signup" className="block px-3 py-2 text-xs font-bold text-slate-800 hover:bg-orange-50 hover:text-orange-600 rounded-xl">Register Account</Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Post Property Button with Free Badge matching addressbox.com */}
              <div className="relative inline-block">
                <Link
                  href="/post-property"
                  className="inline-flex items-center space-x-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-md transition cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: "#ea580c", color: "#ffffff" }}
                >
                  <Home className="w-4 h-4 text-white stroke-[2.5]" />
                  <span className="opacity-70 text-white">|</span>
                  <span className="text-white">Post Property</span>
                </Link>
                <span 
                  className="absolute -top-2.5 -right-1 border border-orange-600 text-orange-600 bg-white font-black text-[9px] px-2 py-0.5 rounded-full shadow-xs"
                  style={{ borderColor: "#ea580c", color: "#ea580c" }}
                >
                  Free
                </span>
              </div>

            </div>

            {/* Mobile Toggle for small screens */}
            <div className="flex sm:hidden items-center space-x-2">
              <Link
                href="/post-property"
                className="bg-orange-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xs"
                style={{ backgroundColor: "#ea580c", color: "#ffffff" }}
              >
                Post Property
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 text-slate-700 hover:text-orange-600 cursor-pointer"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 font-bold text-xs text-slate-800">
          <Link href="/requirements" className="block py-2 border-b border-slate-100">Tell us Your Requirement</Link>
          <Link href="/commercial" className="block py-2 border-b border-slate-100">Investment Opportunity</Link>
          <Link href="/buy" className="block py-2 border-b border-slate-100">Buy Properties</Link>
          <Link href="/rent" className="block py-2 border-b border-slate-100">Rent Properties</Link>
          <Link href="/builders" className="block py-2 border-b border-slate-100">Builders & Agents</Link>
        </div>
      )}
    </header>
  );
}
