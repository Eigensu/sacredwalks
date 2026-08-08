import { COLLECTIONS, tryGetDb } from '@/lib/mongodb';
import EnquiryRow from './EnquiryRow';

export default async function AdminEnquiriesPage() {
  const db = await tryGetDb();
  const enquiries = db
    ? await db
        .collection(COLLECTIONS.enquiries)
        .find({}, { sort: { createdAt: -1 }, limit: 500 })
        .toArray()
    : [];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[34px] font-medium text-heading">Applications</h1>
          <p className="mt-2 text-[14px] text-secondary">
            Everyone who has applied for an invitation, newest first.
          </p>
        </div>
        <div className="text-[12px] tracking-[0.14em] text-label uppercase">
          {enquiries.length} total
        </div>
      </div>

      {enquiries.length === 0 ? (
        <p className="mt-10 border border-dashed border-border p-10 text-center text-[14px] text-muted">
          {db
            ? 'No applications yet.'
            : 'MongoDB is not connected, so applications cannot be shown.'}
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-border bg-raised">
          <table className="w-full min-w-[760px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-[10.5px] tracking-[0.18em] text-label uppercase">
                <th className="px-4 py-3 font-normal">Date</th>
                <th className="px-4 py-3 font-normal">Name</th>
                <th className="px-4 py-3 font-normal">Email</th>
                <th className="px-4 py-3 font-normal">Phone</th>
                <th className="px-4 py-3 font-normal">Yatra / Status</th>
                <th className="px-4 py-3 font-normal">Message</th>
                <th className="px-4 py-3 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <EnquiryRow key={String(e._id)} enquiry={e as any} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
