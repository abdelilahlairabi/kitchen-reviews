import { Link } from 'react-router-dom';
import { Link2, Share2 } from 'lucide-react';
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function GuideHeader({ guide }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <header className="max-w-4xl mx-auto px-4 pt-6 pb-8">
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to="/guides" className="hover:underline">Guides</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium line-clamp-1">{guide.title}</span>
      </nav>

      {/* Badge */}
      <span className="inline-block bg-[#D4A373] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
        {guide.badge}
      </span>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
        {guide.title}
      </h1>

      {/* Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-6 gap-4">
        <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
          <span>By <strong className="text-gray-900">{guide.author?.name || "Kitchen Experts"}</strong></span>
          <span>·</span>
          <span>{guide.time}</span>
        </div>

        {/* Social Share Icons */}
        <div className="flex items-center gap-3 text-gray-600">
          <button 
            onClick={handleCopyLink} 
            title="Copy Link" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Link2 size={18} />
          </button>
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(guide.title)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <TwitterIcon size={18} />
          </a>
          <button 
            onClick={handleCopyLink} 
            title="Share" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Hero Featured Image */}
      <div className="mt-6 rounded-3xl overflow-hidden bg-gray-100 shadow-sm max-h-[480px]">
        <img
          src={guide.image}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}
