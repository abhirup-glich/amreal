export type Product = {
  id: number;
  name: string;
  slug: string;
  size: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  hairTypes: string[];
  concerns: string[];
  ingredients: string[];
  benefits: string[];
  suitableFor: string[];
  featured?: boolean;
};

const img = (id: string, w = 1000) => `/assets/${id}`;

// Approved AMREAL product photography supplied by the client.
const ASSETS = {
  hairRitual: "hair-ritual.jpeg",
  coffeeScalpScrub: "coffee-scalp-scrub.jpeg",
  collagenMasque: "collagen-biotin-masque.jpeg",
  antiHairfall: "anti-hairfall-serum.jpeg",
  scalpDetox: "scalp-detox.jpeg"
};

export const products: Product[] = [
  {
    id: 1,
    name: "Shampoo - Kit No 1",
    slug: "shampoo-kit-no-1",
    size: "300 ml",
    category: "Haircare",
    description: "Professional shampoo kit designed for salon-focused haircare routines.",
    image: img(ASSETS.hairRitual),
    gallery: [
      img(ASSETS.hairRitual),
      img(ASSETS.scalpDetox),
      img(ASSETS.collagenMasque)
    ],
    hairTypes: ["Straight", "Coloured"],
    concerns: ["Dryness", "Frizz", "Nourishment"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Professional cleansing routine", "Salon-ready care"],
    suitableFor: ["Salons", "Beauty professionals"],
    featured: true
  },
  {
    id: 2,
    name: "Mask - Kit No 2",
    slug: "mask-kit-no-2-250",
    size: "250 ml",
    category: "Hair Treatments",
    description: "Professional hair mask kit for treatment-focused salon routines.",
    image: img(ASSETS.collagenMasque),
    gallery: [img(ASSETS.collagenMasque), img(ASSETS.collagenMasque)],
    hairTypes: ["Curly", "Damaged"],
    concerns: ["Damage", "Dryness", "Nourishment"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Treatment-focused care", "Improves manageability as approved"],
    suitableFor: ["Salons", "Hair professionals"],
    featured: true
  },
  {
    id: 3,
    name: "Mask - Kit No 2",
    slug: "mask-kit-no-2-500",
    size: "500 ml",
    category: "Hair Treatments",
    description: "Larger professional format for regular salon treatment use.",
    image: img(ASSETS.collagenMasque),
    gallery: [img(ASSETS.collagenMasque), img(ASSETS.collagenMasque)],
    hairTypes: ["Curly", "Damaged"],
    concerns: ["Damage", "Dryness"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Professional format", "Treatment routine"],
    suitableFor: ["Salons", "Spas", "Beauty professionals"]
  },
  {
    id: 4,
    name: "Argan Screm",
    slug: "argan-screm",
    size: "50 ml",
    category: "Professional Essentials",
    description: "Professional argan-focused beauty product presented for salon discovery.",
    image: img(ASSETS.antiHairfall),
    gallery: [img(ASSETS.antiHairfall), img(ASSETS.collagenMasque)],
    hairTypes: ["Straight", "Curly"],
    concerns: ["Frizz", "Nourishment"],
    ingredients: ["Argan Oil — verify final formulation with AMREAL"],
    benefits: ["Nourishing care", "Smooth-looking finish"],
    suitableFor: ["Salons", "Hair professionals"]
  },
  {
    id: 5,
    name: "Permanent SPA Kit No. 3",
    slug: "permanent-spa-kit-no-3",
    size: "1000 ml",
    category: "Hair Treatments",
    description: "Large-format professional spa kit for business and salon use.",
    image: img(ASSETS.hairRitual),
    gallery: [img(ASSETS.hairRitual), img(ASSETS.collagenMasque)],
    hairTypes: ["Straight", "Damaged"],
    concerns: ["Dryness", "Damage", "Nourishment"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Large professional format", "Spa-oriented routine"],
    suitableFor: ["Salons", "Spas"]
  },
  {
    id: 7,
    name: "Slik Protein",
    slug: "slik-protein",
    size: "1000 ml",
    category: "Hair Treatments",
    description: "Professional protein-focused treatment format for salon use.",
    image: img(ASSETS.antiHairfall),
    gallery: [img(ASSETS.antiHairfall), img(ASSETS.hairRitual)],
    hairTypes: ["Straight", "Damaged"],
    concerns: ["Damage", "Smoothing"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Professional treatment format", "Salon-focused application"],
    suitableFor: ["Salons", "Hair professionals"],
    featured: true
  },
  {
    id: 8,
    name: "Slik Protein Sample",
    slug: "slik-protein-sample",
    size: "120 ml",
    category: "Professional Essentials",
    description: "Sample-size professional format for product discovery.",
    image: img(ASSETS.collagenMasque),
    gallery: [img(ASSETS.collagenMasque)],
    hairTypes: ["Straight", "Damaged"],
    concerns: ["Smoothing", "Damage"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Sample format", "Product discovery"],
    suitableFor: ["Beauty professionals", "Salons"]
  },
  {
    id: 9,
    name: "Shampoo Dand Kit No. 1",
    slug: "shampoo-dand-kit-no-1",
    size: "250 ml",
    category: "Scalp Care",
    description: "Professional scalp-care shampoo kit for business enquiries.",
    image: img(ASSETS.scalpDetox),
    gallery: [img(ASSETS.scalpDetox), img(ASSETS.hairRitual)],
    hairTypes: ["Straight", "Curly"],
    concerns: ["Scalp", "Hair Fall"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Scalp-care routine", "Professional use"],
    suitableFor: ["Salons", "Beauty professionals"],
    featured: true
  },
  {
    id: 10,
    name: "Scalp Scrub",
    slug: "scalp-scrub",
    size: "250 ml",
    category: "Scalp Care",
    description: "Professional scalp scrub format for treatment routines.",
    image: img(ASSETS.coffeeScalpScrub),
    gallery: [img(ASSETS.coffeeScalpScrub), img(ASSETS.scalpDetox)],
    hairTypes: ["Straight", "Curly", "Damaged"],
    concerns: ["Scalp", "Nourishment"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Scalp-focused routine", "Professional treatment format"],
    suitableFor: ["Salons", "Spas", "Hair professionals"]
  },
  {
    id: 11,
    name: "Nanoplastia",
    slug: "nanoplastia-1000",
    size: "1000 ml",
    category: "Hair Treatments",
    description: "Large-format professional Nanoplastia product for salon enquiries.",
    image: img(ASSETS.hairRitual),
    gallery: [img(ASSETS.hairRitual), img(ASSETS.hairRitual)],
    hairTypes: ["Straight", "Damaged"],
    concerns: ["Smoothing", "Damage", "Frizz"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Professional format", "Smoothing-oriented routine"],
    suitableFor: ["Salons", "Hair professionals"],
    featured: true
  },
  {
    id: 12,
    name: "Nanoplastia",
    slug: "nanoplastia-300",
    size: "300 ml",
    category: "Hair Treatments",
    description: "Compact professional Nanoplastia format for product discovery.",
    image: img(ASSETS.hairRitual),
    gallery: [img(ASSETS.hairRitual)],
    hairTypes: ["Straight", "Damaged"],
    concerns: ["Smoothing", "Damage", "Frizz"],
    ingredients: ["Formulation information to be supplied by AMREAL"],
    benefits: ["Professional format", "Smoothing-oriented routine"],
    suitableFor: ["Salons", "Hair professionals"]
  }
];

export const categories = [
  { name: "Haircare", description: "Professional everyday care.", image: img(ASSETS.collagenMasque) },
  { name: "Hair Treatments", description: "Salon-focused treatment solutions.", image: img(ASSETS.hairRitual) },
  { name: "Scalp Care", description: "Focused scalp-care routines.", image: img(ASSETS.scalpDetox) },
  { name: "Skincare", description: "Professional beauty essentials.", image: img(ASSETS.collagenMasque) },
  { name: "Professional Essentials", description: "Formats designed for beauty businesses.", image: img(ASSETS.antiHairfall) }
];

export const hairTypes = [
  { name: "COLOURED", text: "Protect colour and maintain softness and shine.", image: img(ASSETS.collagenMasque) },
  { name: "CURLY", text: "Care for texture, moisture and manageability.", image: img(ASSETS.collagenMasque) },
  { name: "STRAIGHT", text: "Smooth, nourish and maintain healthy-looking hair.", image: img(ASSETS.scalpDetox) },
  { name: "DAMAGED", text: "Restore, strengthen and improve manageability.", image: img(ASSETS.hairRitual) }
];

export const concerns = ["Hair Fall", "Frizz", "Dryness", "Damage", "Scalp", "Smoothing", "Nourishment", "Hair Spa"];

export const heroSlides = [
  { eyebrow: "SCIENCE FOR BEAUTIFUL HAIR.", title: "BEAUTY, REFINED.", text: "Professional beauty solutions designed for salons, beauty professionals and modern beauty businesses.", image: img(ASSETS.collagenMasque) },
  { eyebrow: "PROFESSIONAL CARE.", title: "MORE THAN CARE.", text: "A product discovery experience built around professional routines and beautiful results.", image: img(ASSETS.collagenMasque) },
  { eyebrow: "FORMULATED FOR PROFESSIONALS.", title: "THE BEAUTY RITUAL.", text: "Explore salon-focused formats, treatments and professional essentials.", image: img(ASSETS.hairRitual) },
  { eyebrow: "YOUR PROFESSIONAL BEAUTY PARTNER.", title: "BEAUTY IN PRACTICE.", text: "Discover the collection and start a conversation with AMREAL.", image: img(ASSETS.scalpDetox) },
  { eyebrow: "AMREAL PROFESSIONAL.", title: "SCIENCE FOR BEAUTIFUL HAIR.", text: "Premium product discovery for modern beauty businesses.", image: img(ASSETS.antiHairfall) }
];