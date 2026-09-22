"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bus, ArrowRight, MapPin, Gift } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

interface FinalCTAProps {
  onBookSeatClick?: () => void;
}

export default function FinalCTA({ onBookSeatClick }: FinalCTAProps) {
  return (
    <section className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#0A2E4C] via-[#061727] to-[#02070e] border border-amber-400/30 p-5 sm:p-12 lg:p-20 text-center shadow-2xl shadow-black/80"
      >
        {/* Ambient Map Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3 p-1.5 pr-4 sm:pr-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-white p-0.5">
              <Image
                src="/logo.png"
                alt="BharatVista"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-amber-300 uppercase">
              BHARATVISTA ROAD EXPEDITIONS
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Your Next Story <span className="text-[#EA580C]">Starts Here</span>
            </h2>
            <p className="text-xl sm:text-3xl font-serif text-amber-300 font-medium italic">
              &ldquo;{TRIP_CONFIG.tagline}&rdquo;
            </p>
            <p className="text-xs sm:text-lg text-zinc-300 font-light max-w-xl mx-auto leading-relaxed pt-1">
              The luxury coach is fueled. The Vindhyachal mountain pass is waiting. Fresh morning poha and cutting chai are brewing. All that is missing is you.
            </p>
          </div>

          {/* Route Summary Badge (Strictly ONE line, strictly Sahastradhara) */}
          <div className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl bg-black/50 border border-white/15 text-[11px] sm:text-xs text-amber-200 font-mono text-center leading-relaxed">
            <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0 hidden xs:inline" />
            <span>Indore → Rau Circle → Jam Gate → Maheshwar → Sahastradhara → Return by 8:30–9:00 PM • ₹{TRIP_CONFIG.price} All-Inclusive</span>
          </div>

          {/* Promotional Gift Notice */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-mono">
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>{TRIP_CONFIG.promotionalGiftText}</span>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={onBookSeatClick}
              className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-lg text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-2xl shadow-[#EA580C]/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <Bus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Book Your Seat • ₹{TRIP_CONFIG.price}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <a
              href="#hero-cinematic-film"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-base text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Replay Cinematic Film</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
