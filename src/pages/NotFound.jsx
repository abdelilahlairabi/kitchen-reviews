import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-12 bg-white">
      {/* 404 Big Title */}
      <h1 className="text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tight mb-2">
        404
      </h1>

      {/* Faucet Illustration */}
      <div className="w-48 md:w-64 my-4 flex justify-center">
        <img
          src="/notfound/404-faucet-illustration.jpeg"
          alt="Page not found faucet illustration"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
        Oops! This Page Got Lost in the Kitchen
      </h2>

      {/* Subtext */}
      <p className="text-xs md:text-sm text-gray-500 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Call To Action Buttons */}
      <div className="flex flex-col items-center gap-4">
        <Link
          to="/"
          className="bg-[#D4A373] hover:bg-[#b8895b] text-gray-900 font-bold text-xs md:text-sm px-8 py-3 rounded-full transition-colors shadow-xs"
        >
          Back to Homepage
        </Link>

        <Link
          to="/products"
          className="text-xs md:text-sm font-medium text-gray-800 underline underline-offset-4 hover:text-gray-600 transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    </main>
  );
}
