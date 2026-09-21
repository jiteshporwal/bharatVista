"use client";

import { useState, useEffect } from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Bus,
  ArrowRight,
  ChevronDown,
  Coffee,
  Utensils,
  Sparkles,
} from "lucide-react";
import InteractiveMap from "./InteractiveMap";

interface CinematicHeroProps {
  onBookSeatClick?: () => void;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JAM GATE 4-PHOTO MEMORY SEQUENCE (CHANGES EVERY 0.50 SECONDS IN 1 VIEWPORT)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const JAM_GATE_PHOTOS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    alt: "Jam Gate Misty Mountain Valley",
    title: "Misty Mountain Pass",
    subtitle: "Vindhyachal range morning vista",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80",
    alt: "Hot Roadside Cutting Chai in Glass",
    title: "Steaming Cutting Chai",
    subtitle: "Fresh ginger & cardamom aroma",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
    alt: "Steaming Masala Maggie Bowl",
    title: "Fresh Hot Maggie",
    subtitle: "Highway tradition served hot",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
    alt: "Travellers at Jam Gate Viewpoint",
    title: "Valley Views & Memories",
    subtitle: "Travellers pausing along the route",
  },
];

export default function CinematicHero({ onBookSeatClick }: CinematicHeroProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  // Current time in seconds with 0.05s precision (50ms interval)
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const TOTAL_DURATION = 36; // Fast, punchy 36-second full journey
  const TOTAL_DURATION = 18.0; // Strict ~18-second cinematic travel film

  // Timeline driver
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => (prev + 1) % (TOTAL_DURATION + 1));
    }, 1000);
      setCurrentTime((prev) => {
        const nextTime = Math.round((prev + 0.05) * 100) / 100;
        // Pause at 18.2s so user can read the final offer & click Book Your Seat
        if (nextTime >= 18.2) {
          setIsPlaying(false);
          return 18.0;
        }
        return nextTime;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Stage mapping for InteractiveMap:
  // 0: India Overview (0-6s, with fast 2s welcome intro)
  // 1: MP Zoom (6-10s)
  // 2: Indore Departure (10-14s)
  // 3: Jam Gate with in-map Chai & Maggie (14-21s)
  // 4: Maheshwar with in-map Royal Dal Bafla (21-28s)
  // 5: Shastradhara Arrival (28-32s)
  // 6: Full Route Panorama & ₹700 Reveal (32s+)
  const getCurrentMapStage = () => {
    if (elapsedSeconds < 6) return 0;
    if (elapsedSeconds < 10) return 1;
    if (elapsedSeconds < 14) return 2;
    if (elapsedSeconds < 21) return 3;
    if (elapsedSeconds < 28) return 4;
    if (elapsedSeconds < 32) return 5;
    return 6;
  };

  const currentMapStage = getCurrentMapStage();

  const handleJumpTo = (seconds: number) => {
    setElapsedSeconds(seconds);
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  // Jam Gate photo index (0.50s per photo starting at 7.0s)
  const getJamGatePhotoIndex = () => {
    if (currentTime < 7.0) return 0;
    const elapsedAtJamGate = currentTime - 7.0;
    const idx = Math.floor(elapsedAtJamGate / 0.5);
    return Math.min(JAM_GATE_PHOTOS.length - 1, Math.max(0, idx % 4));
  };

  const jamGatePhotoIdx = getJamGatePhotoIndex();

  return (
    <section
      id="hero-journey"
      className="relative w-full h-screen min-h-[640px] max-h-[1100px] overflow-hidden bg-[#061727] select-none"
      className="relative w-screen h-screen min-h-[640px] max-h-[1100px] overflow-hidden bg-[#061727] select-none"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 1: FULL-SCREEN INTERACTIVE CINEMATIC MAP WORLD
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 1: FULL-SCREEN INTERACTIVE CINEMATIC MAP WORLD (100vw × 100vh)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 z-0">
        <InteractiveMap
          currentStage={currentMapStage}
          currentTime={currentTime}
          onBookSeatClick={onBookSeatClick}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 2: FAST 2-SECOND WELCOME OVERLAY (DISSOLVES AT 2s)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 2: FAST 2-SECOND WELCOME SCREEN (0.0s – 2.0s)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {elapsedSeconds < 2 && (
        {currentTime < 2.0 && (
          <motion.div
            key="fast-welcome-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#061727]/90 backdrop-blur-md text-center p-4"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#061727]/92 backdrop-blur-md text-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white p-1 shadow-2xl mx-auto ring-2 ring-amber-400">
                <Image
                  src="/logo.png"
                  alt="BharatVista Logo"
                  alt="BharatVista Official Logo"
                  fill
                  priority
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                  Welcome to <span className="text-[#EA580C]">BharatVista</span>
                </h1>
                <p className="text-xl sm:text-2xl font-serif text-amber-300 font-medium italic">
                  &ldquo;हर सफ़र, एक नई कहानी&rdquo;
                </p>
              </div>

              <p className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
              <p className="text-[11px] font-mono text-zinc-400 tracking-widest uppercase">
                ENTERING THE MAP WORLD...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 3: IN-MAP CHOREOGRAPHED CAPTION HEADLINES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-24 sm:pt-28 pb-8 pointer-events-none">
        {/* Top Status Bar */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 3: JAM GATE CINEMATIC EXPERIENCE (7.0s – 10.0s)
          ONE SINGLE IMAGE VIEWPORT CYCLING 4 PHOTOS AT 0.50s EACH
          LEFT: Visual memory | RIGHT: Elegant travel copy
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 7.0 && currentTime < 10.0 && (
          <motion.div
            key="jam-gate-experience"
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-x-4 sm:inset-x-8 bottom-16 sm:bottom-20 z-30 max-w-4xl mx-auto rounded-3xl bg-[#061727]/90 backdrop-blur-xl border border-amber-400/40 p-4 sm:p-6 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* LEFT: ONE SINGLE CINEMATIC IMAGE VIEWPORT */}
              <div className="relative w-full md:w-80 h-52 sm:h-60 rounded-2xl overflow-hidden shadow-2xl border border-amber-400/30 bg-black/50 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`jam-photo-${jamGatePhotoIdx}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={JAM_GATE_PHOTOS[jamGatePhotoIdx].src}
                      alt={JAM_GATE_PHOTOS[jamGatePhotoIdx].alt}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25" />

                    {/* Frame Tag */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-[9px] font-mono font-bold text-amber-300">
                      MEMORY 0{jamGatePhotoIdx + 1} / 04 • 0.50s
                    </div>

                    {/* Image Caption */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-left">
                      <p className="text-white text-xs font-serif font-bold">
                        {JAM_GATE_PHOTOS[jamGatePhotoIdx].title}
                      </p>
                      <p className="text-[10px] text-amber-200/90 font-sans">
                        {JAM_GATE_PHOTOS[jamGatePhotoIdx].subtitle}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT: ELEGANT SENSORY TRAVEL COPY */}
              <div className="flex-1 flex flex-col justify-center space-y-2.5 text-left">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-400">
                    A LITTLE BREAK ALONG THE WAY
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[10px] font-mono text-zinc-300">STOP 02</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  JAM GATE
                </h2>

                <h3 className="text-base sm:text-lg font-serif font-medium text-amber-300">
                  THE FIRST PAUSE
                </h3>

                <p className="text-sm sm:text-base text-zinc-200 font-serif italic leading-relaxed">
                  &ldquo;Hot chai, fresh Maggie and the misty views of Jam Gate.&rdquo;
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-amber-200/90">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-amber-400" />
                    <span>Adrak Chai</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" />
                    <span>Masala Maggie</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                    Misty Valley Views
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 4: MAHESHWAR ARRIVAL — FULL-SCREEN BACKGROUND IMAGE (12.5s – 15.5s)
          BACKGROUND: Ahilya Fort / Narmada Ghats fills 100vw × 100vh
          FOREGROUND: Dal Bafla Thali + Minimal Royal Malwa Copy
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 12.5 && currentTime < 15.5 && (
          <motion.div
            key="maheshwar-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
          >
            {/* Full-Screen Maheshwar Background Atmosphere */}
            <Image
              src="https://images.unsplash.com/photo-1600100397608-f010f443a533?auto=format&fit=crop&w=1920&q=85"
              alt="Maheshwar Fort and Narmada Ghats"
              fill
              priority
              sizes="100vw"
              className="object-cover brightness-60 scale-105 transition-transform duration-[3000ms] ease-out"
            />
            {/* Controlled Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-[#061727]/50 to-[#061727]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061727]/80 via-transparent to-[#061727]/80" />

            {/* Foreground: Dal Bafla Thali + Campaign Typography */}
            <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Thali Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-orange-400/40 bg-black/40"
              >
                <Image
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80"
                  alt="Traditional Dal Bafla Thali"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 block">
                    ROYAL MALWA FEAST
                  </span>
                  <p className="text-sm font-serif font-bold text-amber-100">
                    Dal Bafla • Kadhi • Steamed Rice • Churma Ladoo
                  </p>
                </div>
              </motion.div>

              {/* Minimal Travel Campaign Copy */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="space-y-3 text-left"
              >
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#EA580C]">
                    A TASTE OF MADHYA PRADESH
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  <span className="text-[10px] font-mono text-zinc-300">STOP 03</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                  MAHESHWAR
                </h2>

                <p className="text-lg sm:text-2xl text-amber-100 font-serif italic leading-relaxed">
                  &ldquo;Traditional flavours, shared along the journey.&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-md leading-relaxed">
                  Hot baflas freshly dipped in pure ghee, slow-cooked dal, spiced kadhi, and sweet churma ladoo served on the historic stone ghats of Ahilya Fort.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-amber-300/90">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40">
                    Pure Ghee Bafla
                  </span>
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40">
                    Malwa Kadhi
                  </span>
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40">
                    Ahilya Fort Ghats
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 5: FULL ROUTE REVEAL & ₹700 OFFER & BOOKING CTA (17.0s+)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 17.0 && (
          <motion.div
            key="route-reveal-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-x-4 bottom-14 sm:bottom-16 z-30 max-w-3xl mx-auto rounded-3xl bg-[#0A2E4C]/95 backdrop-blur-xl border border-amber-400/40 p-6 sm:p-8 shadow-2xl text-center"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-400 block">
                ONE DAY • FOUR EXPERIENCES
              </span>

              <h2 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight">
                Indore → Jam Gate → Maheshwar → Shastradhara
              </h2>

              {/* Pricing */}
              <div className="py-2">
                <div className="inline-block text-3xl sm:text-5xl font-serif font-black text-white">
                  ₹700 <span className="text-sm sm:text-base font-normal text-amber-300">/ PERSON</span>
                </div>
                <p className="text-xs text-zinc-300 mt-1">
                  Includes luxury coach seat, breakfast at Jam Gate & traditional Dal Bafla lunch at Maheshwar
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onBookSeatClick}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Bus className="w-5 h-5" />
                  <span>BOOK YOUR SEAT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleJumpTo(0)}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Journey</span>
                </button>
              </div>

              <p className="text-[11px] text-amber-200/80 font-serif italic pt-1">
                Pick your seat. Pack your bags. Let the journey begin.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 6: TIMELINE SCRUBBER & CHAPTER JUMPS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-24 sm:pt-28 pb-4 pointer-events-none">
        {/* Top Floating Status Indicator */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061727]/85 backdrop-blur-md border border-white/15 text-xs font-mono text-amber-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">ROUTE:</span>
            <span>
              {currentMapStage === 0
                ? "Subcontinent Overview"
                : currentMapStage === 1
                ? "Madhya Pradesh"
                : currentMapStage === 2
              {currentTime < 2.0
                ? "Welcome"
                : currentTime < 5.0
                ? "Subcontinent & MP"
                : currentTime < 7.0
                ? "Indore (07:00 AM Departure)"
                : currentMapStage === 3
                : currentTime < 10.0
                ? "Jam Gate • Chai + Maggie Break"
                : currentMapStage === 4
                ? "Maheshwar • Traditional MP Lunch"
                : currentMapStage === 5
                : currentTime < 12.5
                ? "Road to Maheshwar"
                : currentTime < 15.5
                ? "Maheshwar • Royal Malwa Feast"
                : currentTime < 17.0
                ? "Shastradhara • The Rapids"
                : "Indore → Jam Gate → Maheshwar → Shastradhara"}
            </span>
          </div>

          {/* Quick Playback Controls */}
          {/* Quick Play/Pause & Replay */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={() => handleJumpTo(0)}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
              aria-label="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Narrative Overlays (Floating subtly so map remains hero) */}
        <div className="my-auto max-w-2xl text-center mx-auto px-2 pointer-events-auto">
          {/* 2–6s: India Map Overview */}
          {elapsedSeconds >= 2 && elapsedSeconds < 6 && (
            <motion.div
              key="overlay-india"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-2 p-4 rounded-2xl bg-[#061727]/75 backdrop-blur-md border border-white/15 inline-block shadow-2xl"
        {/* Bottom Timeline Controls */}
        <div className="pointer-events-auto w-full max-w-3xl mx-auto space-y-2 pb-1">
          {/* Scrubber Track */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-zinc-400 w-9 text-right">
              {currentTime.toFixed(1)}s
            </span>
            <div
              className="relative flex-1 h-1.5 bg-white/20 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all duration-150"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = Math.max(0, Math.min(1, clickX / rect.width));
                handleJumpTo(Math.round(pct * TOTAL_DURATION * 10) / 10);
              }}
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-400 block">
                The Subcontinent
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                One Country. A Billion Stories.
              </h2>
            </motion.div>
          )}

          {/* 6–10s: MP Zoom */}
          {elapsedSeconds >= 6 && elapsedSeconds < 10 && (
            <motion.div
              key="overlay-mp"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-1.5 p-4 rounded-2xl bg-[#061727]/75 backdrop-blur-md border border-white/15 inline-block shadow-2xl"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#EA580C] block">
                Central India
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Madhya Pradesh: The Heart
              </h2>
            </motion.div>
          )}

          {/* 10–14s: Indore Departure */}
          {elapsedSeconds >= 10 && elapsedSeconds < 14 && (
            <motion.div
              key="overlay-indore"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-1.5 p-4 rounded-2xl bg-[#061727]/75 backdrop-blur-md border border-white/15 inline-block shadow-2xl"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-400 block">
                07:00 AM • Stop 01
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Indore: The Journey Begins
              </h2>
            </motion.div>
          )}

          {/* 14–21s: Jam Gate Notice */}
          {elapsedSeconds >= 14 && elapsedSeconds < 21 && (
            <motion.div
              key="overlay-jam"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-1 p-3 px-5 rounded-2xl bg-[#061727]/80 backdrop-blur-md border border-amber-400/30 inline-block shadow-2xl"
            >
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">
                Jam Gate: Mountain Nashta
              </h3>
              <p className="text-xs sm:text-sm text-amber-200 font-serif italic">
                &ldquo;Chai. Maggie. Views.&rdquo;
              </p>
            </motion.div>
          )}

          {/* 21–28s: Maheshwar Notice */}
          {elapsedSeconds >= 21 && elapsedSeconds < 28 && (
            <motion.div
              key="overlay-maheshwar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-1 p-3 px-5 rounded-2xl bg-[#061727]/80 backdrop-blur-md border border-orange-400/30 inline-block shadow-2xl"
            >
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">
                Maheshwar: Traditional Royal Lunch
              </h3>
              <p className="text-xs sm:text-sm text-amber-200 font-serif italic">
                &ldquo;Dal Bafla. Kadhi. Ladoo. Tradition served with every journey.&rdquo;
              </p>
            </motion.div>
          )}

          {/* 28–32s: Shastradhara Notice */}
          {elapsedSeconds >= 28 && elapsedSeconds < 32 && (
            <motion.div
              key="overlay-shastra"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-1 p-3 px-5 rounded-2xl bg-[#061727]/80 backdrop-blur-md border border-emerald-400/30 inline-block shadow-2xl"
            >
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">
                Shastradhara: The Thousand Streams
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300 font-light">
                The journey is yours.
              </p>
            </motion.div>
          )}

          {/* 32s+: Climax Full Route Reveal */}
          {elapsedSeconds >= 32 && (
            <motion.div
              key="overlay-climax"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 p-6 sm:p-8 rounded-3xl bg-[#061727]/90 backdrop-blur-xl border border-amber-400/40 shadow-2xl inline-block"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
                <span>The Complete 1-Day Road Trip</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
                  ONE DAY. FOUR EXPERIENCES.
                </h2>
                <p className="text-xs sm:text-sm font-mono text-amber-200">
                  Indore → Jam Gate → Maheshwar → Shastradhara
                </p>
              </div>

              <div className="text-4xl sm:text-6xl font-serif font-black text-white">
                ₹700 <span className="text-xl sm:text-2xl font-light text-amber-300">/ PERSON</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onBookSeatClick}
                  className="px-8 py-3.5 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-xl shadow-[#EA580C]/40 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
                >
                  <Bus className="w-5 h-5" />
                  <span>Book Your Seat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Timeline Progress Bar & Quick Chapter Scrubbers */}
        <div className="pt-3 border-t border-white/10 pointer-events-auto space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Scrubber Time */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-300 font-semibold">
                00:{elapsedSeconds < 10 ? "0" + elapsedSeconds : elapsedSeconds}
              </span>
              <div className="relative w-36 sm:w-56 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#EA580C] to-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${(elapsedSeconds / TOTAL_DURATION) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-400">00:{TOTAL_DURATION}</span>
              <div
                className="h-full bg-gradient-to-r from-[#EA580C] via-amber-400 to-emerald-400 transition-all duration-75"
                style={{ width: `${Math.min(100, (currentTime / TOTAL_DURATION) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 w-9">
              {TOTAL_DURATION.toFixed(0)}s
            </span>
          </div>

            {/* Chapter Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              {[
                { label: "01 India", sec: 2 },
                { label: "02 MP Zoom", sec: 6 },
                { label: "03 Indore", sec: 10 },
                { label: "04 Jam Gate", sec: 14 },
                { label: "05 Maheshwar", sec: 21 },
                { label: "06 Shastradhara", sec: 28 },
                { label: "07 ₹700 Book", sec: 32 },
              ].map((item, idx) => (
          {/* 7 Chapter Jump Pills */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            {[
              { label: "Intro", time: 0 },
              { label: "Map Zoom", time: 2.0 },
              { label: "Bus Departs", time: 5.0 },
              { label: "Jam Gate", time: 7.0 },
              { label: "Maheshwar", time: 12.5 },
              { label: "Shastradhara", time: 15.5 },
              { label: "₹700 Book", time: 17.0 },
            ].map((ch) => {
              const isActive =
                currentTime >= ch.time &&
                (ch.time === 17.0 ||
                  currentTime <
                    (ch.time === 0
                      ? 2.0
                      : ch.time === 2.0
                      ? 5.0
                      : ch.time === 5.0
                      ? 7.0
                      : ch.time === 7.0
                      ? 12.5
                      : ch.time === 12.5
                      ? 15.5
                      : 17.0));
              return (
                <button
                  key={idx}
                  onClick={() => handleJumpTo(item.sec)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    elapsedSeconds >= item.sec &&
                    (idx === 6 || elapsedSeconds < [6, 10, 14, 21, 28, 32, 37][idx])
                      ? "bg-[#EA580C] text-white font-semibold shadow-md"
                      : "bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white"
                  key={ch.label}
                  onClick={() => handleJumpTo(ch.time)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/40"
                      : "bg-black/50 text-zinc-300 hover:text-white hover:bg-black/70 border border-white/10"
                  }`}
                >
                  {item.label}
                  {ch.label}
                </button>
              ))}
            </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center">
            <a
              href="#masti-dhamal"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore More Stories</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
