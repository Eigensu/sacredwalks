'use client';

import { useEffect, useState } from 'react';
import { yatras } from '@/lib/yatras';

type Props = {
  onClose: () => void;
  yatraName?: string;
};

type Status = 'idle' | 'submitting' | 'success';

export default function EnquiryModal({ onClose, yatraName }: Props) {
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 700);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-[5vw] py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="absolute inset-0 bg-[#1B1A15]/70 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative max-h-[88vh] w-full max-w-[520px] overflow-y-auto rounded-[2px] bg-[#F5F1E9] shadow-[0_24px_80px_rgba(20,18,12,.35)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#5F5C50] transition hover:bg-[#25241E]/5"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M1 1L14 14M14 1L1 14"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="px-8 py-16 text-center sm:px-12 sm:py-20">
            <div className="mb-6 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
              Received
            </div>
            <h2 className="font-serif text-[clamp(26px,4vw,36px)] leading-[1.2] font-medium text-[#2C2A22]">
              Your enquiry is on its way to us.
            </h2>
            <p className="mx-auto mt-5 max-w-[360px] text-[14.5px] leading-[1.8] text-[#5F5C50]">
              Someone from Sacred Walks will reach out shortly to help you plan your journey.
            </p>
            <button
              onClick={onClose}
              className="mt-9 inline-block cursor-pointer rounded-full bg-[#25241E] px-8 py-[13px] text-[12px] tracking-[0.16em] text-[#F5F1E9] uppercase"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="px-8 py-12 sm:px-12 sm:py-14">
            <div className="mb-2 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
              Begin
            </div>
            <h2
              id="enquiry-modal-title"
              className="font-serif text-[clamp(26px,4vw,36px)] leading-[1.15] font-medium text-[#2C2A22]"
            >
              Enquire about a yatra
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#5F5C50]">
              Share a few details and we&apos;ll help you find the right journey.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-6">
              <Field label="Name">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="scw-input"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="scw-input"
                />
              </Field>

              <Field label="Phone">
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  className="scw-input"
                />
              </Field>

              <Field label="Yatra">
                <select name="yatra" defaultValue={yatraName ?? ''} className="scw-input">
                  <option value="">General enquiry</option>
                  {yatras.map((y) => (
                    <option key={y.slug} value={y.name}>
                      {y.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Message">
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us a little about what you're looking for"
                  className="scw-input resize-none"
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-2 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#25241E] px-8 py-[15px] text-[12.5px] tracking-[0.18em] text-[#F5F1E9] uppercase transition disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #d8cfbd;
          padding: 8px 0;
          font-family: var(--font-hanken), sans-serif;
          font-size: 14.5px;
          color: #25241e;
          outline: none;
          transition: border-color 0.2s;
        }
        .scw-input::placeholder {
          color: #b0a992;
        }
        .scw-input:focus {
          border-color: #7c8a72;
        }
        select.scw-input {
          appearance: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] tracking-[0.16em] text-[#9A917D] uppercase">{label}</span>
      {children}
    </label>
  );
}
