'use client';

import { useState } from 'react';
import Link from 'next/link';

type Status = 'idle' | 'submitting' | 'success';

const QUESTIONS: { key: string; question: string; options: string[] }[] = [
  {
    key: 'travellerType',
    question: 'What kind of traveller are you?',
    options: [
      'The Seeker',
      'The Explorer',
      'The Story Collector',
      'The Wellness Enthusiast',
      'A little bit of everything',
      'Other (please specify)',
    ],
  },
  {
    key: 'travelTiming',
    question: 'When do you prefer to travel?',
    options: [
      'Weekend escapes',
      'Long weekends',
      '4–7 day journeys',
      'Seasonal retreats',
      "I'm flexible",
    ],
  },
  {
    key: 'region',
    question: 'Which region of India would you like to discover first?',
    options: [
      'North India',
      'South India',
      'The Himalayas',
      'The Ganges Belt',
      'Wherever the journey leads',
    ],
  },
  {
    key: 'memberPerks',
    question: 'As a member, what would you love to receive?',
    options: [
      'Early access to new journeys',
      'Exclusive member experiences',
      'Invitations to private gatherings',
      'Travel inspiration & stories',
      'Everything Sacred Walks',
    ],
  },
  {
    key: 'profession',
    question: 'What best describes your profession?',
    options: [
      'Student',
      'Working professional',
      'Entrepreneur / Founder',
      'Creative / Freelancer',
      'Wellness / Spiritual practitioner',
      'Other (please specify)',
    ],
  },
];

export default function ApplyForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  function selectAnswer(key: string, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus('submitting');
    setError('');
    try {
      const details = QUESTIONS.map((q) => `${q.question} ${answers[q.key] || '—'}`).join(' | ');
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          yatra: 'Membership Application',
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

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-[560px] px-[5vw] py-24 text-center sm:py-[130px]">
        <div className="mb-4 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
          Received
        </div>
        <h1 className="font-serif text-[clamp(28px,4.4vw,42px)] leading-[1.2] font-medium text-[#2C2A22]">
          Your application is on its way to us.
        </h1>
        <p className="mx-auto mt-5 max-w-[420px] text-[14.5px] leading-[1.8] text-[#5F5C50]">
          Our team will connect with you shortly to understand your interests and recommend the
          right Sacred Walk.
        </p>
        <Link
          href="/"
          className="mt-9 inline-block cursor-pointer rounded-full bg-[#25241E] px-8 py-[13px] text-[12px] tracking-[0.16em] text-[#F5F1E9] uppercase"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[640px] px-[5vw] py-16 sm:py-24">
      <div className="mb-2 text-[11.5px] tracking-[0.28em] text-[#7C8A72] uppercase">
        Apply For An Invite
      </div>
      <h1 className="font-serif text-[clamp(28px,4.4vw,44px)] leading-[1.15] font-medium text-[#2C2A22]">
        About You
      </h1>
      <p className="mt-3 text-[14px] leading-[1.7] text-[#5F5C50]">
        Helps us curate the right mix of people and journeys for you.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {QUESTIONS.map((q, qi) => (
          <div key={q.key}>
            <div className="mb-5 text-[15px] leading-[1.4] font-medium text-[#2C2A22]">
              {qi + 1}. {q.question}
            </div>
            <div className="flex flex-col gap-2.5">
              {q.options.map((opt) => {
                const checked = answers[q.key] === opt;
                return (
                  <label
                    key={opt}
                    className={`flex cursor-pointer items-center gap-3 rounded-[6px] border px-4 py-3 text-[14px] transition ${
                      checked
                        ? 'border-[#B4623F] bg-[#B4623F]/5 text-[#2C2A22]'
                        : 'border-[#D8CFBD] text-[#3A382F] hover:border-[#B9AE97]'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.key}
                      value={opt}
                      checked={checked}
                      onChange={() => selectAnswer(q.key, opt)}
                      className="accent-[#B4623F]"
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <div className="mb-5 text-[11px] tracking-[0.2em] text-[#7C8A72] uppercase">
            Your Details
          </div>
          <div className="flex flex-col gap-6">
            <Field label="Name">
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                className="scw-apply-input"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="scw-apply-input"
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                className="scw-apply-input"
              />
            </Field>
          </div>
        </div>

        {error && <p className="text-[13px] leading-[1.6] text-[#A05B4C]">{error}</p>}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#25241E] px-8 py-[15px] text-[12.5px] tracking-[0.18em] text-[#F5F1E9] uppercase transition disabled:opacity-60"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
        </button>
      </div>

      <style jsx global>{`
        .scw-apply-input {
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
        .scw-apply-input::placeholder {
          color: #b0a992;
        }
        .scw-apply-input:focus {
          border-color: #7c8a72;
        }
      `}</style>
    </form>
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
