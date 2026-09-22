"use client";

import { useState } from "react";
import { Clock, RefreshCw, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function CancellationPolicyPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>FAIR &amp; TRANSPARENT RULES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Cancellation Policy
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            Clear guidelines for changes, rescheduling, and cancellations • BharatVista
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-12 bg-[#0A2E4C]/30 border border-white/10 space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">1. Flexible Travel Philosophy</h2>
            <p>
              We understand plans can change unexpectedly. BharatVista aims to keep cancellation and rescheduling as frictionless and fair as possible.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-white">2. Cancellation Timelines (Guest Initiated)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/5 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-mono text-emerald-400 block font-semibold">&gt; 48 Hours Before</span>
                <p className="text-base font-serif font-bold text-white">100% Full Refund</p>
                <p className="text-xs text-zinc-300">Or free date transfer to any upcoming weekend.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-amber-500/30 space-y-2">
                <span className="text-xs font-mono text-amber-400 block font-semibold">24 to 48 Hours Before</span>
                <p className="text-base font-serif font-bold text-white">50% Refund</p>
                <p className="text-xs text-zinc-300">Or free date reschedule with 24h advance notice.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-orange-500/30 space-y-2">
                <span className="text-xs font-mono text-orange-400 block font-semibold">&lt; 24 Hours Before</span>
                <p className="text-base font-serif font-bold text-white">Reschedule Option</p>
                <p className="text-xs text-zinc-300">Seat holds are locked. Date transfer subject to nominal ₹150 seat prep fee.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">3. Cancellations by BharatVista (Force Majeure)</h2>
            <p>
              If a trip cannot operate due to extreme severe weather warnings, unexpected highway closures, political blockades, or government restrictions:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li>Guests receive a <strong>100% full immediate refund</strong> to original payment mode, OR</li>
              <li>Priority confirmed seating for the next scheduled weekend of their choice.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">4. Operational Route Adjustments</h2>
            <p>
              Please note: if heavy rains or administrative notices temporarily close ghat access or boat ferries at Sahastradhara, the trip continues with alternate curated heritage explorations. Such weather contingencies do not constitute trip cancellation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">5. How to Request a Cancellation</h2>
            <p>
              Simply send a WhatsApp message with your Booking Reference ID (BV-XXXXXX) to <strong>+91 {TRIP_CONFIG.phones.whatsapp}</strong> or call <strong>+91 {TRIP_CONFIG.phones.contact1}</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <SeatBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

