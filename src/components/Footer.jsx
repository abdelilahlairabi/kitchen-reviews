import { Link } from 'react-router-dom';

const footerGroups = [
  {
    title: 'Browse',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Categories', to: '/categories' },
      { label: 'Collections', to: '/collections' },
    ],
  },
  {
    title: 'Ideas & Guides',
    links: [
      { label: 'Buying Guides', to: '/guides' },
      { label: 'Kitchen Inspiration', to: '/inspiration' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Kitchen Reviews', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Use', to: '/terms' },
      { label: 'Affiliate Disclosure', to: '/affiliate-disclosure' },
    ],
  },
];

const Footer = () => (
  <footer className="w-full border-t border-gray-200 bg-[#f4f6f8] pt-12 pb-8">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center text-center">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-black hover:opacity-80">
          Kitchen Reviews
        </Link>
        <p className="mt-2 max-w-md text-sm text-gray-600">
          Practical kitchen product information, buying guides, and design ideas.
        </p>
      </div>

      <nav aria-label="Footer" className="grid grid-cols-2 gap-8 border-t border-gray-300 py-8 text-center sm:grid-cols-4 sm:text-left">
        {footerGroups.map((group) => (
          <div key={group.title} className="flex flex-col items-center gap-3 sm:items-start">
            <h2 className="text-sm font-bold text-black">{group.title}</h2>
            {group.links.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-gray-600 transition-colors hover:text-black">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-4 border-t border-gray-300 pt-6 text-center">
        <p className="max-w-2xl text-xs leading-relaxed text-gray-600">
          As an Amazon Associate I earn from qualifying purchases.
        </p>
        <p className="text-[11px] text-gray-500">© {new Date().getFullYear()} Kitchen Reviews.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
