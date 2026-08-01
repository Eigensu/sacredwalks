import Link from 'next/link';

export default function ApplyInviteSection({
  applyInvite,
}: {
  applyInvite: {
    eyebrow: string;
    heading: string;
    steps: { title: string; body: string }[];
    ctaText: string;
  };
}) {
  return (
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
            <p className="max-w-[220px] text-[13.5px] leading-[1.6] text-[#D8D2C2]">{step.body}</p>
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
  );
}
