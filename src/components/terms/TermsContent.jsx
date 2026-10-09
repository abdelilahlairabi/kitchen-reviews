import { Link } from 'react-router-dom';

const sections = [
  { id: 'about', label: 'About these terms' },
  { id: 'site-use', label: 'Using the site' },
  { id: 'editorial-content', label: 'Product information' },
  { id: 'affiliate-links', label: 'Affiliate links' },
  { id: 'ownership', label: 'Content and trademarks' },
  { id: 'external-sites', label: 'External websites' },
  { id: 'changes', label: 'Updates and operator details' },
];

const TermsContent = () => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-4 pb-20 sm:px-6 md:grid-cols-12 lg:px-8">
    <nav aria-label="Terms sections" className="md:sticky md:top-24 md:col-span-3">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">On this page</h2>
      <ul className="flex flex-wrap gap-2 md:flex-col md:gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="block rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black md:border-transparent">
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <article className="max-w-3xl space-y-10 text-sm leading-7 text-gray-700 md:col-span-9">
      <p className="rounded-xl border border-[#ebe4d8] bg-[#f8f5ef] p-5">
        These terms describe the current KitchenTrusted website, which publishes kitchen-product information and links to retailers. A support email is listed on the Contact page; the site operator’s legal identity and governing-law terms still need to be confirmed. This page is not a substitute for jurisdiction-specific legal review.
      </p>

      <section id="about" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">About these terms</h2>
        <p>KitchenTrusted is an informational website with product catalog pages, buying guides, collections, and kitchen-design inspiration. The site does not sell products, take payment for orders, ship goods, or provide retailer customer service.</p>
        <p>These terms are intended to explain basic use of the website. Do not rely on this draft for legal rights or remedies that depend on a particular country or region.</p>
      </section>

      <section id="site-use" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Using the site</h2>
        <p>You may browse and use the site for personal, informational purposes. Do not attempt to disrupt the site, gain unauthorized access to its systems, or misuse its pages, content, or links.</p>
        <p>Some features, product records, and outbound links may be unavailable or change as the site is maintained.</p>
      </section>

      <section id="editorial-content" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Product information and editorial content</h2>
        <p>Guides and product information are provided for general research. Unless a page specifically says otherwise, KitchenTrusted does not claim to have purchased or hands-on tested a product. Content is not a substitute for manufacturer instructions or professional advice about installation, compatibility, or safety.</p>
        <p>Product specifications, prices, availability, warranties, and retailer terms can change. Confirm current information with the manufacturer or retailer before making a purchase or installation decision.</p>
      </section>

      <section id="affiliate-links" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Affiliate links</h2>
        <p>Some product links are affiliate links. If you make a qualifying purchase after following an Amazon link, KitchenTrusted may earn a commission at no additional cost to you. The site includes this disclosure: “As an Amazon Associate I earn from qualifying purchases.”</p>
        <p>Amazon handles orders, payments, shipping, returns, and customer service under its own policies. Review our <Link className="underline underline-offset-2" to="/affiliate-disclosure">Affiliate Disclosure</Link> and Amazon’s <a className="underline underline-offset-2" href="https://affiliate-program.amazon.com/help/operating/agreement/" target="_blank" rel="noreferrer">Associates Program Operating Agreement</a> for more information.</p>
      </section>

      <section id="ownership" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Content and trademarks</h2>
        <p>KitchenTrusted’s original written content, site design, and branding may not be copied or republished without permission, except where applicable law allows. Product names, logos, and other third-party marks belong to their respective owners; their appearance does not imply endorsement.</p>
      </section>

      <section id="external-sites" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">External websites</h2>
        <p>Links to Amazon and other third-party websites are provided for convenience. Those services are operated independently and have their own terms, product details, and privacy practices. KitchenTrusted does not control their pages, transactions, or customer-support decisions.</p>
      </section>

      <section id="changes" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Updates and operator details</h2>
        <p>We may update this page as the website or its services change. The date above indicates when this text was last revised.</p>
        <p>A support contact email is available on our <Link className="underline underline-offset-2" to="/contact">Contact page</Link>. The site’s legal operator and any governing-law or other jurisdiction-specific provisions still need to be confirmed before these terms are treated as final.</p>
      </section>
    </article>
  </div>
);

export default TermsContent;
