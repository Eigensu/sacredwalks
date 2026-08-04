import Link from 'next/link';
import EnquireButton from '@/components/EnquireButton';
import ExperienceIcon from '@/components/ExperienceIcon';

const EXPERIENCE_ITEMS = [
  { label: 'Journey Consultation', sub: 'Personal', icon: 'consultation' },
  { label: 'Journey Curator', sub: 'Dedicated', icon: 'curator' },
  { label: 'Temple Coordinator', sub: 'On-ground', icon: 'temple' },
  { label: 'Darshan Assistance', sub: 'Official', icon: 'darshan' },
  { label: 'Vedic Pandit', sub: 'On request', icon: 'pandit' },
  { label: 'Luxury Hotels', sub: 'Handpicked', icon: 'hotel' },
  { label: 'Chauffeur Transfers', sub: 'Private', icon: 'transfer' },
  { label: 'Sattvic Meals', sub: 'Daily', icon: 'meal' },
  { label: 'Welcome Kit', sub: 'Sacred Walks', icon: 'kit' },
  { label: 'Concierge Support', sub: 'Throughout', icon: 'concierge' },
];

const PERSONALISED_RITUALS = [
  'Rudrabhishekam',
  'Maha Mrityunjaya Jaap',
  'Laghu Rudra',
  'Sankalp Puja',
  'Special Archana',
  'Personalised Vedic Rituals',
];

const OPTIONAL_ENHANCEMENTS = [
  'Helicopter Transfers',
  'Charter Aircraft',
  'Luxury SUV Upgrade',
  'Temple Scholars',
  'Meditation Sessions',
  'Vedic Astrology Consultation',
];

// Every yatra page shares these three sections — content and styling are
// identical regardless of yatra, unlike the templated sections around them.
// Kept in one file (rather than split per-section) so a future admin panel
// has a single place to wire up editable fields for all of them.

export function SacredWalksExperience() {
  return (
    <section className="px-[7vw] pt-10 pb-10 sm:pt-12 sm:pb-12">
      <div className="mb-3">
        <div className="mb-7 text-[11.5px] tracking-[0.28em] text-accent uppercase">
          The Sacred Walks Experience
        </div>
        <blockquote className="mb-10 border-l-4 border-accent pl-6 font-serif text-[clamp(20px,2.6vw,30px)] leading-[1.45] font-normal text-heading italic max-sm:text-[16px]">
          <span className="text-label">&ldquo;</span>
          Every Sacred Walk has been thoughtfully designed to let you focus entirely on the
          spiritual experience while we take care of everything else.
          <span className="text-label">&rdquo;</span>
        </blockquote>
        <p className="text-[11.5px] tracking-[0.28em] text-accent uppercase">
          Included throughout your journey
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5 md:gap-x-6">
        {EXPERIENCE_ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center">
              <ExperienceIcon name={item.icon} />
            </span>
            <span className="flex flex-col gap-1">
              {item.sub && (
                <span className="text-[9.5px] tracking-[0.16em] text-label uppercase">
                  {item.sub}
                </span>
              )}
              <span className="font-display text-[12.5px] tracking-[0.06em] text-ink uppercase">
                {item.label}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RitualsAndEnhancements() {
  return (
    <section className="bg-ink px-[7vw] py-16 text-card sm:py-20">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-surface/14">
        <div className="md:pr-[7vw]">
          <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-medium">
            Personalised Rituals
          </h2>
          <p className="mt-3 text-[13px] tracking-[0.06em] text-muted uppercase">
            Available upon request
          </p>
          <div className="mt-7 grid grid-cols-2 gap-2.5">
            {PERSONALISED_RITUALS.map((item) => (
              <span
                key={item}
                className="flex items-center justify-center border border-surface/25 px-4 py-3 text-center text-[13px] text-muted transition-colors hover:border-surface/50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="md:pl-[7vw]">
          <h2 className="font-serif text-[clamp(24px,3vw,38px)] font-medium">
            Optional Enhancements
          </h2>
          <p className="mt-3 text-[13px] tracking-[0.06em] text-muted uppercase">
            Elevate your journey
          </p>
          <div className="mt-7 grid grid-cols-2 gap-2.5">
            {OPTIONAL_ENHANCEMENTS.map((item) => (
              <span
                key={item}
                className="flex items-center justify-center border border-surface/25 px-4 py-3 text-center text-[13px] text-muted transition-colors hover:border-surface/50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-surface/14 pt-10 text-center">
        <p className="text-[13px] tracking-[0.06em] text-muted uppercase">Important Information</p>
        <p className="mx-auto mt-4 max-w-[820px] text-[14px] leading-[1.8] text-muted">
          Sacred Walks facilitates official bookings for Bhasma Aarti, Sheeghra Darshan, Sandhya
          Aarti, Shayan Aarti, and selected temple rituals through authorised temple channels.
        </p>
        <p className="mx-auto mt-4 max-w-[820px] text-[14px] leading-[1.8] text-muted">
          While advance reservations are arranged wherever possible, Nandi Hall seating for the
          Bhasma Aarti cannot be guaranteed, particularly for last-minute requests, weekends,
          festivals, or during the Shravan season. All access remains subject to the regulations of
          the Shri Mahakaleshwar Temple Management Committee and prevailing government protocols.
        </p>
      </div>
    </section>
  );
}

export function YatraClosingCta({ yatraName }: { yatraName: string }) {
  return (
    <section className="bg-surface px-[7vw] py-20 text-center text-ink sm:py-[120px]">
      <div className="mb-[26px] text-[11.5px] tracking-[0.28em] text-accent uppercase">
        Walk with us
      </div>
      <h2 className="mx-auto max-w-[900px] font-serif text-[clamp(14px,3.6vw,36px)] leading-[1.15] font-medium whitespace-nowrap">
        &ldquo;Some journeys ask for your whole being.&rdquo;
      </h2>
      <div className="mt-11">
        <EnquireButton
          yatraName={yatraName}
          className="inline-block cursor-pointer bg-accent px-8 py-4 text-[12.5px] tracking-[0.18em] text-white uppercase sm:px-10"
        >
          Apply for an Invitation to {yatraName}
        </EnquireButton>
      </div>
      <Link
        href="/"
        className="mt-[30px] block cursor-pointer text-[12px] tracking-[0.16em] text-label uppercase"
      >
        ← Back to all journeys
      </Link>
    </section>
  );
}

// Bundles the two constant sections that sit next to each other at the end
// of the page. SacredWalksExperience is used separately higher up the page,
// since templated content (Feature Image, Itinerary) sits between them.
export default function YatraConstantSections({ yatraName }: { yatraName: string }) {
  return (
    <>
      <RitualsAndEnhancements />
      <YatraClosingCta yatraName={yatraName} />
    </>
  );
}
