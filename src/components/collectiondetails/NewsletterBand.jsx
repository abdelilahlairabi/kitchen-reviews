import { useState } from 'react';

export default function NewsletterBand() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <section className="my-16">
      <div className="bg-[#EFECE6] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          New Collections Every Month
        </h3>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Subscribe to get notified when we launch a new curated collection
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C59B67] flex-1 text-sm"
          />
          <button
            type="submit"
            className="bg-[#C59B67] hover:bg-[#b28856] text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}