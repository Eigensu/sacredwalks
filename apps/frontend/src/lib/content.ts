import { COLLECTIONS, tryGetDb } from './mongodb';
import { yatras as defaultYatras, sideTestimonials, Yatra } from './yatras';

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
  };
  footer: {
    tagline: string;
    phone: string;
    email: string;
    address: string;
    copyright: string;
    newsletterHeading: string;
    newsletterSub: string;
  };
  yatras: Yatra[];
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
      eyebrow: 'Yatras to Kailash, Kashi & Beyond',
      titleLine1: 'Walk yourself',
      titleLine2: 'into the divine',
      sideText: 'Four pilgrimages across the Himalaya and the south of India — walked, not toured.',
      journalLine: "Vol. I — The Pilgrim's Journal · Scroll",
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1800&q=80&auto=format&fit=crop',
    },
    pilgrimage: {
      eyebrow: '01 — On Pilgrimage',
      lead: 'A pilgrimage is not merely a journey to a distant place. It is the unwavering resolve and the uncomplaining countenance of one who seeks a freedom beyond all bondage.',
      body: 'It is a chance to touch a deeper dimension of existence — to let grace and vitality flow back into ordinary life. The walking is the practice; the destination, only a doorway.',
      linkText: 'Why pilgrimage →',
      image:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80&auto=format&fit=crop',
    },
    video: {
      eyebrow: '02 — The Film',
      heading: 'A glimpse of the journey',
      caption: 'Moments from the trail — the mountain, the lake, and those who walk.',
      videoUrl: 'https://videos.pexels.com/video-files/2871916/2871916-hd_1920_1080_30fps.mp4',
      posterImage:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=80&auto=format&fit=crop',
    },
    quote: {
      eyebrow: '03 — Sharings',
      text: 'Kailash — a journey of a lifetime. This experience cannot be put into words;',
      emphasis: 'it has to be experienced.',
      attribution: 'Azniv — Kailash Manasarovar',
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
      buttonText: 'Enquire about a yatra',
    },
  },
  footer: {
    tagline:
      'Journeys to places of divine connection, where the veil between the physical and the spiritual grows thin.',
    phone: '+91 8144 123 123',
    email: 'info@sacredwalks.org',
    address: 'Velliangiri Foothills, Coimbatore',
    copyright: '© 2026 Isha Sacred Walks — Concept redesign',
    newsletterHeading: 'Stay Connected',
    newsletterSub: 'Receive news of upcoming yatras and openings.',
  },
  yatras: defaultYatras,
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
