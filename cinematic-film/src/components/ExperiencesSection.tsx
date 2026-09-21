"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ArrowRight, X, Sparkles, MapPin, Bus } from "lucide-react";
import { TRIP_CONFIG, ExperienceItem } from "@/data/tripConfig";

interface ExperiencesSectionProps {
  onBookSeatClick?: () => void;
}

export default function ExperiencesSection({ onBookSeatClick }: ExperiencesSectionProps) {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  return (
    <section id="experiences" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ONE CURATED DAY • 8 UNFORGETTABLE MOMENTS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          The 8 Authentic <span className="text-[#EA580C]">BharatVista</span> Experiences
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
          Not just visiting locations — living the moments that happen between them.
          Every chai, heritage stone, and shared meal is thoughtfully arranged.
        </p>
      </div>

      {/* 8 Cards Grid: Exactly 4 per row on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRIP_CONFIG.experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            onClick={() => setSelectedExperience(exp)}
            className="group relative rounded-3xl overflow-hidden bg-[#0A2E4C]/50 border border-white/10 hover:border-amber-400/50 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Aspect Box */}
            <div className="relative w-full h-52 overflow-hidden bg-black/40">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E4C] via-transparent to-black/30" />

              {/* Tag & Time Pill */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-white/10">
                  {exp.tag}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/25 backdrop-blur-md text-white border border-amber-400/30 flex items-center gap-1">
                  <Clock className="w-2.8 h-2.8 text-amber-300" />
                  <span>{exp.time}</span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light line-clamp-3">
                  {exp.shortDesc}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Detail Modal (Part 23) */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#061727] border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl z-10 text-white my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Header */}
              <div className="relative w-full h-72 sm:h-84 overflow-hidden bg-black">
                <Image
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-[#061727]/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-3 py-0.5 rounded-full bg-[#EA580C] text-white">
                      {selectedExperience.tag}
                    </span>
                    <span className="text-xs font-mono text-amber-300 flex items-center gap-1 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                      <Clock className="w-3 h-3" />
                      <span>{selectedExperience.time}</span>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                    {selectedExperience.title}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-6 text-left">
                <p className="text-sm sm:text-base text-zinc-200 font-serif leading-relaxed italic">
                  &ldquo;{selectedExperience.shortDesc}&rdquo;
                </p>

                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {selectedExperience.fullDesc}
                </p>

                {/* Trip Inclusions Footer */}
                <div className="p-4 rounded-2xl bg-[#0A2E4C]/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-amber-300 font-mono font-semibold block">
                      ALL-INCLUSIVE DAY EXPEDITION
                    </span>
                    <span className="text-xs text-zinc-300">
                      ₹{TRIP_CONFIG.price} includes travel, breakfast, chai & royal lunch
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedExperience(null);
                      if (onBookSeatClick) onBookSeatClick();
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Bus className="w-3.5 h-3.5" />
                    <span>Book This Weekend</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

