// Editorial collection copy stays in the frontend; product records are resolved from Supabase by slug.
export const collections = [
  {
    id: 1,
    slug: 'modern-farmhouse-essentials',
    name: 'Modern Farmhouse Essentials',
    featured: true,
    badge: 'Featured',
    image: '/collections/collection-featured-modern-farmhouse.jpeg',
    subtitle: 'Warm finishes and hardworking essentials for a relaxed, practical kitchen.',
    introText: 'A farmhouse-inspired kitchen can feel welcoming without leaning on distressed finishes or decorative clutter. This selection pairs a few character pieces—such as a farmhouse sink and natural walnut—with practical cookware and lighting. Use the style as a starting point, then adapt the mix to your own layout, care preferences, and budget.',
    productSlugs: [
      'fireclay-ceramic-farmhouse-sink',
      'brushed-nickel-kitchen-faucet',
      'walnut-end-grain-cutting-board',
      'classic-enameled-dutch-oven',
      'rolling-kitchen-island-cart',
      'industrial-pendant-light',
    ],
    relatedSlugs: ['rustic-wood-accents', 'scandinavian-minimalist', 'budget-friendly-upgrades'],
    contentSections: [
      {
        heading: 'Build the look from a few repeated materials',
        paragraphs: [
          'Start with simple cabinet fronts and a restrained palette, then add warmth through wood grain, a practical island, or a small number of metal accents. Repeating a finish two or three times usually feels more intentional than introducing a different material at every turn.',
          'A farmhouse sink can become a visual anchor, but it also affects cabinet support, counter fabrication, and faucet reach. Confirm the installation requirements before making it the starting point for a renovation.',
        ],
        bullets: ['Choose one or two wood tones and repeat them.', 'Use open shelving selectively; keep daily storage convenient.', 'Compare faucet finishes and cleaning guidance before pairing metals.'],
      },
      {
        heading: 'Keep the kitchen comfortable to work in',
        paragraphs: [
          'The style should support cooking as much as it supports the room’s appearance. Keep prep tools close to the work surface, choose cookware that suits the meals you make, and make sure pendant lights do not leave the counters in shadow.',
          'If you are updating one area at a time, begin with movable pieces such as a cutting board, cookware, or lighting. Larger changes such as a sink or island need careful measurement and installation planning.',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'small-kitchen-essentials',
    name: 'Small Kitchen Essentials',
    featured: false,
    badge: 'Small-space picks',
    image: '/collections/collection-small-kitchen-essentials.jpeg',
    subtitle: 'Compact tools and flexible equipment for kitchens where every surface matters.',
    introText: 'A small kitchen benefits from equipment that earns its storage space. This collection focuses on compact prep tools and versatile appliances rather than large fixed upgrades. Before buying, measure the counter, cabinet, and storage space you actually have, including room to open lids, drawers, and appliance doors.',
    productSlugs: [
      'programmable-pressure-cooker',
      'precision-sous-vide-cooker',
      'programmable-drip-coffee-maker',
      'gooseneck-electric-kettle',
      'walnut-end-grain-cutting-board',
      'japanese-damascus-chef-knife',
    ],
    relatedSlugs: ['budget-friendly-upgrades', 'smart-kitchen-tech', 'coffee-espresso-corner'],
    contentSections: [
      {
        heading: 'Measure storage and working clearance',
        paragraphs: [
          'Check the full footprint of an appliance and the space needed to use it. A pressure cooker needs room for its lid and steam release; a coffee maker needs clearance for filling and removing its carafe. An item that fits on the counter but blocks a cabinet or walkway may not be a practical fit.',
          'For tools that can be stored away, measure the shelf opening and consider weight. Frequently used equipment is most useful when it is easy to reach and put back safely.',
        ],
        bullets: ['Measure width, depth, and height—not just the appliance base.', 'Leave the manufacturer’s recommended ventilation space.', 'Keep knives protected in a drawer organizer or blade guard.'],
      },
      {
        heading: 'Favor versatility over duplicate appliances',
        paragraphs: [
          'A multi-function cooker or immersion circulator may cover tasks you otherwise do with separate equipment, but only if you will use those functions. Think through your weekly meals and choose tools around routines you already have.',
          'A stable cutting board and one comfortable all-purpose knife can be more useful than a large set of specialized tools. Consider how each item will be cleaned and stored before adding it to a compact kitchen.',
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'budget-friendly-upgrades',
    name: 'Budget-Friendly Upgrades',
    featured: false,
    badge: 'Value-minded',
    image: '/collections/collection-budget-friendly.jpeg',
    subtitle: 'Useful everyday picks chosen for function before decorative extras.',
    introText: 'A thoughtful kitchen refresh does not have to start with a full renovation. This group emphasizes useful appliances, cookware, and lighting that can solve a specific everyday need. Compare current prices and warranty terms, and avoid paying for functions or accessories you are unlikely to use.',
    productSlugs: [
      'programmable-pressure-cooker',
      'classic-enameled-dutch-oven',
      'programmable-drip-coffee-maker',
      'industrial-pendant-light',
    ],
    relatedSlugs: ['small-kitchen-essentials', 'modern-farmhouse-essentials', 'eco-friendly-kitchen'],
    contentSections: [
      {
        heading: 'Set a need and a spending limit first',
        paragraphs: [
          'Before shopping, name the problem you want to solve: faster weeknight meals, more reliable coffee, a better-lit work surface, or cookware for a specific recipe. A clear need makes it easier to compare products on relevant features rather than marketing language.',
          'Prices change, so treat any displayed catalog price as a snapshot and confirm the total cost with the seller. Include accessories, installation, replacement parts, and delivery when they apply.',
        ],
        bullets: ['Choose a maximum budget before comparing products.', 'Check capacity and included accessories against your routine.', 'Read the return policy, warranty, and replacement-part availability.'],
      },
      {
        heading: 'Spend on the feature you will use most',
        paragraphs: [
          'A multi-cooker can be valuable when its modes replace equipment you would otherwise buy, while a simpler pot may be a better choice if you only need stovetop cooking. The same principle applies to lighting: prioritize safe installation and useful illumination over a finish that does not improve the room.',
          'If your budget is limited, upgrade one high-use area at a time. Small changes to prep tools, storage, or task lighting can make a kitchen more comfortable without committing to a costly remodel.',
        ],
      },
    ],
  },
  {
    id: 4,
    slug: 'luxury-kitchen-must-haves',
    name: 'Premium Kitchen Picks',
    featured: false,
    badge: 'Premium materials',
    image: '/collections/collection-luxury-must-haves.jpeg',
    subtitle: 'Higher-end appliances, cookware, and fixtures for considered kitchen upgrades.',
    introText: 'Premium purchases should earn their place through fit, function, serviceability, and finish—not price alone. This collection brings together higher-ticket items from the current catalog. Compare exact dimensions, installation needs, warranty coverage, and care requirements before committing to a large purchase.',
    productSlugs: [
      'semi-automatic-espresso-machine',
      'vitamix-professional-blender',
      'kitchenaid-artisan-stand-mixer',
      'le-creuset-cast-iron-cocotte',
      'fireclay-ceramic-farmhouse-sink',
      'rolling-kitchen-island-cart',
    ],
    relatedSlugs: ['coffee-espresso-corner', 'modern-farmhouse-essentials', 'smart-kitchen-tech'],
    contentSections: [
      {
        heading: 'Compare ownership details, not just materials',
        paragraphs: [
          'For a premium appliance, look at capacity, controls, noise, cleaning access, repair options, and the warranty. For cookware or a sink, compare weight, compatibility, installation requirements, and the care routine the manufacturer recommends.',
          'A high-end finish may need different cleaning products or more careful use. Read the product documentation and check that the item suits your existing plumbing, cabinetry, counter, or electrical setup.',
        ],
        bullets: ['Confirm the exact model and dimensions.', 'Check installation and electrical or plumbing requirements.', 'Review warranty exclusions and access to service or replacement parts.'],
      },
      {
        heading: 'Plan large purchases around your real routine',
        paragraphs: [
          'A stand mixer, espresso machine, or blender is most valuable when it will be used often enough to justify its counter space and care. Consider where it will live, who will use it, and how difficult it is to clean after a normal week.',
          'For fixed upgrades such as a sink, coordinate product selection with the installer and countertop measurements before ordering. A beautiful product that does not fit the space can become an expensive delay.',
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'scandinavian-minimalist',
    name: 'Scandinavian Minimalist',
    featured: false,
    badge: 'Nordic-inspired',
    image: '/collections/collection-scandinavian-minimalist.jpeg',
    subtitle: 'Soft neutrals, natural textures, and a calm approach to useful kitchen details.',
    introText: 'A Scandinavian-inspired kitchen balances a light, uncluttered look with hardworking storage and comfortable task lighting. Natural wood, pale colors, and simple forms can help create a calm backdrop; the most successful choices are still the ones that fit your cleaning routine and how you cook.',
    productSlugs: [
      'walnut-end-grain-cutting-board',
      'gooseneck-electric-kettle',
      'brushed-nickel-kitchen-faucet',
      'indoor-hydroponic-herb-garden',
      'industrial-pendant-light',
    ],
    relatedSlugs: ['rustic-wood-accents', 'modern-farmhouse-essentials', 'eco-friendly-kitchen'],
    contentSections: [
      {
        heading: 'Use a restrained, warm material palette',
        paragraphs: [
          'Begin with a few quiet surfaces—warm white, pale wood, or a soft stone tone—and repeat them across the room. A walnut prep board or natural accent can add contrast without making the kitchen feel busy.',
          'Choose a metal finish for the faucet and lighting that works with the other fixed elements. Before ordering, compare physical samples under the daylight and evening lighting in your own kitchen.',
        ],
        bullets: ['Limit the palette to a few repeating materials.', 'Use natural wood as a practical accent as well as decoration.', 'Keep work surfaces open for everyday preparation.'],
      },
      {
        heading: 'Keep simplicity functional',
        paragraphs: [
          'Minimalism works best when everyday tools have a convenient home. Store small appliances and utensils near the tasks they support, and choose only countertop items that you use or genuinely enjoy seeing.',
          'Layer general lighting with brighter task light at the sink and prep surface. A calm room still needs clear visibility for cooking, cleaning, and reading labels.',
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'rustic-wood-accents',
    name: 'Rustic Wood Accents',
    featured: false,
    badge: 'Natural materials',
    image: '/collections/collection-rustic-wood-accents.jpeg',
    subtitle: 'Walnut prep surfaces and solid-wood furniture for a warmer kitchen.',
    introText: 'Wood can bring warmth to a kitchen through a cutting board, movable cart, or other carefully chosen accent. This collection focuses on the wood items actually available in the catalog, paired with a few useful tools. Check care instructions and keep wood away from prolonged moisture and direct heat.',
    productSlugs: [
      'walnut-end-grain-cutting-board',
      'rolling-kitchen-island-cart',
      'indoor-hydroponic-herb-garden',
      'classic-enameled-dutch-oven',
      'industrial-pendant-light',
    ],
    relatedSlugs: ['scandinavian-minimalist', 'modern-farmhouse-essentials', 'eco-friendly-kitchen'],
    contentSections: [
      {
        heading: 'Let wood be a deliberate accent',
        paragraphs: [
          'A large butcher-block surface, a movable solid-wood cart, or one well-made cutting board can provide enough natural grain to warm up a neutral kitchen. Repeating a similar tone elsewhere helps the room feel connected without adding wood to every surface.',
          'Wood species and finish affect color and care. Ask how a surface is sealed, whether it is intended for food preparation, and how it should be cleaned before using it as a worktop or board.',
        ],
        bullets: ['Keep wooden boards dry between uses.', 'Use coasters or trivets to protect wood from heat and standing moisture.', 'Check the cart’s wheel locks and weight capacity for your intended use.'],
      },
      {
        heading: 'Balance rustic texture with easy maintenance',
        paragraphs: [
          'Natural texture pairs well with simple cabinetry, matte metal, and durable surfaces. Avoid combining too many distressed finishes; a few tactile details can make a space feel warm while leaving the room easy to clean.',
          'A rolling cart can add prep or storage space without a permanent remodel, but measure aisle clearance and confirm that it can be secured when in use.',
        ],
      },
    ],
  },
  {
    id: 7,
    slug: 'smart-kitchen-tech',
    name: 'Smart & Precision Kitchen Tools',
    featured: false,
    badge: 'Cooking technology',
    image: '/collections/collection-smart-kitchen-tech.jpeg',
    subtitle: 'Programmable and temperature-focused tools for more controlled everyday cooking.',
    introText: 'Technology is useful when it makes a cooking task easier to repeat, monitor, or control. This selection focuses on programmable timing and temperature-oriented tools rather than assuming every appliance needs an app. Compare controls, cleaning, capacity, power requirements, and what happens if a feature or connection stops working.',
    productSlugs: [
      'programmable-pressure-cooker',
      'precision-sous-vide-cooker',
      'gooseneck-electric-kettle',
      'programmable-drip-coffee-maker',
      'indoor-hydroponic-herb-garden',
    ],
    relatedSlugs: ['coffee-espresso-corner', 'small-kitchen-essentials', 'eco-friendly-kitchen'],
    contentSections: [
      {
        heading: 'Choose technology that solves a real task',
        paragraphs: [
          'Programmable timers can help make repeatable routines easier, while temperature controls are useful for tasks where heat precision matters. Decide which task you want to improve before comparing displays, presets, or connectivity features.',
          'Check how each appliance works without a phone or network connection, whether settings can be adjusted manually, and how easy it is to understand the controls during normal use.',
        ],
        bullets: ['Check capacity and measurement units against your recipes.', 'Review cleaning steps for sensors, lids, and water-contact parts.', 'Compare warranty and replacement-part details for electronics.'],
      },
      {
        heading: 'Plan space, safety, and maintenance',
        paragraphs: [
          'Appliances with heat, pressure, or water need appropriate counter clearance and careful maintenance. Follow the maker’s use and safety instructions, especially for steam release, electrical connections, and parts that must be cleaned between uses.',
          'For a countertop garden, check the actual dimensions, refill routine, light placement, and the cost and availability of compatible supplies before choosing a model.',
        ],
      },
    ],
  },
  {
    id: 8,
    slug: 'coffee-espresso-corner',
    name: 'Home Coffee & Espresso Bar',
    featured: false,
    badge: 'Coffee equipment',
    image: '/collections/collection-coffee-espresso-corner.jpeg',
    subtitle: 'Three complementary ways to brew coffee at home, from drip to espresso.',
    introText: 'A useful home coffee station begins with the brewing method you enjoy and enough room to use and clean it. This collection groups the coffee equipment currently available in the catalog: a drip brewer, a temperature-control kettle, and a semi-automatic espresso machine. Choose the method and workflow that fit your mornings rather than buying every style of brewer.',
    productSlugs: [
      'semi-automatic-espresso-machine',
      'programmable-drip-coffee-maker',
      'gooseneck-electric-kettle',
    ],
    relatedSlugs: ['smart-kitchen-tech', 'small-kitchen-essentials', 'luxury-kitchen-must-haves'],
    contentSections: [
      {
        heading: 'Choose a brewing routine before a machine',
        paragraphs: [
          'A programmable drip machine suits households that want several cups ready with little morning setup. Espresso equipment involves a more hands-on routine and requires space for preparation and cleanup. A gooseneck kettle is designed for controlled pouring and can support manual brewing when paired with a separate brewer.',
          'Consider how many drinks you make, how quickly you need them, and whether you want to measure and prepare each one. These daily habits matter more than the number of settings on a product page.',
        ],
        bullets: ['Measure the station, including room to fill a reservoir and remove parts.', 'Check whether filters, cleaning supplies, or accessories are required.', 'Plan nearby storage for cups, beans, and the tools you actually use.'],
      },
      {
        heading: 'Make a small station comfortable to maintain',
        paragraphs: [
          'Keep the coffee area near a suitable outlet and a convenient water source, while following the manufacturer’s electrical and clearance guidance. Leave space to open lids, lift the carafe, and wipe the counter around the machine.',
          'Regular descaling and cleaning can affect taste and equipment performance. Review the maker’s recommended schedule and routine before deciding which machine best fits your willingness to maintain it.',
        ],
      },
    ],
  },
  {
    id: 9,
    slug: 'eco-friendly-kitchen',
    name: 'Flexible & Multi-Use Kitchen Tools',
    featured: false,
    badge: 'Multi-use picks',
    image: '/collections/collection-eco-friendly-kitchen.jpeg',
    subtitle: 'Adaptable tools for batch preparation, everyday cooking, and fresh herbs.',
    introText: 'The products in this collection are selected for having more than one useful role in a home kitchen; this is not an independently certified sustainability rating. Before buying, compare the functions you will actually use, the product’s expected care routine, and whether it can replace equipment you already own.',
    productSlugs: [
      'programmable-pressure-cooker',
      'precision-sous-vide-cooker',
      'vitamix-professional-blender',
      'classic-enameled-dutch-oven',
      'indoor-hydroponic-herb-garden',
    ],
    relatedSlugs: ['budget-friendly-upgrades', 'small-kitchen-essentials', 'smart-kitchen-tech'],
    contentSections: [
      {
        heading: 'Think in tasks, not feature counts',
        paragraphs: [
          'A multi-function appliance can save storage space when it genuinely replaces tools you use. Make a short list of meals or prep tasks you repeat, then check whether the product handles those jobs at a comfortable capacity.',
          'More settings do not automatically mean more value. A simpler product that is easier to clean, store, and use regularly may be the better match for your kitchen.',
        ],
        bullets: ['Look for the functions you use weekly, not occasionally.', 'Check accessory, cleaning, and replacement-part requirements.', 'Consider storage space and the appliance’s full working footprint.'],
      },
      {
        heading: 'Make reuse and care part of the decision',
        paragraphs: [
          'Products used regularly can be more practical than specialty tools that remain stored away. Follow care instructions for cookware, blades, and electronics so you understand the work required to keep each item in good condition.',
          'If environmental impact is your priority, look for verifiable manufacturer information on materials, repairability, energy use, and packaging for the exact model. This collection itself does not certify those claims.',
        ],
      },
    ],
  },
];

export const getFeaturedCollection = () => collections.find((collection) => collection.featured);
export const getRegularCollections = () => collections.filter((collection) => !collection.featured);
export const getCollectionBySlug = (slug) => collections.find((collection) => collection.slug === slug);
