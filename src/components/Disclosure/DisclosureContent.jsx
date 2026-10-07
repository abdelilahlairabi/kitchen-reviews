const sections = [
  {
    title: "How affiliate links work",
    paragraphs: [
      "Some links to Amazon on this site are affiliate links. If you make a qualifying purchase after following one, we may earn a commission at no additional cost to you.",
      "Amazon handles orders, payment, delivery, returns, and customer service under its own policies.",
    ],
  },
  {
    title: "How we present product information",
    paragraphs: [
      "We organize product details, comparisons, buying guides, and kitchen ideas to help you research your options. Unless a page explicitly says otherwise, we do not claim to have purchased or hands-on tested a product.",
      "An affiliate link is not an endorsement by Amazon, and it does not mean we personally use or tested the product.",
    ],
  },
  {
    title: "Check current product details",
    paragraphs: [
      "Prices, availability, product descriptions, and terms can change. Review the current listing and confirm important specifications, compatibility, and safety information with the manufacturer or retailer before purchasing.",
    ],
  },
];

export default function DisclosureContent() {
  return (
    <div className="divide-y divide-gray-200">
      {sections.map((section) => (
        <section
          key={section.title}
          className="py-6 first:pt-0 last:pb-0"
        >
          <h2 className="mb-2 text-lg font-semibold leading-snug text-gray-950">
            {section.title}
          </h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600 sm:text-base">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
