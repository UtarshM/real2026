import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy policy and data protection practices at ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-950 min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="max-w-4xl mx-auto space-y-8 bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-xl">
        <div>
          <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Privacy & Data Governance</span>
          <h1 className="text-3xl font-extrabold text-white mt-1 font-display">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-2">Last Updated: July 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed border-t border-slate-800 pt-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information Collection</h2>
            <p>
              {siteConfig.name} respects your privacy. When you request a callback, book a site visit, or submit search criteria, we collect your name, phone number, and property preferences to facilitate site visits and owner/builder connections.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Use of Information</h2>
            <p>
              Your contact details are strictly used to assist your home buying or renting inquiry. We do not sell user lead databases to third-party telemarketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Canonical Office Address</h2>
            <p>
              For data protection inquiries or to request deletion of your submitted lead details, visit or contact our office at:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-1 font-mono text-slate-400">
              <p><strong className="text-slate-200">Office:</strong> {siteConfig.address.street}, {siteConfig.address.city} {siteConfig.address.zipCode}</p>
              <p><strong className="text-slate-200">Email:</strong> {siteConfig.contact.email}</p>
              <p><strong className="text-slate-200">Phone:</strong> {siteConfig.contact.phone}</p>
            </div>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs">
          <Link href="/" className="text-blue-400 hover:underline">← Back to Home</Link>
          <Link href="/terms" className="text-slate-400 hover:text-white">View Terms of Service →</Link>
        </div>
      </div>
    </div>
  );
}
