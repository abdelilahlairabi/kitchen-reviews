import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';

const SPECS_PER_PAGE = 8;

const labelFor = (value) => String(value).replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatValue = (value) => {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.map((item) => String(item)).join(', ');
  if (value && typeof value === 'object') return Object.entries(value).map(([key, item]) => `${labelFor(key)}: ${String(item)}`).join(' · ');
  return String(value ?? '');
};

const ProductSpecs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [specsPage, setSpecsPage] = useState(1);
  const specs = useMemo(() => {
    const source = product.specs && typeof product.specs === 'object' ? product.specs : {};
    return Object.entries(source).filter(([, value]) => value !== null && value !== undefined && value !== '');
  }, [product.specs]);
  const hasDescription = Boolean(product.description);
  const tabs = [
    ...(hasDescription ? [{ id: 'description', label: 'Description' }] : []),
    ...(specs.length ? [{ id: 'specifications', label: `Specifications (${specs.length})` }] : []),
  ];

  if (!tabs.length) return null;
  const selectedTab = tabs.some((tab) => tab.id === activeTab) ? activeTab : tabs[0].id;
  const pageCount = Math.ceil(specs.length / SPECS_PER_PAGE);
  const currentPage = Math.min(specsPage, Math.max(1, pageCount));
  const visibleSpecs = specs.slice((currentPage - 1) * SPECS_PER_PAGE, currentPage * SPECS_PER_PAGE);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Product information">
      <div className="mb-8 flex justify-center border-b border-gray-200" role="tablist" aria-label="Product information">
        {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={selectedTab === tab.id} className={`border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${selectedTab === tab.id ? 'border-gray-950 text-gray-950' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>{tab.label}</button>)}
      </div>
      {selectedTab === 'description' && <div role="tabpanel" className="mx-auto max-w-3xl">
        <p className={`whitespace-pre-line text-sm leading-7 text-gray-700 ${descriptionExpanded ? '' : 'line-clamp-8'}`}>{product.description}</p>
        {product.description.length > 480 && <button
          type="button"
          onClick={() => setDescriptionExpanded((expanded) => !expanded)}
          aria-expanded={descriptionExpanded}
          className="mt-3 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-gray-700 transition hover:text-[#765b3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2"
        >{descriptionExpanded ? <>Show less <ChevronUp aria-hidden="true" className="h-4 w-4" /></> : <>Read full description <ChevronDown aria-hidden="true" className="h-4 w-4" /></>}</button>}
      </div>}
      {selectedTab === 'specifications' && <>
        <div role="tabpanel" className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <tbody>{visibleSpecs.map(([key, value], index) => <tr key={key} className={`border-b border-gray-100 last:border-0 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <th scope="row" className="w-2/5 px-4 py-3 font-semibold text-gray-900 sm:px-6">{labelFor(key)}</th>
              <td className="break-words px-4 py-3 text-gray-700 sm:px-6">{formatValue(value)}</td>
            </tr>)}</tbody>
          </table>
        </div>
        {pageCount > 1 && <nav className="mt-4 flex flex-wrap items-center justify-between gap-3" aria-label="Specification pages">
          <p className="text-xs text-gray-500">Showing {(currentPage - 1) * SPECS_PER_PAGE + 1}–{Math.min(currentPage * SPECS_PER_PAGE, specs.length)} of {specs.length} specifications</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setSpecsPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft aria-hidden="true" className="h-4 w-4" />Previous</button>
            <span className="px-1 text-xs font-medium text-gray-500">{currentPage} / {pageCount}</span>
            <button type="button" onClick={() => setSpecsPage((page) => Math.min(pageCount, page + 1))} disabled={currentPage === pageCount} className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">Next<ChevronRight aria-hidden="true" className="h-4 w-4" /></button>
          </div>
        </nav>}
      </>}
      {product.aplusPresent && <p className="mt-4 text-xs text-gray-500">Additional brand content may be available on the retailer’s product page.</p>}
      {product.sourceCategoryPath && <p className="mt-3 text-xs text-gray-400">Retailer category: {product.sourceCategoryPath.replaceAll('›', ' › ')}</p>}
    </section>
  );
};

export default ProductSpecs;
