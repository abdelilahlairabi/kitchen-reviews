const categoryMetadata = {
  faucets: {
    title: 'Kitchen Faucet Reviews & Buying Guide | KitchenTrusted',
    description: 'Compare kitchen faucets by spray style, mounting type, finish, and installation needs. Explore pull-down, touchless, bridge, and wall-mount options.',
  },
  sinks: {
    title: 'Kitchen Sink Reviews & Buying Guide | KitchenTrusted',
    description: 'Compare kitchen sinks by mounting style, bowl layout, and material. Explore farmhouse, undermount, drop-in, stainless steel, and fireclay options.',
  },
  cookware: {
    title: 'Cookware Reviews & Buying Guide | KitchenTrusted',
    description: 'Browse cookware sets, Dutch ovens, skillets, and pans. Compare cast iron, stainless steel, and nonstick options by cooking needs and care.',
  },
  'small-appliances': {
    title: 'Small Appliance Reviews & Buying Guides | KitchenTrusted',
    description: 'Explore stand mixers, blenders, coffee makers, toasters, air fryers, and slow cookers. Compare capacity, features, and kitchen fit.',
  },
  utensils: {
    title: 'Kitchen Utensil Reviews & Buying Guide | KitchenTrusted',
    description: 'Compare knife sets, cutting boards, spatulas, measuring tools, peelers, and tongs by material, everyday use, and care requirements.',
  },
  'kitchen-islands': {
    title: 'Kitchen Island Reviews & Buying Guide | KitchenTrusted',
    description: 'Compare kitchen islands by footprint, storage, mobility, and worktop. Browse rolling, drop-leaf, stationary, butcher-block, and steel-top options.',
  },
  lighting: {
    title: 'Kitchen Lighting Reviews & Buying Guide | KitchenTrusted',
    description: 'Explore pendant lights, chandeliers, flush mounts, under-cabinet, and track lighting. Compare placement, style, and installation details.',
  },
  bakeware: {
    title: 'Bakeware Reviews & Buying Guide | KitchenTrusted',
    description: 'Compare baking sheets, cake pans, muffin pans, loaf pans, casserole dishes, and silicone mats by material, size, and care.',
  },
  cabinets: {
    title: 'Kitchen Cabinet Reviews & Buying Guide | KitchenTrusted',
    description: 'Explore base, wall, and pantry cabinets in shaker and modern flat-panel styles. Compare storage, dimensions, finishes, and installation needs.',
  },
  countertops: {
    title: 'Kitchen Countertop Materials & Buying Guide | KitchenTrusted',
    description: 'Compare quartz, granite, butcher block, marble, laminate, and concrete countertops by care, durability, appearance, and installation.',
  },
  'kitchen-stands': {
    title: 'Kitchen Stand Reviews & Buying Guide | KitchenTrusted',
    description: 'Compare microwave stands, bakers racks, bar carts, and shelving by footprint, storage, materials, and mobility for your kitchen.',
  },
  'storage-organization': {
    title: 'Kitchen Storage & Organization | KitchenTrusted',
    description: 'Find kitchen storage options including food containers, spice racks, pantry bins, pot racks, and dish racks. Compare capacity and fit.',
  },
  'utensil-organizers': {
    title: 'Kitchen Utensil Organizer Reviews | KitchenTrusted',
    description: 'Compare drawer dividers, utensil crocks, knife blocks, magnetic knife strips, and silverware trays by size, capacity, and storage style.',
  },
  'water-filters': {
    title: 'Kitchen Water Filter Reviews & Buying Guide | KitchenTrusted',
    description: 'Compare under-sink, pitcher, faucet-mounted, reverse-osmosis, and countertop water filters by installation, capacity, and filter upkeep.',
  },
};

function shortenAtWord(value, maxLength) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  const shortened = text.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : shortened.length).trimEnd()}…`;
}

export function getCategorySeo(category) {
  return categoryMetadata[category.slug] || {
    title: `${category.name} Products & Buying Guide | KitchenTrusted`,
    description: `Compare ${category.name.toLowerCase()} by features, materials, and fit. Browse product details and practical information before choosing for your kitchen.`,
  };
}

export function getProductSeo(product) {
  const suffix = ' | KitchenTrusted';
  const title = `${shortenAtWord(product.name, 65 - suffix.length)}${suffix}`;
  const plainDescription = String(product.description || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
  const description = shortenAtWord(
    plainDescription || `See listed specifications and customer feedback for ${product.name}. Confirm current price and availability with the retailer.`,
    160,
  );

  return { title, description };
}
