import ContactHeader from '../components/contact/ContactHeader';
import ContactFormSection from '../components/contact/ContactFormSection';
import ContactFaq from '../components/contact/ContactFaq';
import PageMeta from '../components/PageMeta';

const Contact = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <PageMeta
        title="Contact KitchenTrusted"
        description="Contact KitchenTrusted with questions about our kitchen product information, buying guides, affiliate links, or website."
      />
      <ContactHeader />
      <ContactFormSection />
      <ContactFaq />
    </div>
  );
};

export default Contact;
