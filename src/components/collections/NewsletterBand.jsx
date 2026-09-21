import { useState } from 'react';

const NewsletterBand = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: brancher à un vrai service (Mailchimp, ConvertKit, etc.) plus tard
    console.log('Newsletter signup:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="w-full bg-[#f4f4f2] py-16 mb-10">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Newsletter Band</p>
        <h2 className="text-3xl font-bold text-black mb-3">
          New Collections Every Month
        </h2>
        <p className="text-gray-600 mb-8">
          Subscribe to get notified when we launch a new curated collection
        </p>
        
        {submitted ? (
          <p className="text-green-700 font-medium">Thanks for subscribing! 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
              required
            />
            <button 
              type="submit" 
              className="bg-[#ebd5b3] hover:bg-[#dcb589] text-black font-bold px-8 py-3 rounded-lg transition-colors uppercase text-sm tracking-wide"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterBand;