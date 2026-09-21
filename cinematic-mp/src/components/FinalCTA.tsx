"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bus, ArrowRight, Sparkles, MapPin } from "lucide-react";

interface FinalCTAProps {
  onBookSeatClick?: () => void;
}

export default function FinalCTA({ onBookSeatClick }: FinalCTAProps) {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0A2E4C] via-[#061727] to-[#02070e] border border-amber-400/30 p-8 sm:p-16 lg:p-20 text-center shadow-2xl shadow-black/80"
      >
        {/* Ambient Map Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-3 p-1.5 pr-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white p-0.5">
              <Image
                src="/logo.png"
                alt="BharatVista"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="text-xs font-semibold tracking-widest text-amber-300 uppercase">
              BHARATVISTA ROAD EXPEDITIONS
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Your Next Story <span className="text-[#EA580C]">Starts Here</span>
            </h2>
            <p className="text-2xl sm:text-3xl font-serif text-amber-300 font-medium italic">
              &ldquo;हर सफ़र, एक नई कहानी&rdquo;
            </p>
            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-xl mx-auto leading-relaxed pt-2">
              The coach is fueled. The Vindhyachal pass is waiting. The Maggie is
              steaming. All that is missing is you.
            </p>
          </div>

          {/* Route Summary Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 border border-white/15 text-xs text-amber-200 font-mono">
            <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Indore → Jam Gate → Maheshwar → Shastradhara • ₹700 All-Inclusive</span>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onBookSeatClick}
              className="w-full sm:w-auto px-10 py-4 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-2xl shadow-[#EA580C]/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-3"
            >
              <Bus className="w-5 h-5" />
              <span>Book Your Seat • ₹700</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#hero-journey"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Replay Travel Story</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
