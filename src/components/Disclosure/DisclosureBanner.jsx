export default function DisclosureBanner() {
  return (
    <section aria-label="Amazon Associate disclosure" className="mb-10 rounded-2xl border border-[#d9bd9c] bg-[#f8f2eb] p-6 sm:p-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#79583c]">
        A quick note about commissions
      </p>
      <p className="text-xl font-bold leading-snug text-gray-950 sm:text-2xl">
        As an Amazon Associate I earn from qualifying purchases.
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
        If you buy through an eligible link, KitchenTrusted may receive a commission. It does not increase your purchase price.
      </p>
    </section>
  );
}
