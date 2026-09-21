import { useState } from 'react';

const sidebarLinks = [
  'Information We Collect',
  'How We Use Your Data',
  'Cookies',
  'Third-Party Links',
  'Your Rights',
  'Contact Us'
];

const PrivacyContent = () => {
  // Par défaut, "Cookies" est sélectionné pour correspondre à la maquette
  const [activeTab, setActiveTab] = useState('Cookies');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Barre latérale (Sidebar) */}
        <div className="md:col-span-3 flex flex-col space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveTab(link)}
              className={`text-left px-4 py-3 text-sm transition-colors ${
                activeTab === link 
                  ? 'bg-[#e2d5c4] text-black font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-9 max-w-3xl">
          
          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              We collect information you provide directly to us, and westlect information you are vree used invionment or dear privacy collects:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700 text-sm">
              <li>Name and contact information</li>
              <li>Demographic data</li>
              <li>Device and usage information</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-sm">
              We collect information you provide directly to us, and averight provide sklinfecaulties, Cookies and usage-econeseabity contents.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">
              2. How We Use Your Data
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              We collect information you provide directly to us, we collect information you provide esention, butkies We Use Links 1 for Blod and contacts.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm">
              We collect information you provide directlly to us and information, but sign We all ther data and commetion of our information, anciey and contache data, Device and usage information.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              We collect information you provide directly to us, 1Now We\Wie Use our Data, informations tne related data to contiiain collect ffoodeston woathuting collect farmss, oversies, srog ternes, terms and contactions.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent;