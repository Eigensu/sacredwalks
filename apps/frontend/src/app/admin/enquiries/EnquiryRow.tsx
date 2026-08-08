'use client';

import { useState } from 'react';

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  yatra?: string;
  message?: string;
  createdAt?: string;
  status?: string;
};

function formatDate(value: unknown): string {
  if (!value) return '—';
  return new Date(value as string).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function EnquiryRow({ enquiry }: { enquiry: Enquiry }) {
  const [status, setStatus] = useState(enquiry.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: 'ACCEPTED' | 'REJECTED') => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiry._id, status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const isMembership = enquiry.yatra === 'Membership';

  return (
    <tr className="border-b border-card-alt align-top">
      <td className="px-4 py-3 whitespace-nowrap text-muted">{formatDate(enquiry.createdAt)}</td>
      <td className="px-4 py-3 font-medium text-heading">{enquiry.name}</td>
      <td className="px-4 py-3">
        <a href={`mailto:${enquiry.email}`} className="text-success underline">
          {enquiry.email}
        </a>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{enquiry.phone || '—'}</td>
      <td className="px-4 py-3">
        {enquiry.yatra}
        {isMembership && (
          <div className="mt-2 text-[11px] font-bold">
            <span
              className={
                status === 'ACCEPTED'
                  ? 'text-status-open'
                  : status === 'REJECTED'
                    ? 'text-danger'
                    : 'text-accent'
              }
            >
              {status || 'PENDING'}
            </span>
          </div>
        )}
      </td>
      <td className="max-w-[340px] px-4 py-3 leading-[1.6] text-secondary">
        {enquiry.message || '—'}
      </td>
      {/* We add an Actions column in the page, so we need a td here */}
      <td className="px-4 py-3">
        {isMembership && (!status || status === 'PENDING') ? (
          <div className="flex gap-2">
            <button
              onClick={() => handleStatusChange('ACCEPTED')}
              disabled={loading}
              className="rounded bg-status-open px-2 py-1 text-[11px] font-bold text-white uppercase hover:opacity-80 disabled:opacity-50"
            >
              Accept
            </button>
            <button
              onClick={() => handleStatusChange('REJECTED')}
              disabled={loading}
              className="rounded bg-danger px-2 py-1 text-[11px] font-bold text-white uppercase hover:opacity-80 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className="text-[11px] text-muted">No Actions</span>
        )}
      </td>
    </tr>
  );
}
