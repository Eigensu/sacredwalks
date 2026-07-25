import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import type { SiteContent } from '@/lib/content';

export default function Footer({ content }: { content: SiteContent }) {
  const { footer, yatras, settings } = content;
  const waDigits = settings.whatsappNumber.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${waDigits}${
    settings.whatsappMessage ? `?text=${encodeURIComponent(settings.whatsappMessage)}` : ''
  }`;
  return (
    <>
      <footer className="mt-[80px] grid grid-cols-1 gap-10 border-t border-[#D8CFBD] px-[7vw] py-[60px] text-[13.5px] text-[#5F5C50] sm:mt-[120px] md:grid-cols-[2fr_1fr_1fr_1.2fr] md:gap-10">
        <div>
          <div className="mb-[18px] font-display text-[18px] tracking-[0.3em] text-[#25241E] uppercase">
            Sacred Walks
          </div>
          <p className="max-w-[340px] leading-[1.7]">{footer.tagline}</p>
          <div className="mt-[14px] text-[10.5px] tracking-[0.2em] text-[#9A917D] uppercase">
            Invite Only
          </div>
        </div>
        <div>
          <div className="mb-[14px] text-[11px] tracking-[0.2em] text-[#9A917D] uppercase">
            Offerings
          </div>
          <div className="flex flex-col gap-[9px]">
            {yatras.map((y) => (
              <Link key={y.slug} href={`/yatras/${y.slug}`} className="hover:text-[#25241E]">
                {y.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-[14px] text-[11px] tracking-[0.2em] text-[#9A917D] uppercase">
            Contact
          </div>
          <div className="flex flex-col gap-[9px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25241E]"
            >
              WhatsApp
            </a>
            <a
              href={footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25241E]"
            >
              Instagram
            </a>
            <a href={`mailto:${footer.email}`} className="hover:text-[#25241E]">
              {footer.email}
            </a>
            <span>{footer.phone}</span>
          </div>
        </div>
        <div>
          <div className="mb-[14px] text-[11px] tracking-[0.2em] text-[#9A917D] uppercase">
            {footer.newsletterHeading}
          </div>
          <p className="mb-4 leading-[1.7]">{footer.newsletterSub}</p>
          <NewsletterForm />
        </div>
      </footer>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2D9C7] px-[7vw] py-6 text-[11px] tracking-[0.1em] text-[#9A917D]">
        <span>{footer.copyright}</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-[#25241E]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#25241E]">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </>
  );
}
