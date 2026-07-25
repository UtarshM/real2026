import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VERIFIED_AGENTS } from "@/data/agents";
import { initialProperties } from "@/data/properties";
import { ShieldCheck, Star, Phone, MessageSquare, MapPin, Award, CheckCircle2, Building, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = VERIFIED_AGENTS.find(a => a.slug === slug);
  if (!agent) return { title: "Agent Not Found" };

  return {
    title: `${agent.name} — Verified Real Estate Agent | AddressBox`,
    description: `Connect with ${agent.name} (${agent.agency}). RERA ID: ${agent.reraId}. Rated ${agent.rating}/5 across ${agent.dealsClosed}+ deals in ${agent.localities.join(", ")}.`
  };
}

export default async function AgentProfilePage({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = VERIFIED_AGENTS.find(a => a.slug === slug);

  if (!agent) {
    notFound();
  }

  const agentProperties = initialProperties.slice(0, 3);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-orange-400">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/builders" className="hover:text-orange-400">Agents & Partners</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400 font-bold">{agent.name}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {agent.avatarUrl ? (
              <Image
                src={agent.avatarUrl}
                alt={agent.name}
                width={120}
                height={120}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-orange-500/40 shadow-xl flex-shrink-0"
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-orange-600/20 border-2 border-orange-500/40 flex items-center justify-center text-3xl font-black text-orange-400 font-display">
                {agent.name.charAt(0)}
              </div>
            )}

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white font-display">{agent.name}</h1>
                  {agent.verified && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">{agent.agency} • RERA: <span className="text-orange-400 font-mono font-bold">{agent.reraId}</span></p>
              </div>

              {/* Badges Bar */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-bold">
                <span className="flex items-center space-x-1 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{agent.rating} ({agent.reviewsCount} Reviews)</span>
                </span>
                <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  {agent.dealsClosed}+ Closed Deals
                </span>
                <span className="text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                  {agent.experienceYears} Years Exp.
                </span>
              </div>

              <p className="text-xs text-slate-300 max-w-2xl">{agent.bio}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2 justify-center sm:justify-start">
                <a
                  href={`https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(`Hi ${agent.name}, I found your agent profile on AddressBox. Please assist me with properties.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl border-none">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>WhatsApp Direct</span>
                  </Button>
                </a>

                <a href={`tel:${agent.phone}`}>
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 text-xs px-5 py-2.5 rounded-xl">
                    <Phone className="w-4 h-4 mr-2 text-orange-400" />
                    <span>Call {agent.phone}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Localities Covered */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Localities Covered</h3>
          <div className="flex flex-wrap gap-2">
            {agent.localities.map((loc, idx) => (
              <Link key={idx} href={`/locality/${loc.toLowerCase().replace(" ", "-")}`}>
                <span className="bg-slate-950 border border-slate-800 text-orange-400 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition">
                  📍 {loc}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Active Agent Listings */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white font-display">Active Listings by {agent.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {agentProperties.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Direct Listing</span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{p.title}</h4>
                <p className="text-[11px] text-slate-400">{p.locality}, {p.city}</p>
                <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                  <span className="text-xs font-black text-orange-400">{p.price}</span>
                  <Link href={`/property/${p.id}`} className="text-[10px] text-blue-400 font-bold hover:underline">View Details →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
