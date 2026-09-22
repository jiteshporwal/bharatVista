"use client";

import { useState } from "react";
import { ShieldAlert, LifeBuoy, HeartPulse, Bus, UserCheck, AlertTriangle } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function SafetyGuidelinesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>COMMUNITY WELLBEING &amp; PROTOCOLS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Travel Safety Guidelines
          </h1>
          <p className="text-sm font-mono text-zinc-400">
            How we protect every guest from morning departure to evening return • BharatVista
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-12 bg-[#0A2E4C]/30 border border-white/10 space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          {/* Operational Flexibility Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Safety Precautionary Note:</strong> In instances of heavy rain, river water level surges, or road maintenance along the Vindhyachal ghat pass, the Trip Captain holds full authority to modify route timings or halt water excursions to ensure 100% traveller safety.
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Bus className="w-5 h-5 text-[#EA580C]" />
              <h2 className="text-xl font-serif font-bold text-white">1. Luxury Coach Standards</h2>
            </div>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li>Commercial luxury AC coach with experienced hill-road drivers.</li>
              <li>Pre-trip mechanical inspection and speed-governor adherence.</li>
              <li>Fully stocked onboard First-Aid kit with motion sickness medication and emergency bandages.</li>
              <li>Continuous phone contact with our Indore central monitoring desk.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <LifeBuoy className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-serif font-bold text-white">2. River Ghat &amp; Boat Safety (Narmada &amp; Sahastradhara)</h2>
            </div>
            <p>
              The Narmada is holy and majestic, but rocky rapids at Sahastradhara require caution:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li><strong>Mandatory Life Jackets:</strong> All guests boarding wooden boats must wear secured life jackets provided by licensed boatmen.</li>
              <li><strong>Slippery Basalt Rocks:</strong> Avoid venturing into wet, moss-covered rapids beyond the safety markings.</li>
              <li><strong>No Unsupervised Swimming:</strong> Swimming in fast rapids is strictly banned. Only dip feet at designated quiet ghat steps.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-serif font-bold text-white">3. Solo &amp; Female Traveller Protection</h2>
            </div>
            <p>
              BharatVista was built to empower solo exploration. We maintain:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li>Zero tolerance for harassment, aggressive behavior, or inappropriate conduct.</li>
              <li>Dedicated Trip Captain present at all group stops and meals.</li>
              <li>Verified traveller manifest; you are never stranded alone.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <HeartPulse className="w-5 h-5 text-red-400" />
              <h2 className="text-xl font-serif font-bold text-white">4. Health, Hydration &amp; Motion Sickness</h2>
            </div>
            <p>
              The ascent and descent through Jam Gate involves scenic winding roads. If you are prone to motion sickness:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-200">
              <li>Request a front-row seat with your coordinator before departure.</li>
              <li>Complimentary motion sickness tablets (Avomine) and fresh ginger candies are available with the trip captain.</li>
              <li>Carry a refillable water bottle; clean drinking water is provided throughout.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">5. 24/7 Safety Helpline</h2>
            <p>
              In case of any family emergency or query while your trip is underway:
            </p>
            <p className="font-mono text-xs text-amber-300">
              Trip Captain 1: +91 {TRIP_CONFIG.phones.contact1} • Trip Captain 2: +91 {TRIP_CONFIG.phones.contact2} • WhatsApp: +91 {TRIP_CONFIG.phones.whatsapp}
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

