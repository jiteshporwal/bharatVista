import Link from "next/link";
import {
  Compass,
  MapPin,
  CalendarCheck,
  Inbox,
  Users,
  Film,
  Settings,
  ArrowLeft,
  Sparkles,
  Construction,
} from "lucide-react";

interface SectionConfig {
  title: string;
  description: string;
  icon: React.ElementType;
  expectedFeatures: string[];
}

const SECTION_MAP: Record<string, SectionConfig> = {
  tours: {
    title: "Tours & Circuits Management",
    description: "Create, edit, and organize BharatVista tour circuits, pricing packages, and daily schedules.",
    icon: Compass,
    expectedFeatures: [
      "Dynamic Tour creation (Title, Price, Itinerary steps)",
      "Departure schedules & seat capacity allocation",
      "Pickup & Drop-off route configuration",
    ],
  },
  destinations: {
    title: "Destinations & Sightseeing Hubs",
    description: "Manage locations, historic monuments, cultural moments, and photo spots across India.",
    icon: MapPin,
    expectedFeatures: [
      "Destination profiles (Indore, Jam Gate, Maheshwar, etc.)",
      "Key attractions & food moment highlights",
      "Geo-coordinates and interactive route stops",
    ],
  },
  bookings: {
    title: "Bookings & Reservations",
    description: "Dedicated reservations management, ticket generation, and passenger manifest tables.",
    icon: CalendarCheck,
    expectedFeatures: [
      "Seat reservation status manager (Confirmed, Paid, Cancelled)",
      "Passenger manifests with WhatsApp integration",
      "Boarding pass & receipt generation",
    ],
  },
  enquiries: {
    title: "Customer Inbound Enquiries",
    description: "Lead management pipeline for converting website inquiries into confirmed passengers.",
    icon: Inbox,
    expectedFeatures: [
      "Full lifecycle tracking: New → Contacted → Quotation Sent → Closed",
      "WhatsApp one-click chat with pre-filled reference code",
      "Notes & staff follow-up history",
    ],
  },
  customers: {
    title: "Customer & Traveller Directory",
    description: "Unified directory of past, current, and prospective travellers.",
    icon: Users,
    expectedFeatures: [
      "Repeat traveller history & loyalty tracking",
      "Contact database with phone, email, and preferences",
      "Export traveller list (CSV / Excel)",
    ],
  },
  media: {
    title: "Media & Drone Asset Library",
    description: "Asset manager for tour photographs, drone videos, and social reels.",
    icon: Film,
    expectedFeatures: [
      "Upload 4K drone reels & landscape posters",
      "Hero video switcher & preview gallery",
      "CDN asset optimization & thumbnail generation",
    ],
  },
  settings: {
    title: "Admin & Operations Settings",
    description: "System preferences, staff access control, and notification settings.",
    icon: Settings,
    expectedFeatures: [
      "Admin credentials and team permissions",
      "WhatsApp coordinator notification numbers",
      "Booking policy & group discount rules configuration",
    ],
  },
};

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const config = SECTION_MAP[section.toLowerCase()] || {
    title: `${section.charAt(0).toUpperCase() + section.slice(1)} Module`,
    description: "This management module is scheduled for implementation in the next phase.",
    icon: Construction,
    expectedFeatures: ["Scheduled for upcoming release"],
  };

  const Icon = config.icon;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-300 transition-colors font-mono"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Operations Dashboard</span>
      </Link>

      <div className="rounded-3xl p-8 sm:p-12 bg-[#0A2E4C]/30 border border-white/10 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
          <Icon className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>MODULE COMING IN NEXT PHASE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            {config.title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            {config.description}
          </p>
        </div>

        <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3">
          <div className="text-xs font-mono uppercase text-amber-300 tracking-wider font-semibold">
            Features Planned for this Section:
          </div>
          <ul className="space-y-2 text-xs text-zinc-300">
            {config.expectedFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#f97316] text-white text-xs font-semibold shadow-md shadow-[#EA580C]/30 transition-all"
          >
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

