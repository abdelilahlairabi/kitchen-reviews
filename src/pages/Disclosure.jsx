import DisclosureBreadcrumb from "../components/Disclosure/DisclosureBreadcrumb";
import DisclosureBanner from "../components/Disclosure/DisclosureBanner";
import DisclosureContent from "../components/Disclosure/DisclosureContent";

export default function Disclosure() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <DisclosureBreadcrumb />

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Affiliate Disclosure
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Last updated: January 2025
        </p>
      </div>

      <DisclosureBanner />
      <DisclosureContent />
    </main>
  );
}