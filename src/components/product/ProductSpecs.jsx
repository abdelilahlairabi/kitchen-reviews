import { useState } from 'react';

const ProductSpecs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const tabs = [{ id: 'description', label: 'Description' }, { id: 'specifications', label: 'Specifications' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-center border-b border-black mb-8" role="tablist" aria-label="Product information">
        {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={activeTab === tab.id} className={`px-6 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-black text-white' : 'text-gray-600 hover:text-black'}`}>{tab.label}</button>)}
      </div>
      {activeTab === 'description' && <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>}
      {activeTab === 'specifications' && <div className="border border-gray-200 rounded-lg overflow-hidden"><table className="w-full text-sm text-left"><tbody>{Object.entries(product.specs).map(([key, value], index) => <tr key={key} className={`border-b border-gray-200 last:border-b-0 ${index % 2 === 0 ? 'bg-[#f8f9fa]' : 'bg-white'}`}><th className="py-3 px-6 font-semibold text-gray-900 w-1/3">{key}</th><td className="py-3 px-6 text-gray-700">{value}</td></tr>)}</tbody></table></div>}
    </div>
  );
};

export default ProductSpecs;
