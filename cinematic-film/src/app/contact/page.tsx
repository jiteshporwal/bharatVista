"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function ContactPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate contact submission
    await new Promise((res) => setTimeout(res, 600));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CONNECT WITH BHARATVISTA</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            We&apos;d Love to <span className="text-[#EA580C]">Hear From You</span>
          </h1>

          <p className="text-xs sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Have a question about the itinerary, pickups in Indore, group discounts, or custom bookings? Reach out directly to our trip captains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Contact Direct Numbers & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#0A2E4C]/50 border border-white/10 space-y-5 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Direct Contacts</h2>

              <div className="space-y-3.5 sm:space-y-4">
                {/* Primary Phone 1 */}
                <a
                  href={`tel:${TRIP_CONFIG.phones.contact1}`}
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EA580C]/20 border border-[#EA580C]/40 flex items-center justify-center text-[#EA580C] group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 block">Primary Helpline</span>
                    <span className="text-lg font-mono font-bold text-white group-hover:text-amber-300">
                      +91 {TRIP_CONFIG.phones.contact1}
                    </span>
                  </div>
                </a>

                {/* Secondary Phone 2 */}
                <a
                  href={`tel:${TRIP_CONFIG.phones.contact2}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 block">Trip Coordinator</span>
                    <span className="text-lg font-mono font-bold text-white group-hover:text-amber-300">
                      +91 {TRIP_CONFIG.phones.contact2}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={TRIP_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 block">WhatsApp Enquiry</span>
                    <span className="text-lg font-mono font-bold text-[#25D366] group-hover:underline">
                      +91 {TRIP_CONFIG.phones.whatsapp}
                    </span>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3 text-sm text-zinc-300 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                  <span>Departure & Pickups: Indore (Vijay Nagar, Bengali Sq, Teen Imli, IT Park, Rajiv Gandhi, Rau Circle)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Operations: 06:00 AM – 10:00 PM (Monday to Sunday)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact / Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-10 bg-[#0A2E4C]/30 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">Send Us a Message</h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light mb-6">
                Fill out the form below and we will get back to you within a few hours.
              </p>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-emerald-500/30 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-serif font-bold text-white">Message Received!</h3>
                  <p className="text-xs sm:text-sm text-zinc-300">
                    Thank you for writing to BharatVista. Our team will reach out to you shortly via phone or WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", mobile: "", email: "", message: "" });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white min-h-[40px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-base sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-base sm:text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-base sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                      Message / Enquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ask us anything about the trip schedule, food, booking details, or group discounts..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-base sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 min-h-[48px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sending Message..." : "Submit Enquiry"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <SeatBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

