import { BookOpen, Layers3, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const helpfulLinks = [
  {
    to: '/guides',
    title: 'Kitchen buying guides',
    description: 'Explore practical help for comparing kitchen products.',
    Icon: BookOpen,
  },
  {
    to: '/categories',
    title: 'Browse categories',
    description: 'Find products and recommendations by kitchen category.',
    Icon: Layers3,
  },
  {
    to: '/affiliate-disclosure',
    title: 'How recommendations work',
    description: 'Learn about affiliate links and how the site may earn commissions.',
    Icon: ShieldCheck,
  },
];

const ContactFormSection = () => (
  <section className="mx-auto mb-16 grid max-w-5xl grid-cols-1 items-start gap-8 px-4 md:grid-cols-12">
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-7 md:p-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9b7049]">
        Support channel in progress
      </p>
      <h2 className="mb-3 text-2xl font-bold text-gray-950">Contact details are coming soon</h2>
      <p className="text-sm leading-6 text-gray-600">
        We are setting up a reliable way to receive and answer messages. Until it is ready, this page will not collect or send personal information.
      </p>
    </div>

    <nav aria-label="Helpful pages" className="space-y-3 md:col-span-5">
      {helpfulLinks.map(({ to, title, description, Icon }) => (
        <Link
          key={to}
          to={to}
          className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-gray-400"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
            <Icon aria-hidden="true" className="h-5 w-5 text-gray-700" />
          </span>
          <span>
            <span className="block text-sm font-bold text-gray-950">{title}</span>
            <span className="mt-1 block text-xs leading-5 text-gray-600">{description}</span>
          </span>
        </Link>
      ))}
    </nav>
  </section>
);

export default ContactFormSection;
