"use client";

import { useState } from "react";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function PrivacyPolicyPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            Last Updated: September 2026 • BharatVista Road Expeditions
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-12 bg-[#0A2E4C]/30 border border-white/10 space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">1. Our Commitment to Your Privacy</h2>
            <p>
              At BharatVista, your trust is sacred. We collect only the minimum personal information strictly necessary to process your seat enquiry, coordinate morning pickups in Indore, communicate schedule updates, and ensure your safety throughout the trip.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">2. Information We Collect</h2>
            <p>
              When you submit a seat booking or enquiry on BharatVista, we request:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li><strong>Full Name:</strong> To identify passengers on our coach manifest.</li>
              <li><strong>Mobile Number (Required):</strong> To send pickup coordination calls, WhatsApp confirmations, and emergency alerts.</li>
              <li><strong>Pickup Point &amp; Date:</strong> To plan coach routing and departure stops.</li>
              <li><strong>Email Address (Optional):</strong> For booking receipt copies and optional future itineraries.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">3. Zero Third-Party Data Selling</h2>
            <p>
              We <strong>never</strong> sell, rent, trade, or share your contact number or personal details with marketing brokers, third-party advertisers, or spam agencies. Your details stay strictly within the BharatVista operations team.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">4. Operational Communications</h2>
            <p>
              By submitting an enquiry, you consent to receive direct travel-related phone calls and WhatsApp messages from our coordinators (+91 {TRIP_CONFIG.phones.contact1}, +91 {TRIP_CONFIG.phones.contact2}, or WhatsApp +91 {TRIP_CONFIG.phones.whatsapp}) regarding your scheduled weekend departure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">5. Photography and Media Notice</h2>
            <p>
              During BharatVista expeditions, our team may take group photographs or short video clips at public viewpoints (Jam Gate, Ahilya Fort, Sahastradhara) for genuine travel memory albums and community highlights. If you prefer not to appear in media, simply inform your Trip Captain at morning boarding.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">6. Contact Our Privacy Officer</h2>
            <p>
              For queries or to request deletion of your contact records after a completed journey, contact us directly at:
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

