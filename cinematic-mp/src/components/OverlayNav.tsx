"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Compass, ChevronRight, Bus } from "lucide-react";

interface OverlayNavProps {
  onBookSeatClick?: () => void;
}

export default function OverlayNav({ onBookSeatClick }: OverlayNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The Journey", href: "#hero-journey" },
    { label: "Masti & Moj", href: "#masti-dhamal" },
    { label: "Coming Soon", href: "#coming-soon" },
    { label: "Solo Travellers", href: "#solo-traveller" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#061727]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
            : "bg-gradient-to-b from-[#061727]/95 via-[#061727]/40 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none rounded-lg p-1 group"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white p-0.5 shadow-lg ring-1 ring-amber-400/40 group-hover:ring-[#EA580C] transition-all">
              <Image
                src="/logo.png"
                alt="BharatVista Official Logo"
                fill
                priority
                sizes="(max-width: 768px) 48px, 56px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white drop-shadow">
                Bharat<span className="text-[#EA580C]">Vista</span>
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-amber-200/90 font-serif">
                हर सफ़र, एक नई कहानी
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA: Book Your Seat */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onBookSeatClick}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Bus className="w-4 h-4 text-white" />
              <span>Book Your Seat</span>
              <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full text-amber-200 font-mono">
                ₹700
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[74px] z-40 bg-[#061727]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 shadow-2xl md:hidden flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-zinc-200 hover:bg-white/10"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </a>
              ))}
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onBookSeatClick) onBookSeatClick();
              }}
              className="w-full py-3.5 rounded-xl font-semibold text-center text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] shadow-lg shadow-[#EA580C]/40 flex items-center justify-center gap-2 mt-2"
            >
              <Bus className="w-5 h-5" />
              <span>Book Your Seat • ₹700</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

