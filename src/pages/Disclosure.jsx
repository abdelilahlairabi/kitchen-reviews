import DisclosureBreadcrumb from "../components/Disclosure/DisclosureBreadcrumb";
import DisclosureBanner from "../components/Disclosure/DisclosureBanner";
import DisclosureContent from "../components/Disclosure/DisclosureContent";
import PageMeta from "../components/PageMeta";

export default function Disclosure() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <PageMeta
        title="Affiliate Disclosure | KitchenTrusted"
        description="Learn how affiliate links support KitchenTrusted, what they mean for product recommendations, and where to verify current product details."
      />
      <DisclosureBreadcrumb />

      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Affiliate Disclosure
        </h1>
        <p className="text-base leading-7 text-gray-600">
          Here is how affiliate links work on KitchenTrusted and what they do—and do not—mean for our product information.
        </p>
      </header>

      <DisclosureBanner />
      <DisclosureContent />
    </main>
  );
}
