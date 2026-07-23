"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "BUYER",
    },
  });

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await axios.post("/api/auth/register", data);
      
      if (res.status === 201) {
        // Redirect to OTP verification page
        router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.error || "Registration failed. Please check your details and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Background Glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-2 mb-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight font-display">
              Address<span className="text-blue-500">Box</span>
            </span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Create your account</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Sign up to buy, sell, or manage properties</p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name input */}
          <div className="space-y-1.5">
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Full Name</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 w-4.5 h-4.5 text-slate-500" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-white rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm placeholder:text-slate-650 outline-none transition"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Email input */}
          <div className="space-y-1.5">
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4.5 h-4.5 text-slate-500" />
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-white rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm placeholder:text-slate-650 outline-none transition"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Role selector dropdown */}
          <div className="space-y-1.5">
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Account Role</label>
            <div className="relative flex items-center">
              <Briefcase className="absolute left-3 w-4.5 h-4.5 text-slate-500" />
              <select
                {...register("role")}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-white rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm outline-none transition cursor-pointer"
              >
                <option value="BUYER">Buyer (Search & Rent)</option>
                <option value="SELLER">Seller (List my home)</option>
                <option value="AGENT">Agent (Broker / Expert)</option>
                <option value="BUILDER">Builder (Develop projects)</option>
                <option value="AGENCY">Agency (Corporate firm)</option>
              </select>
            </div>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.role.message}</p>
            )}
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4.5 h-4.5 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-white rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm placeholder:text-slate-650 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-500 hover:text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        {/* Footer link */}
        <div className="mt-6 text-center text-xs sm:text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-400 font-semibold underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
