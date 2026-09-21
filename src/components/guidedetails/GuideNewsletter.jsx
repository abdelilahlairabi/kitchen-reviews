import { useState } from 'react';

export default function GuideNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <section className="my-12 max-w-2xl mx-auto px-4 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Never Miss a Kitchen Tip
      </h3>
      <p className="text-gray-600 text-xs md:text-sm mb-6">
        Get new guides and buying tips delivered to your inbox
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-100/80 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373] flex-1"
        />
        <button
          type="submit"
          className="bg-[#D4A373] hover:bg-[#b8895b] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}