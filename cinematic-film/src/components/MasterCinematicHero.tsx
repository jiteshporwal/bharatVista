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

interface MasterCinematicHeroProps {
  onBookSeatClick?: () => void;
}

export default function MasterCinematicHero({ onBookSeatClick }: MasterCinematicHeroProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Video element references for active play/pause management
  const mpVideoRef = useRef<HTMLVideoElement>(null);
  const jamGateVideoRef = useRef<HTMLVideoElement>(null);
  const maheshwarVideoRef = useRef<HTMLVideoElement>(null);
  const shastradharaVideoRef = useRef<HTMLVideoElement>(null);
  const mapAnimVideoRef = useRef<HTMLVideoElement>(null);

  // Total calm timeline duration (~62 seconds total)
  // Scene 14/Final CTA holds steadily for at least 4.5 seconds
  const TOTAL_DURATION = 62.0;

  // Master timeline driver: 50ms tick interval for silky 60fps coordination
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = Math.round((prev + 0.05) * 100) / 100;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Video playback management: Play ONLY active scene video without sound
  useEffect(() => {
    if (!isPlaying) {
      mpVideoRef.current?.pause();
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
      mapAnimVideoRef.current?.pause();
      return;
    }

    // 0.0 - 5.0s: Opening brand intro
    if (currentTime < 5.0) {
      mapAnimVideoRef.current?.play().catch(() => {});
      mpVideoRef.current?.pause();
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
    }
    // 7.5 - 12.0s: MP Drone Video
    else if (currentTime >= 7.5 && currentTime < 12.0) {
      mapAnimVideoRef.current?.pause();
      mpVideoRef.current?.play().catch(() => {});
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
    }
    // 32.0 - 36.5s: Jam Gate Drone Video
    else if (currentTime >= 32.0 && currentTime < 36.5) {
      mpVideoRef.current?.pause();
      jamGateVideoRef.current?.play().catch(() => {});
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
    }
    // 44.0 - 47.0s: Maheshwar Drone Video
    else if (currentTime >= 44.0 && currentTime < 47.0) {
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.play().catch(() => {});
      shastradharaVideoRef.current?.pause();
    }
    // 50.5 - 54.5s: Sahastradhara Rapids Drone Video
    else if (currentTime >= 50.5 && currentTime < 54.5) {
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.play().catch(() => {});
    }
    else {
      mpVideoRef.current?.pause();
      jamGateVideoRef.current?.pause();
      maheshwarVideoRef.current?.pause();
      shastradharaVideoRef.current?.pause();
    }
  }, [currentTime, isPlaying]);

  const handleJumpTo = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // BUS ROAD COORDINATES & TANGENT HEADING CALCULATION
  // Generous spacing between stops with gentle deceleration & pauses
  // Front of bus always faces direction of travel along smooth road curves
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const getRawBusPos = (t: number) => {
    // 12.0s – 24.5s: Indore 5 Pickups (06:45 AM to 07:25 AM)
    // Vijay Nagar (496, 395) -> Bengali Sq (518, 418) -> Teen Imli (500, 442) -> IT Park (478, 456) -> Rajiv Gandhi (462, 474)
    if (t < 24.5) {
      const p = Math.max(0, Math.min(1, (t - 12.0) / 12.5));

      // Stop 1 to Stop 2: Vijay Nagar -> Bengali Sq (p: 0 to 0.22, 12.0s to 14.8s)
      if (p < 0.22) {
        const uRaw = p / 0.22;
        const driveU = Math.min(1, uRaw / 0.72);
        const smoothU = driveU < 0.5 ? 2 * driveU * driveU : -1 + (4 - 2 * driveU) * driveU;
        return {
          x: 496 + (518 - 496) * smoothU,
          y: 395 + (418 - 395) * smoothU,
        };
      }
      // Stop 2 to Stop 3: Bengali Sq -> Teen Imli (p: 0.22 to 0.44, 14.8s to 17.5s)
      else if (p < 0.44) {
        const uRaw = (p - 0.22) / 0.22;
        const driveU = Math.min(1, uRaw / 0.72);
        const smoothU = driveU < 0.5 ? 2 * driveU * driveU : -1 + (4 - 2 * driveU) * driveU;
        return {
          x: 518 + (500 - 518) * smoothU,
          y: 418 + (442 - 418) * smoothU,
        };
      }
      // Stop 3 to Stop 4: Teen Imli -> IT Park (p: 0.44 to 0.66, 17.5s to 20.2s)
      else if (p < 0.66) {
        const uRaw = (p - 0.44) / 0.22;
        const driveU = Math.min(1, uRaw / 0.72);
        const smoothU = driveU < 0.5 ? 2 * driveU * driveU : -1 + (4 - 2 * driveU) * driveU;
        return {
          x: 500 + (478 - 500) * smoothU,
          y: 442 + (456 - 442) * smoothU,
        };
      }
      // Stop 4 to Stop 5: IT Park -> Rajiv Gandhi (p: 0.66 to 0.88, 20.2s to 23.0s)
      else if (p < 0.88) {
        const uRaw = (p - 0.66) / 0.22;
        const driveU = Math.min(1, uRaw / 0.72);
        const smoothU = driveU < 0.5 ? 2 * driveU * driveU : -1 + (4 - 2 * driveU) * driveU;
        return {
          x: 478 + (462 - 478) * smoothU,
          y: 456 + (474 - 456) * smoothU,
        };
      }
      // Stop 5 to Highway: Rajiv Gandhi -> heading toward Rau Circle (p: 0.88 to 1.0, 23.0s to 24.5s)
      else {
        const uRaw = (p - 0.88) / 0.12;
        const smoothU = uRaw < 0.5 ? 2 * uRaw * uRaw : -1 + (4 - 2 * uRaw) * uRaw;
        return {
          x: 462 + (450 - 462) * smoothU,
          y: 474 + (496 - 474) * smoothU,
        };
      }
    }

    // 24.5s – 30.0s: Rau Circle Breakfast Stop (07:30 AM Nashta)
    if (t < 30.0) {
      return { x: 450, y: 496 };
    }

    // 30.0s – 36.5s: Rau Circle (450, 496) to Jam Gate (468, 545) (09:00 AM)
    if (t < 36.5) {
      const u = Math.max(0, Math.min(1, (t - 30.0) / 4.5));
      const smoothU = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;
      const curvedX = 450 + (468 - 450) * smoothU + Math.sin(smoothU * Math.PI) * 6;
      const curvedY = 496 + (545 - 496) * smoothU;
      return { x: curvedX, y: curvedY };
    }

    // 36.5s – 47.0s: Jam Gate (468, 545) to Maheshwar (440, 605) (11:00 AM - 02:30 PM)
    if (t < 47.0) {
      const u = Math.max(0, Math.min(1, (t - 36.5) / 4.5));
      const smoothU = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;
      const curvedX = 468 + (440 - 468) * smoothU - Math.sin(smoothU * Math.PI) * 7;
      const curvedY = 545 + (605 - 545) * smoothU;
      return { x: curvedX, y: curvedY };
    }

    // 47.0s – 54.5s: Maheshwar (440, 605) to Sahastradhara (412, 630) (04:00 PM)
    // Bus VISIBLY travels along river road from Maheshwar to Sahastradhara
    if (t < 54.5) {
      const u = Math.max(0, Math.min(1, (t - 47.0) / 4.0));
      const smoothU = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;
      const curvedX = 440 + (412 - 440) * smoothU;
      const curvedY = 605 + (630 - 605) * smoothU;
      return { x: curvedX, y: curvedY };
    }

    // 54.5s – 62.0s: Return Highway Circuit (Sahastradhara -> Indore) (07:00 PM Return)
    const u = Math.max(0, Math.min(1, (t - 54.5) / 4.5));
    const smoothU = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;
    const curvedX = 412 + (496 - 412) * smoothU + Math.sin(smoothU * Math.PI) * 16;
    const curvedY = 630 + (395 - 630) * smoothU;
    return { x: curvedX, y: curvedY };
  };

  const getBusMotion = () => {
    // Before 12.0s: Not yet on the road
    if (currentTime < 12.0) {
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
      if (currentTime < 14.8) rotation = 45;
      else if (currentTime < 17.5) rotation = 125;
      else if (currentTime < 20.2) rotation = 145;
      else if (currentTime < 23.0) rotation = 135;
      else if (currentTime < 30.0) rotation = 120;
      else if (currentTime < 36.5) rotation = 70;
      else if (currentTime < 47.0) rotation = 125;
      else if (currentTime < 54.5) rotation = 140;
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
    if (currentTime < 5.0) {
      return "0 0 1000 820"; // Subcontinent overview
    }
    if (currentTime < 12.0) {
      return "240 240 520 420"; // Madhya Pradesh cartographic zoom
    }
    // 12.0s – 24.5s: Tracking Indore pickups with spacious framing
    if (currentTime < 24.5) {
      return `${bus.x - 85} ${bus.y - 70} 170 140`;
    }
    // 24.5s – 30.0s: Rau Circle Breakfast Stop
    if (currentTime < 30.0) {
      return "350 400 190 150";
    }
    // 30.0s – 36.5s: Jam Gate mountain pass
    if (currentTime < 36.5) {
      return `${bus.x - 90} ${bus.y - 75} 180 145`;
    }
    // 36.5s – 47.0s: Maheshwar Narmada valley
    if (currentTime < 47.0) {
      return `${bus.x - 95} ${bus.y - 80} 190 155`;
    }
    // 47.0s – 54.5s: Sahastradhara river trail
    if (currentTime < 54.5) {
      return "320 510 210 170";
    }
    // 54.5s+: Slow camera pull-back showing full round trip loop
    return "230 300 540 400";
  };

  // Active pickup stop index for clean minimalist HUD
  const getActivePickupIndex = () => {
    if (currentTime < 12.0) return -1;
    if (currentTime < 14.8) return 0; // Vijay Nagar (06:45 AM)
    if (currentTime < 17.5) return 1; // Bengali Square (07:00 AM)
    if (currentTime < 20.2) return 2; // Teen Imli (07:10 AM)
    if (currentTime < 23.0) return 3; // IT Park (07:18 AM)
    if (currentTime < 24.5) return 4; // Rajiv Gandhi (07:25 AM)
    return 5;
  };

  const activePickupIdx = getActivePickupIndex();

  // Active step for 01:30 PM Malwa Special Lunch Dal Bafla Thali (39.5s – 44.0s)
  const getActiveThaliStep = () => {
    if (currentTime < 39.5) return 0;
    if (currentTime < 40.1) return 1; // Kansa Thali placed
    if (currentTime < 40.7) return 2; // Dal served
    if (currentTime < 41.3) return 3; // Bafla placed
    if (currentTime < 41.9) return 4; // Kadhi added
    if (currentTime < 42.5) return 5; // Rice placed
    if (currentTime < 43.1) return 6; // Ladoo added
    if (currentTime < 43.6) return 7; // Accompaniments & ghee
    return 8; // Complete feast
  };

  const activeThaliStep = getActiveThaliStep();

  return (
    <section
      id="hero-cinematic-film"
      className="relative w-screen h-screen min-h-[640px] max-h-[1100px] overflow-hidden bg-[#061727] select-none"
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

            {/* Authentic Detailed State Boundary Path of Madhya Pradesh */}
            <path
              d="M 445,335 C 465,320 490,325 505,340 C 520,325 540,315 560,335 C 585,345 615,360 635,385 C 660,405 680,430 690,465 C 695,495 685,530 660,560 C 640,580 610,600 580,615 C 550,625 520,630 480,635 C 440,640 405,635 375,610 C 350,585 340,550 345,510 C 350,470 370,435 390,405 C 410,380 425,355 445,335 Z"
              fill="#0D2D4B"
              fillOpacity="0.65"
              stroke="#EA580C"
              strokeWidth="2.2"
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
            <g className="text-zinc-400 select-none pointer-events-none" opacity="0.6">
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
          {currentTime >= 11.5 && (
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
              {currentTime >= 54.5 && (
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

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              MINIMALIST PICKUP MARKERS (TIME ON RIGHT SIDE)
              ● Location Name                          Time
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {currentTime >= 11.5 && (
            <g id="pickup-markers">
              {TRIP_CONFIG.pickupPoints.map((pt, idx) => {
                const isPassed = currentTime >= 12.0 + (idx + 1) * 2.5;
                const isCurrent = activePickupIdx === idx;

                return (
                  <g key={pt.id} transform={`translate(${pt.svgX}, ${pt.svgY})`}>
                    <circle
                      r={isCurrent ? "4.5" : isPassed ? "3" : "2"}
                      fill={isCurrent ? "#F59E0B" : isPassed ? "#EA580C" : "#71717A"}
                      filter="url(#mapGlowReal)"
                    />
                    <circle r="1.5" fill="#FFFFFF" />

                    {/* Clean minimal itinerary label with time on right side */}
                    {isCurrent && (
                      <g transform="translate(14, -10)" className="transition-opacity duration-700">
                        <rect
                          x="0"
                          y="-8"
                          width="114"
                          height="18"
                          rx="4"
                          fill="#061727"
                          fillOpacity="0.92"
                          stroke="#F59E0B"
                          strokeWidth="0.8"
                        />
                        <text
                          x="8"
                          y="4"
                          fill="#FFFFFF"
                          fontSize="7"
                          fontWeight="700"
                          letterSpacing="0.4"
                        >
                          ● {pt.name}
                        </text>
                        <text
                          x="106"
                          y="4"
                          textAnchor="end"
                          fill="#FDE68A"
                          fontSize="6.5"
                          fontFamily="monospace"
                          fontWeight="600"
                        >
                          {pt.time}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              MAJOR DESTINATION LABELS ALONG JOURNEY
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {currentTime >= 23.0 && (
            <g id="major-stops">
              {/* 07:30 AM — RAU CIRCLE NASHTA */}
              <g transform="translate(450, 496)">
                <circle r="5.5" fill="#EA580C" filter="url(#mapGlowReal)" />
                <circle r="2.2" fill="#FFFFFF" />
                <rect
                  x="12"
                  y="-9"
                  width="116"
                  height="20"
                  rx="4"
                  fill="#061727"
                  fillOpacity="0.9"
                  stroke="#EA580C"
                  strokeWidth="0.9"
                />
                <text x="18" y="0" fill="#FFFFFF" fontSize="7.5" fontWeight="800">
                  RAU CIRCLE
                </text>
                <text x="18" y="8" fill="#FDE68A" fontSize="6">
                  07:30 AM • Indori Nashta
                </text>
              </g>

              {/* 09:00 AM — JAM GATE CHAI */}
              {currentTime >= 29.5 && (
                <g transform="translate(468, 545)">
                  <circle r="5.5" fill="#F59E0B" filter="url(#mapGlowReal)" />
                  <circle r="2.5" fill="#FFFFFF" />
                  <rect
                    x="-120"
                    y="-9"
                    width="108"
                    height="20"
                    rx="4"
                    fill="#061727"
                    fillOpacity="0.9"
                    stroke="#F59E0B"
                    strokeWidth="0.9"
                  />
                  <text x="-18" y="0" textAnchor="end" fill="#FFFFFF" fontSize="7.5" fontWeight="800">
                    JAM GATE
                  </text>
                  <text x="-18" y="8" textAnchor="end" fill="#FDE68A" fontSize="6">
                    09:00 AM • Mountain Chai
                  </text>
                </g>
              )}

              {/* 11:00 AM — MAHESHWAR */}
              {currentTime >= 36.0 && (
                <g transform="translate(440, 605)">
                  <circle r="6" fill="#EA580C" filter="url(#mapGlowReal)" />
                  <circle r="2.8" fill="#FFFFFF" />
                  <rect
                    x="12"
                    y="-9"
                    width="122"
                    height="20"
                    rx="4"
                    fill="#061727"
                    fillOpacity="0.9"
                    stroke="#EA580C"
                    strokeWidth="0.9"
                  />
                  <text x="18" y="0" fill="#FFFFFF" fontSize="7.5" fontWeight="800">
                    MAHESHWAR
                  </text>
                  <text x="18" y="8" fill="#FDE68A" fontSize="6">
                    11:00 AM • Ahilya Fort & Lunch
                  </text>
                </g>
              )}

              {/* 04:00 PM — SAHASTRADHARA */}
              {currentTime >= 47.0 && (
                <g transform="translate(412, 630)">
                  <circle r="6" fill="#10B981" filter="url(#mapGlowReal)" />
                  <circle r="2.8" fill="#FFFFFF" />
                  <rect
                    x="-130"
                    y="-9"
                    width="118"
                    height="20"
                    rx="4"
                    fill="#061727"
                    fillOpacity="0.9"
                    stroke="#10B981"
                    strokeWidth="0.9"
                  />
                  <text x="-18" y="0" textAnchor="end" fill="#FFFFFF" fontSize="7.5" fontWeight="800">
                    SAHASTRADHARA
                  </text>
                  <text x="-18" y="8" textAnchor="end" fill="#6EE7B7" fontSize="6">
                    04:00 PM • Sacred Rapids
                  </text>
                </g>
              )}
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
          SCENE 1: OPENING — SINGLE LOGO REVEAL & WARM-GOLD TAGLINE (0.0s – 5.0s)
          • Starts immediately on frame 0.0 with intentional brand visual (no empty flash)
          • Logo appears ONLY ONCE
          • Warm-gold tagline + customer message
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime < 5.0 && (
          <motion.div
            key="scene-1-brand-intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#061727]/85 backdrop-blur-md p-4 overflow-hidden"
          >
            <video
              ref={mapAnimVideoRef}
              src="/opening_map_animation.mp4"
              poster="/map_animation_poster.png"
              playsInline
              muted
              autoPlay
              className="absolute inset-0 w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-[#061727]/40 to-[#061727]/80" />

            <div className="relative z-10 text-center space-y-6 max-w-3xl px-4">
              {/* Single BharatVista Emblem */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full overflow-hidden bg-white p-1.5 shadow-2xl mx-auto ring-2 ring-amber-400/80 shadow-amber-500/20"
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

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight"
                >
                  Welcome to <span className="text-[#EA580C]">BharatVista</span>
                </motion.h1>

                {/* Tagline: Warm-Gold/Amber Treatment */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                  className="relative inline-block py-1"
                >
                  <p className="text-2xl sm:text-4xl font-serif font-bold italic tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,158,11,0.65)]">
                    &ldquo;{TRIP_CONFIG.tagline}&rdquo;
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                </motion.div>

                {/* Customer Opening Copy */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.9 }}
                  className="space-y-1.5 pt-1"
                >
                  <p className="text-sm sm:text-lg font-serif text-zinc-200 tracking-wide font-normal">
                    {TRIP_CONFIG.customerMessage.lead}
                  </p>
                  <p className="text-xs sm:text-sm font-serif text-amber-300/90 italic">
                    {TRIP_CONFIG.customerMessage.sub}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 2: REAL MADHYA PRADESH DRONE FOOTAGE (7.5s – 12.0s)
          • Soft entrance & unhurried breathing room for Central India
          • Seamless crossfade directly into Indore map
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 7.5 && currentTime < 12.0 && (
          <motion.div
            key="scene-2-mp-drone"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0 z-30 overflow-hidden"
          >
            <video
              ref={mpVideoRef}
              src="/mp_drone.mp4"
              poster="/mp_drone_poster.png"
              playsInline
              muted
              autoPlay
              loop
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727] via-transparent to-[#061727]/60" />

            <div className="absolute bottom-16 left-6 sm:left-12 z-10 max-w-xl text-left">
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-amber-400 block mb-1">
                THE HEART OF INDIA
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                This is MADHYA PRADESH
              </h2>
              <p className="text-sm sm:text-base text-zinc-200 font-serif italic mt-1">
                Ancient plateaus, sacred waters, and the open road south.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 3: LUXURY FLOATING ITINERARY HUD DURING INDORE PICKUPS (12.0s – 24.5s)
          Minimalist, pristine layout: ● Vijay Nagar                         06:45 AM
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 12.0 && currentTime < 24.5 && activePickupIdx >= 0 && activePickupIdx < TRIP_CONFIG.pickupPoints.length && (
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
          SCENE 4: RAU CIRCLE — INDORI NASHTA (07:30 AM) (24.5s – 30.0s)
          • Full-screen Indori Poha, samosa, jalebi & cutting tea
          • Rau Circle = NASHTA (Jam Gate = Chai)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 24.5 && currentTime < 30.0 && (
          <motion.div
            key="scene-4-rau-breakfast"
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
          SCENE 5: JAM GATE — CHAI & SCENIC VALLEY (09:00 AM) (32.0s – 36.5s)
          • Full-screen Jam Gate Drone Footage
          • Strictly CHAI STOP (no breakfast copy)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 32.0 && currentTime < 36.5 && (
          <motion.div
            key="scene-5-jamgate"
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

            <div className="absolute bottom-16 left-6 sm:left-12 z-10 max-w-xl text-left">
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-amber-400 block mb-1">
                09:00 AM • VINDHYACHAL MOUNTAIN PASS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                JAM GATE
              </h2>
              <p className="text-lg sm:text-xl text-amber-200 font-serif italic mt-1">
                &ldquo;A little pause. A lot of memories. Chai at Jam Gate.&rdquo;
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-amber-300">
                <span className="px-3 py-1 rounded-full bg-black/60 border border-amber-400/40 flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-400" />
                  <span>Steaming Adrak Chai in Glass</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 border border-amber-400/40">
                  Misty Malwa Valley Views
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SCENE 6A: 01:30 PM MALWA SPECIAL LUNCH — DAL BAFLA THALI (39.5s – 44.0s)
          • Chronological lunch: served traditionally item-by-item
          • Kansa thali -> Dal -> Bafla -> Kadhi -> Rice -> Ladoo -> complete feast
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 39.5 && currentTime < 44.0 && (
          <motion.div
            key="scene-6a-thali"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-[#061727]/90 backdrop-blur-md"
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

            <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Thali Hero Visual */}
              <div className="relative w-full h-64 sm:h-84 rounded-3xl overflow-hidden shadow-2xl border border-amber-400/40 bg-black/50">
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
          SCENE 6B: 11:00 AM MAHESHWAR DRONE FOOTAGE (44.0s – 47.0s)
          • Ahilya Fort, sacred stone ghats, Narmada river
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 44.0 && currentTime < 47.0 && (
          <motion.div
            key="scene-6b-maheshwar-drone"
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

            <div className="absolute bottom-16 left-6 sm:left-12 z-10 max-w-xl text-left">
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
          SCENE 7: 04:00 PM SAHASTRADHARA & BOAT RIDE (50.5s – 54.5s)
          • Preceded by bus VISIBLY traveling from Maheshwar (47.0s – 50.5s)
          • Correct spelling: SAHASTRADHARA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 50.5 && currentTime < 54.5 && (
          <motion.div
            key="scene-7-sahastradhara"
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

            <div className="absolute bottom-16 left-6 sm:left-12 z-10 max-w-xl text-left">
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
          SCENE 8: FINAL HERO CTA & BRAND RESOLUTION (56.0s – 62.0s)
          • Holds steadily for at least 3+ full seconds
          • Price: ₹699 / person
          • Group Booking Offer: 20% OFF when you book for 4 people
          • 4+ travellers group discount prompt
          • First 5 customers exclusive gift
          • Primary CTA: [ Book Your Seat ]
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {currentTime >= 56.0 && (
          <motion.div
            key="scene-final-cta-card"
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="absolute inset-x-4 bottom-10 sm:bottom-12 z-30 max-w-3xl mx-auto rounded-3xl bg-[#0A2E4C]/96 backdrop-blur-xl border border-amber-400/40 p-6 sm:p-8 shadow-2xl text-center"
          >
            <div className="space-y-4">
              {/* Circuit Header */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono">
                <Navigation className="w-3.5 h-3.5" />
                <span>COMPLETE ONE-DAY EXPEDITION • RETURN BY 8:30–9:00 PM</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight">
                Indore → Rau Circle → Jam Gate → Maheshwar → Sahastradhara → Indore
              </h2>

              {/* Price & Booking Urgency */}
              <div className="py-1 space-y-1">
                <div className="inline-block text-3xl sm:text-5xl font-serif font-black text-white">
                  ₹{TRIP_CONFIG.price}{" "}
                  <span className="text-sm sm:text-base font-normal text-amber-300">
                    {TRIP_CONFIG.priceUnit}
                  </span>
                </div>
                <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Book Your Slot As Soon As Possible
                </p>
                <p className="text-xs text-zinc-300">
                  {TRIP_CONFIG.inclusionsSummary}
                </p>
              </div>

              {/* Group Discount Badge + First 5 Gift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center gap-2 text-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>{TRIP_CONFIG.groupOffer.badge}</strong> 4+ travellers? Contact us.
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-orange-500/15 border border-orange-400/30 flex items-center justify-center gap-2 text-amber-200">
                  <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{TRIP_CONFIG.promotionalGiftText}</span>
                </div>
              </div>

              {/* Single Primary Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onBookSeatClick}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
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
                  <span>Replay Film</span>
                </button>
              </div>

              <p className="text-[11px] text-amber-200/80 font-serif italic pt-1">
                Your weekend. Your story. Masti, dhamal, sukoon aur ek kahani jo yaad rahe.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CLEAN VOYAGE STATUS & CHAPTER SELECTOR (NO EDITOR TIMELINE UI)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-24 sm:pt-28 pb-3 pointer-events-none">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061727]/85 backdrop-blur-md border border-white/15 text-xs font-mono text-amber-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">ITINERARY:</span>
            <span>
              {currentTime < 5.0
                ? "Opening: BharatVista Identity"
                : currentTime < 12.0
                ? "Madhya Pradesh Geography"
                : currentTime < 24.5
                ? "07:00 AM • Departure & Indore Pickups"
                : currentTime < 30.0
                ? "07:30 AM • Rau Circle (Indori Nashta)"
                : currentTime < 36.5
                ? "09:00 AM • Jam Gate (Mountain Chai)"
                : currentTime < 44.0
                ? "01:30 PM • Malwa Special Lunch (Dal Bafla)"
                : currentTime < 47.0
                ? "11:00 AM • Maheshwar (Ahilya Fort & Ghats)"
                : currentTime < 54.5
                ? "04:00 PM • Sahastradhara & Boat Ride"
                : "Indore Round-Trip Complete • ₹699"}
            </span>
          </div>

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

        {/* Bottom Chapter Pills (Pure Finished Film Navigation, Zero Editor Timeline Numbers) */}
        <div className="pointer-events-auto w-full max-w-3xl mx-auto space-y-2 pb-1">
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
            {[
              { label: "Intro", time: 0 },
              { label: "MP Map", time: 7.5 },
              { label: "Indore Pickups", time: 12.0 },
              { label: "07:30 Nashta", time: 24.5 },
              { label: "09:00 Jam Gate", time: 32.0 },
              { label: "01:30 Dal Bafla", time: 39.5 },
              { label: "Maheshwar Fort", time: 44.0 },
              { label: "04:00 Sahastradhara", time: 47.0 },
              { label: "₹699 Book", time: 56.0 },
            ].map((ch) => {
              const isActive =
                currentTime >= ch.time &&
                (ch.time === 56.0 ||
                  currentTime <
                    (ch.time === 0
                      ? 7.5
                      : ch.time === 7.5
                      ? 12.0
                      : ch.time === 12.0
                      ? 24.5
                      : ch.time === 24.5
                      ? 32.0
                      : ch.time === 32.0
                      ? 39.5
                      : ch.time === 39.5
                      ? 44.0
                      : ch.time === 44.0
                      ? 47.0
                      : 56.0));
              return (
                <button
                  key={ch.label}
                  onClick={() => handleJumpTo(ch.time)}
                  className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-medium transition-all cursor-pointer ${
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
