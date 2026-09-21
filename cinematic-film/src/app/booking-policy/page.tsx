"use client";

import { useState } from "react";
import { Ticket, CheckCircle2, AlertCircle, Sparkles, Users, Gift } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function BookingPolicyPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            <span>ENQUIRY &amp; RESERVATIONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Booking &amp; Enquiry Policy
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            How seat reservation works at BharatVista • Pure Frictionless Travel
          </p>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 bg-[#0A2E4C]/30 border border-white/10 space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          {/* Operational Discretion Alert */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Operational Change Notice:</strong> Trip schedules, pickup stops, timing sequence, and activities may be updated by our Trip Captain if road congestion, weather conditions, or local administration advisories require it.
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">1. The Frictionless Booking Flow</h2>
            <p>
              We believe booking a weekend getaway shouldn&apos;t feel like filing taxes. BharatVista requires:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li><strong>NO Mandatory Account Creation:</strong> No passwords, logins, or social sign-in barriers.</li>
              <li><strong>Mobile Number Required:</strong> To coordinate your coach boarding, seat numbers, and timing.</li>
              <li><strong>Email is Optional:</strong> Only if you wish to receive a digital copy of your receipt.</li>
              <li><strong>Custom Pickup Request:</strong> If your location in Indore is along the route, tell us in the form.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">2. All-Inclusive Pricing Structure</h2>
            <p>
              The expedition fee is strictly <strong>₹{TRIP_CONFIG.price} per person</strong>. There are no surprise fuel surcharges or hidden convenience fees added at the end.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-white">3. Group Discounts &amp; First-Customer Gifts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-amber-400/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase font-mono">
                  <Users className="w-4 h-4" />
                  <span>20% Group Discount</span>
                </div>
                <p className="text-sm text-zinc-200">
                  Travelling with friends or family? Book 4 or more seats together to automatically unlock 20% off your entire booking.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-amber-400/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase font-mono">
                  <Gift className="w-4 h-4" />
                  <span>Exclusive BharatVista Gift</span>
                </div>
                <p className="text-sm text-zinc-200">
                  {TRIP_CONFIG.promotionalGiftText}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">4. Confirmation Steps</h2>
            <ol className="list-decimal pl-6 space-y-1.5 text-zinc-200">
              <li>Select your preferred Saturday or Sunday from our upcoming dates.</li>
              <li>Fill out your name, mobile number, and preferred pickup point.</li>
              <li>Receive instant booking reference (BV-XXXXXX) on screen.</li>
              <li>Our Trip Coordinator will verify coach seating and send you coach details on WhatsApp.</li>
            </ol>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">5. Booking Assistance</h2>
            <p>
              Prefer booking directly with a human over the phone or WhatsApp?
            </p>
            <p className="font-mono text-xs text-amber-300">
              Call: +91 {TRIP_CONFIG.phones.contact1} / +91 {TRIP_CONFIG.phones.contact2} • WhatsApp: +91 {TRIP_CONFIG.phones.whatsapp}
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

