"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Compass, CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import { DESTINATIONS } from "@/data/mockData";

export default function PlacesStayWithYou() {
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);

  return (
    <section id="destinations" className="relative py-28 bg-[#040f1a] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Iconic Landscapes
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Places That Stay With You
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            Certain corners of India do not leave you when you return home.
            They linger in the senses like the resonance of temple bells.
          </p>

          {/* Interactive Destination Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-none">
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setSelectedDest(dest)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedDest.id === dest.id
                    ? "bg-[#EA580C] text-white shadow-lg shadow-[#EA580C]/40"
                    : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {dest.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Destination Cinematic Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-[#0A2E4C]/40 border border-white/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left: Panoramic Image (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[560px]">
              <Image
                src={selectedDest.imageUrl}
                alt={selectedDest.name}
                fill
                priority
                className="object-cover object-center brightness-[0.88] contrast-[1.05]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040f1a] via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#040f1a] hidden lg:block" />

              {/* Coordinates Pill */}
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-300">
                <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>{selectedDest.coordinates}</span>
              </div>
            </div>

            {/* Right: Rich Narrative & Highlights (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                    {selectedDest.region}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-zinc-400 font-light">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Best: {selectedDest.bestSeason}</span>
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  {selectedDest.name}
                </h3>
                <p className="text-sm font-medium text-amber-300 italic">
                  &ldquo;{selectedDest.tagline}&rdquo;
                </p>

                <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {selectedDest.description}
                </p>

                {/* 4 Curated Highlights */}
                <div className="pt-2 space-y-2.5">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Signature Experiences
                  </span>
                  {selectedDest.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <a
                  href="#trip-planner"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:shadow-lg hover:shadow-[#EA580C]/40 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Customize Trip to {selectedDest.name}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

