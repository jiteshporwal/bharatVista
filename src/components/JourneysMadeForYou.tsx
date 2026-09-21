"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Compass, Calendar, ArrowRight, CheckCircle2, Route } from "lucide-react";
import { CURATED_TOURS } from "@/data/mockData";

export default function JourneysMadeForYou() {
  return (
    <section id="journeys" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <Compass className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Curated Travel Blueprints</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
          Journeys Made <span className="text-[#EA580C]">For You</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
          Each route is a masterfully choreographed narrative. Designed to be
          experienced at a dignified pace with private guides and heritage stays.
        </p>
      </div>

      {/* Grid of 4 Curated Itineraries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CURATED_TOURS.map((tour, idx) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="rounded-3xl overflow-hidden bg-[#0A2E4C]/35 border border-white/10 hover:border-amber-400/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
          >
            {/* Visual Cover */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src={tour.imageUrl}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                  {tour.days}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#061727]/80 backdrop-blur-md text-xs font-medium text-amber-300 border border-white/10">
                  {tour.pace}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Optimal Season: {tour.season}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                  {tour.title}
                </h3>

                {/* Route milestones */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                    <Route className="w-3.5 h-3.5" />
                    <span>Route Milestones</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-300">
                    {tour.route.map((city, cIdx) => (
                      <span key={cIdx} className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-medium">
                          {city}
                        </span>
                        {cIdx < tour.route.length - 1 && (
                          <span className="text-zinc-500">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signature Inclusions */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Curated Highlights
                  </span>
                  {tour.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href="#trip-planner"
                  className="w-full py-3 rounded-full text-center text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] transition-all shadow-md shadow-[#EA580C]/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Customize This Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

