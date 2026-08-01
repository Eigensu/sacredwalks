import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import EnquireButton from '@/components/EnquireButton';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'The Sacred Walks Experience',
  description:
    'Travel differently. Journey meaningfully. What every Sacred Walks pilgrimage includes.',
};

export default async function ExperiencePage() {
  const content = await getSiteContent();
  const { experience } = content;

  return (
    <div className="bg-[#F5F1E9] text-[#25241E]">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[440px] overflow-hidden sm:min-h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=80&auto=format&fit=crop"
          alt="Temple corridor at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,21,14,.5)_0%,rgba(24,21,14,.1)_40%,rgba(24,21,14,.68)_100%)]" />
        <Nav
          variant="dark"
          whatsappNumber={content.settings.whatsappNumber}
          whatsappMessage={content.settings.whatsappMessage}
          phoneNumber={content.footer.phone}
        />
        <div className="absolute right-[5vw] bottom-[8vh] left-[5vw] z-[3] text-[#F5F1E9] sm:right-[7vw] sm:left-[7vw]">
          <div className="mb-4 text-[11px] tracking-[0.3em] uppercase opacity-85 sm:mb-5 sm:text-[12px]">
            {experience.eyebrow}
          </div>
          <h1 className="font-serif text-[clamp(32px,8vw,86px)] leading-[1.02] font-medium">
            {experience.heading}
          </h1>
        </div>
      </section>

      {/* INTRO — pull quote, matching the homepage's Sharings section */}
      <section className="overflow-hidden bg-[#25241E] px-[7vw] py-20 text-[#F0EADB] sm:py-[130px]">
        <div className="mb-10 text-[11.5px] tracking-[0.28em] text-[#9CA793] uppercase sm:mb-[40px]">
          The Belief
        </div>
        <blockquote className="max-w-[1100px] font-serif text-[clamp(26px,4.4vw,60px)] leading-[1.16] font-normal tracking-[-0.01em]">
          &ldquo;{experience.intro[0]}&rdquo;
        </blockquote>
        <div className="mt-10 flex flex-col gap-5 border-t border-[#F5F1E9]/16 pt-10 sm:mt-[60px] sm:pt-[50px]">
          {experience.intro.slice(1).map((p, i) => (
            <p key={i} className="max-w-[680px] text-[15.5px] leading-[1.85] text-[#D8D2C2]">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* INCLUDED THROUGHOUT EVERY JOURNEY */}
      <section className="px-[7vw] pb-20 sm:pb-[120px]">
        <div className="mb-3 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            Included Throughout Every Journey
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-3 pt-8 sm:grid-cols-2">
          {experience.included.map((item) => (
            <div key={item} className="border-b border-[#E2D9C7] py-3 text-[14.5px] text-[#3A382F]">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* HANDPICKED STAYS */}
      <section className="grid grid-cols-1 items-center gap-12 px-[7vw] pb-20 sm:pb-[120px] md:grid-cols-[0.85fr_1.15fr] md:gap-[7vw]">
        <div className="relative aspect-3/4 w-full overflow-hidden md:order-2">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80&auto=format&fit=crop"
            alt="A heritage hotel room"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="md:order-1">
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            Stay
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,44px)] leading-[1.2] font-medium">
            {experience.stays.heading}
          </h2>
          <p className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
            {experience.stays.body}
          </p>
          <p className="mt-4 text-[13px] tracking-[0.06em] text-[#9A917D]">
            {experience.stays.note}
          </p>
        </div>
      </section>

      {/* PERSONALISED RITUALS */}
      <section className="bg-[#25241E] px-[7vw] py-20 text-[#F0EADB] sm:py-[120px]">
        <div className="mb-3 border-b border-[#F5F1E9]/16 pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            {experience.rituals.heading}
          </h2>
        </div>
        <p className="mt-8 max-w-[680px] text-[15px] leading-[1.85] text-[#D8D2C2]">
          {experience.rituals.intro}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-12 sm:mt-[50px] sm:grid-cols-2 sm:gap-[60px]">
          <div>
            <div className="mb-5 text-[11px] tracking-[0.2em] text-[#9CA793] uppercase">
              Available Rituals
            </div>
            <ul className="flex flex-col gap-3">
              {experience.rituals.general.map((r) => (
                <li key={r} className="text-[14.5px] text-[#D8D2C2]">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-5 text-[11px] tracking-[0.2em] text-[#9CA793] uppercase">
              Destination-Specific Rituals
            </div>
            <ul className="flex flex-col gap-3">
              {experience.rituals.destinationSpecific.map((r) => (
                <li key={r} className="text-[14.5px] text-[#D8D2C2]">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OPTIONAL ENHANCEMENTS */}
      <section className="px-[7vw] py-20 sm:py-[120px]">
        <div className="mb-3 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            {experience.enhancements.heading}
          </h2>
          <p className="mt-3 text-[13.5px] text-[#9A917D]">{experience.enhancements.intro}</p>
        </div>
        <div className="flex flex-wrap gap-3 pt-8">
          {experience.enhancements.items.map((e) => (
            <span
              key={e}
              className="rounded-full border border-[#D8CFBD] px-4 py-2 text-[13px] text-[#3A382F]"
            >
              {e}
            </span>
          ))}
        </div>
      </section>

      {/* CONCIERGE */}
      <section className="px-[7vw] pb-20 sm:pb-[120px]">
        <div className="mb-3 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            {experience.concierge.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 pt-8 sm:grid-cols-2 sm:gap-[7vw]">
          <div>
            <div className="mb-5 text-[11.5px] tracking-[0.2em] text-[#7C8A72] uppercase">
              Before Your Journey
            </div>
            <ul className="flex flex-col gap-3">
              {experience.concierge.before.map((c) => (
                <li key={c} className="text-[14.5px] text-[#3A382F]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-5 text-[11.5px] tracking-[0.2em] text-[#7C8A72] uppercase">
              During Your Journey
            </div>
            <ul className="flex flex-col gap-3">
              {experience.concierge.during.map((c) => (
                <li key={c} className="text-[14.5px] text-[#3A382F]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WELCOME KIT */}
      <section className="grid grid-cols-1 items-center gap-12 px-[7vw] pb-20 sm:pb-[120px] md:grid-cols-[1.15fr_0.85fr] md:gap-[7vw]">
        <div>
          <div className="mb-[30px] text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            A Keepsake
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,44px)] leading-[1.2] font-medium">
            {experience.welcomeKit.heading}
          </h2>
          <p className="mt-[26px] max-w-[520px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
            {experience.welcomeKit.intro}
          </p>
          <ul className="mt-8 flex flex-col gap-2">
            {experience.welcomeKit.items.map((item) => (
              <li key={item} className="text-[14.5px] text-[#3A382F]">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-3/4 w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80&auto=format&fit=crop"
            alt="Prayer essentials and journal"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      </section>

      {/* WHY TRAVEL WITH US */}
      <section className="px-[7vw] pb-20 sm:pb-[120px]">
        <div className="mb-3 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            {experience.whyUs.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-3 pt-8 sm:grid-cols-2">
          {experience.whyUs.items.map((item) => (
            <div key={item} className="border-b border-[#E2D9C7] py-3 text-[14.5px] text-[#3A382F]">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* IMPORTANT INFORMATION */}
      <section className="px-[7vw] pb-20 sm:pb-[120px]">
        <div className="border-t border-[#25241E] pt-8">
          <div className="mb-4 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            {experience.importantInfo.heading}
          </div>
          <div className="flex max-w-[820px] flex-col gap-4">
            {experience.importantInfo.body.map((p, i) => (
              <p key={i} className="text-[14px] leading-[1.85] text-[#5F5C50]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#25241E] px-[7vw] py-20 text-center text-[#F0EADB] sm:py-[120px]">
        <div className="mb-[26px] text-[11.5px] tracking-[0.28em] text-[#9CA793] uppercase">
          Begin
        </div>
        <h2 className="mx-auto max-w-[900px] font-serif text-[clamp(30px,5.5vw,82px)] leading-[1.05] font-medium">
          Let us curate your pilgrimage.
        </h2>
        <div className="mt-11">
          <EnquireButton className="inline-block cursor-pointer rounded-full bg-[#F5F1E9] px-8 py-4 text-[12.5px] tracking-[0.18em] text-[#25241E] uppercase sm:px-10">
            Apply for an Invitation
          </EnquireButton>
        </div>
        <Link
          href="/"
          className="mt-[30px] block cursor-pointer text-[12px] tracking-[0.16em] text-[#9CA793] uppercase"
        >
          ← Back to all journeys
        </Link>
      </section>

      <Footer content={content} />
    </div>
  );
}
