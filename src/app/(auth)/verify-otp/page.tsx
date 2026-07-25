"use client";

import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema, VerifyOtpInput } from "@/schemas/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";

function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = async (data: VerifyOtpInput) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await axios.post("/api/auth/verify-otp", data);
      
      if (res.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.error || "Verification failed. Please check the OTP and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-center">
      
      {/* Header Logo & Title */}
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
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Verify email</h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          We have sent a verification code to <span className="text-white font-semibold">{email || "your email"}</span>
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs font-semibold flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isSuccess ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 bg-green-500/20 text-green-450 rounded-full flex items-center justify-center mx-auto shadow-md shadow-green-500/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-white text-lg">Verification Complete!</h3>
          <p className="text-slate-400 text-xs sm:text-sm">Redirecting you to the login screen...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email read-only mapping */}
          <input type="hidden" {...register("email")} />

          {/* OTP input */}
          <div className="space-y-2">
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider text-center">
              6-Digit Security Code
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="000000"
              {...register("otp")}
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-white rounded-xl text-center py-3.5 text-lg font-bold tracking-widest outline-none transition placeholder:text-slate-700"
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1 text-center font-medium">{errors.otp.message}</p>
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
              <span>Verify Code</span>
            )}
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-xs sm:text-sm text-slate-400">
        Didn&apos;t receive the email?{" "}
        <button 
          onClick={() => alert("Verification code resent! Please check your email.")}
          className="text-blue-500 hover:text-blue-400 font-semibold underline bg-transparent border-none cursor-pointer"
        >
          Resend code
        </button>
      </div>

    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Background Glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <Suspense fallback={
        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-400 text-xs sm:text-sm font-semibold">Loading verification context...</p>
        </div>
      }>
        <OtpVerificationForm />
      </Suspense>

    </div>
  );
}
