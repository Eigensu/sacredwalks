'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import MembershipModal from './MembershipModal';

type MembershipContextValue = {
  open: () => void;
};

const MembershipContext = createContext<MembershipContextValue | null>(null);

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

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
