import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'The Sacred Walks Experience',
  description:
    'Programme guide, dates & registration, customised itineraries, inclusions and FAQs for every Sacred Walks pilgrimage.',
};

export default async function ExperiencePage() {
  const content = await getSiteContent();
  const { experience } = content;

  return (
    <div className="bg-[#F5F1E9] text-[#25241E]">
      <Nav
        variant="light"
        whatsappNumber={content.settings.whatsappNumber}
        whatsappMessage={content.settings.whatsappMessage}
        phoneNumber={content.footer.phone}
      />

      {/* PROGRAMME GUIDE */}
      <section
        id="programme-guide"
        className="scroll-mt-24 px-[7vw] pt-10 pb-20 sm:pt-14 sm:pb-[100px]"
      >
        <div className="mb-3 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            {experience.programmeGuide.heading}
          </h2>
        </div>
        <p className="mt-8 max-w-[680px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
          {experience.programmeGuide.intro}
        </p>
        <p className="mt-6 max-w-[520px] text-[13px] tracking-[0.06em] text-[#9A917D] uppercase">
          Your journey may include
        </p>
        <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {experience.programmeGuide.items.map((item) => (
            <div key={item} className="border-b border-[#E2D9C7] py-3 text-[14.5px] text-[#3A382F]">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[680px] text-[14px] leading-[1.85] text-[#5F5C50]">
          {experience.programmeGuide.closing}
        </p>
      </section>

      {/* DATES & REGISTRATION */}
      <section
        id="dates-registration"
        className="scroll-mt-24 bg-[#25241E] px-[7vw] py-20 text-[#F0EADB] sm:py-[100px]"
      >
        <div className="mb-3 border-b border-[#F5F1E9]/16 pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            {experience.datesRegistration.heading}
          </h2>
        </div>
        <p className="mt-8 max-w-[680px] text-[15px] leading-[1.85] text-[#D8D2C2]">
          {experience.datesRegistration.intro}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-12 sm:mt-[50px] sm:grid-cols-2 sm:gap-[60px]">
          <div>
            <div className="mb-5 text-[11px] tracking-[0.2em] text-[#9CA793] uppercase">
              {experience.datesRegistration.groupSizeHeading}
            </div>
            <p className="font-serif text-[26px] font-medium text-[#F0EADB]">
              {experience.datesRegistration.groupSize}
            </p>
          </div>
          <div>
            <div className="mb-5 text-[11px] tracking-[0.2em] text-[#9CA793] uppercase">
              {experience.datesRegistration.departuresHeading}
            </div>
            <p className="text-[14.5px] leading-[1.85] text-[#D8D2C2]">
              {experience.datesRegistration.departures}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-[#F5F1E9]/16 pt-10 sm:mt-[50px] sm:pt-[50px]">
          <p className="max-w-[680px] text-[13.5px] leading-[1.8] text-[#9CA793]">
            {experience.datesRegistration.note}
          </p>
          <p className="max-w-[680px] text-[13.5px] leading-[1.8] text-[#9CA793]">
            {experience.datesRegistration.privateNote}
          </p>
        </div>
      </section>

      {/* CUSTOMISED ITINERARIES */}
      <section id="customised-itineraries" className="scroll-mt-24 px-[7vw] py-20 sm:py-[100px]">
        <div className="mb-3 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            {experience.customisedItineraries.heading}
          </h2>
        </div>
        <p className="mt-8 max-w-[680px] text-[15.5px] leading-[1.85] text-[#5F5C50]">
          {experience.customisedItineraries.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {experience.customisedItineraries.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#D8CFBD] px-4 py-2 text-[13px] text-[#3A382F]"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-8 max-w-[680px] text-[14px] leading-[1.85] text-[#5F5C50]">
          {experience.customisedItineraries.closing}
        </p>
      </section>

      {/* ALL INCLUSIONS */}
      <section
        id="all-inclusions"
        className="scroll-mt-24 bg-[#25241E] px-[7vw] py-20 text-[#F0EADB] sm:py-[100px]"
      >
        <div className="mb-3 border-b border-[#F5F1E9]/16 pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            {experience.allInclusions.heading}
          </h2>
        </div>
        <p className="mt-8 text-[13px] tracking-[0.06em] text-[#9CA793] uppercase">
          {experience.allInclusions.includedHeading}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {experience.allInclusions.included.map((item) => (
            <div
              key={item}
              className="border-b border-[#F5F1E9]/16 py-3 text-[14.5px] text-[#D8D2C2]"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-12 text-[13px] tracking-[0.06em] text-[#9CA793] uppercase">
          {experience.allInclusions.onRequestHeading}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {experience.allInclusions.onRequest.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#F5F1E9]/30 px-4 py-2 text-[13px] text-[#D8D2C2]"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 px-[7vw] py-20 sm:py-[100px]">
        <div className="mb-3 border-b border-[#D8CFBD] pb-6">
          <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-medium">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="pt-4">
          <FaqAccordion items={experience.faq} />
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}
