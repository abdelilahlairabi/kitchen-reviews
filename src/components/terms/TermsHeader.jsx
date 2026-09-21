import { Link } from 'react-router-dom';

const TermsHeader = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <nav className="text-xs text-gray-500 mb-10 flex justify-start">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Terms of Service</span>
      </nav>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-3">
          Terms of Service
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: January 2025
        </p>
      </div>
    </div>
  );
};

export default TermsHeader;