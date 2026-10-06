const sections = [
  {
    title: "How Amazon Affiliate Links Work",
    paragraphs: [
      "Some links to Amazon on this site are affiliate links. If you make a qualifying purchase after following one of these links, I may earn a commission at no additional cost to you.",
      "Amazon handles the order, payment, delivery, returns, and customer service under its own policies. Prices and availability can change, so check the current details on Amazon before purchasing.",
    ],
  },
  {
    title: "How We Present Product Information",
    paragraphs: [
      "This site organizes product information, specifications, comparisons, buying guides, and kitchen design ideas to help readers research their options.",
      "Unless a page explicitly says otherwise, we do not claim to have purchased or hands-on tested a product. Check important specifications, compatibility, safety details, and current claims with the manufacturer or retailer.",
    ],
  },
  {
    title: "What an Affiliate Link Means",
    paragraphs: [
      "An affiliate link identifies a link through which a commission may be earned. It is not a claim that we tested or personally used the product.",
      "Amazon's product page is the source to confirm current price, availability, product description, and purchase terms.",
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
