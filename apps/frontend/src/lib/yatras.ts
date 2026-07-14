export type ItineraryDay = {
  day: string;
  place: string;
  note: string;
};

export type Spec = {
  k: string;
  v: string;
};

export type Yatra = {
  n: string;
  slug: string;
  name: string;
  days: string;
  region: string;
  route: string;
  heroImage: string;
  heroPlaceholder: string;
  featureImage: string;
  featurePlaceholder: string;
  overviewLead: string;
  overviewBody: string;
  specs: Spec[];
  itinerary: ItineraryDay[];
};

export const yatras: Yatra[] = [
  {
    n: '01',
    slug: 'kailash-manasarovar',
    name: 'Kailash Manasarovar',
    days: '14 Days',
    region: 'Tibet · Nepal',
    route: 'Pashupatinath · Patan · Manasarovar · Kailash',
    heroImage:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1800&q=80&auto=format&fit=crop',
    heroPlaceholder: 'Mount Kailash — full bleed hero',
    featureImage:
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1800&q=80&auto=format&fit=crop',
    featurePlaceholder: 'Lake Manasarovar at dawn — feature',
    overviewLead:
      'To circle Kailash is to walk around the axis of the world — fourteen days that begin in Kathmandu and rise to the 5,630-metre Dolma La, the threshold of the inner mountain.',
    overviewBody:
      'Pashupatinath, Patan, the still waters of Manasarovar, and the parikrama of Kailash itself — each step held by those who have walked it before. This is not a tour. It is a yatra.',
    specs: [
      { k: 'Duration', v: '14 Days' },
      { k: 'Region', v: 'Tibet & Nepal' },
      { k: 'Highest point', v: 'Dolma La — 5,630 m' },
      { k: 'Begins', v: 'Kathmandu' },
      { k: 'Difficulty', v: 'Demanding' },
    ],
    itinerary: [
      {
        day: 'Day 01',
        place: 'Kathmandu',
        note: 'Arrival in the Himalayan capital. Rest, briefing, and the first quieting of the mind.',
      },
      {
        day: 'Day 02',
        place: 'Pashupatinath',
        note: 'Darshan at the great abode of Shiva on the banks of the Bagmati.',
      },
      {
        day: 'Day 03',
        place: 'Patan',
        note: 'Among the old courtyards and shrines — preparation and acclimatisation.',
      },
      {
        day: 'Day 04',
        place: 'Kerung',
        note: 'The road climbs north; crossing the border into Tibet.',
      },
      {
        day: 'Day 05',
        place: 'Kerung',
        note: 'A day held for the body to meet the altitude. Slow walks, stillness.',
      },
      {
        day: 'Day 06',
        place: 'Saga',
        note: 'Across the vast plateau, the land opening wider with every mile.',
      },
      {
        day: 'Day 07',
        place: 'Manasarovar',
        note: 'First sight of the sacred lake — turquoise under an enormous sky.',
      },
      {
        day: 'Day 08',
        place: 'Manasarovar',
        note: 'A bath at first light, and time by the water before the parikrama.',
      },
      {
        day: 'Day 09',
        place: 'Darchen',
        note: 'At the foot of Kailash. The mountain reveals itself.',
      },
      {
        day: 'Day 10',
        place: 'Dirapuk',
        note: 'The parikrama begins at Yamadwar — the north face close above.',
      },
      {
        day: 'Day 11',
        place: 'Dolma La',
        note: 'The high crossing at 5,630 m — the threshold of the journey.',
      },
      {
        day: 'Day 12',
        place: 'Zuthulpuk',
        note: 'A long descent into stillness, the circle nearly complete.',
      },
      {
        day: 'Day 13',
        place: 'Kerung',
        note: 'The return journey south, carrying the mountain within.',
      },
      {
        day: 'Day 14',
        place: 'Kathmandu',
        note: 'Departure — and the quiet knowledge that something has shifted.',
      },
    ],
  },
  {
    n: '02',
    slug: 'himalayas',
    name: 'Himalayas',
    days: '11 Days',
    region: 'Uttarakhand',
    route: 'Haridwar · Kedarnath · Badrinath · Gangotri',
    heroImage:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=80&auto=format&fit=crop',
    heroPlaceholder: 'Himalayan ridgeline — full bleed hero',
    featureImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80&auto=format&fit=crop',
    featurePlaceholder: 'Manasarovar-like alpine lake — feature',
    overviewLead:
      'Eleven days through the Char Dham of Uttarakhand — the Ganga at Haridwar, the shrine of Kedarnath cupped in its amphitheatre of snow, and the source waters of Gangotri.',
    overviewBody:
      'This is a walk along the spine of the Himalaya, from riverbank ghats to glacier-fed shrines, each halt a place where the mountains have been worshipped for millennia.',
    specs: [
      { k: 'Duration', v: '11 Days' },
      { k: 'Region', v: 'Uttarakhand' },
      { k: 'Highest point', v: 'Kedarnath — 3,583 m' },
      { k: 'Begins', v: 'Haridwar' },
      { k: 'Difficulty', v: 'Moderate' },
    ],
    itinerary: [
      {
        day: 'Day 01',
        place: 'Haridwar',
        note: "Arrival at the gateway to the gods. Evening aarti on the Ganga's banks.",
      },
      {
        day: 'Day 02',
        place: 'Haridwar',
        note: 'Rest and acclimatisation. A quiet morning by the river.',
      },
      {
        day: 'Day 03',
        place: 'Guptkashi',
        note: 'The road rises into the hills, temples appearing at every bend.',
      },
      {
        day: 'Day 04',
        place: 'Kedarnath',
        note: 'The climb to the shrine, snowbound peaks standing close overhead.',
      },
      {
        day: 'Day 05',
        place: 'Kedarnath',
        note: 'A full day at the temple — darshan, stillness, the thin mountain air.',
      },
      {
        day: 'Day 06',
        place: 'Guptkashi',
        note: "Descent from the shrine, the body carrying the altitude's quiet.",
      },
      {
        day: 'Day 07',
        place: 'Badrinath',
        note: 'Onward through the Alaknanda valley to the abode of Vishnu.',
      },
      {
        day: 'Day 08',
        place: 'Badrinath',
        note: 'Darshan and the hot springs of Tapt Kund at the foot of the temple.',
      },
      {
        day: 'Day 09',
        place: 'Gangotri',
        note: 'West across the ranges to the source of the Ganga.',
      },
      {
        day: 'Day 10',
        place: 'Gangotri',
        note: "A walk toward Gaumukh, the glacier's mouth, where the river begins.",
      },
      {
        day: 'Day 11',
        place: 'Haridwar',
        note: 'Return journey, and departure — the mountains carried onward.',
      },
    ],
  },
  {
    n: '03',
    slug: 'kashi-krama',
    name: 'Kashi Krama',
    days: '5 Days',
    region: 'Varanasi',
    route: 'Kashi Vishwanath · Vishalakshi · Kalabhairava',
    heroImage:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1800&q=80&auto=format&fit=crop',
    heroPlaceholder: 'Ghats of Varanasi at dusk — full bleed hero',
    featureImage:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80&auto=format&fit=crop',
    featurePlaceholder: 'Temple steps at Kashi — feature',
    overviewLead:
      "Five days in the oldest living city — a krama, a sequenced walk through Kashi's shrines, its ghats, and the particular stillness that gathers at the edge of the Ganga.",
    overviewBody:
      "Kashi Vishwanath, the Devi at Vishalakshi, and Kalabhairava, keeper of the city's threshold — a short yatra, but one that moves through the very heart of the sacred geography of India.",
    specs: [
      { k: 'Duration', v: '5 Days' },
      { k: 'Region', v: 'Varanasi' },
      { k: 'Highest point', v: '—' },
      { k: 'Begins', v: 'Varanasi' },
      { k: 'Difficulty', v: 'Easy' },
    ],
    itinerary: [
      {
        day: 'Day 01',
        place: 'Varanasi',
        note: 'Arrival on the banks of the Ganga. Evening Ganga aarti at Dashashwamedh Ghat.',
      },
      {
        day: 'Day 02',
        place: 'Kashi Vishwanath',
        note: "Darshan at the golden-spired heart of the city, before dawn's first light.",
      },
      {
        day: 'Day 03',
        place: 'Vishalakshi',
        note: "To the Devi's shrine, one of the Shakti Peethas, quiet amid the lanes.",
      },
      {
        day: 'Day 04',
        place: 'Kalabhairava',
        note: "At the temple of the city's fierce guardian — the krama's turning point.",
      },
      {
        day: 'Day 05',
        place: 'Varanasi',
        note: 'A final walk along the ghats at sunrise, and departure.',
      },
    ],
  },
  {
    n: '04',
    slug: 'southern-sojourn',
    name: 'Southern Sojourn',
    days: '6 Days',
    region: 'Tamil Nadu',
    route: 'Thiruvannamalai · Thanjavur · Rameshwaram · Madurai',
    heroImage:
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1800&q=80&auto=format&fit=crop',
    heroPlaceholder: 'South Indian temple gopuram — full bleed hero',
    featureImage:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1800&q=80&auto=format&fit=crop',
    featurePlaceholder: 'Temple lamp — feature',
    overviewLead:
      'Six days through the temple-country of Tamil Nadu — from the fire hill of Thiruvannamalai to the great Chola towers of Thanjavur and the island shrine of Rameshwaram.',
    overviewBody:
      "This is a walk among some of the oldest continuously worshipped temples on earth, each with its own reverberation, ending at Madurai's Meenakshi in the city's ancient heart.",
    specs: [
      { k: 'Duration', v: '6 Days' },
      { k: 'Region', v: 'Tamil Nadu' },
      { k: 'Highest point', v: 'Arunachala — 813 m' },
      { k: 'Begins', v: 'Thiruvannamalai' },
      { k: 'Difficulty', v: 'Easy' },
    ],
    itinerary: [
      {
        day: 'Day 01',
        place: 'Thiruvannamalai',
        note: 'Arrival at the foot of Arunachala. Evening girivalam around the sacred hill.',
      },
      {
        day: 'Day 02',
        place: 'Thiruvannamalai',
        note: 'Darshan at Arunachaleswarar Temple, seat of the fire element.',
      },
      {
        day: 'Day 03',
        place: 'Thanjavur',
        note: 'To the great Brihadeeswarar Temple, its Chola tower rising over the plains.',
      },
      {
        day: 'Day 04',
        place: 'Rameshwaram',
        note: 'East to the island shrine, corridors of stone opening toward the sea.',
      },
      {
        day: 'Day 05',
        place: 'Madurai',
        note: 'The thousand-pillared halls of Meenakshi Amman, alive since before memory.',
      },
      {
        day: 'Day 06',
        place: 'Madurai',
        note: 'A final dawn darshan, and departure — the south carried within.',
      },
    ],
  },
];

export const sideTestimonials = [
  {
    name: 'Shivali',
    from: 'Kailash',
    quote:
      'Seeing all the participants go through the 14 days with utmost bliss and devotion really touched me.',
  },
  {
    name: 'Sandesh',
    from: 'Sacred Walks',
    quote: 'I am grateful that I got a chance to experience these reverberations in person.',
  },
];

export function getYatraBySlug(slug: string): Yatra | undefined {
  return yatras.find((y) => y.slug === slug);
}
