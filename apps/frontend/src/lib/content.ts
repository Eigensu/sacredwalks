import { COLLECTIONS, tryGetDb } from './mongodb';
import {
  yatras as defaultYatras,
  futureDestinations as defaultFutureDestinations,
  sideTestimonials,
  Yatra,
  FutureDestination,
} from './yatras';

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Testimonial = {
  name: string;
  from: string;
  quote: string;
};

export type SiteContent = {
  settings: {
    whatsappNumber: string;
    whatsappMessage: string;
  };
  home: {
    hero: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      sideText: string;
      journalLine: string;
      image: string;
    };
    pilgrimage: {
      eyebrow: string;
      lead: string;
      body: string;
      linkText: string;
      image: string;
    };
    philosophy: {
      eyebrow: string;
      lead: string;
      body: string;
      image: string;
    };
    applyInvite: {
      eyebrow: string;
      heading: string;
      steps: { title: string; body: string }[];
      ctaText: string;
    };
    video: {
      eyebrow: string;
      heading: string;
      caption: string;
      videoUrl: string;
      posterImage: string;
    };
    quote: {
      eyebrow: string;
      text: string;
      emphasis: string;
      attribution: string;
    };
    testimonials: Testimonial[];
    gallery: {
      heading: string;
      label: string;
      images: GalleryImage[];
    };
    cta: {
      eyebrow: string;
      heading: string;
      buttonText: string;
    };
    curateOwn: {
      eyebrow: string;
      heading: string;
      body: string;
      image: string;
      ctaText: string;
    };
  };
  footer: {
    tagline: string;
    phone: string;
    email: string;
    address: string;
    copyright: string;
    newsletterHeading: string;
    newsletterSub: string;
    instagramUrl: string;
  };
  yatras: Yatra[];
  futureDestinations: FutureDestination[];
  experience: {
    eyebrow: string;
    heading: string;
    programmeGuide: {
      heading: string;
      intro: string;
      items: string[];
      closing: string;
    };
    datesRegistration: {
      heading: string;
      intro: string;
      groupSizeHeading: string;
      groupSize: string;
      departuresHeading: string;
      departures: string;
      note: string;
      privateNote: string;
    };
    customisedItineraries: {
      heading: string;
      intro: string;
      items: string[];
      closing: string;
    };
    allInclusions: {
      heading: string;
      includedHeading: string;
      included: string[];
      onRequestHeading: string;
      onRequest: string[];
    };
    faq: { question: string; answer: string }[];
  };
};

/** Layout classes for the homepage gallery mosaic, fixed by position. */
export const GALLERY_LAYOUT = [
  'col-span-2 row-span-2 sm:col-span-3',
  'col-span-2 sm:col-span-3',
  'col-span-1 sm:col-span-2',
  'col-span-1',
  'col-span-2 row-span-2 sm:col-span-3',
  'col-span-2 sm:col-span-3',
  'col-span-2 sm:col-span-3 sm:col-start-4',
];

export const defaultContent: SiteContent = {
  settings: {
    whatsappNumber: '918976090623',
    whatsappMessage: 'Namaskaram, I would like to know more about Sacred Walks yatras.',
  },
  home: {
    hero: {
      eyebrow: 'Curated Spiritual Journeys Across Bharat',
      titleLine1: 'Walk yourself',
      titleLine2: 'into the divine',
      sideText:
        'Three journeys across Bharat — from coastal Mangalore to Himalayan Kedarnath — walked, not toured.',
      journalLine: "The Pilgrim's Journal · Scroll",
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1800&q=80&auto=format&fit=crop',
    },
    pilgrimage: {
      eyebrow: 'About The Journey',
      lead: 'Every Sacred Walk is thoughtfully curated to offer more than a pilgrimage, it is an opportunity to pause, reconnect, and experience India’s sacred heritage with intention.',
      body: 'From ancient Jyotirlingas and revered Shakti Peeths to timeless rituals and meaningful conversations, each journey is designed to help you experience these sacred places without the burden of planning every detail yourself.\n\nWith small groups, personalised guidance, carefully selected stays, and seamless logistics, we create the space for what truly matters—a deeper connection with the Divine, with tradition, and with yourself.',
      linkText: 'Why pilgrimage →',
      image:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80&auto=format&fit=crop',
    },
    philosophy: {
      eyebrow: 'Our Philosophy',
      lead: 'We believe that every pilgrimage should be as personal as the intention behind it.',
      body: 'Whether your journey is one of gratitude, healing, remembrance, celebration or quiet reflection, we thoughtfully curate each experience around what matters most to you.\n\nOur role is not simply to organise travel, but to create the space for a deeper, more meaningful connection with India’s sacred heritage.',
      image:
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80&auto=format&fit=crop',
    },
    applyInvite: {
      eyebrow: 'Apply For An Invite',
      heading: 'Begin Your Journey',
      steps: [
        {
          title: 'Step 1',
          body: 'Complete your application.',
        },
        {
          title: 'Step 2',
          body: 'Our team connects with you to understand your interests and recommend the right Sacred Walk.',
        },
        {
          title: 'Step 3',
          body: 'Receive your invitation and begin your journey.',
        },
      ],
      ctaText: 'Apply Now',
    },
    video: {
      eyebrow: 'The Film',
      heading: 'A glimpse of the journey',
      caption: 'Moments from the trail — the mountain, the lake, and those who walk.',
      videoUrl: 'https://videos.pexels.com/video-files/2871916/2871916-hd_1920_1080_30fps.mp4',
      posterImage:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=80&auto=format&fit=crop',
    },
    quote: {
      eyebrow: 'Sharings',
      text: 'The Sacred Walks — a journey of a lifetime. This experience cannot be put into words;',
      emphasis: 'it has to be experienced.',
      attribution: 'Azniv — Kashi',
    },
    testimonials: sideTestimonials,
    gallery: {
      heading: 'From the Trail',
      label: 'Gallery',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&auto=format&fit=crop',
          alt: 'Manasarovar lake',
        },
        {
          src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop',
          alt: 'Prayer flags',
        },
        {
          src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop',
          alt: 'Temple steps',
        },
        {
          src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80&auto=format&fit=crop',
          alt: 'Lamp',
        },
        {
          src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80&auto=format&fit=crop',
          alt: 'Mountain pass',
        },
        {
          src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80&auto=format&fit=crop',
          alt: 'River crossing',
        },
        {
          src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80&auto=format&fit=crop',
          alt: 'Forest falls',
        },
      ],
    },
    cta: {
      eyebrow: 'Begin',
      heading: 'The mountain is waiting for your feet.',
      buttonText: 'Apply for an Invitation',
    },
    curateOwn: {
      eyebrow: 'Private Journeys',
      heading: 'Curate Your Own Sacred Walk',
      body: "Every journey is personal. Whether you're travelling with family, friends or a private group, we'll thoughtfully curate a Sacred Walk around your intentions, interests and pace.",
      image:
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1400&q=80&auto=format&fit=crop',
      ctaText: 'Connect On WhatsApp',
    },
  },
  footer: {
    tagline:
      'Journeys to places of divine connection, where the veil between the physical and the spiritual grows thin.',
    phone: '+91 89760 90623',
    email: 'info@sacredwalks.org',
    address: 'Velliangiri Foothills, Coimbatore',
    copyright: '© 2026 The Sacred Walks',
    newsletterHeading: 'Stay Connected',
    newsletterSub: 'Receive news of upcoming yatras and openings.',
    instagramUrl: 'https://instagram.com/sacredwalks',
  },
  yatras: defaultYatras,
  futureDestinations: defaultFutureDestinations,
  experience: {
    eyebrow: 'The Sacred Walks Experience',
    heading: 'Travel Differently. Journey Meaningfully.',
    programmeGuide: {
      heading: 'Programme Guide',
      intro:
        'Each Sacred Walk follows a thoughtfully designed rhythm, allowing enough time for darshan, rituals, reflection and rest.',
      items: [
        'Guided visits to sacred temples and heritage sites',
        'Official Darshan Assistance (where available)',
        'Aarti experiences',
        'Optional Vedic rituals and personalised pujas',
        'Spiritual storytelling and historical insights',
        'Time for personal prayer and reflection',
        'Carefully planned travel with minimal rush',
        'Daily Sattvic meals',
        'Evening leisure to absorb the experience',
      ],
      closing:
        'Every itinerary is paced to ensure the journey feels meaningful rather than hurried.',
    },
    datesRegistration: {
      heading: 'Dates & Registration',
      intro:
        'Our journeys are intentionally limited to small groups, ensuring a more personal and immersive experience.',
      groupSizeHeading: 'Group Size',
      groupSize: '10–15 Guests',
      departuresHeading: 'Upcoming Departures',
      departures:
        'Seasonal departures throughout the year, with special journeys during Shravan, Mahashivratri, Kartik, Navratri and other spiritually significant periods.',
      note: 'To maintain the quality of every journey, registrations close once the group reaches capacity.',
      privateNote:
        'Private departures for families, couples and small groups are available on request.',
    },
    customisedItineraries: {
      heading: 'Customised Itineraries',
      intro: 'No two spiritual journeys are the same.',
      items: [
        'Private family pilgrimages',
        'Senior citizen-friendly itineraries',
        'Luxury spiritual holidays',
        'Temple circuits across India',
        'Jyotirlinga journeys',
        'Char Dham and Panch Kedar pilgrimages',
        'Shakti Peeth circuits',
        'Ritual-focused journeys',
        'Corporate spiritual retreats',
      ],
      closing: 'Every itinerary is personally designed by a Sacred Walks Journey Curator.',
    },
    allInclusions: {
      heading: 'All Inclusions',
      includedHeading: 'Every Sacred Walk includes',
      included: [
        'Dedicated Journey Curator',
        'Personal Temple Coordinator',
        'Official Darshan Assistance (where available)',
        'Airport & Railway Meet-and-Greet',
        'Luxury Chauffeur-driven Transfers',
        'Handpicked Premium Hotels',
        'Daily Sattvic Breakfast & Dinner',
        'Evening Tea & Refreshments',
        'Guided Temple Visits',
        'Concierge Support Before & During the Journey',
        'Sacred Walks Welcome Kit',
      ],
      onRequestHeading: 'Available on Request',
      onRequest: [
        'Rudrabhishekam & Special Rituals',
        'Dedicated Vedic Pandit',
        'Helicopter Transfers',
        'Charter Aircraft',
        'VIP Airport Assistance',
        'Luxury SUV Upgrades',
        'Spiritual Scholars & Historians',
      ],
    },
    faq: [
      {
        question: 'Who are these journeys designed for?',
        answer:
          'Our journeys are ideal for individuals, families and small groups seeking a more meaningful and thoughtfully curated pilgrimage experience.',
      },
      {
        question: 'What is the group size?',
        answer: 'To ensure a personalised experience, most departures are limited to 10–15 guests.',
      },
      {
        question: 'Can I book a private journey?',
        answer:
          'Yes. We curate private journeys for individuals, couples, families and small groups.',
      },
      {
        question: 'Are rituals included?',
        answer:
          'Temple darshan is included. Personalised rituals such as Rudrabhishekam, Maha Mrityunjaya Jaap and Sankalp Pujas can be arranged on request through authorised temple procedures.',
      },
      {
        question: 'Are flights included?',
        answer:
          'Flights and train tickets are available as an optional concierge service unless specifically mentioned in your chosen itinerary.',
      },
      {
        question: 'What kind of hotels do you select?',
        answer:
          'We stay at carefully chosen heritage, boutique and premium properties that offer comfort, hospitality and convenient access to the sacred destination.',
      },
      {
        question: 'Is this suitable for senior citizens?',
        answer:
          'Yes. Many of our journeys are designed keeping senior travellers in mind. Private assistance and customised arrangements can also be organised wherever possible.',
      },
      {
        question: 'Do you arrange VIP or Priority Darshan?',
        answer:
          'Where officially available, we coordinate authorised Priority Darshan and temple protocols. All arrangements remain subject to temple administration and prevailing regulations.',
      },
    ],
  },
};

const CONTENT_DOC_ID = 'siteContent';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep-merges saved content over defaults so newly added fields in code
 * still render even if the stored document predates them. Arrays are
 * replaced wholesale (the editor always saves complete arrays).
 */
export function mergeContent<T>(defaults: T, saved: unknown): T {
  if (!isPlainObject(defaults) || !isPlainObject(saved)) {
    return (saved === undefined || saved === null ? defaults : (saved as T)) as T;
  }
  const out: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (key in saved) {
      out[key] = mergeContent(
        (defaults as Record<string, unknown>)[key],
        (saved as Record<string, unknown>)[key],
      );
    }
  }
  return out as T;
}

/** Fetches CMS content, falling back to code defaults when the DB is absent. */
export async function getSiteContent(): Promise<SiteContent> {
  const db = await tryGetDb();
  if (!db) return defaultContent;
  try {
    const doc = await db.collection(COLLECTIONS.content).findOne({ _id: CONTENT_DOC_ID as never });
    if (!doc) return defaultContent;
    const saved: Record<string, unknown> = { ...doc };
    delete saved._id;
    return mergeContent(defaultContent, saved);
  } catch (err) {
    console.error('Failed to load site content:', err);
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const db = await tryGetDb();
  if (!db) throw new Error('MongoDB is not configured');
  const merged = mergeContent(defaultContent, content);
  await db
    .collection(COLLECTIONS.content)
    .replaceOne({ _id: CONTENT_DOC_ID as never }, merged, { upsert: true });
}

export { CONTENT_DOC_ID };
