import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/lib/content';

export default async function PrivacyPage() {
  const content = await getSiteContent();
  return (
    <div className="bg-[#F5F1E9] text-[#25241E]">
      <Nav variant="light" />
      <section className="px-[7vw] py-20 sm:py-[130px]">
        <h1 className="font-serif text-[clamp(32px,5vw,64px)] font-medium">Privacy Policy</h1>
        <p className="mt-8 max-w-[640px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
          We respect the privacy of everyone who applies for a Sacred Walk. Details shared through
          our application form are used solely to understand your interests and curate the right
          journey for you, and are never shared with third parties without your consent.
        </p>
        <p className="mt-6 max-w-[640px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
          Full policy details to follow.
        </p>
      </section>
      <Footer content={content} />
    </div>
  );
}
