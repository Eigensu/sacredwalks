'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useEnquiry } from './EnquiryProvider';
import { yatras } from '@/lib/yatras';

const menuItems: { label: string; href: string }[] = [
  { label: 'About the Journey', href: '/#about-the-journey' },
  { label: 'Our Philosophy', href: '/#our-philosophy' },
];

const trailingMenuItems: { label: string; href: string }[] = [
  { label: 'Programme Guide', href: '#' },
  { label: 'Dates & Registration', href: '#' },
  { label: 'Customised Itineraries', href: '#' },
  { label: 'Frequently Asked Questions', href: '#' },
];

export default function Nav({
  variant = 'dark',
  whatsappNumber,
  whatsappMessage,
  phoneNumber,
}: {
  variant?: 'dark' | 'light';
  whatsappNumber?: string;
  whatsappMessage?: string;
  phoneNumber?: string;
}) {
  const { open } = useEnquiry();
  const waDigits = whatsappNumber?.replace(/[^\d]/g, '');
  const whatsappUrl = waDigits
    ? `https://wa.me/${waDigits}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ''}`
    : undefined;
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripsOpen, setTripsOpen] = useState(false);
  const [callPopoverOpen, setCallPopoverOpen] = useState(false);
  const textColor = variant === 'dark' ? 'text-[#F5F1E9]' : 'text-[#25241E]';
  const borderColor = variant === 'dark' ? 'border-[#F5F1E9]/60' : 'border-[#25241E]/60';

  return (
    <nav
      className={`relative z-20 grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-[5vw] py-6 sm:px-[7vw] sm:py-[30px] ${textColor}`}
    >
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
        className="absolute top-1/2 left-4 flex -translate-y-1/2 shrink-0 cursor-pointer flex-col items-start justify-center gap-[5px] p-1 sm:left-5"
      >
        <span className="block h-px w-6 bg-current" />
        <span className="block h-px w-6 bg-current" />
        <span className="block h-px w-4 bg-current" />
      </button>

      <span aria-hidden className="shrink-0 justify-self-start" />

      <Link href="/" className="shrink-0 justify-self-center">
        <span className="font-display text-[15px] tracking-[0.32em] uppercase sm:text-[19px]">
          Sacred Walks
        </span>
      </Link>

      <div className="-mr-8 flex shrink-0 items-center gap-4 justify-self-end sm:-mr-10">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex shrink-0 cursor-pointer items-center justify-center p-1 opacity-90 transition-opacity hover:opacity-100"
          >
            <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M16.04 4C9.42 4 4.05 9.36 4.05 15.97c0 2.11.55 4.17 1.6 5.99L4 28l6.19-1.62a12 12 0 0 0 5.85 1.49h.01c6.61 0 11.98-5.36 11.98-11.97 0-3.2-1.25-6.21-3.51-8.47A11.9 11.9 0 0 0 16.04 4Zm0 21.85h-.01a9.9 9.9 0 0 1-5.06-1.39l-.36-.21-3.67.96.98-3.58-.24-.37a9.93 9.93 0 0 1-1.52-5.29c0-5.5 4.48-9.97 9.99-9.97 2.66 0 5.17 1.04 7.05 2.92a9.92 9.92 0 0 1 2.92 7.06c0 5.5-4.48 9.87-9.98 9.87h-.1Zm5.47-7.4c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.41-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
            </svg>
          </a>
        )}
        {phoneNumber && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setCallPopoverOpen((v) => !v)}
              aria-label="Show phone number"
              aria-expanded={callPopoverOpen}
              className="flex shrink-0 cursor-pointer items-center justify-center p-1 opacity-90 transition-opacity hover:opacity-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
              </svg>
            </button>
            {callPopoverOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setCallPopoverOpen(false)} />
                <div className="absolute top-full right-0 z-40 mt-3 whitespace-nowrap rounded-[4px] bg-[#25241E] px-4 py-2.5 text-[12.5px] tracking-[0.04em] text-[#F5F1E9] shadow-[0_8px_28px_rgba(20,18,12,.28)]">
                  <a href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`} className="cursor-pointer">
                    {phoneNumber}
                  </a>
                </div>
              </>
            )}
          </div>
        )}
        <button
          onClick={() => open()}
          className={`group relative shrink-0 cursor-pointer overflow-hidden border ${borderColor} px-4 py-2 text-[10.5px] tracking-[0.18em] uppercase transition-colors duration-300 hover:text-[#25241E] sm:px-5 sm:py-[9px] sm:text-[11.5px]`}
        >
          <span className="absolute inset-0 origin-center scale-x-0 bg-[#F5F1E9] transition-transform duration-300 group-hover:scale-x-100" />
          <span className="relative">Apply Now</span>
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-[#18150E]/60" onClick={() => setMenuOpen(false)} />
          <div className="relative flex h-full w-full max-w-[420px] flex-col overflow-y-auto bg-[#F5F1E9] px-[7vw] py-4 text-[#25241E] sm:px-12">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 left-4 cursor-pointer p-1 text-2xl leading-none sm:top-5 sm:left-5"
            >
              &times;
            </button>

            <div className="mt-13 flex flex-col gap-6 text-[13px] font-normal tracking-[0.14em] uppercase">
              {menuItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <button
                  type="button"
                  onClick={() => setTripsOpen((v) => !v)}
                  aria-expanded={tripsOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 hover:opacity-70"
                >
                  CURATED TRIPS
                  <span
                    className={`inline-block transition-transform duration-300 ${tripsOpen ? '' : '-rotate-90'}`}
                  >
                    ▾
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    tripsOpen ? 'grid-rows-[1fr] mt-5' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="flex flex-col gap-5 overflow-hidden border-l border-[#25241E]/20 pl-5 text-[11.5px] normal-case tracking-[0.04em]">
                    {yatras.map((yatra) => (
                      <Link
                        key={yatra.slug}
                        href={`/yatras/${yatra.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="cursor-pointer hover:opacity-70"
                      >
                        {yatra.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {trailingMenuItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
