import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const AllProducts = lazy(() => import('./pages/AllProducts'));
const Category = lazy(() => import('./pages/Category'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Categories = lazy(() => import('./pages/Categories'));
const Collections = lazy(() => import('./pages/Collections'));
const Guides = lazy(() => import('./pages/Guides'));
const About = lazy(() => import('./pages/About'));
const HowWeChoose = lazy(() => import('./pages/HowWeChoose'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Disclosure = lazy(() => import('./pages/Disclosure'));
const CollectionDetails = lazy(() => import('./pages/CollectionDetails'));
const GuideDetails = lazy(() => import('./pages/GuideDetails'));
const Inspiration = lazy(() => import('./pages/Inspiration'));
const StyleDetails = lazy(() => import('./pages/StyleDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

export function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // SPA navigation doesn't trigger the browser's normal page-load scroll reset.
    // Leave hash links alone so in-page anchors keep their expected behavior.
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.search, location.hash]);

  const pageLoadingFallback = location.pathname === '/'
    ? <Home />
    : <p className="py-16 text-center text-gray-500">Loading page...</p>;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />

      <main className="flex-grow w-full pb-12">
        <Suspense fallback={pageLoadingFallback}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} /> {/* Ajout de la route */}
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-we-choose" element={<HowWeChoose />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path="/affiliate-disclosure" element={<Disclosure />} />
            <Route path="/collections/:slug" element={<CollectionDetails />} />
            <Route path="/guides/:slug" element={<GuideDetails />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/inspiration/:slug" element={<StyleDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
