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
      <footer className="grid grid-cols-1 gap-10 px-[7vw] py-[60px] text-[13.5px] text-[#5F5C50] max-sm:gap-8 max-sm:py-11 md:grid-cols-[2fr_1fr_1.2fr] md:gap-10">
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
          <div className="flex flex-col gap-[9px] max-sm:gap-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center hover:text-[#25241E]"
            >
              WhatsApp
            </a>
            <a
              href={footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center hover:text-[#25241E]"
            >
              Instagram
            </a>
            <a
              href={`mailto:${footer.email}`}
              className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center hover:text-[#25241E]"
            >
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
      <div className="flex items-center justify-center px-[7vw] pt-2 pb-6 text-[17px] tracking-[0.1em] text-[#9A917D] max-sm:pt-1 max-sm:pb-3">
        <a
          href="http://eigensu.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:inline-flex max-sm:min-h-11 max-sm:items-center hover:text-[#25241E]"
        >
          Powered @ EIGENSU
        </a>
      </div>
    </>
  );
}
