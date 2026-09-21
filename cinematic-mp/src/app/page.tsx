"use client";

import { useState } from "react";
import OverlayNav from "@/components/OverlayNav";
import CinematicHero from "@/components/CinematicHero";
import SeatBookingModal from "@/components/SeatBookingModal";
import MastiDhamalMoj from "@/components/MastiDhamalMoj";
import ComingSoonJourneys from "@/components/ComingSoonJourneys";
import SoloTraveller from "@/components/SoloTraveller";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function CinematicHome() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      {/* Overlay Navigation Inside Hero */}
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      {/* Main Experiential Journey */}
      <main>
        {/* Full-Screen Interactive Travel Film Hero */}
        <CinematicHero onBookSeatClick={() => setBookingModalOpen(true)} />

        {/* Section 1: Masti • Dhamal • Moj */}
        <MastiDhamalMoj />

        {/* Section 2: More Journeys Are Coming (Coming Soon) */}
        <ComingSoonJourneys />

        {/* Section 3: Travelling Solo? */}
        <SoloTraveller />

        {/* Section 4: Concluding Final CTA */}
        <FinalCTA onBookSeatClick={() => setBookingModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Seat Booking Modal */}
      <SeatBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}

