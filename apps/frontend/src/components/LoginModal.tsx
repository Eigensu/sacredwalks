'use client';

import { useEffect } from 'react';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden bg-surface shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-ink/70 transition-colors hover:text-ink"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 sm:p-10 text-center">
          <h2 className="mb-2 font-serif text-3xl font-medium tracking-wide text-ink">Sign In</h2>
          <p className="mb-8 text-sm text-ink/70">
            Sign in or create an account to continue your journey with The Sacred Walks.
          </p>

          <a
            href="/api/auth/google/login"
            className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden border border-ink/30 bg-surface px-6 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:border-ink hover:text-surface"
          >
            <span className="absolute inset-0 origin-center scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />

            <svg className="relative z-10 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>

            <span className="relative z-10">Continue with Google</span>
          </a>
        </div>
      </div>
    </div>
  );
}
