'use client';

import { useMembership } from './MembershipProvider';

export default function MembershipButton({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const { open } = useMembership();
  return (
    <button onClick={() => open()} className={className}>
      {children}
    </button>
  );
}
