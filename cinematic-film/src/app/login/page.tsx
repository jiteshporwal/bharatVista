"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Info, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LoginPage() {
  const router = useRouter();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Authentication failed. Please verify credentials.");
      }
    } catch {
      setErrorMessage("Network error occurred while signing in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>STAFF &amp; OPERATOR ACCESS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            BharatVista Portal
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 font-light">
            Internal console for trip coordinators, guides, and reservation managers.
          </p>
        </div>

        {/* Notice: No login needed for travellers */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3 text-xs text-amber-200">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Travellers Note:</strong> You do <em>not</em> need an account or login to book a seat with BharatVista. The journey is simple: choose your weekend, send your enquiry, and your seat is reserved.
          </p>
        </div>

        {/* Login Box */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#0A2E4C]/40 border border-white/15 shadow-2xl space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Username / Email
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                placeholder="admin@bharatvistatours.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-base sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-base sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] shadow-lg shadow-[#EA580C]/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 min-h-[48px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="text-xs text-amber-300 hover:underline cursor-pointer"
            >
              Want to book a seat instead? Click here (No login required)
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <SeatBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}
