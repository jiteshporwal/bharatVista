"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Clock, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { EXPERIENCES } from "@/data/mockData";

export default function Experiences() {
  return (
    <section id="experiences" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Beyond the Guidebook</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Unforgettable <span className="text-[#EA580C]">Moments</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            Private access, authentic cultural encounters, and moments carved
            specifically around your curiosity.
          </p>
        </div>
      </div>

      {/* Grid of 4 Curated Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative rounded-3xl overflow-hidden bg-[#0A2E4C]/30 border border-white/10 hover:border-amber-400/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
          >
            {/* Image Header with Tag & Duration */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src={exp.imageUrl}
                alt={exp.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
                  {exp.tag}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061727]/80 backdrop-blur-md text-xs font-mono text-zinc-300 border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>{exp.duration}</span>
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{exp.location}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href="#trip-planner"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#EA580C] group-hover:text-amber-300 transition-colors"
                >
                  <span>Inquire This Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

