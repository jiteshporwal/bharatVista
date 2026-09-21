export interface ItineraryStop {
  id: string;
  name: string;
  subtitle: string;
  type: "departure" | "food-break" | "cultural-lunch" | "destination";
  coordinates: string;
  elevation?: string;
  distanceFromStart: string;
  description: string;
  foodHighlight?: {
    title: string;
    items: string[];
    tagline: string;
    imageUrl: string;
    atmosphere: string;
  };
  landmarkImage: string;
}

export const MP_STOPS: ItineraryStop[] = [
  {
    id: "indore",
    name: "Indore",
    subtitle: "The Clean City & Culinary Capital",
    type: "departure",
    coordinates: "22.7196° N, 75.8577° E",
    elevation: "553 m",
    distanceFromStart: "0 km (07:00 AM Departure)",
    description:
      "Our BharatVista luxury coach departs from the heart of Malwa. Friends gather, chai is poured, and the road south begins.",
    landmarkImage:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "jam-gate",
    name: "Jam Gate",
    subtitle: "The Mountain Gateway of the Vindhyachals",
    type: "food-break",
    coordinates: "22.3683° N, 75.7675° E",
    elevation: "680 m",
    distanceFromStart: "52 km from Indore",
    description:
      "Perched high on the crest of the Vindhyachal range. Cool morning breeze, panoramic valley vistas, and the iconic roadside breakfast.",
    foodHighlight: {
      title: "Chai + Steaming Maggie Break",
      items: ["Hot Masala Maggie", "Ginger Adrak Chai in Glass", "Crisp Mountain Breeze"],
      tagline: "A little break. A lot of memories. Chai. Maggie. Mountains.",
      imageUrl:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
      atmosphere: "Overlooking the misty Malwa drop into the Narmada valley",
    },
    landmarkImage:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "maheshwar",
    name: "Maheshwar",
    subtitle: "The Queen's Citadel on the Holy Narmada",
    type: "cultural-lunch",
    coordinates: "22.1764° N, 75.5866° E",
    elevation: "155 m",
    distanceFromStart: "91 km from Indore",
    description:
      "Seat of the revered Queen Ahilyabai Holkar. Soaring sandstone ghats, master handloom weavers, and an authentic royal Malwa lunch.",
    foodHighlight: {
      title: "Traditional Madhya Pradesh Lunch",
      items: ["Ghee-Dipped Dal Bafla", "Rich Kadhi", "Fragrant Rice", "Golden Churma Ladoo"],
      tagline: "A taste of Madhya Pradesh. Tradition served with every journey.",
      imageUrl:
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
      atmosphere: "Served with warmth beside historic stone courtyards",
    },
    landmarkImage:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "shastradhara",
    name: "Shastradhara",
    subtitle: "Where Narmada Splits Into a Thousand Streams",
    type: "destination",
    coordinates: "22.1812° N, 75.5122° E",
    elevation: "148 m",
    distanceFromStart: "98 km (Final Destination)",
    description:
      "White water churning through volcanic black rock formations. Legend says the river was held by a thousand arms of King Sahastrarjun.",
    landmarkImage:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80",
  },
];

export const COMING_SOON_JOURNEYS = [
  {
    id: "pachmarhi",
    title: "Pachmarhi — The Queen of Satpura",
    seasonTag: "Monsoon & Post-Monsoon Escape",
    tagline: "Misty pine ridges, thunderous waterfalls & canyon roads",
    description:
      "Travel deep into Madhya Pradesh's only hill station. Ancient cave shelters, emerald forest canopies, and Bee Falls in full monsoon vigor.",
    highlights: ["Bee Falls & Duchess Falls", "Dhoopgarh Highest Sunset Point", "Chauragarh Peak & Pine Glades", "BharatVista Mountain Coach"],
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mandu",
    title: "Mandu — The City of Joy",
    seasonTag: "Monsoon Romance & History",
    tagline: "Floating palaces, baobab trees & timeless Afghan arches",
    description:
      "Jahaz Mahal floating between two twin lakes under dramatic monsoon clouds. The legendary romantic poetry of Baz Bahadur and Rani Roopmati.",
    highlights: ["Jahaz Mahal & Hindola Mahal", "Roopmati Pavilion Narmada View", "Ancient Malwa Baobab Groves", "Heritage Storyteller Tour"],
    imageUrl:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kanha",
    title: "Kanha — Heart of the Jungle Book",
    seasonTag: "Winter Wildlife Expedition",
    tagline: "Morning sal forest mist & the Royal Bengal Tiger",
    description:
      "Wide open meadows grazed by the rare hardground Barasingha deer, accompanied by India's finest wildlife naturalists.",
    highlights: ["Sal Forest Morning Open Safaris", "Barasingha Swamp Deer Sanctuary", "Sunset over Bamni Dadar", "Campfire Naturalist Tales"],
    imageUrl:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
  },
];

export const SOLO_TRAVEL_PILLARS = [
  {
    id: "meet-people",
    title: "Meet Real Friends",
    tagline: "Instant camaraderie",
    description:
      "Hop on the BharatVista bus solo and arrive with lifelong travel buddies. Our small-group road trips naturally bring friendly people together.",
  },
  {
    id: "curated",
    title: "Curated Experiences",
    tagline: "No hassle, pure exploration",
    description:
      "Forget route planning, taxi negotiations, and food hunts. Every roadside chai, heritage stop, and cultural meal is already thoughtfully arranged.",
  },
  {
    id: "easy-booking",
    title: "Simple Seat Booking",
    tagline: "Just ₹700 to start",
    description:
      "Book a single seat with zero single-supplement penalties. Transparent per-person pricing that makes weekend escapes truly effortless.",
  },
  {
    id: "shared-memories",
    title: "Shared Food & Stories",
    tagline: "Chai & Maggie taste better together",
    description:
      "Eating hot Maggie at Jam Gate or dipping hot Bafla in ghee at Maheshwar is 10x more fun when shared with fellow road trippers.",
  },
  {
    id: "travel-your-way",
    title: "Travel With Freedom",
    tagline: "Your space, your rhythm",
    description:
      "Enjoy the security of group travel while retaining total freedom to wander ghats, sit quietly by the river, or photograph ancient stone arches.",
  },
];

