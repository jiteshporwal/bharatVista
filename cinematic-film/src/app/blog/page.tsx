"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, MapPin } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function BlogIndexPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>BHARATVISTA TRAVEL JOURNAL</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Stories From <span className="text-[#EA580C]">The Road</span>
          </h1>

          <p className="text-xs sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Explorations, cultural deep-dives, food trails, and slow travel notes across the heart of India.
          </p>
        </div>

        {/* Featured Flagship Article */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A2E4C]/50 border border-white/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12 mb-8 sm:mb-12 group">
          <div className="lg:col-span-7 relative min-h-[240px] xs:min-h-[300px] sm:min-h-[420px]">
            <Image
              src="/maheshwar.png"
              alt="Maheshwar Ahilya Fort & Narmada Ghats"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-5 p-5 sm:p-12 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-amber-300">
                <span className="px-2.5 py-1 rounded bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#EA580C] font-semibold">
                  FEATURED STORY
                </span>
                <span>8 MIN READ</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                Maheshwar: Where the Narmada, Heritage &amp; Slow Travel Meet
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                Why a single day spent along the ancient stone steps of Ahilya Fort, listening to the loom shuttles and tasting authentic Malwa Dal Bafla, rewires how we perceive weekend travel from Indore.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">By BharatVista Editorial</span>
              <Link
                href="/blog/maheshwar-slow-travel"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] shadow-md transition-all"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Story Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0A2E4C]/30 border border-white/10 space-y-4">
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <Image
                src="/jamgate.png"
                alt="Jam Gate Mountain Pass"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <span className="text-xs font-mono text-amber-400 uppercase">Road Notes</span>
            <h3 className="text-xl font-serif font-bold text-white">
              The History of Jam Gate: Ahilyabai Holkar&apos;s Mountain Gateway
            </h3>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Standing tall at the boundary of Malwa and Nimar, this 1791 stone gate watched caravans pass for centuries. Today, it remains the ultimate morning chai viewpoint.
            </p>
            <Link
              href="/blog/maheshwar-slow-travel"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-white transition-colors"
            >
              <span>Explore in the Maheshwar Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-3xl p-6 sm:p-8 bg-[#0A2E4C]/30 border border-white/10 space-y-4">
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <Image
                src="/dalbafla.png"
                alt="Dal Bafla Malwa Thali"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <span className="text-xs font-mono text-amber-400 uppercase">Culinary Culture</span>
            <h3 className="text-xl font-serif font-bold text-white">
              The Anatomy of an Authentic Malwa Dal Bafla
            </h3>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Boiled, roasted over embers, and dipped in pure desi ghee — why the traditional Bafla paired with panchmel dal, garlic chutney, and churma laddu is an unmissable ritual.
            </p>
            <Link
              href="/blog/maheshwar-slow-travel"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-white transition-colors"
            >
              <span>Read in the Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <SeatBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

