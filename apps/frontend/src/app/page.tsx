import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import EnquireButton from '@/components/EnquireButton';
import { getSiteContent, GALLERY_LAYOUT } from '@/lib/content';

export default async function Home() {
  const content = await getSiteContent();
  const { hero, pilgrimage, philosophy, gallery, cta } = content.home;
  const yatras = content.yatras;

  return (
    <div className="bg-[#F5F1E9]">
      {/* HERO */}
      {/* svh keeps the hero from resizing as mobile browser toolbars collapse. */}
      <section className="relative h-[83vh] min-h-[370px] overflow-hidden max-sm:h-[84svh] max-sm:min-h-[330px] sm:min-h-[420px]">
        <video
          src="/IMG_7788.MP4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 hidden h-full w-full object-cover max-sm:block"
        />
        <video
          src="/DJI_0502-web.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 hidden h-full w-full object-cover max-sm:hidden sm:block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,21,14,.42)_0%,rgba(24,21,14,.06)_34%,rgba(24,21,14,.62)_100%)]" />

        <Nav
          variant="dark"
          whatsappNumber={content.settings.whatsappNumber}
          whatsappMessage={content.settings.whatsappMessage}
          phoneNumber={content.footer.phone}
          logoImage="/44-trimmed.png"
        />
      </section>

      {/* INTRO STRIP */}
      <div className="flex flex-col items-center gap-3 pt-4 text-center max-sm:gap-5 max-sm:px-6 max-sm:pt-8">
        <p className="max-w-[700px] font-serif text-[clamp(14px,1.6vw,21px)] leading-[1.32] font-normal text-[#2C2A22]">
          &ldquo;Lorem ipsum dolor sit amet consectetur.&rdquo;
        </p>
        <EnquireButton className="group relative cursor-pointer overflow-hidden border border-[#25241E]/60 px-5 py-2 text-[9px] tracking-[0.18em] text-[#25241E] uppercase transition-colors duration-300 max-sm:min-h-11 max-sm:px-4 hover:text-[#F5F1E9]">
          <span className="absolute inset-0 origin-center scale-x-0 bg-[#25241E] transition-transform duration-300 group-hover:scale-x-100" />
          <span className="relative">Apply Now For Invitation</span>
        </EnquireButton>
      </div>

      {/* ABOUT THE JOURNEY */}
      <section
        id="about-the-journey"
        className="grid scroll-mt-24 grid-cols-1 items-center gap-10 px-[7vw] pt-12 pb-6 sm:gap-[7vw] sm:pt-16 sm:pb-8 md:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            {pilgrimage.eyebrow}
          </div>
          <p className="font-serif text-[clamp(24px,2.9vw,40px)] leading-[1.32] font-normal text-[#2C2A22]">
            {pilgrimage.lead}
          </p>
          {pilgrimage.body.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50] max-sm:mt-5 max-sm:text-[16px] max-sm:leading-[1.75]"
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
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            {philosophy.eyebrow}
          </div>
          <p className="font-serif text-[clamp(24px,2.9vw,40px)] leading-[1.32] font-normal text-[#2C2A22]">
            {philosophy.lead}
          </p>
          {philosophy.body.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50] max-sm:mt-5 max-sm:text-[16px] max-sm:leading-[1.75]"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* UPCOMING JOURNEYS */}
      <section className="px-[7vw] pt-10 pb-10 sm:pt-10 sm:pb-16">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-[#D8CFBD] pb-[26px] max-sm:mb-7 max-sm:gap-3 max-sm:pb-4 sm:mb-14">
          <h2 className="font-serif text-[clamp(30px,4vw,60px)] leading-none font-medium max-sm:text-[26px]">
            Upcoming Journeys
          </h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
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

                  <div className="absolute top-4 right-4 text-[13px] font-medium text-[#F5F1E9] max-sm:top-2.5 max-sm:right-2.5 max-sm:text-[11px]">
                    {y.days}
                  </div>

                  <div className="absolute right-5 bottom-5 left-5 max-sm:right-3 max-sm:bottom-3 max-sm:left-3">
                    <div className="font-serif text-[22px] font-medium text-[#F5F1E9] max-sm:text-[16px] max-sm:leading-[1.2] sm:text-[24px]">
                      {y.name}
                    </div>
                    <div className="mt-1.5 text-[12.5px] leading-[1.5] text-[#F5F1E9]/85 max-sm:mt-1 max-sm:text-[10.5px] max-sm:leading-[1.45]">
                      {y.route}
                    </div>
                  </div>
                </div>

                <div className="mt-3 border border-[#25241E] bg-[#25241E] px-4 py-2.5 text-center text-[11.5px] tracking-[0.08em] text-[#F5F1E9] uppercase max-sm:px-2.5 max-sm:py-2 max-sm:text-[9.5px]">
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
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
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
      <section className="px-[7vw] pt-6 text-center max-sm:pt-10 sm:pt-8">
        <div className="mb-[26px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase max-sm:mb-5 max-sm:text-[10.5px] max-sm:tracking-[0.22em]">
          {cta.eyebrow}
        </div>
        <h2 className="mx-auto max-w-[1000px] font-serif text-[clamp(32px,6vw,92px)] leading-[1.02] font-medium max-sm:leading-[1.14]">
          &ldquo;{cta.heading}&rdquo;
        </h2>
        <div className="mt-[46px] max-sm:mt-8">
          <EnquireButton className="inline-block cursor-pointer rounded-full bg-[#25241E] px-8 py-4 text-[12.5px] tracking-[0.18em] text-[#F5F1E9] uppercase max-sm:px-7 max-sm:text-[11.5px] max-sm:tracking-[0.14em] sm:px-10">
            {cta.buttonText}
          </EnquireButton>
        </div>
      </section>

      {/* BEFORE & AFTER — REDESIGN SHOWCASE */}
      <section className="px-[7vw] pt-10 pb-16 sm:pt-14 sm:pb-24">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-[#D8CFBD] pb-[26px] max-sm:mb-7 max-sm:gap-3 max-sm:pb-4 sm:mb-14">
          <h2 className="font-serif text-[clamp(30px,4vw,60px)] leading-none font-medium max-sm:text-[26px]">
            The Redesign
          </h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            Before &amp; After
          </div>
        </div>

        {/* BEFORE / AFTER PANELS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* BEFORE */}
          <div className="overflow-hidden rounded-sm border border-[#D8CFBD] bg-[#F5F1E9]">
            <div className="flex items-center justify-between border-b border-[#D8CFBD] px-6 py-4">
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#7C8A72] uppercase">
                Before
              </span>
              <span className="text-[10px] tracking-[0.16em] text-[#5F5C50] uppercase">
                Current Styling
              </span>
            </div>
            <div className="space-y-6 p-6 sm:p-8">
              <div className="text-[10px] tracking-[0.28em] text-[#7C8A72] uppercase">
                The Offerings
              </div>
              <p className="font-serif text-[clamp(20px,2.4vw,28px)] leading-[1.3] font-normal text-[#2C2A22]">
                A journey shaped by presence.
              </p>
              <p className="text-[14px] leading-[1.75] text-[#5F5C50]">
                Muted sage accents, warm cream, and a soft brown ink carry the copy and calls to
                action.
              </p>
              <button className="cursor-pointer border border-[#25241E]/60 px-6 py-2.5 text-[11px] tracking-[0.18em] text-[#25241E] uppercase">
                Apply Now
              </button>
            </div>
          </div>

          {/* AFTER */}
          <div className="overflow-hidden rounded-sm border border-[#4A3226] bg-[#E8D9C4]">
            <div className="flex items-center justify-between border-b border-[#4A3226]/15 px-6 py-4">
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#B85C2E] uppercase">
                After
              </span>
              <span className="text-[10px] tracking-[0.16em] text-[#4A3226] uppercase">
                New Design Language
              </span>
            </div>
            <div className="space-y-6 p-6 sm:p-8">
              <div className="text-[10px] tracking-[0.28em] text-[#B85C2E] uppercase">
                The Offerings
              </div>
              <p className="font-serif text-[clamp(20px,2.4vw,28px)] leading-[1.3] font-normal text-[#4A3226]">
                A journey shaped by presence.
              </p>
              <p className="text-[14px] leading-[1.75] text-[#4A3226]/75">
                A confident rust accent, deep navy ink, and a warmer cream ground the copy and calls
                to action.
              </p>
              <button className="cursor-pointer bg-[#B85C2E] px-6 py-2.5 text-[11px] tracking-[0.18em] text-[#E8D9C4] uppercase transition-transform duration-300 hover:scale-[1.03]">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* COMPONENT SHOWCASE — BEFORE / AFTER, SIDE BY SIDE */}
        <div className="mt-14 sm:mt-20">
          <div className="mb-8 text-[10px] tracking-[0.2em] text-[#B85C2E] uppercase sm:mb-10 sm:text-[11.5px] sm:tracking-[0.26em]">
            Design System — Before &amp; After
          </div>

          <div className="space-y-6">
            {/* Buttons */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-sm border border-[#D8CFBD] bg-[#F5F1E9] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#5F5C50] uppercase">
                    Buttons
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#7C8A72] uppercase">
                    Before
                  </span>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <button className="cursor-pointer border border-[#25241E]/60 px-6 py-2.5 text-[11px] tracking-[0.16em] text-[#25241E] uppercase">
                    Primary
                  </button>
                  <button className="cursor-pointer border border-[#7C8A72]/60 px-6 py-2.5 text-[11px] tracking-[0.16em] text-[#7C8A72] uppercase">
                    Secondary
                  </button>
                  <button className="cursor-pointer text-[11px] tracking-[0.16em] text-[#7C8A72] uppercase underline underline-offset-4">
                    Text Link
                  </button>
                </div>
              </div>
              <div className="rounded-sm border border-[#4A3226]/15 bg-[#E8D9C4] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#4A3226]/60 uppercase">
                    Buttons
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#B85C2E] uppercase">
                    After
                  </span>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <button className="cursor-pointer bg-[#B85C2E] px-6 py-2.5 text-[11px] tracking-[0.16em] text-[#E8D9C4] uppercase transition-colors duration-300 hover:bg-[#4A3226]">
                    Primary
                  </button>
                  <button className="cursor-pointer border border-[#4A3226] px-6 py-2.5 text-[11px] tracking-[0.16em] text-[#4A3226] uppercase transition-colors duration-300 hover:bg-[#4A3226] hover:text-[#E8D9C4]">
                    Secondary
                  </button>
                  <button className="cursor-pointer text-[11px] tracking-[0.16em] text-[#C6874F] uppercase underline underline-offset-4 transition-colors duration-300 hover:text-[#4A3226]">
                    Text Link
                  </button>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-sm border border-[#D8CFBD] bg-[#25241E] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#D8CFBD] uppercase">
                    Quote Card
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#7C8A72] uppercase">
                    Before
                  </span>
                </div>
                <p className="font-serif text-[clamp(18px,2vw,24px)] leading-[1.4] text-[#F5F1E9]">
                  &ldquo;The path asks nothing of you but presence.&rdquo;
                </p>
                <div className="mt-4 text-[11px] tracking-[0.12em] text-[#D8CFBD]/70 uppercase">
                  — A Pilgrim, Kailash Yatra
                </div>
              </div>
              <div className="rounded-sm border border-[#4A3226]/15 bg-[#4A3226] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#E9C17E] uppercase">
                    Quote Card
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#B85C2E] uppercase">
                    After
                  </span>
                </div>
                <p className="font-serif text-[clamp(18px,2vw,24px)] leading-[1.4] text-[#E8D9C4]">
                  &ldquo;The path asks nothing of you but presence.&rdquo;
                </p>
                <div className="mt-4 text-[11px] tracking-[0.12em] text-[#E9C17E]/80 uppercase">
                  — A Pilgrim, Kailash Yatra
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-sm border border-[#D8CFBD] bg-[#F5F1E9] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#5F5C50] uppercase">
                    Badges
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#7C8A72] uppercase">
                    Before
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="border border-[#25241E] bg-[#25241E] px-3 py-1 text-[10px] tracking-[0.1em] text-[#F5F1E9] uppercase">
                    Open
                  </span>
                  <span className="border border-[#7C8A72] px-3 py-1 text-[10px] tracking-[0.1em] text-[#7C8A72] uppercase">
                    Coming Soon
                  </span>
                  <span className="border border-[#5F5C50]/40 px-3 py-1 text-[10px] tracking-[0.1em] text-[#5F5C50] uppercase">
                    Closed
                  </span>
                </div>
              </div>
              <div className="rounded-sm border border-[#4A3226]/15 bg-[#E8D9C4] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#4A3226]/60 uppercase">
                    Badges
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#B85C2E] uppercase">
                    After
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#C6874F] px-3 py-1 text-[10px] tracking-[0.1em] text-[#E8D9C4] uppercase">
                    Open
                  </span>
                  <span className="rounded-full bg-[#E9C17E] px-3 py-1 text-[10px] tracking-[0.1em] text-[#4A3226] uppercase">
                    Coming Soon
                  </span>
                  <span className="rounded-full border border-[#4A3226]/40 px-3 py-1 text-[10px] tracking-[0.1em] text-[#4A3226] uppercase">
                    Closed
                  </span>
                </div>
              </div>
            </div>

            {/* Text Box */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-sm border border-[#D8CFBD] bg-[#F5F1E9] p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#5F5C50] uppercase">
                    Text Box
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#7C8A72] uppercase">
                    Before
                  </span>
                </div>
                <p className="text-[14px] leading-[1.75] text-[#5F5C50]">
                  Body copy sits on cream with a soft brown ink, and sage green carries emphasis and
                  interactive states.
                </p>
              </div>
              <div className="rounded-sm border border-[#4A3226]/15 bg-[#E8D9C4] p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#4A3226]/60 uppercase">
                    Text Box
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#B85C2E] uppercase">
                    After
                  </span>
                </div>
                <p className="text-[14px] leading-[1.75] text-[#4A3226]/80">
                  Body copy sits on a warm cream ground with deep navy ink for contrast, while rust
                  and teal carry emphasis and interactive states.
                </p>
              </div>
            </div>

            {/* CTA Block */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="rounded-sm border border-[#D8CFBD] bg-[#F5F1E9] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#5F5C50] uppercase">
                    CTA Section
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#7C8A72] uppercase">
                    Before
                  </span>
                </div>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-serif text-[20px] leading-[1.3] text-[#2C2A22]">
                    Begin your journey.
                  </p>
                  <button className="cursor-pointer bg-[#25241E] px-7 py-3 text-[11.5px] tracking-[0.18em] text-[#F5F1E9] uppercase">
                    Apply Now
                  </button>
                </div>
              </div>
              <div className="rounded-sm border border-[#4A3226]/15 bg-[#E8D9C4] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-[#4A3226]/60 uppercase">
                    CTA Section
                  </span>
                  <span className="text-[9.5px] tracking-[0.16em] text-[#B85C2E] uppercase">
                    After
                  </span>
                </div>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-serif text-[20px] leading-[1.3] text-[#4A3226]">
                    Begin your journey.
                  </p>
                  <button className="cursor-pointer bg-[#E8935A] px-7 py-3 text-[11.5px] tracking-[0.18em] text-[#4A3226] uppercase transition-colors duration-300 hover:bg-[#4A3226] hover:text-[#E8D9C4]">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}
