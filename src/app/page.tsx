"use client";

import Navbar from "@/components/Navbar";
import HeroCinematic from "@/components/HeroCinematic";
import TripPlanner from "@/components/TripPlanner";
import ExploreIndia from "@/components/ExploreIndia";
import PlacesStayWithYou from "@/components/PlacesStayWithYou";
import Experiences from "@/components/Experiences";
import StorySection from "@/components/StorySection";
import JourneysMadeForYou from "@/components/JourneysMadeForYou";
import HowItBegins from "@/components/HowItBegins";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToPlanner = () => {
    const plannerEl = document.getElementById("trip-planner");
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#061727] text-[#FAFAF8] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      {/* Permanent Header Over Hero */}
      <Navbar onPlanTripClick={scrollToPlanner} />

      {/* Main Experiential Journey */}
      <main>
        {/* Full-Screen 30-Second Cinematic Travel Film Opening */}
        <HeroCinematic onPlanTripClick={scrollToPlanner} />

        {/* Compact Floating Custom Trip Planner */}
        <TripPlanner />

        {/* Section 1: Explore India By Soul */}
        <ExploreIndia />

        {/* Section 2: Places That Stay With You */}
        <PlacesStayWithYou />

        {/* Section 3: Experiences Beyond the Guidebook */}
        <Experiences />

        {/* Section 4: Every Place Has A Story */}
        <StorySection />

        {/* Section 5: Journeys Made For You */}
        <JourneysMadeForYou />

        {/* Section 6: How Your Journey Begins */}
        <HowItBegins />

        {/* Section 7: Concluding Cinematic CTA */}
        <FinalCTA onPlanTripClick={scrollToPlanner} />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
