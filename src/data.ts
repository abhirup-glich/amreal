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
  heroBadge?: string;
  tagline?: string;
};

// Approved AMREAL product photography supplied by the client.
export const products: Product[] = [
  {
    id: 1,
    name: "Permanent Hair Spa",
    slug: "permanent-hair-spa",
    size: "1000 ml",
    category: "Hair Treatments",
    heroBadge: "HERO PRODUCT • OUR FLAGSHIP RITUAL",
    tagline: "3–5 MONTHS OF SMOOTHER, MORE MANAGEABLE HAIR. ONE RITUAL. LONG-LASTING RESULTS.",
    description: "Our Hero salon ritual. Engineered for 3 to 5 months of smoother, significantly more manageable and revitalized hair in just one professional ritual.",
    image: "/assets/hair-ritual.jpeg",
    gallery: [
      "/assets/hair-ritual.jpeg",
      "/assets/permanent-spa-before-after.jpg",
      "/assets/permanent-spa-result.jpg",
      "/assets/permanent-spa-texture.jpg",
      "/assets/permanent-spa-lifestyle.jpg"
    ],
    hairTypes: ["All Hair Types", "Curly", "Wavy", "Coarse", "Frizzy", "Coloured", "Chemically Treated"],
    concerns: ["Frizz", "Smoothing", "Dryness", "Damage", "Unmanageable Hair", "Hair Spa"],
    ingredients: [
      "Collagen Proteins — Fibre Conditioning",
      "Hydrolyzed Keratin — Smoothness & Manageability",
      "Argan Oil — Nourishment & Shine",
      "Pro-Vitamin B5 — Softness & Conditioning"
    ],
    benefits: [
      "Provides 3–5 months of smoother, more manageable hair",
      "One single ritual delivers long-lasting professional transformation",
      "Deep fibre conditioning and structural cuticle realignment",
      "Personalized according to hair texture, condition & treatment history",
      "Tames stubborn frizz, coarse texture and humidity reactivity"
    ],
    suitableFor: ["All Hair Types", "Personalized to texture & condition", "Salons", "Luxury Spas"],
    featured: true
  },
  {
    id: 2,
    name: "Silk Protein Collagen Therapy",
    slug: "silk-protein-collagen-therapy",
    size: "1000 ml",
    category: "Hair Treatments",
    heroBadge: "PROFESSIONAL THERAPY",
    tagline: "ADVANCED SILK & COLLAGEN SMOOTHING SYSTEM",
    description: "An advanced professional smoothing and strengthening therapy combining Hydrolyzed Silk Protein, Collagen and Keratin to restore silkiness, eliminate unruliness and reconstruct damaged hair fibres.",
    image: "/assets/silk-protein-therapy.jpg",
    gallery: [
      "/assets/silk-protein-therapy.jpg",
      "/assets/permanent-spa-before-after.jpg",
      "/assets/silk-protein-label.jpg",
      "/assets/permanent-spa-texture.jpg",
      "/assets/nanoplastia-treatment.jpg"
    ],
    hairTypes: ["Curly Hair", "Wavy Hair", "Frizzy / Unruly Hair", "Coarse Hair", "Dry Hair", "Dull / Rough Hair", "Colored / Dye-Treated Hair", "Henna-Treated Hair"],
    concerns: ["Frizz & Flyaways", "Unmanageable Hair", "Dryness & Roughness", "Dullness & Lack of Shine", "Coarse / Unruly Texture", "Weakness & Breakage"],
    ingredients: [
      "Hydrolyzed Silk Protein — Silky feel, softness and smoothness of hair fibre",
      "Hydrolyzed Collagen — Conditioning and fibre-supporting care",
      "Hydrolyzed Keratin — Improves feel, strength and manageability",
      "Cysteine & Amino Acids — Reconstructs hair fibre for a smoother finish",
      "Argan Oil — Nourishes deeply and enhances radiant shine"
    ],
    benefits: [
      "Professional results customized according to hair texture, condition & chemical history",
      "Helps improve softness, smoothness and the silky feel of the hair fibre",
      "Provides deep conditioning and fibre-supporting care",
      "Helps improve the feel, strength and manageability of damaged-looking hair",
      "Drastically eliminates unruliness, rough texture and weakness"
    ],
    suitableFor: ["Curly & Wavy Hair", "Frizzy & Coarse Hair", "Color & Henna-Treated Hair", "Salons & Spas"],
    featured: true
  },
  {
    id: 3,
    name: "AMREAL Coffee Scalp Scrub — No.2",
    slug: "amreal-coffee-scalp-scrub-no-2",
    size: "250 ml",
    category: "Scalp Care",
    heroBadge: "PROFESSIONAL SCALP EXFOLIATION",
    tagline: "RESET THE SCALP. REFRESH THE ROOTS.",
    description: "A refined scalp-exfoliating treatment designed to lift surface flakes, excess buildup and impurities, leaving the scalp feeling refreshed, clean and balanced.",
    image: "/assets/coffee-scalp-scrub.jpeg",
    gallery: [
      "/assets/coffee-scalp-scrub.jpeg",
      "/assets/coffee-scrub-detail.jpg",
      "/assets/scalp-detox.jpeg",
      "/assets/coffee-scalp-scrub.jpeg",
      "/assets/anti-hairfall-serum.jpeg"
    ],
    hairTypes: ["All Hair Types", "Oily Scalp", "Flaky Scalp", "Congested Scalp", "Normal Scalp"],
    concerns: ["Visible Flakes", "Scalp Buildup", "Product Residue", "Oily/Heavy Scalp Feel", "Dull, Congested Scalp", "Uneven Scalp Cleansing", "Scalp Requiring Exfoliation"],
    ingredients: [
      "Coffee Extract — Scalp Revitalisation & Antioxidant Care",
      "Salicylic Acid — Helps Loosen Flakes & Surface Buildup",
      "Lactic Acid — Gentle Exfoliation & Smoother Scalp Feel",
      "Pro-Vitamin B5 (D-Panthenol) — Conditioning & Moisture Support",
      "Vitamin E — Antioxidant & Nourishing Care"
    ],
    benefits: [
      "Helps remove visible scalp flakes and persistent buildup",
      "Gently exfoliates the scalp surface without stripping natural oils",
      "Helps lift excess residue, impurities and sebum",
      "Leaves the scalp feeling supremely fresh, balanced and thoroughly cleansed",
      "Prepares roots and follicles for optimal treatment absorption"
    ],
    suitableFor: ["Buildup-Prone", "Flaky", "Oily", "Congested", "Dull", "Normal Scalp"],
    featured: true
  },
  {
    id: 4,
    name: "AMREAL Nanoplastia Treatment",
    slug: "amreal-nanoplastia-1000",
    size: "1000 ml",
    category: "Hair Treatments",
    heroBadge: "REALIGNMENT SYSTEM",
    tagline: "INTENSE FIBRE REALIGNMENT & MIRROR POLISH",
    description: "A high-performance professional nanoplastia smoothing treatment formulated with Coconut Oil, Argan Oil, Cysteine and Glycolic Acid to deliver lasting sleekness, frizz control and mirror gloss.",
    image: "/assets/nanoplastia-treatment.jpg",
    gallery: [
      "/assets/nanoplastia-treatment.jpg",
      "/assets/permanent-spa-before-after.jpg",
      "/assets/permanent-spa-result.jpg",
      "/assets/permanent-spa-texture.jpg",
      "/assets/silk-protein-therapy.jpg"
    ],
    hairTypes: ["Frizzy", "Coarse", "Dry", "Rough", "Unmanageable", "Dull Hair"],
    concerns: ["Frizz & Flyaways", "Coarse, Unmanageable Hair", "Dryness & Roughness", "Difficult-to-Manage Hair", "Uneven Hair Texture"],
    ingredients: [
      "Coconut Oil — Deep Nourishment, Lipid Replenishment & Radiant Shine",
      "Argan Oil — Softness, Conditioning & High Gloss",
      "Cysteine & Amino Acids — Hair Fibre Care & Long-Lasting Smoothness",
      "Glycolic Acid — Helps Support Smoother, More Manageable Hair",
      "Hydrolyzed Proteins — Fibre Conditioning & Strength Support",
      "Pro-Vitamin B5 — Moisture & Conditioning Support"
    ],
    benefits: [
      "Helps create a smoother, more polished hair surface",
      "Helps reduce the appearance of frizz and flyaways",
      "Creates a sleek, more controlled finish with natural bounce",
      "Helps maintain smoother-looking hair for an extended period"
    ],
    suitableFor: ["Frizzy", "Coarse", "Dry", "Rough", "Unmanageable", "Dull Hair", "Salons"],
    featured: true
  },
  {
    id: 5,
    name: "AMREAL Anti-Hairfall Scalp Tonic",
    slug: "anti-hairfall-scalp-tonic",
    size: "100 ml",
    category: "Scalp Care",
    heroBadge: "DHT-PATHWAY SUPPORT",
    tagline: "CLINICAL-GRADE FOLLICLE VITALITY & DENSITY",
    description: "A lightweight leave-on scalp tonic engineered with 3% Redensyl, 4% Anagain, Caffeine, Niacinamide, Biotin, B2 Complex and Guava Leaf Extract for targeted scalp care around DHT pathways and thinning-looking hair.",
    image: "/assets/anti-hairfall-serum.jpeg",
    gallery: [
      "/assets/anti-hairfall-serum.jpeg",
      "/assets/anti-hairfall-tonic-lifestyle.jpg",
      "/assets/scalp-detox.jpeg",
      "/assets/coffee-scalp-scrub.jpeg",
      "/assets/coffee-scrub-detail.jpg"
    ],
    hairTypes: ["Straight", "Wavy", "Curly", "Normal Scalp", "Oily Scalp", "Dry Scalp", "Thinning Hair"],
    concerns: ["Excessive Hair Shedding", "Thinning-Looking Hair", "Reduced Hair Density", "Weak / Fragile-Looking Hair", "Loss of Fuller Appearance", "Hair That Looks Less Dense Over Time"],
    ingredients: [
      "3% Redensyl — Clinically Proven Scalp Vitality & Hair Density Support",
      "4% Anagain — Organic Pea Sprout Extract Stimulating Growth Phase",
      "Caffeine — Scalp Microcirculation Stimulant & DHT Defense",
      "Niacinamide — Scalp Lipid Barrier & Nutrient Delivery",
      "Biotin & B2 Complex — Fortifies Keratin Infrastructure",
      "Guava Leaf Extract — Rich in Potent Antioxidants, Bioflavonoids & Lycopene"
    ],
    benefits: [
      "Supports Scalp Vitality: Helps maintain a healthy-looking scalp environment",
      "Supports Fuller-Looking Hair: Designed to help maintain the appearance of thicker, fuller hair",
      "Scalp & DHT-Pathway Support: Targeted care for shedding and thinning concerns",
      "Lightweight Leave-On Care: Zero heavy or greasy residue, comfortable for daily use",
      "Daily Scalp Support: Suitable as part of a consistent hair wellness routine"
    ],
    suitableFor: ["Normal", "Oily", "Dry", "Combination Scalp", "People experiencing Hair Shedding & Thinning"],
    featured: true
  },
  {
    id: 6,
    name: "AMREAL Collagen Plex Biotin Masque — No.4",
    slug: "collagen-plex-biotin-masque-500",
    size: "500 ml",
    category: "Hair Treatments",
    heroBadge: "FIBRE RECOVERY",
    tagline: "INTENSIVE BOND RECOVERY & NOURISHMENT",
    description: "Big 500 ml professional format. Restorative intensive masque engineered to replenish dry, chemically stressed and damaged hair, rebuilding fibre elasticity and softness.",
    image: "/assets/collagen-biotin-masque.jpeg",
    gallery: [
      "/assets/collagen-biotin-masque.jpeg",
      "/assets/permanent-spa-before-after.jpg",
      "/assets/collagen-masque-alt.jpg",
      "/assets/permanent-spa-result.jpg",
      "/assets/hair-ritual.jpeg"
    ],
    hairTypes: ["Dry", "Damaged", "Weak", "Coloured", "Chemically Treated", "Frizzy", "Rough"],
    concerns: ["Dryness", "Weakness", "Hair Breakage", "Chemically Stressed Hair", "Roughness", "Loss of Softness", "Loss of Shine", "Damaged-Looking Hair", "Unmanageable Hair"],
    ingredients: [
      "Collagen Plex — Fibre Conditioning & Elasticity Support",
      "Biotin — Strengthens Hair Shaft & Fights Breakage",
      "Pro-Vitamin B5 — Deep Moisture Retention & Softness",
      "Argan Oil — Nourishment & Mirror Shine"
    ],
    benefits: [
      "Replenishes dry and weakened hair fibres",
      "Strengthens the hair fibre against breakage",
      "Smoothens rough, stressed hair cuticles",
      "Helps improve softness & manageability",
      "Helps enhance shine and deep conditioning",
      "Helps support hair after chemical treatments",
      "Helps improve the feel of damaged-looking hair"
    ],
    suitableFor: ["Dry", "Weak", "Damaged", "Chemically Treated", "Colored", "Frizzy", "Rough Hair", "Salons & Spas"],
    featured: true
  },
  {
    id: 7,
    name: "AMREAL Collagen Plex Biotin Masque — No.4",
    slug: "collagen-plex-biotin-masque-250",
    size: "250 ml",
    category: "Hair Treatments",
    description: "250 ml compact format for targeted salon routines and home maintenance prescription.",
    image: "/assets/collagen-biotin-masque.jpeg",
    gallery: [
      "/assets/collagen-biotin-masque.jpeg",
      "/assets/permanent-spa-before-after.jpg",
      "/assets/collagen-masque-alt.jpg",
      "/assets/permanent-spa-result.jpg",
      "/assets/hair-ritual.jpeg"
    ],
    hairTypes: ["Dry", "Damaged", "Weak", "Coloured", "Chemically Treated"],
    concerns: ["Damage", "Dryness", "Weakness", "Loss of Softness"],
    ingredients: [
      "Collagen Plex — Fibre Rebuilding",
      "Biotin — Strength Support",
      "Pro-Vitamin B5 — Deep Hydration",
      "Argan Oil — Nourishment & Gloss"
    ],
    benefits: [
      "Replenishes dry and weakened hair",
      "Smoothens rough cuticles and restores softness",
      "Strengthens against daily styling stress"
    ],
    suitableFor: ["Dry", "Damaged", "Chemically Treated Hair", "Salons"],
    featured: false
  },
  {
    id: 8,
    name: "AMREAL Nanoplastia Treatment",
    slug: "amreal-nanoplastia-300",
    size: "300 ml",
    category: "Hair Treatments",
    description: "Compact 300 ml professional nanoplastia format for trial and bespoke salon applications.",
    image: "/assets/nanoplastia-treatment.jpg",
    gallery: [
      "/assets/nanoplastia-treatment.jpg",
      "/assets/permanent-spa-before-after.jpg",
      "/assets/permanent-spa-result.jpg",
      "/assets/permanent-spa-texture.jpg",
      "/assets/silk-protein-therapy.jpg"
    ],
    hairTypes: ["Frizzy", "Coarse", "Dry", "Rough", "Unmanageable"],
    concerns: ["Frizz", "Smoothing", "Damage"],
    ingredients: [
      "Coconut Oil — Nourishment & Radiant Shine",
      "Argan Oil — Softness & Gloss",
      "Cysteine & Amino Acids — Fibre Alignment",
      "Glycolic Acid — Smoothing Support"
    ],
    benefits: [
      "Same full-strength Nanoplastia formulation in a 300 ml format",
      "Sleek, controlled finish and extended frizz elimination"
    ],
    suitableFor: ["Salons", "Hair Professionals"],
    featured: false
  },
  {
    id: 9,
    name: "Silk Protein Collagen Therapy (Sample)",
    slug: "silk-protein-sample",
    size: "120 ml",
    category: "Professional Essentials",
    description: "Salon discovery format of our flagship Silk Protein Collagen Therapy for testing texture, fragrance and finish.",
    image: "/assets/silk-protein-therapy.jpg",
    gallery: [
      "/assets/silk-protein-therapy.jpg",
      "/assets/permanent-spa-before-after.jpg",
      "/assets/silk-protein-label.jpg",
      "/assets/permanent-spa-texture.jpg",
      "/assets/hair-ritual.jpeg"
    ],
    hairTypes: ["Curly", "Wavy", "Frizzy", "Coarse", "Dry", "Coloured"],
    concerns: ["Frizz", "Smoothing", "Damage"],
    ingredients: [
      "Hydrolyzed Silk Protein — Silky feel and smoothness",
      "Hydrolyzed Collagen — Fibre conditioning care",
      "Argan Oil — Nourishment and shine"
    ],
    benefits: ["Discovery format for salon trials", "Complete Silk Protein formulation"],
    suitableFor: ["Beauty Professionals", "Salons"],
    featured: false
  },
  {
    id: 10,
    name: "AMREAL Shampoo — Kit No 1",
    slug: "shampoo-kit-no-1",
    size: "300 ml",
    category: "Haircare",
    description: "Professional salon-focused cleansing shampoo designed to prep the hair cuticle for intensive treatments and provide balanced everyday care.",
    image: "/assets/hair-ritual.jpeg",
    gallery: [
      "/assets/hair-ritual.jpeg",
      "/assets/permanent-spa-result.jpg",
      "/assets/scalp-detox.jpeg",
      "/assets/collagen-biotin-masque.jpeg",
      "/assets/coffee-scalp-scrub.jpeg"
    ],
    hairTypes: ["Straight", "Coloured", "Normal", "Chemically Treated"],
    concerns: ["Dryness", "Frizz", "Nourishment"],
    ingredients: [
      "Pro-Vitamin B5 — Conditioning & Moisture Protection",
      "Hydrolyzed Keratin — Smoothness & Cuticle Shield",
      "Argan Oil — Softness & Shine"
    ],
    benefits: ["Professional cleansing routine", "Salon-ready prep care", "Gentle on treated hair"],
    suitableFor: ["Salons", "Beauty Professionals"],
    featured: false
  },
  {
    id: 11,
    name: "AMREAL Shampoo Dand Kit No. 1",
    slug: "shampoo-dand-kit-no-1",
    size: "250 ml",
    category: "Scalp Care",
    description: "Clarifying anti-dandruff and scalp-balancing cleanser targeting visible flakes and excess oiliness.",
    image: "/assets/scalp-detox.jpeg",
    gallery: [
      "/assets/scalp-detox.jpeg",
      "/assets/coffee-scrub-detail.jpg",
      "/assets/coffee-scalp-scrub.jpeg",
      "/assets/scalp-detox.jpeg",
      "/assets/anti-hairfall-serum.jpeg"
    ],
    hairTypes: ["Straight", "Curly", "Flaky Scalp", "Oily Scalp"],
    concerns: ["Scalp", "Visible Flakes", "Scalp Buildup", "Hair Fall"],
    ingredients: [
      "Salicylic Acid — Flake Dissolution & Buildup Clarifying",
      "Coffee Extract — Scalp Revitalisation",
      "Pro-Vitamin B5 — Soothing Moisture Support"
    ],
    benefits: ["Clarifying anti-dandruff care", "Soothes irritated scalp", "Restores root freshness"],
    suitableFor: ["Salons", "Flaky & Oily Scalps"],
    featured: false
  },
  {
    id: 12,
    name: "AMREAL Argan Serum",
    slug: "argan-serum",
    size: "50 ml",
    category: "Professional Essentials",
    description: "Pure Moroccan Argan oil-enriched finishing elixir for instant high-gloss polish, frizz defense and silky protection.",
    image: "/assets/anti-hairfall-serum.jpeg",
    gallery: [
      "/assets/anti-hairfall-serum.jpeg",
      "/assets/permanent-spa-result.jpg",
      "/assets/silk-protein-therapy.jpg",
      "/assets/permanent-spa-texture.jpg",
      "/assets/hair-ritual.jpeg"
    ],
    hairTypes: ["Straight", "Curly", "Wavy", "Coarse"],
    concerns: ["Frizz", "Dullness", "Nourishment", "Smoothing"],
    ingredients: [
      "Moroccan Argan Oil — Liquid Gold Nourishment & Mirror Shine",
      "Vitamin E — Antioxidant & Thermal Protection",
      "Camellia Seed Oil — Weightless Gloss & Softness"
    ],
    benefits: ["Instant mirror-like gloss", "Weightless frizz control", "Seals cuticles and protects against humidity"],
    suitableFor: ["Salons", "Hair Professionals", "Daily Finishing"],
    featured: false
  }
];

export const categories = [
  { name: "Hair Treatments", description: "Salon-focused permanent spa & fibre realignment therapies.", image: "/assets/hair-ritual.jpeg" },
  { name: "Scalp Care", description: "Refined scrubs & targeted DHT-pathway tonics.", image: "/assets/coffee-scalp-scrub.jpeg" },
  { name: "Haircare", description: "Professional prep cleansers and daily salon routines.", image: "/assets/collagen-biotin-masque.jpeg" },
  { name: "Professional Essentials", description: "Discovery sample formats & high-gloss finishing elixirs.", image: "/assets/anti-hairfall-serum.jpeg" }
];

export const hairTypes = [
  { name: "COLOURED", text: "Protect colour vibrancy, prevent fade and maintain silkiness.", image: "/assets/collagen-biotin-masque.jpeg" },
  { name: "CURLY & WAVY", text: "Tame unruliness, boost elasticity and define smooth texture.", image: "/assets/silk-protein-therapy.jpg" },
  { name: "COARSE & FRIZZY", text: "Deep fibre realignment for 3–5 months of smooth manageability.", image: "/assets/nanoplastia-treatment.jpg" },
  { name: "DAMAGED & WEAK", text: "Bond rebuilding with Collagen Plex and Biotin infrastructure.", image: "/assets/hair-ritual.jpeg" }
];

export const concerns = [
  "Hair Spa",
  "Frizz",
  "Smoothing",
  "Scalp",
  "Hair Fall",
  "Visible Flakes",
  "Dryness",
  "Damage",
  "Weakness"
];

export const heroSlides = [
  {
    eyebrow: "OUR HERO SALON RITUAL",
    title: "MORE THAN A HAIR SPA.",
    text: "3–5 months of smoother, more manageable hair in one single ritual. Formulated with Collagen Proteins, Hydrolyzed Keratin and Argan Oil.",
    image: "/assets/hair-ritual.jpeg"
  },
  {
    eyebrow: "ADVANCED FIBRE SMOOTHING",
    title: "SILK PROTEIN THERAPY.",
    text: "Customized according to texture, condition and chemical history for breathtaking softness and mirror-like shine.",
    image: "/assets/silk-protein-therapy.jpg"
  },
  {
    eyebrow: "SCALP EXFOLIATION SYSTEM",
    title: "RESET THE SCALP.",
    text: "AMREAL Coffee Scalp Scrub No.2 with Salicylic Acid and Lactic Acid. Lifts stubborn flakes and revives roots.",
    image: "/assets/coffee-scalp-scrub.jpeg"
  },
  {
    eyebrow: "TARGETED FOLLICLE VITALITY",
    title: "ANTI-HAIRFALL TONIC.",
    text: "Lightweight leave-on care powered by 3% Redensyl, 4% Anagain, Caffeine and Guava Leaf Extract for DHT-pathway support.",
    image: "/assets/anti-hairfall-serum.jpeg"
  },
  {
    eyebrow: "INTENSIVE FIBRE RESTORATION",
    title: "COLLAGEN PLEX BIOTIN.",
    text: "Available in 500 ml & 250 ml. Replenishes dry, chemically stressed hair for ultimate strength and touchable softness.",
    image: "/assets/collagen-biotin-masque.jpeg"
  }
];