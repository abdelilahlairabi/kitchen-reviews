import DisclosureBreadcrumb from "../components/Disclosure/DisclosureBreadcrumb";
import DisclosureBanner from "../components/Disclosure/DisclosureBanner";
import DisclosureContent from "../components/Disclosure/DisclosureContent";
import PageMeta from "../components/PageMeta";

export default function Disclosure() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageMeta
        title="Affiliate Disclosure | KitchenTrusted"
        description="Learn how affiliate links support KitchenTrusted, what they mean for product recommendations, and where to verify current product details."
      />
      <DisclosureBreadcrumb />

      <header className="mb-9 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9b7049]">
          Transparency matters
        </p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
          Affiliate Disclosure
        </h1>
        <p className="max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          Here is how affiliate links work on KitchenTrusted and what they do—and do not—mean for our product information.
        </p>
      </header>

      <DisclosureBanner />
      <DisclosureContent />
    </main>
  );
}
