import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, MapPin, Heart, ShieldAlert } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function Footer() {
  return (
    <footer className="bg-[#030d17] border-t border-white/10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 ring-1 ring-amber-400">
                <Image
                  src="/logo.png"
                  alt="BharatVista Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-white tracking-tight">
                  Bharat<span className="text-[#EA580C]">Vista</span>
                </span>
                <span className="text-[10px] text-amber-300 font-serif">
                  {TRIP_CONFIG.tagline}
                </span>
              </div>
            </Link>

            <p className="text-zinc-300 font-light leading-relaxed max-w-sm">
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
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home Journey
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="hover:text-amber-300 transition-colors">
                  8 Experiences
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-300 transition-colors">
                  Maheshwar Travel Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-amber-300 transition-colors">
                  Careers &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
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
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-amber-300 transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-amber-300 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/booking-policy" className="hover:text-amber-300 transition-colors">
                  Booking &amp; Enquiry Policy
                </Link>
              </li>
              <li>
                <Link href="/safety-guidelines" className="hover:text-amber-300 transition-colors">
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
            <div className="space-y-2.5 text-zinc-300">
              <a
                href={`tel:${TRIP_CONFIG.phones.contact1}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>+91 {TRIP_CONFIG.phones.contact1}</span>
              </a>
              <a
                href={`tel:${TRIP_CONFIG.phones.contact2}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>+91 {TRIP_CONFIG.phones.contact2}</span>
              </a>
              <a
                href={TRIP_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
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
        <div className="mt-12 pt-6 border-t border-white/10 text-center space-y-2">
          <p className="text-[11px] text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            * Operational Note: Trip schedules, pickup points, weather conditions, road routes, and activities may change or be modified by the Trip Captain when operationally necessary to ensure traveller safety.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-zinc-500 text-[11px]">
            <p>© {new Date().getFullYear()} BharatVista Road Expeditions. All rights reserved.</p>
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
