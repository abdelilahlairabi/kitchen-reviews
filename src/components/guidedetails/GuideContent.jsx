import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Check, Plus, Minus, Star } from 'lucide-react';

export default function GuideContent({ guide }) {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <article className="max-w-2xl mx-auto px-4 text-gray-800 leading-relaxed text-base space-y-10">
      
      <section className="space-y-4">
        <p className="text-lg text-gray-700">{guide.desc}</p>

        {guide.quickTip && (
          <div className="bg-[#F7F4EE] rounded-2xl p-5 border border-[#EBE5D8] flex items-start gap-4 my-6">
            <div className="p-2 bg-white rounded-full text-amber-600 shadow-sm shrink-0">
              <Lightbulb size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Quick Tip</h4>
              <p className="text-sm text-gray-700 leading-snug">{guide.quickTip}</p>
            </div>
          </div>
        )}
      </section>

      {guide.types.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Key options compared</h2>

          <ul className="space-y-4 pt-2">
            {guide.types.map((type, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="p-1 bg-emerald-100 text-emerald-700 rounded-full shrink-0 mt-1"><Check size={14} /></span>
                <div><strong className="text-gray-900 font-semibold">{type.name}:</strong>{' '}<span className="text-gray-600">{type.desc}</span></div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {guide.finishes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Materials & durability</h2>

        {/* Comparison Table */}
        <div className="overflow-hidden border border-gray-200 rounded-xl my-4">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8F7F4] border-b border-gray-200 font-semibold text-gray-900">
              <tr>
                <th className="p-3">Finish</th>
                <th className="p-3">Durability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {guide.finishes.map((f, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="p-3 font-medium text-gray-900">{f.finish}</td>
                  <td className="p-3">{f.durability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </section>
      )}

      {guide.recommendedProducts.length > 0 && (
        <section className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold text-gray-900">Our Top Recommendations</h2>
        <p className="text-gray-600 text-sm">
          Our top recommendations based on performance, design, and user reviews:
        </p>

        <div className="space-y-4">
          {guide.recommendedProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 shrink-0 border border-gray-100 flex items-center justify-center">
                  <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <div>
                  <Link to={`/products/${prod.slug}`} className="font-bold text-gray-900 text-sm hover:underline">{prod.name}</Link>
                  <div className="text-sm font-semibold text-gray-900 mt-1">${prod.price?.toFixed(2)}</div>
                  <div className="flex text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={prod.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="w-full sm:w-auto text-center bg-[#D4A373] hover:bg-[#b8895b] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors shrink-0"
              >
                Check Price
              </a>
            </div>
          ))}
        </div>
        </section>
      )}

      {guide.faqs.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>

        <div className="divide-y divide-gray-200">
          {guide.faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between text-left font-semibold text-gray-900 hover:text-[#D4A373] transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {openFaq === index && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-1">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
        </section>
      )}

      {guide.author && (
        <section className="pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
          {guide.author.avatar ? (
            <img src={guide.author.avatar} alt={guide.author.name} className="w-12 h-12 rounded-full object-cover border border-gray-300" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#D4A373] text-white flex items-center justify-center font-bold">{guide.author.name?.charAt(0)}</div>
          )}
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{guide.author.name}</h4>
            {guide.author.role && <p className="text-xs text-gray-500">{guide.author.role}</p>}
          </div>
        </div>
        </section>
      )}

    </article>
  );
}
