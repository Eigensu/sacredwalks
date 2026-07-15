'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  eyebrow: string;
  heading: string;
  caption: string;
  videoUrl: string;
  posterImage: string;
};

export default function VideoSection({ eyebrow, heading, caption, videoUrl, posterImage }: Props) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!videoUrl) return null;

  return (
    <section className="px-[7vw] pt-4 pb-20 sm:pb-[130px]">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <div className="mb-4 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
            {eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,52px)] leading-[1.05] font-medium">
            {heading}
          </h2>
        </div>
        <div className="hidden max-w-[280px] text-right text-[13px] leading-[1.7] text-[#5F5C50] sm:block">
          {caption}
        </div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden bg-[#25241E]">
        {playing && !failed ? (
          <video
            src={videoUrl}
            poster={posterImage || undefined}
            controls
            autoPlay
            playsInline
            onError={() => setFailed(true)}
            className="h-full w-full object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setFailed(false);
              setPlaying(true);
            }}
            aria-label={`Play video: ${heading}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {posterImage && (
              <Image
                src={posterImage}
                alt={heading}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="86vw"
              />
            )}
            <span className="absolute inset-0 bg-[#18150E]/30 transition group-hover:bg-[#18150E]/20" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#F5F1E9]/70 bg-[#18150E]/30 backdrop-blur-[2px] transition-transform duration-200 group-hover:scale-105 sm:h-[88px] sm:w-[88px]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#F5F1E9" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
              <span className="text-[10.5px] tracking-[0.28em] text-[#F5F1E9] uppercase opacity-85">
                {failed ? 'Video unavailable — try again' : 'Watch the film'}
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="mt-5 text-[13px] leading-[1.7] text-[#5F5C50] sm:hidden">{caption}</div>
    </section>
  );
}
