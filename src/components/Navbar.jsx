import { useState, useRef, useEffect } from 'react';
import { Utensils, ChevronDown, Menu, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // État pour gérer l'ouverture du menu catégories
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Liste des catégories basée sur l'image
  const categories = [
    { id: 'bakeware', name: 'Bakeware' },
    { id: 'cabinets', name: 'Cabinets' },
    { id: 'cookware', name: 'Cookware' },
    { id: 'countertops', name: 'Countertops' },
    { id: 'faucets', name: 'Faucets' },
    { id: 'kitchen-islands', name: 'Kitchen Islands' },
    { id: 'kitchen-stands', name: 'Kitchen Stands' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'sinks', name: 'Sinks' },
    { id: 'small-appliances', name: 'Small Appliances' },
    { id: 'storage-organization', name: 'Storage Organization' },
    { id: 'utensil-organizers', name: 'Utensil Organizers' },
    { id: 'utensils', name: 'Utensils' },
    { id: 'water-filters', name: 'Water Filters' },
  ];

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
  };

  return (
    <header className="w-full font-sans relative z-50">
      {/* Barre d'annonce supérieure */}
      <div className="bg-[#1C1C1C] text-[#E0E0E0] text-xs sm:text-sm py-2 text-center font-medium">
        Trusted Kitchen Product Recommendations & Reviews
      </div>

      {/* Navigation principale */}
      <div className="bg-white border-b border-gray-200 relative">
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo (Gauche) */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity">
            <Utensils className="w-6 h-6 text-black" strokeWidth={2.5} />
            <span className="text-2xl font-extrabold tracking-tight text-black">
              KitchenTrusted
            </span>
          </Link>

          {/* Liens de navigation (Centre - masqués sur mobile) */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/products" className="text-[15px] font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Products
            </Link>
            
            {/* Menu déroulant Categories - Cliquer pour ouvrir */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                aria-expanded={isCategoryMenuOpen}
                className="flex items-center gap-1 group focus:outline-none"
              >
                <span className={`text-[15px] font-medium transition-colors ${isCategoryMenuOpen ? 'text-gray-600' : 'text-gray-900 group-hover:text-gray-600'}`}>
                  Categories
                </span>
                <ChevronDown 
                  className={`w-4 h-4 transition-all duration-200 mt-0.5 ${isCategoryMenuOpen ? 'text-gray-600 rotate-180' : 'text-gray-700 group-hover:text-gray-600'}`} 
                  strokeWidth={2.5} 
                />
              </button>

              {/* Contenu du menu déroulant (Dropdown) */}
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-4 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        onClick={() => setIsCategoryMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/guides" className="text-[15px] font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Guides
            </Link>
            <Link to="/about" className="text-[15px] font-medium text-gray-900 hover:text-gray-600 transition-colors">
              About
            </Link>
          </div>

          {/* Recherche et Bouton d'action (Droite) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Barre de recherche */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
              <input 
                type="text" 
                placeholder="Search reviews..." 
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search products"
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-full text-sm w-56 lg:w-64 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all placeholder:text-gray-400"
              />
            </form>

            {/* Bouton Best Deals */}
            <Link 
              to="/products" 
              className="bg-[#E6DCC3] hover:bg-[#d8ceb5] text-black font-bold text-sm px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
            >
              Best Deals
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 text-black hover:bg-gray-100 rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>

        {isMobileMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden border-t border-gray-200 bg-white">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex flex-col">
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="py-3 text-sm font-medium text-gray-900 border-b border-gray-100">
                Products
              </Link>
              <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)} className="py-3 text-sm font-medium text-gray-900 border-b border-gray-100">
                Categories
              </Link>
              <Link to="/guides" onClick={() => setIsMobileMenuOpen(false)} className="py-3 text-sm font-medium text-gray-900 border-b border-gray-100">
                Guides
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-3 text-sm font-medium text-gray-900">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
