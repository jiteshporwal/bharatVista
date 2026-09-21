/**
 * Centralized Configuration for BharatVista Travel Expeditions
 *
 * All pricing, promotional copy, contact numbers, pickup schedules,
 * dynamic weekend calculations, itinerary, and experiences are defined here.
 */

export interface PickupPointConfig {
  id: string;
  name: string;
  time: string;
  landmark: string;
  svgX: number;
  svgY: number;
}

export interface ItineraryItem {
  time: string;
  title: string;
  category: "departure" | "breakfast" | "chai" | "heritage" | "lunch" | "craft" | "nature" | "aarti" | "return";
  description: string;
  highlight: string;
  image: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  time: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  tag: string;
}

export function getUpcomingWeekends(referenceDate: Date = new Date()): {
  value: string;
  label: string;
  day: "Saturday" | "Sunday";
}[] {
  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth();
  const todayDate = referenceDate.getDate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const weekends: { value: string; label: string; day: "Saturday" | "Sunday" }[] = [];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  for (let d = 1; d <= daysInMonth; d++) {
    const checkDate = new Date(currentYear, currentMonth, d);
    const dayOfWeek = checkDate.getDay(); // 0 = Sunday, 6 = Saturday

    if (dayOfWeek === 6 || dayOfWeek === 0) {
      if (d >= todayDate) {
        const dayType = dayOfWeek === 6 ? "Saturday" : "Sunday";
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const label = `${dayType}, ${d} ${monthNames[currentMonth]} ${currentYear}`;
        weekends.push({ value: dateStr, label, day: dayType });
      }
    }
  }

  // If late in the month with fewer than 2 weekends remaining, include next month's early weekends
  if (weekends.length < 2) {
    const nextMonth = (currentMonth + 1) % 12;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
    for (let d = 1; d <= Math.min(14, daysInNextMonth); d++) {
      const checkDate = new Date(nextYear, nextMonth, d);
      const dayOfWeek = checkDate.getDay();
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        const dayType = dayOfWeek === 6 ? "Saturday" : "Sunday";
        const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const label = `${dayType}, ${d} ${monthNames[nextMonth]} ${nextYear}`;
        weekends.push({ value: dateStr, label, day: dayType });
      }
    }
  }

  return weekends;
}

export const TRIP_CONFIG = {
  brandName: "BharatVista",
  tagline: "हर सफ़र एक नई कहानी",
  customerMessage: {
    lead: "See how your weekend could unfold.",
    sub: "A little masti. A little dhamal. A lot of memories.",
  },

  // Contact Information
  phones: {
    primary: "7415905851",
    secondary: "6266612108",
    contact1: "7415905851",
    contact2: "6266612108",
    whatsapp: "8109014546",
  },
  whatsappLink: "https://wa.me/918109014546?text=Hi%20BharatVista%2C%20I%20want%20to%20know%20more%20about%20the%20trip.",

  // Pricing & Commercials
  price: 699,
  currency: "₹",
  priceUnit: "/ person",
  inclusionsSummary: "Includes luxury coach travel, Rau breakfast, Jam Gate chai & traditional Malwa lunch",

  // Group Discount Offer
  groupOffer: {
    persons: 4,
    discountPercent: 20,
    title: "Group Booking Offer",
    badge: "Get 20% OFF when you book for 4 people.",
    contactPrompt: "4+ travellers? Contact us for the best group discount.",
  },

  // Promotional Campaign
  promotionalGiftCount: 5,
  promotionalGiftText: "First 5 customers get an exclusive gift from BharatVista.",
  promotionalGiftSubtext: "Early explorer gift pack & framed journey souvenir included with the first 5 confirmed bookings.",

  // Indore Pickups (Explicit Schedule)
  pickupPoints: [
    {
      id: "vijay-nagar",
      name: "Vijay Nagar",
      time: "06:45 AM",
      landmark: "Vijay Nagar Square",
      svgX: 496,
      svgY: 395,
    },
    {
      id: "bengali-sq",
      name: "Bengali Square",
      time: "07:00 AM",
      landmark: "Bengali Square Flyover",
      svgX: 518,
      svgY: 418,
    },
    {
      id: "teen-imli",
      name: "Teen Imli",
      time: "07:10 AM",
      landmark: "Teen Imli Bridge",
      svgX: 500,
      svgY: 442,
    },
    {
      id: "it-park",
      name: "IT Park",
      time: "07:18 AM",
      landmark: "IT Park Main Gate",
      svgX: 478,
      svgY: 456,
    },
    {
      id: "rajiv-gandhi",
      name: "Rajiv Gandhi",
      time: "07:25 AM",
      landmark: "Rajiv Gandhi Square",
      svgX: 462,
      svgY: 474,
    },
  ] as PickupPointConfig[],

  // Full Day Itinerary (Chronological Order)
  itinerary: [
    {
      time: "07:00 AM",
      title: "Departure from Indore",
      category: "departure",
      description: "Friends gather, seats are settled, and the coach rolls south. The journey begins.",
      highlight: "The road south opens up",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    },
    {
      time: "07:30 AM",
      title: "Rau Circle — Indori Nashta",
      category: "breakfast",
      description: "Hot Indori poha topped with ratlami sev, crispy samosa, sweet warm jalebi, and steaming cutting chai.",
      highlight: "Authentic Indori breakfast",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    },
    {
      time: "09:00 AM",
      title: "Jam Gate — Chai & Scenic Valley",
      category: "chai",
      description: "Perched high on the crest of the Vindhyachals. Steaming ginger tea in glass and breathtaking valley breeze.",
      highlight: "Misty mountain pass",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
    },
    {
      time: "11:00 AM",
      title: "Maheshwar — Ahilya Fort & Heritage",
      category: "heritage",
      description: "Walk through the heritage of Maheshwar, from Ahilya Fort and Rajwada to the timeless Narmada ghats.",
      highlight: "Royal Holkar citadel",
      image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      time: "01:30 PM",
      title: "Malwa Special Lunch — Dal Bafla",
      category: "lunch",
      description: "Traditional Dal Bafla served with slow-cooked dal, aromatic kadhi, ghee-dipped baflas, steamed rice, and golden churma ladoo.",
      highlight: "Traditional Malwa feast",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    },
    {
      time: "02:30 PM",
      title: "Maheshwari Handloom & Shopping",
      category: "craft",
      description: "See the craft behind Maheshwari textiles and explore the local handloom tradition shaped by Queen Ahilyabai.",
      highlight: "Centuries-old weaving",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      time: "04:00 PM",
      title: "Sahastradhara & Boat Ride",
      category: "nature",
      description: "Experience the sacred Narmada flowing through a thousand rocky volcanic channels with an exhilarating boat ride.",
      highlight: "Thousand-stream rapids",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    },
    {
      time: "06:00 PM",
      title: "Narmada Aarti & Sunset",
      category: "aarti",
      description: "Gather at the stone ghats for evening Narmada Aarti as the sky turns crimson and golden lamps reflect on the sacred waters.",
      highlight: "Golden hour reflection",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    },
    {
      time: "07:00 PM",
      title: "Return Journey toward Indore",
      category: "return",
      description: "Board the coach for a peaceful evening return. Music, shared laughs, and memories that last. Arrival by 8:30–9:00 PM.",
      highlight: "Safe drop at pickup points",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    },
  ] as ItineraryItem[],

  // Travel durations shown on map route badges
  durations: {
    indoreToRau: "~20 mins • Morning Assembly",
    rauToJamGate: "~45 mins • Mountain Pass Climb",
    jamGateToMaheshwar: "~1 hr • Narmada Valley Descent",
    maheshwarToShastradhara: "~20 mins • Sacred River Trail",
    shastradharaToIndore: "~2 hrs • Evening Return to Indore (8–9 PM)",
  },

  // The 8 Authentic BharatVista Experiences (4 per row on desktop)
  experiences: [
    {
      id: "indori-nashta",
      title: "Indori Nashta",
      time: "07:30 AM",
      shortDesc: "Poha, samosa, chai and the first delicious stop of the journey.",
      fullDesc: "No road trip in Malwa begins without real Indori nashta. At Rau Circle, steaming yellow poha garnished with crisp Ratlami sev, cilantro, and lemon juice is served alongside piping hot samosas, crispy golden jalebi, and adrak cutting chai.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
      tag: "Culinary Break",
    },
    {
      id: "jam-gate-chai",
      title: "Jam Gate Chai",
      time: "09:00 AM",
      shortDesc: "A short chai break with beautiful valley views.",
      fullDesc: "Perched 680 meters above sea level on the edge of the Vindhyachals, Jam Gate offers a crisp mountain breeze and panoramic views of the Narmada valley drop. A pause here with a warm glass of chai makes the entire week's fatigue melt away.",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      tag: "Mountain Pass",
    },
    {
      id: "ahilya-fort",
      title: "Ahilya Fort",
      time: "11:00 AM",
      shortDesc: "Explore Maheshwar's royal heritage and architecture.",
      fullDesc: "Step into the 18th-century sandstone fortress of Queen Ahilyabai Holkar. Walk through stone courtyards, intricately carved jharokhas, royal palanquins, and peaceful temple hallways overlooking the sacred river.",
      image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      tag: "Royal Heritage",
    },
    {
      id: "narmada-ghats",
      title: "Narmada Ghats",
      time: "12:00 PM",
      shortDesc: "Walk beside the river and experience the calm of Maheshwar.",
      fullDesc: "The wide stone steps of Ahilya Ghat descend majestically into the shimmering Narmada. Watch wooden boats glide by, listen to temple bells, and experience the timeless calm that makes Maheshwar unforgettable.",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      tag: "Riverside Sukoon",
    },
    {
      id: "dal-bafla",
      title: "Dal Bafla",
      time: "01:30 PM",
      shortDesc: "Enjoy a traditional Malwa-style Dal Bafla meal.",
      fullDesc: "A royal feast prepared with love: golden wheat baflas boiled and ember-baked, crushed and dipped in pure desi ghee, served with slow-simmered tuvar dal, spiced buttermilk kadhi, steamed rice, and sweet churma ladoo.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
      tag: "Traditional Feast",
    },
    {
      id: "maheshwari-handloom",
      title: "Maheshwari Handloom",
      time: "02:30 PM",
      shortDesc: "Discover the weaving tradition that makes Maheshwar famous.",
      fullDesc: "Rani Ahilyabai Holkar invited master weavers from across India in the 1700s to create lightweight, royal fabrics. See the traditional wooden pit looms clacking, touch the pure silk-cotton weaves, and explore authentic handloom creations.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
      tag: "Artisan Craft",
    },
    {
      id: "sahastradhara",
      title: "Sahastradhara",
      time: "04:00 PM",
      shortDesc: "Experience the Narmada flowing through the rocky landscape.",
      fullDesc: "Where legend says King Sahastrarjun's thousand arms held the river, the Narmada churns into a thousand foaming channels through ancient black volcanic rocks. A local boat ride through the cool currents is an unforgettable adventure.",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
      tag: "River Rapids",
    },
    {
      id: "sunset-aarti",
      title: "Sunset & Aarti",
      time: "06:00 PM",
      shortDesc: "End the day with the beauty of the Narmada at golden hour.",
      fullDesc: "As dusk settles over Malwa, brass lamps are lit across the stone steps of the ghats. The reverberation of evening conches and aarti songs over the glowing waters brings an emotional and peaceful close to the day.",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
      tag: "Evening Aarti",
    },
  ] as ExperienceItem[],

  // Sequential Thali Presentation steps for Maheshwar (Slow Food Cinema)
  thaliSequence: [
    { step: 1, name: "Kansa Thali Placed", detail: "Traditional bronze dining thali is placed" },
    { step: 2, name: "Slow-Cooked Dal Served", detail: "Rich tuvar dal tempered with desi ghee and hing" },
    { step: 3, name: "Ghee-Dipped Bafla Placed", detail: "Golden cracked wheat bafle immersed in pure desi ghee" },
    { step: 4, name: "Spiced Kadhi Served", detail: "Buttermilk kadhi slow-simmered with fenugreek" },
    { step: 5, name: "Steamed Basmati Rice", detail: "Long-grain fragrant rice served piping hot" },
    { step: 6, name: "Churma Ladoo Added", detail: "Handcrafted jaggery, cardamom and dry-fruit sweet" },
    { step: 7, name: "Accompaniments & Ghee", detail: "Chutney, salad, papad, and an extra swirl of pure ghee" },
    { step: 8, name: "Complete Malwa Special Feast", detail: "Served with warmth beside historic stone courtyards" },
  ],
};
