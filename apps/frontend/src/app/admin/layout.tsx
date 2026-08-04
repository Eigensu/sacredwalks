import type { Metadata } from 'next';
import { isAdminConfigured, isAdminRequest } from '@/lib/admin-auth';
import { isDbConfigured } from '@/lib/mongodb';
import AdminLogin from './AdminLogin';
import AdminNav from './AdminNav';

export const metadata: Metadata = {
  title: 'Admin — Sacred Walks',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminRequest();

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6">
        <AdminLogin configured={isAdminConfigured()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <AdminNav />
      {!isDbConfigured() && (
        <div className="border-b border-warning-border bg-warning-bg px-[5vw] py-3 text-[13px] text-warning-text">
          MongoDB is not configured — set <code className="font-mono">MONGODB_URI</code> in your
          environment. Until then the site shows default content and nothing can be saved.
        </div>
      )}
      <main className="mx-auto w-full max-w-[1100px] px-6 py-10">{children}</main>
    </div>
  );
}
