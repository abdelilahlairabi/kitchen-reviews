import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link2, Share2 } from 'lucide-react';

export default function GuideHeader({ guide }) {
  const [shareMessage, setShareMessage] = useState('');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage('Link copied');
    } catch {
      setShareMessage('Copying is not available in this browser.');
    }
  };

  const handleShare = async () => {
    if (!navigator.share) return handleCopyLink();
    try {
      await navigator.share({ title: guide.title, text: guide.desc, url: window.location.href });
    } catch (error) {
      if (error.name !== 'AbortError') setShareMessage('Sharing is not available right now.');
    }
  };

  return (
    <header className="max-w-5xl mx-auto px-4 pt-7 pb-8">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-gray-950 hover:underline">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/guides" className="hover:text-gray-950 hover:underline">Guides</Link>
        <span aria-hidden="true">/</span>
        <span className="text-gray-800 font-medium line-clamp-1">{guide.title}</span>
      </nav>

      <span className="inline-block bg-[#f5eee5] text-[#795632] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
        {guide.badge}
      </span>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight mb-5 max-w-4xl">
        {guide.title}
      </h1>
      <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mb-6">{guide.desc}</p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-gray-200 py-4 gap-4">
        <div className="text-sm text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>By <strong className="text-gray-900">{guide.author?.name || 'KitchenTrusted Editorial'}</strong></span>
          <span aria-hidden="true">·</span>
          <span>{guide.time}</span>
          {guide.date && <><span aria-hidden="true">·</span><time>{guide.date}</time></>}
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <button
            onClick={handleCopyLink}
            type="button"
            aria-label="Copy guide link"
            className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            <Link2 size={15} /> Copy link
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(guide.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share guide on X"
            className="border border-gray-200 rounded-full px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            Share on X
          </a>
          <button
            onClick={handleShare}
            type="button"
            aria-label="Share guide"
            className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
      <p aria-live="polite" className="text-xs text-gray-500 mt-2 min-h-4">{shareMessage}</p>

      <figure className="mt-6 rounded-3xl overflow-hidden bg-gray-100 shadow-sm aspect-[16/9] max-h-[520px]">
        <img
          src={guide.image}
          alt={`${guide.title} — kitchen guide`}
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </figure>
    </header>
  );
}
