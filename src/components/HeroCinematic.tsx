"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Compass,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MapPin,
} from "lucide-react";
import { HERO_SCENES } from "@/data/mockData";

interface HeroCinematicProps {
  onPlanTripClick?: () => void;
}

export default function HeroCinematic({ onPlanTripClick }: HeroCinematicProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const TOTAL_DURATION = 30; // 30-second complete travel film sequence

  // 30-Second Travel Film Choreography Timeline
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = (prev + 1) % (TOTAL_DURATION + 1);

        // Map elapsed seconds to corresponding scenes:
        // 0-3s: Dawn Flight (Scene 0 - Himalayas dawn)
        // 3-8s: Brand Invocation (Scene 0 - Himalayas dawn)
        // 8-15s: Traveling INTO Destination (Scene 0 -> Scene 1)
        // 15-22s: Continuous India traversal (Scene 1 Rajasthan -> Scene 2 Khajuraho -> Scene 3 Ladakh -> Scene 4 Mysuru)
        // 22-30s: Grand Climax (Scene 5 Kerala / Panoramic Horizon)
        if (next >= 0 && next < 8) {
          setCurrentSceneIndex(0);
        } else if (next >= 8 && next < 14) {
          setCurrentSceneIndex(1); // Rajasthan Thar
        } else if (next >= 14 && next < 18) {
          setCurrentSceneIndex(2); // Khajuraho Heritage
        } else if (next >= 18 && next < 22) {
          setCurrentSceneIndex(3); // Ladakh Horizons
        } else if (next >= 22 && next < 26) {
          setCurrentSceneIndex(4); // Mysuru Palaces
        } else {
          setCurrentSceneIndex(5); // Kerala Waters Climax
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentScene = HERO_SCENES[currentSceneIndex];

  // Manual jump to specific scene
  const handleSceneJump = (index: number) => {
    setCurrentSceneIndex(index);
    // Align timeline seconds
    const sceneTimes = [0, 8, 14, 18, 22, 26];
    setElapsedSeconds(sceneTimes[index]);
  };

  const formatTime = (secs: number) => {
    const s = secs % 60;
    return `00:${s < 10 ? "0" + s : s}`;
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1100px] overflow-hidden bg-[#061727] select-none">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 1: CINEMATIC VISUAL ENGINE (VIDEO OR MOTION CANVAS)
          Supports real MP4/WebM video asset if available,
          or runs the choreographed multi-depth Motion camera engine.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 z-0">
        {/* Real Video Fallback Element (if user drops video in /public/videos/hero.mp4) */}
        {!videoError && (
          <video
            ref={videoRef}
            muted={isAudioMuted}
            autoPlay
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="hidden absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-desktop.mp4" type="video/mp4" />
            <source src="/videos/hero-desktop.webm" type="video/webm" />
          </video>
        )}

        {/* MOTION-POWERED SIMULATED CINEMATIC FILM CANVAS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 1.8,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Camera Motion Transform Layer (Slow Ken Burns Scale & Subtle Pan) */}
            <motion.div
              initial={
                prefersReducedMotion
                  ? {}
                  : { scale: 1.0, x: "0%", y: "0%" }
              }
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1.0, 1.14],
                      x: ["0%", "-1.5%"],
                      y: ["0%", "-1.0%"],
                    }
              }
              transition={{
                duration: 9,
                ease: "linear",
              }}
              className="relative w-full h-full"
            >
              <Image
                src={currentScene.imageUrl}
                alt={currentScene.title}
                fill
                priority
                className="object-cover object-center brightness-[0.82] contrast-[1.08]"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ATMOSPHERIC CINEMATIC OVERLAYS */}
        {/* 1. Deep Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-[#061727]/35 to-[#061727]/75 pointer-events-none" />
        
        {/* 2. Horizontal edge-depth scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061727]/60 via-transparent to-[#061727]/60 pointer-events-none" />

        {/* 3. Subtle ambient light leak */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-amber-500/10 via-orange-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 2: SECOND-BY-SECOND CHOREOGRAPHED NARRATIVE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-28 pb-12">
        {/* TOP STATUS: Active Destination Coordinates & Chapter */}
        <div className="flex items-center justify-between">
          <motion.div
            key={currentScene.id + "-coord"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#061727]/60 border border-white/15 backdrop-blur-md text-xs font-mono text-amber-200/90 shadow-lg"
          >
            <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="font-semibold text-white uppercase tracking-wider">
              {currentScene.location}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-amber-300/80">{currentScene.coordinates}</span>
          </motion.div>

          {/* Audio & Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              aria-label={isAudioMuted ? "Unmute atmospheric sound" : "Mute audio"}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer"
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause cinematic film" : "Play cinematic film"}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 text-amber-400" />
              )}
            </button>
          </div>
        </div>

        {/* CENTER CHOREOGRAPHED NARRATIVE (Changes dynamically by second) */}
        <div className="my-auto max-w-4xl text-center mx-auto px-2">
          {/* 0–3s & 3–8s: Brand Invocation */}
          {elapsedSeconds < 8 && (
            <motion.div
              key="brand-invocation"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-medium text-amber-300">
                <Sparkles className="w-4 h-4 text-[#EA580C]" />
                <span>Welcome to BharatVista</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-2xl">
                हर सफ़र, एक नई कहानी
              </h1>

              <p className="text-lg sm:text-2xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
                Enter the soul of India. Where sacred peaks touch eternal skies
                and every threshold carries a thousand years of wonder.
              </p>
            </motion.div>
          )}

          {/* 8–15s: Entering First Destination (Himalayas) */}
          {elapsedSeconds >= 8 && elapsedSeconds < 15 && (
            <motion.div
              key="himalayan-entry"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
              className="space-y-4"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold text-amber-400 drop-shadow">
                Chapter 01 • The Northern Horizon
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight drop-shadow-2xl">
                The Himalayan Crown
              </h2>
              <p className="text-lg sm:text-xl text-zinc-200 font-light max-w-2xl mx-auto leading-relaxed">
                Traveling into the silent sanctuary of snow ridges, high prayer
                passes, and ancient Buddhist chant in Ladakh.
              </p>
            </motion.div>
          )}

          {/* 15–22s: Continuous Journey Traversal */}
          {elapsedSeconds >= 15 && elapsedSeconds < 22 && (
            <motion.div
              key="continuous-traversal"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.0 }}
              className="space-y-4"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold text-orange-400 drop-shadow">
                Unbroken Traversal • One Subcontinent
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight drop-shadow-2xl">
                {currentScene.title}
              </h2>
              <p className="text-base sm:text-xl text-amber-100/90 font-light italic max-w-xl mx-auto">
                &ldquo;{currentScene.tagline}&rdquo;
              </p>
            </motion.div>
          )}

          {/* 22–30s: Grand Climax & Main Proposition */}
          {elapsedSeconds >= 22 && (
            <motion.div
              key="grand-climax"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md text-xs sm:text-sm font-medium text-amber-300">
                <span>The BharatVista Promise</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl">
                Discover India, <span className="text-[#EA580C]">Your Way</span>
              </h1>

              <p className="text-base sm:text-xl text-zinc-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
                Bespoke itineraries, private palace stays, on-ground curators,
                and seamless luxury across every corner of India.
              </p>

              {/* DUAL HIGH-CONTRAST ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={onPlanTripClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[#EA580C] via-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] shadow-2xl shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Compass className="w-5 h-5 animate-spin-slow" />
                  <span>Plan My Trip</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#journeys"
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <span>Explore Tours</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>

        {/* BOTTOM: 30-SECOND FILM SCRUBBER & DESTINATION JUMP BAR */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Film Progress Tracker */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-300 font-semibold">
                {formatTime(elapsedSeconds)}
              </span>
              <div className="relative w-36 sm:w-56 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#EA580C] to-amber-400 rounded-full"
                  style={{
                    width: `${(elapsedSeconds / TOTAL_DURATION) * 100}%`,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                00:{TOTAL_DURATION}
              </span>
            </div>

            {/* Destination Chapter Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {HERO_SCENES.map((scene, index) => (
                <button
                  key={scene.id}
                  onClick={() => handleSceneJump(index)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    currentSceneIndex === index
                      ? "bg-[#EA580C] text-white shadow-md shadow-[#EA580C]/40"
                      : "bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  0{index + 1} {scene.id.charAt(0).toUpperCase() + scene.id.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Ambient Scroll Down Indicator */}
          <div className="flex items-center justify-center pt-1">
            <a
              href="#trip-planner"
              className="group inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-amber-300 transition-colors"
            >
              <span>Begin Exploration</span>
              <ChevronDown className="w-4 h-4 text-amber-400 group-hover:translate-y-1 transition-transform animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

