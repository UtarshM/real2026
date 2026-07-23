"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/schemas/auth";
import Link from "next/link";
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      // Simulate API endpoint request delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Background Glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px]" />
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
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Forgot password?</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">No worries, we will send you instructions to recover it</p>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-green-500/20 text-green-450 rounded-full flex items-center justify-center mx-auto shadow-md shadow-green-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-white text-lg">Check your email</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              We have sent a password recovery link to your registered email address.
            </p>
            <div className="pt-4">
              <Link href="/login" className="inline-flex items-center space-x-2 text-xs sm:text-sm text-blue-500 hover:text-blue-400 font-semibold hover:underline">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Login</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email input */}
            <div className="space-y-1.5">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-white rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm placeholder:text-slate-655 outline-none transition"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center space-x-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="inline-flex items-center space-x-2 text-xs sm:text-sm text-slate-400 hover:text-white font-semibold transition">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
