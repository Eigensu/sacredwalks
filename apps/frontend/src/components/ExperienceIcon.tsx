const ICONS: Record<string, React.ReactNode> = {
  consultation: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5v5l3.2 2" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  curator: (
    <>
      <path d="M7 3.5c-1.4 0-2.5 1.1-2.5 2.5v12.5c0 1.4 1.1 2.5 2.5 2.5h10.5V6c0-1.4-1.1-2.5-2.5-2.5H7Z" />
      <path d="M7 3.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5" />
      <path d="M8.5 9h6M8.5 12.5h6M8.5 16h4" />
    </>
  ),
  temple: (
    <>
      <path d="M12 3.5 6.5 9h11L12 3.5Z" />
      <path d="M7 9v10.5M17 9v10.5M4.5 19.5h15" />
      <path d="M10.5 19.5V14a1.5 1.5 0 0 1 3 0v5.5" />
    </>
  ),
  darshan: (
    <>
      <path d="M12 20c-3-2.6-4-5.4-4-7.8C8 8.6 9.8 5.8 12 4c2.2 1.8 4 4.6 4 8.2 0 2.4-1 5.2-4 7.8Z" />
      <path d="M12 20c-1.6-2.6-2-4.7-1.4-6.6C11 12 11.5 10.8 12 10c.5.8 1 2 1.4 3.4.6 1.9.2 4-1.4 6.6Z" />
    </>
  ),
  pandit: (
    <>
      <path d="M12 4c-1.6 2-2.2 3.6-2.2 5 0 1.6 1 2.6 2.2 2.6s2.2-1 2.2-2.6c0-1.4-.6-3-2.2-5Z" />
      <path d="M7.5 13c0-1 .6-1.6 1.4-1.9M16.5 13c0-1-.6-1.6-1.4-1.9" />
      <path d="M6 20c0-3.4 2.6-6 6-6s6 2.6 6 6" />
    </>
  ),
  hotel: (
    <>
      <path d="M4.5 19.5V6.5a1 1 0 0 1 1-1H12v14" />
      <path d="M12 10.5h7a1 1 0 0 1 1 1v8" />
      <path d="M4.5 19.5h16M7.5 8.5h1.5M7.5 11.5h1.5M7.5 14.5h1.5M15 14h1.5" />
    </>
  ),
  transfer: (
    <>
      <path d="M5 15.5V11l1.6-4.2a1.5 1.5 0 0 1 1.4-1h8a1.5 1.5 0 0 1 1.4 1L19 11v4.5" />
      <path d="M5 15.5h14v2.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2.5Z" />
      <path d="M5 11h14" />
    </>
  ),
  meal: (
    <>
      <path d="M7 3.5v6a1.8 1.8 0 0 0 3.6 0v-6M8.8 9.5v11" />
      <path d="M16 3.5c-1.4 0-2.2 1.6-2.2 4s.8 3.7 2.2 4v9" />
    </>
  ),
  kit: (
    <>
      <rect x="4.5" y="8" width="15" height="11" rx="1" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      <path d="M12 12v4M10 14h4" />
    </>
  ),
  concierge: (
    <>
      <path d="M4.5 15c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" />
      <path d="M4.5 15v2a1.5 1.5 0 0 0 1.5 1.5h.5V15H5a.5.5 0 0 0-.5.5Z" />
      <path d="M19.5 15v2a1.5 1.5 0 0 1-1.5 1.5h-.5V15h1.5a.5.5 0 0 1 .5.5Z" />
      <path d="M12 7.5V5M9.5 5h5" />
    </>
  ),
};

export default function ExperienceIcon({ name }: { name: string }) {
  const glyph = ICONS[name];
  if (!glyph) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width="27"
      height="27"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
