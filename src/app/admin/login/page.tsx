"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Compass, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin/dashboard";

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
        // Successful login, navigate to dashboard
        router.push(redirectTo);
        router.refresh();
      } else {
        setErrorMessage(data.error || "Authentication failed. Please verify your credentials.");
      }
    } catch {
      setErrorMessage("Network connection error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] flex flex-col justify-between selection:bg-[#EA580C] selection:text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#EA580C]/10 via-[#0A2E4C]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="p-6 sm:px-12 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-amber-400/30 shadow-md group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="BharatVista Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="text-base font-serif font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>BharatVista</span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Admin
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono tracking-wider">
              MANAGEMENT CONSOLE
            </div>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-zinc-400 hover:text-amber-300 transition-colors flex items-center gap-1"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Return to Site</span>
        </Link>
      </header>

      {/* Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#0A2E4C]/40 border border-white/15 shadow-2xl backdrop-blur-md space-y-5 sm:space-y-6">
            {/* Title & Badge */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>AUTHORIZED ACCESS ONLY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Admin Sign In
              </h1>
              <p className="text-xs text-zinc-300 font-light">
                Sign in to manage tours, enquiries, bookings, and customer reservations.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email / Username */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email or Username</span>
                </label>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="admin@bharatvistatours.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-base sm:text-sm placeholder:text-zinc-500 transition-colors"
                />
              </div>

              {/* Password with Show/Hide Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase text-zinc-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Password</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 pr-11 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] focus:outline-none text-white text-base sm:text-sm placeholder:text-zinc-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-[11px] text-zinc-400">
                Direct booking? Travellers do not need to sign in.{" "}
                <Link href="/" className="text-amber-300 hover:underline">
                  Book directly here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-zinc-500 font-mono z-10">
        BharatVista Tours &amp; Travels • Secure Admin Console
      </footer>
    </div>
  );
}

