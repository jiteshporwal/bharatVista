"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Info, Sparkles } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function LoginPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"guest" | "staff">("staff");
  const [msg, setMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Internal authentication portal is under scheduled maintenance. For bookings, please use the direct enquiry flow without an account.");
  };

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>STAFF &amp; OPERATOR ACCESS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            BharatVista Portal
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 font-light">
            Internal console for trip coordinators, guides, and reservation managers.
          </p>
        </div>

        {/* Notice: No login needed for travellers */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3 text-xs text-amber-200">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Travellers Note:</strong> You do <em>not</em> need an account or login to book a seat with BharatVista. The journey is simple: choose your weekend, send your enquiry, and your seat is reserved.
          </p>
        </div>

        {/* Login Box */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0A2E4C]/40 border border-white/15 shadow-2xl space-y-5">
          {/* Role Toggle */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">
            <button
              type="button"
              onClick={() => setRole("staff")}
              className={`py-2 rounded-lg transition-all ${
                role === "staff"
                  ? "bg-[#EA580C] text-white font-semibold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Trip Staff
            </button>
            <button
              type="button"
              onClick={() => setRole("guest")}
              className={`py-2 rounded-lg transition-all ${
                role === "guest"
                  ? "bg-[#EA580C] text-white font-semibold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Admin Portal
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Username / Email
              </label>
              <input
                type="text"
                required
                placeholder="staff@bharatvista.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-sm"
              />
            </div>

            {msg && (
              <p className="text-xs text-amber-300 bg-black/40 p-3 rounded-xl border border-amber-500/30">
                {msg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] shadow-lg shadow-[#EA580C]/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Sign In to Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="text-xs text-amber-300 hover:underline"
            >
              Want to book a seat instead? Click here (No login required)
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <SeatBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

