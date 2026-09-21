const Newsletter = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Overline Text */}
        <span className="text-xs font-bold tracking-widest text-gray-800 uppercase mb-3 block">
          NEWSLETTER SECTION
        </span>
        
        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
          Get Kitchen Tips & Exclusive Deals
        </h2>
        
        {/* Subheading */}
        <p className="text-gray-500 text-sm mb-8">
          Get your most term links in your exclusive deals.
        </p>

        {/* Subscription Form */}
        <form 
          className="flex flex-col sm:flex-row max-w-md mx-auto" 
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email"
            className="flex-grow px-5 py-3 sm:rounded-l-full sm:rounded-r-none rounded-full mb-3 sm:mb-0 border border-gray-200 bg-[#f8f9fa] focus:outline-none focus:ring-1 focus:ring-[#dcb589] focus:border-[#dcb589] text-sm"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 sm:rounded-r-full sm:rounded-l-none rounded-full bg-[#dcb589] hover:bg-[#cba478] text-white text-sm font-bold transition-colors"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default Newsletter;