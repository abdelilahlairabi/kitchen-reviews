// src/data/inspiration.js

export const inspirationCategories = [
  "All Styles",
  "Modern Farmhouse",
  "Minimalist White",
  "Warm Scandinavian"
];

export const inspirationGallery = [
  {
    id: 1,
    category: "Modern Farmhouse",
    slug: "modern-farmhouse",
    title: "Modern Farmhouse",
    description: "Explore warm wood, classic cabinetry, farmhouse sinks, and balanced black accents.",
    image: "/styles/modern-farmhouse-hero.webp",
    featured: true,
    size: "large"
  },
  {
    id: 2,
    category: "Minimalist White",
    slug: "minimalist-white",
    title: "Minimalist White",
    description: "See bright white kitchens with clean cabinetry, pale stone, and concealed storage.",
    image: "/styles/minimalist-white-hero.webp",
    size: "medium"
  },
  {
    id: 3,
    category: "Warm Scandinavian",
    slug: "warm-scandinavian",
    title: "Warm Scandinavian",
    description: "Browse calm Nordic kitchens with light wood, soft neutrals, and functional details.",
    image: "/styles/warm-scandinavian-hero.webp",
    size: "medium"
  },
];

export const styleSpotlight = {
  title: "This Month's Spotlight: Modern Farmhouse",
  subtitle: "STYLE SPOTLIGHT SECTION",
  description: "The modern farmhouse look blends rustic character with clean, contemporary lines. Natural wood accents, open shelving, and apron-front sinks create an inviting workspace for home chefs.",
  image: "/styles/modern-farmhouse-hero.webp",
  featuredItems: [
    {
      id: "item-1",
      name: "Pendant Light",
      image: "/guides/guide-lighting-ideas.jpeg"
    },
    {
      id: "item-2",
      name: "Bar Stool",
      image: "/guides/guide-stand-mixers.jpeg"
    },
    {
      id: "item-3",
      name: "Farmhouse Sink",
      image: "/guides/guide-kitchen-sink-style.jpeg"
    }
  ]
};

export const shopTheLookProducts = [
  { slug: "brushed-nickel-kitchen-faucet" },
  { slug: "walnut-end-grain-cutting-board" },
  { slug: "fireclay-ceramic-farmhouse-sink" },
  { slug: "gooseneck-electric-kettle" },
];
