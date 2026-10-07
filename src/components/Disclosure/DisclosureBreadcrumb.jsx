import { Link } from "react-router-dom";

export default function DisclosureBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500">
      <Link to="/" className="transition-colors hover:text-gray-950">Home</Link>
      <span className="mx-2">/</span>
      <span className="font-medium text-gray-900">Affiliate Disclosure</span>
    </nav>
  );
}
