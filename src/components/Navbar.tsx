"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Sun, Moon, ChevronDown, User, LogOut, FileText, Bell, Heart, Calculator, Layers, ShieldCheck, Landmark, Globe, Navigation, Tag, TrendingUp, Layout, FileCheck, Share2, Star, Building, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import StampDutyCalculatorModal from "./StampDutyCalculatorModal";
import PropertyCompareModal from "./PropertyCompareModal";
import ReraCheckerModal from "./ReraCheckerModal";
import LoanEligibilityModal from "./LoanEligibilityModal";
import CurrencyConverterModal from "./CurrencyConverterModal";
import QuickSearchShortcutModal from "./QuickSearchShortcutModal";
import CommuteCalculatorModal from "./CommuteCalculatorModal";
import OfferSubmissionModal from "./OfferSubmissionModal";
import RentalYieldModal from "./RentalYieldModal";
import FloorPlanViewerModal from "./FloorPlanViewerModal";
import LegalTitleCheckerModal from "./LegalTitleCheckerModal";
import PropertyShareModal from "./PropertyShareModal";
import PropertyReviewModal from "./PropertyReviewModal";
import DeveloperPortfolioModal from "./DeveloperPortfolioModal";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [showStampDutyModal, setShowStampDutyModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showReraModal, setShowReraModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showCommuteModal, setShowCommuteModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showYieldModal, setShowYieldModal] = useState(false);
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("addressbox_theme") as "dark" | "light" | null;
    if (saved === "dark") {
      setTheme("dark");
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("addressbox_theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark");
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0 pr-4">
              <Link href="/" className="flex items-center space-x-2.5">
                <div className="bg-orange-500 p-2.5 rounded-2xl text-white shadow-md shadow-orange-500/25">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <span className="font-black text-2xl tracking-tight font-display navbar-logo-text">
                  Address<span className="text-orange-500 font-black">Box</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-slate-700 dark:text-slate-300 font-extrabold text-xs sm:text-sm">
              
              {/* Mega Dropdowns */}
              {(["buy", "rent", "commercial"] as const).map((key) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="flex items-center space-x-1 hover:text-orange-500 dark:hover:text-white transition py-2 capitalize cursor-pointer">
                    <span>{key}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  </button>
                  {activeMenu === key && (
                    <div className="absolute top-full -left-4 w-52 bg-white border border-slate-200 rounded-2xl p-3 shadow-xl flex flex-col space-y-1 mt-0 z-50">
                      {menuItems[key].map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="text-slate-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-xl text-xs font-extrabold transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link href="/buy" className="hover:text-orange-500 dark:hover:text-white transition">Projects</Link>
              <Link href="/builders" className="hover:text-orange-500 dark:hover:text-white transition">Builders</Link>
              <Link href="/builders" className="hover:text-orange-500 dark:hover:text-white transition">Agents</Link>
              <Link href="/blog" className="hover:text-orange-500 dark:hover:text-white transition">Blog</Link>
            </nav>
          </div>

          {/* Actions & Profiles */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/40 transition cursor-pointer"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* AI Valuation Shortcut */}
            <Link
              href="/valuation"
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 rounded-xl hover:bg-orange-500/20 transition"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Valuation</span>
            </Link>

            {/* Post Requirement CTA */}
            <Link
              href="/requirements"
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-blue-500 bg-blue-500/10 border border-blue-500/30 rounded-xl hover:bg-blue-500/20 transition"
            >
              <FileText className="w-4 h-4" />
              <span>Post Requirement</span>
            </Link>

            {/* Saved Favorites Shortcut */}
            <Link
              href="/dashboard"
              className="p-2.5 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-800/40 transition flex items-center space-x-1"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
            </Link>



            {/* Profile & Menu Combo Pill */}
            <div className="relative group">
              <button className="flex items-center space-x-2.5 bg-white border border-slate-300 dark:border-slate-700 hover:border-orange-500 rounded-full px-3.5 py-1.5 shadow-sm transition cursor-pointer text-slate-800 dark:text-white">
                <Menu className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
                <div className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Popover Menu matching screenshot */}
              <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition text-slate-800 space-y-0.5">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2.5 text-xs font-black text-slate-800 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition border-b border-slate-100"
                >
                  My Activity
                </Link>

                <Link
                  href="/dashboard"
                  className="block px-4 py-2.5 text-xs font-black text-slate-800 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition border-b border-slate-100"
                >
                  Shortlisted Properties
                </Link>

                <Link
                  href="/dashboard"
                  className="block px-4 py-2.5 text-xs font-black text-slate-800 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition border-b border-slate-100"
                >
                  Contacted Properties
                </Link>

                <Link
                  href="/dashboard"
                  className="block px-4 py-2.5 text-xs font-black text-slate-800 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition border-b border-slate-100"
                >
                  My Profile
                </Link>

                <Link
                  href="/requirements"
                  className="block px-4 py-2.5 text-xs font-black text-slate-800 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition border-b border-slate-100"
                >
                  Share Requirements
                </Link>

                <div className="p-1 pt-2">
                  {session ? (
                    <button
                      onClick={handleSignOut}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase py-2.5 rounded-xl shadow-md transition cursor-pointer text-center"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase py-2.5 rounded-xl shadow-md transition cursor-pointer text-center"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Post Property Button Pill */}
            <div className="relative">
              <Link
                href="/post-property"
                className="flex items-center space-x-2 bg-white border border-slate-300 dark:border-slate-700 hover:border-orange-500 rounded-full px-4 py-1.5 shadow-sm text-slate-800 font-extrabold text-xs transition"
              >
                <div className="w-5 h-5 rounded-md border border-orange-500 text-orange-500 flex items-center justify-center font-bold text-xs">
                  +
                </div>
                <span className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
                <span className="text-slate-800 dark:text-slate-200">Post Property</span>
              </Link>
              <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md">
                Free
              </span>
            </div>

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

      <StampDutyCalculatorModal
        isOpen={showStampDutyModal}
        onClose={() => setShowStampDutyModal(false)}
      />

      <PropertyCompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
      />

      <ReraCheckerModal
        isOpen={showReraModal}
        onClose={() => setShowReraModal(false)}
      />

      <LoanEligibilityModal
        isOpen={showLoanModal}
        onClose={() => setShowLoanModal(false)}
      />

      <CurrencyConverterModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
      />

      <CommuteCalculatorModal
        isOpen={showCommuteModal}
        onClose={() => setShowCommuteModal(false)}
      />

      <OfferSubmissionModal
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
      />

      <RentalYieldModal
        isOpen={showYieldModal}
        onClose={() => setShowYieldModal(false)}
      />

      <FloorPlanViewerModal
        isOpen={showFloorPlanModal}
        onClose={() => setShowFloorPlanModal(false)}
      />

      <LegalTitleCheckerModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
      />

      <PropertyShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      <PropertyReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />

      <DeveloperPortfolioModal
        isOpen={showPortfolioModal}
        onClose={() => setShowPortfolioModal(false)}
      />

      <QuickSearchShortcutModal />
    </header>
  );
}
