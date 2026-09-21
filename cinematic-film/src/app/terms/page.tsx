"use client";

import { useState } from "react";
import { FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function TermsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>TERMS OF SERVICE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            Effective: September 2026 • BharatVista Road Expeditions
          </p>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 bg-[#0A2E4C]/30 border border-white/10 space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          {/* Operational Discretion Alert */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Important Operational Note:</strong> Trip schedules, pickup times, route sequences, weather contingencies, road conditions, and individual activity timings may change or be adjusted by our Trip Captain when operationally necessary to protect guest safety and road feasibility.
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">1. Journey Inclusions &amp; Pricing</h2>
            <p>
              The standard BharatVista one-day expedition is priced at <strong>₹{TRIP_CONFIG.price} per person</strong>. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li>Air-conditioned coach transportation round-trip from Indore</li>
              <li>Designated morning pickup and evening drop-off stops across Indore</li>
              <li>Indori breakfast (poha, jalebi/samosa, chai) at Rau Circle</li>
              <li>Morning mountain pass chai at Jam Gate</li>
              <li>Guided tour of Ahilya Fort and Narmada Ghats</li>
              <li>Sightseeing at Sahastradhara</li>
              <li>Dedicated Trip Captain and coordination support</li>
            </ul>
            <p className="text-xs text-zinc-400">
              * Personal shopping (such as Maheshwari handloom sarees), boat ride tickets, special temple donation receipts, and items outside the curated plan are paid directly by travellers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">2. Boarding &amp; Punctuality</h2>
            <p>
              Pickups run on a synchronized timeline starting at 06:45 AM at Vijay Nagar. Travellers must arrive at their designated pickup stop at least 10 minutes prior to scheduled departure. In case of unexpected guest delay, the coach can wait a maximum of 5 minutes past the scheduled pickup to avoid delaying all 30+ passengers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">3. Traveller Code of Conduct</h2>
            <p>
              BharatVista is dedicated to cultivating a warm, respectful, and safe community for solo travellers, families, women, and friends alike. 
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li>Consumption of alcohol, narcotics, or tobacco inside the coach is strictly prohibited.</li>
              <li>Disrespectful behavior, harassment, or unsafe conduct toward fellow travellers or local residents will result in immediate termination of the journey without refund.</li>
              <li>Guests are expected to treat historical heritage (Ahilya Fort, Narmada ghats) with clean civic responsibility (no littering).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">4. Group Discount &amp; Gift Policy</h2>
            <p>
              Groups of 4 or more travellers booking together are eligible for a 20% discount on total fares when applied during booking. Promotional gifts for the first 5 customers are awarded on a first-confirmed basis per departure date.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">5. Contact Information</h2>
            <p>
              For legal and terms inquiries, reach our Indore office:
            </p>
            <p className="font-mono text-xs text-amber-300">
              Phone: +91 {TRIP_CONFIG.phones.contact1} / +91 {TRIP_CONFIG.phones.contact2} • WhatsApp: +91 {TRIP_CONFIG.phones.whatsapp}
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

