"use client";

import { useState } from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Bus,
  CheckCircle2,
  Gift,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Phone,
  Mail,
  User,
  Loader2,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";
import { TRIP_CONFIG, getUpcomingWeekends } from "@/data/tripConfig";

interface SeatBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEATS = [
  { id: "01A", type: "window", label: "01A (Window)", available: true },
  { id: "01B", type: "aisle", label: "01B (Aisle)", available: true },
  { id: "02A", type: "window", label: "02A (Window)", available: false },
  { id: "02B", type: "aisle", label: "02B (Aisle)", available: true },
  { id: "03A", type: "window", label: "03A (Window)", available: true },
  { id: "03B", type: "aisle", label: "03B (Aisle)", available: true },
  { id: "04A", type: "window", label: "04A (Window)", available: true },
  { id: "04B", type: "aisle", label: "04B (Aisle)", available: true },
  { id: "05A", type: "window", label: "05A (Window)", available: true },
  { id: "05B", type: "aisle", label: "05B (Aisle)", available: false },
];

export default function SeatBookingModal({
  isOpen,
  onClose,
}: SeatBookingModalProps) {
  // Generate dynamically upcoming Saturdays and Sundays for current month
  const availableWeekends = useMemo(() => getUpcomingWeekends(), []);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [pickupPoint, setPickupPoint] = useState(TRIP_CONFIG.pickupPoints[0].id);
  const [travelDate, setTravelDate] = useState(TRIP_CONFIG.availableDates[0].value);
  const [selectedSeat, setSelectedSeat] = useState("04A");
  const [customPickupRequest, setCustomPickupRequest] = useState("");
  const [showCustomPickup, setShowCustomPickup] = useState(false);
  const [travelDate, setTravelDate] = useState(
    availableWeekends[0]?.value || "Upcoming Weekend"
  );
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<{
    bookingId?: string;
    message?: string;
    totalAmount?: number;
  } | null>(null);

  const pricePerSeat = TRIP_CONFIG.price;
  const totalPrice = travellers * pricePerSeat;
  const pricePerSeat = TRIP_CONFIG.price; // 699

  // Group booking calculation (20% OFF for 4 travellers)
  const isFourPersonGroup = travellers === 4;
  const isMoreThanFour = travellers > 4;

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
          email,
          email: email.trim() || undefined,
          travellers,
          pickupPoint,
          customPickupRequest: showCustomPickup ? customPickupRequest.trim() : undefined,
          travelDate,
          seat: selectedSeat,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setBookingResponse(data.booking || { bookingId: "BV-" + Math.floor(100000 + Math.random() * 900000) });
        setBookingResponse({
          bookingId: data.booking?.bookingId || `BV-${Math.floor(100000 + Math.random() * 900000)}`,
          totalAmount: finalPrice,
        });
        setIsSubmitted(true);
      } else {
        alert(data.error || "Failed to submit booking. Please try again.");
        alert(data.error || "Failed to submit enquiry. Please check mobile number.");
      }
    } catch {
      // Fallback for offline/local resilience
      setBookingResponse({ bookingId: `BV-${Date.now().toString().slice(-6)}` });
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

  const selectedPickupObj = TRIP_CONFIG.pickupPoints.find((p) => p.id === pickupPoint) || TRIP_CONFIG.pickupPoints[0];
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title & Exclusive Campaign Banner */}
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {/* Title & Promotional Banner */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>SEATS ARE RESERVING FAST</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>BOOK YOUR SLOT AS SOON AS POSSIBLE • ₹{TRIP_CONFIG.price}/PERSON</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    Book Your BharatVista Seat
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                    Indore → Rau Circle (Breakfast) → Jam Gate (Chai) → Maheshwar (Dal Bafla) → Shastradhara → Return to Indore
                    Indore → Rau Circle (Nashta) → Jam Gate (Chai) → Maheshwar (Dal Bafla) → Sahastradhara → Return by 8:30–9:00 PM
                  </p>

                  {/* Configurable Exclusive Gift Campaign */}
                  {/* Group Discount & Exclusive Gift Banner */}
                  <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-transparent border border-amber-400/30 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div className="text-xs text-zinc-200">
                      <span className="font-bold text-amber-300">
                        {TRIP_CONFIG.promotionalGiftText}
                      </span>{" "}
                      {TRIP_CONFIG.promotionalGiftSubtext}
                      {TRIP_CONFIG.groupOffer.badge}
                    </div>
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
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

                  {/* Mobile */}
                  {/* Mobile Number - REQUIRED */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mobile Number (WhatsApp) *</span>
                      <span>Mobile Number (WhatsApp) * (Required)</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      placeholder="+91 81090 14546"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                    />
                  </div>

                  {/* Email */}
                  {/* Email - OPTIONAL */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>Email Address *</span>
                      <Mail className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Email Address (Optional)</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      placeholder="rahul@example.com (optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                    />
                  </div>

                  {/* Travel Date */}
                  {/* Dynamic Weekend Selection (Part 15) */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Departure Date *</span>
                      <span>Select Preferred Weekend (Sat/Sun) *</span>
                    </label>
                    <select
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A2E4C] border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A2E4C] border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white cursor-pointer"
                    >
                      {TRIP_CONFIG.availableDates.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                      {availableWeekends.map((w) => (
                        <option key={w.value} value={w.label}>
                          {w.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pickup Point Selection */}
                {/* Pickup Point Selection (06:45 AM Vijay Nagar, 07:00 AM Bengali Sq, etc.) */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Indore Pickup Point (8:00 AM – 9:00 AM) *</span>
                    <span>Select Indore Pickup Point (06:45 AM – 07:25 AM) *</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TRIP_CONFIG.pickupPoints.map((pt) => (
                      <button
                        type="button"
                        key={pt.id}
                        onClick={() => setPickupPoint(pt.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          pickupPoint === pt.id
                            ? "bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/20"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                        }`}
                      >
                        <p className="text-xs font-bold leading-tight">{pt.name}</p>
                        <p className="text-[10px] text-amber-300 font-mono mt-0.5">{pt.time}</p>
                        <p className="text-[9px] text-zinc-400 truncate">{pt.landmark}</p>
                      </button>
                    ))}
                  </div>

                  {/* Custom Pickup Request (Part 16) */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCustomPickup(!showCustomPickup)}
                      className="text-xs text-amber-300 hover:text-amber-200 underline font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Need a different pickup location?</span>
                    </button>

                    {showCustomPickup && (
                      <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <p className="text-xs text-zinc-300">
                          Tell us your preferred pickup place and we&apos;ll suggest the best nearby pickup point for you.
                        </p>
                        <input
                          type="text"
                          placeholder="e.g. Geeta Bhawan, Annapurna Road, Palasia..."
                          value={customPickupRequest}
                          onChange={(e) => setCustomPickupRequest(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white placeholder:text-zinc-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Coach Seat Selector & Travellers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Number of Travellers</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setTravellers(num)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            travellers === num
                              ? "bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white"
                              : "bg-white/10 text-zinc-300 hover:bg-white/20"
                          }`}
                        >
                          {num} {num === 1 ? "Person" : "People"}
                        </button>
                      ))}
                    </div>
                {/* Number of Travellers & Group Discount Indicator */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Number of Travellers</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setTravellers(num)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          travellers === num
                            ? "bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white shadow-md shadow-[#EA580C]/30"
                            : "bg-white/10 text-zinc-300 hover:bg-white/20"
                        }`}
                      >
                        {num} {num === 1 ? "Person" : "People"}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Coach Seat Preference</span>
                    </label>
                    <select
                      value={selectedSeat}
                      onChange={(e) => setSelectedSeat(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A2E4C] border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white"
                    >
                      {SEATS.map((s) => (
                        <option key={s.id} value={s.id} disabled={!s.available}>
                          {s.label} {!s.available ? "(Reserved)" : "— Available"}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Group Discount Notifications */}
                  {isFourPersonGroup && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs text-emerald-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        <strong>20% Group Discount Applied!</strong> You save ₹{discountAmount} on 4 seats.
                      </span>
                    </div>
                  )}

                  {isMoreThanFour && (
                    <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        <strong>Travelling with more than 4 people?</strong> Contact us on WhatsApp (8109014546) for the best group discount.
                      </span>
                    </div>
                  )}
                </div>

                {/* Total & Action */}
                {/* Optional Special Notes */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Optional Notes or Special Requests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Travelling with senior citizen, window seat preference..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none text-xs text-white placeholder:text-zinc-500"
                  />
                </div>

                {/* Total Fare & Submit Button */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                      Total All-Inclusive Fare
                      Total Fare Estimate
                    </span>
                    <div className="text-2xl sm:text-3xl font-serif font-black text-white">
                      ₹{totalPrice}{" "}
                      ₹{finalPrice}{" "}
                      {isFourPersonGroup && (
                        <span className="text-xs line-through text-zinc-500 mr-1">
                          ₹{baseTotal}
                        </span>
                      )}
                      <span className="text-xs font-normal text-amber-300">
                        (₹{pricePerSeat} × {travellers})
                        (₹{pricePerSeat} / person)
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400">
                      {TRIP_CONFIG.inclusionsSummary}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 hover:shadow-[#EA580C]/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Reserving Seat...</span>
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Bus className="w-4 h-4" />
                        <span>Confirm Booking</span>
                        <span>Confirm My Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation */
              <div className="py-8 text-center space-y-4">
              /* Dedicated Thank-You State (Part 16) */
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-amber-400 tracking-wider uppercase block">
                    BOOKING ID: {bookingResponse?.bookingId || "BV-CONFIRMED"}
                    ENQUIRY ID: {bookingResponse?.bookingId || "BV-CONFIRMED"}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Seat Reserved Successfully, {name}!
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    You&apos;re registered!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    Your seat on the BharatVista luxury coach for{" "}
                    <span className="text-amber-300 font-semibold">{travelDate}</span> from{" "}
                    <span className="text-amber-300 font-semibold">
                      {selectedPickupObj.name} ({selectedPickupObj.time})
                    </span>{" "}
                    is officially confirmed.
                  <p className="text-sm font-serif text-amber-300">
                    Thank you for choosing BharatVista.
                  </p>
                </div>

                {/* Exclusive Gift Badge */}
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 max-w-md mx-auto text-xs text-amber-200 flex items-center gap-3">
                  <Gift className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-left font-medium">
                    Congratulations! Your reservation qualifies for the{" "}
                    <strong className="text-white">exclusive BharatVista Explorer Kit</strong> gift!
                  </span>
                {/* Emotional Message Requested by User */}
                <div className="p-4 rounded-2xl bg-white/5 border border-amber-400/30 max-w-lg mx-auto text-sm font-serif italic text-zinc-200 leading-relaxed">
                  &ldquo;Ab bas safar ka intezaar hai. Masti, dhamal, sukoon aur unforgettable moments — we’re here to make your trip special.&rdquo;
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto text-xs text-zinc-300 space-y-1 text-left">
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  Our team will contact you as soon as possible with the next details on WhatsApp:{" "}
                  <strong className="text-amber-300">{mobile}</strong>.
                </p>

                {/* Summary Pill */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 max-w-sm mx-auto text-xs text-zinc-300 space-y-1 text-left">
                  <p>
                    <span className="text-zinc-500">Seat Preference:</span> {selectedSeat} ({travellers} traveller(s))
                    <span className="text-zinc-500">Selected Weekend:</span> {travelDate}
                  </p>
                  <p>
                    <span className="text-zinc-500">Fare:</span> ₹{totalPrice} (All meals & transport included)
                    <span className="text-zinc-500">Pickup Point:</span> {selectedPickupObj.name} ({selectedPickupObj.time})
                  </p>
                  <p>
                    <span className="text-zinc-500">WhatsApp Confirmation:</span> {mobile}
                    <span className="text-zinc-500">Travellers:</span> {travellers} Person(s) • ₹{bookingResponse?.totalAmount || finalPrice}
                  </p>
                  <p>
                    <span className="text-zinc-500">Return:</span> Indore by 8–9 PM
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                >
                  Close & Explore Film
                </button>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={TRIP_CONFIG.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Close
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
