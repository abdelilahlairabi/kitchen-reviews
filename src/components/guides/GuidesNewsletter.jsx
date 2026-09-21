const GuidesNewsletter = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-[#e9e9e9] rounded-3xl p-10 md:p-14 text-center">
        <h2 className="text-2xl font-bold text-black mb-2">
          Never Miss a Kitchen Tip
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Get new guides and buying tips delivered to your inbox
        </p>
        <form className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#dcb589] outline-none"
            required
          />
          <button 
            type="submit" 
            className="bg-[#ebd5b3] hover:bg-[#dcb589] text-black font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuidesNewsletter;