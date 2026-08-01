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
      <section className="relative h-[58vh] min-h-[370px] overflow-hidden sm:min-h-[420px]">
        <Image
          src={hero.image}
          alt="Kailash peak at first light"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,21,14,.42)_0%,rgba(24,21,14,.06)_34%,rgba(24,21,14,.62)_100%)]" />

        <Nav
          variant="dark"
          whatsappNumber={content.settings.whatsappNumber}
          whatsappMessage={content.settings.whatsappMessage}
          phoneNumber={content.footer.phone}
        />
      </section>

      {/* INTRO STRIP */}
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <p className="max-w-[700px] font-serif text-[clamp(20px,2.4vw,32px)] leading-[1.32] font-normal text-[#2C2A22]">
          &ldquo;Lorem ipsum dolor sit amet consectetur.&rdquo;
        </p>
        <EnquireButton className="group relative cursor-pointer overflow-hidden border border-[#25241E]/60 px-7 py-3 text-[11.5px] tracking-[0.2em] text-[#25241E] uppercase transition-colors duration-300 hover:text-[#F5F1E9]">
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
              className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50]"
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
        <div className="relative aspect-square w-full max-w-[420px] overflow-hidden md:order-1">
          <Image
            src={philosophy.image}
            alt="A quiet moment on the path"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="md:order-2">
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            {philosophy.eyebrow}
          </div>
          <p className="font-serif text-[clamp(24px,2.9vw,40px)] leading-[1.32] font-normal text-[#2C2A22]">
            {philosophy.lead}
          </p>
          {philosophy.body.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50]"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* UPCOMING JOURNEYS */}
      <section className="px-[7vw] pt-10 pb-10 sm:pt-10 sm:pb-16">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-[#D8CFBD] pb-[26px] sm:mb-14">
          <h2 className="font-serif text-[clamp(30px,4vw,60px)] leading-none font-medium">
            Upcoming Journeys
          </h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            The Offerings
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {yatras
            .filter((y) => y.slug !== 'rameswaram-shiva-to-the-sea')
            .map((y) => (
              <Link
                key={y.slug}
                href={`/yatras/${y.slug}`}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[6px] cursor-pointer"
              >
                <Image
                  src={y.heroImage}
                  alt={y.heroPlaceholder || y.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,21,14,.15)_0%,rgba(24,21,14,.05)_35%,rgba(24,21,14,.85)_100%)]" />

                <div className="absolute top-4 right-4 text-[13px] font-medium text-[#F5F1E9]">
                  {y.days}
                </div>

                <div className="absolute right-5 bottom-5 left-5">
                  <div className="font-serif text-[22px] font-medium text-[#F5F1E9] sm:text-[24px]">
                    {y.name}
                  </div>
                  <div className="mt-1.5 text-[12.5px] leading-[1.5] text-[#F5F1E9]/85">
                    {y.route}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* GALLERY MOSAIC */}
      <section className="px-[7vw] pt-10 pb-10 sm:pt-12 sm:pb-16">
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

      {/* CTA */}
      <section className="px-[7vw] pt-6 text-center sm:pt-8">
        <div className="mb-[26px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
          {cta.eyebrow}
        </div>
        <h2 className="mx-auto max-w-[1000px] font-serif text-[clamp(32px,6vw,92px)] leading-[1.02] font-medium">
          &ldquo;{cta.heading}&rdquo;
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
