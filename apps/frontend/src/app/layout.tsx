import type { Metadata } from 'next';
import { Cormorant_Garamond, Marcellus, Hanken_Grotesk } from 'next/font/google';
import { EnquiryProvider } from '@/components/EnquiryProvider';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getSiteContent } from '@/lib/content';
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
  title: 'Sacred Walks — Walk Yourself Into the Divine',
  description:
    'Four pilgrimages across the Himalaya and the south of India — walked, not toured. Kailash Manasarovar, Himalayas, Kashi Krama, Southern Sojourn.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${marcellus.variable} ${hankenGrotesk.variable}`}
    >
      <body className="bg-[#F5F1E9] font-sans text-[#25241E] antialiased">
        <EnquiryProvider yatraNames={content.yatras.map((y) => y.name)}>
          {children}
          <WhatsAppButton
            number={content.settings.whatsappNumber}
            message={content.settings.whatsappMessage}
          />
        </EnquiryProvider>
      </body>
    </html>
  );
}
