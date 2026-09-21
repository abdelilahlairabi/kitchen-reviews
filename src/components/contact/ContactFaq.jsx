import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { question: 'What is KitchenTrusted?', answer: 'We are a platform dedicated to providing honest reviews and recommendations for kitchen products.' },
  { question: 'How do you choose products?', answer: 'We consider product features, customer feedback, value, and practical kitchen use when preparing our recommendations.' },
  { question: 'Do you earn commissions from recommendations?', answer: 'We may earn a commission when you purchase through certain links, at no extra cost to you. Read our affiliate disclosure for more details.' },
  { question: 'How can I get more help?', answer: 'You can reach out through the contact form above and we will get back to you as soon as possible.' }
];

const ContactFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      <div className="bg-[#f5f6f8] rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-black">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-transparent border-b border-gray-200 last:border-0 overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-4 flex items-center justify-between text-left text-black hover:text-gray-700 transition-colors"
              >
                <span className="text-sm font-bold">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="pb-4 text-sm text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactFaq;
