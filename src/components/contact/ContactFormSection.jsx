import { useState } from "react";
const FacebookIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 7.1C2 8.6 2 12 2 12s0 3.4.5 4.9c.3 1 1 1.7 2 2C6 19.4 12 19.4 12 19.4s6 0 7.5-.5c1-.3 1.7-1 2-2 .5-1.5.5-4.9.5-4.9s0-3.4-.5-4.9c-.3-1-1-1.7-2-2C18 4.6 12 4.6 12 4.6s-6 0-7.5.5c-1 .3-1.7 1-2 2z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Colonne Gauche : Formulaire */}
        <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-black transition-colors text-sm resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#ebd5b3] hover:bg-[#dcb589] text-black font-bold py-3.5 rounded-xl transition-colors shadow-sm"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Colonne Droite : Cartes d'information */}
        <div className="md:col-span-5 space-y-4">
          {/* Carte Email */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <img
                src="/contact/icon-email.jpeg"
                alt="Email"
                className="w-5 h-5 object-contain"
              />{" "}
              {/*[cite: 25] */}
            </div>
            <div>
              <h3 className="font-bold text-black text-sm">Email</h3>
              <p className="text-xs text-gray-600 mt-1">
                support@thekitchenaffiliates.com
              </p>
            </div>
          </div>

          {/* Carte Temps de réponse */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <img
                src="/contact/icon-clock.jpeg"
                alt="Clock"
                className="w-5 h-5 object-contain"
              />{" "}
              {/*[cite: 25] */}
            </div>
            <div>
              <h3 className="font-bold text-black text-sm">Response Time</h3>
              <p className="text-xs text-gray-600 mt-1">
                We usually reply within 24 hours
              </p>
            </div>
          </div>

          {/* Carte Réseaux Sociaux */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <img
                src="/contact/icon-social.jpeg"
                alt="Social"
                className="w-5 h-5 object-contain"
              />{" "}
              {/*[cite: 25] */}
            </div>
            <div>
              <h3 className="font-bold text-black text-sm">Social</h3>
              <p className="text-xs text-gray-600 mt-1 mb-3">
                Follow us for daily kitchen tips
              </p>
              <div className="flex items-center gap-3 text-gray-800">
                <a href="#" className="hover:text-black transition-colors">
                  <FacebookIcon size={16} />
                </a>
                <a href="#" className="hover:text-black transition-colors">
                  <TwitterIcon size={16} />
                </a>
                <a href="#" className="hover:text-black transition-colors">
                  <InstagramIcon size={16} />
                </a>
                <a href="#" className="hover:text-black transition-colors">
                  <YoutubeIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
