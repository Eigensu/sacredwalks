import Link from 'next/link';
import { COLLECTIONS, tryGetDb } from '@/lib/mongodb';

export default async function AdminDashboard() {
  const db = await tryGetDb();
  let enquiryCount = 0;
  let subscriberCount = 0;
  let latestEnquiry: string | null = null;

  if (db) {
    [enquiryCount, subscriberCount] = await Promise.all([
      db.collection(COLLECTIONS.enquiries).countDocuments(),
      db.collection(COLLECTIONS.subscribers).countDocuments(),
    ]);
    const latest = await db
      .collection(COLLECTIONS.enquiries)
      .find({}, { sort: { createdAt: -1 }, limit: 1 })
      .toArray();
    if (latest[0]?.createdAt) {
      latestEnquiry = new Date(latest[0].createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    }
  }

  const cards = [
    {
      href: '/admin/enquiries',
      label: 'Enquiries',
      value: db ? String(enquiryCount) : '—',
      sub: latestEnquiry ? `Latest: ${latestEnquiry}` : 'People who filled the enquiry form',
    },
    {
      href: '/admin/subscribers',
      label: 'Subscribers',
      value: db ? String(subscriberCount) : '—',
      sub: 'Newsletter signups from the footer',
    },
    {
      href: '/admin/content',
      label: 'Content',
      value: 'Edit',
      sub: 'Text, images, video, WhatsApp number, yatras',
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-[34px] font-medium text-heading">Dashboard</h1>
      <p className="mt-2 text-[14px] text-secondary">
        Manage the website&apos;s content and see who has reached out.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group border border-border bg-raised p-6 transition hover:border-accent"
          >
            <div className="text-[11px] tracking-[0.2em] text-label uppercase">{c.label}</div>
            <div className="mt-3 font-serif text-[40px] leading-none font-medium text-heading">
              {c.value}
            </div>
            <div className="mt-3 text-[12.5px] leading-[1.6] text-secondary">{c.sub}</div>
            <div className="mt-4 text-[11px] tracking-[0.16em] text-accent uppercase group-hover:underline">
              Open →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
