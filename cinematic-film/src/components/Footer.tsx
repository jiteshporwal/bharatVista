import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, MapPin, Heart, Lock } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function Footer() {
  return (
    <footer className="bg-[#030d17] border-t border-white/10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 text-left">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white p-0.5 ring-1 ring-amber-400 shrink-0">
                <Image
                  src="/logo.png"
                  alt="BharatVista Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                  Bharat<span className="text-[#EA580C]">Vista</span>
                </span>
                <span className="text-[10px] text-amber-300 font-serif">
                  {TRIP_CONFIG.tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-sm">
              Curated one-day road trips from Indore exploring the sacred waters, royal citadels, and rich culinary traditions of Madhya Pradesh.
            </p>

            <div className="pt-1 text-[11px] text-zinc-400 space-y-1">
              <p>Indore • Rau Circle • Jam Gate • Maheshwar • Sahastradhara</p>
              <p className="text-amber-300/80 italic font-serif">
                Masti. Dhamal. Sukoon. Aur ek kahani jo yaad rahe.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-bold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Home Journey
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  8 Experiences
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Maheshwar Travel Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Careers &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-bold">
              Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/booking-policy" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Booking &amp; Enquiry Policy
                </Link>
              </li>
              <li>
                <Link href="/safety-guidelines" className="hover:text-amber-300 transition-colors py-1 inline-block">
                  Travel Safety Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-bold">
              Reach Out
            </h4>
            <div className="space-y-2.5 text-zinc-300 text-xs">
              <a
                href={`tel:${TRIP_CONFIG.phones.contact1}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors py-0.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                <span>+91 {TRIP_CONFIG.phones.contact1}</span>
              </a>
              <a
                href={`tel:${TRIP_CONFIG.phones.contact2}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors py-0.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                <span>+91 {TRIP_CONFIG.phones.contact2}</span>
              </a>
              <a
                href={TRIP_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold py-0.5"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp: {TRIP_CONFIG.phones.whatsapp}</span>
              </a>
              <div className="flex items-start gap-2 pt-1 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Disclaimer Note */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 text-center space-y-2">
          <p className="text-[10px] sm:text-[11px] text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            * Operational Note: Trip schedules, pickup points, weather conditions, road routes, and activities may change or be modified by the Trip Captain when operationally necessary to ensure traveller safety.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-zinc-500 text-[10px] sm:text-[11px]">
            <p>© {new Date().getFullYear()} BharatVista Road Expeditions. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
              <p>© {new Date().getFullYear()} BharatVista Road Expeditions. All rights reserved.</p>
              <span className="hidden sm:inline text-zinc-700">•</span>
              <Link
                href="/admin/login"
                className="text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1"
                title="Staff & Operator Console"
              >
                <Lock className="w-3 h-3 text-zinc-600" />
                <span>Admin Login</span>
              </Link>
            </div>
            <p className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-[#EA580C] fill-current" />
              <span>for travellers in Madhya Pradesh</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
