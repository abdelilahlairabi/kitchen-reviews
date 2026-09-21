import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const Category = lazy(() => import('./pages/Category'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Categories = lazy(() => import('./pages/Categories'));
const Collections = lazy(() => import('./pages/Collections'));
const Guides = lazy(() => import('./pages/Guides'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Disclosure = lazy(() => import('./pages/Disclosure'));
const CollectionDetails = lazy(() => import('./pages/CollectionDetails'));
const GuideDetails = lazy(() => import('./pages/GuideDetails'));
const Inspiration = lazy(() => import('./pages/Inspiration'));
const StyleDetails = lazy(() => import('./pages/StyleDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-white">
        
        <Navbar />

        <main className="flex-grow w-full pb-12">
          <Suspense fallback={<p className="py-16 text-center text-gray-500">Loading page...</p>}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} /> {/* Ajout de la route */}
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/about" element={<About />} />
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
    </Router>
  );
}

export default App;
