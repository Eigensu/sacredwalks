import { COLLECTIONS, tryGetDb } from '@/lib/mongodb';

export default async function AdminSubscribersPage() {
  const db = await tryGetDb();
  const subscribers = db
    ? await db
        .collection(COLLECTIONS.subscribers)
        .find({}, { sort: { createdAt: -1 }, limit: 2000 })
        .toArray()
    : [];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[34px] font-medium text-heading">Subscribers</h1>
          <p className="mt-2 text-[14px] text-secondary">
            Newsletter signups from the website footer, newest first.
          </p>
        </div>
        <div className="text-[12px] tracking-[0.14em] text-label uppercase">
          {subscribers.length} total
        </div>
      </div>

      {subscribers.length === 0 ? (
        <p className="mt-10 border border-dashed border-border p-10 text-center text-[14px] text-muted">
          {db ? 'No subscribers yet.' : 'MongoDB is not connected, so subscribers cannot be shown.'}
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-border bg-raised">
          <table className="w-full min-w-[480px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-[10.5px] tracking-[0.18em] text-label uppercase">
                <th className="px-4 py-3 font-normal">#</th>
                <th className="px-4 py-3 font-normal">Email</th>
                <th className="px-4 py-3 font-normal">Subscribed on</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={String(s._id)} className="border-b border-card-alt">
                  <td className="px-4 py-3 text-label">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-heading">
                    <a href={`mailto:${s.email}`} className="underline">
                      {String(s.email ?? '')}
                    </a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted">
                    {s.createdAt
                      ? new Date(s.createdAt as Date).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
