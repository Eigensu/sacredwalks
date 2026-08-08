'use client';

import { useEffect, useState } from 'react';
import { useUserAuth } from './UserAuthProvider';

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

const GENDERS = ['Female', 'Male', 'Other', 'Prefer not to say'];

const TRAVELLER_COUNTS = ['Solo', 'Couple', 'Family', 'Friends', 'Group'];

export default function MembershipModal({ onClose }: Props) {
  const { user } = useUserAuth();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [journeyType, setJourneyType] = useState('Curated Group Journey');

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
      const details = [
        `DOB: ${formData.get('dob') || '—'}`,
        `Gender: ${formData.get('gender') || '—'}`,
        `City: ${formData.get('city') || '—'}`,
        `Journey Type: ${journeyType}`,
        `Travellers: ${formData.get('travellers') || '—'}`,
        `Preferred Month: ${formData.get('travelMonth') || '—'}`,
      ].join(' | ');
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: user?.email || formData.get('email'),
          phone: `${countryCode} ${formData.get('phone') ?? ''}`.trim(),
          yatra: 'Membership',
          message: details,
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
      className="fixed inset-0 z-50 flex items-center justify-center px-[5vw] py-8 max-sm:px-4 max-sm:py-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="membership-modal-title"
    >
      <div className="absolute inset-0 bg-overlay/70 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative max-h-[92vh] w-full max-w-[820px] overflow-y-auto rounded-[2px] bg-surface shadow-[0_24px_80px_rgba(20,18,12,.35)] max-sm:max-h-[90dvh] max-sm:overscroll-contain">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-secondary transition max-sm:top-2 max-sm:right-2 max-sm:h-11 max-sm:w-11 hover:bg-ink/5"
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
          <div className="px-8 py-10 text-center max-sm:px-6 sm:px-9 sm:py-12">
            <div className="mb-4 text-[11px] tracking-[0.28em] text-accent uppercase">Welcome</div>
            <h2 className="font-serif text-[clamp(22px,3.6vw,26px)] leading-[1.2] font-medium text-heading">
              You&apos;re on your way to becoming a member.
            </h2>
            <p className="mx-auto mt-4 max-w-[320px] text-[13.5px] leading-[1.7] text-secondary">
              Someone from Sacred Walks will reach out shortly to check availability for you.
            </p>
            <button
              onClick={onClose}
              className="mt-7 inline-block cursor-pointer bg-accent px-8 py-[12px] text-[12px] tracking-[0.16em] text-white uppercase"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="px-7 py-6 text-center max-sm:px-6 max-sm:py-8 sm:px-10 sm:py-8">
            <div className="mb-1.5 text-[10.5px] tracking-[0.28em] text-accent uppercase">
              Welcome
            </div>
            <h2
              id="membership-modal-title"
              className="font-serif text-[clamp(20px,2.8vw,25px)] leading-[1.15] font-medium text-heading"
            >
              Begin Your Sacred Journey
            </h2>
            <p className="mx-auto mt-2 max-w-[600px] text-[13px] leading-[1.55] text-secondary">
              Complete your details below to register your interest. Our team will get in touch to
              help you choose the journey that&apos;s right for you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6 text-left">
              <FormSection label="Personal Details" bold>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="scw-mem-input"
                    />
                  </Field>

                  <Field label="Date of Birth">
                    <input type="date" name="dob" required className="scw-mem-input" />
                  </Field>

                  <Field label="Gender">
                    <select name="gender" defaultValue="" required className="scw-mem-input">
                      <option value="" disabled>
                        Select
                      </option>
                      {GENDERS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Email Address">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      defaultValue={user?.email || ''}
                      readOnly={!!user?.email}
                      className="scw-mem-input read-only:opacity-60 read-only:cursor-not-allowed"
                    />
                  </Field>

                  <Field label="Phone Number">
                    <div className="flex items-center gap-2 border-b border-border focus-within:border-accent">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        aria-label="Country code"
                        className="shrink-0 cursor-pointer bg-transparent py-2 text-[13.5px] text-ink outline-none max-sm:py-[11px] max-sm:text-[16px]"
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
                        className="w-full bg-transparent py-2 text-[13.5px] text-ink outline-none placeholder:text-ink max-sm:py-[11px] max-sm:text-[16px]"
                      />
                    </div>
                  </Field>

                  <Field label="City of Residence">
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Your city"
                      className="scw-mem-input"
                    />
                  </Field>
                </div>
              </FormSection>

              <FormSection label="Journey Type" bold>
                <p className="-mt-1 text-left text-[13px] leading-[1.5] text-secondary">
                  How would you like to travel?
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                  {['Curated Group Journey', 'Personalised Private Journey'].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink max-sm:min-h-11 max-sm:text-[15px]"
                    >
                      <input
                        type="radio"
                        name="journeyType"
                        value={option}
                        checked={journeyType === option}
                        onChange={(e) => setJourneyType(e.target.value)}
                        className="h-[15px] w-[15px] cursor-pointer accent-ink max-sm:h-[18px] max-sm:w-[18px]"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </FormSection>

              <FormSection label="Travel Preferences" bold>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Number Of Travellers">
                    <select name="travellers" defaultValue="" required className="scw-mem-input">
                      <option value="" disabled>
                        Select
                      </option>
                      {TRAVELLER_COUNTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Preferred Month Of Travel">
                    <input type="month" name="travelMonth" required className="scw-mem-input" />
                  </Field>
                </div>
              </FormSection>

              {error && <p className="text-[13px] leading-[1.6] text-danger">{error}</p>}

              <div className="mt-2 flex flex-col items-center gap-2.5">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 bg-accent px-9 py-[13px] text-[12px] tracking-[0.18em] text-white uppercase transition hover:bg-ink disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Submitting…' : 'Become A Member →'}
                </button>

                <p className="text-center text-[11.5px] leading-[1.4] text-label italic">
                  A Journey Curator will personally connect with you to guide you through the next
                  steps.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scw-mem-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--color-border);
          padding: 8px 0;
          font-family: var(--font-hanken), sans-serif;
          font-size: 13.5px;
          color: var(--color-ink);
          outline: none;
          transition: border-color 0.2s;
        }
        .scw-mem-input::placeholder {
          color: var(--color-ink);
        }
        .scw-mem-input:focus {
          border-color: var(--color-accent);
        }
        select.scw-mem-input {
          appearance: none;
          cursor: pointer;
        }
        input[type='date'].scw-mem-input,
        input[type='month'].scw-mem-input {
          cursor: pointer;
        }
        /* iOS Safari zooms the viewport when a focused field is under 16px. */
        @media (max-width: 639.98px) {
          .scw-mem-input {
            font-size: 16px;
            padding: 11px 0;
          }
        }
      `}</style>
    </div>
  );
}

function FormSection({
  label,
  bold,
  children,
}: {
  label: string;
  bold?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`text-center text-[13px] tracking-[0.2em] uppercase ${bold ? 'font-extrabold text-label' : 'text-muted'}`}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] tracking-[0.16em] text-ink uppercase">{label}</span>
      {children}
    </label>
  );
}
