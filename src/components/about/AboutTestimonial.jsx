import { Star } from 'lucide-react';

const AboutTestimonial = () => {
  return (
    <div className="w-full py-16 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Testimonial Quote Section</h3>
        
        <div className="bg-[#f5f4ef] rounded-full py-12 px-8 md:px-20 relative">
          <div className="text-6xl text-gray-300 font-serif absolute top-4 left-1/2 -translate-x-1/2">“</div>
          <p className="text-lg md:text-xl text-gray-800 italic relative z-10 mb-8 mt-4">
            Savory Steps has become my go-to resource for kitchen gear.<br/>
            I trust their recommendations completely.
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-black mb-2">- Emily R.</div>
            <div className="flex items-center gap-3">
              <img 
                src="/about/testimonial-avatar-emily.jpeg" /*[cite: 25] */
                alt="Emily R." 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-xs text-gray-500 font-medium text-left">Emily R</div>
                <div className="flex text-[#ebd5b3]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTestimonial;