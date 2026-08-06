import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import EnquireButton from '@/components/EnquireButton';
import { getSiteContent, GALLERY_LAYOUT } from '@/lib/content';

export default async function Home() {
  const content = await getSiteContent();
  const { intro, pilgrimage, philosophy, gallery, cta } = content.home;
  const yatras = content.yatras;

  return (
    <div className="bg-surface">
      {/* HERO */}
      {/* svh keeps the hero from resizing as mobile browser toolbars collapse. */}
      <section className="relative h-[83vh] min-h-[370px] overflow-hidden bg-surface max-sm:h-[84svh] max-sm:min-h-[330px] sm:min-h-[420px]">
        <video
          src="/IMG_7788-web.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 hidden h-full w-full object-cover max-sm:block"
        />
        <video
          src="/Final-16x9-web.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 hidden h-full w-full object-contain max-sm:hidden sm:block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,21,14,.42)_0%,rgba(24,21,14,.06)_34%,rgba(24,21,14,.62)_100%)] sm:hidden" />

        <Nav
          variant="light"
          whatsappNumber={content.settings.whatsappNumber}
          whatsappMessage={content.settings.whatsappMessage}
          phoneNumber={content.footer.phone}
          logoImage="/44-trimmed.png"
        />
      </section>

      {/* INTRO STRIP */}
      <div className="flex flex-col items-center gap-3 pt-4 text-center max-sm:gap-5 max-sm:px-6 max-sm:pt-8">
        <p className="max-w-[700px] font-serif text-[clamp(14px,1.6vw,21px)] leading-[1.32] font-normal text-heading">
          <span className="text-label">&ldquo;</span>
          {intro.quote}
          <span className="text-label">&rdquo;</span>
        </p>
        <EnquireButton className="group relative cursor-pointer overflow-hidden border border-ink/60 px-5 py-2 text-[9px] tracking-[0.18em] text-ink uppercase transition-colors duration-300 max-sm:min-h-11 max-sm:px-4 hover:text-surface">
          <span className="absolute inset-0 origin-center scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
          <span className="relative">{intro.buttonText}</span>
        </EnquireButton>
      </div>

      {/* ABOUT THE JOURNEY */}
      <section
        id="about-the-journey"
        className="grid scroll-mt-24 grid-cols-1 items-center gap-10 px-[7vw] pt-12 pb-6 sm:gap-[7vw] sm:pt-16 sm:pb-8 md:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-accent uppercase">
            {pilgrimage.eyebrow}
          </div>
          <p className="font-serif text-[clamp(24px,2.9vw,40px)] leading-[1.32] font-normal text-heading">
            {pilgrimage.lead}
          </p>
          {pilgrimage.body.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-secondary max-sm:mt-5 max-sm:text-[16px] max-sm:leading-[1.75]"
            >
              {para}
            </p>
          ))}
        </div>
        <div className="relative aspect-square w-full max-w-[420px] justify-self-center overflow-hidden md:justify-self-end">
          <Image
            src={pilgrimage.image}
            alt="Pilgrim on the trail"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section
        id="our-philosophy"
        className="grid scroll-mt-24 grid-cols-1 items-center gap-10 px-[7vw] pt-6 pb-12 sm:gap-[7vw] sm:pt-8 sm:pb-16 md:grid-cols-[0.85fr_1.15fr]"
      >
        {/* On phones the copy leads, so the two section photos aren't back to back. */}
        <div className="relative aspect-square w-full max-w-[420px] overflow-hidden max-sm:order-2 md:order-1">
          <Image
            src={philosophy.image}
            alt="A quiet moment on the path"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="max-sm:order-1 md:order-2">
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-accent uppercase">
            {philosophy.eyebrow}
          </div>
          <p className="font-serif text-[clamp(24px,2.9vw,40px)] leading-[1.32] font-normal text-heading">
            {philosophy.lead}
          </p>
          {philosophy.body.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-secondary max-sm:mt-5 max-sm:text-[16px] max-sm:leading-[1.75]"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* UPCOMING JOURNEYS */}
      <section className="px-[7vw] pt-10 pb-10 sm:pt-10 sm:pb-16">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-[26px] max-sm:mb-7 max-sm:gap-3 max-sm:pb-4 sm:mb-14">
          <h2 className="font-serif text-[clamp(30px,4vw,60px)] leading-none font-medium max-sm:text-[26px]">
            Upcoming Journeys
          </h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-accent uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            The Offerings
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {yatras.map((y) => {
            const statusLabel =
              y.status === 'closed'
                ? 'Registrations Closed'
                : y.status === 'opening-soon'
                  ? 'Coming Soon'
                  : 'Open for Registrations';
            const statusClass =
              y.status === 'closed'
                ? 'border-status-closed bg-status-closed text-heading'
                : y.status === 'opening-soon'
                  ? 'border-status-opening-soon bg-status-opening-soon text-surface'
                  : 'border-status-open bg-status-open text-surface';
            return (
              <Link
                key={y.slug}
                href={`/yatras/${y.slug}`}
                className="group block w-full cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={y.heroImage}
                    alt={y.heroPlaceholder || y.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,21,14,.15)_0%,rgba(24,21,14,.05)_35%,rgba(24,21,14,.85)_100%)]" />

                  <div className="absolute top-4 right-4 text-[13px] font-medium text-surface max-sm:top-2.5 max-sm:right-2.5 max-sm:text-[11px]">
                    {y.days}
                  </div>

                  <div className="absolute right-5 bottom-5 left-5 max-sm:right-3 max-sm:bottom-3 max-sm:left-3">
                    <div className="font-serif text-[22px] font-medium text-surface max-sm:text-[16px] max-sm:leading-[1.2] sm:text-[24px]">
                      {y.name}
                    </div>
                    <div className="mt-1.5 text-[12.5px] leading-[1.5] text-surface/85 max-sm:mt-1 max-sm:text-[10.5px] max-sm:leading-[1.45]">
                      {y.route}
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-3 border px-4 py-2.5 text-center text-[11.5px] tracking-[0.08em] uppercase max-sm:px-2.5 max-sm:py-2 max-sm:text-[9.5px] ${statusClass}`}
                >
                  {statusLabel}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* GALLERY MOSAIC */}
      <section className="px-[7vw] pt-10 pb-10 sm:pt-12 sm:pb-16">
        <div className="mb-10 flex items-end justify-between gap-4 max-sm:mb-6 max-sm:gap-3 sm:mb-[40px]">
          <h2 className="font-serif text-[clamp(26px,3.4vw,52px)] font-medium max-sm:text-[26px]">
            {gallery.heading}
          </h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-accent uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            {gallery.label}
          </div>
        </div>
        {/* Mosaic from 640px up; a snap-scrolling strip on phones, where the
            mosaic would shrink some tiles to ~76px wide. */}
        <div
          className="scw-swipe grid auto-rows-[130px] grid-cols-4 gap-[10px] max-sm:-mr-[7vw] max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:overscroll-x-contain max-sm:pr-[7vw] sm:auto-rows-[200px] sm:grid-cols-6 sm:gap-[14px]"
          role="group"
          aria-label={`${gallery.heading} — swipe to browse on mobile`}
        >
          {gallery.images.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className={`relative ${GALLERY_LAYOUT[i % GALLERY_LAYOUT.length]} max-sm:aspect-[4/5] max-sm:w-[74%] max-sm:shrink-0 max-sm:snap-start`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 33vw, 74vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[7vw] pt-6 pb-16 text-center max-sm:pt-10 max-sm:pb-12 sm:pt-8 sm:pb-20">
        <div className="mb-[26px] text-[11.5px] tracking-[0.28em] text-accent uppercase max-sm:mb-5 max-sm:text-[10.5px] max-sm:tracking-[0.22em]">
          {cta.eyebrow}
        </div>
        <h2 className="mx-auto max-w-[1000px] font-serif text-[clamp(20px,4.4vw,72px)] leading-[1.15] font-medium text-ink">
          <span className="text-label">&ldquo;</span>
          {cta.heading}
          <span className="text-label">&rdquo;</span>
        </h2>
        <div className="mt-[46px] mb-6 max-sm:mt-8">
          <EnquireButton className="inline-block cursor-pointer bg-accent px-8 py-4 text-[12.5px] tracking-[0.18em] text-white uppercase max-sm:px-7 max-sm:text-[11.5px] max-sm:tracking-[0.14em] sm:px-10">
            {cta.buttonText}
          </EnquireButton>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}
