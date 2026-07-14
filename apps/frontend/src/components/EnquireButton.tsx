'use client';

import { useEnquiry } from './EnquiryProvider';

export default function EnquireButton({
  yatraName,
  className,
  children,
}: {
  yatraName?: string;
  className: string;
  children: React.ReactNode;
}) {
  const { open } = useEnquiry();
  return (
    <button onClick={() => open(yatraName)} className={className}>
      {children}
    </button>
  );
}
