"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Compass, PhoneCall, ArrowRight, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onPlanTripClick?: () => void;
}

export default function FinalCTA({ onPlanTripClick }: FinalCTAProps) {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0A2E4C] via-[#061727] to-[#040d16] border border-white/15 p-8 sm:p-16 lg:p-20 text-center shadow-2xl shadow-black/80"
      >
        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#EA580C]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/95 p-0.5">
              <Image
                src="/logo.png"
                alt="BharatVista"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs font-semibold tracking-wider text-amber-300">
              BHARATVISTA EXPERIENCES
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Your Next Story <span className="text-[#EA580C]">Starts Here</span>
            </h2>
            <p className="text-lg sm:text-2xl font-serif text-amber-300/90 font-normal italic">
              &ldquo;हर सफ़र, एक नई कहानी&rdquo;
            </p>
            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed pt-2">
              Whether you yearn for silence among high Himalayan monasteries, private
              yacht crossings upon Lake Pichola, or quiet backwater sunrises,
              our specialists craft every moment around your rhythm.
            </p>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onPlanTripClick}
              className="w-full sm:w-auto px-10 py-4 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[#EA580C] via-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] shadow-2xl shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Compass className="w-5 h-5 animate-spin-slow" />
              <span>Plan My Trip</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#trip-planner"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Speak With A Destination Specialist</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

