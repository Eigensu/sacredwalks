'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import EnquiryModal from './EnquiryModal';

type EnquiryContextValue = {
  open: (yatraName?: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({
  children,
  yatraNames,
}: {
  children: React.ReactNode;
  yatraNames?: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [yatraName, setYatraName] = useState<string | undefined>(undefined);

  const open = useCallback((name?: string) => {
    setYatraName(name);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      {isOpen && <EnquiryModal onClose={close} yatraName={yatraName} yatraNames={yatraNames} />}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
}
