'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Login failed');
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-[400px] border border-[#D8CFBD] bg-[#FBF8F1] px-8 py-10 shadow-[0_18px_60px_rgba(20,18,12,.08)] sm:px-10">
      <div className="mb-2 font-display text-[15px] tracking-[0.3em] text-[#25241E] uppercase">
        Sacred Walks
      </div>
      <h1 className="font-serif text-[28px] font-medium text-[#2C2A22]">Admin sign in</h1>

      {!configured ? (
        <p className="mt-5 text-[13.5px] leading-[1.7] text-[#6B5326]">
          Admin access is not configured yet. Set the{' '}
          <code className="font-mono">ADMIN_PASSWORD</code> environment variable on the server, then
          reload this page.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] tracking-[0.16em] text-[#9A917D] uppercase">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="border-b border-[#D8CFBD] bg-transparent py-2 text-[14.5px] text-[#25241E] outline-none focus:border-[#7C8A72]"
            />
          </label>
          {error && <p className="text-[13px] text-[#A05B4C]">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-1 cursor-pointer rounded-full bg-[#25241E] px-8 py-3 text-[12px] tracking-[0.18em] text-[#F5F1E9] uppercase disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      )}
    </div>
  );
}
