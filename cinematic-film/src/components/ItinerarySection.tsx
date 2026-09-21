"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Clock, MapPin, Sparkles, Bus, ArrowRight } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

interface ItinerarySectionProps {
  onBookSeatClick?: () => void;
}

export default function ItinerarySection({ onBookSeatClick }: ItinerarySectionProps) {
  return (
    <section id="itinerary" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>FULL ONE-DAY SCHEDULE • INDORE ROUND-TRIP</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          The Curated <span className="text-[#EA580C]">Weekend Timeline</span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
          From sunrise pickups in Indore to serene sunset aarti on the Narmada ghats.
          Every stop is timed for comfort, camaraderie, and discovery.
        </p>
      </div>

      {/* Timeline Flow */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central timeline spine */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#EA580C] via-amber-400 to-emerald-400 transform -translate-x-1/2 hidden sm:block" />

        <div className="space-y-8 sm:space-y-12">
          {TRIP_CONFIG.itinerary.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Image Card */}
                <div className="w-full sm:w-1/2">
                  <div className="relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-xl border border-white/10 group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 450px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-black/20" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="font-mono bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                        {item.highlight}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center Node Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#061727] border-2 border-amber-400 hidden sm:flex items-center justify-center text-amber-400 shadow-md shadow-amber-400/40 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
                </div>

                {/* Text Content */}
                <div className="w-full sm:w-1/2 text-left space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Book Callout at Bottom of Itinerary */}
      <div className="mt-16 text-center">
        <button
          onClick={onBookSeatClick}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-xl shadow-[#EA580C]/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Bus className="w-5 h-5" />
          <span>Book This Journey • ₹{TRIP_CONFIG.price}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

