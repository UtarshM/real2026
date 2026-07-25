"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"BUYER" | "SELLER" | "BUILDER" | "AGENT">("BUYER");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    // Basic phone validation (10 digits)
    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      setAuthError("Please enter a valid 10-digit mobile phone number.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: phoneClean, password, role }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Registration failed. Please check your information.");
      } else {
        // Auto sign in
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-center">
        
        {/* Logo & Header */}
        <div className="text-center mb-6 space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="bg-orange-500 p-2.5 rounded-2xl text-white shadow-md shadow-orange-500/25">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <span className="font-black text-2xl tracking-tight font-display text-slate-900 dark:text-white">
              Address<span className="text-orange-500 font-black">Box</span>
            </span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white">Create Your Account</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Join Gujarat&apos;s leading zero-brokerage real estate platform</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6">
          <label className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 tracking-wider block mb-2">Register As</label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
            {[
              { id: "BUYER", label: "Buyer" },
              { id: "SELLER", label: "Owner" },
              { id: "BUILDER", label: "Builder" },
              { id: "AGENT", label: "Agent" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRole(tab.id as any)}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-black uppercase transition cursor-pointer ${
                  role === tab.id
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {authError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="block text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider">Full Name *</label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Patel"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-orange-500 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-3 text-xs font-extrabold outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider">Phone Number *</label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-orange-500 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-3 text-xs font-extrabold outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider">Email Address *</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-orange-500 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-3 text-xs font-extrabold outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider">Create Password *</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-orange-500 text-slate-900 dark:text-white rounded-xl pl-10 pr-10 py-3 text-xs font-extrabold outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-3.5 rounded-xl transition flex items-center justify-center space-x-2 text-xs uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 border-none"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Create {role.charAt(0) + role.slice(1).toLowerCase()} Account</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400 font-bold">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 hover:underline font-black">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}
