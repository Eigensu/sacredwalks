'use client';

import { useEffect, useState } from 'react';

type Props = {
  onClose: () => void;
};

type Status = 'idle' | 'submitting' | 'success';

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳' },
  { code: '+1', flag: '🇺🇸' },
  { code: '+44', flag: '🇬🇧' },
  { code: '+971', flag: '🇦🇪' },
  { code: '+65', flag: '🇸🇬' },
];

export default function MembershipModal({ onClose }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: `${countryCode} ${formData.get('phone') ?? ''}`.trim(),
          yatra: 'Membership',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-[5vw] py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="membership-modal-title"
    >
      <div className="absolute inset-0 bg-[#1B1A15]/70 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-[440px] overflow-y-auto rounded-[2px] bg-[#F5F1E9] shadow-[0_24px_80px_rgba(20,18,12,.35)]">
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
          <div className="px-8 py-16 text-center sm:px-10 sm:py-20">
            <div className="mb-6 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
              Welcome
            </div>
            <h2 className="font-serif text-[clamp(24px,4vw,32px)] leading-[1.2] font-medium text-[#2C2A22]">
              You&apos;re on your way to becoming a member.
            </h2>
            <p className="mx-auto mt-5 max-w-[320px] text-[14.5px] leading-[1.8] text-[#5F5C50]">
              Someone from Sacred Walks will reach out shortly to check availability for you.
            </p>
            <button
              onClick={onClose}
              className="mt-9 inline-block cursor-pointer rounded-full bg-[#25241E] px-8 py-[13px] text-[12px] tracking-[0.16em] text-[#F5F1E9] uppercase"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="px-8 py-10 sm:px-10 sm:py-12">
            <div className="mb-2 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
              Welcome
            </div>
            <h2
              id="membership-modal-title"
              className="font-serif text-[clamp(24px,4vw,32px)] leading-[1.15] font-medium text-[#2C2A22]"
            >
              Let&apos;s get started
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-[#5F5C50]">
              Tell us a bit about yourself so we can check if there&apos;s a spot for you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <Field label="Your name">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="First name"
                  className="scw-mem-input"
                />
              </Field>

              <Field label="Phone number">
                <div className="flex items-center gap-3 border-b border-[#D8CFBD] focus-within:border-[#7C8A72]">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Country code"
                    className="shrink-0 bg-transparent py-2 text-[14.5px] text-[#25241E] outline-none"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="98xxx xxxxx"
                    className="w-full bg-transparent py-2 text-[14.5px] text-[#25241E] outline-none placeholder:text-[#B0A992]"
                  />
                </div>
              </Field>

              <Field label="Email address">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="scw-mem-input"
                />
              </Field>

              {error && <p className="text-[13px] leading-[1.6] text-[#A05B4C]">{error}</p>}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#25241E] px-8 py-[15px] text-[12.5px] tracking-[0.18em] text-[#F5F1E9] uppercase transition disabled:opacity-60"
              >
                {status === 'submitting' ? 'Submitting…' : 'Continue →'}
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scw-mem-input {
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
        .scw-mem-input::placeholder {
          color: #b0a992;
        }
        .scw-mem-input:focus {
          border-color: #7c8a72;
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
