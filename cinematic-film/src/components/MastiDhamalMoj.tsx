"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, Music, Coffee, Compass, Smile } from "lucide-react";

export default function MastiDhamalMoj() {
  const moments = [
    {
      id: "chai-stops",
      title: "The Roadside Chai Stop",
      tag: "Kulhad & Laughter",
      description:
        "Steaming adrak tea in earthen glasses, mountain breezes, and instant conversations with fellow passengers.",
      imageUrl:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bus-anthems",
      title: "Window Breezes & Anthems",
      tag: "Road Trip Playlists",
      description:
        "Classic Indian road trip tunes echoing through the coach as the hills of Vindhyachal unfold outside your window.",
      imageUrl:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "feast-together",
      title: "Feasting Like Royals",
      tag: "Authentic MP Thali",
      description:
        "Crushing hot baflas, pouring hot yellow dal and desi ghee, and sharing sweet churma ladoos at long banquet tables.",
      imageUrl:
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ghat-sunsets",
      title: "Silent Ghat Sunsets",
      tag: "Narmada Reflections",
      description:
        "Sitting on ancient stone steps at Maheshwar watching dusk turn the sacred river waters into liquid gold.",
      imageUrl:
        "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="masti-dhamal" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
          <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>The BharatVista Soul</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
          MASTI • DHAMAL • <span className="text-[#EA580C]">MOJ</span>
        </h2>

        <p className="text-lg sm:text-xl text-amber-200/90 font-serif italic max-w-2xl mx-auto">
          &ldquo;Travel isn&apos;t just about the destination. It&apos;s about everything that happens along the way.&rdquo;
        </p>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed pt-1">
          Travel with friends. Discover India. Eat well. Explore deeply. Make memories
          that stay etched long after the bags are unpacked.
        </p>
      </div>

      {/* 4 Story Moments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moments.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative rounded-3xl overflow-hidden bg-[#0A2E4C]/40 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-amber-300">
                  {item.tag}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

