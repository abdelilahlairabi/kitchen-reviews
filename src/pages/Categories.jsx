import CategoriesHeader from '../components/categories/CategoriesHeader';
import CategoriesGrid from '../components/categories/CategoriesGrid';
import CategoriesCallToAction from '../components/categories/CategoriesCallToAction';
import PageMeta from '../components/PageMeta';

const Categories = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <PageMeta title="Kitchen Product Categories | KitchenTrusted" description="Browse kitchen product categories, from cookware and small appliances to sinks, faucets, storage, and more." />
      <CategoriesHeader />
      <CategoriesGrid />
      <CategoriesCallToAction />
    </div>
  );
};

export default Categories;
