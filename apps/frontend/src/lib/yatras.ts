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
  whyVisitQuote?: string;
  whyVisit?: string[];
  highlights?: string[];
  highlightsOptional?: string[];
  stays?: StayGroup[];
  specs: Spec[];
  itinerary: ItineraryDay[];
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
    whyVisitQuote:
      'Experience a deeply spiritual journey to Mahakaleshwar and Omkareshwar, two sacred Jyotirlingas that have inspired devotion for generations.',
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
      'Thoughtfully paced and seamlessly curated, this journey brings together devotion, history and nature.',
    whyVisitQuote:
      'Experience a deeply spiritual journey to Bhimashankar, Trimbakeshwar and Grishneshwar, three sacred Jyotirlingas woven through the hills, rivers and heritage of Maharashtra.',
    whyVisit: [
      'Bhimashankar is nestled within the Sahyadris and marks the place where Lord Shiva is believed to have defeated the demon Bhima.',
      "Trimbakeshwar, at the source of the Godavari River, is one of India's most important centres for Vedic rituals and ancestral ceremonies.",
      "Grishneshwar, the twelfth Jyotirlinga, stands beside the magnificent Ellora Caves, completing one of India's most sacred pilgrimage circuits.",
    ],
    highlights: [
      'Bhimashankar Jyotirlinga',
      'Trimbakeshwar Jyotirlinga',
      'Grishneshwar Jyotirlinga',
      'Kamalaja Mata Temple',
      'Sakshi Vinayak Temple',
      'Kushavarta Kund',
      'Brahmagiri Hills',
      'Anjaneri Hills',
      'Shani Shingnapur',
      'Kailasa Temple, Ellora',
    ],
    highlightsOptional: ['Narayan Nagbali', 'Tripindi Shradh', 'Rudrabhishekam'],
    specs: [
      { k: 'Duration', v: '4 Days · 3 Nights' },
      { k: 'Region', v: 'Maharashtra' },
      { k: 'Arrival', v: 'Pune' },
      { k: 'Departure', v: 'Chhatrapati Sambhajinagar' },
    ],
    itinerary: [
      {
        day: 'Day One',
        place: 'Into The Sahyadris',
        note: [
          'Arrival assistance at Pune Airport',
          'Private chauffeur transfer to Bhimashankar',
          'Check-in at your premium hotel',
          'Traditional Sattvic Lunch',
          'Bhimashankar Jyotirlinga Darshan',
          'Visit Kamalaja Mata Temple',
          'Visit Sakshi Vinayak Temple',
          'Nature walk (subject to time)',
          'Dinner & Overnight Stay',
        ],
      },
      {
        day: 'Day Two',
        place: 'At The Source Of The Godavari',
        note: [
          'Breakfast & drive to Trimbakeshwar',
          'Official Darshan Assistance',
          'Trimbakeshwar Jyotirlinga Darshan',
          'Visit Kushavarta Kund',
          'Explore Brahmagiri & Anjaneri Hills',
          'Optional Narayan Nagbali / Tripindi Shradh',
          'Dinner & Overnight Stay in Nashik',
        ],
      },
      {
        day: 'Day Three',
        place: 'Across Sacred Maharashtra',
        note: [
          'Breakfast & departure',
          'Visit Shani Shingnapur',
          'Continue to Chhatrapati Sambhajinagar',
          'Evening at leisure',
          'Dinner & Overnight Stay',
        ],
      },
      {
        day: 'Day Four',
        place: 'The Final Jyotirlinga',
        note: [
          'Grishneshwar Jyotirlinga Darshan',
          'Explore Kailasa Temple & Ellora Caves',
          'Optional Bhadra Maruti Temple',
          'Airport transfer',
        ],
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
      'From the first Jyotirlinga at Somnath to the holy city of Dwarka, every stop carries centuries of devotion.',
    whyVisitQuote:
      "Experience a deeply spiritual journey to Somnath, Dwarka and Nageshwar, following Gujarat's sacred coastline through timeless stories of Lord Shiva and Lord Krishna.",
    whyVisit: [
      'Somnath is believed to be the first of the twelve Jyotirlingas and has stood as a symbol of resilience and faith for centuries.',
      "Continue to Nageshwar Jyotirlinga, before exploring Dwarka, the legendary kingdom of Lord Krishna and one of Hinduism's Char Dham pilgrimage sites.",
    ],
    highlights: [
      'Somnath Jyotirlinga',
      'Nageshwar Jyotirlinga',
      'Dwarkadhish Temple',
      'Bet Dwarka',
      'Rukmini Temple',
      'Gomti Ghat',
      'Triveni Sangam',
      'Bhalka Tirth',
      'Dehotsarg Tirth',
      'Bhadkeshwar Mahadev',
    ],
    specs: [
      { k: 'Duration', v: '4 Days · 3 Nights' },
      { k: 'Region', v: 'Gujarat' },
      { k: 'Arrival', v: 'Rajkot' },
      { k: 'Departure', v: 'Jamnagar / Rajkot' },
    ],
    itinerary: [
      {
        day: 'Day One',
        place: 'Where The Ocean Meets Shiva',
        note: [
          'Arrival assistance at Rajkot Airport',
          'Private transfer to Somnath',
          'Check-in',
          'Somnath Jyotirlinga Darshan',
          'Sunset along the Arabian Sea',
          'Evening Aarti',
          'Dinner & Overnight Stay',
        ],
      },
      {
        day: 'Day Two',
        place: 'The Sacred Story Of Prabhas',
        note: [
          'Morning Darshan',
          'Visit Triveni Sangam',
          'Bhalka Tirth',
          'Dehotsarg Tirth',
          'Drive to Dwarka',
          'Dinner & Overnight Stay',
        ],
      },
      {
        day: 'Day Three',
        place: "In Krishna's Kingdom",
        note: [
          'Nageshwar Jyotirlinga Darshan',
          'Dwarkadhish Temple',
          'Rukmini Temple',
          'Gomti Ghat',
          'Evening Aarti',
          'Dinner & Overnight Stay',
        ],
      },
      {
        day: 'Day Four',
        place: 'A Blessing Before You Depart',
        note: [
          'Optional early morning Darshan',
          'Visit Bet Dwarka',
          'Bhadkeshwar Mahadev',
          'Airport transfer',
        ],
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
      'Every sunrise, every ghat and every prayer reveals why Kashi has drawn seekers for thousands of years.',
    whyVisitQuote:
      'Experience a deeply spiritual journey through Kashi, where sacred temples, timeless rituals and the eternal rhythm of the Ganga have drawn seekers for thousands of years.',
    whyVisit: [
      "Home to the Kashi Vishwanath Jyotirlinga, Varanasi is believed to be Lord Shiva's eternal abode.",
      'Pilgrims traditionally seek blessings at Kal Bhairav, the guardian of Kashi, while Vishalakshi Temple, one of the revered Shakti Peeths, completes this deeply significant pilgrimage.',
    ],
    highlights: [
      'Kashi Vishwanath Jyotirlinga',
      'Kal Bhairav Temple',
      'Vishalakshi Shakti Peeth',
      'Annapurna Devi Temple',
      'Dashashwamedh Ghat',
      'Sunrise Boat Ride',
      'Ganga Aarti',
      'Mrityunjay Mahadev Temple',
    ],
    specs: [
      { k: 'Duration', v: '3 Days · 2 Nights' },
      { k: 'Region', v: 'Varanasi' },
      { k: 'Arrival & Departure', v: 'Varanasi' },
    ],
    itinerary: [
      {
        day: 'Day One',
        place: 'Along The Sacred Ganga',
        note: [
          'Arrival assistance at Varanasi Airport',
          'Check-in at your heritage hotel',
          'Sunset Boat Ride on the Ganga',
          'Witness the Ganga Aarti',
          'Dinner & Overnight Stay',
        ],
      },
      {
        day: 'Day Two',
        place: 'The City Of Shiva',
        note: [
          'Kashi Vishwanath Darshan',
          'Annapurna Devi Temple',
          'Vishalakshi Temple',
          'Kal Bhairav Temple',
          'Walk through the old lanes of Kashi',
          'Evening cultural experience',
          'Dinner & Overnight Stay',
        ],
      },
      {
        day: 'Day Three',
        place: 'Sunrise Over Eternity',
        note: [
          'Sunrise Boat Ride',
          'Visit Mrityunjay Mahadev Temple',
          'Optional Sankat Mochan Hanuman Temple',
          'Airport transfer',
        ],
      },
    ],
  },
];

export function getYatraBySlug(slug: string): Yatra | undefined {
  return yatras.find((y) => y.slug === slug);
}
