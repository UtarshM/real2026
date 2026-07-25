import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of Service and legal agreements for browsing property listings on ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="bg-slate-950 min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="max-w-4xl mx-auto space-y-8 bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-xl">
        <div>
          <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Legal & Compliance</span>
          <h1 className="text-3xl font-extrabold text-white mt-1 font-display">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-2">Last Updated: July 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed border-t border-slate-800 pt-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Service Overview</h2>
            <p>
              Welcome to {siteConfig.name} ({siteConfig.url}). We operate as a video-first boutique real estate brokerage headquartered at {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zipCode}. By using our platform, you agree to comply with our terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. RERA Compliance & Listings</h2>
            <p>
              All property listings presented on {siteConfig.name} undergo physical site visits and RERA registration checks (GUJRERA / AUDA). While we strive for absolute data fidelity, buyers are advised to inspect developer title deeds independently before executing sale agreements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Zero Brokerage & Advisory Services</h2>
            <p>
              Direct developer properties listed on our site qualify under zero brokerage terms for buyers. Tailored advisory and documentation assistance is provided by certified AddressBox agents.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Contact Information</h2>
            <p>
              For legal notices or query escalations, contact us at:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-slate-400">
              <p><strong className="text-slate-200">Entity:</strong> {siteConfig.name}</p>
              <p><strong className="text-slate-200">Office:</strong> {siteConfig.address.street}, {siteConfig.address.city} {siteConfig.address.zipCode}</p>
              <p><strong className="text-slate-200">Phone:</strong> {siteConfig.contact.phone}</p>
              <p><strong className="text-slate-200">Email:</strong> {siteConfig.contact.email}</p>
            </div>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs">
          <Link href="/" className="text-blue-400 hover:underline">← Back to Home</Link>
          <Link href="/privacy" className="text-slate-400 hover:text-white">View Privacy Policy →</Link>
        </div>
      </div>
    </div>
  );
}
