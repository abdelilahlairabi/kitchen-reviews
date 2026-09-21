const AboutProcess = () => {
  return (
    <div className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">How We Choose</h3>
        <h2 className="text-3xl font-bold text-black mb-12">How We Choose Our Recommendations</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-start relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-px bg-gray-300 -z-10"></div>
          
          {[
            { num: "1", title: "Research", desc: "In-depth market analysis & hands-on testing" },
            { num: "2", title: "Compare", desc: "Detailed specification & performance evaluation" },
            { num: "3", title: "Recommend", desc: "Curated selection based on quality & value" }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center w-full md:w-1/3 mb-10 md:mb-0 px-4 bg-white">
              <div className="w-16 h-16 rounded-full bg-[#ebd5b3] text-white text-2xl font-bold flex items-center justify-center mb-6">
                {step.num}
              </div>
              <h4 className="text-xl font-bold text-black mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm max-w-[200px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutProcess;