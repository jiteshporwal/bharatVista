"use client";

import { useState, useRef, useEffect } from "react";
import { useState } from "react";
import OverlayNav from "@/components/OverlayNav";
import MasterCinematicHero from "@/components/MasterCinematicHero";
import SeatBookingModal from "@/components/SeatBookingModal";
import MastiDhamalMoj from "@/components/MastiDhamalMoj";
import ExperiencesSection from "@/components/ExperiencesSection";
import ItinerarySection from "@/components/ItinerarySection";
import ReviewsSection from "@/components/ReviewsSection";
import ComingSoonJourneys from "@/components/ComingSoonJourneys";
import SoloTraveller from "@/components/SoloTraveller";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function CinematicFilmHome() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and run continuous background audio track across all scenes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;
    audio.play().catch(() => {
      // Browser autoplay policy: wait for first user interaction
      const handleFirstInteraction = () => {
        audio.play().catch(() => {});
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);
      };
      window.addEventListener("click", handleFirstInteraction);
      window.addEventListener("keydown", handleFirstInteraction);
    });
  }, []);

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      {/* Continuous Independent Background Soundtrack */}
      <audio ref={audioRef} src="/cinematic_music.mp3" loop preload="auto" />

      {/* Transparent Floating Overlay Header */}
      <OverlayNav
        onBookSeatClick={() => setBookingModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main>
        {/* Master Cinematic Travel Film Hero */}
        <MasterCinematicHero
          onBookSeatClick={() => setBookingModalOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
        <MasterCinematicHero onBookSeatClick={() => setBookingModalOpen(true)} />

        {/* Section 1: Masti • Dhamal • Moj */}
        <MastiDhamalMoj />
        {/* Section 1: The 8 Authentic BharatVista Experiences */}
        <ExperiencesSection onBookSeatClick={() => setBookingModalOpen(true)} />

        {/* Section 2: More Journeys Are Coming (Pachmarhi, Mandu, Kanha) */}
        <ComingSoonJourneys />
        {/* Section 2: Complete Curated Timeline & Route */}
        <ItinerarySection onBookSeatClick={() => setBookingModalOpen(true)} />

        {/* Section 3: Travelling Solo? You don't have to travel alone */}
        <SoloTraveller />
        <SoloTraveller onBookSeatClick={() => setBookingModalOpen(true)} />

        {/* Section 4: Final Call to Action */}
        {/* Section 4: Customer Reviews (Zero Fake Social Proof) */}
        <ReviewsSection />

        {/* Section 5: More Journeys Are Coming (Pachmarhi, Mandu, Kanha) */}
        <ComingSoonJourneys />

        {/* Section 6: Final Call to Action */}
        <FinalCTA onBookSeatClick={() => setBookingModalOpen(true)} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Seat Booking Modal */}
      <SeatBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}
