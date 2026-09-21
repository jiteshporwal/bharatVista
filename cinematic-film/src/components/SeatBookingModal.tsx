"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Bus,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Gift,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Users,
  ShieldCheck,
} from "lucide-react";
import { TRIP_CONFIG, getUpcomingWeekends } from "@/data/tripConfig";

interface SeatBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SeatBookingModal({ isOpen, onClose }: SeatBookingModalProps) {
  const upcomingWeekends = getUpcomingWeekends();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState(upcomingWeekends[0]?.value || "");
  const [travellers, setTravellers] = useState(1);
  const [pickupPoint, setPickupPoint] = useState(TRIP_CONFIG.pickupPoints[0].id);
  const [showCustomPickup, setShowCustomPickup] = useState(false);
  const [customPickupRequest, setCustomPickupRequest] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<{
    bookingId: string;
    totalAmount: number;
  } | null>(null);

  const pricePerSeat = TRIP_CONFIG.price;
  const isFourPersonGroup = travellers >= 4;
  const baseTotal = travellers * pricePerSeat;
  const discountAmount = isFourPersonGroup ? Math.round(baseTotal * 0.2) : 0;
  const finalPrice = baseTotal - discountAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          email: email.trim() || undefined,
          travellers,
          pickupPoint,
          customPickupRequest: showCustomPickup ? customPickupRequest.trim() : undefined,
          travelDate,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setBookingResponse({
          bookingId: data.booking?.bookingId || `BV-${Math.floor(100000 + Math.random() * 900000)}`,
          totalAmount: finalPrice,
        });
        setIsSubmitted(true);
      } else {
        alert(data.error || "Failed to submit enquiry. Please check mobile number.");
      }
    } catch {
      // Fallback offline support
      setBookingResponse({
        bookingId: `BV-${Date.now().toString().slice(-6)}`,
        totalAmount: finalPrice,
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBookingResponse(null);
    onClose();
  };

  const selectedPickupObj =
    TRIP_CONFIG.pickupPoints.find((p) => p.id === pickupPoint) ||
    TRIP_CONFIG.pickupPoints[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl bg-[#061727] border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden text-white"
          >
            {/* Header Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {/* Title & Promotional Banner */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>BOOK YOUR SLOT • ₹{TRIP_CONFIG.price}/PERSON</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    Book Your BharatVista Seat
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                    Indore → Rau Circle (Nashta) → Jam Gate (Chai) → Maheshwar (Dal Bafla) → Sahastradhara → Return by 8:30–9:00 PM
                  </p>

                  {/* Group Discount & Exclusive Gift Banner */}
                  <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-transparent border border-amber-400/30 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div className="text-xs text-zinc-200">
                      <span className="font-bold text-amber-300">
                        {TRIP_CONFIG.promotionalGiftText}
                      </span>{" "}
                      {TRIP_CONFIG.groupOffer.badge}
                    </div>
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                    />
                  </div>

                  {/* Mobile Number - REQUIRED */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mobile Number (WhatsApp) * (Required)</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 81090 14546"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                    />
                  </div>

                  {/* Email - OPTIONAL */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Email Address (Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                    />
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Select Trip Date *</span>
                    </label>
                    <select
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#081f33] border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white"
                    >
                      {upcomingWeekends.map((w) => (
                        <option key={w.value} value={w.value} className="bg-[#061727] text-white">
                          {w.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pickup Point Selection */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Choose Pickup Point in Indore *</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {TRIP_CONFIG.pickupPoints.map((point) => (
                      <button
                        type="button"
                        key={point.id}
                        onClick={() => {
                          setPickupPoint(point.id);
                          setShowCustomPickup(false);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          pickupPoint === point.id && !showCustomPickup
                            ? "bg-[#EA580C]/20 border-[#EA580C] text-white shadow-md shadow-[#EA580C]/20"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs font-bold text-amber-300">{point.time}</div>
                        <div className="text-sm font-semibold">{point.name}</div>
                        <div className="text-[11px] text-zinc-400 truncate">{point.landmark}</div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Pickup Request toggle */}
                  <div className="mt-2.5">
                    <button
                      type="button"
                      onClick={() => setShowCustomPickup(!showCustomPickup)}
                      className="text-xs text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>+ Need a custom pickup along the route?</span>
                    </button>

                    {showCustomPickup && (
                      <input
                        type="text"
                        placeholder="e.g. Near C21 Mall or Silicon City gate"
                        value={customPickupRequest}
                        onChange={(e) => setCustomPickupRequest(e.target.value)}
                        className="mt-2 w-full px-4 py-2 rounded-xl bg-white/5 border border-amber-400/40 text-xs text-white placeholder:text-zinc-500"
                      />
                    )}
                  </div>
                </div>

                {/* Seat Count & Group Offer Calculation */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-300 block mb-1">
                      Number of Travellers
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTravellers(num)}
                          className={`w-9 h-9 rounded-xl font-mono text-sm font-bold transition-all cursor-pointer ${
                            travellers === num
                              ? "bg-[#EA580C] text-white shadow-md shadow-[#EA580C]/40"
                              : "bg-white/5 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    {travellers >= 4 && (
                      <span className="text-[11px] text-emerald-400 font-mono mt-1 inline-block">
                        ✓ 20% Group Discount Applied!
                      </span>
                    )}
                  </div>

                  {/* Price breakdown */}
                  <div className="text-right">
                    <div className="text-xs text-zinc-400 font-mono">
                      {travellers} × ₹{pricePerSeat}
                      {isFourPersonGroup && (
                        <span className="text-emerald-400"> - 20% off</span>
                      )}
                    </div>
                    <div className="text-2xl font-serif font-bold text-amber-300">
                      ₹{finalPrice}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-light">
                      All-Inclusive (AC coach + meals + guide)
                    </div>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-semibold text-base text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-xl shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Bus className="w-5 h-5" />
                  <span>{isSubmitting ? "Securing Your Seat..." : `Confirm Seat Enquiry • ₹${finalPrice}`}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : (
              /* Emotional Success Confirmation */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                    SEAT ENQUIRY REGISTERED
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-white">
                    See You on the Road, {name.split(" ")[0]}!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    We&apos;ve reserved your enquiry under reference{" "}
                    <span className="font-mono text-amber-300 font-bold">
                      {bookingResponse?.bookingId}
                    </span>
                    . Our Trip Coordinator will contact you on WhatsApp to confirm your boarding time.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Selected Pickup:</span>
                    <span className="text-white font-semibold">{selectedPickupObj.name} ({selectedPickupObj.time})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Total Amount:</span>
                    <span className="text-amber-300 font-bold font-mono">₹{bookingResponse?.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Early Explorer Status:</span>
                    <span className="text-emerald-400 font-semibold">Eligible for Exclusive Gift Pack</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/91${TRIP_CONFIG.phones.whatsapp}?text=Hi%20BharatVista%2C%20my%20booking%20reference%20is%20${bookingResponse?.bookingId}.%20Please%20confirm%20my%20seats.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-xs text-white bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Verify on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-zinc-300 bg-white/10 hover:bg-white/15"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
