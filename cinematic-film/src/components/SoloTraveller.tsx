"use client";

import { motion } from "motion/react";
import { Users, Compass, Ticket, Heart, Smile, ArrowRight, Bus } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

interface SoloTravellerProps {
  onBookSeatClick?: () => void;
}

export default function SoloTraveller({ onBookSeatClick }: SoloTravellerProps) {
  const pillars = [
    {
      id: "meet-people",
      icon: Users,
      title: "Meet Real Friends",
      tagline: "Instant Camaraderie",
      description:
        "Hop on the BharatVista coach solo and return with lifelong travel buddies. Small groups naturally bring warm, like-minded travellers together.",
    },
    {
      id: "curated",
      icon: Compass,
      title: "Zero Route Hassle",
      tagline: "Pure Exploration",
      description:
        "Forget navigation, cab bargaining, and hunting for good food. Your morning poha, Jam Gate chai, and royal lunch are seamlessly curated.",
    },
    {
      id: "easy-booking",
      icon: Ticket,
      title: "Simple Seat Enquiry",
      tagline: `Just ₹${TRIP_CONFIG.price} to Start`,
      description:
        `Book a single seat with zero single-supplement penalties. Transparent per-person pricing of ₹${TRIP_CONFIG.price} makes weekend getaways effortless.`,
    },
    {
      id: "shared-memories",
      icon: Heart,
      title: "Sukoon & Stories",
      tagline: "Unforgettable Moments",
      description:
        "Watch the sunset reflect on the sacred Narmada ghats and share authentic Dal Bafla around laughter-filled tables.",
    },
    {
      id: "safe-travel",
      icon: Smile,
      title: "Safe & Welcoming",
      tagline: "Verified Travel Companions",
      description:
        "Clean luxury transport, dedicated trip coordination, and a respectful environment built for solo travellers and friend groups alike.",
    },
  ];

  return (
    <section id="solo-traveller" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
          <Users className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Solo Explorers Welcome</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
          TRAVELLING <span className="text-[#EA580C]">SOLO?</span>
        </h2>

        <p className="text-lg sm:text-2xl font-serif text-amber-200/90 font-medium italic">
          &ldquo;You don&apos;t have to travel alone.&rdquo;
        </p>

        <p className="text-xs sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
          BharatVista is built for curious souls who want to venture out without
          feeling isolated. Hop on our coach as a solo explorer, travel with fellow
          adventurers, and make friends over hot chai and shared river views.
        </p>
      </div>

      {/* 5 Solo Pillars Grid + 6th Action Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#0A2E4C]/40 border border-white/10 hover:border-amber-400/40 transition-all duration-300 space-y-4 group shadow-xl text-left"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#061727] border border-white/15 flex items-center justify-center text-[#EA580C] group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
                  {pillar.tagline}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          );
        })}

        {/* 6th Card: Direct Invitation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-gradient-to-br from-[#EA580C]/20 via-[#0A2E4C] to-[#061727] border border-amber-400/30 flex flex-col justify-between space-y-4 shadow-xl text-left"
        >
          <div className="space-y-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
              Join Next Weekend
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Your Seat is Waiting
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
              No need to convince an entire squad to coordinate dates. Just reserve your seat
              for ₹{TRIP_CONFIG.price} and show up in Indore at 06:45 AM!
            </p>
          </div>

          <button
            onClick={onBookSeatClick}
            className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 transition-all cursor-pointer min-h-[44px]"
          >
            <Bus className="w-4 h-4 shrink-0" />
            <span>Book Your Single Seat • ₹{TRIP_CONFIG.price}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
