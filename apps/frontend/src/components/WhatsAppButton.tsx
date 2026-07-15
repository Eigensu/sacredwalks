'use client';

import { usePathname } from 'next/navigation';

export default function WhatsAppButton({ number, message }: { number: string; message?: string }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const digits = number.replace(/[^\d]/g, '');
  if (!digits) return null;
  const href = `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-0 sm:right-7 sm:bottom-7"
    >
      <span className="pointer-events-none mr-3 hidden translate-x-2 rounded-full bg-[#25241E] px-4 py-2 text-[11px] tracking-[0.14em] text-[#F5F1E9] uppercase opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_28px_rgba(20,18,12,.28)] transition-transform duration-200 group-hover:scale-105 sm:h-[60px] sm:w-[60px]">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="#FFFFFF" aria-hidden="true">
          <path d="M16.04 4C9.42 4 4.05 9.36 4.05 15.97c0 2.11.55 4.17 1.6 5.99L4 28l6.19-1.62a12 12 0 0 0 5.85 1.49h.01c6.61 0 11.98-5.36 11.98-11.97 0-3.2-1.25-6.21-3.51-8.47A11.9 11.9 0 0 0 16.04 4Zm0 21.85h-.01a9.9 9.9 0 0 1-5.06-1.39l-.36-.21-3.67.96.98-3.58-.24-.37a9.93 9.93 0 0 1-1.52-5.29c0-5.5 4.48-9.97 9.99-9.97 2.66 0 5.17 1.04 7.05 2.92a9.92 9.92 0 0 1 2.92 7.06c0 5.5-4.48 9.87-9.98 9.87h-.1Zm5.47-7.4c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.41-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </span>
    </a>
  );
}
