import ContactHeader from '../components/contact/ContactHeader';
import ContactFormSection from '../components/contact/ContactFormSection';
import ContactFaq from '../components/contact/ContactFaq';

const Contact = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <ContactHeader />
      <ContactFormSection />
      <ContactFaq />
    </div>
  );
};

export default Contact;