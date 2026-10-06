import TermsHeader from '../components/terms/TermsHeader';
import TermsContent from '../components/terms/TermsContent';
import PageMeta from '../components/PageMeta';

const Terms = () => {
  return (
    <div className="w-full bg-[#FAFAF8] min-h-screen">
      <PageMeta
        title="Terms of Use | KitchenTrusted"
        description="Read the basic terms for using KitchenTrusted's kitchen-product information, editorial guides, and affiliate links."
      />
      <TermsHeader />
      <TermsContent />
    </div>
  );
};

export default Terms;
