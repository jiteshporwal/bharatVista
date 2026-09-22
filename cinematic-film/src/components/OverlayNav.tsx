"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bus, Menu, X, Phone, MessageCircle } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

interface OverlayNavProps {
  onBookSeatClick?: () => void;
  isLogoVisible?: boolean;
}

export default function OverlayNav({ onBookSeatClick, isLogoVisible: propLogoVisible }: OverlayNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollLogoVisible, setScrollLogoVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);
      if (scrolled) setScrollLogoVisible(true);
    };

    if (window.scrollY > 30) {
      setIsScrolled(true);
      setScrollLogoVisible(true);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLogoVisible = isScrolled || scrollLogoVisible || Boolean(propLogoVisible);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#061727]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5 sm:py-3"
          : "bg-gradient-to-b from-[#061727]/95 via-[#061727]/40 to-transparent py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tagline - single logo reveal coordination */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 sm:gap-3 group focus:outline-none transition-opacity duration-700 ${
            isLogoVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-label="BharatVista Home"
        >
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white p-0.5 shadow-xl ring-1 ring-amber-400/50 group-hover:ring-[#EA580C] transition-all shrink-0">
            <Image
              src="/logo.png"
              alt="BharatVista Logo"
              fill
              priority
              sizes="44px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-white drop-shadow">
              Bharat<span className="text-[#EA580C]">Vista</span>
            </span>
            <span className="hidden sm:block text-[10px] sm:text-xs tracking-[0.2em] text-amber-200/90 font-serif">
              {TRIP_CONFIG.tagline}
            </span>
          </div>
        </Link>

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

        {/* Right Action: Primary CTA & Touch-Friendly Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBookSeatClick}
            className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[40px] sm:min-h-[44px]"
          >
            <Bus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            <span>
              <span className="hidden xs:inline sm:hidden">Book • </span>
              <span className="hidden sm:inline">Book Your Seat • </span>
              <span className="xs:hidden">Book </span>
            </span>
            <span className="text-[11px] sm:text-xs bg-black/30 px-1.5 sm:px-2 py-0.5 rounded-full text-amber-200 font-mono">
              ₹{TRIP_CONFIG.price}
            </span>
          </button>

          {/* Mobile hamburger with minimum 44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white/10 text-zinc-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061727]/98 border-b border-white/10 px-5 py-6 space-y-4 text-sm font-medium animate-fadeIn shadow-2xl max-h-[85vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-amber-300 py-2 min-h-[44px] flex items-center"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-amber-300 py-2 min-h-[44px] flex items-center"
          >
            About Us
          </Link>
          <Link
            href="/#experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-amber-300 py-2 min-h-[44px] flex items-center"
          >
            8 Curated Experiences
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-amber-300 py-2 min-h-[44px] flex items-center"
          >
            Maheshwar Slow Travel Blog
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-amber-300 py-2 min-h-[44px] flex items-center"
          >
            Careers & Guides
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-200 hover:text-amber-300 py-2 min-h-[44px] flex items-center"
          >
            Contact Us
          </Link>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookSeatClick?.();
              }}
              className="w-full py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] flex items-center justify-center gap-2 shadow-lg min-h-[44px] cursor-pointer"
            >
              <Bus className="w-4 h-4" />
              <span>Book Your Seat • ₹{TRIP_CONFIG.price}</span>
            </button>

            <div className="flex items-center justify-center gap-4 pt-2 text-xs text-zinc-400">
              <a
                href={TRIP_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:underline min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp ({TRIP_CONFIG.phones.whatsapp})</span>
              </a>
              <a
                href={`tel:${TRIP_CONFIG.phones.contact1}`}
                className="flex items-center gap-1.5 text-amber-300 hover:underline min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
