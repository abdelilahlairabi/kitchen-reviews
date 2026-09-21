import CategoriesHeader from '../components/categories/CategoriesHeader';
import CategoriesGrid from '../components/categories/CategoriesGrid';
import CategoriesCallToAction from '../components/categories/CategoriesCallToAction';

const Categories = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <CategoriesHeader />
      <CategoriesGrid />
      <CategoriesCallToAction />
    </div>
  );
};

export default Categories;