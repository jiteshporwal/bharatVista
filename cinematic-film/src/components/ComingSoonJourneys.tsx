"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Clock, CheckCircle2 } from "lucide-react";
import { COMING_SOON_JOURNEYS } from "@/data/cinematicData";

export default function ComingSoonJourneys() {
  const pachmarhi = COMING_SOON_JOURNEYS[0];
  const otherConcepts = COMING_SOON_JOURNEYS.slice(1);

  return (
    <section id="coming-soon" className="relative py-16 sm:py-28 bg-[#040e1a] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Future Concept Horizons</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            MORE JOURNEYS ARE <span className="text-[#EA580C]">COMING</span>
          </h2>

          <p className="text-sm sm:text-lg text-zinc-300 font-light leading-relaxed">
            More of India. More stories. More reasons to travel.
          </p>
          <div>
            <span className="inline-block text-[10px] sm:text-xs uppercase tracking-wider text-amber-300/90 bg-white/5 border border-white/10 px-3.5 sm:px-4 py-1.5 rounded-full font-mono max-w-full leading-relaxed">
              Notice: The concepts below are currently in curation and are COMING SOON
            </span>
          </div>
        </div>

        {/* Featured Flagship Coming Soon: PACHMARHI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A2E4C]/50 border border-white/15 shadow-2xl mb-8 sm:mb-10 grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Visual (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[260px] xs:min-h-[320px] sm:min-h-[460px] lg:min-h-[520px]">
            <Image
              src={pachmarhi.imageUrl}
              alt={pachmarhi.title}
              fill
              className="object-cover brightness-90 contrast-[1.05]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040e1a] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#040e1a] hidden lg:block" />

            {/* Prominent COMING SOON Tag */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 flex-wrap">
              <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#EA580C] text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-lg shadow-[#EA580C]/50">
                COMING SOON
              </span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold text-amber-300">
                {pachmarhi.seasonTag}
              </span>
            </div>
          </div>

          {/* Details (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-8 lg:p-12 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4 text-left">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold block">
                Seasonal Concept Highlight
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                {pachmarhi.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-amber-300 italic">
                &ldquo;{pachmarhi.tagline}&rdquo;
              </p>
              <p className="text-xs sm:text-base text-zinc-300 font-light leading-relaxed">
                {pachmarhi.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                  Anticipated Experiences:
                </span>
                {pachmarhi.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EA580C] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-zinc-400 font-mono">
                STATUS: IN ADVANCED CURATION
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white cursor-not-allowed opacity-80">
                <span>Coming Soon</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Secondary Concept Cards (Mandu & Kanha) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {otherConcepts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A2E4C]/35 border border-white/10 p-5 sm:p-8 flex flex-col justify-between space-y-5 sm:space-y-6 group text-left"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                    COMING SOON
                  </span>
                  <span className="text-xs text-zinc-400 font-light">
                    {item.seasonTag}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span>Concept Phase</span>
                <span className="font-semibold text-amber-400">Coming Soon</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
