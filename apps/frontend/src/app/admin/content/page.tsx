import { getSiteContent } from '@/lib/content';
import ContentEditor from './ContentEditor';

export default async function AdminContentPage() {
  const content = await getSiteContent();
  return <ContentEditor initialContent={content} />;
}
