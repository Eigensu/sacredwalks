import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import type { SiteContent } from '@/lib/content';

export default function Footer({ content }: { content: SiteContent }) {
  const { footer, settings } = content;
  const waDigits = settings.whatsappNumber.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${waDigits}${
    settings.whatsappMessage ? `?text=${encodeURIComponent(settings.whatsappMessage)}` : ''
  }`;
  return (
    <>
      <footer className="mt-10 grid grid-cols-1 gap-10 border-t border-[#D8CFBD] px-[7vw] py-[60px] text-[13.5px] text-[#5F5C50] sm:mt-14 md:grid-cols-[2fr_1fr_1.2fr] md:gap-10">
        <div>
          <div className="mb-[14px] font-display text-[18px] tracking-[0.3em] text-[#25241E] uppercase">
            Sacred Walks
          </div>
          <div className="text-[10.5px] tracking-[0.2em] text-[#9A917D] uppercase">Invite Only</div>
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
          </div>
        </div>
        <div>
          <div className="mb-[14px] text-[11px] tracking-[0.2em] text-[#9A917D] uppercase">
            {footer.newsletterHeading}
          </div>
          <NewsletterForm />
        </div>
      </footer>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2D9C7] px-[7vw] py-6 text-[11px] tracking-[0.1em] text-[#9A917D]">
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/privacy" className="hover:text-[#25241E]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#25241E]">
            Terms & Conditions
          </Link>
        </div>
        <a
          href="http://eigensu.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#25241E]"
        >
          Powered @ EIGENSU
        </a>
      </div>
    </>
  );
}
