export interface Destination {
  id: string;
  name: string;
  tagline: string;
  region: string;
  coordinates: string;
  bestSeason: string;
  description: string;
  highlights: string[];
  imageUrl: string;
}

export interface TravelCategory {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  count: string;
}

export interface TravelExperience {
  id: string;
  title: string;
  location: string;
  duration: string;
  tag: string;
  description: string;
  imageUrl: string;
}

export interface EditorialStory {
  id: string;
  title: string;
  author: string;
  readTime: string;
  location: string;
  excerpt: string;
  imageUrl: string;
}

export interface CuratedTour {
  id: string;
  title: string;
  days: string;
  pace: string;
  season: string;
  route: string[];
  highlights: string[];
  imageUrl: string;
}

export const HERO_SCENES = [
  {
    id: "himalayas",
    title: "The Himalayan Crown",
    location: "Ladakh & Spiti Valley",
    coordinates: "34.1526° N, 77.5771° E",
    tagline: "Where the Earth whispers to the heavens",
    imageUrl:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "rajasthan",
    title: "The Golden Sands of Thar",
    location: "Jaisalmer & Thar Desert",
    coordinates: "26.9124° N, 75.7873° E",
    tagline: "Ancient forts rising like dreams from amber dunes",
    imageUrl:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "khajuraho",
    title: "Sculpted in Living Stone",
    location: "Khajuraho, Madhya Pradesh",
    coordinates: "24.8318° N, 79.9199° E",
    tagline: "A thousand years of devotion carved in sandstone",
    imageUrl:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "ladakh",
    title: "High Altitude Azure Horizons",
    location: "Pangong Tso & Nubra",
    coordinates: "33.7595° N, 78.6674° E",
    tagline: "Still waters reflecting eternal prayer flags",
    imageUrl:
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "mysuru",
    title: "The Palace of Hundred Thousand Lights",
    location: "Mysuru, Karnataka",
    coordinates: "12.3052° N, 76.6552° E",
    tagline: "Royal traditions woven in gold and sandalwood",
    imageUrl:
      "https://images.unsplash.com/photo-1600100397608-f010f443a533?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "kerala",
    title: "Emerald Waters & Whispering Palms",
    location: "Alleppey & Munnar Hills",
    coordinates: "9.4981° N, 76.3388° E",
    tagline: "Tranquility carved into backwater reflections",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=85",
  },
];

export const TRAVEL_CATEGORIES: TravelCategory[] = [
  {
    id: "heritage",
    title: "Royal Heritage & Palaces",
    subtitle: "Walk through living citadels, royal courts, and sacred architecture.",
    tag: "UNESCO & Regal Dynasties",
    imageUrl:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    count: "42 Curated Sites",
  },
  {
    id: "nature",
    title: "Misty Valleys & Backwaters",
    subtitle: "Lush tea plantations of the Western Ghats to serene tropical canals.",
    tag: "Pristine Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    count: "28 Sanctuaries",
  },
  {
    id: "wildlife",
    title: "Untamed Jungles & Royal Tigers",
    subtitle: "Tracking the majestic Royal Bengal Tiger through sal forests.",
    tag: "Wildlife Expeditions",
    imageUrl:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
    count: "15 National Reserves",
  },
  {
    id: "spiritual",
    title: "Sacred Ghats & Living Traditions",
    subtitle: "Dawn prayers upon the Ganges to silent Himalayan meditation gompas.",
    tag: "Spiritual Journeys",
    imageUrl:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    count: "35 Sacred Sanctums",
  },
  {
    id: "adventure",
    title: "High Mountain Passes & Desert Trails",
    subtitle: "Trans-Himalayan overland expeditions and Thar desert camel treks.",
    tag: "Extreme Frontiers",
    imageUrl:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
    count: "19 Expedition Routes",
  },
  {
    id: "culture",
    title: "Artisans, Crafts & Royal Banquets",
    subtitle: "Culinary heritage passed through centuries and master textile artisans.",
    tag: "Living Culture",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    count: "50+ Artisan Guilds",
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: "himalayas",
    name: "The Himalayas",
    tagline: "Roof of the Subcontinent",
    region: "Himachal & Uttarakhand",
    coordinates: "31.1048° N, 77.1734° E",
    bestSeason: "April – November",
    description:
      "Towering cedar forests, ancient wooden temples, and glacial streams feeding holy rivers. The Himalayas offer unmatched serenity for those who seek sanctuary above the clouds.",
    highlights: [
      "Cedar-flanked valleys of Kinnaur",
      "Spiritual trails of Rishikesh & Gangotri",
      "Private alpine meadow encampments",
      "Rare Himalayan wildlife sightings",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "rajasthan",
    name: "Royal Rajasthan",
    tagline: "Citadels of Gold and Amber",
    region: "Marwar & Mewar",
    coordinates: "26.9124° N, 75.7873° E",
    bestSeason: "October – March",
    description:
      "A living chronicle of warrior kings, stepwells carved like inverted pyramids, vibrant turbans against amber dunes, and private palaces converted into peerless heritage stays.",
    highlights: [
      "Exclusive evening access to Mehrangarh Fort",
      "Private tented camps in the Thar Desert",
      "Lake Pichola sunset yacht crossings",
      "Restored royal haveli stays in Shekhawati",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "khajuraho",
    name: "Khajuraho & Orchha",
    tagline: "Masterpieces in Stone & Time",
    region: "Bundelkhand, Madhya Pradesh",
    coordinates: "24.8318° N, 79.9199° E",
    bestSeason: "October – April",
    description:
      "A quiet paradise where 1,000-year-old Nagara stone temples celebrate earthly passion and celestial transcendence, alongside forgotten riverside palaces in medieval Orchha.",
    highlights: [
      "Sunrise temple architecture masterclass",
      "Private classical Indian dance beneath temple spires",
      "Sunset boat rides on the quiet Betwa River",
      "Panna National Park tiger safari proximity",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ladakh",
    name: "Leh & Ladakh",
    tagline: "The Land of High Passes",
    region: "Trans-Himalayan Desert",
    coordinates: "34.1526° N, 77.5771° E",
    bestSeason: "June – September",
    description:
      "Where prayer flags flutter against stark lapis lazuli skies, monastery trumpets resonate across barren valleys, and turquoise lakes sit cradled between 6,000-meter peaks.",
    highlights: [
      "Dawn chanting with monks at Thiksey Monastery",
      "Pangong Tso private luxury yurt glamping",
      "Traversing Khardung La at 17,982 ft",
      "Astronomy under India's darkest skies in Hanle",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "mysuru",
    name: "Mysuru & Malabar",
    tagline: "Fragrance of Sandalwood & Spice",
    region: "Southern Deccan & Malabar Coast",
    coordinates: "12.3052° N, 76.6552° E",
    bestSeason: "September – March",
    description:
      "From the stained-glass majesty of Mysore Palace illuminated by thousands of golden lights to the aromatic cardamom plantations and quiet backwaters of the Malabar coast.",
    highlights: [
      "Private royal heritage walk inside Mysore Palace",
      "Plantation planter's bungalow stays in Coorg",
      "Traditional Kalaripayattu martial art demonstrations",
      "Heritage steam train crossing the Nilgiri hills",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600100397608-f010f443a533?auto=format&fit=crop&w=1600&q=80",
  },
];

export const EXPERIENCES: TravelExperience[] = [
  {
    id: "alleppey-dawn",
    title: "Dawn Voyage on Alleppey's Secret Canals",
    location: "Vembanad Lake, Kerala",
    duration: "Full Day / Overnight",
    tag: "Bespoke Cruise",
    description:
      "Drift silently on a handcrafted wooden Kettuvallam through mist-shrouded lotus canals, accompanied by an onboard chef preparing traditional Malabar delicacies.",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "thar-stargazing",
    title: "Night Sky Astronomy over the Sam Dunes",
    location: "Thar Desert, Rajasthan",
    duration: "Overnight Experience",
    tag: "Desert Sanctuary",
    description:
      "Retire to a private desert encampment far beyond the reach of city lights, dining beside campfire melodies under an untamed tapestry of the Milky Way.",
    imageUrl:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "varanasi-aarti",
    title: "Private Sunset Bajra on the Ganges",
    location: "Dashashwamedh Ghat, Varanasi",
    duration: "Evening",
    tag: "Living Heritage",
    description:
      "Witness thousands of flickering earthen lamps and sacred Vedic mantras from the calm midstream waters of the holy river on an illuminated wooden boat.",
    imageUrl:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "corbett-safari",
    title: "Dawn Elephant Track in the Sal Corridors",
    location: "Jim Corbett National Park, Uttarakhand",
    duration: "2 Days / 1 Night",
    tag: "Wildlife Tracking",
    description:
      "Venture deep into the Ramganga riverbed alongside veteran naturalists to encounter wild elephant herds and the elusive Royal Bengal Tiger.",
    imageUrl:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
  },
];

export const EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: "khajuraho-stone",
    title: "The Living Stone: When Khajuraho Speaks to the Dawn",
    author: "BharatVista Editorial",
    readTime: "6 min read",
    location: "Madhya Pradesh",
    excerpt:
      "Centuries before modern architecture emerged, Chandela artisans transformed pink sandstone into sacred symphonies of life, balance, and devotion. Here is why dawn changes everything.",
    imageUrl:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ladakh-passes",
    title: "High Passes of Zanskar: Where Silence Becomes Geography",
    author: "Himalayan Expedition Guild",
    readTime: "8 min read",
    location: "Ladakh",
    excerpt:
      "Beyond the paved highways lies a realm where winter isolates ancient monasteries into timeless kingdoms of meditation. A chronicle of travelling into the pure Himalayan white.",
    imageUrl:
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "royal-kitchens",
    title: "Recipes of the Maharajas: The Lost Spices of Bundelkhand",
    author: "Heritage Culinary Archives",
    readTime: "5 min read",
    location: "Orchha & Gwalior",
    excerpt:
      "How royal hunting banquets gave birth to clay-pot smoking methods, slow-roasted wild game marinades, and hand-ground spices preserved strictly within family lineage.",
    imageUrl:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
  },
];

export const CURATED_TOURS: CuratedTour[] = [
  {
    id: "himalayan-sanctuary",
    title: "The Grand Himalayan Sanctuary",
    days: "12 Days / 11 Nights",
    pace: "Immersive & Relaxed",
    season: "May to October",
    route: ["Shimla", "Kinnaur", "Sangla Valley", "Kaza", "Manali"],
    highlights: [
      "Historic British-era heritage lodges",
      "Private monastery sessions with senior lamas",
      "High altitude organic farm-to-table dining",
      "Personal chauffeur with terrain-specialist 4x4",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "rajputana-chronicle",
    title: "Royal Rajputana Chronicle",
    days: "10 Days / 9 Nights",
    pace: "Regal & Cultural",
    season: "October to March",
    route: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur"],
    highlights: [
      "Stays in authentic royal palace suites",
      "Private candlelit dinner on the dunes of Thar",
      "Curated antique and textile master workshops",
      "Exclusive access to private palace wings",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "malabar-foothills",
    title: "Malabar Mist & Spice Foothills",
    days: "8 Days / 7 Nights",
    pace: "Wellness & Nature",
    season: "September to April",
    route: ["Kochi", "Munnar", "Thekkady", "Alleppey Backwaters"],
    highlights: [
      "Heritage boutique hotel in historic Fort Kochi",
      "Private tea-tasting sessions on colonial hills",
      "Overnight luxury air-conditioned houseboat",
      "Ayurvedic botanical rejuvenation experiences",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sacred-heartland",
    title: "Sacred Heartland of the Bundelas",
    days: "9 Days / 8 Nights",
    pace: "Spiritual & Architectural",
    season: "October to April",
    route: ["Gwalior", "Orchha", "Khajuraho", "Varanasi"],
    highlights: [
      "Private architectural walk through Khajuraho temples",
      "Riverside cenotaph meditation in medieval Orchha",
      "VIP sunset Ganga Aarti viewing by private boat",
      "Deep dive into classical Hindustani music heritage",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
  },
];

export const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Discover",
    tagline: "Uncover Forgotten Horizons",
    description:
      "Explore curated landscapes, seasonal wonders, and architectural treasures tailored to your personal rhythm.",
  },
  {
    step: "02",
    title: "Plan",
    tagline: "Collaborative Dream Crafting",
    description:
      "Tell us your travel window, pace, companions, and passions. We construct your bespoke itinerary layer by layer.",
  },
  {
    step: "03",
    title: "Connect",
    tagline: "Direct Destination Specialists",
    description:
      "Speak directly with on-ground Indian travel curators who know each valley, haveli, and hidden route intimately.",
  },
  {
    step: "04",
    title: "Travel",
    tagline: "Flawless Luxury & Soulful Moments",
    description:
      "Embark with 24/7 concierge support, handpicked private chauffeurs, and effortless hospitality at every step.",
  },
];

