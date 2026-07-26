'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MembershipModal from './MembershipModal';

type MembershipContextValue = {
  open: () => void;
};

const MembershipContext = createContext<MembershipContextValue | null>(null);

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  // Resets on refresh/new tab by design (plain in-memory state, no storage).
  const dismissedRef = useRef(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    dismissedRef.current = true;
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (dismissedRef.current) return;
      if (window.scrollY > window.innerHeight * 0.9) {
        dismissedRef.current = true;
        setIsOpen(true);
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <MembershipContext.Provider value={value}>
      {children}
      {isOpen && <MembershipModal onClose={close} />}
    </MembershipContext.Provider>
  );
}

export function useMembership() {
  const ctx = useContext(MembershipContext);
  if (!ctx) throw new Error('useMembership must be used within MembershipProvider');
  return ctx;
}
