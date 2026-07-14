import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EnquireButton from '@/components/EnquireButton';
import { yatras, getYatraBySlug } from '@/lib/yatras';

export function generateStaticParams() {
  return yatras.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yatra = getYatraBySlug(slug);
  if (!yatra) return {};
  return {
    title: `${yatra.name} — Sacred Walks`,
    description: yatra.overviewLead,
  };
}

export default async function YatraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yatra = getYatraBySlug(slug);
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
            Enquire
          </EnquireButton>
        </nav>

        <div className="scw-fade-in absolute right-[5vw] bottom-[8vh] left-[5vw] z-[3] text-[#F5F1E9] sm:right-[7vw] sm:left-[7vw]">
          <div className="mb-4 text-[11px] tracking-[0.3em] uppercase opacity-85 sm:mb-5 sm:text-[12px]">
            {yatra.days} · {yatra.region}
          </div>
          <h1 className="font-serif text-[clamp(38px,11vw,118px)] leading-[0.95] font-medium">
            {yatra.name}
          </h1>
        </div>
      </section>

      {/* OVERVIEW + SPECS */}
      <section className="grid grid-cols-1 items-start gap-12 px-[7vw] py-20 sm:py-[120px] md:grid-cols-[1.3fr_0.7fr] md:gap-[7vw]">
        <div>
          <div className="mb-7 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            The Journey
          </div>
          <p className="font-serif text-[clamp(22px,3vw,42px)] leading-[1.3] font-normal text-[#2C2A22]">
            {yatra.overviewLead}
          </p>
          <p className="mt-7 max-w-[600px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
            {yatra.overviewBody}
          </p>
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
          <div className="mt-[30px]">
            <EnquireButton
              yatraName={yatra.name}
              className="inline-block cursor-pointer rounded-full bg-[#25241E] px-[30px] py-[14px] text-[12px] tracking-[0.16em] text-[#F5F1E9] uppercase"
            >
              Reserve a place
            </EnquireButton>
          </div>
        </div>
      </section>

      {/* FEATURE IMAGE */}
      <div className="relative mx-auto mb-20 h-[42vh] w-[92vw] max-w-[1280px] sm:mb-[120px] sm:h-[62vh] sm:w-[86vw]">
        <Image
          src={yatra.featureImage}
          alt={yatra.featurePlaceholder}
          fill
          className="object-cover"
          sizes="(min-width: 640px) 86vw, 92vw"
        />
      </div>

      {/* ITINERARY */}
      <section className="px-[7vw] pb-20 sm:pb-[120px]">
        <div className="mb-3 flex items-end justify-between gap-4 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,56px)] font-medium">The Itinerary</h2>
          <div className="text-right text-[10px] tracking-[0.2em] text-[#7C8A72] uppercase sm:text-[11.5px] sm:tracking-[0.26em]">
            Day by Day
          </div>
        </div>
        {yatra.itinerary.map((d) => (
          <div
            key={d.day}
            className="grid grid-cols-1 items-baseline gap-2 border-b border-[#E2D9C7] py-5 sm:grid-cols-[120px_220px_1fr] sm:gap-[30px] sm:py-6"
          >
            <div className="font-serif text-[24px] text-[#B9AE97] sm:text-[30px]">{d.day}</div>
            <div className="font-display text-[17px] text-[#2C2A22] sm:text-[19px]">{d.place}</div>
            <div className="text-[14px] leading-[1.7] text-[#5F5C50] sm:text-[15px]">{d.note}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-[#25241E] px-[7vw] py-20 text-center text-[#F0EADB] sm:py-[120px]">
        <div className="mb-[26px] text-[11.5px] tracking-[0.28em] text-[#9CA793] uppercase">
          Walk with us
        </div>
        <h2 className="mx-auto max-w-[900px] font-serif text-[clamp(30px,5.5vw,82px)] leading-[1.05] font-medium">
          Some journeys ask for your whole being.
        </h2>
        <div className="mt-11">
          <EnquireButton
            yatraName={yatra.name}
            className="inline-block cursor-pointer rounded-full bg-[#F5F1E9] px-8 py-4 text-[12.5px] tracking-[0.18em] text-[#25241E] uppercase sm:px-10"
          >
            Enquire about {yatra.name}
          </EnquireButton>
        </div>
        <Link
          href="/"
          className="mt-[30px] block cursor-pointer text-[12px] tracking-[0.16em] text-[#9CA793] uppercase"
        >
          ← Back to all journeys
        </Link>
      </section>
    </div>
  );
}
