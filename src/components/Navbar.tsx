"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Sun, Moon, ChevronDown, User, LogOut, FileText, Bell } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const menuItems = {
    buy: [
      { label: "Residential Flats", href: "/buy?category=flat" },
      { label: "Luxury Villas", href: "/buy?category=villa" },
      { label: "Plots & Land", href: "/plots" },
      { label: "Farm Houses", href: "/buy?category=farm-house" },
    ],
    rent: [
      { label: "Apartments", href: "/rent?category=flat" },
      { label: "Hostels & PGs", href: "/pg" },
      { label: "Independent Houses", href: "/rent?category=house" },
    ],
    commercial: [
      { label: "Office Spaces", href: "/commercial?category=office" },
      { label: "Shops & Showrooms", href: "/commercial?category=shop" },
      { label: "Warehouses", href: "/commercial?category=warehouse" },
      { label: "Industrial Lands", href: "/land" },
    ],
  };

  return (
    <header className="sticky top-0 z-50 glass-header shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/25">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight font-display">
                Address<span className="text-blue-500">Box</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-slate-300 font-semibold text-xs sm:text-sm">
            
            {/* Mega Dropdowns */}
            {(["buy", "rent", "commercial"] as const).map((key) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveMenu(key)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center space-x-1 hover:text-white transition py-2 capitalize cursor-pointer">
                  <span>{key}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeMenu === key && (
                  <div className="absolute top-full -left-4 w-52 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col space-y-2 mt-0">
                    {menuItems[key].map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="text-slate-400 hover:text-white hover:bg-slate-800/40 px-3 py-2.5 rounded-lg text-xs font-semibold transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link href="/projects" className="hover:text-white transition">Projects</Link>
            <Link href="/builders" className="hover:text-white transition">Builders</Link>
            <Link href="/agents" className="hover:text-white transition">Agents</Link>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
          </nav>

          {/* Actions & Profiles */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/40 transition cursor-pointer"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {session ? (
              <div className="flex items-center space-x-3">
                
                {/* Alert Bell */}
                <button className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/40 transition cursor-pointer">
                  <Bell className="w-5 h-5" />
                </button>

                {/* Profile Trigger */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl px-4 py-2 text-xs font-semibold text-white transition cursor-pointer">
                    <User className="w-4 h-4" />
                    <span>{session.user?.name || "Account"}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col space-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                    <Link
                      href="/dashboard"
                      className="text-slate-400 hover:text-white hover:bg-slate-800/40 px-3 py-2.5 rounded-lg text-xs font-semibold transition flex items-center space-x-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>My Dashboard</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left text-red-400 hover:text-red-300 hover:bg-red-950/20 px-3 py-2.5 rounded-lg text-xs font-semibold transition flex items-center space-x-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Post Property Free CTA */}
            <Link href="/post-property">
              <Button variant="accent" size="sm" className="relative">
                <span>Post Property</span>
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-extrabold px-1 rounded-md animate-bounce shadow">FREE</span>
              </Button>
            </Link>

          </div>

          {/* Mobile responsive toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/40 transition"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/40 transition"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer list */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 p-6 flex flex-col space-y-4 shadow-xl">
          <Link href="/buy" className="text-slate-350 hover:text-white text-sm font-semibold transition">Buy Properties</Link>
          <Link href="/rent" className="text-slate-350 hover:text-white text-sm font-semibold transition">Rent Properties</Link>
          <Link href="/commercial" className="text-slate-350 hover:text-white text-sm font-semibold transition">Commercial Space</Link>
          <Link href="/projects" className="text-slate-350 hover:text-white text-sm font-semibold transition">Projects</Link>
          <Link href="/builders" className="text-slate-350 hover:text-white text-sm font-semibold transition">Builders</Link>
          <Link href="/agents" className="text-slate-350 hover:text-white text-sm font-semibold transition">Agents</Link>
          <Link href="/blog" className="text-slate-350 hover:text-white text-sm font-semibold transition">Blog</Link>
          
          <div className="border-t border-slate-800 pt-4 flex flex-col space-y-3">
            {session ? (
              <>
                <Link href="/dashboard" className="text-slate-300 text-sm font-bold flex items-center space-x-2">
                  <User className="w-4.5 h-4.5" />
                  <span>My Dashboard</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left text-red-400 text-sm font-bold flex items-center space-x-2 cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/signup" className="w-full">
                  <Button variant="primary" className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
            <Link href="/post-property" className="w-full">
              <Button variant="accent" className="w-full">Post Property For Free</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
