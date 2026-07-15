'use client';

import Link from 'next/link';
import { useEnquiry } from './EnquiryProvider';

const defaultLinks = [
  { label: 'Kailash', href: '/yatras/kailash-manasarovar' },
  { label: 'Himalayas', href: '/yatras/himalayas' },
  { label: 'Kashi', href: '/yatras/kashi-krama' },
  { label: 'Southern Sojourn', href: '/yatras/southern-sojourn' },
];

export default function Nav({
  variant = 'dark',
  links,
}: {
  variant?: 'dark' | 'light';
  links?: { label: string; href: string }[];
}) {
  const { open } = useEnquiry();
  const navLinks = links?.length ? links : defaultLinks;
  const textColor = variant === 'dark' ? 'text-[#F5F1E9]' : 'text-[#25241E]';
  const borderColor = variant === 'dark' ? 'border-[#F5F1E9]/60' : 'border-[#25241E]/60';

  return (
    <nav
      className={`relative z-10 flex items-center justify-between gap-4 px-[5vw] py-6 sm:px-[7vw] sm:py-[30px] ${textColor}`}
    >
      <Link href="/" className="shrink-0">
        <span className="font-display text-[15px] tracking-[0.32em] uppercase sm:text-[19px]">
          Sacred Walks
        </span>
      </Link>
      <div className="hidden items-center gap-[34px] text-[12.5px] font-normal tracking-[0.14em] uppercase md:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="cursor-pointer hover:opacity-70">
            {link.label}
          </Link>
        ))}
      </div>
      <button
        onClick={() => open()}
        className={`shrink-0 cursor-pointer rounded-full border ${borderColor} px-4 py-2 text-[10.5px] tracking-[0.18em] uppercase sm:px-5 sm:py-[9px] sm:text-[11.5px]`}
      >
        Enquire
      </button>
    </nav>
  );
}
