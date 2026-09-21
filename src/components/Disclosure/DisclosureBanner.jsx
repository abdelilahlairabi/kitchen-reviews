export default function DisclosureBanner() {
  return (
    <div className="bg-[#C89B6C]/25 border border-[#C89B6C]/50 rounded-xl p-6 text-center mb-10">
      <p className="font-bold text-gray-900 text-base md:text-lg flex items-center justify-center gap-2">
        <span role="img" aria-label="amazon">🅰️</span>
        As an Amazon Associate, we earn from qualifying purchases
      </p>
      <p className="text-gray-700 text-sm mt-2 max-w-2xl mx-auto">
        This means we may receive a small commission at no extra cost to you
        if you make a purchase through these links.
      </p>
    </div>
  );
}