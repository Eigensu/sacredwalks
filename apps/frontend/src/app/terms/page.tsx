import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/lib/content';

export default async function TermsPage() {
  const content = await getSiteContent();
  return (
    <div className="bg-[#F5F1E9] text-[#25241E]">
      <Nav
        variant="light"
        whatsappNumber={content.settings.whatsappNumber}
        whatsappMessage={content.settings.whatsappMessage}
        phoneNumber={content.footer.phone}
      />
      <section className="px-[7vw] py-20 sm:py-[130px]">
        <h1 className="font-serif text-[clamp(32px,5vw,64px)] font-medium">
          Terms &amp; Conditions
        </h1>
        <p className="mt-8 max-w-[640px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
          The Sacred Walks is an invite-only platform. Applications are reviewed by our team, and an
          invitation does not guarantee availability for a specific journey or date. All bookings
          remain subject to temple regulations, seasonal demand and administrative approvals.
        </p>
        <p className="mt-6 max-w-[640px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
          Full terms to follow.
        </p>
      </section>
      <Footer content={content} />
    </div>
  );
}
