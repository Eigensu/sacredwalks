'use client';

import { useMembership } from './MembershipProvider';

export default function EnquireButton({
  className,
  children,
}: {
  yatraName?: string;
  className: string;
  children: React.ReactNode;
}) {
  const { open } = useMembership();
  return (
    <button onClick={() => open()} className={className} suppressHydrationWarning>
      {children}
    </button>
  );
}
