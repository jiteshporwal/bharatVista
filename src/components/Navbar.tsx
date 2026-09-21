"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Compass, ChevronRight, PhoneCall } from "lucide-react";

interface NavbarProps {
  onPlanTripClick?: () => void;
}

export default function Navbar({ onPlanTripClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Explore", href: "#explore" },
    { label: "Destinations", href: "#destinations" },
    { label: "Experiences", href: "#experiences" },
    { label: "Stories", href: "#stories" },
    { label: "Journeys", href: "#journeys" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#061727]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
            : "bg-gradient-to-b from-[#061727]/90 via-[#061727]/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#EA580C] rounded-lg p-1 transition-transform active:scale-95"
            aria-label="BharatVista Home"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white/95 p-0.5 shadow-lg shadow-black/40 ring-1 ring-amber-400/30 group-hover:ring-[#EA580C]/80 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="BharatVista Official Logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 48px, 56px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white drop-shadow-md group-hover:text-amber-300 transition-colors">
                Bharat<span className="text-[#EA580C]">Vista</span>
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.25em] text-amber-200/80 uppercase font-medium">
                हर सफ़र, एक नई कहानी
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onPlanTripClick}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/30 hover:shadow-[#EA580C]/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-white animate-spin-slow" />
              <span>Plan My Trip</span>
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#EA580C] cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-amber-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[76px] z-40 bg-[#061727]/98 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl md:hidden flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/95 p-0.5">
                <Image
                  src="/logo.png"
                  alt="BharatVista"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-serif font-bold text-white">
                  Bharat<span className="text-[#EA580C]">Vista</span>
                </p>
                <p className="text-xs text-amber-300">
                  हर सफ़र, एक नई कहानी
                </p>
              </div>
            </div>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-zinc-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onPlanTripClick) onPlanTripClick();
                }}
                className="w-full py-3.5 rounded-xl font-semibold text-center text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] shadow-lg shadow-[#EA580C]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                <span>Plan My Trip</span>
              </button>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-sm font-medium text-center text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Speak to a Destination Specialist</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

