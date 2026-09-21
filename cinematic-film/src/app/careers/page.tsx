"use client";

import { useState } from "react";
import { Briefcase, CheckCircle2, ArrowRight, X, Send, Sparkles, Heart, Compass, MapPin } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

interface RoleDetails {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const ROLES: RoleDetails[] = [
  {
    id: "travel-guide",
    title: "Travel Guide",
    department: "Field Experience",
    location: "Indore / On-Trip Routes",
    type: "Weekend / Contract",
    salary: "Negotiable",
    description:
      "Help travellers experience the destination beyond the usual tourist checklist. You bring destinations alive through historical anecdotes, local culture, warmth, and high positive energy.",
    responsibilities: [
      "Guide travellers through historical highlights at Jam Gate, Ahilya Fort, and Sahastradhara",
      "Explain the architectural, religious, and cultural legacy of Maheshwar and the Narmada",
      "Maintain vibrant group energy, facilitating camaraderie, songs, and laughter",
      "Assist during sightseeing, ensuring safety guidelines are followed along river ghats and boats",
      "Coordinate directly with the trip captain and coach driver for seamless timing",
      "Help maintain a welcoming, respectful, and safe travel environment for all travellers",
    ],
    requirements: [
      "Excellent communication skills with an approachable, friendly personality",
      "Deep passion for and knowledge of Madhya Pradesh's culture and heritage preferred",
      "Comfortable speaking in front of small and medium groups (20–40 travellers)",
      "Fluent in Hindi and functional English",
      "Willingness to travel on weekends (Saturdays and Sundays)",
      "High emotional quotient, empathy, and proactive problem-solving attitude",
    ],
  },
  {
    id: "trip-coordinator",
    title: "Trip Coordinator",
    department: "Operations & Guest Relations",
    location: "Indore (Hybrid / On-Trip)",
    type: "Weekend / Full-time",
    salary: "Negotiable",
    description:
      "Be the operational backbone of BharatVista journeys. You ensure smooth onboarding, crystal-clear pickup communication, driver liaison, and five-star guest hospitality.",
    responsibilities: [
      "Coordinate traveller registrations and seat assignments for upcoming weekend journeys",
      "Communicate essential trip information, packing tips, and pickup confirmations via WhatsApp and phone",
      "Manage morning pickup coordination across Vijay Nagar, Bengali Square, Teen Imli, IT Park, and Rau Circle",
      "Assist the on-ground trip team throughout the day to ensure adherence to our curated schedule",
      "Help travellers promptly before and during the journey with questions and special requests",
      "Coordinate with coach drivers, restaurant staff for Dal Bafla lunch, and boat captains at Sahastradhara",
    ],
    requirements: [
      "Strong verbal and written communication skills",
      "Highly organized with meticulous attention to detail and punctuality",
      "Comfortable and prompt in managing enquiries via WhatsApp, phone calls, and spreadsheets",
      "Customer-friendly attitude with genuine hospitality warmth",
      "Active interest in group travel, hospitality, and customer delight",
    ],
  },
];

export default function CareersPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleDetails | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [applicant, setApplicant] = useState({
    name: "",
    mobile: "",
    email: "",
    experience: "",
    message: "",
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>JOIN THE BHARATVISTA TEAM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Build Meaningful Journeys <span className="text-[#EA580C]">With Us</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            We are creating an emotional, authentic Indian travel brand. If you love people, storytelling, and creating joyful road memories, explore our open positions.
          </p>
        </div>

        {/* Roles List */}
        <div className="space-y-8">
          {ROLES.map((role) => (
            <div
              key={role.id}
              className="rounded-3xl p-8 sm:p-10 bg-[#0A2E4C]/40 border border-white/10 hover:border-amber-400/30 transition-all shadow-xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-xs uppercase font-mono px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                      {role.department}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {role.location} • {role.type}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {role.title}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase text-zinc-400 block">Compensation</span>
                    <span className="text-lg font-mono font-bold text-amber-300">{role.salary}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setApplicationSuccess(false);
                    }}
                    className="px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
                {role.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    Key Responsibilities:
                  </h3>
                  <ul className="space-y-2">
                    {role.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    What We Look For:
                  </h3>
                  <ul className="space-y-2">
                    {role.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Application Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#061727] border border-amber-400/40 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase font-mono text-amber-400">Application Form</span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                Apply for {selectedRole.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Salary: {selectedRole.salary}</p>
            </div>

            {applicationSuccess ? (
              <div className="p-6 rounded-2xl bg-white/5 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-serif font-bold text-white">Application Sent!</h4>
                <p className="text-sm text-zinc-300">
                  Thank you, {applicant.name}. We have received your application for the {selectedRole.title} position. Our team will review your details and contact you via phone or WhatsApp.
                </p>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="px-6 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Patel"
                    value={applicant.name}
                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={applicant.mobile}
                      onChange={(e) => setApplicant({ ...applicant, mobile: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="ananya@example.com"
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Prior Travel / Hosting Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hosted campus trips, guided friends in MP, travel enthusiast"
                    value={applicant.experience}
                    onChange={(e) => setApplicant({ ...applicant, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                    Why do you want to join BharatVista? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us a little about yourself and your passion for travel..."
                    value={applicant.message}
                    onChange={(e) => setApplicant({ ...applicant, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
      <SeatBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

