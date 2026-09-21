// src/data/categories.js

export const categories = [
  // === CATÉGORIES PRINCIPALES ===
  {
    slug: "faucets",
    name: "Kitchen Faucets",
    description: "Explore our top-rated faucets for every kitchen style",
    heroImage: "/categories/category-faucets.jpeg",
    subFilters: ["Pull-Down", "Touchless", "Bridge", "Wall-Mount", "Commercial-Style"],
    buyingGuide: {
      title: "How to Choose the Right Kitchen Faucet",
      points: [
        { icon: "✨", label: "Finish & Material" },
        { icon: "🚿", label: "Spray Function" },
        { icon: "🔧", label: "Mounting Type" },
      ],
    },
  },
  {
    slug: "sinks",
    name: "Kitchen Sinks",
    description: "Durable, stylish sinks for every kitchen layout",
    heroImage: "/categories/category-sinks.jpeg",
    subFilters: ["Undermount", "Farmhouse", "Drop-In", "Double-Bowl", "Stainless Steel", "Fireclay"],
    buyingGuide: {
      title: "How to Choose the Right Kitchen Sink",
      points: [
        { icon: "🧱", label: "Material" },
        { icon: "📏", label: "Size & Depth" },
        { icon: "🔩", label: "Mounting Style" },
      ],
    },
  },
  {
    slug: "cookware",
    name: "Cookware",
    description: "Pots, pans and everything you need to cook well",
    heroImage: "/categories/category-cookware.jpeg",
    subFilters: ["Cookware Sets", "Dutch Ovens", "Skillets & Pans", "Stainless Steel", "Cast Iron", "Non-Stick"],
    buyingGuide: {
      title: "How to Choose Quality Cookware",
      points: [
        { icon: "🔥", label: "Heat Conduction" },
        { icon: "🍳", label: "Material & Coating" },
        { icon: "🧼", label: "Ease of Maintenance" },
      ],
    },
  },
  {
    slug: "small-appliances",
    name: "Small Appliances",
    description: "Mixers, blenders, coffee makers and more",
    heroImage: "/categories/category-small-appliances.jpeg",
    subFilters: ["Stand Mixers", "Blenders", "Coffee Makers", "Toasters", "Air Fryers", "Slow Cookers"],
    buyingGuide: {
      title: "How to Choose Small Appliances",
      points: [
        { icon: "⚡", label: "Power & Wattage" },
        { icon: "📐", label: "Capacity & Size" },
        { icon: "⚙️", label: "Features & Settings" },
      ],
    },
  },
  {
    slug: "utensils",
    name: "Utensils",
    description: "Knives, cutting boards and everyday essentials",
    heroImage: "/categories/category-utensils.jpeg",
    subFilters: ["Knife Sets", "Cutting Boards", "Spatulas", "Measuring Tools", "Peelers", "Tongs"],
    buyingGuide: {
      title: "How to Choose Kitchen Utensils",
      points: [
        { icon: "🔪", label: "Blade & Material Quality" },
        { icon: "🖐️", label: "Ergonomics & Grip" },
        { icon: "🛡️", label: "Durability" },
      ],
    },
  },
  {
    slug: "kitchen-islands",
    name: "Kitchen Islands",
    description: "Add space and style with a kitchen island",
    heroImage: "/categories/category-kitchen-islands.jpeg",
    subFilters: ["Rolling Carts", "Stationary Islands", "Drop-Leaf", "Butcher Block Top", "Stainless Steel Top"],
    buyingGuide: {
      title: "How to Choose a Kitchen Island",
      points: [
        { icon: "🛞", label: "Mobility vs. Fixed" },
        { icon: "📦", label: "Storage Options" },
        { icon: "🪵", label: "Countertop Material" },
      ],
    },
  },
  {
    slug: "lighting",
    name: "Lighting",
    description: "Pendant lights and fixtures for your kitchen",
    heroImage: "/categories/category-lighting.jpeg",
    subFilters: ["Pendant Lights", "Chandeliers", "Flush Mount", "Under Cabinet", "Track Lighting", "Industrial"],
    buyingGuide: {
      title: "How to Choose Kitchen Lighting",
      points: [
        { icon: "💡", label: "Brightness & Lumens" },
        { icon: "🎨", label: "Design & Style" },
        { icon: "📏", label: "Height & Placement" },
      ],
    },
  },

  // === AUTRES CATÉGORIES ===
  {
    slug: "bakeware",
    name: "Bakeware",
    description: "High-quality baking pans, sheets, and molds",
    heroImage: "/categories/category-bakeware.jpeg",
    subFilters: ["Baking Sheets", "Cake Pans", "Muffin Pans", "Loaf Pans", "Casserole Dishes", "Silicone Mats"],
    buyingGuide: {
      title: "How to Choose Bakeware",
      points: [
        { icon: "🔥", label: "Even Heat Distribution" },
        { icon: "✨", label: "Non-Stick Performance" },
        { icon: "🧼", label: "Dishwasher Safe" },
      ],
    },
  },
  {
    slug: "cabinets",
    name: "Cabinets",
    description: "Stylish and functional kitchen cabinetry",
    heroImage: "/categories/category-cabinets.jpeg",
    subFilters: ["Base Cabinets", "Wall Cabinets", "Pantry Cabinets", "Shaker Style", "Modern Flat-Panel"],
    buyingGuide: {
      title: "How to Choose Kitchen Cabinets",
      points: [
        { icon: "🚪", label: "Door Style & Finish" },
        { icon: "🗄️", label: "Storage Layout" },
        { icon: "🪵", label: "Wood & Build Quality" },
      ],
    },
  },
  {
    slug: "countertops",
    name: "Countertops",
    description: "Durable and elegant surfaces for your workspace",
    heroImage: "/categories/category-countertops.jpeg",
    subFilters: ["Quartz", "Granite", "Butcher Block", "Marble", "Laminate", "Concrete"],
    buyingGuide: {
      title: "How to Choose Countertops",
      points: [
        { icon: "🛡️", label: "Stain & Scratch Resistance" },
        { icon: "🧼", label: "Maintenance Required" },
        { icon: "🎨", label: "Color & Pattern" },
      ],
    },
  },
  {
    slug: "kitchen-stands",
    name: "Kitchen Stands",
    description: "Versatile stands and carts for extra storage",
    heroImage: "/categories/category-kitchen-stands.jpeg",
    subFilters: ["Microwave Stands", "Bakers Racks", "Bar Carts", "Wire Shelving", "Wood Stands"],
    buyingGuide: {
      title: "How to Choose Kitchen Stands",
      points: [
        { icon: "🏋️", label: "Weight Capacity" },
        { icon: "📚", label: "Number of Shelves" },
        { icon: "🛞", label: "Wheels vs. Feet" },
      ],
    },
  },
  {
    slug: "storage-organization",
    name: "Storage Organization",
    description: "Smart solutions to keep your kitchen tidy",
    heroImage: "/categories/category-storage-organization.jpeg",
    subFilters: ["Food Storage Containers", "Spice Racks", "Pantry Bins", "Pot Racks", "Dish Racks"],
    buyingGuide: {
      title: "How to Choose Storage Solutions",
      points: [
        { icon: "📐", label: "Space Efficiency" },
        { icon: "🔒", label: "Airtight & Leakproof Seals" },
        { icon: "🌿", label: "BPA-Free Materials" },
      ],
    },
  },
  {
    slug: "utensil-organizers",
    name: "Utensil Organizers",
    description: "Keep your tools sorted and accessible",
    heroImage: "/categories/category-utensil-organizers.jpeg",
    subFilters: ["Drawer Dividers", "Utensil Crocks", "Knife Blocks", "Magnetic Knife Strips", "Silverware Trays"],
    buyingGuide: {
      title: "How to Choose Utensil Organizers",
      points: [
        { icon: "📏", label: "Drawer Dimensions" },
        { icon: "🧩", label: "Adjustable Compartments" },
        { icon: "🧼", label: "Easy to Clean" },
      ],
    },
  },
  {
    slug: "water-filters",
    name: "Water Filters",
    description: "Clean, fresh, and purified drinking water",
    heroImage: "/categories/category-water-filters.jpeg",
    subFilters: ["Under Sink", "Pitchers", "Faucet Attachments", "Reverse Osmosis", "Countertop Filters"],
    buyingGuide: {
      title: "How to Choose a Water Filter",
      points: [
        { icon: "💧", label: "Filtration Method" },
        { icon: "🚰", label: "Flow Rate & Capacity" },
        { icon: "⏳", label: "Filter Lifespan & Cost" },
      ],
    },
  }
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);