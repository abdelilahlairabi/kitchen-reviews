import { useMemo, useState } from 'react';
import { BookOpenText, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

const VISIBLE_SPEC_COUNT = 6;

const labelFor = (value) => String(value)
  .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  .replace(/[_-]+/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatValue = (value) => {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.map(formatValue).filter(Boolean).join(' · ');
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([, nestedValue]) => nestedValue !== null && nestedValue !== undefined && nestedValue !== '')
      .map(([key, nestedValue]) => `${labelFor(key)}: ${formatValue(nestedValue)}`)
      .join(' · ');
  }
  return String(value ?? '').trim();
};

const ProductSpecs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const specs = useMemo(() => {
    const source = product.specs && typeof product.specs === 'object' ? product.specs : {};
    return Object.entries(source)
      .map(([key, value]) => [key, formatValue(value)])
      .filter(([, value]) => value);
  }, [product.specs]);
  const hasDescription = Boolean(product.description?.trim());
  const tabs = [
    ...(hasDescription ? [{ id: 'overview', label: 'Overview' }] : []),
    ...(specs.length ? [{ id: 'specifications', label: 'Specifications', count: specs.length }] : []),
  ];

  if (!tabs.length) return null;
  const selectedTab = tabs.some((tab) => tab.id === activeTab) ? activeTab : tabs[0].id;
  const visibleSpecs = specsExpanded ? specs : specs.slice(0, VISIBLE_SPEC_COUNT);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8" aria-labelledby="product-details-title">
      <div className="mb-6 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9b7049]">A closer look</p>
        <h2 id="product-details-title" className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">Product details</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">Review the product overview and the details that matter when comparing options.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm shadow-gray-950/[0.025]">
        <div className="border-b border-gray-200 bg-[#fcfaf7] px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Product details">
            {tabs.map((tab) => <button
              key={tab.id}
              id={`product-details-tab-${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={selectedTab === tab.id}
              aria-controls={`product-details-panel-${tab.id}`}
              className={`relative inline-flex min-h-12 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8c6744] ${selectedTab === tab.id ? 'border-[#765b3d] text-gray-950' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              {tab.id === 'specifications' && <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />}
              {tab.label}
              {tab.count && <span className={`rounded-full px-2 py-0.5 text-[11px] ${selectedTab === tab.id ? 'bg-[#efe5d8] text-[#644a30]' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>}
            </button>)}
          </div>
        </div>

        {selectedTab === 'overview' && <div id="product-details-panel-overview" role="tabpanel" aria-labelledby="product-details-tab-overview" className="p-5 sm:p-7">
          <div className="max-w-3xl">
            <h3 className="mb-3 text-base font-semibold text-gray-950">Product overview</h3>
            <p className={`whitespace-pre-line text-sm leading-7 text-gray-700 ${descriptionExpanded ? '' : 'line-clamp-6'}`}>{product.description}</p>
            {product.description.length > 420 && <button
              type="button"
              onClick={() => setDescriptionExpanded((expanded) => !expanded)}
              aria-expanded={descriptionExpanded}
              className="mt-5 flex w-full items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:border-[#d6c2a6] hover:bg-[#fcfaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#765b3d] shadow-sm"><BookOpenText aria-hidden="true" className="h-4 w-4" /></span>
                <span><span className="block text-sm font-semibold text-gray-800">{descriptionExpanded ? 'Collapse description' : 'Read the full description'}</span><span className="mt-0.5 block text-xs text-gray-500">{descriptionExpanded ? 'Return to the concise overview' : 'Expand the retailer-provided product copy'}</span></span>
              </span>
              {descriptionExpanded ? <ChevronUp aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-500" /> : <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-500" />}
            </button>}
          </div>
        </div>}

        {selectedTab === 'specifications' && <div id="product-details-panel-specifications" role="tabpanel" aria-labelledby="product-details-tab-specifications" className="p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-gray-950">At-a-glance specifications</h3>
              <p className="mt-1 text-sm text-gray-500">Key product information, organized for quick comparison.</p>
            </div>
            <span className="text-xs font-medium text-gray-500">{specs.length} details</span>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSpecs.map(([key, value]) => <div key={key} className="min-w-0 rounded-xl border border-gray-100 bg-[#fcfaf7]/70 px-4 py-3.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">{labelFor(key)}</dt>
              <dd className="mt-1.5 break-words text-sm font-medium leading-5 text-gray-900">{value}</dd>
            </div>)}
          </dl>
          {specs.length > VISIBLE_SPEC_COUNT && <button
            type="button"
            onClick={() => setSpecsExpanded((expanded) => !expanded)}
            aria-expanded={specsExpanded}
            className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-700 transition hover:border-[#d6c2a6] hover:bg-[#fcfaf7] hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2"
          >{specsExpanded ? <>Show key specifications <ChevronUp aria-hidden="true" className="h-4 w-4" /></> : <>View all {specs.length} specifications <ChevronDown aria-hidden="true" className="h-4 w-4" /></>}</button>}
        </div>}
      </div>

      {product.aplusPresent && <p className="mt-4 text-xs text-gray-500">Additional brand content may be available on the retailer’s product page.</p>}
      {product.sourceCategoryPath && <p className="mt-2 text-xs text-gray-400">Retailer category: {product.sourceCategoryPath.replaceAll('›', ' › ')}</p>}
    </section>
  );
};

export default ProductSpecs;
