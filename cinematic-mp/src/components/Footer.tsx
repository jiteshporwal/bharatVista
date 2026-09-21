import Image from "next/image";
import Link from "next/link";
import { Bus, MapPin, Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#02070e] text-zinc-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Logo (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 ring-1 ring-amber-400/40">
                <Image
                  src="/logo.png"
                  alt="BharatVista Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight">
                  Bharat<span className="text-[#EA580C]">Vista</span>
                </span>
                <span className="text-xs text-amber-300 block font-serif tracking-wider">
                  हर सफ़र, एक नई कहानी
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md">
              BharatVista doesn&apos;t just take you somewhere. It turns the journey
              into the story. Affordable, cinematic road trips connecting explorers
              across Central India and beyond.
            </p>

            <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
              <p>📍 Operational Hub: Indore, Madhya Pradesh</p>
              <p>✉️ Concierge: bookings@bharatvista.com</p>
            </div>
          </div>

          {/* Col 2: Current Itinerary (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Current Available Tour
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
          </div>

          {/* Col 3: Future Horizons (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Coming Soon
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>• Pachmarhi Queen of Satpura</li>
              <li>• Mandu Monsoon Romance</li>
              <li>• Kanha Tiger Corridor</li>
              <li>• Ujjain & Omkareshwar Jyotirlinga</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} BharatVista Tours & Travels. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Masti • Dhamal • Moj in</span>
            <span className="text-amber-400 font-serif font-semibold">Madhya Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
