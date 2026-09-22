"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Bus,
  ArrowRight,
  Coffee,
  Utensils,
  Sparkles,
  Gift,
  Navigation,
  Check,
  MapPin,
  Sunrise,
  Sunset,
  ShoppingBag,
} from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

export type HeroScene =
  | "brand_intro"         // 0.0s <= t < 4.0s: Scene 1 (Single Logo & Identity Reveal)
  | "ai_structure_build"  // 4.0s <= t < 8.5s: Scene 2 (AI-made / structured build-up scene)
  | "drone_aerial_view"   // 8.5s <= t < 13.0s: Scene 3 (MP 4K Drone Aerial View)
  | "indore_pickups"      // 13.0s <= t < 25.5s: Scene 4 (Indore 5 Pickups HUD)
  | "rau_breakfast"       // 25.5s <= t < 31.5s: Scene 5 (07:30 AM Rau Indori Nashta)
  | "jam_gate_chai"       // 31.5s <= t < 37.5s: Scene 6 (09:00 AM Jam Gate Mountain Pass & Chai)
  | "maheshwar_fort"      // 37.5s <= t < 43.5s: Scene 7 (11:00 AM Maheshwar Fort & Ghats)
  | "dal_bafla_lunch"     // 43.5s <= t < 49.5s: Scene 8 (01:30 PM Malwa Lunch Dal Bafla)
  | "sahastradhara_rapids"// 49.5s <= t < 55.5s: Scene 9 (04:00 PM Sahastradhara Rapids)
  | "final_resolution";   // 55.5s <= t <= 62.0s: Scene 10 (Full Loop & ₹699 Booking Resolution)

export function getHeroScene(t: number): HeroScene {
  if (t < 4.0) return "brand_intro";
  if (t < 8.5) return "ai_structure_build";
  if (t < 13.0) return "drone_aerial_view";
  if (t < 25.5) return "indore_pickups";
  if (t < 31.5) return "rau_breakfast";
  if (t < 37.5) return "jam_gate_chai";
  if (t < 43.5) return "maheshwar_fort";
  if (t < 49.5) return "dal_bafla_lunch";
  if (t < 55.5) return "sahastradhara_rapids";
  return "final_resolution";
}

// Module-level persistent timeline clock to prevent React StrictMode double-mounting,
// window resizing, or re-renders from restarting the cinematic film.
let persistentTimelineTime = 0;
let persistentIsPlaying = true;

interface MasterCinematicHeroProps {
  onBookSeatClick?: () => void;
  onScene1Complete?: () => void;
}

export default function MasterCinematicHero({
  onBookSeatClick,
  onScene1Complete,
}: MasterCinematicHeroProps) {
  const [currentTime, setCurrentTime] = useState(persistentTimelineTime);
  const [isPlaying, setIsPlaying] = useState(persistentIsPlaying);

  // Single Source of Truth for current scene
  const activeScene = getHeroScene(currentTime);

  // Video element references for active play/pause management
  const mpVideoRef = useRef<HTMLVideoElement>(null);
  const jamGateVideoRef = useRef<HTMLVideoElement>(null);
  const maheshwarVideoRef = useRef<HTMLVideoElement>(null);
  const shastradharaVideoRef = useRef<HTMLVideoElement>(null);
  const mapAnimVideoRef = useRef<HTMLVideoElement>(null);

  // Total calm timeline duration (~62 seconds total)
  const TOTAL_DURATION = 62.0;

  // Notify parent once Scene 1 finishes
  useEffect(() => {
    if (activeScene !== "brand_intro") {
      onScene1Complete?.();
    }
  }, [activeScene, onScene1Complete]);

  // Master timeline driver: 50ms tick interval for silky 60fps coordination
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = Math.round((prev + 0.05) * 100) / 100;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          persistentIsPlaying = false;
          persistentTimelineTime = TOTAL_DURATION;
          return TOTAL_DURATION;
        }
        persistentTimelineTime = next;
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Video playback management: Play ONLY active scene video without sound
  // Fires strictly on activeScene or isPlaying transitions (NOT on every 50ms tick)
  useEffect(() => {
    if (!isPlaying) {
      mpVideoRef.current?.pause();
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
      mapAnimVideoRef.current?.pause();
      return;
    }

    if (activeScene === "ai_structure_build") {
      mapAnimVideoRef.current?.play().catch(() => {});
      mpVideoRef.current?.pause();
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
    } else if (activeScene === "drone_aerial_view") {
      mapAnimVideoRef.current?.pause();
      mpVideoRef.current?.play().catch(() => {});
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
    } else if (activeScene === "jam_gate_chai") {
      mapAnimVideoRef.current?.pause();
      mpVideoRef.current?.pause();
      jamGateVideoRef.current?.play().catch(() => {});
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
    } else if (activeScene === "maheshwar_fort") {
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.play().catch(() => {});
      shastradharaVideoRef.current?.pause();
    } else if (activeScene === "sahastradhara_rapids") {
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.play().catch(() => {});
    } else {
      mapAnimVideoRef.current?.pause();
      mpVideoRef.current?.pause();
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
    }
  }, [activeScene, isPlaying]);

  const handleJumpTo = (seconds: number) => {
    persistentTimelineTime = seconds;
    persistentIsPlaying = true;
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // BUS ROAD COORDINATES & TANGENT HEADING CALCULATION
  // Generous spacing between stops with gentle deceleration & pauses
  // Front of bus always faces direction of travel along smooth road curves
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const getRawBusPos = (t: number) => {
    // Before 13.0s: bus is standing at Vijay Nagar
    if (t < 13.0) {
      return { x: 496, y: 395 };
    }

    // 13.0s – 25.5s: Indore 5 Pickups (06:45 AM to 07:25 AM)
    // Total 12.5s duration across 5 pickup segments
    if (t < 25.5) {
      const p = Math.max(0, Math.min(1, (t - 13.0) / 12.5));

      // Stop 1 to Stop 2: Vijay Nagar -> Bengali Sq (p: 0 to 0.20, 13.0s to 15.5s)
      if (p < 0.20) {
        const uRaw = p / 0.20;
        const driveU = Math.min(1, uRaw / 0.75);
        const smoothU = driveU < 0.5 ? 2 * driveU * driveU : -1 + (4 - 2 * driveU) * driveU;
        return {
          x: 496 + (518 - 496) * smoothU,
          y: 395 + (418 - 395) * smoothU,
        };
      }
      // Stop 2 to Stop 3: Bengali Sq -> Teen Imli (p: 0.20 to 0.40, 15.5s to 18.0s)
      else if (p < 0.40) {
        const uRaw = (p - 0.20) / 0.20;
        const driveU = Math.min(1, uRaw / 0.75);
        const smoothU = driveU < 0.5 ? 2 * driveU * driveU : -1 + (4 - 2 * driveU) * driveU;
        return {
          x: 518 + (500 - 518) * smoothU,
          y: 418 + (442 - 418) * smoothU,
        };
      }
      // Stop 3 to Stop 4: Teen Imli -> IT Park (p: 0.40 to 0.60, 18.0s to 20.5s)
      else if (p < 0.60) {
        const uRaw = (p - 0.40) / 0.20;
        const driveU = Math.min(1, uRaw / 0.75);
        const smoothU = driveU < 0.5 ? 2 * driveU * driveU : -1 + (4 - 2 * driveU) * driveU;
        return {
          x: 500 + (478 - 500) * smoothU,
          y: 442 + (456 - 442) * smoothU,
        };
      }
      // Stop 4 to Stop 5: IT Park -> Rajiv Gandhi (p: 0.60 to 0.80, 20.5s to 23.0s)
      else if (p < 0.80) {
        const uRaw = (p - 0.60) / 0.20;
        const driveU = Math.min(1, uRaw / 0.75);
        const smoothU = driveU < 0.5 ? 2 * driveU * driveU : -1 + (4 - 2 * driveU) * driveU;
        return {
          x: 478 + (462 - 478) * smoothU,
          y: 456 + (474 - 456) * smoothU,
        };
      }
      // Stop 5 to Highway: Rajiv Gandhi -> heading toward Rau Circle (p: 0.80 to 1.0, 23.0s to 25.5s)
      else {
        const uRaw = (p - 0.80) / 0.20;
        const smoothU = uRaw < 0.5 ? 2 * uRaw * uRaw : -1 + (4 - 2 * uRaw) * uRaw;
        return {
          x: 462 + (450 - 462) * smoothU,
          y: 474 + (496 - 474) * smoothU,
        };
      }
    }

    // 25.5s – 31.5s: Rau Circle Breakfast Stop (07:30 AM Nashta)
    if (t < 31.5) {
      return { x: 450, y: 496 };
    }

    // 31.5s – 37.5s: Rau Circle (450, 496) to Jam Gate (468, 545) (09:00 AM)
    if (t < 37.5) {
      const u = Math.max(0, Math.min(1, (t - 31.5) / 5.0));
      const smoothU = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;
      const curvedX = 450 + (468 - 450) * smoothU + Math.sin(smoothU * Math.PI) * 6;
      const curvedY = 496 + (545 - 496) * smoothU;
      return { x: curvedX, y: curvedY };
    }

    // 37.5s – 43.5s: Jam Gate (468, 545) to Maheshwar (440, 605) (11:00 AM)
    if (t < 43.5) {
      const u = Math.max(0, Math.min(1, (t - 37.5) / 5.0));
      const smoothU = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;
      const curvedX = 468 + (440 - 468) * smoothU - Math.sin(smoothU * Math.PI) * 7;
      const curvedY = 545 + (605 - 545) * smoothU;
      return { x: curvedX, y: curvedY };
    }

    // 43.5s – 49.5s: Maheshwar Fort & Malwa Lunch (440, 605) (01:30 PM)
    if (t < 49.5) {
      return { x: 440, y: 605 };
    }

    // 49.5s – 55.5s: Maheshwar (440, 605) to Sahastradhara (412, 630) (04:00 PM)
    if (t < 55.5) {
      const u = Math.max(0, Math.min(1, (t - 49.5) / 4.5));
      const smoothU = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;
      const curvedX = 440 + (412 - 440) * smoothU;
      const curvedY = 605 + (630 - 605) * smoothU;
      return { x: curvedX, y: curvedY };
    }

    // 55.5s – 62.0s: Return Highway Circuit (Sahastradhara -> Indore) (08:30 PM Return)
    const u = Math.max(0, Math.min(1, (t - 55.5) / 5.0));
    const smoothU = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;
    const curvedX = 412 + (496 - 412) * smoothU + Math.sin(smoothU * Math.PI) * 16;
    const curvedY = 630 + (395 - 630) * smoothU;
    return { x: curvedX, y: curvedY };
  };

  const getBusMotion = () => {
    // Before 13.0s: Not yet on the road
    if (currentTime < 13.0) {
      return { x: 496, y: 395, rotation: 135, visible: false, opacity: 0 };
    }

    const pos = getRawBusPos(currentTime);
    const posNext = getRawBusPos(currentTime + 0.12);

    const dx = posNext.x - pos.x;
    const dy = posNext.y - pos.y;

    let rotation = 135;
    if (Math.hypot(dx, dy) > 0.04) {
      rotation = (Math.atan2(dy, dx) * 180) / Math.PI;
    } else {
      if (currentTime < 15.5) rotation = 45;
      else if (currentTime < 18.0) rotation = 125;
      else if (currentTime < 20.5) rotation = 145;
      else if (currentTime < 23.0) rotation = 135;
      else if (currentTime < 25.5) rotation = 120;
      else if (currentTime < 31.5) rotation = 120;
      else if (currentTime < 37.5) rotation = 70;
      else if (currentTime < 43.5) rotation = 125;
      else if (currentTime < 49.5) rotation = 125;
      else if (currentTime < 55.5) rotation = 140;
      else rotation = -70;
    }

    return {
      x: pos.x,
      y: pos.y,
      rotation,
      visible: true,
      opacity: 1,
    };
  };

  const bus = getBusMotion();

  // Dynamic Camera ViewBox for Smooth Cinematic Tracking
  const getViewBox = () => {
    if (currentTime < 4.0) {
      return "0 0 1000 820"; // Subcontinent overview
    }
    if (currentTime < 8.5) {
      return "160 160 680 540"; // Madhya Pradesh cartographic zoom
    }
    if (currentTime < 13.0) {
      return "240 240 520 420"; // Plateau & River Corridor zoom
    }
    // 13.0s – 25.5s: Tracking Indore pickups with spacious framing
    if (currentTime < 25.5) {
      return `${bus.x - 85} ${bus.y - 70} 170 140`;
    }
    // 25.5s – 31.5s: Rau Circle Breakfast Stop
    if (currentTime < 31.5) {
      return "350 400 190 150";
    }
    // 31.5s – 37.5s: Jam Gate mountain pass
    if (currentTime < 37.5) {
      return `${bus.x - 90} ${bus.y - 75} 180 145`;
    }
    // 37.5s – 43.5s: Maheshwar Narmada valley
    if (currentTime < 43.5) {
      return `${bus.x - 95} ${bus.y - 80} 190 155`;
    }
    // 43.5s – 49.5s: Malwa Lunch in Maheshwar
    if (currentTime < 49.5) {
      return "330 500 210 170";
    }
    // 49.5s – 55.5s: Sahastradhara river trail
    if (currentTime < 55.5) {
      return "320 510 210 170";
    }
    // 55.5s+: Full round trip pull-back
    return "200 220 600 480";
  };

  // Active pickup stop index for clean minimalist HUD
  const getActivePickupIndex = () => {
    if (currentTime < 13.0) return -1;
    if (currentTime < 15.5) return 0; // Vijay Nagar (06:45 AM)
    if (currentTime < 18.0) return 1; // Bengali Square (07:00 AM)
    if (currentTime < 20.5) return 2; // Teen Imli (07:10 AM)
    if (currentTime < 23.0) return 3; // IT Park (07:18 AM)
    if (currentTime < 25.5) return 4; // Rajiv Gandhi (07:25 AM)
    return 5;
  };

  const activePickupIdx = getActivePickupIndex();

  // Active step for 01:30 PM Malwa Special Lunch Dal Bafla Thali (43.5s – 49.5s)
  const getActiveThaliStep = () => {
    if (currentTime < 43.5) return 0;
    if (currentTime < 44.2) return 1; // Kansa Thali placed
    if (currentTime < 44.9) return 2; // Dal served
    if (currentTime < 45.6) return 3; // Bafla placed
    if (currentTime < 46.3) return 4; // Kadhi added
    if (currentTime < 47.0) return 5; // Rice placed
    if (currentTime < 47.7) return 6; // Ladoo added
    if (currentTime < 48.6) return 7; // Accompaniments & ghee
    return 8; // Complete feast
  };

  const activeThaliStep = getActiveThaliStep();

  return (
    <section
      id="hero-cinematic-film"
      className="relative w-full h-[100dvh] min-h-[580px] max-h-[1100px] overflow-hidden bg-[#061727] select-none"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 1: ACTUAL MADHYA PRADESH MAP WITH DETAILED GEOGRAPHY
          Recognizable state geography, Narmada river valley, Vindhyachals & key hubs
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle Environmental Vignette Margins */}
        <div className="absolute top-0 bottom-0 left-0 w-1/3 max-w-md z-0 pointer-events-none overflow-hidden opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Vindhyachal Mountains"
            fill
            priority
            sizes="400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#061727]/80 to-[#061727]" />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-1/3 max-w-md z-0 pointer-events-none overflow-hidden opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
            alt="Narmada Ghats"
            fill
            priority
            sizes="400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#061727]/80 to-[#061727]" />
        </div>

        {/* Vector SVG Map Canvas with Authentic MP Geography */}
        <motion.svg
          viewBox={getViewBox()}
          className="relative z-10 w-full h-full transition-all duration-1000 ease-out select-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="mpGlowReal" cx="48%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#D97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#061727" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="routeGradientReal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            <filter id="mapGlowReal" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Subcontinent Silhouette in Background */}
          <path
            d="M 440,80 Q 480,95 510,140 Q 560,180 580,240 Q 640,260 700,280 Q 770,300 810,340 Q 820,380 770,410 Q 720,400 680,440 Q 640,490 610,540 Q 570,610 540,680 Q 510,750 490,820 Q 460,780 430,710 Q 380,630 350,560 Q 310,520 270,470 Q 230,420 240,360 Q 270,330 300,310 Q 350,290 380,240 Q 400,180 420,130 Z"
            fill="#082035"
            fillOpacity="0.4"
            stroke="#1D4ED8"
            strokeWidth="1.6"
            strokeOpacity="0.35"
          />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              ACTUAL MADHYA PRADESH GEOGRAPHY & STATE CONTOUR
              (Recognizable state shape with Chambal, Malwa, Narmada Valley & Baghelkhand)
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <g id="actual-madhya-pradesh-geography">
            {/* Ambient State Glow */}
            <ellipse cx="485" cy="510" rx="175" ry="120" fill="url(#mpGlowReal)" />

            {/* Authentic State Boundary of Madhya Pradesh */}
            <path
              d="M 493,310 C 508,308 522,312 534,324 C 548,318 565,315 580,330 C 605,340 635,360 655,385 C 680,405 700,430 710,465 C 715,495 705,530 680,560 C 660,580 630,600 600,615 C 570,625 540,630 500,635 C 460,640 425,635 395,610 C 370,585 360,550 365,510 C 370,470 390,435 410,405 C 430,380 445,355 465,335 C 475,320 485,312 493,310 Z"
              fill="#0D2D4B"
              fillOpacity="0.65"
              stroke="#EA580C"
              strokeWidth="2.4"
              filter="url(#mapGlowReal)"
            />

            {/* Malwa Plateau Elevation Shading */}
            <path
              d="M 410,410 Q 460,390 515,415 Q 545,450 510,480 Q 450,490 415,460 Z"
              fill="#13385C"
              fillOpacity="0.45"
            />

            {/* Sacred Narmada River: Sweeping westwards through Jabalpur, Hoshangabad, Maheshwar */}
            <path
              d="M 680,495 Q 610,515 540,530 Q 470,550 440,605 Q 412,630 330,640"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="3.6"
              strokeOpacity="0.85"
              filter="url(#mapGlowReal)"
            />

            {/* Major Geographic Reference Labels */}
            <g className="text-zinc-400 select-none pointer-events-none" opacity="0.65">
              <text x="500" y="360" fill="#94A3B8" fontSize="7" fontStyle="italic">
                MALWA PLATEAU
              </text>
              <text x="470" y="525" fill="#38BDF8" fontSize="6.5" fontWeight="600">
                NARMADA RIVER
              </text>
              <text x="590" y="470" fill="#94A3B8" fontSize="6.5">
                BHOPAL
              </text>
              <text x="640" y="500" fill="#94A3B8" fontSize="6.5">
                JABALPUR
              </text>
              <text x="450" y="380" fill="#94A3B8" fontSize="6.5">
                UJJAIN
              </text>
            </g>
          </g>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              SOUTHBOUND EXPEDITION ROAD LINE
              Indore -> Rau -> Jam Gate -> Maheshwar -> Sahastradhara
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {currentTime >= 13.0 && (
            <g id="expedition-road">
              {/* Road bed shadow */}
              <path
                d="M 496,395 C 508,405 514,410 518,418 C 516,430 508,436 500,442 C 490,448 484,452 478,456 C 472,462 466,468 462,474 C 456,482 452,488 450,496 C 454,515 462,530 468,545 C 462,568 452,588 440,605 C 430,618 420,624 412,630"
                fill="none"
                stroke="#020810"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Illuminated road line */}
              <path
                d="M 496,395 C 508,405 514,410 518,418 C 516,430 508,436 500,442 C 490,448 484,452 478,456 C 472,462 466,468 462,474 C 456,482 452,488 450,496 C 454,515 462,530 468,545 C 462,568 452,588 440,605 C 430,618 420,624 412,630"
                fill="none"
                stroke="url(#routeGradientReal)"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#mapGlowReal)"
              />

              {/* Complete Round-Trip Return Path back to Indore */}
              {currentTime >= 55.5 && (
                <path
                  d="M 412,630 C 425,570 445,500 470,440 C 484,412 492,402 496,395"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.4"
                  strokeDasharray="6,6"
                  opacity="0.9"
                  filter="url(#mapGlowReal)"
                />
              )}
            </g>
          )}

          {/* Minimalist Pickup Markers */}
          {currentTime >= 13.0 && (
            <g id="pickup-markers">
              {TRIP_CONFIG.pickupPoints.map((pt, idx) => {
                const isPassed = currentTime >= 13.0 + (idx + 1) * 2.5;
                const isCurrent = activePickupIdx === idx;

                return (
                  <g key={pt.id} transform={`translate(${pt.svgX}, ${pt.svgY})`}>
                    <circle
                      r={isCurrent ? "4.5" : isPassed ? "3" : "2"}
                      fill={isCurrent ? "#EA580C" : isPassed ? "#10B981" : "#E2E8F0"}
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                    />
                    <text
                      x="9"
                      y="3.5"
                      fill={isCurrent ? "#FDE047" : "#E2E8F0"}
                      fontSize={isCurrent ? "7.5" : "6"}
                      fontWeight={isCurrent ? "bold" : "normal"}
                    >
                      {pt.name}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Destinations */}
          {currentTime >= 13.0 && (
            <g id="destinations-group">
              {/* Rau */}
              <g transform="translate(450, 496)">
                <circle r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                <text x="10" y="3.5" fill="#FCD34D" fontSize="7" fontWeight="600">
                  Rau Circle (07:30 AM Nashta)
                </text>
              </g>

              {/* Jam Gate */}
              <g transform="translate(468, 545)">
                <circle r="5" fill="#EA580C" stroke="#FFFFFF" strokeWidth="1.2" />
                <text x="11" y="4" fill="#FDE047" fontSize="7.5" fontWeight="bold">
                  Jam Gate (09:00 AM Chai)
                </text>
              </g>

              {/* Maheshwar */}
              <g transform="translate(440, 605)">
                <circle r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.4" />
                <text x="-95" y="4" fill="#34D399" fontSize="8" fontWeight="bold">
                  Maheshwar (Fort &amp; Dal Bafla)
                </text>
              </g>

              {/* Sahastradhara */}
              <g transform="translate(412, 630)">
                <circle r="5.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.2" />
                <text x="-98" y="4" fill="#38BDF8" fontSize="7.5" fontWeight="bold">
                  Sahastradhara (04:00 PM Boat Ride)
                </text>
              </g>
            </g>
          )}

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              THE BHARATVISTA LUXURY COACH
              Slow, controlled vehicle physics; faces direction of travel
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {bus.visible && (
            <g
              transform={`translate(${bus.x}, ${bus.y})`}
              opacity={bus.opacity}
              filter="url(#mapGlowReal)"
              className="transition-transform duration-150 ease-linear"
            >
              <g transform={`rotate(${bus.rotation}) translate(-14, -6)`}>
                <rect x="2" y="11" width="24" height="3" rx="1.5" fill="#000000" opacity="0.4" />
                <rect
                  x="0"
                  y="0"
                  width="28"
                  height="11"
                  rx="3.5"
                  fill="#FFFFFF"
                  stroke="#0A2E4C"
                  strokeWidth="0.8"
                />
                <rect x="0" y="7" width="28" height="4" rx="1" fill="#0A2E4C" />
                <path d="M 2,7 Q 14,5 26,7" stroke="#EA580C" strokeWidth="1.2" fill="none" />
                <rect x="3" y="2" width="4.5" height="3.5" rx="0.5" fill="#0284C7" opacity="0.85" />
                <rect x="8.5" y="2" width="4.5" height="3.5" rx="0.5" fill="#0284C7" opacity="0.85" />
                <rect x="14" y="2" width="4.5" height="3.5" rx="0.5" fill="#0284C7" opacity="0.85" />
                <rect x="19.5" y="2" width="6" height="3.5" rx="0.5" fill="#0284C7" opacity="0.85" />
                <circle cx="27" cy="9" r="0.8" fill="#FEF08A" />
                <circle cx="6" cy="11" r="1.8" fill="#18181B" />
                <circle cx="21" cy="11" r="1.8" fill="#18181B" />
              </g>
            </g>
          )}
        </motion.svg>

        {/* Global Atmospheric Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-[#061727]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061727]/70 via-transparent to-[#061727]/70 pointer-events-none" />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 1: OPENING — 0.0–0.4s INTENTIONAL ATMOSPHERE & SINGLE LOGO REVEAL (0.0s – 4.0s)
          • Starts immediately on frame 0.0 with intentional dawn visual & travel cue
          • Logo appears ONCE with warm-gold tagline
          • No duplicate navbar logo or background clutter
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "brand_intro" && (
          <motion.div
            key="scene-1-brand-intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#061727]/90 backdrop-blur-md p-4 overflow-hidden"
          >
            {/* 0.0 - 0.4s Immediate Dawn Atmosphere: Deep India Travel Palette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030d17] via-[#061727] to-[#0A2E4C] opacity-95 pointer-events-none" />

            {/* Subtle Horizon Ray (Sunrise breaking over Central India) */}
            <div className="absolute bottom-1/3 left-0 right-0 h-40 bg-gradient-to-r from-transparent via-amber-500/15 to-transparent blur-3xl pointer-events-none" />

            {/* Restrained Geographic / Journey Origin Cue (Immediate frame 0.0 presence) */}
            <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] xs:text-[10px] sm:text-xs font-mono text-amber-300/90 max-w-[92vw] shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
              <span className="truncate">22.7196° N, 75.8577° E • INDORE - MAHESHWAR CORRIDOR</span>
            </div>

            <div className="relative z-10 text-center space-y-4 sm:space-y-6 max-w-2xl px-4 my-auto">
              {/* SINGLE BharatVista Emblem Reveal (Appears exactly once) */}
              <motion.div
                initial={{ scale: 0.92, opacity: 0.2 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-20 h-20 sm:w-26 sm:h-26 rounded-full overflow-hidden bg-white p-1.5 shadow-2xl mx-auto ring-2 ring-amber-400/80 shadow-amber-500/20"
              >
                <Image
                  src="/logo.png"
                  alt="BharatVista Logo"
                  fill
                  priority
                  sizes="104px"
                  className="object-contain"
                />
              </motion.div>

              <div className="space-y-3 sm:space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="text-2xl xs:text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight"
                >
                  Welcome to <span className="text-[#EA580C]">BharatVista</span>
                </motion.h1>

                {/* Warm-Gold Hindi Tagline Treatment */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative inline-block py-1"
                >
                  <p className="text-xl xs:text-2xl sm:text-4xl font-serif font-bold italic tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,158,11,0.65)]">
                    &ldquo;{TRIP_CONFIG.tagline}&rdquo;
                  </p>
                </motion.div>

                {/* Customer Opening Copy */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.75 }}
                  className="space-y-1 pt-1"
                >
                  <p className="text-xs sm:text-base font-serif text-zinc-200 tracking-wide font-normal max-w-lg mx-auto">
                    {TRIP_CONFIG.customerMessage.lead}
                  </p>
                  <p className="text-[11px] sm:text-xs font-serif text-amber-300/90 italic">
                    {TRIP_CONFIG.customerMessage.sub}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 2: AI-MADE / STRUCTURED BUILD-UP SCENE (4.0s – 8.5s)
          • AI-illustrated animated India travel map visual (opening_map_animation.mp4)
          • Authentic structured geographic vector boundary of Madhya Pradesh (madhya_pradesh_map.svg)
          • Cartographic storytelling HUD: "THE HEART OF INDIA • MADHYA PRADESH"
          • Bridge from brand identity into real geography
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "ai_structure_build" && (
          <motion.div
            key="scene-2-ai-structure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-[#061727]"
          >
            {/* Background AI-Generated Illustrated India Map Animation Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video
                ref={mapAnimVideoRef}
                src="/opening_map_animation.mp4"
                poster="/map_animation_poster.png"
                playsInline
                muted
                autoPlay
                loop
                className="w-full h-full object-cover brightness-75 contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-[#061727]/50 to-[#061727]/80" />
            </div>

            {/* Authentic Recognizable Madhya Pradesh Geographic Map Structure Container */}
            <div className="relative z-10 w-full max-w-4xl h-[70vh] sm:h-[76vh] flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/madhya_pradesh_map.svg"
                  alt="Authentic Map Structure of Madhya Pradesh"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain drop-shadow-[0_0_35px_rgba(234,88,12,0.4)]"
                />
              </div>

              {/* Bottom Geographic Callout */}
              <div className="absolute bottom-4 sm:bottom-8 left-3.5 right-3.5 sm:left-8 sm:right-auto z-20 max-w-lg text-left bg-[#061727]/90 backdrop-blur-md p-3 sm:p-5 rounded-2xl border border-amber-400/40 shadow-2xl">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 block mb-0.5">
                  THE HEART OF INDIA
                </span>
                <h2 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  MADHYA PRADESH
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-serif italic mt-0.5">
                  Ancient plateaus, sacred waters, and the open road south.
                </p>
                <div className="pt-2 flex items-center gap-2 text-[10px] sm:text-[11px] text-amber-300 font-mono flex-wrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Indore → Rau → Jam Gate → Maheshwar → Sahastradhara</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 3: 4K AERIAL DRONE VIEW OF MADHYA PRADESH (8.5s – 13.0s)
          • Real 4K aerial cinematography of MP landscapes & Vindhyachal ridges
          • Deep cinematic atmosphere connecting geographic structure to real terrain
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "drone_aerial_view" && (
          <motion.div
            key="scene-3-drone-aerial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-30 overflow-hidden bg-black"
          >
            <video
              ref={mpVideoRef}
              src="/mp_drone.mp4"
              poster="/mp_drone_poster.png"
              playsInline
              muted
              autoPlay
              loop
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-[#061727]/60" />

            <div className="absolute bottom-14 sm:bottom-16 left-4 right-4 sm:left-12 sm:right-auto z-10 max-w-xl text-left">
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-amber-400 block mb-1">
                AERIAL EXPEDITION • CENTRAL INDIA
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                VINDHYACHAL CORRIDOR
              </h2>
              <p className="text-sm sm:text-base text-amber-200 font-serif italic mt-1">
                Sweeping over ancient plateaus and sacred river valleys before the morning departure.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 4: LUXURY FLOATING ITINERARY HUD DURING INDORE PICKUPS (13.0s – 25.5s)
          Minimalist, pristine layout: ● Vijay Nagar                         06:45 AM
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "indore_pickups" && activePickupIdx >= 0 && activePickupIdx < TRIP_CONFIG.pickupPoints.length && (
          <motion.div
            key={`hud-${TRIP_CONFIG.pickupPoints[activePickupIdx].id}`}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute top-22 sm:top-24 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md"
          >
            <div className="px-5 py-2.5 rounded-2xl bg-[#061727]/92 backdrop-blur-xl border border-amber-400/40 shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 animate-pulse" />
                <span className="text-sm font-serif font-bold text-white tracking-wide">
                  {TRIP_CONFIG.pickupPoints[activePickupIdx].name}
                </span>
                <span className="text-[11px] text-zinc-400 hidden sm:inline">
                  • {TRIP_CONFIG.pickupPoints[activePickupIdx].landmark}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-400/30">
                {TRIP_CONFIG.pickupPoints[activePickupIdx].time}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 5: RAU CIRCLE — INDORI NASHTA (07:30 AM) (25.5s – 31.5s)
          • Full-screen Indori Poha, samosa, jalebi & cutting tea
          • Rau Circle = NASHTA (Jam Gate = Chai)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "rau_breakfast" && (
          <motion.div
            key="scene-5-rau-breakfast"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1920&q=80"
                alt="Rau Circle Indori Nashta"
                fill
                priority
                sizes="100vw"
                className="object-cover scale-105 brightness-75 transition-transform duration-7000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-[#061727]/60 to-[#061727]/75" />
            </div>

            <div className="relative z-10 max-w-3xl w-full text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                <span>07:30 AM • RAU CIRCLE • THE BREAKFAST STOP</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Authentic Indori Nashta
              </h2>

              <p className="text-lg sm:text-2xl text-amber-200 font-serif italic max-w-xl mx-auto leading-relaxed">
                &ldquo;Hot Indori poha with ratlami sev, crispy samosas, warm golden jalebi & steaming cutting chai.&rdquo;
              </p>

              <div className="flex items-center justify-center gap-3 pt-2 flex-wrap text-xs font-mono text-zinc-300">
                <span className="px-3.5 py-1 rounded-full bg-black/60 border border-white/20">
                  All 5 Pickups Assembled
                </span>
                <span className="px-3.5 py-1 rounded-full bg-black/60 border border-amber-400/40 text-amber-300">
                  Included in ₹{TRIP_CONFIG.price}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-black/60 border border-white/20">
                  Southbound Highway Departure
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 6: JAM GATE — CHAI & SCENIC VALLEY (09:00 AM) (31.5s – 37.5s)
          • Full-screen Jam Gate Drone Footage
          • Strictly CHAI STOP (no breakfast copy)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "jam_gate_chai" && (
          <motion.div
            key="scene-6-jamgate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 z-30 overflow-hidden"
          >
            <video
              ref={jamGateVideoRef}
              src="/jam_gate_drone.mp4"
              poster="/jam_gate_poster.png"
              playsInline
              muted
              autoPlay
              loop
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-[#061727]/60" />

            <div className="absolute bottom-14 sm:bottom-16 left-4 right-4 sm:left-12 sm:right-auto z-10 max-w-xl text-left">
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-amber-400 block mb-1">
                09:00 AM • VINDHYACHAL MOUNTAIN PASS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                JAM GATE
              </h2>
              <p className="text-lg sm:text-xl text-amber-200 font-serif italic mt-1">
                &ldquo;A little pause. A lot of memories. Chai at Jam Gate.&rdquo;
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-amber-300 flex-wrap">
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 border border-amber-400/40 flex items-center gap-1.5 shrink-0">
                  <Coffee className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Steaming Adrak Chai</span>
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 border border-amber-400/40 shrink-0">
                  Misty Malwa Views
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 7: 11:00 AM MAHESHWAR DRONE FOOTAGE (37.5s – 43.5s)
          • Ahilya Fort, sacred stone ghats, Narmada river
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "maheshwar_fort" && (
          <motion.div
            key="scene-7-maheshwar-drone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 z-30 overflow-hidden"
          >
            <video
              ref={maheshwarVideoRef}
              src="/maheshwar_drone.mp4"
              poster="/maheshwar_poster.png"
              playsInline
              muted
              autoPlay
              loop
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-[#061727]/60" />

            <div className="absolute bottom-14 sm:bottom-16 left-4 right-4 sm:left-12 sm:right-auto z-10 max-w-xl text-left">
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-amber-400 block mb-1">
                11:00 AM • QUEEN AHILYABAI&apos;S CITADEL
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                MAHESHWAR
              </h2>
              <p className="text-base sm:text-lg text-amber-200 font-serif italic mt-1">
                Walk through the heritage of Maheshwar, from Ahilya Fort and Rajwada to the timeless Narmada ghats.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 8: 01:30 PM MALWA SPECIAL LUNCH — DAL BAFLA THALI (43.5s – 49.5s)
          • Chronological lunch: served traditionally item-by-item
          • Kansa thali -> Dal -> Bafla -> Kadhi -> Rice -> Ladoo -> complete feast
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "dal_bafla_lunch" && (
          <motion.div
            key="scene-8-thali"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-8 overflow-y-auto bg-[#061727]/90 backdrop-blur-md"
          >
            <div className="absolute inset-0 opacity-25">
              <Image
                src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1920&q=80"
                alt="Malwa Special Lunch"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#061727]/70" />
            </div>

            <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center my-auto pt-16 sm:pt-0">
              {/* Thali Hero Visual */}
              <div className="relative w-full h-44 xs:h-52 sm:h-84 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-amber-400/40 bg-black/50">
                <Image
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80"
                  alt="Traditional Dal Bafla Thali"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 block">
                    01:30 PM • TRADITIONAL MALWA FEAST
                  </span>
                  <p className="text-sm sm:text-base font-serif font-bold text-amber-100">
                    Dal Bafla • Kadhi • Steamed Rice • Churma Ladoo
                  </p>
                </div>
              </div>

              {/* Progressive Item Reveal */}
              <div className="space-y-3.5 text-left">
                <div>
                  <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#EA580C]">
                    01:30 PM • MAHESHWAR
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                    Malwa Special Lunch
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 font-serif italic">
                    Ghee-dipped baflas served with Malwa hospitality.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  {TRIP_CONFIG.thaliSequence.slice(0, 7).map((item) => {
                    const isRevealed = activeThaliStep >= item.step;
                    return (
                      <div
                        key={item.step}
                        className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${
                          isRevealed
                            ? "bg-amber-500/20 border border-amber-400/40 text-white"
                            : "bg-white/5 border border-white/5 text-zinc-500 opacity-30"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                            isRevealed
                              ? "bg-amber-400 text-black font-bold"
                              : "bg-white/10 text-zinc-500"
                          }`}
                        >
                          {isRevealed ? <Check className="w-3 h-3" /> : item.step}
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-amber-200">{item.name}</span>
                          <span className="text-zinc-400 font-normal"> — {item.detail}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 9: 04:00 PM SAHASTRADHARA & BOAT RIDE (49.5s – 55.5s)
          • Preceded by bus VISIBLY traveling from Maheshwar
          • Correct spelling: SAHASTRADHARA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "sahastradhara_rapids" && (
          <motion.div
            key="scene-9-sahastradhara"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 z-30 overflow-hidden"
          >
            <video
              ref={shastradharaVideoRef}
              src="/shastradhara_drone.mp4"
              poster="/shastradhara_poster.png"
              playsInline
              muted
              autoPlay
              loop
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-[#061727]/60" />

            <div className="absolute bottom-14 sm:bottom-16 left-4 right-4 sm:left-12 sm:right-auto z-10 max-w-xl text-left">
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-emerald-400 block mb-1">
                04:00 PM • THOUSAND-STREAM RAPIDS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                SAHASTRADHARA
              </h2>
              <p className="text-lg sm:text-xl text-zinc-200 font-serif italic mt-1">
                Sacred Narmada flowing through volcanic rock channels and exhilarating boat rides.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 10: FINAL HERO CTA & BRAND RESOLUTION (55.5s – 62.0s)
          • Holds steadily for at least 3+ full seconds
          • Price: ₹699 / person
          • Group Booking Offer: 20% OFF when you book for 4 people
          • 4+ travellers group discount prompt
          • First 5 customers exclusive gift
          • Primary CTA: [ Book Your Seat ]
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {activeScene === "final_resolution" && (
          <motion.div
            key="scene-final-cta-card"
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="absolute inset-x-3 sm:inset-x-4 bottom-5 sm:bottom-10 z-30 max-w-3xl mx-auto rounded-3xl bg-[#0A2E4C]/96 backdrop-blur-xl border border-amber-400/40 p-4 sm:p-8 shadow-2xl text-center max-h-[84vh] overflow-y-auto"
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Circuit Header */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-[11px] font-mono">
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>COMPLETE ONE-DAY EXPEDITION • RETURN BY 8:30–9:00 PM</span>
              </div>

              <h2 className="text-base xs:text-xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-tight leading-snug">
                Indore → Rau Circle → Jam Gate → Maheshwar → Sahastradhara → Indore
              </h2>

              {/* Price & Booking Urgency */}
              <div className="py-0.5 sm:py-1 space-y-0.5">
                <div className="inline-block text-2xl sm:text-5xl font-serif font-black text-white">
                  ₹{TRIP_CONFIG.price}{" "}
                  <span className="text-xs sm:text-base font-normal text-amber-300">
                    {TRIP_CONFIG.priceUnit}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Book Your Slot As Soon As Possible
                </p>
                <p className="text-[11px] sm:text-xs text-zinc-300">
                  {TRIP_CONFIG.inclusionsSummary}
                </p>
              </div>

              {/* Group Discount Badge + First 5 Gift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center gap-2 text-amber-200 text-center">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>{TRIP_CONFIG.groupOffer.badge}</strong> 4+ travellers? Contact us.
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-2xl bg-orange-500/15 border border-orange-400/30 flex items-center justify-center gap-2 text-amber-200 text-center">
                  <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{TRIP_CONFIG.promotionalGiftText}</span>
                </div>
              </div>

              {/* Single Primary Action Button */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={onBookSeatClick}
                  className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Bus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>BOOK YOUR SEAT</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => handleJumpTo(0)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Film</span>
                </button>
              </div>

              <p className="text-[10px] sm:text-[11px] text-amber-200/80 font-serif italic pt-1">
                Your weekend. Your story. Masti, dhamal, sukoon aur ek kahani jo yaad rahe.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CLEAN VOYAGE STATUS & CHAPTER SELECTOR (NO EDITOR TIMELINE UI)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col justify-between pt-20 sm:pt-28 pb-2.5 sm:pb-3 pointer-events-none">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between gap-2 pointer-events-auto">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#061727]/85 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono text-amber-300 shadow-lg min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-white hidden xs:inline shrink-0">ITINERARY:</span>
            <span className="truncate max-w-[170px] xs:max-w-[220px] sm:max-w-none">
              {activeScene === "brand_intro"
                ? "Opening: BharatVista Begins"
                : activeScene === "ai_structure_build"
                ? "Madhya Pradesh Gateway"
                : activeScene === "drone_aerial_view"
                ? "4K Aerial Landscape"
                : activeScene === "indore_pickups"
                ? "07:00 AM • Indore 5 Pickups"
                : activeScene === "rau_breakfast"
                ? "07:30 AM • Rau (Indori Nashta)"
                : activeScene === "jam_gate_chai"
                ? "09:00 AM • Jam Gate (Mountain Chai)"
                : activeScene === "maheshwar_fort"
                ? "11:00 AM • Maheshwar Fort & Ghats"
                : activeScene === "dal_bafla_lunch"
                ? "01:30 PM • Malwa Lunch (Dal Bafla)"
                : activeScene === "sahastradhara_rapids"
                ? "04:00 PM • Sahastradhara & Boat Ride"
                : "Indore Round-Trip Complete • ₹699"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={() => handleJumpTo(0)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
              aria-label="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Chapter Pills (Finished Film Navigation) */}
        <div className="pointer-events-auto w-full max-w-3xl mx-auto space-y-1.5 pb-1">
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
            {[
              { label: "Intro", time: 0, scene: "brand_intro" },
              { label: "AI Map", time: 4.0, scene: "ai_structure_build" },
              { label: "MP Aerial", time: 8.5, scene: "drone_aerial_view" },
              { label: "5 Pickups", time: 13.0, scene: "indore_pickups" },
              { label: "07:30 Nashta", time: 25.5, scene: "rau_breakfast" },
              { label: "09:00 Jam Gate", time: 31.5, scene: "jam_gate_chai" },
              { label: "11:00 Fort", time: 37.5, scene: "maheshwar_fort" },
              { label: "01:30 Dal Bafla", time: 43.5, scene: "dal_bafla_lunch" },
              { label: "04:00 Sahastradhara", time: 49.5, scene: "sahastradhara_rapids" },
              { label: "₹699 Book", time: 55.5, scene: "final_resolution" },
            ].map((ch) => {
              const isActive = activeScene === ch.scene;
              return (
                <button
                  key={ch.label}
                  onClick={() => handleJumpTo(ch.time)}
                  className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/40"
                      : "bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80 border border-white/10"
                  }`}
                >
                  {ch.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
