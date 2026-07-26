import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/lib/content';
import ApplyForm from './ApplyForm';

export const metadata = {
  title: 'Apply for an Invitation — Sacred Walks',
  description: 'Tell us about yourself so we can recommend the right Sacred Walk for you.',
};

export default async function ApplyPage() {
  const content = await getSiteContent();

  return (
    <div className="bg-[#F5F1E9]">
      <Nav variant="light" />
      <ApplyForm />
      <Footer content={content} />
    </div>
  );
}
