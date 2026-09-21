"use client";

import { useState } from "react";
import OverlayNav from "@/components/OverlayNav";
import MasterCinematicHero from "@/components/MasterCinematicHero";
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

  return (
    <div className="relative min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      {/* Transparent Floating Overlay Header */}
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main>
        {/* Master Cinematic Travel Film Hero */}
        <MasterCinematicHero onBookSeatClick={() => setBookingModalOpen(true)} />

        {/* Section 1: The 8 Authentic BharatVista Experiences */}
        <ExperiencesSection onBookSeatClick={() => setBookingModalOpen(true)} />

        {/* Section 2: Complete Curated Timeline & Route */}
        <ItinerarySection onBookSeatClick={() => setBookingModalOpen(true)} />

        {/* Section 3: Travelling Solo? You don't have to travel alone */}
        <SoloTraveller onBookSeatClick={() => setBookingModalOpen(true)} />

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
