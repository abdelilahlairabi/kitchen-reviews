import { Link } from 'react-router-dom';

// 1. Déclaration des icônes SVG personnalisées pour remplacer Lucide
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 7.1C2 8.6 2 12 2 12s0 3.4.5 4.9c.3 1 1 1.7 2 2C6 19.4 12 19.4 12 19.4s6 0 7.5-.5c1-.3 1.7-1 2-2 .5-1.5.5-4.9.5-4.9s0-3.4-.5-4.9c-.3-1-1-1.7-2-2C18 4.6 12 4.6 12 4.6s-6 0-7.5.5c-1 .3-1.7 1-2 2z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full bg-[#f4f6f8] pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Logo Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
            FOOTER
          </span>
          <div className="flex flex-col items-center">
            <span className="text-xl font-extrabold text-black leading-none">KITCHEN</span>
            <span className="text-xs font-bold tracking-[0.3em] text-black mt-1">REVIEWS</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-12" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center md:text-left justify-items-center md:justify-items-start pl-0 md:pl-16">
          
          {/* Column 1: Shop */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-extrabold text-black mb-1">Shop</h4>
            <Link to="/category/utensils" className="text-sm text-gray-600 hover:text-black transition-colors">Knives</Link>
            <Link to="/category/cookware" className="text-sm text-gray-600 hover:text-black transition-colors">Cookware</Link>
            <Link to="/category/small-appliances" className="text-sm text-gray-600 hover:text-black transition-colors">Appliances</Link>
            <Link to="/category/storage-organization" className="text-sm text-gray-600 hover:text-black transition-colors">Storage</Link>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-extrabold text-black mb-1">Company</h4>
            <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">About Us</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Careers</Link>
            <Link to="/affiliate-disclosure" className="text-sm text-gray-600 hover:text-black transition-colors">Affiliates</Link>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-extrabold text-black mb-1">Support</h4>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">FAQ</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Shipping</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Returns</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Warranty</Link>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-extrabold text-black mb-1">Legal</h4>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">Terms of Service</Link>
            <Link to="/affiliate-disclosure" className="text-sm text-gray-600 hover:text-black transition-colors">Disclaimer</Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-6">
          
          {/* Amazon Affiliate Disclaimer */}
          <p className="text-xs text-gray-500 text-center">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>

          {/* Social Icons : Utilisation des nouveaux composants SVG */}
          <div className="flex gap-4">
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              <TwitterIcon />
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              <InstagramIcon />
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              <YoutubeIcon />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-gray-500">
            © 2026 Kitchen Reviews. All Rights Reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
