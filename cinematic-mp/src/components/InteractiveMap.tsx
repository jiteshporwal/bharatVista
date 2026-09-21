"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Utensils, Sparkles, MapPin, Bus } from "lucide-react";
import { motion } from "motion/react";

interface InteractiveMapProps {
  currentStage: number; // 0 to 6
  currentTime: number; // Float in seconds: 0.0 to 18.0+
  onBookSeatClick?: () => void;
}

export default function InteractiveMap({ currentStage, onBookSeatClick }: InteractiveMapProps) {
  // Stages:
  // 0: India Overview (BharatVista Brand Map)
  // 1: Madhya Pradesh Zoom
  // 2: Indore Departure & Bus
  // 3: Jam Gate (In-Map Chai + Maggie Vignette)
  // 4: Maheshwar (In-Map Royal Dal Bafla Feast Vignette)
  // 5: Shastradhara Rapids Arrival
  // 6: Full Route Panorama & ₹700 / Person Reveal
export default function InteractiveMap({ currentTime, onBookSeatClick }: InteractiveMapProps) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 18-SECOND TIMELINE COORDINATES & CAMERA FLYING INTERPOLATION
  // 0.0 - 2.0s:  Welcome (Full India overview)
  // 2.0 - 3.5s:  Full India Map
  // 3.5 - 4.4s:  Zoom Central India / Madhya Pradesh
  // 4.4 - 5.0s:  Zoom Indore Departure
  // 5.0 - 7.0s:  Bus leaves Indore → Jam Gate (Camera flies with bus!)
  // 7.0 - 10.0s: Jam Gate Pause (Camera frames Jam Gate with road context)
  // 10.0 - 12.5s: Bus departs Jam Gate → Maheshwar (Camera tracks bus!)
  // 12.5 - 15.5s: Maheshwar Arrival (Full-screen background mode in parent)
  // 15.5 - 17.0s: Bus glides Maheshwar → Shastradhara
  // 17.0s+:      Full Route Panorama Zoom-Out (frames all stops + ₹700 reveal)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Camera viewBox mapping for smooth zoom/pan through the map world
  // Compute Bus position and rotation along the road
  const getBusState = () => {
    // Before 4.4s, bus is not yet introduced
    if (currentTime < 4.4) {
      return { x: 480, y: 440, rotation: 175, opacity: 0, visible: false };
    }
    // 4.4 - 5.0s: Bus appears at Indore
    if (currentTime < 5.0) {
      return { x: 480, y: 440, rotation: 175, opacity: 1, visible: true };
    }
    // 5.0 - 7.0s: Bus moves from Indore (480, 440) to Jam Gate (472, 492)
    if (currentTime < 7.0) {
      const p = Math.min(1, Math.max(0, (currentTime - 5.0) / 2.0));
      // Ease in-out
      const ep = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      const x = 480 + (472 - 480) * ep;
      const y = 440 + (492 - 440) * ep;
      const rot = 175 + (195 - 175) * ep;
      return { x, y, rotation: rot, opacity: 1, visible: true };
    }
    // 7.0 - 10.0s: Bus is parked at Jam Gate
    if (currentTime < 10.0) {
      return { x: 472, y: 492, rotation: 195, opacity: 1, visible: true };
    }
    // 10.0 - 12.5s: Bus moves from Jam Gate (472, 492) to Maheshwar (456, 528)
    if (currentTime < 12.5) {
      const p = Math.min(1, Math.max(0, (currentTime - 10.0) / 2.5));
      const ep = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      const x = 472 + (456 - 472) * ep;
      const y = 492 + (528 - 492) * ep;
      const rot = 195 + (215 - 195) * ep;
      return { x, y, rotation: rot, opacity: 1, visible: true };
    }
    // 12.5 - 15.5s: Bus is at Maheshwar
    if (currentTime < 15.5) {
      return { x: 456, y: 528, rotation: 215, opacity: 1, visible: true };
    }
    // 15.5 - 17.0s: Bus moves from Maheshwar (456, 528) to Shastradhara (442, 546)
    if (currentTime < 17.0) {
      const p = Math.min(1, Math.max(0, (currentTime - 15.5) / 1.5));
      const ep = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      const x = 456 + (442 - 456) * ep;
      const y = 528 + (546 - 528) * ep;
      const rot = 215 + (230 - 215) * ep;
      return { x, y, rotation: rot, opacity: 1, visible: true };
    }
    // 17.0s+: Bus at Shastradhara
    return { x: 442, y: 546, rotation: 230, opacity: 1, visible: true };
  };

  const bus = getBusState();

  // Dynamic Camera ViewBox calculation: follows bus and flies through the map
  const getViewBox = () => {
    switch (currentStage) {
      case 0:
        return "0 0 1000 850"; // Full India Map View
      case 1:
        return "320 280 390 350"; // Madhya Pradesh Central Focus
      case 2:
        return "420 380 160 140"; // Indore Departure
      case 3:
        return "360 410 260 210"; // Jam Gate with In-Map Vignette Space
      case 4:
        return "340 450 270 220"; // Maheshwar with In-Map Vignette Space
      case 5:
        return "380 490 170 150"; // Shastradhara Rapids
      case 6:
      default:
        return "320 340 340 300"; // Full Route Overview for ₹700 Reveal
    if (currentTime < 2.0) {
      return "0 0 1000 820"; // Full Subcontinent Overview
    }
    if (currentTime < 3.5) {
      return "120 120 760 620"; // Smooth Zoom into Central India
    }
    if (currentTime < 4.4) {
      return "340 320 360 280"; // Zoom into Madhya Pradesh
    }
    if (currentTime < 5.0) {
      return "400 370 170 140"; // Indore Departure Zoom
    }
    // 5.0 - 7.0s: Camera dynamically tracks the bus towards Jam Gate
    if (currentTime < 7.0) {
      const camX = bus.x - 85;
      const camY = bus.y - 70;
      return `${camX} ${camY} 170 140`;
    }
    // 7.0 - 10.0s: Jam Gate stop overview with road context
    if (currentTime < 10.0) {
      return "350 405 245 190";
    }
    // 10.0 - 12.5s: Camera dynamically tracks the bus towards Maheshwar
    if (currentTime < 12.5) {
      const camX = bus.x - 85;
      const camY = bus.y - 70;
      return `${camX} ${camY} 170 140`;
    }
    // 12.5 - 15.5s: Maheshwar stop
    if (currentTime < 15.5) {
      return "350 445 220 180";
    }
    // 15.5 - 17.0s: Tracking bus to Shastradhara
    if (currentTime < 17.0) {
      const camX = bus.x - 85;
      const camY = bus.y - 70;
      return `${camX} ${camY} 170 140`;
    }
    // 17.0s+: Full Route Panorama Zoom-Out
    return "290 350 420 300";
  };

  // Bus position along the road
  const getBusPosition = () => {
    switch (currentStage) {
      case 0:
      case 1:
        return { x: 480, y: 410, rotation: 0, opacity: 0 };
      case 2:
        return { x: 480, y: 440, rotation: 175, opacity: 1 }; // At Indore
      case 3:
        return { x: 472, y: 492, rotation: 195, opacity: 1 }; // Pulled over at Jam Gate
      case 4:
        return { x: 456, y: 528, rotation: 215, opacity: 1 }; // At Maheshwar
      case 5:
      case 6:
      default:
        return { x: 442, y: 546, rotation: 230, opacity: 1 }; // At Shastradhara
  // Route pathLength progress
  const getRouteProgress = () => {
    if (currentTime < 5.0) return 0;
    if (currentTime < 7.0) {
      const p = (currentTime - 5.0) / 2.0;
      return p * 0.38; // 0 to 38%
    }
    if (currentTime < 10.0) return 0.38;
    if (currentTime < 12.5) {
      const p = (currentTime - 10.0) / 2.5;
      return 0.38 + p * 0.42; // 38% to 80%
    }
    if (currentTime < 15.5) return 0.8;
    if (currentTime < 17.0) {
      const p = (currentTime - 15.5) / 1.5;
      return 0.8 + p * 0.2; // 80% to 100%
    }
    return 1.0;
  };

  const bus = getBusPosition();

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#061727] via-[#040f1a] to-[#02070e]">
      {/* Subtle Topographic Radial Grid Texture */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
    <div className="relative w-screen h-screen overflow-hidden bg-[#061727] select-none">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. ENVIRONMENTAL SIDE LAYERS (ZERO DEAD / EMPTY SPACE ON ANY SCREEN)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Left Environmental Layer: Misty Vindhyachal mountain roads */}
      <div className="absolute top-0 bottom-0 left-0 w-1/3 max-w-lg z-0 pointer-events-none overflow-hidden opacity-35">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Central India Mountains"
          fill
          priority
          sizes="(max-width: 1024px) 30vw, 400px"
          className="object-cover object-center"
        />
        {/* Seamless edge blending into map center */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#061727]/80 to-[#061727]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061727] via-transparent to-[#061727]" />
      </div>

      {/* SVG Map Canvas */}
      {/* Right Environmental Layer: Sacred Narmada Ghats & Heritage */}
      <div className="absolute top-0 bottom-0 right-0 w-1/3 max-w-lg z-0 pointer-events-none overflow-hidden opacity-35">
        <Image
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
          alt="Sacred Narmada River"
          fill
          priority
          sizes="(max-width: 1024px) 30vw, 400px"
          className="object-cover object-center"
        />
        {/* Seamless edge blending into map center */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#061727]/80 to-[#061727]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061727] via-transparent to-[#061727]" />
      </div>

      {/* Subtle Topographic Radial Grid Pattern across entire canvas */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. FULL-SCREEN VECTOR MAP CANVAS (100vw × 100vh)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.svg
        viewBox={getViewBox()}
        className="w-full h-full max-h-screen transition-all duration-1000 ease-out select-none"
        preserveAspectRatio="xMidYMid meet"
        className="relative z-10 w-full h-full transition-all duration-700 ease-out select-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial glow for Madhya Pradesh */}
          {/* Radial glow for Madhya Pradesh heartland */}
          <radialGradient id="mpGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#D97706" stopOpacity="0.12" />
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#D97706" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#061727" stopOpacity="0" />
          </radialGradient>

          {/* Route Gradient */}
          {/* Glowing Route Gradient (Saffron -> Gold -> Emerald) */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
          <filter id="mapGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. BHARATVISTA OFFICIAL INDIA MAP VISUAL
            A. BHARATVISTA INDIA MAP SILHOUETTE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Subcontinent Silhouette */}
        {/* Subcontinent Silhouette Contour */}
        <path
          d="M 440,80 Q 480,95 510,140 Q 560,180 580,240 Q 640,260 700,280 Q 770,300 810,340 Q 820,380 770,410 Q 720,400 680,440 Q 640,490 610,540 Q 570,610 540,680 Q 510,750 490,820 Q 460,780 430,710 Q 380,630 350,560 Q 310,520 270,470 Q 230,420 240,360 Q 270,330 300,310 Q 350,290 380,240 Q 400,180 420,130 Z"
          fill="#0A2E4C"
          fillOpacity="0.38"
          stroke="#1E3A5F"
          strokeWidth="1.6"
          fillOpacity="0.45"
          stroke="#2563EB"
          strokeWidth="1.8"
          strokeOpacity="0.4"
        />

        {/* Brand Map Artwork Overlay (During Stage 0 India Overview) */}
        {currentStage === 0 && (
          <g id="brand-artwork-silhouette" opacity="0.85">
            <image
              href="/logo.png"
              x="260"
              y="120"
              width="480"
              height="480"
              opacity="0.3"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        )}

        {/* Northern Himalayas Accent Contour */}
        {/* Northern Himalayas Ridge Contour */}
        <path
          d="M 390,130 Q 450,110 520,135 Q 580,165 650,195"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeDasharray="4,4"
          opacity="0.35"
        />

        {/* Sacred Narmada River Traversing Madhya Pradesh */}
        {/* Sacred Narmada River Traversing MP */}
        <path
          d="M 690,460 Q 590,480 510,495 Q 460,510 400,530 Q 330,550 270,560"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="3"
          strokeOpacity="0.6"
          strokeWidth="3.2"
          strokeOpacity="0.75"
          filter="url(#mapGlow)"
        />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. MADHYA PRADESH REGION HIGHLIGHT
            B. MADHYA PRADESH REGION
            (NO LARGE TEXT OVERLAY - MAP TELLS THE STORY!)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <g id="mp-state-region">
        <g id="mp-region">
          <ellipse cx="500" cy="480" rx="145" ry="95" fill="url(#mpGlow)" />
          {/* MP Boundary Outline */}
          {/* MP Boundary Outline with Warm Saffron Accent */}
          <path
            d="M 390,400 Q 450,380 540,390 Q 620,410 650,440 Q 640,490 590,530 Q 530,560 450,550 Q 380,520 370,470 Z"
            fill="#0F3B66"
            fillOpacity={currentStage >= 1 ? "0.65" : "0.2"}
            stroke={currentStage >= 1 ? "#EA580C" : "#D97706"}
            strokeWidth={currentStage >= 1 ? "2.2" : "1"}
            filter={currentStage >= 1 ? "url(#mapGlow)" : undefined}
            fillOpacity={currentTime >= 3.0 ? "0.6" : "0.25"}
            stroke={currentTime >= 3.0 ? "#EA580C" : "#D97706"}
            strokeWidth={currentTime >= 3.0 ? "2.2" : "1"}
            filter={currentTime >= 3.0 ? "url(#mapGlow)" : undefined}
            className="transition-all duration-700"
          />
          {currentStage >= 1 && (
            <text
              x="530"
              y="432"
              fill="#FDE68A"
              fontSize="12"
              fontFamily="Playfair Display, Georgia, serif"
              letterSpacing="2"
              fontWeight="700"
              opacity="0.85"
            >
              MADHYA PRADESH
            </text>
          )}
        </g>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. ANIMATED ROAD PATH: INDORE → JAM GATE → MAHESHWAR → SHASTRADHARA
            C. ANIMATED ROAD PATH: INDORE → JAM GATE → MAHESHWAR → SHASTRADHARA
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStage >= 2 && (
          <g id="animated-itinerary-route">
        {currentTime >= 4.4 && (
          <g id="road-network">
            {/* Dark Highway Foundation */}
            <path
              d="M 480,440 C 478,465 476,478 472,492 C 468,506 462,518 456,528 C 450,536 445,542 442,546"
              fill="none"
              stroke="#061727"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Highway White Dashed Center Line (Matching Logo Road) */}
            {/* White Dashed Center Line */}
            <path
              d="M 480,440 C 478,465 476,478 472,492 C 468,506 462,518 456,528 C 450,536 445,542 442,546"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              opacity="0.6"
            />
            {/* Animated Glowing Gradient Progress Route */}
            {/* Glowing Journey Progress Route */}
            <motion.path
              d="M 480,440 C 478,465 476,478 472,492 C 468,506 462,518 456,528 C 450,536 445,542 442,546"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="3.6"
              strokeLinecap="round"
              filter="url(#mapGlow)"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength:
                  currentStage === 2
                    ? 0.08
                    : currentStage === 3
                    ? 0.45
                    : currentStage === 4
                    ? 0.82
                    : 1.0,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              animate={{ pathLength: getRouteProgress() }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. DESTINATION PINS
            D. DESTINATION STOP MARKERS
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStage >= 2 && (
        {currentTime >= 4.4 && (
          <g id="destination-markers">
            {/* STOP 1: INDORE */}
            <g transform="translate(480, 440)">
              <circle r="7" fill="#EA580C" filter="url(#mapGlow)" />
              <circle r="3.5" fill="#FFFFFF" />
              <text x="12" y="4" fill="#FFFFFF" fontSize="10" fontWeight="700" letterSpacing="1">
              <circle r="6" fill="#EA580C" filter="url(#mapGlow)" />
              <circle r="3" fill="#FFFFFF" />
              <text x="10" y="4" fill="#FFFFFF" fontSize="9" fontWeight="700" letterSpacing="0.8">
                INDORE
              </text>
              <text x="12" y="14" fill="#FDE68A" fontSize="7">
                07:00 AM • Departure
              <text x="10" y="13" fill="#FDE68A" fontSize="6.5">
                07:00 AM Departure
              </text>
            </g>

            {/* STOP 2: JAM GATE */}
            {currentStage >= 3 && (
            {/* STOP 2: JAM GATE (Appears when bus arrives at ~7s) */}
            {currentTime >= 6.8 && (
              <g transform="translate(472, 492)">
                <circle r={currentStage === 3 ? "9" : "6"} fill="#F59E0B" filter="url(#mapGlow)" />
                <circle r="3" fill="#FFFFFF" />
                <text x="-12" y="4" textAnchor="end" fill="#FFFFFF" fontSize="9" fontWeight="700">
                <circle
                  r={currentTime >= 7.0 && currentTime < 10.0 ? "8" : "5.5"}
                  fill="#F59E0B"
                  filter="url(#mapGlow)"
                />
                <circle r="2.8" fill="#FFFFFF" />
                <text x="-10" y="3" textAnchor="end" fill="#FFFFFF" fontSize="8.5" fontWeight="700">
                  JAM GATE
                </text>
                <text x="-12" y="13" textAnchor="end" fill="#FDE68A" fontSize="7">
                  Chai + Maggie Pass
                <text x="-10" y="12" textAnchor="end" fill="#FDE68A" fontSize="6.5">
                  Chai + Maggie
                </text>
              </g>
            )}

            {/* STOP 3: MAHESHWAR */}
            {currentStage >= 4 && (
            {/* STOP 3: MAHESHWAR (Appears when bus arrives at ~12s) */}
            {currentTime >= 12.0 && (
              <g transform="translate(456, 528)">
                <circle r={currentStage === 4 ? "9" : "6"} fill="#EA580C" filter="url(#mapGlow)" />
                <circle r="3" fill="#FFFFFF" />
                <text x="12" y="3" fill="#FFFFFF" fontSize="9" fontWeight="700">
                <circle
                  r={currentTime >= 12.5 && currentTime < 15.5 ? "8" : "5.5"}
                  fill="#EA580C"
                  filter="url(#mapGlow)"
                />
                <circle r="2.8" fill="#FFFFFF" />
                <text x="10" y="3" fill="#FFFFFF" fontSize="8.5" fontWeight="700">
                  MAHESHWAR
                </text>
                <text x="12" y="12" fill="#FDE68A" fontSize="7">
                  Royal Dal Bafla Lunch
                <text x="10" y="12" fill="#FDE68A" fontSize="6.5">
                  Royal Dal Bafla
                </text>
              </g>
            )}

            {/* STOP 4: SHASTRADHARA */}
            {currentStage >= 5 && (
            {/* STOP 4: SHASTRADHARA (Appears at ~16s) */}
            {currentTime >= 16.0 && (
              <g transform="translate(442, 546)">
                <circle r="8" fill="#10B981" filter="url(#mapGlow)" />
                <circle r="3.5" fill="#FFFFFF" />
                <text x="-12" y="4" textAnchor="end" fill="#FFFFFF" fontSize="9" fontWeight="700">
                <circle r="7.5" fill="#10B981" filter="url(#mapGlow)" />
                <circle r="3" fill="#FFFFFF" />
                <text x="-10" y="3" textAnchor="end" fill="#FFFFFF" fontSize="8.5" fontWeight="700">
                  SHASTRADHARA
                </text>
                <text x="-12" y="13" textAnchor="end" fill="#6EE7B7" fontSize="7">
                  Thousand Streams
                <text x="-10" y="12" textAnchor="end" fill="#6EE7B7" fontSize="6.5">
                  The Rapids
                </text>
              </g>
            )}
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. THE BHARATVISTA LUXURY COACH (Main Protagonist Bus)
            E. THE BHARATVISTA LUXURY COACH (Main Moving Protagonist)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStage >= 2 && (
          <motion.g
            animate={{
              x: bus.x,
              y: bus.y,
              opacity: bus.opacity,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
        {bus.visible && (
          <g
            transform={`translate(${bus.x}, ${bus.y})`}
            opacity={bus.opacity}
            filter="url(#mapGlow)"
            className="transition-transform duration-200 ease-linear"
          >
            <g transform={`rotate(${bus.rotation}) translate(-14, -6)`}>
              {/* Bus Shadow */}
              <rect x="2" y="11" width="24" height="3" rx="1.5" fill="#000000" opacity="0.45" />
              {/* Bus Body */}
              <rect x="0" y="0" width="28" height="11" rx="3.5" fill="#FFFFFF" stroke="#0A2E4C" strokeWidth="0.8" />
              {/* Royal Navy Lower Stripe */}
              <rect x="0" y="7" width="28" height="4" rx="1" fill="#0A2E4C" />
              {/* Sunset Saffron Swish */}
              {/* Sunset Saffron Accent Swish */}
              <path d="M 2,7 Q 14,5 26,7" stroke="#EA580C" strokeWidth="1.2" fill="none" />
              {/* Tinted Panoramic Windows */}
              {/* Panoramic Tinted Windows */}
              <rect x="3" y="2" width="4.5" height="3.5" rx="0.5" fill="#0284C7" opacity="0.85" />
              <rect x="8.5" y="2" width="4.5" height="3.5" rx="0.5" fill="#0284C7" opacity="0.85" />
              <rect x="14" y="2" width="4.5" height="3.5" rx="0.5" fill="#0284C7" opacity="0.85" />
              <rect x="19.5" y="2" width="6" height="3.5" rx="0.5" fill="#0284C7" opacity="0.85" />
              {/* Headlights */}
              <circle cx="27" cy="9" r="0.8" fill="#FEF08A" />
              {/* Wheels */}
              <circle cx="6" cy="11" r="1.8" fill="#18181B" />
              <circle cx="21" cy="11" r="1.8" fill="#18181B" />
            </g>
          </motion.g>
          </g>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            6. IN-MAP EMBEDDED VIGNETTES (ATTACHED DIRECTLY TO GEOGRAPHY)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* VIGNETTE 1: JAM GATE — MAGGIE + CHAI ROAD BREAK */}
        {currentStage === 3 && (
          <foreignObject x="375" y="445" width="120" height="95">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full rounded-2xl overflow-hidden bg-[#0A2E4C]/95 border border-amber-400/50 shadow-2xl p-2 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative w-full h-11 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80"
                  alt="Hot Maggie & Chai"
                  fill
                  className="object-cover brightness-95"
                  sizes="120px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E4C] via-transparent to-transparent" />
                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-black/70 text-[7px] font-bold text-amber-300">
                  NASHTA STOP
                </span>
              </div>
              {/* Caption */}
              <div className="space-y-0.5 text-center">
                <p className="text-[8px] font-serif font-bold text-white leading-none">
                  Chai • Maggie • Views
                </p>
                <p className="text-[6.5px] text-amber-200/90 italic leading-tight">
                  A little break. A lot of memories.
                </p>
              </div>
            </motion.div>
          </foreignObject>
        )}

        {/* VIGNETTE 2: MAHESHWAR — TRADITIONAL ROYAL LUNCH */}
        {currentStage === 4 && (
          <foreignObject x="355" y="485" width="125" height="100">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full rounded-2xl overflow-hidden bg-[#0A2E4C]/95 border border-orange-400/50 shadow-2xl p-2 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative w-full h-12 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80"
                  alt="Traditional Dal Bafla Thali"
                  fill
                  className="object-cover brightness-95"
                  sizes="125px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E4C] via-transparent to-transparent" />
                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-black/70 text-[7px] font-bold text-amber-300">
                  TRADITIONAL MP LUNCH
                </span>
              </div>
              {/* Caption */}
              <div className="space-y-0.5 text-center">
                <p className="text-[8px] font-serif font-bold text-white leading-none">
                  Dal Bafla • Kadhi • Ladoo
                </p>
                <p className="text-[6.5px] text-amber-200/90 italic leading-tight">
                  A taste of Madhya Pradesh.
                </p>
              </div>
            </motion.div>
          </foreignObject>
        )}

        {/* VIGNETTE 3: STAGE 6 — FULL ROUTE PANORAMA & ₹700 REVEAL */}
        {currentStage === 6 && (
          <foreignObject x="330" y="350" width="140" height="90">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full rounded-2xl bg-[#0A2E4C]/95 border border-amber-400/40 p-2.5 flex flex-col justify-between text-center shadow-2xl"
            >
              <div className="space-y-0.5">
                <span className="text-[7px] uppercase tracking-wider text-amber-300 font-bold block">
                  ONE DAY • FOUR EXPERIENCES
                </span>
                <p className="text-[7.5px] font-mono text-zinc-300 leading-none">
                  Indore → Jam Gate → Maheshwar → Shastradhara
                </p>
                <div className="text-sm font-serif font-black text-white pt-0.5">
                  ₹700 <span className="text-[8px] font-normal text-amber-300">/ PERSON</span>
                </div>
              </div>

              <button
                onClick={onBookSeatClick}
                className="w-full py-1 rounded-full text-[8px] font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] shadow-md cursor-pointer hover:brightness-110"
              >
                BOOK YOUR SEAT →
              </button>
            </motion.div>
          </foreignObject>
        )}
      </motion.svg>

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-[#061727]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061727]/70 via-transparent to-[#061727]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-[#061727]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061727]/80 via-transparent to-[#061727]/80 pointer-events-none" />
    </div>
  );
}
