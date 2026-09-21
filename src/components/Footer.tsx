import Image from "next/image";
import Link from "next/link";
import { Compass, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#02070e] text-zinc-400 border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Logo (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white/95 p-0.5 ring-1 ring-amber-400/30">
                <Image
                  src="/logo.png"
                  alt="BharatVista Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight">
                  Bharat<span className="text-[#EA580C]">Vista</span>
                </span>
                <span className="text-xs text-amber-300 block font-serif tracking-widest">
                  हर सफ़र, एक नई कहानी
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              BharatVista crafts ultra-premium, bespoke travel odysseys across India.
              We believe in conscious exploration, respectful cultural immersion,
              and memories that endure for lifetimes.
            </p>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EA580C]" />
                <span>New Delhi • Jaipur • Kochi • Leh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#EA580C]" />
                <span>concierge@bharatvista.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#explore" className="hover:text-white transition-colors">By Soul / Themes</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Iconic Landscapes</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Private Moments</a></li>
              <li><a href="#stories" className="hover:text-white transition-colors">Editorial Chronicles</a></li>
              <li><a href="#journeys" className="hover:text-white transition-colors">Curated Itineraries</a></li>
            </ul>
          </div>

          {/* Col 3: Signature Regions (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Signature Regions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#destinations" className="hover:text-white transition-colors">The Himalayan Crown (Ladakh)</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Royal Marwar & Thar Desert</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Bundelkhand (Khajuraho & Orchha)</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Emerald Backwaters of Malabar</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Sacred Ghats of Varanasi</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Promise (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Our Promise
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>• 100% Bespoke Crafting</li>
              <li>• 24/7 On-Ground Concierge</li>
              <li>• Verified Heritage Haveli Stays</li>
              <li>• Transparent Itineraries</li>
              <li>• Sustainable Tourism Pledge</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} BharatVista Tours & Travels. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with devotion for</span>
            <span className="text-amber-400 font-serif font-semibold">Incredible India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

