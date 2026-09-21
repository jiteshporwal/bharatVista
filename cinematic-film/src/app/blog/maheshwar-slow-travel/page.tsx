"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, Bus, MapPin, Sparkles, Heart } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";
import SeatBookingModal from "@/components/SeatBookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function MaheshwarBlogPost() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] overflow-x-hidden selection:bg-[#EA580C] selection:text-white">
      <OverlayNav onBookSeatClick={() => setBookingModalOpen(true)} />

      <main className="pt-28 pb-24">
        {/* Article Header Hero */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-6 pb-8 space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Journal</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>CULTURAL HERITAGE &amp; SLOW TRAVEL</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Maheshwar: Where the Narmada, Heritage &amp; Slow Travel Meet
            </h1>

            <p className="text-lg sm:text-xl font-serif text-amber-200/90 italic">
              A contemplative day-trip from Indore through the Vindhyachals, into the heart of Ahilyabai&apos;s quiet capital.
            </p>

            <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono pt-2 border-y border-white/10 py-3">
              <span>BharatVista Curations</span>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span>Indore Round-Trip Route</span>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="relative w-full h-[320px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl mb-12 border border-white/10">
            <Image
              src="/maheshwar.png"
              alt="Ahilya Fort over the Narmada Ghats"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-6 text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-mono">
              Ahilya Fort Ramparts overlooking the Sacred Narmada
            </span>
          </div>

          {/* Article Body Content */}
          <div className="prose prose-invert max-w-none text-zinc-200 text-base sm:text-lg leading-relaxed space-y-8 font-light">
            <p className="text-xl sm:text-2xl font-serif text-white leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#EA580C] first-letter:mr-3 first-letter:float-left">
              Most weekend trips from Indore begin with haste. Travellers pack cars, glance at navigation screens, and race against the clock. But the road heading south toward the Narmada valley asks for something entirely different: it asks you to slow down.
            </p>

            <p>
              Just two hours south of the bustling food lanes of 56 Dukaan lies Maheshwar — a town carved out of basalt stone, sacred water, and centuries of graceful Holkar governance. Here, the river does not rush violently; it spreads wide, mirroring temples, wooden chattris, and the slow rhythm of handloom shuttles.
            </p>

            {/* Section 1: The Mountain Threshold: Jam Gate */}
            <div className="my-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                1. The Mountain Threshold: Jam Gate
              </h2>
              <p>
                Before descending into the river valley, the road climbs into the Vindhyachal range. At its highest saddle sits <strong>Jam Gate</strong>, built in 1791 by Devi Ahilyabai Holkar as a fortified toll and outpost connecting the fertile Malwa plateau with the Nimar plains.
              </p>
              <div className="relative h-72 rounded-2xl overflow-hidden border border-white/10 my-6">
                <Image
                  src="/jamgate.png"
                  alt="Jam Gate Valley View"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              <p>
                Standing on the stone arch with a steaming glass of ginger-cardamom chai while morning fog drifts across the deep green valleys is not merely a rest stop — it is the moment you leave everyday anxieties behind.
              </p>
            </div>

            {/* Pull Quote */}
            <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#0A2E4C]/50 border-l-4 border-[#EA580C] text-lg sm:text-xl font-serif italic text-amber-200">
              &ldquo;Travelling should not feel like checking off a bucket list. It should feel like sitting on stone steps while the river whispers centuries of stories.&rdquo;
            </div>

            {/* Section 2: Ahilya Fort & The Philosophy of Simplicity */}
            <div className="my-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                2. Ahilya Fort: Power Rooted in Grace
              </h2>
              <p>
                Unlike Mughal palaces designed to display opulent extravagance, Ahilya Fort is an architectural marvel of dignity and understated balance. Devi Ahilyabai ruled an empire for three decades from this very complex, yet her personal throne room — the <em>Rajwada</em> — was modest and unadorned.
              </p>
              <p>
                As you walk across the stone courtyards, you notice intricately carved overhangs depicting marigolds, elephants, and peacocks carved out of durable local stone. Looking down from the ramparts onto the expansive Narmada ghats gives you an unmatched sense of stillness.
              </p>
            </div>

            {/* Section 3: The Clack of Handlooms */}
            <div className="my-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                3. The Living Heritage of Maheshwari Sarees
              </h2>
              <p>
                Tucked into the stone alleys adjacent to the fort, you will hear a rhythmic clattering: the beat of handloom shuttles. In the late 18th century, Ahilyabai invited master weavers from Surat, Malwa, and South India to design signature sarees that were lightweight yet regal.
              </p>
              <p>
                The weavers drew inspiration directly from the river architecture: the border patterns mimic the chevron ripples of the Narmada, fort brickwork, and floral chattri motifs. Stepping into a cooperative workshop and watching master artisans align pure silk warp with fine cotton weft connects you directly to living history.
              </p>
            </div>

            {/* Section 4: The Dal Bafla Ritual */}
            <div className="my-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                4. The Midday Feast: Malwa Dal Bafla
              </h2>
              <p>
                A journey through Malwa is incomplete without its defining culinary tradition. Unlike Rajasthan&apos;s bati, the Malwa <em>Bafla</em> is first boiled in turmeric-scented water until it floats, then baked over cow-dung or charcoal embers until golden and crisp, before being submerged in fragrant desi ghee.
              </p>
              <div className="relative h-72 rounded-2xl overflow-hidden border border-white/10 my-6">
                <Image
                  src="/dalbafla.png"
                  alt="Traditional Dal Bafla Feast"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              <p>
                Served with slow-cooked panchmel dal, spicy garlic chutney, sweet churma laddu, kadhi, and baingan bharta, it is a celebratory meal meant to be savored in good company.
              </p>
            </div>

            {/* Section 5: Sahastradhara & Sunset Aarti */}
            <div className="my-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                5. Sahastradhara: Where the River Splits Into a Thousand Streams
              </h2>
              <p>
                A short drive upstream from Maheshwar brings you to <strong>Sahastradhara</strong>, a geological wonder where volcanic rock formations shatter the broad Narmada into hundreds of roaring rapids. Legend tells of King Sahastrarjun stopping the river with a thousand arms; scientifically, it is a magnificent basalt canyon.
              </p>
              <div className="relative h-72 rounded-2xl overflow-hidden border border-white/10 my-6">
                <Image
                  src="/sahastradhara.png"
                  alt="Sahastradhara rock rapids on the Narmada"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              <p>
                Local boat captains steer skilled wooden boats between the calm channels. Sitting on the rock outcrop with cool spray in the air as the late afternoon sun turns the waters into molten amber is pure magic.
              </p>
            </div>

            {/* Section 6: How to Experience This in a Single Day */}
            <div className="my-12 p-8 rounded-3xl bg-[#0A2E4C]/60 border border-amber-400/30 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white">
                How to Experience Maheshwar the BharatVista Way
              </h3>
              <p className="text-sm sm:text-base text-zinc-300">
                You do not need an expensive weekend resort booking or private cab negotiations to experience this. BharatVista curates this entire day-trip from Indore every Saturday and Sunday for just <strong>₹{TRIP_CONFIG.price} per person</strong>:
              </p>
              <ul className="space-y-2 text-sm text-zinc-200">
                <li>• 06:45 AM: Pickup from Indore (Vijay Nagar, Bengali Sq, Teen Imli, IT Park, Rajiv Gandhi)</li>
                <li>• 07:30 AM: Fresh Indori poha &amp; chai breakfast at Rau Circle</li>
                <li>• 09:00 AM: Mountain pass views and cutting chai at Jam Gate</li>
                <li>• 11:00 AM: Guided walk through Ahilya Fort and Narmada Ghats</li>
                <li>• 01:30 PM: Authentic Dal Bafla thali feast</li>
                <li>• 02:30 PM: Handloom weaving tour</li>
                <li>• 04:00 PM: Scenic drive &amp; boat experience at Sahastradhara</li>
                <li>• 06:00 PM: Sunset reflection on the river &amp; Narmada Aarti</li>
                <li>• 07:00 PM: Comfortable return coach back to Indore by 8:30–9:00 PM</li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] shadow-xl shadow-[#EA580C]/40 flex items-center gap-2 cursor-pointer"
                >
                  <Bus className="w-4 h-4" />
                  <span>Reserve Your Seat • ₹{TRIP_CONFIG.price}</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <SeatBookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

