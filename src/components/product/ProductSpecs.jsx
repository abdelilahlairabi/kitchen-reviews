import { useMemo, useState } from 'react';

const labelFor = (value) => String(value).replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const ProductSpecs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
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

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Product information">
      <div className="mb-8 flex justify-center border-b border-gray-200" role="tablist" aria-label="Product information">
        {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={selectedTab === tab.id} className={`border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${selectedTab === tab.id ? 'border-gray-950 text-gray-950' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>{tab.label}</button>)}
      </div>
      {selectedTab === 'description' && <div role="tabpanel" className="whitespace-pre-line text-sm leading-7 text-gray-700">{product.description}</div>}
      {selectedTab === 'specifications' && <div role="tabpanel" className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <tbody>{specs.map(([key, value], index) => <tr key={key} className={`border-b border-gray-100 last:border-0 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            <th scope="row" className="w-2/5 px-4 py-3 font-semibold text-gray-900 sm:px-6">{labelFor(key)}</th>
            <td className="px-4 py-3 text-gray-700 sm:px-6">{Array.isArray(value) ? value.join(', ') : typeof value === 'object' ? JSON.stringify(value) : String(value)}</td>
          </tr>)}</tbody>
        </table>
      </div>}
      {product.aplusPresent && <p className="mt-4 text-xs text-gray-500">Additional brand content may be available on the retailer’s product page.</p>}
      {product.sourceCategoryPath && <p className="mt-3 text-xs text-gray-400">Retailer category: {product.sourceCategoryPath.replaceAll('›', ' › ')}</p>}
    </section>
  );
};

export default ProductSpecs;
