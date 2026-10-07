import { ArrowRight, BadgeCheck, ClipboardList, Ruler, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Start with real kitchen needs',
    description: 'We focus on the questions that matter before a purchase: how a product will be used, what space it needs, and which trade-offs are worth considering.',
  },
  {
    number: '02',
    icon: Ruler,
    title: 'Gather the details that affect fit',
    description: 'We organize available product information such as dimensions, materials, installation requirements, care instructions, and stated features.',
  },
  {
    number: '03',
    icon: Scale,
    title: 'Compare options fairly',
    description: 'We make it easier to compare products on like-for-like details and explain who each option may suit—without treating the most expensive choice as automatically best.',
  },
  {
    number: '04',
    icon: BadgeCheck,
    title: 'Keep the advice clear and transparent',
    description: 'Product details and availability can change. We encourage readers to confirm current specifications with the seller, and we clearly disclose affiliate relationships.',
  },
];

const HowWeChoose = () => (
  <div className="min-h-screen bg-[#fcfcfc] pb-16">
    <PageMeta
      title="How We Choose Kitchen Product Recommendations | KitchenTrusted"
      description="Learn how KitchenTrusted organizes product information, compares kitchen products, and keeps buying advice practical and transparent."
    />

    <div className="mx-auto max-w-6xl px-4 pt-7 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/about" className="hover:text-black">About</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900">How We Choose</span>
      </nav>

      <header
        className="relative isolate overflow-hidden rounded-3xl bg-[#202521] bg-cover bg-center px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(22, 27, 23, 0.84) 0%, rgba(22, 27, 23, 0.69) 52%, rgba(22, 27, 23, 0.35) 100%), url('/about/how-we-choose-banner.webp')",
        }}
      >
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#e8c99f]">Our editorial approach</p>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Helpful choices start with the details.
          </h1>
          <p className="max-w-xl text-base leading-7 text-white/85 sm:text-lg">
            We turn product information into practical comparisons, so you can choose what fits your kitchen, your space, and your budget.
          </p>
        </div>
      </header>

      <section className="py-14 sm:py-20" aria-labelledby="process-title">
        <div className="mb-9 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9b7049]">From research to recommendation</p>
          <h2 id="process-title" className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">A straightforward process, built around your needs.</h2>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <li key={number} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e7d8] text-[#79583c]">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold tracking-wider text-gray-400">{number}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-950">{title}</h3>
              <p className="text-sm leading-6 text-gray-600">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <aside className="rounded-2xl border border-[#ead8c2] bg-[#f8f2eb] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
        <div className="max-w-2xl">
          <h2 className="mb-2 text-xl font-bold text-gray-950">A note on testing and affiliate links</h2>
          <p className="text-sm leading-6 text-gray-700">
            Our guides help you compare published product information; they are not a claim that we physically tested every item. Some links may earn us a commission at no extra cost to you, and that does not change the price you pay.
          </p>
        </div>
        <Link to="/affiliate-disclosure" className="mt-5 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-900 underline decoration-[#c49b70] underline-offset-4 hover:text-[#79583c] sm:mt-0">
          Read our affiliate disclosure <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </aside>

      <div className="mt-12 text-center">
        <Link to="/guides" className="inline-flex items-center gap-2 rounded-full bg-[#202521] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#343c35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202521]">
          Explore our buying guides <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </div>
);

export default HowWeChoose;
