"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import { EDITORIAL_STORIES } from "@/data/mockData";

export default function StorySection() {
  const leadStory = EDITORIAL_STORIES[0];
  const sideStories = EDITORIAL_STORIES.slice(1);

  return (
    <section id="stories" className="relative py-28 bg-[#040d16] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <BookOpen className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>The BharatVista Chronicles</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Every Place Has A <span className="text-[#EA580C]">Story</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            Travel is more than seeing landmarks; it is learning to listen to the
            whispers of stones, songs of boatmen, and silence of mountain peaks.
          </p>
        </div>

        {/* Editorial Magazine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Feature Story (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden bg-[#0A2E4C]/40 border border-white/10 shadow-2xl flex flex-col justify-between group"
          >
            <div className="relative h-80 sm:h-96 w-full overflow-hidden">
              <Image
                src={leadStory.imageUrl}
                alt={leadStory.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-transparent" />
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
                <span>Featured Chronicle • {leadStory.location}</span>
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-4">
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span>By {leadStory.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{leadStory.readTime}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                {leadStory.title}
              </h3>

              <p className="text-base text-zinc-300 font-light leading-relaxed">
                {leadStory.excerpt}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#EA580C] group-hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Editorial Stories (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {sideStories.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-3xl overflow-hidden bg-[#0A2E4C]/30 border border-white/10 hover:border-amber-400/30 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-amber-400">
                    <span className="font-semibold uppercase tracking-wider">
                      {story.location}
                    </span>
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{story.readTime}</span>
                    </span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                    {story.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 group-hover:text-[#EA580C] transition-colors flex items-center gap-1 cursor-pointer">
                    <span>Explore Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

