"use client";

import { motion } from "motion/react";
import { Sparkles, Compass, Users, PhoneCall, Plane } from "lucide-react";
import { JOURNEY_STEPS } from "@/data/mockData";

export default function HowItBegins() {
  const stepIcons = [Compass, Sparkles, PhoneCall, Plane];

  return (
    <section id="how-it-works" className="relative py-28 bg-[#040f1a] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Our Hospitality Blueprint
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            How Your Journey <span className="text-[#EA580C]">Begins</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            From your very first idea to your return home, every step is
            seamless, personal, and accompanied by seasoned Indian travel curators.
          </p>
        </div>

        {/* 4-Step Progressive Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {JOURNEY_STEPS.map((item, idx) => {
            const Icon = stepIcons[idx];
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative rounded-3xl p-8 bg-[#061727]/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                {/* Step Marker & Icon */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-serif font-black text-amber-400/25 group-hover:text-[#EA580C]/40 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#0A2E4C] border border-white/15 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-[#EA580C] group-hover:text-white transition-all shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block">
                      {item.tagline}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span>PHASE 0{idx + 1}</span>
                  <span>•</span>
                  <span className="text-emerald-400">DEDICATED SERVICE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

