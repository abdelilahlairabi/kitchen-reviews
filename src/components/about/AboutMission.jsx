import { CheckCircle, Lightbulb, Handshake } from 'lucide-react';

const AboutMission = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mission Box */}
      <div className="bg-[#f5f4ef] rounded-3xl p-10 md:p-16 text-center mb-16">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Mission Section</h3>
        <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          Our goal is to empower confident kitchen buying decisions by providing reliable information and fostering a community of passionate home cooks.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
          <div className="flex flex-col items-center">
            <CheckCircle className="w-10 h-10 text-black mb-4 stroke-[1.5]" />
            <span className="font-medium text-black">Honest Reviews</span>
          </div>
          <div className="flex flex-col items-center">
            <Lightbulb className="w-10 h-10 text-black mb-4 stroke-[1.5]" />
            <span className="font-medium text-black">Expert Curation</span>
          </div>
          <div className="flex flex-col items-center">
            <Handshake className="w-10 h-10 text-black mb-4 stroke-[1.5]" />
            <span className="font-medium text-black">Trusted Recommendations</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="text-center mb-10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Stats Section</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200">
          <div className="px-4">
            <div className="text-4xl font-extrabold text-black mb-2">500+</div>
            <div className="text-sm text-gray-600">Products Reviewed</div>
          </div>
          <div className="px-4">
            <div className="text-4xl font-extrabold text-black mb-2">50K+</div>
            <div className="text-sm text-gray-600">Happy Readers</div>
          </div>
          <div className="px-4">
            <div className="text-4xl font-extrabold text-black mb-2">4.8/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="px-4">
            <div className="text-4xl font-extrabold text-black mb-2">10K+</div>
            <div className="text-sm text-gray-600">Monthly Visitors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;