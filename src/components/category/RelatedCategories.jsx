import { Link } from 'react-router-dom';

const RelatedCategories = ({ categories, currentSlug }) => {
  const relatedCategories = categories.filter((category) => category.slug !== currentSlug).slice(0, 4);
  if (!relatedCategories.length) return null;

  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"><h2 className="text-2xl font-bold text-center text-black mb-10">You May Also Like</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">{relatedCategories.map((category) => <Link key={category.id} to={`/category/${category.slug}`} className="flex flex-col items-center group"><div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-gray-200 overflow-hidden mb-4 group-hover:border-[#dcb589] transition-colors bg-white flex items-center justify-center p-4"><img src={category.heroImage} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" /></div><span className="text-sm font-bold text-black text-center">{category.name}</span></Link>)}</div></div>;
};

export default RelatedCategories;
