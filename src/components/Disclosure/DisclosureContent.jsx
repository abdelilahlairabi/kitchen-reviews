const sections = [
  {
    number: "01",
    eyebrow: "How links work",
    title: "A qualifying purchase may support this site",
    paragraphs: [
      "Some links to Amazon on this site are affiliate links. If you make a qualifying purchase after following one, we may earn a commission at no additional cost to you.",
      "Amazon handles orders, payment, delivery, returns, and customer service under its own policies.",
    ],
  },
  {
    number: "02",
    eyebrow: "Our content",
    title: "Product information is not a testing claim",
    paragraphs: [
      "We organize product details, comparisons, buying guides, and kitchen ideas to help you research your options. Unless a page explicitly says otherwise, we do not claim to have purchased or hands-on tested a product.",
      "An affiliate link is not an endorsement by Amazon, and it does not mean we personally use or tested the product.",
    ],
  },
  {
    number: "03",
    eyebrow: "Before you buy",
    title: "Confirm the latest details with the seller",
    paragraphs: [
      "Prices, availability, product descriptions, and terms can change. Review the current listing and confirm important specifications, compatibility, and safety information with the manufacturer or retailer before purchasing.",
    ],
  },
];

export default function DisclosureContent() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9b7049]">{section.eyebrow}</p>
            <span className="text-xs font-semibold tracking-wider text-gray-400">{section.number}</span>
          </div>
          <h2 className="mb-3 text-lg font-bold leading-snug text-gray-950">
            {section.title}
          </h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
