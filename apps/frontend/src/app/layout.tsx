import type { Metadata } from 'next';
import { Cormorant_Garamond, Marcellus, Hanken_Grotesk } from 'next/font/google';
import { MembershipProvider } from '@/components/MembershipProvider';
import './globals.css';

// Content is editable through /admin, so every page renders fresh.
export const dynamic = 'force-dynamic';

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const marcellus = Marcellus({
  variable: '--font-marcellus',
  subsets: ['latin'],
  weight: ['400'],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'The Sacred Walks — Curated Spiritual Journeys Across Bharat',
  description:
    "India's first luxury curated spiritual experiences platform. Journeys to Mangalore, Kashi and Kedarnath.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${marcellus.variable} ${hankenGrotesk.variable}`}
    >
      <body className="bg-surface font-sans text-ink antialiased">
        <MembershipProvider>{children}</MembershipProvider>
      </body>
    </html>
  );
}
