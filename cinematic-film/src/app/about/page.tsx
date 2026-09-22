"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, Compass, Users, Sparkles, MapPin, Bus, Coffee, ArrowRight, ShieldCheck } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function AboutPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OUR PHILOSOPHY & STORY</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            We Travel for the Moments <span className="text-[#EA580C]">In Between</span>
          </h1>

          <p className="text-xl sm:text-3xl font-serif text-amber-300 italic font-medium">
            &ldquo;{TRIP_CONFIG.tagline}&rdquo;
          </p>

          <p className="text-base sm:text-xl text-zinc-300 font-light max-w-3xl mx-auto leading-relaxed pt-2">
            We love travelling. We love discovering places. But most of all, we love the honest, unscripted moments that happen along the way.
          </p>
        </section>

        {/* Core Pillars: Masti • Dhamal • Sukoon */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#0A2E4C]/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#061727] border border-amber-500/30 flex items-center justify-center text-[#EA580C]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Masti</h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                The impromptu antakshari on the bus, laughing over hot kachoris at Rau Circle, and sharing playlists as the Vindhyachals roll into view.
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#0A2E4C]/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#061727] border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Dhamal</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                The group energy when discovering royal ramparts, the collective cheer on the boat ride across Sahastradhara, and meeting people who start as strangers and return as friends.
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#0A2E4C]/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#061727] border border-amber-500/30 flex items-center justify-center text-orange-400">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Sukoon</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                Watching dusk settle quietly over the sacred waters of the Narmada, listening to evening temple bells, and the peace of returning home thoroughly refreshed.
              </p>
            </div>
          </div>
        </section>

        {/* Why We Built BharatVista Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-14 bg-gradient-to-b from-[#0A2E4C] to-[#040e1a] border border-amber-400/30 shadow-2xl space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400">THE FOUNDATION</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Why We Built BharatVista
              </h2>
            </div>

            <div className="space-y-6 text-zinc-200 text-base sm:text-lg leading-relaxed font-light border-l-2 border-[#EA580C] pl-6">
              <p className="font-serif text-xl sm:text-2xl text-amber-200 italic">
                &ldquo;We built BharatVista because we believe some of life&apos;s best memories happen on the road.&rdquo;
              </p>
              <p>
                A chai stop at Jam Gate overlooking the clouds in the valley.
              </p>
              <p>
                A random laugh shared between travellers who met just an hour ago.
              </p>
              <p>
                A beautiful view outside the window as the highway cuts through the Malwa plateau.
              </p>
              <p>
                A piping hot meal of Dal Bafla and churma laddu shared around a big table like family.
              </p>
              <p>
                A golden sunset over ancient stone ghats you didn&apos;t expect to touch your soul so deeply.
              </p>
              <p>
                A story you keep telling your friends years later.
              </p>
              <p className="font-medium text-white pt-2">
                BharatVista is our way of creating more of those moments.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bus className="w-4 h-4" />
                <span>Join Our Next Journey • ₹{TRIP_CONFIG.price}</span>
              </button>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/15 text-center transition-all"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </section>

        {/* Commitment to Honest Travel */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Honest Travel. Zero Hidden Costs.
          </h3>
          <p className="text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            We don&apos;t inflate package costs or add surprise charges. Our one-day Indore → Jam Gate → Maheshwar → Sahastradhara journey is transparently ₹{TRIP_CONFIG.price} per person, inclusive of clean AC coach travel, morning snacks, chai, and complete trip assistance.
          </p>
        </section>
      </main>

      <Footer />
      <SeatBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

