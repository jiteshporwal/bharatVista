"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";

export default function TripPlanner() {
  const [destination, setDestination] = useState("Himalayas & Ladakh");
  const [travelMonth, setTravelMonth] = useState("October – November");
  const [travellers, setTravellers] = useState("2 Travellers (Couple)");
  const [budgetStyle, setBudgetStyle] = useState("Signature Luxury Stays");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id="trip-planner"
      className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-[#0A2E4C]/95 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl shadow-black/60 ring-1 ring-white/10"
      >
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Journey Concierge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Design Your Personalized India Odyssey
            </h2>
          </div>
          <span className="text-xs text-zinc-300 font-light hidden sm:block">
            Tailored 1-on-1 by regional India specialists
          </span>
        </div>

        {/* 4-Field Trip Customizer Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Field 1: Destination */}
          <div className="relative p-4 rounded-2xl bg-[#061727]/70 border border-white/10 hover:border-amber-400/40 transition-colors group">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1.5">
              <MapPin className="w-4 h-4 text-[#EA580C]" />
              <span>Where do you want to go?</span>
            </div>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-white font-semibold text-sm sm:text-base focus:outline-none cursor-pointer appearance-none"
            >
              <option value="Himalayas & Ladakh" className="bg-[#061727] text-white">
                Himalayas & Ladakh
              </option>
              <option value="Royal Rajasthan & Forts" className="bg-[#061727] text-white">
                Royal Rajasthan & Forts
              </option>
              <option value="Kerala Backwaters & Munnar" className="bg-[#061727] text-white">
                Kerala Backwaters & Hills
              </option>
              <option value="Khajuraho & Sacred Orchha" className="bg-[#061727] text-white">
                Khajuraho & Sacred Orchha
              </option>
              <option value="Varanasi & River Ganges" className="bg-[#061727] text-white">
                Varanasi & River Ganges
              </option>
              <option value="Mysuru & Malabar Coast" className="bg-[#061727] text-white">
                Mysuru & Malabar Coast
              </option>
              <option value="Pan-India Multi-Region" className="bg-[#061727] text-white">
                Pan-India Multi-Region
              </option>
            </select>
          </div>

          {/* Field 2: When are you travelling */}
          <div className="relative p-4 rounded-2xl bg-[#061727]/70 border border-white/10 hover:border-amber-400/40 transition-colors group">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1.5">
              <Calendar className="w-4 h-4 text-[#EA580C]" />
              <span>When are you travelling?</span>
            </div>
            <select
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
              className="w-full bg-transparent text-white font-semibold text-sm sm:text-base focus:outline-none cursor-pointer appearance-none"
            >
              <option value="October – November" className="bg-[#061727] text-white">
                October – November (Autumn)
              </option>
              <option value="December – January" className="bg-[#061727] text-white">
                December – January (Winter Royal)
              </option>
              <option value="February – March" className="bg-[#061727] text-white">
                February – March (Spring Festivals)
              </option>
              <option value="April – June" className="bg-[#061727] text-white">
                April – June (Himalayan Summer)
              </option>
              <option value="July – September" className="bg-[#061727] text-white">
                July – September (Monsoon Magic & Ladakh)
              </option>
            </select>
          </div>

          {/* Field 3: Travellers */}
          <div className="relative p-4 rounded-2xl bg-[#061727]/70 border border-white/10 hover:border-amber-400/40 transition-colors group">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1.5">
              <Users className="w-4 h-4 text-[#EA580C]" />
              <span>Travellers</span>
            </div>
            <select
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="w-full bg-transparent text-white font-semibold text-sm sm:text-base focus:outline-none cursor-pointer appearance-none"
            >
              <option value="Solo Voyager" className="bg-[#061727] text-white">
                Solo Voyager
              </option>
              <option value="2 Travellers (Couple)" className="bg-[#061727] text-white">
                2 Travellers (Couple)
              </option>
              <option value="Family with Children" className="bg-[#061727] text-white">
                Family with Children
              </option>
              <option value="Private Intimate Group (4-8)" className="bg-[#061727] text-white">
                Private Group (4–8)
              </option>
              <option value="Bespoke Guild (>8)" className="bg-[#061727] text-white">
                Private Guild (8+)
              </option>
            </select>
          </div>

          {/* Field 4: Budget / Travel Style */}
          <div className="relative p-4 rounded-2xl bg-[#061727]/70 border border-white/10 hover:border-amber-400/40 transition-colors group">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1.5">
              <Wallet className="w-4 h-4 text-[#EA580C]" />
              <span>Travel Style</span>
            </div>
            <select
              value={budgetStyle}
              onChange={(e) => setBudgetStyle(e.target.value)}
              className="w-full bg-transparent text-white font-semibold text-sm sm:text-base focus:outline-none cursor-pointer appearance-none"
            >
              <option value="Signature Luxury Stays" className="bg-[#061727] text-white">
                Signature Luxury Stays
              </option>
              <option value="Heritage Haveli & Boutique" className="bg-[#061727] text-white">
                Heritage Haveli & Boutique
              </option>
              <option value="Active Expedition & Glamping" className="bg-[#061727] text-white">
                Active Expedition & Glamping
              </option>
              <option value="Private Chauffeur & Curated" className="bg-[#061727] text-white">
                Private Chauffeur & Curated
              </option>
            </select>
          </div>

          {/* Submit Action Button */}
          <div className="sm:col-span-2 lg:col-span-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dedicated travel specialist response within 4 hours</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5 animate-spin-slow" />
              <span>Plan My Trip</span>
            </button>
          </div>
        </form>

        {/* Feedback Demo Modal */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-md w-full rounded-3xl bg-[#061727] border border-amber-400/30 p-8 shadow-2xl text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Journey Initiated
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Thank you for sharing your vision for{" "}
                    <strong className="text-amber-300">{destination}</strong>.
                    Our Indian journey specialist is preparing an authentic,
                    bespoke proposal for {travelMonth}.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-left text-zinc-300 space-y-1">
                  <p><strong>Route:</strong> {destination}</p>
                  <p><strong>Season:</strong> {travelMonth}</p>
                  <p><strong>Companions:</strong> {travellers}</p>
                  <p><strong>Style:</strong> {budgetStyle}</p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white shadow-lg cursor-pointer"
                >
                  Continue Exploring
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

