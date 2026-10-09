import { Check, Lightbulb, Minus, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AffiliateLink from '../AffiliateLink';
import ProductImageFrame from '../ProductImageFrame';
import SaveProductButton from '../SaveProductButton';

const sectionId = (heading) => `guide-${heading.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')}`;

export default function GuideContent({ guide }) {
  const sections = guide.contentSections || [];

  return (
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_270px] gap-10 lg:gap-14 items-start">
      <article className="min-w-0 max-w-3xl text-gray-700 leading-8 text-base md:text-[17px]">
        <section className="mb-10">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">{guide.desc}</p>
          {guide.quickTip && (
            <aside className="mt-6 rounded-2xl bg-[#f8f4ed] border border-[#eadfce] p-5 md:p-6 flex items-start gap-4">
              <span className="p-2.5 bg-white rounded-full text-[#8e633c] shadow-sm shrink-0" aria-hidden="true"><Lightbulb size={20} /></span>
              <div>
                <h2 className="font-bold text-gray-950 text-sm mb-1">Quick tip</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{guide.quickTip}</p>
              </div>
            </aside>
          )}
        </section>

        {guide.comparisonTable && (
          <section aria-labelledby="comparison-title" className="mb-10 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
              <h2 id="comparison-title" className="font-bold text-gray-950">At a glance</h2>
              <p className="text-sm text-gray-600 mt-1">A quick comparison before the detailed buying advice.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead className="bg-white text-gray-900">
                  <tr>
                    <th scope="col" className="p-3 md:p-4 font-semibold">What matters</th>
                    {guide.comparisonTable.columns.map((column) => <th scope="col" key={column} className="p-3 md:p-4 font-semibold">{column}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {guide.comparisonTable.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="p-3 md:p-4 font-semibold text-gray-900 align-top">{row.label}</th>
                      {row.values.map((value, index) => <td key={`${row.label}-${index}`} className="p-3 md:p-4 align-top leading-relaxed">{value}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {sections.map((section) => (
          <section id={sectionId(section.heading)} key={section.heading} className="scroll-mt-24 mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight leading-snug mb-4">{section.heading}</h2>
            <div className="space-y-4">
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {section.bullets?.length > 0 && (
              <ul className="mt-5 space-y-3 rounded-2xl bg-gray-50 p-5 md:p-6">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <Check size={18} className="mt-1 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {guide.types?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-5">Kitchen faucet types at a glance</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {guide.types.map((type) => (
                <li key={type.name} className="rounded-2xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-950 mb-2">{type.name}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{type.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {guide.finishes?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-4">Finish and everyday care</h2>
            <p className="mb-5">Finish performance varies by brand and coating. Use this as a starting point, then check the faucet maker’s cleaning and warranty guidance before choosing.</p>
            <div className="overflow-x-auto border border-gray-200 rounded-2xl">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-950">
                  <tr><th scope="col" className="p-4">Finish</th><th scope="col" className="p-4">What to consider</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {guide.finishes.map((finish) => <tr key={finish.finish}><th scope="row" className="p-4 font-semibold text-gray-900 align-top">{finish.finish}</th><td className="p-4 leading-relaxed">{finish.durability}</td></tr>)}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {guide.recommendedProducts?.length > 0 && (
          <section id="recommended-products" className="scroll-mt-24 my-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-2">Products mentioned in this guide</h2>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">These catalog picks are included because they relate to the topic. Check current specifications, compatibility, price, and availability with the seller before buying.</p>
            <div className="space-y-4">
              {guide.recommendedProducts.map((product) => (
                <article key={product.id} className="bg-white rounded-2xl border border-gray-200 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative shrink-0">
                      <ProductImageFrame src={product.image} alt={product.name} className="w-20 rounded-lg" />
                      <SaveProductButton product={product} className="absolute -right-2 -top-2 z-10" />
                    </div>
                    <div className="min-w-0">
                      <Link to={`/product/${product.slug}`} className="font-bold text-gray-950 text-sm hover:underline underline-offset-4">{product.name}</Link>
                      {Number.isFinite(product.price) && <p className="text-sm font-semibold text-gray-900 mt-1">${product.price.toFixed(2)}</p>}
                      {Number.isFinite(product.rating) && product.rating > 0 && (
                        <div className="flex items-center gap-1.5 mt-1 text-amber-600" aria-label={`${product.rating.toFixed(1)} out of 5 stars${product.reviewCount ? `, based on ${product.reviewCount} reviews` : ''}`}>
                          <span className="flex" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={12} fill={index < Math.round(product.rating) ? 'currentColor' : 'none'} />)}</span>
                          <span className="text-xs text-gray-600">{product.rating.toFixed(1)}{product.reviewCount ? ` · ${product.reviewCount.toLocaleString()} reviews` : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {product.affiliateUrl ? (
                    <AffiliateLink href={product.affiliateUrl} className="w-full sm:w-auto text-center bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors shrink-0 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed" fallback="Link coming soon">Check current price</AffiliateLink>
                  ) : (
                    <Link to={`/product/${product.slug}`} className="w-full sm:w-auto text-center border border-gray-300 hover:border-gray-950 text-gray-900 text-sm font-semibold px-5 py-3 rounded-full transition-colors shrink-0">View details</Link>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {guide.faqs?.length > 0 && (
          <section id="frequently-asked-questions" className="scroll-mt-24 border-t border-gray-200 pt-9 mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-5">Frequently asked questions</h2>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {guide.faqs.map((faq, index) => (
                <details key={faq.q} open={index === 0} className="group py-4">
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-semibold text-gray-900 marker:hidden">
                    <span>{faq.q}</span>
                    <span className="text-gray-500 group-open:hidden" aria-hidden="true"><Plus size={18} /></span>
                    <span className="text-gray-500 hidden group-open:inline" aria-hidden="true"><Minus size={18} /></span>
                  </summary>
                  <p className="mt-3 pr-8 text-sm md:text-base text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-gray-200 pt-6 mt-12">
          <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-200">
            {guide.author?.avatar ? <img src={guide.author.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-gray-200" loading="lazy" /> : <div className="w-12 h-12 rounded-full bg-[#f5eee5] text-[#795632] flex items-center justify-center font-bold" aria-hidden="true">K</div>}
            <div>
              <p className="text-xs text-gray-500">Prepared by</p>
              <p className="font-bold text-gray-950 text-sm">{guide.author?.name || 'KitchenTrusted Editorial'}</p>
              {guide.author?.role && <p className="text-xs text-gray-500 mt-0.5">{guide.author.role}</p>}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">Product details and availability can change. Always confirm current information with the manufacturer or seller before purchase.</p>
        </section>
      </article>

      {sections.length > 0 && (
        <aside className="lg:sticky lg:top-24 order-first lg:order-last">
          <nav aria-label="In this guide" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-gray-950 mb-3">In this guide</h2>
            <ol className="space-y-2.5 border-l border-gray-200 ml-1">
              {sections.map((section, index) => (
                <li key={section.heading} className="pl-4 -ml-px border-l border-transparent hover:border-gray-950">
                  <a href={`#${sectionId(section.heading)}`} className="block text-sm text-gray-600 hover:text-gray-950 leading-snug">{String(index + 1).padStart(2, '0')} <span className="ml-1">{section.heading}</span></a>
                </li>
              ))}
              {guide.comparisonTable && <li className="pl-4"><a href="#comparison-title" className="text-sm text-gray-600 hover:text-gray-950">At-a-glance comparison</a></li>}
              {guide.recommendedProducts?.length > 0 && <li className="pl-4"><a href="#recommended-products" className="text-sm text-gray-600 hover:text-gray-950">Related products</a></li>}
              {guide.faqs?.length > 0 && <li className="pl-4"><a href="#frequently-asked-questions" className="text-sm text-gray-600 hover:text-gray-950">FAQs</a></li>}
            </ol>
            <Link to="/guides" className="block border-t border-gray-100 mt-5 pt-4 text-sm font-semibold text-gray-900 hover:underline underline-offset-4">Browse all guides <span aria-hidden="true">→</span></Link>
          </nav>
        </aside>
      )}
    </div>
  );
}
