import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import EnquireButton from '@/components/EnquireButton';
import MembershipButton from '@/components/MembershipButton';
import VideoSection from '@/components/VideoSection';
import { getSiteContent, GALLERY_LAYOUT } from '@/lib/content';

export default async function Home() {
  const content = await getSiteContent();
  const { hero, pilgrimage, applyInvite, video, quote, testimonials, gallery, cta, curateOwn } =
    content.home;
  const { experience } = content;
  const yatras = content.yatras;
  const futureDestinations = content.futureDestinations;
  const waDigits = content.settings.whatsappNumber.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${waDigits}${
    content.settings.whatsappMessage
      ? `?text=${encodeURIComponent(content.settings.whatsappMessage)}`
      : ''
  }`;

  return (
    <div className="bg-[#F5F1E9]">
      {/* HERO */}
      <section className="relative h-[94vh] min-h-[560px] overflow-hidden sm:min-h-[680px]">
        <Image
          src={hero.image}
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
              {hero.eyebrow}
            </div>
            <h1 className="font-serif text-[clamp(38px,10vw,104px)] leading-[0.98] font-medium tracking-[-0.01em]">
              {hero.titleLine1}
              <br />
              <em className="font-normal not-italic italic">{hero.titleLine2}</em>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-6 sm:items-end">
            <div className="max-w-[300px] border-l border-[#F5F1E9]/45 pl-[22px] text-[13.5px] leading-[1.7] opacity-90 sm:text-[14.5px]">
              {hero.sideText}
            </div>
            <MembershipButton className="inline-block cursor-pointer rounded-full border border-[#F5F1E9]/60 px-7 py-3 text-[11.5px] tracking-[0.2em] text-[#F5F1E9] uppercase transition hover:bg-[#F5F1E9]/10">
              Become a Member
            </MembershipButton>
          </div>
        </div>
        <div className="absolute bottom-[2.6vh] left-[5vw] z-[3] text-[9.5px] tracking-[0.26em] text-[#F5F1E9] uppercase opacity-70 sm:left-[7vw] sm:text-[10.5px]">
          {hero.journalLine}
        </div>
      </section>

      {/* ABOUT — More Than A Journey */}
      <section className="grid grid-cols-1 items-center gap-12 px-[7vw] py-20 sm:py-[130px] md:grid-cols-[1.15fr_0.85fr] md:gap-[7vw]">
        <div>
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            {pilgrimage.eyebrow}
          </div>
          <p className="font-serif text-[clamp(24px,2.9vw,40px)] leading-[1.32] font-normal text-[#2C2A22]">
            {pilgrimage.lead}
          </p>
          <p className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
            {pilgrimage.body}
          </p>
        </div>
        <div className="relative aspect-3/4 w-full overflow-hidden">
          <Image
            src={pilgrimage.image}
            alt="Pilgrim on the trail"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      </section>

      {/* APPLY FOR AN INVITE — 3 step flow */}
      <section className="bg-[#25241E] px-[7vw] py-14 text-[#F0EADB] sm:py-20">
        <div className="mb-[14px] text-center text-[10.5px] tracking-[0.28em] text-[#9CA793] uppercase">
          {applyInvite.eyebrow}
        </div>
        <h2 className="mx-auto max-w-[900px] text-center font-serif text-[clamp(24px,3.6vw,44px)] leading-[1.1] font-medium">
          {applyInvite.heading}
        </h2>

        <div className="mx-auto mt-10 flex max-w-[900px] flex-col items-stretch gap-8 sm:mt-11 sm:flex-row sm:items-start sm:gap-6">
          {applyInvite.steps.map((step, i) => (
            <div key={step.title} className="flex flex-1 flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F1E9]/30 font-serif text-[16px]">
                {i + 1}
              </div>
              <p className="max-w-[220px] text-[13.5px] leading-[1.6] text-[#D8D2C2]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center sm:mt-10">
          <Link
            href="/apply"
            className="inline-block cursor-pointer rounded-full bg-[#F5F1E9] px-8 py-[13px] text-[12px] tracking-[0.18em] text-[#25241E] uppercase sm:px-10"
          >
            {applyInvite.ctaText}
          </Link>
        </div>
      </section>

      {/* FILM */}
      <VideoSection
        eyebrow={video.eyebrow}
        heading={video.heading}
        caption={video.caption}
        videoUrl={video.videoUrl}
        posterImage={video.posterImage}
      />

      {/* UPCOMING JOURNEYS */}
      <section className="px-[7vw] pt-10 pb-20 sm:pt-10 sm:pb-[130px]">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-[#D8CFBD] pb-[26px] sm:mb-14">
          <h2 className="font-serif text-[clamp(30px,4vw,60px)] leading-none font-medium">
            Upcoming Journeys
          </h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            The Offerings
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {yatras.map((y) => (
            <Link key={y.slug} href={`/yatras/${y.slug}`} className="group block cursor-pointer">
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <Image
                  src={y.heroImage}
                  alt={y.heroPlaceholder || y.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <div className="mt-5">
                <div className="font-serif text-[24px] font-medium text-[#2C2A22] sm:text-[28px]">
                  {y.name}
                </div>
                <div className="mt-2 text-[13px] leading-[1.5] text-[#7C8A72]">{y.route}</div>
                <div className="mt-4 text-[11px] tracking-[0.2em] text-[#25241E] uppercase">
                  Explore Journey →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {futureDestinations.length > 0 && (
          <div className="mt-16 border-t border-[#E2D9C7] pt-10 sm:mt-20">
            <div className="mb-4 text-[11px] tracking-[0.2em] text-[#9A917D] uppercase">
              Future Destinations
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-[15px] text-[#5F5C50]">
              {futureDestinations.map((d, i) => (
                <span key={d.name}>
                  {d.name}
                  {i < futureDestinations.length - 1 && (
                    <span className="ml-3 text-[#B9AE97]">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* THE SACRED WALKS EXPERIENCE — teaser */}
      <section className="grid grid-cols-1 items-center gap-12 border-t border-[#D8CFBD] px-[7vw] py-20 sm:py-[130px] md:grid-cols-[0.85fr_1.15fr] md:gap-[7vw]">
        <div className="relative aspect-3/4 w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80&auto=format&fit=crop"
            alt="A heritage hotel, handpicked for a Sacred Walk"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div>
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            {experience.eyebrow}
          </div>
          <p className="font-serif text-[clamp(24px,2.9vw,40px)] leading-[1.32] font-normal text-[#2C2A22]">
            {experience.heading}
          </p>
          <p className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
            {experience.intro[0]}
          </p>
          <Link
            href="/experience"
            className="mt-[34px] inline-block cursor-pointer border-b border-[#25241E] pb-[5px] text-[12.5px] tracking-[0.14em] uppercase"
          >
            Discover the Sacred Walks experience →
          </Link>
        </div>
      </section>

      {/* PULL QUOTE / EXPERIENCE */}
      <section className="overflow-hidden bg-[#25241E] px-[7vw] py-20 text-[#F0EADB] sm:py-[130px]">
        <div className="mb-10 text-[11.5px] tracking-[0.28em] text-[#9CA793] uppercase sm:mb-[40px]">
          {quote.eyebrow}
        </div>
        <blockquote className="max-w-[1100px] font-serif text-[clamp(26px,4.4vw,66px)] leading-[1.16] font-normal tracking-[-0.01em]">
          &ldquo;{quote.text}{' '}
          <em className="font-normal text-[#B7C3AC] italic">{quote.emphasis}</em>&rdquo;
        </blockquote>
        <div className="mt-10 text-[13px] tracking-[0.16em] text-[#A39C88] uppercase sm:mt-[40px]">
          {quote.attribution}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#F5F1E9]/16 pt-10 sm:mt-[90px] sm:grid-cols-2 sm:gap-[60px] sm:pt-[50px]">
          {testimonials.map((t) => (
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
          <h2 className="font-serif text-[clamp(26px,3.4vw,52px)] font-medium">
            {gallery.heading}
          </h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            {gallery.label}
          </div>
        </div>
        <div className="grid auto-rows-[130px] grid-cols-4 gap-[10px] sm:auto-rows-[200px] sm:grid-cols-6 sm:gap-[14px]">
          {gallery.images.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className={`relative ${GALLERY_LAYOUT[i % GALLERY_LAYOUT.length]}`}
            >
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

      {/* CURATE YOUR OWN — WhatsApp CTA */}
      <section className="grid grid-cols-1 items-center gap-12 px-[7vw] py-20 sm:py-[130px] md:grid-cols-[0.85fr_1.15fr] md:gap-[7vw]">
        <div className="relative aspect-3/4 w-full overflow-hidden">
          <Image
            src={curateOwn.image}
            alt="A private, personally curated Sacred Walk"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div>
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            {curateOwn.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] leading-[1.15] font-medium text-[#2C2A22]">
            {curateOwn.heading}
          </h2>
          <p className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
            {curateOwn.body}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[34px] inline-block cursor-pointer rounded-full bg-[#25241E] px-8 py-4 text-[12.5px] tracking-[0.18em] text-[#F5F1E9] uppercase"
          >
            {curateOwn.ctaText}
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[7vw] pt-24 text-center sm:pt-[110px]">
        <div className="mb-[26px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
          {cta.eyebrow}
        </div>
        <h2 className="mx-auto max-w-[1000px] font-serif text-[clamp(32px,6vw,92px)] leading-[1.02] font-medium">
          {cta.heading}
        </h2>
        <div className="mt-[46px]">
          <EnquireButton className="inline-block cursor-pointer rounded-full bg-[#25241E] px-8 py-4 text-[12.5px] tracking-[0.18em] text-[#F5F1E9] uppercase sm:px-10">
            {cta.buttonText}
          </EnquireButton>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}
