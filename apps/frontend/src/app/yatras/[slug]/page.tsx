import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EnquireButton from '@/components/EnquireButton';
import Footer from '@/components/Footer';
import YatraConstantSections, { SacredWalksExperience } from '@/components/YatraConstantSections';
import { getSiteContent } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getSiteContent();
  const yatra = content.yatras.find((y) => y.slug === slug);
  if (!yatra) return {};
  return {
    title: `${yatra.name} — Sacred Walks`,
    description: yatra.overviewLead,
  };
}

export default async function YatraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getSiteContent();
  const yatra = content.yatras.find((y) => y.slug === slug);
  if (!yatra) notFound();

  return (
    <div className="bg-[#F5F1E9] text-[#25241E]">
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[520px] overflow-hidden sm:min-h-[600px]">
        <Image
          src={yatra.heroImage}
          alt={yatra.heroPlaceholder}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,21,14,.5)_0%,rgba(24,21,14,.08)_40%,rgba(24,21,14,.66)_100%)]" />

        <nav className="relative z-[3] flex items-center justify-between gap-4 px-[5vw] py-6 text-[#F5F1E9] sm:px-[7vw] sm:py-[30px]">
          <Link
            href="/"
            className="cursor-pointer text-[12px] tracking-[0.16em] uppercase opacity-90"
          >
            ← All journeys
          </Link>
          <span className="font-display text-[14px] tracking-[0.32em] uppercase sm:text-[17px]">
            Sacred Walks
          </span>
          <EnquireButton
            yatraName={yatra.name}
            className="cursor-pointer rounded-full border border-[#F5F1E9]/60 px-4 py-2 text-[10.5px] tracking-[0.18em] uppercase sm:px-5 sm:py-[9px] sm:text-[11.5px]"
          >
            Apply Now
          </EnquireButton>
        </nav>

        <div className="scw-fade-in absolute right-[5vw] bottom-[8vh] left-[5vw] z-[3] text-[#F5F1E9] sm:right-[7vw] sm:left-[7vw]">
          <h1 className="font-serif text-[clamp(38px,11vw,118px)] leading-[0.95] font-medium">
            {yatra.name}
          </h1>
        </div>
      </section>

      {/* ROUTE STRIP */}
      <div className="px-[7vw] pt-6 sm:pt-8">
        <div className="font-serif text-[clamp(24px,3.4vw,44px)] font-semibold tracking-[0.1em] text-[#25241E] uppercase">
          {yatra.route.replace(/·/g, '•')}
        </div>
      </div>

      {/* OVERVIEW + SPECS */}
      <section className="grid grid-cols-1 gap-12 px-[7vw] pt-4 pb-20 sm:pt-6 sm:pb-[120px] md:grid-cols-[1.3fr_0.7fr] md:gap-[7vw]">
        <div>
          <div className="mb-7 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            The Journey
          </div>
          <blockquote className="border-l-2 border-[#7C8A72]/50 pl-6 font-serif text-[clamp(20px,2.6vw,30px)] leading-[1.45] font-normal text-[#2C2A22]">
            &ldquo;{yatra.overviewLead}&rdquo;
          </blockquote>
          <p className="mt-7 max-w-[600px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
            {yatra.overviewBody}
          </p>

          {yatra.whyVisit && yatra.whyVisit.length > 0 && (
            <div className="mt-16">
              <div className="mb-7 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
                Why Visit?
              </div>
              {yatra.whyVisitQuote && (
                <blockquote className="mb-10 border-l-2 border-[#7C8A72]/50 pl-6 font-serif text-[clamp(20px,2.6vw,30px)] leading-[1.45] font-normal text-[#2C2A22]">
                  &ldquo;{yatra.whyVisitQuote}&rdquo;
                </blockquote>
              )}
              <div className="flex flex-col gap-6">
                {yatra.whyVisit.map((p, i) => (
                  <p key={i} className="text-[15.5px] leading-[1.85] text-[#5F5C50]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-[#25241E] pt-6">
          {yatra.specs.map((s) => (
            <div
              key={s.k}
              className="flex justify-between border-b border-[#E2D9C7] py-4 text-[13.5px]"
            >
              <span className="text-[11.5px] tracking-[0.14em] text-[#9A917D] uppercase">
                {s.k}
              </span>
              <span className="text-right text-[#3A382F]">{s.v}</span>
            </div>
          ))}

          {yatra.stays && yatra.stays.length > 0 && (
            <div className="mt-8 mb-1 text-[11.5px] tracking-[0.14em] text-[#9A917D] uppercase">
              Handpicked Stays
            </div>
          )}
          {yatra.stays?.map((group) => (
            <div
              key={group.place}
              className="flex justify-between border-b border-[#E2D9C7] py-4 text-[13.5px]"
            >
              <span className="text-[11.5px] tracking-[0.14em] text-[#9A917D] uppercase">
                {group.place}
              </span>
              <span className="flex flex-col items-end gap-1 text-right text-[#3A382F]">
                {group.options.map((option) => (
                  <span key={option}>• {option}</span>
                ))}
              </span>
            </div>
          ))}

          <div className="mt-[30px]">
            <EnquireButton
              yatraName={yatra.name}
              className="inline-block cursor-pointer rounded-full bg-[#25241E] px-[30px] py-[14px] text-[12px] tracking-[0.16em] text-[#F5F1E9] uppercase"
            >
              Apply for an Invitation
            </EnquireButton>
          </div>
        </div>
      </section>

      {/* JOURNEY HIGHLIGHTS */}
      {yatra.highlights && yatra.highlights.length > 0 && (
        <section className="bg-[#25241E] px-[7vw] py-10 text-[#F0EADB] sm:py-12">
          <div className="mb-3 border-b border-[#F5F1E9]/16 pb-4">
            <h2 className="font-serif text-[clamp(24px,3.2vw,40px)] font-medium">
              Journey Highlights
            </h2>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
            {yatra.highlights.map((item) => (
              <div
                key={item}
                className="border-b border-[#F5F1E9]/16 py-2.5 text-[14.5px] text-[#D8D2C2]"
              >
                • {item}
              </div>
            ))}
          </div>

          {yatra.highlightsOptional && yatra.highlightsOptional.length > 0 && (
            <>
              <p className="mt-6 text-[13px] tracking-[0.06em] text-[#9CA793] uppercase">
                Optional
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {yatra.highlightsOptional.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#F5F1E9]/30 px-4 py-2 text-[13px] text-[#D8D2C2]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      <SacredWalksExperience />

      {/* FEATURE IMAGE */}
      <div className="relative mx-auto mt-8 mb-10 h-[42vh] w-[92vw] max-w-[1280px] sm:mt-10 sm:mb-14 sm:h-[62vh] sm:w-[86vw]">
        <Image
          src={yatra.featureImage}
          alt={yatra.featurePlaceholder}
          fill
          className="object-cover"
          sizes="(min-width: 640px) 86vw, 92vw"
        />
      </div>

      {/* ITINERARY */}
      <section className="px-[7vw] pb-16 sm:pb-20">
        <div className="mb-3 flex items-end justify-between gap-4 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,56px)] font-medium">The Itinerary</h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            Day by Day
          </div>
        </div>
        {yatra.itinerary.map((d, i) => (
          <div
            key={d.day}
            className={`grid grid-cols-1 items-start gap-2 py-5 sm:grid-cols-[120px_220px_1fr] sm:gap-[30px] sm:py-6 ${
              i < yatra.itinerary.length - 1 ? 'border-b border-[#E2D9C7]' : ''
            }`}
          >
            <div className="font-serif text-[24px] text-[#B9AE97] sm:text-[30px]">{d.day}</div>
            <div className="font-display text-[17px] text-[#2C2A22] sm:text-[19px]">{d.place}</div>
            {Array.isArray(d.note) ? (
              <ul className="flex flex-col gap-2 text-[14px] leading-[1.7] text-[#5F5C50] sm:text-[15px]">
                {d.note.map((line, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rotate-45 bg-[#7C8A72]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-[14px] leading-[1.7] text-[#5F5C50] sm:text-[15px]">
                {d.note}
              </div>
            )}
          </div>
        ))}
      </section>

      <YatraConstantSections yatraName={yatra.name} />

      <Footer content={content} />
    </div>
  );
}
