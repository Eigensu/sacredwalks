import { yatras } from '@/lib/yatras';

export default function Footer() {
  return (
    <>
      <footer className="mt-[80px] grid grid-cols-1 gap-10 border-t border-[#D8CFBD] px-[7vw] py-[60px] text-[13.5px] text-[#5F5C50] sm:mt-[120px] md:grid-cols-[2fr_1fr_1fr] md:gap-10">
        <div>
          <div className="mb-[18px] font-display text-[18px] tracking-[0.3em] text-[#25241E] uppercase">
            Sacred Walks
          </div>
          <p className="max-w-[340px] leading-[1.7]">
            Journeys to places of divine connection, where the veil between the physical and the
            spiritual grows thin.
          </p>
        </div>
        <div>
          <div className="mb-[14px] text-[11px] tracking-[0.2em] text-[#9A917D] uppercase">
            Offerings
          </div>
          <div className="flex flex-col gap-[9px]">
            {yatras.map((y) => (
              <span key={y.slug}>{y.name}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-[14px] text-[11px] tracking-[0.2em] text-[#9A917D] uppercase">
            Contact
          </div>
          <div className="flex flex-col gap-[9px]">
            <span>+91 8144 123 123</span>
            <span>info@sacredwalks.org</span>
            <span>Velliangiri Foothills, Coimbatore</span>
          </div>
        </div>
      </footer>
      <div className="border-t border-[#E2D9C7] px-[7vw] py-6 text-[11px] tracking-[0.1em] text-[#9A917D]">
        © 2026 Isha Sacred Walks — Concept redesign
      </div>
    </>
  );
}
