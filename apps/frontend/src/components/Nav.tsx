'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useMembership } from './MembershipProvider';
import { yatras } from '@/lib/yatras';
import { useUserAuth } from './UserAuthProvider';
import { LoginModal } from './LoginModal';

const menuItems: { label: string; href: string }[] = [
  { label: 'About the Journey', href: '/#about-the-journey' },
  { label: 'Our Philosophy', href: '/#our-philosophy' },
];

const trailingMenuItems: { label: string; href: string }[] = [
  { label: 'Programme Guide', href: '/experience#programme-guide' },
  { label: 'Dates & Registration', href: '/experience#dates-registration' },
  { label: 'Customised Itineraries', href: '/experience#customised-itineraries' },
  { label: 'Frequently Asked Questions', href: '/experience#faq' },
];

export default function Nav({
  variant = 'dark',
  whatsappNumber,
  whatsappMessage,
  phoneNumber,
  logoImage,
}: {
  variant?: 'dark' | 'light';
  whatsappNumber?: string;
  whatsappMessage?: string;
  phoneNumber?: string;
  logoImage?: string;
}) {
  const { open } = useMembership();
  const { user, loading, logout } = useUserAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const waDigits = whatsappNumber?.replace(/[^\d]/g, '');
  const whatsappUrl = waDigits
    ? `https://wa.me/${waDigits}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ''}`
    : undefined;
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripsOpen, setTripsOpen] = useState(false);
  const [callPopoverOpen, setCallPopoverOpen] = useState(false);
  const textColor = variant === 'dark' ? 'text-surface' : 'text-ink';
  const borderColor = variant === 'dark' ? 'border-surface/60' : 'border-ink/60';

  // Rendered on the left beside the menu button on phones, on the right from
  // 640px up; only one copy is ever visible.
  const whatsappIcon = whatsappUrl ? (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="flex shrink-0 cursor-pointer items-center justify-center p-1 opacity-90 transition-opacity max-sm:h-11 max-sm:w-11 hover:opacity-100"
    >
      <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.04 4C9.42 4 4.05 9.36 4.05 15.97c0 2.11.55 4.17 1.6 5.99L4 28l6.19-1.62a12 12 0 0 0 5.85 1.49h.01c6.61 0 11.98-5.36 11.98-11.97 0-3.2-1.25-6.21-3.51-8.47A11.9 11.9 0 0 0 16.04 4Zm0 21.85h-.01a9.9 9.9 0 0 1-5.06-1.39l-.36-.21-3.67.96.98-3.58-.24-.37a9.93 9.93 0 0 1-1.52-5.29c0-5.5 4.48-9.97 9.99-9.97 2.66 0 5.17 1.04 7.05 2.92a9.92 9.92 0 0 1 2.92 7.06c0 5.5-4.48 9.87-9.98 9.87h-.1Zm5.47-7.4c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.41-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  ) : null;

  return (
    <nav
      className={`absolute top-0 right-0 left-0 z-20 grid grid-cols-[1fr_auto_1fr] items-start gap-4 px-[5vw] py-4 max-sm:flex max-sm:items-start max-sm:justify-between max-sm:gap-2 max-sm:px-4 max-sm:py-3 sm:px-[7vw] sm:py-4 ${textColor}`}
    >
      {/* Phones pair the call button with the menu button on the left;
          WhatsApp stays on the right, next to Apply Now. `sm:contents`
          restores the original layout, where the menu button is absolutely
          positioned and the call button sits on the right. */}
      <div className="flex shrink-0 items-center gap-0.5 sm:contents">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="absolute top-4 left-4 flex shrink-0 cursor-pointer flex-col items-start justify-center gap-[5px] p-1 max-sm:static max-sm:top-0 max-sm:h-11 max-sm:w-11 max-sm:p-0 sm:top-4 sm:left-5"
          suppressHydrationWarning
        >
          <span className="block h-px w-6 bg-current" />
          <span className="block h-px w-6 bg-current" />
          <span className="block h-px w-4 bg-current" />
        </button>
        {phoneNumber && (
          <div className="relative sm:hidden">
            <button
              type="button"
              onClick={() => setCallPopoverOpen((v) => !v)}
              aria-label="Show phone number"
              aria-expanded={callPopoverOpen}
              className="flex shrink-0 cursor-pointer items-center justify-center p-1 opacity-90 transition-opacity max-sm:h-11 max-sm:w-11 hover:opacity-100"
              suppressHydrationWarning
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
                <div className="absolute top-full left-0 z-40 mt-3 whitespace-nowrap rounded-[4px] bg-ink px-4 py-2.5 text-[12.5px] tracking-[0.04em] text-surface shadow-[0_8px_28px_rgba(20,18,12,.28)]">
                  <a href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`} className="cursor-pointer">
                    {phoneNumber}
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <span aria-hidden className="shrink-0 justify-self-start max-sm:hidden" />
      <span aria-hidden className="shrink-0 justify-self-center max-sm:hidden" />

      <div className="-mr-8 flex shrink-0 items-center gap-4 justify-self-end max-sm:mr-0 max-sm:gap-0.5 sm:-mr-10">
        {whatsappUrl && <span className="shrink-0">{whatsappIcon}</span>}
        {phoneNumber && (
          <div className="relative max-sm:hidden">
            <button
              type="button"
              onClick={() => setCallPopoverOpen((v) => !v)}
              aria-label="Show phone number"
              aria-expanded={callPopoverOpen}
              className="flex shrink-0 cursor-pointer items-center justify-center p-1 opacity-90 transition-opacity hover:opacity-100"
              suppressHydrationWarning
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
                <div className="absolute top-full right-0 z-40 mt-3 whitespace-nowrap rounded-[4px] bg-ink px-4 py-2.5 text-[12.5px] tracking-[0.04em] text-surface shadow-[0_8px_28px_rgba(20,18,12,.28)]">
                  <a href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`} className="cursor-pointer">
                    {phoneNumber}
                  </a>
                </div>
              </>
            )}
          </div>
        )}

        <div className="relative flex shrink-0 items-center">
          <button
            type="button"
            onClick={() =>
              user ? setUserDropdownOpen(!userDropdownOpen) : setLoginModalOpen(true)
            }
            aria-label="User Profile"
            className="flex shrink-0 cursor-pointer items-center justify-center p-2 opacity-90 transition-opacity hover:opacity-100"
            suppressHydrationWarning
          >
            {user?.picture ? (
              <img src={user.picture} alt="" className="h-5 w-5 rounded-full object-cover" />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </button>

          {userDropdownOpen && user && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setUserDropdownOpen(false)} />
              <div className="absolute top-full right-0 z-40 mt-3 min-w-[160px] rounded-[4px] bg-ink px-4 py-3 text-surface shadow-[0_8px_28px_rgba(20,18,12,.28)]">
                <div className="mb-3 truncate text-[12.5px] font-medium tracking-[0.04em]">
                  {user.name}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    logout();
                  }}
                  className="w-full cursor-pointer text-left text-[11px] uppercase tracking-[0.15em] opacity-80 transition-opacity hover:opacity-100"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => open()}
          className={`group relative shrink-0 cursor-pointer overflow-hidden border ${borderColor} px-4 py-2 text-[10.5px] tracking-[0.18em] uppercase transition-colors duration-300 max-sm:min-h-11 max-sm:px-3 max-sm:text-[9.5px] max-sm:tracking-[0.08em] hover:text-ink sm:px-5 sm:py-[9px] sm:text-[11.5px]`}
          suppressHydrationWarning
        >
          <span className="absolute inset-0 origin-center scale-x-0 bg-surface transition-transform duration-300 group-hover:scale-x-100" />
          <span className="relative">Apply Now</span>
        </button>
      </div>

      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

      {menuOpen && (
        <div className="fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-overlay/60" onClick={() => setMenuOpen(false)} />
          <div className="relative flex h-full w-full max-w-[420px] flex-col overflow-y-auto bg-surface px-[7vw] py-4 text-ink max-sm:overscroll-contain max-sm:px-6 max-sm:pb-10 sm:px-12">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 left-4 cursor-pointer p-1 text-2xl leading-none max-sm:top-2 max-sm:left-2 max-sm:flex max-sm:h-11 max-sm:w-11 max-sm:items-center max-sm:justify-center sm:top-5 sm:left-5"
              suppressHydrationWarning
            >
              &times;
            </button>

            <div className="mt-13 flex flex-col gap-6 text-[13px] font-normal tracking-[0.14em] uppercase max-sm:gap-6 max-sm:text-[20px]">
              {menuItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer max-sm:flex max-sm:min-h-11 max-sm:items-center hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <button
                  type="button"
                  onClick={() => setTripsOpen((v) => !v)}
                  aria-expanded={tripsOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 max-sm:min-h-11 hover:opacity-70"
                  suppressHydrationWarning
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
                  <div className="flex flex-col gap-5 overflow-hidden border-l border-ink/20 pl-5 text-[11.5px] normal-case tracking-[0.04em] max-sm:gap-7 max-sm:text-[21px]">
                    {yatras.map((yatra) => (
                      <Link
                        key={yatra.slug}
                        href={`/yatras/${yatra.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="cursor-pointer max-sm:flex max-sm:min-h-11 max-sm:items-center hover:opacity-70"
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
                  className="cursor-pointer max-sm:flex max-sm:min-h-11 max-sm:items-center hover:opacity-70"
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
