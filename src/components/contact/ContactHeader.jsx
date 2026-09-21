import { Link } from 'react-router-dom';

const ContactHeader = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-8 text-center">
      <nav className="text-xs text-gray-500 mb-10 flex justify-start">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Contact</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
        Get in Touch
      </h1>
      <p className="text-gray-600 text-sm max-w-sm mx-auto">
        Have a question about a product or need kitchen advice? We're here to help.
      </p>
    </div>
  );
};

export default ContactHeader;