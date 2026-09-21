import Link from "next/link";
import Image from "next/image";
import Link from "next/link";
import { Bus, MapPin, Mail, Phone, Heart } from "lucide-react";
import { Phone, MessageCircle, MapPin, Mail, Shield, Heart } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function Footer() {
  return (
    <footer className="relative bg-[#02070e] text-zinc-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Logo (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 ring-1 ring-amber-400/40">
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
                  alt="BharatVista"
                  fill
                  sizes="48px"
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight">
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-white tracking-tight">
                  Bharat<span className="text-[#EA580C]">Vista</span>
                </span>
                <span className="text-xs text-amber-300 block font-serif tracking-wider">
                  हर सफ़र, एक नई कहानी
                <span className="text-[10px] text-amber-300 font-serif">
                  {TRIP_CONFIG.tagline}
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md">
              BharatVista doesn&apos;t just take you somewhere. It turns the journey
              into the story. Affordable, cinematic road trips connecting explorers
              across Central India and beyond.
            <p className="text-zinc-300 font-light leading-relaxed max-w-sm">
              Curated one-day road trips from Indore exploring the sacred waters, royal citadels, and rich culinary traditions of Madhya Pradesh.
            </p>

            <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
              <p>📍 Operational Hub: Indore, Madhya Pradesh</p>
              <p>✉️ Concierge: bookings@bharatvista.com</p>
            <div className="pt-1 text-[11px] text-zinc-400 space-y-1">
              <p>Indore • Rau Circle • Jam Gate • Maheshwar • Sahastradhara</p>
              <p className="text-amber-300/80 italic font-serif">
                Masti. Dhamal. Sukoon. Aur ek kahani jo yaad rahe.
              </p>
            </div>
          </div>

          {/* Col 2: Current Itinerary (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Current Available Tour
          {/* Quick Links */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-bold">
              Explore
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-zinc-300">
              <div className="font-bold text-[#EA580C]">
                Indore Day Odyssey • ₹700
              </div>
              <p>• Stop 1: Indore (07:00 AM)</p>
              <p>• Stop 2: Jam Gate (Maggie & Chai)</p>
              <p>• Stop 3: Maheshwar (Dal Bafla Lunch)</p>
              <p>• Stop 4: Shastradhara Rapids</p>
            </div>
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
                  Careers & Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Future Horizons (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Coming Soon
          {/* Legal Policies */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-bold">
              Policies
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>• Pachmarhi Queen of Satpura</li>
              <li>• Mandu Monsoon Romance</li>
              <li>• Kanha Tiger Corridor</li>
              <li>• Ujjain & Omkareshwar Jyotirlinga</li>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition-colors">
                  Terms & Conditions
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
                  Booking & Enquiry Policy
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
                href={`tel:${TRIP_CONFIG.phones.primary}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>+91 {TRIP_CONFIG.phones.primary}</span>
              </a>
              <a
                href={`tel:${TRIP_CONFIG.phones.secondary}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>+91 {TRIP_CONFIG.phones.secondary}</span>
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

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} BharatVista Tours & Travels. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Masti • Dhamal • Moj in</span>
            <span className="text-amber-400 font-serif font-semibold">Madhya Pradesh</span>
        {/* Operational Disclaimer Note */}
        <div className="mt-12 pt-6 border-t border-white/10 text-[11px] text-zinc-500 leading-relaxed text-left">
          <p>
            * Operational Notice: Trip schedules, pickup times, weather conditions, road routes, boat rides and activities may be adjusted when operationally necessary to prioritize traveller safety and comfort.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} BharatVista. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-zinc-300 transition-colors">
              Staff / Admin Portal
            </Link>
            <span>•</span>
            <span>Made with pride in Madhya Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
