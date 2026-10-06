import { CheckCircle, Lightbulb, Handshake } from 'lucide-react';

const AboutMission = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mission Box */}
      <div className="bg-[#f5f4ef] rounded-3xl p-10 md:p-16 text-center mb-16">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">What we value</h3>
        <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          Our goal is to make kitchen-product research clearer by organizing useful product information, comparisons, and design inspiration.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
          <div className="flex flex-col items-center">
            <CheckCircle className="w-10 h-10 text-black mb-4 stroke-[1.5]" />
            <span className="font-medium text-black">Honest Reviews</span>
          </div>
          <div className="flex flex-col items-center">
            <Lightbulb className="w-10 h-10 text-black mb-4 stroke-[1.5]" />
            <span className="font-medium text-black">Useful Comparisons</span>
          </div>
          <div className="flex flex-col items-center">
            <Handshake className="w-10 h-10 text-black mb-4 stroke-[1.5]" />
            <span className="font-medium text-black">Transparent Disclosures</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutMission;
