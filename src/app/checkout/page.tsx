"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, CheckCircle, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "premium";

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const plansDetails: Record<string, { title: string; price: string }> = {
    free: { title: "Free Plan Setup", price: "₹0" },
    premium: { title: "Premium Agent Monthly Subscription", price: "₹1,499" },
    builder: { title: "Unlimited Builder Monthly Subscription", price: "₹4,999" }
  };

  const currentPlan = plansDetails[plan] || plansDetails.premium;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Set user subscription flag in localStorage
      localStorage.setItem("user_subscription", plan.toUpperCase());

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-center">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display">Secure Checkout</h2>
        <p className="text-slate-400 text-xs mt-1">Completing payment subscription under sandbox gate</p>
      </div>

      {isSuccess ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-white text-lg">Transaction Approved!</h3>
          <p className="text-slate-450 text-xs sm:text-sm">Activating plan subscription and loading dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handlePay} className="space-y-4">
          
          {/* Plan Summary */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1 text-xs font-semibold text-slate-350">
            <span className="text-[10px] text-slate-550 block uppercase tracking-wider font-extrabold">Plan Selection</span>
            <span className="text-white block font-bold">{currentPlan.title}</span>
            <span className="text-blue-500 text-sm font-black block pt-1">{currentPlan.price}</span>
          </div>

          {/* Cards Inputs */}
          <div className="space-y-1.5">
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Cardholder Name</label>
            <input
              type="text"
              required
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Card Number</label>
            <div className="relative flex items-center">
              <CreditCard className="absolute left-3 w-4.5 h-4.5 text-slate-500" />
              <input
                type="text"
                required
                maxLength={16}
                pattern="[0-9]{16}"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600"
                placeholder="0000 0000 0000 0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Expiry Date</label>
              <input
                type="text"
                required
                maxLength={5}
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600 text-center"
                placeholder="MM/YY"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">CVV Code</label>
              <input
                type="password"
                required
                maxLength={3}
                pattern="[0-9]{3}"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-600 text-center"
                placeholder="•••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer mt-4"
          >
            {isLoading ? (
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
            ) : (
              <span>Authorise Payment</span>
            )}
          </Button>

          <div className="text-center pt-2 flex items-center justify-center space-x-1.5 text-[10px] text-slate-500 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>Encrypted sandbox protocol integration</span>
          </div>

        </form>
      )}

    </div>
  );
}

export default function CheckoutPage() {
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
          <p className="text-slate-400 text-xs sm:text-sm font-semibold">Loading checkout details...</p>
        </div>
      }>
        <CheckoutForm />
      </Suspense>

    </div>
  );
}
