"use client";

import { useState } from "react";
import { IndianRupee, Clock, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function RefundPolicyPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
            <span>PAYMENTS &amp; SETTLEMENTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Refund Policy
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            Straightforward processing guidelines • BharatVista
          </p>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 bg-[#0A2E4C]/30 border border-white/10 space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">1. Refund Processing Speed</h2>
            <p>
              Once a refund request is verified by our accounts coordinator in accordance with our cancellation timelines, the refund is initiated within <strong>24 to 48 hours</strong>. It typically reflects in your bank account or UPI source within <strong>3 to 5 business days</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">2. Mode of Refund</h2>
            <p>
              Refunds are issued directly to the original payment source (Google Pay, PhonePe, Paytm, UPI, or Net Banking) from which the booking payment was received. We do not issue third-party cash vouchers unless specifically requested as a date credit.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">3. Non-Refundable Incidents</h2>
            <p>
              Refunds will not be entertained in cases where:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li>A guest fails to arrive at the agreed pickup point on time (No-show after the 5-minute departure grace period).</li>
              <li>A guest willingly leaves the tour group early midway through the itinerary.</li>
              <li>Dismissal from the coach due to disruptive behavior, violation of coach safety, or illegal substances.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">4. Partial Inclusions Under Unforeseen Circumstances</h2>
            <p>
              In rare instances where an outdoor activity (such as the Sahastradhara boat ride) is suspended by local port administration due to high water discharge, BharatVista replaces the activity with local sightseeing or evening ghat temple exploration. No partial cash refunds apply for individual substituted activities.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">5. Refund Helpdesk</h2>
            <p>
              To check refund status, quote your Booking Reference ID (BV-XXXXXX) to:
            </p>
            <p className="font-mono text-xs text-amber-300">
              WhatsApp: +91 {TRIP_CONFIG.phones.whatsapp} • Phone: +91 {TRIP_CONFIG.phones.contact1}
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

