import PrivacyHeader from '../components/privacy/PrivacyHeader';
import PrivacyContent from '../components/privacy/PrivacyContent';
import PageMeta from '../components/PageMeta';

const Privacy = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <PageMeta
        title="Privacy Policy | KitchenTrusted"
        description="Learn what information KitchenTrusted uses, how product search works, and what to expect from hosting, database, and affiliate services."
      />
      <PrivacyHeader />
      <PrivacyContent />
    </div>
  );
};

export default Privacy;
