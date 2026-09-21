"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Bus, Sparkles, Calendar, Users, MapPin } from "lucide-react";

interface SeatBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SeatBookingModal({ isOpen, onClose }: SeatBookingModalProps) {
  const [selectedSeat, setSelectedSeat] = useState<string>("04A (Window)");
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState("Saturday, 28 September");
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const PRICE_PER_PERSON = 700;
  const totalPrice = passengers * PRICE_PER_PERSON;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-xl w-full rounded-3xl overflow-hidden bg-[#0A2E4C] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 text-left text-white"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-xs font-semibold text-amber-300 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>1-Day Road Odyssey</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Book Your Seat
              </h3>
              <p className="text-xs text-zinc-300 pt-0.5">
                Indore → Jam Gate → Maheshwar → Shastradhara
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isBooked ? (
            <form onSubmit={handleConfirm} className="space-y-5">
              {/* Departure & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#061727]/80 border border-white/10 space-y-1">
                  <label className="text-xs text-amber-300 font-medium block">
                    Pick Travel Date
                  </label>
                  <select
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Saturday, 28 September" className="bg-[#061727]">
                      Saturday, 28 September
                    </option>
                    <option value="Sunday, 29 September" className="bg-[#061727]">
                      Sunday, 29 September
                    </option>
                    <option value="Saturday, 5 October" className="bg-[#061727]">
                      Saturday, 5 October
                    </option>
                    <option value="Sunday, 6 October" className="bg-[#061727]">
                      Sunday, 6 October
                    </option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-[#061727]/80 border border-white/10 space-y-1">
                  <label className="text-xs text-amber-300 font-medium block">
                    Travellers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                  >
                    <option value={1} className="bg-[#061727]">
                      1 Explorer (Solo)
                    </option>
                    <option value={2} className="bg-[#061727]">
                      2 Explorers
                    </option>
                    <option value={3} className="bg-[#061727]">
                      3 Explorers
                    </option>
                    <option value={4} className="bg-[#061727]">
                      4 Explorers (Group)
                    </option>
                  </select>
                </div>
              </div>

              {/* Seat Preference */}
              <div className="p-3 rounded-xl bg-[#061727]/80 border border-white/10 space-y-2">
                <label className="text-xs text-amber-300 font-medium block">
                  Select Coach Seat Position
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {["04A (Window)", "04B (Aisle)", "07A (Panoramic View)"].map(
                    (seat) => (
                      <button
                        type="button"
                        key={seat}
                        onClick={() => setSelectedSeat(seat)}
                        className={`p-2 rounded-lg font-medium border text-center transition-all ${
                          selectedSeat === seat
                            ? "bg-[#EA580C] text-white border-amber-300 shadow-md"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                        }`}
                      >
                        {seat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="p-3 rounded-xl bg-[#061727]/80 border border-white/10 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#EA580C]"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile Number"
                  required
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  className="p-3 rounded-xl bg-[#061727]/80 border border-white/10 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              {/* Price Summary Breakdown */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/15 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-300">
                  <span>
                    AC Coach Seat + Jam Gate Maggie/Chai + Dal Bafla Lunch:
                  </span>
                  <span className="font-mono">
                    {passengers} × ₹{PRICE_PER_PERSON}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg font-serif font-bold text-white pt-2 border-t border-white/10">
                  <span>Total All-Inclusive:</span>
                  <span className="text-[#EA580C] font-mono">₹{totalPrice}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-xl shadow-[#EA580C]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bus className="w-5 h-5" />
                <span>Confirm & Reserve Seat</span>
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-serif font-bold text-white">
                  Seat Reserved!
                </h4>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Congratulations, {passengerName || "Explorer"}! Your seat on the
                  BharatVista coach for <strong>{travelDate}</strong> is confirmed.
                  Pick your seat. Pack your bags. Let the journey begin!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-left max-w-sm mx-auto space-y-1.5 text-zinc-300">
                <p>
                  <strong>Route:</strong> Indore → Jam Gate → Maheshwar → Shastradhara
                </p>
                <p>
                  <strong>Seat:</strong> {selectedSeat}
                </p>
                <p>
                  <strong>Departure:</strong> 07:00 AM from Indore
                </p>
                <p>
                  <strong>Fare:</strong> ₹{totalPrice} (All meals & road trip included)
                </p>
              </div>

              <button
                onClick={() => {
                  setIsBooked(false);
                  onClose();
                }}
                className="px-8 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white shadow-lg cursor-pointer"
              >
                Back to Travel Story
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

