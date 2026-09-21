"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bus, Volume2, VolumeX } from "lucide-react";
import { Bus, Menu, X } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

interface OverlayNavProps {
  onBookSeatClick?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export default function OverlayNav({
  onBookSeatClick,
  isMuted = false,
  onToggleMute,
}: OverlayNavProps) {
export default function OverlayNav({ onBookSeatClick }: OverlayNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#061727]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          ? "bg-[#061727]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-gradient-to-b from-[#061727]/95 via-[#061727]/40 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden bg-white p-0.5 shadow-xl ring-1 ring-amber-400/50 group-hover:ring-[#EA580C] transition-all">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-xl ring-1 ring-amber-400/50 group-hover:ring-[#EA580C] transition-all">
            <Image
              src="/logo.png"
              alt="BharatVista Logo"
              fill
              priority
              sizes="52px"
              sizes="48px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white drop-shadow">
              Bharat<span className="text-[#EA580C]">Vista</span>
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] text-amber-200/90 font-serif">
              हर सफ़र, एक नई कहानी
              {TRIP_CONFIG.tagline}
            </span>
          </div>
        </Link>

        {/* Right Actions: Sound Toggle + Book Your Seat Button */}
        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-200">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-amber-300 transition-colors">
            About Us
          </Link>
          <Link href="/#experiences" className="hover:text-amber-300 transition-colors">
            Experiences
          </Link>
          <Link href="/blog" className="hover:text-amber-300 transition-colors">
            Blog
          </Link>
          <Link href="/careers" className="hover:text-amber-300 transition-colors">
            Careers
          </Link>
          <Link href="/contact" className="hover:text-amber-300 transition-colors">
            Contact Us
          </Link>
        </nav>

        {/* Right Action: Single Primary CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Ambient Music Toggle */}
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-zinc-200 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
              aria-label={isMuted ? "Unmute Music" : "Mute Music"}
              title={isMuted ? "Unmute Music" : "Mute Music"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              )}
            </button>
          )}

          {/* Book Your Seat Button */}
          <button
            onClick={onBookSeatClick}
            className="relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Bus className="w-4 h-4 text-white" />
            <span>Book Your Seat</span>
            <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full text-amber-200 font-mono">
              ₹700
              ₹{TRIP_CONFIG.price}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-zinc-200 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061727]/98 border-b border-white/10 px-6 py-5 space-y-4 text-left backdrop-blur-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif text-white hover:text-amber-400 py-1"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif text-white hover:text-amber-400 py-1"
          >
            About Us
          </Link>
          <Link
            href="/#experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif text-white hover:text-amber-400 py-1"
          >
            8 Authentic Experiences
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif text-white hover:text-amber-400 py-1"
          >
            Maheshwar Story (Blog)
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif text-white hover:text-amber-400 py-1"
          >
            Careers (Join Our Team)
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-serif text-white hover:text-amber-400 py-1"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}

