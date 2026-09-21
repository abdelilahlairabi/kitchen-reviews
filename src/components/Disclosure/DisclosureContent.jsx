const sections = [
  {
    title: "How Our Affiliate Links Work",
    paragraphs: [
      "When you click on a product link on our site and make a purchase, we may earn a small commission from the retailer at no additional cost to you. Our affiliate links are clearly marked and used only for products we've genuinely researched and recommend.",
      "This commission structure allows us to keep our content free and continue providing detailed, honest kitchen product reviews and buying guides.",
    ],
  },
  {
    title: "Why We Use Affiliate Links",
    paragraphs: [
      "Affiliate partnerships let us dedicate time to researching, testing, and comparing kitchen products so you don't have to. Every recommendation is based on our own evaluation criteria, not on which brand pays the highest commission.",
      "This means we may receive a small commission at no extra cost to you if you make a purchase through these links.",
    ],
  },
  {
    title: "Our Commitment to Honest Reviews",
    paragraphs: [
      "Our affiliate relationships never influence our opinions or ratings. We recommend products based on quality, value, and real-world performance, regardless of commission rates.",
      "If a product doesn't meet our standards, we won't recommend it — even if it's part of an affiliate program.",
    ],
  },
  {
    title: "Transparency and Integrity",
    paragraphs: [
      "We believe in full transparency with our readers. Any sponsored content, paid partnership, or affiliate relationship will always be clearly disclosed on the relevant page.",
      "If you have any questions about our affiliate relationships or how we select products, feel free to reach out through our Contact page.",
    ],
  },
];

export default function DisclosureContent() {
  return (
    <div>
      {sections.map((section) => (
        <div
          key={section.title}
          className="border-b border-gray-200 pb-6 mb-6 last:border-b-0"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {section.title}
          </h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}