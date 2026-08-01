export type ItineraryDay = {
  day: string;
  place: string;
  note: string | string[];
};

export type Spec = {
  k: string;
  v: string;
};

export type StayGroup = {
  place: string;
  options: string[];
};

export type YatraStatus = 'open' | 'closed' | 'opening-soon';

export type Yatra = {
  n: string;
  slug: string;
  name: string;
  days: string;
  region: string;
  route: string;
  status?: YatraStatus;
  heroImage: string;
  heroPlaceholder: string;
  featureImage: string;
  featurePlaceholder: string;
  overviewLead: string;
  overviewBody: string;
  whyVisit?: string[];
  highlights?: string[];
  highlightsOptional?: string[];
  stays?: StayGroup[];
  specs: Spec[];
  itinerary: ItineraryDay[];
};

export type FutureDestination = {
  name: string;
  note?: string;
};

export const yatras: Yatra[] = [
  {
    n: '01',
    slug: 'two-jyotirlinga-journey',
    name: 'The Two Jyotirlinga Journey',
    days: '3 Days',
    region: 'Madhya Pradesh',
    route: 'Mahakaleshwar · Omkareshwar',
    status: 'open',
    heroImage:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=80&auto=format&fit=crop',
    heroPlaceholder: 'Mahakal Lok corridor at dusk — full bleed hero',
    featureImage:
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=1800&q=80&auto=format&fit=crop',
    featurePlaceholder: 'Narmada Ghats at Omkareshwar — feature',
    overviewLead:
      "Discover two of Lord Shiva's most revered Jyotirlingas on a thoughtfully curated pilgrimage through Ujjain and Omkareshwar.",
    overviewBody:
      'From the spiritual energy of Mahakaal to the serenity of the Narmada, this journey is designed to offer deeper darshan, authentic rituals and moments of quiet reflection—without the burden of planning every detail yourself.',
    whyVisit: [
      'Mahakaleshwar is one of the twelve Jyotirlingas and the only south-facing Jyotirlinga in India, revered as the Lord of Time (Mahakaal). The journey traditionally begins by seeking blessings at Kal Bhairav, the guardian deity of Ujjain, before offering prayers at Mahakaleshwar.',
      'Omkareshwar, situated on the sacred Narmada River, is believed to embody the divine symbol ‘Om’ and has welcomed pilgrims for centuries seeking peace, devotion and spiritual renewal.',
    ],
    highlights: [
      'Mahakaleshwar Jyotirlinga',
      'Omkareshwar Jyotirlinga',
      'Mahakal Lok',
      'Kal Bhairav Temple',
      'Harsiddhi Shakti Peeth',
      'Ram Ghat Evening Aarti',
      'Mamleshwar Temple',
      'Siddhanath Temple',
      'Gauri Somnath Temple',
      'Govindeshwar Cave',
    ],
    highlightsOptional: ['Baglamukhi Temple'],
    stays: [
      {
        place: 'Ujjain',
        options: ['MPT Samrat Vikramaditya – The Heritage', 'Hotel Abika Elite'],
      },
      {
        place: 'Omkareshwar',
        options: ['MPT Temple View', 'Narmada Hills Resort'],
      },
    ],
    specs: [
      { k: 'Duration', v: '3 Days · 2 Nights' },
      { k: 'Region', v: 'Madhya Pradesh' },
      { k: 'Arrival & Departure', v: 'Indore' },
    ],
    itinerary: [
      {
        day: 'Day One',
        place: 'Into The City Of Mahakaal',
        note: [
          'Arrival assistance at Indore Airport',
          'Private chauffeur transfer to Ujjain',
          'Check-in at your handpicked premium hotel',
          'Traditional Sattvic Lunch',
          'Visit Kal Bhairav Temple, traditionally the first stop before Mahakaleshwar Darshan',
          'Seek blessings at Harsiddhi Mata Temple (Shakti Peeth)',
          'Explore the magnificent Mahakal Lok Corridor',
          'Official Sheeghra Darshan Assistance at Mahakaleshwar Jyotirlinga',
          'Witness the Ram Ghat Evening Aarti',
          'Dinner & Overnight Stay in Ujjain',
        ],
      },
      {
        day: 'Day Two',
        place: 'From Mahakaal To The Narmada',
        note: [
          'Optional Bhasma Aarti (advance booking assistance available)',
          'Breakfast & drive to Omkareshwar',
          'Omkareshwar Jyotirlinga Darshan',
          'Visit Mamleshwar Temple',
          'Explore Siddhanath Temple',
          'Visit Gauri Somnath Temple',
          'Sunset along the Narmada Ghats',
          'Dinner & Overnight Stay in Omkareshwar',
        ],
      },
      {
        day: 'Day Three',
        place: 'A Journey That Stays With You',
        note: [
          'Early morning Darshan',
          'Visit Govindeshwar Cave',
          'Optional Omkareshwar Parikrama',
          'Optional visit to Baglamukhi Temple',
          'Return to Indore',
          'Airport transfer',
        ],
      },
    ],
  },
  {
    n: '02',
    slug: 'maharashtra-trinity',
    name: 'The Maharashtra Trinity',
    days: '4 Days',
    region: 'Maharashtra',
    route: 'Bhimashankar · Trimbakeshwar · Grishneshwar',
    status: 'opening-soon',
    heroImage:
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&q=80&auto=format&fit=crop',
    heroPlaceholder: 'Sahyadri hills at Bhimashankar — full bleed hero',
    featureImage:
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1800&q=80&auto=format&fit=crop',
    featurePlaceholder: 'Kailasa Temple, Ellora Caves — feature',
    overviewLead:
      "Discover three of Maharashtra's sacred Jyotirlingas on a pilgrimage that winds through the Sahyadri hills, the birthplace of the Godavari, and the timeless heritage of Ellora.",
    overviewBody:
      "Bhimashankar is nestled within the Sahyadris and marks the place where Lord Shiva is believed to have defeated the demon Bhima. Trimbakeshwar, at the source of the Godavari River, is one of India's most important centres for Vedic rituals and ancestral ceremonies. Grishneshwar, the twelfth Jyotirlinga, stands beside the magnificent Ellora Caves, completing one of India's most sacred pilgrimage circuits. Thoughtfully paced and seamlessly curated, this journey brings together devotion, history and nature.",
    specs: [
      { k: 'Duration', v: '4 Days · 3 Nights' },
      { k: 'Region', v: 'Maharashtra' },
      { k: 'Arrival', v: 'Pune' },
      { k: 'Departure', v: 'Chhatrapati Sambhajinagar' },
    ],
    itinerary: [
      {
        day: 'Day One',
        place: 'Into the Sahyadris',
        note: 'Arrival assistance at Pune Airport and private transfer to Bhimashankar. Check in, Traditional Sattvic Lunch, Bhimashankar Jyotirlinga Darshan, and visits to Kamalaja Mata Temple and Sakshi Vinayak Temple, with a nature walk before dinner and overnight stay.',
      },
      {
        day: 'Day Two',
        place: 'At the Source of the Godavari',
        note: 'Breakfast and drive to Trimbakeshwar for Official Darshan Assistance and Trimbakeshwar Jyotirlinga Darshan, followed by Kushavarta Kund and the Brahmagiri & Anjaneri Hills, with optional Narayan Nagbali / Tripindi Shradh rituals. Dinner & overnight stay in Nashik.',
      },
      {
        day: 'Day Three',
        place: 'Across Sacred Maharashtra',
        note: 'Breakfast and departure, visiting Shani Shingnapur before continuing to Chhatrapati Sambhajinagar for an evening at leisure, dinner and overnight stay.',
      },
      {
        day: 'Day Four',
        place: 'The Final Jyotirlinga',
        note: 'Grishneshwar Jyotirlinga Darshan and exploration of Kailasa Temple & the Ellora Caves, with an optional visit to Bhadra Maruti Temple, before airport transfer.',
      },
    ],
  },
  {
    n: '03',
    slug: 'where-faith-meets-the-sea',
    name: 'Where Faith Meets the Sea',
    days: '4 Days',
    region: 'Gujarat',
    route: 'Somnath · Dwarka · Nageshwar',
    status: 'closed',
    heroImage:
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1800&q=80&auto=format&fit=crop',
    heroPlaceholder: 'Somnath Temple at the Arabian Sea — full bleed hero',
    featureImage:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1800&q=80&auto=format&fit=crop',
    featurePlaceholder: 'Dwarkadhish Temple — feature',
    overviewLead:
      "Follow Gujarat's sacred coastline through ancient temples, legendary cities and timeless stories of Lord Shiva and Lord Krishna.",
    overviewBody:
      "Somnath is believed to be the first of the twelve Jyotirlingas and has stood as a symbol of resilience and faith for centuries. Continue to Nageshwar Jyotirlinga, before exploring Dwarka, the legendary kingdom of Lord Krishna and one of Hinduism's Char Dham pilgrimage sites. From the first Jyotirlinga at Somnath to the holy city of Dwarka, every stop carries centuries of devotion.",
    specs: [
      { k: 'Duration', v: '4 Days · 3 Nights' },
      { k: 'Region', v: 'Gujarat' },
      { k: 'Arrival', v: 'Rajkot' },
      { k: 'Departure', v: 'Jamnagar / Rajkot' },
    ],
    itinerary: [
      {
        day: 'Day One',
        place: 'Where the Ocean Meets Shiva',
        note: 'Arrival assistance at Rajkot Airport and private transfer to Somnath. Check-in, Somnath Jyotirlinga Darshan, sunset along the Arabian Sea and Evening Aarti, then dinner and overnight stay.',
      },
      {
        day: 'Day Two',
        place: 'The Sacred Story of Prabhas',
        note: 'Morning darshan, visits to Triveni Sangam, Bhalka Tirth and Dehotsarg Tirth, then a drive to Dwarka for dinner and overnight stay.',
      },
      {
        day: 'Day Three',
        place: "In Krishna's Kingdom",
        note: 'Nageshwar Jyotirlinga Darshan, Dwarkadhish Temple, Rukmini Temple and Gomti Ghat, followed by Evening Aarti, dinner and overnight stay.',
      },
      {
        day: 'Day Four',
        place: 'A Blessing Before You Depart',
        note: 'Optional early morning darshan, a visit to Bet Dwarka and Bhadkeshwar Mahadev, before airport transfer.',
      },
    ],
  },
  {
    n: '04',
    slug: 'kashi-eternal-journey',
    name: 'Kashi — The Eternal Journey',
    days: '3 Days',
    region: 'Varanasi',
    route: 'Kashi Vishwanath · Vishalakshi · Kal Bhairav',
    status: 'open',
    heroImage:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1800&q=80&auto=format&fit=crop',
    heroPlaceholder: 'Ghats of Varanasi at dusk — full bleed hero',
    featureImage:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80&auto=format&fit=crop',
    featurePlaceholder: 'Ganga Aarti at Dashashwamedh Ghat — feature',
    overviewLead:
      "Experience one of the world's oldest living cities through sacred temples, timeless rituals and the spiritual rhythm of the Ganga.",
    overviewBody:
      "Home to the Kashi Vishwanath Jyotirlinga, Varanasi is believed to be Lord Shiva's eternal abode. Pilgrims traditionally seek blessings at Kal Bhairav, the guardian of Kashi, while Vishalakshi Temple, one of the revered Shakti Peeths, completes this deeply significant pilgrimage. Every sunrise, every ghat and every prayer reveals why Kashi has drawn seekers for thousands of years.",
    specs: [
      { k: 'Duration', v: '3 Days · 2 Nights' },
      { k: 'Region', v: 'Varanasi' },
      { k: 'Arrival & Departure', v: 'Varanasi' },
    ],
    itinerary: [
      {
        day: 'Day One',
        place: 'Along the Sacred Ganga',
        note: 'Arrival assistance at Varanasi Airport and check-in at your heritage hotel, followed by a sunset boat ride on the Ganga and the Ganga Aarti, then dinner and overnight stay.',
      },
      {
        day: 'Day Two',
        place: 'The City of Shiva',
        note: 'Kashi Vishwanath Darshan, Annapurna Devi Temple, Vishalakshi Temple and Kal Bhairav Temple, followed by a walk through the old lanes of Kashi and an evening cultural experience.',
      },
      {
        day: 'Day Three',
        place: 'Sunrise Over Eternity',
        note: 'A sunrise boat ride, a visit to Mrityunjay Mahadev Temple with an optional stop at Sankat Mochan Hanuman Temple, before airport transfer.',
      },
    ],
  },
];

export const futureDestinations: FutureDestination[] = [
  { name: 'Chidambaram', note: 'Tamil Nadu' },
  { name: 'Arunachala', note: 'Tamil Nadu' },
  { name: 'Nepal', note: 'Himalayan Circuit' },
  { name: 'Kailash', note: 'Tibet' },
];

export const sideTestimonials = [
  {
    name: 'Shivali',
    from: 'The Two Jyotirlinga Journey',
    quote:
      'Seeing all the participants go through the journey with utmost bliss and devotion really touched me.',
  },
  {
    name: 'Sandesh',
    from: 'The Sacred Walks',
    quote: 'I am grateful that I got a chance to experience these reverberations in person.',
  },
];

export function getYatraBySlug(slug: string): Yatra | undefined {
  return yatras.find((y) => y.slug === slug);
}
