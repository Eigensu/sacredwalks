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
    intro: string[];
    included: string[];
    stays: {
      heading: string;
      body: string;
      note: string;
    };
    rituals: {
      heading: string;
      intro: string;
      general: string[];
      destinationSpecific: string[];
    };
    enhancements: {
      heading: string;
      intro: string;
      items: string[];
    };
    concierge: {
      heading: string;
      before: string[];
      during: string[];
    };
    welcomeKit: {
      heading: string;
      intro: string;
      items: string[];
    };
    importantInfo: {
      heading: string;
      body: string[];
    };
    whyUs: {
      heading: string;
      items: string[];
    };
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
    whatsappNumber: '918144123123',
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
      eyebrow: 'More Than A Journey',
      lead: 'The Sacred Walks was created from a simple belief — that sacred journeys are meant to be experienced, not hurried.',
      body: "Every destination carries centuries of stories, traditions and living wisdom. We bring them together through thoughtfully curated journeys that invite you to slow down, understand more deeply and experience Bharat's spiritual heritage with greater presence. Because some journeys change the places we visit. The meaningful ones change the way we see.",
      linkText: 'Why pilgrimage →',
      image:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80&auto=format&fit=crop',
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
    phone: '+91 8144 123 123',
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
    intro: [
      'Every Sacred Walk begins long before you arrive at the first temple.',
      'From your initial consultation to your final darshan, every detail is thoughtfully curated to create a seamless pilgrimage — allowing you to remain fully present while we take care of everything else.',
      'Whether your journey is one of gratitude, healing, remembrance or new beginnings, each experience is designed around your personal intention, ensuring no two pilgrimages are ever the same.',
    ],
    included: [
      'Personal Journey Consultation before departure',
      'Dedicated Sacred Walks Journey Curator',
      'Dedicated Temple Coordinator',
      'Official Darshan & Temple Protocol Assistance',
      'Pre-booked Aarti & Ritual Assistance (where available)',
      'Dedicated Vedic Pandit for personalised rituals (on request)',
      'Chauffeur-driven Premium Vehicle',
      'Handpicked Heritage, Boutique & Luxury Hotels',
      'Daily Sattvic Breakfast & Dinner',
      'Evening Tea & Refreshments',
      'Airport & Railway Meet-and-Greet',
      'Luggage Assistance',
      'Concierge Support Before & During Your Journey',
      'Sacred Walks Welcome Kit',
    ],
    stays: {
      heading: 'Handpicked Stays',
      body: 'Every hotel is personally selected for its hospitality, comfort, location and proximity to the sacred destination. Rather than standard accommodations, Sacred Walks offers a carefully curated collection of heritage properties, boutique hotels and premium retreats that complement the pace and purpose of your pilgrimage.',
      note: 'Destination-wise hotel selections are listed on each journey.',
    },
    rituals: {
      heading: 'Personalised Rituals',
      intro:
        'Every spiritual journey is deeply personal. Should you wish to perform special rituals during your pilgrimage, our team coordinates every detail through authorised temple procedures and experienced Vedic priests. Available upon request:',
      general: [
        'Rudrabhishekam',
        'Maha Mrityunjaya Jaap',
        'Laghu Rudra',
        'Ekadash Rudra',
        'Sankalp Puja',
        'Special Archana',
        'Navagraha Shanti',
        'Chandi Path',
        'Devi Pujas',
        'Personalised Gotra-based Rituals',
      ],
      destinationSpecific: [
        'Daiva Kola & Bhuta Kola (Mangalore)',
        'Pitru Tarpan (Varanasi)',
        'Rudrabhishekam at Kedarnath Temple (Kedarnath)',
      ],
    },
    enhancements: {
      heading: 'Optional Enhancements',
      intro: 'For guests seeking an even more personalised experience.',
      items: [
        'Helicopter Transfers',
        'Charter Aircraft',
        'Luxury SUV Fleet',
        'VIP Airport Assistance',
        'Temple Scholars & Spiritual Historians',
        'Sanskrit Chanting Sessions',
        'Guided Meditation & Breathwork',
        'Vedic Astrology Consultation',
        'Rudraksha Consultation',
        'Ayurvedic Wellness Experiences',
        'Private Photography (on request)',
      ],
    },
    concierge: {
      heading: 'The Sacred Walks Concierge',
      before: [
        'Dedicated Relationship Curator',
        'Personal Travel Consultation',
        'Flight & Railway Booking Assistance',
        'Temple Registration Support',
        'Ritual Consultation',
        'Personalised Packing Guide',
        'Travel Documentation Assistance',
      ],
      during: [
        'Dedicated Journey Curator',
        'Personal Temple Coordinator',
        'Chauffeur-driven Vehicle',
        'Local Destination Expert',
        'Dedicated Vedic Priest (on request)',
        '24/7 Concierge Assistance',
      ],
    },
    welcomeKit: {
      heading: 'Sacred Walks Welcome Kit',
      intro:
        'Every guest receives a thoughtfully curated welcome kit designed to accompany them throughout their pilgrimage.',
      items: [
        'Sacred Walks Journey Journal',
        'Destination Guide',
        'Temple Etiquette Handbook',
        'Rudraksha',
        'Prayer Essentials',
        'Sacred Walks Travel Pouch',
        'Emergency Contact Card',
      ],
    },
    importantInfo: {
      heading: 'Important Information',
      body: [
        'Sacred Walks facilitates official bookings for Darshan, Aartis and temple rituals through authorised temple channels wherever available.',
        'While every effort is made to secure preferred timings and access, all bookings remain subject to temple regulations, seasonal demand and administrative approvals. During festivals and the holy month of Shravan, availability may be limited and cannot be guaranteed.',
        'Our role is to thoughtfully coordinate every authorised booking and temple procedure in advance, allowing you to focus entirely on the spiritual significance of your journey.',
      ],
    },
    whyUs: {
      heading: 'Why Travel With Sacred Walks',
      items: [
        'Thoughtfully Curated Spiritual Journeys',
        'Small, Intimate Groups',
        'Seamless End-to-End Planning',
        'Handpicked Luxury Stays',
        'Dedicated Journey Curator',
        'Temple Experts & Vedic Guidance',
        'Official Darshan Assistance',
        'Authentic Ritual Experiences',
        'Personalised Pilgrimage Planning',
        'Luxury with Spiritual Purpose',
      ],
    },
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
