import { useParams } from 'react-router-dom';
import { getCategoryBySlug } from '../../data/categories';

const BuyingGuide = () => {
  const { categoryName } = useParams();
  const category = getCategoryBySlug(categoryName);

  // Si la catégorie n'a pas de guide défini, on n'affiche rien plutôt qu'un contenu faux
  if (!category || !category.buyingGuide) return null;

  const { title, points } = category.buyingGuide;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-[#f8f9fa] rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold text-black mb-8">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {points.map((point, i) => (
            <div key={i} className="flex flex-col items-center pt-4 md:pt-0">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <span className="text-3xl">{point.icon}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-700">{point.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyingGuide;