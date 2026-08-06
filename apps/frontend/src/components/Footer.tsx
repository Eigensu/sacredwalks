import Link from 'next/link';
import { yatras } from '@/lib/yatras';
import type { SiteContent } from '@/lib/content';

export default function Footer({ content }: { content: SiteContent }) {
  const { footer, settings } = content;
  const waDigits = settings.whatsappNumber.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${waDigits}${
    settings.whatsappMessage ? `?text=${encodeURIComponent(settings.whatsappMessage)}` : ''
  }`;
  return (
    <>
      <footer className="grid grid-cols-2 gap-10 border-t border-border px-[7vw] py-[36px] text-[13.5px] text-secondary max-sm:gap-y-8 max-sm:py-8 md:grid-cols-[1fr_1fr_1fr_1.4fr] md:gap-8">
        <div className="max-sm:col-span-2 max-sm:flex max-sm:flex-col max-sm:items-center">
          <span
            role="img"
            aria-label="Sacred Walks"
            className="block h-[160px] w-[117px] bg-label [mask-image:url(/44-trimmed.png)] [mask-position:left] [mask-repeat:no-repeat] [mask-size:contain] max-sm:h-[200px] max-sm:w-[146px]"
          />
        </div>
        <div className="max-sm:text-center">
          <div className="mb-[14px] text-[11px] tracking-[0.2em] text-label uppercase">Yatras</div>
          <div className="flex flex-col gap-[9px] max-sm:gap-0">
            {yatras.map((y) => (
              <Link
                key={y.slug}
                href={`/yatras/${y.slug}`}
                className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:justify-center hover:text-ink"
              >
                {y.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="max-sm:text-center">
          <div className="mb-[14px] text-[11px] tracking-[0.2em] text-label uppercase">Contact</div>
          <div className="flex flex-col gap-[9px] max-sm:gap-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:justify-center hover:text-ink"
            >
              WhatsApp
            </a>
            <a
              href={footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:justify-center hover:text-ink"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="max-sm:col-span-2 md:-ml-[35%]">
          <blockquote className="max-w-[420px] border-l-4 border-accent pl-4 font-serif text-[22px] leading-[1.45] text-heading max-sm:mx-auto max-sm:text-left max-sm:text-[18px]">
            <span className="text-label">&ldquo;</span>
            The path to the sacred is walked one humble step at a time, in faith, in surrender, and
            in stillness, where every temple bell, every sunrise over the ghats, and every quiet
            prayer draws us closer to the divine within.
            <span className="text-label">&rdquo;</span>
          </blockquote>
        </div>
      </footer>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-card-alt px-[7vw] py-6 text-[11px] tracking-[0.1em] text-label max-sm:justify-center max-sm:gap-x-6 max-sm:gap-y-0 max-sm:py-3">
        <div className="flex flex-wrap items-center gap-6 max-sm:hidden">
          <Link href="/privacy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms & Conditions
          </Link>
        </div>
        <a
          href="http://eigensu.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:text-[17px] hover:text-ink"
        >
          Powered @ EIGENSU
        </a>
      </div>
    </>
  );
}
