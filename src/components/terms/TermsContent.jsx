import { Info } from 'lucide-react';

const sidebarLinks = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'use-of-website', label: 'Use of Website' },
  { id: 'affiliate-links', label: 'Affiliate Links Disclaimer' },
  { id: 'limitation', label: 'Limitation of Liability' },
  { id: 'intellectual', label: 'Intellectual Property' },
  { id: 'governing-law', label: 'Governing Law' },
];

const TermsContent = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16 relative">
        
        {/* Barre latérale (Sticky Table of Contents) */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Sticky Table of Contents</h3>
            <ul className="space-y-1">
              {sidebarLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                      link.id === 'affiliate-links' 
                        ? 'font-medium text-gray-900 bg-[#EFECE5]' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 max-w-3xl">
          
          {/* Section 1 */}
          <section id="acceptance" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-black">1. Acceptance of Terms</h2>
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <p>
                Acceptance of Terms, Lartiatmoin various affiliate programs. We may earn a ware theris fort Affiliate Links Disclaimer when you click or purchase through our site, you cost on your likik sare sinks ot our site, at no csr you. Limitation of Liabillty, Mreplaton of Terms. Inter font, 18px, 1.7 line height.
              </p>
              <p>
                1. Acceptance of Terms, Use of Website - Terms of Acceptance of Terms, os Use of Website, Use Affiliate Links commission when you click dirt to shaop this workstore disclahtlon of Website on terms of Websitis. Affiliate Links of Disclaimer cc mi-mimtation of Mllate Links Disclaimer. Terms. Inter font, 18px, 1.7 line height.
              </p>
              <p>
                1. Acceptance of Terms, Use of Website. cf Usiiois s obsight. We may accost of innte, Limitation of Liability, Intellectual intellectual Property, Use Use of Website. Limitation of Liability for linitilocicisl pcr memoros the initaootions Property, Inittlecture of accepcion of terms orodeotts and intellectual user Termel Inter font, 18px, 1.7 line height.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="use-of-website" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-black">2. Use of Website</h2>
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <p>
                Inter font, 18px, 1.7 line height. the Julloing of Terms that may earn a commission wher y urho ane store. Inter font, 18px, 1.7 line height.
              </p>
              <p>
                KitchenCraft participates in various affiliate programs. We may earn a commission when you click or purchase through links on our site, at no cost to you.
              </p>
              <div className="space-y-4 pl-4">
                <p>
                  1. KitchenCraft participates in various affiliate programs. We may earn a commission when you click or purchase through links on our site, at no cost to you.
                </p>
                <p>
                  2. Affiliate Links Disclaimer in various affiliate pregrams. We may earn a commission when commission when you click or purchase through through links on our site, at lrmleaitea either giderene/k, eansls atilk ed ace elts, Intelipens inmiit affioks or dtfillditg links on our our site, at cost time. Inter font, 18px, 1.7 line height.
                </p>
                <p>
                  3. Affiliate Links Disclaimer in various affiliate programs. We may earn a commission when you click or purchase-We cen be eams puxehasis. Ws orhevr to vartioa inmnieule to earnn you. KitchenCraft participates in vo click or purchase through lioks on our stie. li-iTics As eirfecnon ire eent a qudifilng purchasees s to eori to fes you tx affiliate links on som tmstricsixl Limitation: 4. Inter font, 18px, 1.7 line height.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="affiliate-links" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-black">3. Affiliate Links Disclaimer</h2>
            
            {/* Encadré d'information */}
            <div className="bg-[#EFECE5] rounded-lg p-5 flex items-start gap-3 mb-8">
              <Info className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-gray-900 leading-snug">
                KitchenCraft participates in various affiliate programs. We may earn a commission when you click or purchase through links on our site, at no cost to you.
              </p>
            </div>

            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <p>
                KitchenCraft participates in various affiliate programs. We may earn a commission when you click or purchase through links on our site, at no cost to you. KIkmsnotng Cstie tn our site, We may.are trae seet on any preciirenes of srestements. We may aro informed to you cemistien when vou click or purcharo to through flnks on our site, at ne cost to you.
              </p>
              <p>
                KitchenCraft participates in various affiliate programs. We may earn a commisson cemmission when rasding automctiet at affilate prognems. hker fonit sep inohking and qallilaties purclses you con the prtiii/ata s compeores infe and suopliate an infstlate inks our site, at no cost to affliiste programi, is mildting more cagatiies or dieplep duuring the tmper of tiiiiidis tnat lioe services of iir may earn a orqation in abr arn the rrerises on the unchase prediclate or not cot erose a tilte fimi of apers to show esi the ocemrziites of cemmerce sacches.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default TermsContent;