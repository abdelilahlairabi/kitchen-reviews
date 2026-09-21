// src/data/products.js

export const products = [
  // === PRODUIT VEDETTE (Full details, gallery, reviews) ===
  {
    id: 1,
    slug: "kitchenaid-artisan-stand-mixer",
    name: "KitchenAid Artisan Series 5-Quart Stand Mixer",
    category: "small-appliances",
    types: ["Stand Mixers"],
    image: "/products/product-stand-mixer.jpeg",
    images: ["/products/product-stand-mixer.jpeg"],
    hasFullGallery: false,
    price: 379.99,
    originalPrice: 449.99,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 15432,
    badge: "Best Seller",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Whether you need 9 dozen of your signature chocolate chips cookies or shredded chicken for Taco Tuesday with friends and family, the KitchenAid Artisan Series 5 Quart Tilt-Head Stand Mixer has the capacity for every occasion.",
    features: ["10 Speed settings", "5-Quart stainless steel bowl", "Tilt-head design for easy access", "Includes coated flat beater, dough hook, and wire whip"],
    specs: { 
      "Material": "Zinc, Stainless Steel", 
      "Capacity": "5 Quarts", 
      "Wattage": "325 Watts", 
      "Warranty": "1-Year Limited" 
    },
    reviews: [
      { name: "Emily R.", avatar: "/Product%20Details/avatar-sarah.jpeg", rating: 5, text: "Absolutely love this mixer! It handles heavy bread dough without struggling." },
      { name: "James T.", avatar: "/Product%20Details/avatar-michael.jpeg", rating: 4, text: "Great quality, but it is quite heavy to move around the kitchen." }
    ]
  },

  // === PRODUIT STANDARD ===
  {
    id: 2,
    slug: "vitamix-professional-blender",
    name: "Vitamix Professional Grade Blender",
    category: "small-appliances",
    types: ["Blenders"],
    image: "/products/product-blender.jpeg",
    images: ["/products/product-blender.jpeg"],
    hasFullGallery: false,
    price: 349.00,
    originalPrice: null,
    discountPercent: null,
    rating: 4.8,
    reviewCount: 4210,
    badge: "Best Seller",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Professional-grade blender with variable speed control and pulse feature. Perfect for smoothies, hot soups, and frozen desserts.",
    features: ["Variable speed control", "Self-cleaning in 60 seconds", "Hardened stainless-steel blades"],
    specs: { "Material": "Tritan Plastic", "Capacity": "64 oz", "Power": "2.2 Peak HP", "Warranty": "7-Year Full" },
    reviews: []
  },

  // === PRODUIT VEDETTE ===
  {
    id: 3,
    slug: "le-creuset-cast-iron-cocotte",
    name: "Le Creuset Enameled Cast Iron Cocotte",
    category: "cookware",
    types: ["Dutch Ovens"],
    image: "/products/product-cast-iron-cocotte.jpeg",
    images: ["/products/product-cast-iron-cocotte.jpeg"],
    hasFullGallery: false,
    price: 359.95,
    originalPrice: 420.00,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 2890,
    badge: "Editor's Choice",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "The iconic Le Creuset Dutch oven is indispensable in the kitchens of home cooks and professional chefs alike.",
    features: ["Enameled cast iron delivers superior heat distribution", "Easy-to-clean enamel resists dulling", "No seasoning required"],
    specs: { "Material": "Enameled Cast Iron", "Capacity": "5.5 Quarts", "Max Temperature": "500°F", "Warranty": "Lifetime" },
    reviews: [
      { name: "Sarah M.", avatar: "/Product%20Details/avatar-sarah.jpeg", rating: 5, text: "Worth every penny. Cooks stews and bakes bread perfectly." }
    ]
  },

  // === PRODUIT STANDARD ===
  {
    id: 4,
    slug: "fireclay-ceramic-farmhouse-sink",
    name: "Fireclay Ceramic Farmhouse Kitchen Sink",
    category: "sinks",
    types: ["Farmhouse"],
    image: "/products/product-ceramic-sink.jpeg",
    images: ["/products/product-ceramic-sink.jpeg"],
    hasFullGallery: false,
    price: 499.00,
    originalPrice: 599.00,
    discountPercent: 16,
    rating: 4.6,
    reviewCount: 512,
    badge: "Best Seller",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "A beautiful, durable fireclay farmhouse sink that resists chipping, scratching, and fading.",
    features: ["Apron-front installation", "Reversible design", "Stain-resistant glaze"],
    specs: { "Material": "Fireclay", "Installation": "Farmhouse/Apron", "Dimensions": "30\" x 18\"", "Warranty": "10-Year" },
    reviews: []
  },

  // === PRODUIT STANDARD ===
  {
    id: 5,
    slug: "japanese-damascus-chef-knife",
    name: "8-Inch Japanese Damascus Chef Knife",
    category: "utensils",
    types: [],
    image: "/products/product-chef-knife.jpeg",
    images: ["/products/product-chef-knife.jpeg"],
    hasFullGallery: false,
    price: 129.50,
    originalPrice: null,
    discountPercent: null,
    rating: 4.7,
    reviewCount: 1845,
    badge: "Best Seller",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Precision-forged from a single piece of high-carbon Japanese steel with a beautiful Damascus pattern.",
    features: ["67-layer Damascus steel", "Ergonomic G10 handle", "Razor-sharp 12-degree edge"],
    specs: { "Material": "VG-10 Steel", "Blade Length": "8 Inches", "Handle": "G10 Fiberglass", "Care": "Hand Wash Only" },
    reviews: []
  },

  // === PRODUIT STANDARD ===
  {
    id: 6,
    slug: "programmable-drip-coffee-maker",
    name: "12-Cup Programmable Drip Coffee Maker",
    category: "small-appliances",
    types: ["Coffee Makers"],
    image: "/products/product-coffee-maker.jpeg",
    images: ["/products/product-coffee-maker.jpeg"],
    hasFullGallery: false,
    price: 79.99,
    originalPrice: null,
    discountPercent: null,
    rating: 4.4,
    reviewCount: 8930,
    badge: "Best Seller",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Wake up to fresh coffee with this 24-hour programmable coffee maker featuring brew strength control.",
    features: ["24-hour programmability", "1-4 cup setting", "Keep warm function", "Auto shut-off"],
    specs: { "Material": "Stainless Steel/Plastic", "Capacity": "12 Cups", "Filter Type": "Reusable Gold-Tone", "Warranty": "1-Year" },
    reviews: []
  },

  // === PRODUIT VEDETTE ===
  {
    id: 7,
    slug: "walnut-end-grain-cutting-board",
    name: "Premium Walnut End-Grain Cutting Board",
    category: "utensils",
    types: ["Cutting Boards"],
    image: "/products/product-cutting-board.jpeg",
    images: ["/products/product-cutting-board.jpeg"],
    hasFullGallery: false,
    price: 119.00,
    originalPrice: 149.00,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 620,
    badge: "Best Seller",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Handcrafted end-grain walnut cutting board that is gentle on your knives and beautiful enough to serve as a charcuterie board.",
    features: ["Self-healing end-grain construction", "Deep juice groove", "Non-slip rubber feet", "Pre-seasoned with mineral oil"],
    specs: { "Material": "American Black Walnut", "Dimensions": "18\" x 12\" x 1.5\"", "Weight": "7 lbs", "Care": "Hand Wash & Oil Monthly" },
    reviews: [
      { name: "David L.", avatar: "/Product%20Details/avatar-michael.jpeg", rating: 5, text: "Heavy, gorgeous piece of wood. My knives stay sharper much longer." }
    ]
  },

  // === PRODUIT STANDARD ===
  {
    id: 8,
    slug: "classic-enameled-dutch-oven",
    name: "Classic 6-Quart Enameled Dutch Oven",
    category: "cookware",
    types: ["Dutch Ovens"],
    image: "/products/product-dutch-oven.jpeg",
    images: ["/products/product-dutch-oven.jpeg"],
    hasFullGallery: false,
    price: 69.99,
    originalPrice: 89.99,
    discountPercent: 22,
    rating: 4.5,
    reviewCount: 11200,
    badge: "Great Value",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "An affordable, versatile dutch oven perfect for slow-cooking, roasting, and baking.",
    features: ["Oven safe up to 400°F", "Heavy cast iron for even heating", "Smooth enamel finish"],
    specs: { "Material": "Cast Iron", "Capacity": "6 Quarts", "Lid": "Included", "Warranty": "Limited Lifetime" },
    reviews: []
  },

  // === PRODUIT STANDARD ===
  {
    id: 9,
    slug: "gooseneck-electric-kettle",
    name: "Variable Temperature Gooseneck Electric Kettle",
    category: "small-appliances",
    types: [],
    image: "/products/product-electric-kettle.jpeg",
    images: ["/products/product-electric-kettle.jpeg"],
    hasFullGallery: false,
    price: 135.00,
    originalPrice: null,
    discountPercent: null,
    rating: 4.7,
    reviewCount: 3400,
    badge: null,
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "The perfect kettle for pour-over coffee enthusiasts, featuring precise temperature control and a precision pour spout.",
    features: ["To-the-degree temperature control", "Hold mode keeps water hot for 60 mins", "Built-in brew stopwatch"],
    specs: { "Material": "Stainless Steel", "Capacity": "0.9 Liters", "Power": "1200 Watts", "Warranty": "1-Year" },
    reviews: []
  },

  // === PRODUIT VEDETTE ===
  {
    id: 10,
    slug: "semi-automatic-espresso-machine",
    name: "Semi-Automatic Espresso Machine with Milk Frother",
    category: "small-appliances",
    types: [],
    image: "/products/product-espresso-machine.jpeg",
    images: ["/products/product-espresso-machine.jpeg"],
    hasFullGallery: false,
    price: 699.95,
    originalPrice: null,
    discountPercent: null,
    rating: 4.6,
    reviewCount: 5670,
    badge: "Premium",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Create third-wave specialty coffee at home from bean to espresso in less than a minute.",
    features: ["Integrated conical burr grinder", "Digital temperature control (PID)", "Micro-foam milk texturing wand"],
    specs: { "Material": "Brushed Stainless Steel", "Pump Pressure": "15 Bar", "Water Tank": "67 oz", "Warranty": "2-Year" },
    reviews: [
      { name: "Kevin W.", avatar: "/Product%20Details/avatar-michael.jpeg", rating: 5, text: "Takes a bit of learning to dial in the grind, but the coffee is better than most cafes." },
      { name: "Amanda B.", avatar: "/Product%20Details/avatar-sarah.jpeg", rating: 4, text: "Excellent machine, though the drip tray fills up quite fast." }
    ]
  },

  // === PRODUIT STANDARD ===
  {
    id: 11,
    slug: "brushed-nickel-kitchen-faucet",
    name: "Brushed Nickel Pull-Down Kitchen Faucet",
    category: "faucets",
    types: ["Pull-Down"],
    image: "/products/product-faucet.jpeg",
    images: ["/products/product-faucet.jpeg"],
    hasFullGallery: false,
    price: 159.00,
    originalPrice: 199.00,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 2100,
    badge: null,
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Sleek and modern high-arc kitchen faucet with a dual-function pull-down sprayer.",
    features: ["Magnetic docking spray head", "Spot resist finish", "1-hole or 3-hole installation"],
    specs: { "Material": "Metal", "Finish": "Brushed Nickel", "Flow Rate": "1.5 GPM", "Warranty": "Limited Lifetime" },
    reviews: []
  },

  // === PRODUIT STANDARD ===
  {
    id: 12,
    slug: "indoor-hydroponic-herb-garden",
    name: "Smart Indoor Hydroponic Herb Garden",
    category: "small-appliances", // Mismatched category based on files, but keeping it general
    types: [],
    image: "/products/product-herb-garden.jpeg",
    images: ["/products/product-herb-garden.jpeg"],
    hasFullGallery: false,
    price: 129.99,
    originalPrice: 149.99,
    discountPercent: 13,
    rating: 4.5,
    reviewCount: 3320,
    badge: "Smart Home",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Grow fresh herbs and vegetables year-round right on your kitchen counter with this smart LED grow system.",
    features: ["20W LED grow light", "Automatic timer", "Water level indicator", "Includes 6 herb seed pods"],
    specs: { "Material": "Plastic", "Capacity": "6 Pods", "Lighting": "Full Spectrum LED", "Warranty": "1-Year" },
    reviews: []
  },

  // === PRODUIT VEDETTE ===
  {
    id: 13,
    slug: "rolling-kitchen-island-cart",
    name: "Solid Wood Rolling Kitchen Island Cart",
    category: "kitchen-islands",
    types: ["Rolling Carts"],
    image: "/products/product-kitchen-island.jpeg",
    images: ["/products/product-kitchen-island.jpeg"],
    hasFullGallery: false,
    price: 289.00,
    originalPrice: 350.00,
    discountPercent: 17,
    rating: 4.3,
    reviewCount: 1450,
    badge: null,
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Expand your prep space and storage with this beautiful solid wood rolling kitchen cart featuring lockable casters.",
    features: ["Solid wood butcher block top", "2 storage drawers", "Adjustable inner shelf", "Towel rack and spice rack"],
    specs: { "Material": "Rubberwood/MDF", "Dimensions": "48\"W x 18\"D x 36\"H", "Weight Capacity": "200 lbs", "Assembly": "Required" },
    reviews: [
      { name: "John S.", avatar: "/Product%20Details/avatar-michael.jpeg", rating: 4, text: "Looks great and adds much-needed counter space. Assembly took about 2 hours." }
    ]
  },

  // === PRODUIT STANDARD ===
  {
    id: 14,
    slug: "15-piece-knife-block-set",
    name: "15-Piece Stainless Steel Knife Block Set",
    category: "utensils",
    types: ["Knife Sets"],
    image: "/products/product-knife-set.jpeg",
    images: ["/products/product-knife-set.jpeg"],
    hasFullGallery: false,
    price: 199.95,
    originalPrice: null,
    discountPercent: null,
    rating: 4.7,
    reviewCount: 4500,
    badge: null,
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "A complete kitchen knife set featuring forged high-carbon stainless steel blades and a handsome wooden block.",
    features: ["High-carbon German steel", "Full tang construction", "Triple-riveted handles", "Built-in sharpener"],
    specs: { "Material": "Stainless Steel", "Pieces": "15", "Block": "Acacia Wood", "Care": "Hand Wash" },
    reviews: []
  },

  // === PRODUIT STANDARD ===
  {
    id: 15,
    slug: "industrial-pendant-light",
    name: "Matte Black Industrial Pendant Light",
    category: "lighting",
    types: ["Industrial"],
    image: "/products/product-pendant-light.jpeg",
    images: ["/products/product-pendant-light.jpeg"],
    hasFullGallery: false,
    price: 54.99,
    originalPrice: 75.00,
    discountPercent: 26,
    rating: 4.6,
    reviewCount: 890,
    badge: "Clearance",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Add a touch of modern industrial style to your kitchen island or dining area with this vintage-inspired pendant fixture.",
    features: ["Adjustable cord length", "Compatible with sloped ceilings", "Matte black finish with brass accents"],
    specs: { "Material": "Metal", "Max Wattage": "60W", "Bulb Base": "E26 Medium", "Certifications": "UL Listed" },
    reviews: []
  },

  // === PRODUIT STANDARD ===
  {
    id: 16,
    slug: "programmable-pressure-cooker",
    name: "7-in-1 Programmable Pressure Cooker",
    category: "small-appliances",
    types: ["Slow Cookers"],
    image: "/products/product-pressure-cooker.jpeg",
    images: ["/products/product-pressure-cooker.jpeg"],
    hasFullGallery: false,
    price: 99.95,
    originalPrice: null,
    discountPercent: null,
    rating: 4.8,
    reviewCount: 65000,
    badge: "Best Seller",
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Combines 7 kitchen appliances in 1: Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    features: ["13 smart touch customizable programs", "Stainless steel inner pot", "10+ safety features"],
    specs: { "Material": "Stainless Steel", "Capacity": "6 Quarts", "Power": "1000 Watts", "Warranty": "1-Year" },
    reviews: []
  },

  // === PRODUIT STANDARD ===
  {
    id: 17,
    slug: "precision-sous-vide-cooker",
    name: "Precision Sous Vide Immersion Circulator",
    category: "small-appliances",
    types: [],
    image: "/products/product-sous-vide.jpeg",
    images: ["/products/product-sous-vide.jpeg"],
    hasFullGallery: false,
    price: 149.00,
    originalPrice: 199.00,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 4200,
    badge: null,
    affiliateUrl: "https://amazon.com/dp/XXXXX?tag=tonid-20",
    description: "Achieve restaurant-quality results at home with precise temperature control and app connectivity.",
    features: ["WiFi connected", "Cooks edge-to-edge perfectly", "Adjustable clamp fits most pots"],
    specs: { "Material": "Polycarbonate/Stainless Steel", "Power": "1000 Watts", "Connectivity": "WiFi 802.11 b/g/n", "Max Temp": "197°F" },
    reviews: []
  }
];
