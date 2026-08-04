'use client';

import { useState } from 'react';

export default function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left font-serif text-[18px] font-medium text-ink sm:text-[21px]"
            >
              {item.question}
              <span
                className={`inline-block shrink-0 transition-transform duration-300 ${isOpen ? '' : '-rotate-90'}`}
              >
                ▾
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[720px] text-[15px] leading-[1.85] text-secondary">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
