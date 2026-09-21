"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Utensils, Sparkles, X, ChevronRight } from "lucide-react";

interface FoodMomentProps {
  type: "jam-gate" | "maheshwar" | null;
  onClose: () => void;
  onResume: () => void;
}

export default function FoodMomentModal({ type, onClose, onResume }: FoodMomentProps) {
  if (!type) return null;

  const isJamGate = type === "jam-gate";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.92, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl w-full rounded-3xl overflow-hidden bg-[#0A2E4C]/95 border border-amber-400/30 shadow-2xl shadow-black/80 flex flex-col md:flex-row items-stretch"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white border border-white/20 transition-colors"
            aria-label="Close food showcase"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Food Visual Canvas (50%) */}
          <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden">
            <Image
              src={
                isJamGate
                  ? "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80"
                  : "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80"
              }
              alt={isJamGate ? "Jam Gate Maggie & Chai" : "Maheshwar Dal Bafla Thali"}
              fill
              priority
              className="object-cover brightness-95 contrast-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E4C] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0A2E4C]" />

            {/* Badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>{isJamGate ? "NASHTA STOP" : "ROYAL MP LUNCH"}</span>
            </div>
          </div>

          {/* Right: Culinary Storytelling (50%) */}
          <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
                  {isJamGate ? (
                    <>
                      <Coffee className="w-3.5 h-3.5 text-[#EA580C]" />
                      <span>Jam Gate Mountain Pass</span>
                    </>
                  ) : (
                    <>
                      <Utensils className="w-3.5 h-3.5 text-[#EA580C]" />
                      <span>Maheshwar • Ahilya Fort</span>
                    </>
                  )}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {isJamGate ? "Chai + Steaming Maggie" : "Traditional Dal Bafla"}
                </h3>
              </div>

              {/* Tagline quotes */}
              <p className="text-base text-amber-200/90 font-serif italic">
                {isJamGate
                  ? "“A little break. A lot of memories. Chai. Maggie. Mountains.”"
                  : "“A taste of Madhya Pradesh. Tradition served with every journey.”"}
              </p>

              {/* Menu Items Showcase */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                  Included In Your ₹700 Seat:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {isJamGate ? (
                    <>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200">
                        🍜 Hot Masala Maggie
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200">
                        ☕ Adrak Cutting Chai
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200 col-span-2">
                        🏔️ Vindhyachal Valley Viewpoint
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200">
                        🫓 Ghee-Dipped Dal Bafla
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200">
                        🥣 Traditional Kadhi
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200">
                        🍚 Steamed Basmati Rice
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200">
                        🟡 Golden Churma Ladoo
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Resume Journey Action */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={onResume}
                className="w-full py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue Road Journey</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

