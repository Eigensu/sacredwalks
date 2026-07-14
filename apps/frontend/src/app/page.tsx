import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import EnquireButton from '@/components/EnquireButton';
import { yatras, sideTestimonials } from '@/lib/yatras';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&auto=format&fit=crop',
    alt: 'Manasarovar lake',
    className: 'col-span-2 row-span-2 sm:col-span-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop',
    alt: 'Prayer flags',
    className: 'col-span-2 sm:col-span-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop',
    alt: 'Temple steps',
    className: 'col-span-1 sm:col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80&auto=format&fit=crop',
    alt: 'Lamp',
    className: 'col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80&auto=format&fit=crop',
    alt: 'Mountain pass',
    className: 'col-span-2 row-span-2 sm:col-span-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80&auto=format&fit=crop',
    alt: 'River crossing',
    className: 'col-span-2 sm:col-span-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80&auto=format&fit=crop',
    alt: 'Forest falls',
    className: 'col-span-2 sm:col-span-3 sm:col-start-4',
  },
];

export default function Home() {
  return (
    <div className="bg-[#F5F1E9]">
      {/* HERO */}
      <section className="relative h-[94vh] min-h-[560px] overflow-hidden sm:min-h-[680px]">
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1800&q=80&auto=format&fit=crop"
          alt="Kailash peak at first light"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,21,14,.42)_0%,rgba(24,21,14,.06)_34%,rgba(24,21,14,.62)_100%)]" />

        <Nav variant="dark" />

        <div className="absolute right-[5vw] bottom-[9vh] left-[5vw] z-[3] flex flex-col flex-wrap items-start justify-between gap-8 text-[#F5F1E9] sm:right-[7vw] sm:bottom-[7vh] sm:left-[7vw] sm:flex-row sm:items-end sm:gap-10">
          <div className="scw-fade-in max-w-[760px]">
            <div className="mb-4 text-[11px] tracking-[0.3em] uppercase opacity-85 sm:mb-[22px] sm:text-[12px]">
              Yatras to Kailash, Kashi &amp; Beyond
            </div>
            <h1 className="font-serif text-[clamp(38px,10vw,104px)] leading-[0.98] font-medium tracking-[-0.01em]">
              Walk yourself
              <br />
              <em className="font-normal not-italic italic">into the divine</em>
            </h1>
          </div>
          <div className="max-w-[300px] border-l border-[#F5F1E9]/45 pl-[22px] text-[13.5px] leading-[1.7] opacity-90 sm:text-[14.5px]">
            Four pilgrimages across the Himalaya and the south of India — walked, not toured.
          </div>
        </div>
        <div className="absolute bottom-[2.6vh] left-[5vw] z-[3] text-[9.5px] tracking-[0.26em] text-[#F5F1E9] uppercase opacity-70 sm:left-[7vw] sm:text-[10.5px]">
          Vol. I — The Pilgrim&apos;s Journal · Scroll
        </div>
      </section>

      {/* WHY PILGRIMAGE */}
      <section className="grid grid-cols-1 items-center gap-12 px-[7vw] py-20 sm:py-[130px] md:grid-cols-[1.15fr_0.85fr] md:gap-[7vw]">
        <div>
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            01 — On Pilgrimage
          </div>
          <p className="font-serif text-[clamp(24px,2.9vw,40px)] leading-[1.32] font-normal text-[#2C2A22]">
            <span className="float-left pt-[14px] pr-4 text-[5.2em] leading-[0.74] font-medium text-[#7C8A72]">
              A
            </span>
            pilgrimage is not merely a journey to a distant place. It is the unwavering resolve and
            the uncomplaining countenance of one who seeks a freedom beyond all bondage.
          </p>
          <p className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
            It is a chance to touch a deeper dimension of existence — to let grace and vitality flow
            back into ordinary life. The walking is the practice; the destination, only a doorway.
          </p>
          <div className="mt-[34px] inline-block cursor-pointer border-b border-[#25241E] pb-[5px] text-[12.5px] tracking-[0.14em] uppercase">
            Why pilgrimage →
          </div>
        </div>
        <div className="relative aspect-3/4 w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80&auto=format&fit=crop"
            alt="Pilgrim on the trail"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      </section>

      {/* THE YATRAS */}
      <section className="px-[7vw] pt-10 pb-20 sm:pt-10 sm:pb-[130px]">
        <div className="mb-2 flex items-end justify-between gap-4 border-b border-[#D8CFBD] pb-[26px]">
          <h2 className="font-serif text-[clamp(30px,4vw,60px)] leading-none font-medium">
            Four Journeys
          </h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            The Offerings
          </div>
        </div>

        {yatras.map((y) => (
          <Link
            key={y.slug}
            href={`/yatras/${y.slug}`}
            className="grid cursor-pointer grid-cols-[56px_1fr] items-center gap-x-6 gap-y-3 border-b border-[#E2D9C7] py-6 sm:grid-cols-[90px_1.6fr_1fr_150px] sm:gap-x-[34px] sm:gap-y-0 sm:py-[30px]"
          >
            <div className="font-serif text-[32px] leading-none text-[#B9AE97] sm:text-[44px]">
              {y.n}
            </div>
            <div>
              <div className="font-serif text-[clamp(24px,3vw,42px)] leading-[1.04] font-medium">
                {y.name}
              </div>
              <div className="mt-2 text-[13px] tracking-[0.06em] text-[#7C8A72]">{y.region}</div>
            </div>
            <div className="col-span-2 text-[13.5px] leading-[1.65] text-[#5F5C50] sm:col-span-1">
              {y.route}
            </div>
            <div className="col-span-2 text-left sm:col-span-1 sm:text-right">
              <div className="font-serif text-[26px] font-medium sm:text-[30px]">{y.days}</div>
              <div className="mt-1 text-[11px] tracking-[0.2em] text-[#9A917D] uppercase">
                View itinerary →
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* PULL QUOTE / EXPERIENCE */}
      <section className="overflow-hidden bg-[#25241E] px-[7vw] py-20 text-[#F0EADB] sm:py-[130px]">
        <div className="mb-10 text-[11.5px] tracking-[0.28em] text-[#9CA793] uppercase sm:mb-[40px]">
          02 — Sharings
        </div>
        <blockquote className="max-w-[1100px] font-serif text-[clamp(26px,4.4vw,66px)] leading-[1.16] font-normal tracking-[-0.01em]">
          &ldquo;Kailash — a journey of a lifetime. This experience cannot be put into words;{' '}
          <em className="font-normal text-[#B7C3AC] italic">it has to be experienced.</em>&rdquo;
        </blockquote>
        <div className="mt-10 text-[13px] tracking-[0.16em] text-[#A39C88] uppercase sm:mt-[40px]">
          Azniv — Kailash Manasarovar
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#F5F1E9]/16 pt-10 sm:mt-[90px] sm:grid-cols-2 sm:gap-[60px] sm:pt-[50px]">
          {sideTestimonials.map((t) => (
            <div key={t.name}>
              <p className="font-serif text-[19px] leading-[1.8] text-[#D8D2C2] italic sm:text-[21px]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-[18px] text-[12px] tracking-[0.16em] text-[#9CA793] uppercase">
                {t.name} — {t.from}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY MOSAIC */}
      <section className="px-[7vw] py-20 sm:py-[130px]">
        <div className="mb-10 flex items-end justify-between gap-4 sm:mb-[40px]">
          <h2 className="font-serif text-[clamp(26px,3.4vw,52px)] font-medium">From the Trail</h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            Gallery
          </div>
        </div>
        <div className="grid auto-rows-[130px] grid-cols-4 gap-[10px] sm:auto-rows-[200px] sm:grid-cols-6 sm:gap-[14px]">
          {galleryImages.map((img) => (
            <div key={img.src} className={`relative ${img.className}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 33vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[7vw] pt-24 text-center sm:pt-[110px]">
        <div className="mb-[26px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
          Begin
        </div>
        <h2 className="mx-auto max-w-[1000px] font-serif text-[clamp(32px,6vw,92px)] leading-[1.02] font-medium">
          The mountain is waiting for your feet.
        </h2>
        <div className="mt-[46px]">
          <EnquireButton className="inline-block cursor-pointer rounded-full bg-[#25241E] px-8 py-4 text-[12.5px] tracking-[0.18em] text-[#F5F1E9] uppercase sm:px-10">
            Enquire about a yatra
          </EnquireButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}
