"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { TRAVEL_CATEGORIES } from "@/data/mockData";

export default function ExploreIndia() {
  const [activeCategory, setActiveCategory] = useState(TRAVEL_CATEGORIES[0]);

  return (
    <section id="explore" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>The Six Dimensions of Discovery</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Explore <span className="text-[#EA580C]">India</span> By Soul
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            India is not one country — it is an entire continent of sacred geography,
            royal lineages, wild habitats, and living art forms.
          </p>
        </div>

        <span className="text-xs uppercase tracking-widest text-zinc-400 hidden md:block">
          Select an aspect to immerse
        </span>
      </div>

      {/* Editorial Asymmetric Panels Layout (NOT a generic 6-card grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Large Flagship Interactive Panel (Left Column, 7 cols) */}
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 relative min-h-[480px] lg:min-h-[620px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10"
        >
          <Image
            src={activeCategory.imageUrl}
            alt={activeCategory.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 brightness-90 contrast-[1.05]"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-[#061727]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061727]/60 via-transparent to-transparent" />

          {/* Floating Details */}
          <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10">
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-amber-300">
                {activeCategory.tag}
              </span>
              <span className="text-xs font-mono text-zinc-300 bg-white/10 px-3 py-1 rounded-full">
                {activeCategory.count}
              </span>
            </div>

            <div className="space-y-4 max-w-xl">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                {activeCategory.title}
              </h3>
              <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed drop-shadow">
                {activeCategory.subtitle}
              </p>

              <div className="pt-2">
                <a
                  href="#destinations"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:shadow-lg hover:shadow-[#EA580C]/40 transition-all cursor-pointer"
                >
                  <span>Explore {activeCategory.tag} Destinations</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Selector Strips (Right Column, 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          {TRAVEL_CATEGORIES.map((cat, idx) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setActiveCategory(cat)}
                className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
                  isSelected
                    ? "bg-[#0A2E4C] border-[#EA580C] shadow-lg shadow-[#0A2E4C]/50"
                    : "bg-[#061727]/80 hover:bg-[#0A2E4C]/50 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-mono font-bold ${
                        isSelected ? "text-[#EA580C]" : "text-zinc-500"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <h4
                        className={`text-base sm:text-lg font-serif font-bold transition-colors ${
                          isSelected
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {cat.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light line-clamp-1">
                        {cat.tag}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#EA580C] text-white shadow-md shadow-[#EA580C]/40"
                        : "bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

