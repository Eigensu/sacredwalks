'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') ?? '');
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <p className="text-[13px] leading-[1.7] text-[#7C8A72]">
        You&apos;re on the list. We&apos;ll write when a journey opens.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex items-center gap-3 border-b border-[#D8CFBD] pb-2 focus-within:border-[#7C8A72]">
        {/* 16px on phones stops iOS Safari zooming the page in on focus. */}
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          className="w-full bg-transparent text-[13.5px] text-[#25241E] outline-none placeholder:text-[#B0A992] max-sm:min-h-11 max-sm:text-[16px]"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="shrink-0 cursor-pointer text-[11px] tracking-[0.18em] text-[#25241E] uppercase transition max-sm:inline-flex max-sm:min-h-11 max-sm:items-center hover:opacity-70 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Joining…' : 'Join →'}
        </button>
      </div>
      {status === 'error' && <p className="text-[12px] text-[#A05B4C]">{error}</p>}
    </form>
  );
}
