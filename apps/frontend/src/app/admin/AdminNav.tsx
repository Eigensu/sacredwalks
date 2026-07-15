'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/content', label: 'Content' },
  { href: '/admin/enquiries', label: 'Enquiries' },
  { href: '/admin/subscribers', label: 'Subscribers' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8CFBD] bg-[#FBF8F1] px-[5vw] py-4">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="font-display text-[13px] tracking-[0.28em] text-[#25241E] uppercase"
        >
          Sacred Walks
        </Link>
        <span className="rounded-full bg-[#7C8A72]/15 px-3 py-1 text-[10px] tracking-[0.2em] text-[#5C6852] uppercase">
          Admin
        </span>
      </div>
      <nav className="flex flex-wrap items-center gap-5 text-[12px] tracking-[0.12em] uppercase">
        {links.map((l) => {
          const active = l.href === '/admin' ? pathname === '/admin' : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={
                active
                  ? 'border-b border-[#25241E] pb-[2px] text-[#25241E]'
                  : 'text-[#8A8471] hover:text-[#25241E]'
              }
            >
              {l.label}
            </Link>
          );
        })}
        <Link href="/" target="_blank" className="text-[#8A8471] hover:text-[#25241E]">
          View site ↗
        </Link>
        <button
          onClick={logout}
          className="cursor-pointer rounded-full border border-[#25241E]/40 px-4 py-[6px] text-[10.5px] tracking-[0.16em] text-[#25241E] uppercase hover:bg-[#25241E]/5"
        >
          Sign out
        </button>
      </nav>
    </header>
  );
}
