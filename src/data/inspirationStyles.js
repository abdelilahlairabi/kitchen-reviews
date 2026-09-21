// src/data/inspirationStyles.js

export const stylesData = {
  "modern-farmhouse": {
    slug: "modern-farmhouse",
    title: "Modern Farmhouse",
    subtitle: "Warm, welcoming, and timeless — where rustic charm meets modern function",
    heroImage: "/guides/guide-featured-faucet.jpeg",
    description: "Modern farmhouse clean elements pair along with natural wood tones, slate counter tops, black metal accents, farmhouse sinks, open shelving, and butcher block counter, and open shelving.",
    tags: ["Warm Wood", "Black Accents", "Open Shelving"],
    
    gallery: [
      "/guides/guide-kitchen-island-design.jpeg",
      "/guides/guide-featured-faucet.jpeg",
      "/guides/guide-kitchen-sink-style.jpeg",
      "/guides/guide-lighting-ideas.jpeg",
      "/guides/guide-pantry-organization.jpeg",
      "/guides/guide-cutting-board-care.jpeg"
    ],

    products: [
      {
        id: 301,
        name: "Dome Pendant Light",
        price: 28.00,
        rating: 5,
        image: "/guides/guide-lighting-ideas.jpeg",
        affiliateUrl: "#"
      },
      {
        id: 302,
        name: "Farmhouse Wooden Bar Stool",
        price: 41.00,
        rating: 5,
        image: "/guides/guide-stand-mixers.jpeg",
        affiliateUrl: "#"
      },
      {
        id: 303,
        name: "Farmhouse Sink Stoneware",
        price: 57.00,
        rating: 5,
        image: "/guides/guide-kitchen-sink-style.jpeg",
        affiliateUrl: "#"
      },
      {
        id: 304,
        name: "Brass Faucet Plumber Faucet",
        price: 35.00,
        rating: 5,
        image: "/guides/guide-featured-faucet.jpeg",
        affiliateUrl: "#"
      },
      {
        id: 305,
        name: "Open Shelf Bracket Wood Shelving",
        price: 32.00,
        rating: 5,
        image: "/guides/guide-cutting-board-care.jpeg",
        affiliateUrl: "#"
      },
      {
        id: 306,
        name: "Ceramic Dish Set & Dish Set",
        price: 33.00,
        rating: 5,
        image: "/guides/guide-cookware-sets.jpeg",
        affiliateUrl: "#"
      }
    ]
  },
  
  "minimalist-white": {
    slug: "minimalist-white",
    title: "Minimalist White",
    subtitle: "Sleek, uncluttered, and serene — simple lines and luminous surfaces",
    heroImage: "/guides/guide-kitchen-sink-style.jpeg",
    description: "Minimalist white kitchens prioritize seamless cabinetry, concealed hardware, integrated appliances, and monochromatic color palettes for an ultra-clean environment.",
    tags: ["Handleless Cabinets", "Quartz Counters", "Monochrome"],
    gallery: [
      "/guides/guide-kitchen-sink-style.jpeg",
      "/guides/guide-cookware-sets.jpeg",
      "/guides/guide-lighting-ideas.jpeg",
      "/guides/guide-pantry-organization.jpeg",
      "/guides/guide-induction-cooktops.jpeg",
      "/guides/guide-stand-mixers.jpeg"
    ],
    products: [
      {
        id: 307,
        name: "Minimalist White Pendant",
        price: 45.00,
        rating: 5,
        image: "/guides/guide-lighting-ideas.jpeg",
        affiliateUrl: "#"
      },
      {
        id: 308,
        name: "Matte White Faucet",
        price: 89.00,
        rating: 5,
        image: "/guides/guide-featured-faucet.jpeg",
        affiliateUrl: "#"
      },
      {
        id: 309,
        name: "White Ceramic Cookware",
        price: 120.00,
        rating: 5,
        image: "/guides/guide-cookware-sets.jpeg",
        affiliateUrl: "#"
      }
    ]
  }
};

export const otherStylesList = [
  {
    slug: "minimalist-white",
    title: "Minimalist White",
    image: "/guides/guide-kitchen-sink-style.jpeg"
  },
  {
    slug: "warm-scandinavian",
    title: "Warm Scandinavian",
    image: "/guides/guide-kitchen-island-design.jpeg"
  },
  {
    slug: "industrial",
    title: "Industrial Edge",
    image: "/guides/guide-lighting-ideas.jpeg"
  }
];

export const getStyleBySlug = (slug) => {
  return stylesData[slug];
};
