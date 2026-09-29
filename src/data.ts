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
    tagline: "3–4 MONTHS OF LONGEVITY RETENTION, BLOW-DRIED LOOKS. ONE RITUAL. LONG-LASTING RESULTS.",
    description: "Our Hero salon ritual. Engineered for 3 to 4 months of longevity retention, smoother hair, effortless blow-dried looks, and deep fibre conditioning in just one professional ritual.",
    image: "/assets/permanent-spa-hero-bottle.jpg",
    gallery: [
      "/assets/permanent-spa-hero-bottle.jpg",
      "/assets/permanent-spa-split-before-after.jpg",
      "/assets/permanent-spa-model-before.jpg",
      "/assets/permanent-spa-model-after.jpg",
      "/assets/permanent-spa-lifestyle.jpg",
      "/assets/permanent-spa-salon-ritual.jpg",
      "/assets/hair-fibre-repair-diagram.jpg"
    ],
    hairTypes: [
      "Suitable for All Hair Types",
      "Curly Hair",
      "Wavy Hair",
      "Coarse Hair",
      "Frizzy / Unruly Hair",
      "Dry Hair",
      "Dull / Rough Hair",
      "Colored / Dye-Treated Hair",
      "Henna-Treated Hair",
      "Chemically Treated Hair"
    ],
    concerns: [
      "Frizz & Flyaways",
      "Unmanageable Hair",
      "Dryness & Roughness",
      "Dullness & Lack of Shine",
      "Coarse / Unruly Texture",
      "Weakness & Breakage",
      "Hair Spa Longevity"
    ],
    ingredients: [
      "01 — Collagen Proteins — Fibre Conditioning",
      "02 — Hydrolyzed Keratin — Smoothness & Manageability",
      "03 — Argan Oil — Nourishment & Shine",
      "04 — Pro-Vitamin B5 — Softness & Conditioning"
    ],
    benefits: [
      "3–4 months of longevity retention, blow-dried looks",
      "More than a Hair SPA: 3–5 months of smoother, more manageable hair",
      "Effortless blow-dry: Less frizz, better manageability, faster styling",
      "One single ritual delivers long-lasting results",
      "Personalized according to hair texture, condition & treatment history",
      "Formaldehyde-free, odor-free, smoke-free, toxin-free, sulfate-free, paraben-free"
    ],
    suitableFor: [
      "Suitable for All Hair Types",
      "Personalized according to hair texture, condition & treatment history",
      "Professional Salons & Luxury Spas"
    ],
    featured: true
  },
  {
    id: 2,
    name: "Silk Protein Collagen Therapy",
    slug: "silk-protein-collagen-therapy",
    size: "1000 ml",
    category: "Hair Treatments",
    heroBadge: "PROFESSIONAL THERAPY",
    tagline: "PROFESSIONAL RESULTS CUSTOMIZED ACCORDING TO HAIR TEXTURE, CONDITION & CHEMICAL HISTORY.",
    description: "An advanced professional smoothing and strengthening therapy combining Hydrolyzed Silk Protein, Collagen, Keratin and Amino Acids to restore silkiness, eliminate unruliness and reconstruct damaged hair fibres.",
    image: "/assets/silk-protein-hero-bottle.jpg",
    gallery: [
      "/assets/silk-protein-hero-bottle.jpg",
      "/assets/silk-protein-label-full.jpg",
      "/assets/silk-protein-label.jpg",
      "/assets/silk-protein-therapy.jpg",
      "/assets/permanent-spa-split-before-after.jpg",
      "/assets/hair-fibre-repair-diagram.jpg"
    ],
    hairTypes: [
      "Curly Hair",
      "Wavy Hair",
      "Frizzy / Unruly Hair",
      "Coarse Hair",
      "Dry Hair",
      "Dull / Rough Hair",
      "Colored / Dye-Treated Hair",
      "Henna-Treated Hair"
    ],
    concerns: [
      "Frizz & Flyaways",
      "Unmanageable Hair",
      "Dryness & Roughness",
      "Dullness & Lack of Shine",
      "Coarse / Unruly Texture",
      "Weakness & Breakage"
    ],
    ingredients: [
      "Hydrolyzed Silk Protein — Helps improve softness, smoothness and the silky feel of the hair fibre",
      "Hydrolyzed Collagen — Provides conditioning and fibre-supporting care",
      "Hydrolyzed Keratin — Helps improve the feel, strength and manageability of damaged-looking hair",
      "Amino Acids + Cysteine — Support the hair fibre and contribute to a smoother, more manageable finish",
      "Argan Oil — Nourishes the hair and helps enhance softness and shine"
    ],
    benefits: [
      "Professional results customized according to hair texture, condition & chemical history",
      "Helps improve softness, smoothness and the silky feel of the hair fibre",
      "Provides deep conditioning and fibre-supporting care",
      "Helps improve the feel, strength and manageability of damaged-looking hair",
      "Amino Acids + Cysteine support the hair fibre for a smoother, more manageable finish",
      "Argan Oil nourishes the hair and helps enhance softness and radiant shine"
    ],
    suitableFor: [
      "Curly Hair",
      "Wavy Hair",
      "Frizzy / Unruly Hair",
      "Coarse Hair",
      "Dry Hair",
      "Dull / Rough Hair",
      "Colored / Dye-Treated Hair",
      "Henna-Treated Hair",
      "Salons & Spas"
    ],
    featured: true
  },
  {
    id: 3,
    name: "AMREAL Coffee Scalp Scrub — No.2",
    slug: "amreal-coffee-scalp-scrub-no-2",
    size: "200 ml",
    category: "Scalp Care",
    heroBadge: "PROFESSIONAL SCALP EXFOLIATION",
    tagline: "RESET THE SCALP. REFRESH THE ROOTS.",
    description: "A refined scalp-exfoliating treatment designed to lift surface flakes, excess buildup and impurities, leaving the scalp feeling refreshed, clean and balanced.",
    image: "/assets/coffee-scalp-scrub.jpeg",
    gallery: [
      "/assets/coffee-scalp-scrub.jpeg",
      "/assets/coffee-scrub-detail.jpg",
      "/assets/scalp-health-diagram.jpg"
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
    image: "/assets/permanent-spa-salon-ritual.jpg",
    gallery: [
      "/assets/permanent-spa-salon-ritual.jpg",
      "/assets/permanent-spa-split-before-after.jpg",
      "/assets/permanent-spa-model-after.jpg",
      "/assets/hair-fibre-repair-diagram.jpg"
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
    size: "50 ml",
    category: "Scalp Care",
    heroBadge: "DHT-PATHWAY SUPPORT",
    tagline: "CLINICAL-GRADE FOLLICLE VITALITY & DENSITY",
    description: "A lightweight leave-on scalp tonic engineered with 3% Redensyl, 4% Anagain, Caffeine, Niacinamide, Biotin, B2 Complex and Guava Leaf Extract for targeted scalp care around DHT pathways and thinning-looking hair.",
    image: "/assets/anti-hairfall-serum.jpeg",
    gallery: [
      "/assets/anti-hairfall-serum.jpeg",
      "/assets/anti-hairfall-serum-bottle.jpg",
      "/assets/scalp-health-diagram.jpg"
    ],
    hairTypes: ["Normal Scalp", "Oily Scalp", "Dry Scalp", "Combination Scalp", "Thinning Hair", "Weak Roots"],
    concerns: [
      "Excessive Hair Shedding",
      "Thinning-Looking Hair",
      "Reduced Hair Density",
      "Weak / Fragile-Looking Hair",
      "Loss of Fuller Appearance",
      "Hair That Looks Less Dense Over Time"
    ],
    ingredients: [
      "3% Redensyl — Clinically Proven Scalp Vitality & Hair Density Support",
      "4% Anagain — Organic Pea Sprout Extract Stimulating Growth Phase",
      "B2 Complex — Fortifies Keratin Infrastructure",
      "Caffeine — Scalp Microcirculation Stimulant & DHT Defense",
      "Niacinamide — Scalp Lipid Barrier & Nutrient Delivery",
      "Biotin — Follicle Strengthening Care",
      "Guava Leaf Extract — Rich in Potent Antioxidants, Bioflavonoids & Lycopene"
    ],
    benefits: [
      "Supports Scalp Vitality: Helps maintain a healthy-looking scalp environment",
      "Supports Fuller-Looking Hair: Designed to help maintain the appearance of thicker, fuller, stronger-looking hair",
      "Scalp & DHT-Pathway Support: Formulated for targeted scalp care around DHT-pathway-related concerns",
      "Lightweight Leave-On Care: A lightweight scalp tonic designed for regular use without a heavy, oily feel",
      "Daily Scalp Support: Suitable as part of a consistent scalp-care routine"
    ],
    suitableFor: [
      "Normal Scalp",
      "Oily Scalp",
      "Dry Scalp",
      "Combination Scalp",
      "Ideal for people experiencing Hair Shedding, Thinning-Looking Hair, Reduced Density & Weak-Looking Hair"
    ],
    featured: true
  },
  {
    id: 6,
    name: "AMREAL Collagen Plex Biotin Masque — No.4",
    slug: "collagen-plex-biotin-masque-500",
    size: "Big 500 ml",
    category: "Hair Treatments",
    heroBadge: "FIBRE RECOVERY",
    tagline: "INTENSIVE BOND RECOVERY & NOURISHMENT",
    description: "Big 500 ml professional format. Restorative intensive masque engineered to replenish dry, chemically stressed and damaged hair, rebuilding fibre elasticity and softness.",
    image: "/assets/collagen-biotin-masque.jpeg",
    gallery: [
      "/assets/collagen-biotin-masque.jpeg",
      "/assets/collagen-masque-alt.jpg",
      "/assets/collagen-masque-500ml.jpg",
      "/assets/hair-fibre-repair-diagram.jpg"
    ],
    hairTypes: [
      "Dry Hair",
      "Weak Hair",
      "Damaged Hair",
      "Chemically Treated Hair",
      "Colored Hair",
      "Frizzy Hair",
      "Rough Hair"
    ],
    concerns: [
      "Dryness",
      "Weakness",
      "Hair Breakage",
      "Chemically Stressed Hair",
      "Roughness",
      "Loss of Softness",
      "Loss of Shine",
      "Damaged-Looking Hair",
      "Unmanageable Hair"
    ],
    ingredients: [
      "Collagen Plex — Intensive Fibre Rebuilding & Elasticity Support",
      "Biotin — Strengthens Hair Shaft & Fights Breakage",
      "Pro-Vitamin B5 — Deep Moisture Retention & Softness",
      "Argan Oil — Nourishment & Radiant Mirror Shine"
    ],
    benefits: [
      "Replenishes dry and weakened hair",
      "Strengthens the hair fibre against breakage",
      "Smoothens rough, stressed hair",
      "Helps improve softness & manageability",
      "Helps enhance shine",
      "Provides conditioning and nourishment",
      "Helps support hair after chemical treatments",
      "Helps improve the feel of damaged-looking hair"
    ],
    suitableFor: [
      "Dry, Weak, Damaged Hair",
      "Chemically Treated & Colored Hair",
      "Frizzy & Rough Hair",
      "Especially suitable for hair requiring intensive conditioning, replenishment and fibre care",
      "Salons & Spas"
    ],
    featured: true
  },
  {
    id: 7,
    name: "AMREAL Collagen Plex Biotin Masque — No.4",
    slug: "collagen-plex-biotin-masque-250",
    size: "Small 250 ml",
    category: "Hair Treatments",
    description: "Small 250 ml compact format for targeted salon routines and home maintenance prescription.",
    image: "/assets/collagen-masque-alt.jpg",
    gallery: [
      "/assets/collagen-masque-alt.jpg",
      "/assets/collagen-biotin-masque.jpeg",
      "/assets/collagen-masque-250ml.jpg"
    ],
    hairTypes: [
      "Dry Hair",
      "Weak Hair",
      "Damaged Hair",
      "Chemically Treated Hair",
      "Colored Hair",
      "Frizzy Hair",
      "Rough Hair"
    ],
    concerns: [
      "Dryness",
      "Weakness",
      "Hair Breakage",
      "Chemically Stressed Hair",
      "Roughness",
      "Loss of Softness",
      "Loss of Shine",
      "Damaged-Looking Hair",
      "Unmanageable Hair"
    ],
    ingredients: [
      "Collagen Plex — Intensive Fibre Rebuilding & Elasticity Support",
      "Biotin — Strengthens Hair Shaft & Fights Breakage",
      "Pro-Vitamin B5 — Deep Moisture Retention & Softness",
      "Argan Oil — Nourishment & Radiant Mirror Shine"
    ],
    benefits: [
      "Replenishes dry and weakened hair",
      "Strengthens the hair fibre against breakage",
      "Smoothens rough, stressed hair",
      "Helps improve softness & manageability",
      "Helps enhance shine",
      "Provides conditioning and nourishment",
      "Helps support hair after chemical treatments",
      "Helps improve the feel of damaged-looking hair"
    ],
    suitableFor: [
      "Dry, Weak, Damaged Hair",
      "Chemically Treated & Colored Hair",
      "Frizzy & Rough Hair",
      "Especially suitable for hair requiring intensive conditioning, replenishment and fibre care"
    ],
    featured: false
  },
  {
    id: 8,
    name: "AMREAL Nanoplastia Treatment",
    slug: "amreal-nanoplastia-300",
    size: "300 ml",
    category: "Hair Treatments",
    description: "Compact 300 ml professional nanoplastia format for trial and bespoke salon applications.",
    image: "/assets/permanent-spa-salon-ritual.jpg",
    gallery: [
      "/assets/permanent-spa-salon-ritual.jpg",
      "/assets/permanent-spa-split-before-after.jpg",
      "/assets/hair-fibre-repair-diagram.jpg"
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
      "/assets/silk-protein-hero-bottle.jpg",
      "/assets/silk-protein-label-full.jpg"
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
    name: "AMREAL Scalp Detox Anti-Dandruff Shampoo — No.1.1",
    slug: "amreal-scalp-detox-shampoo-1000",
    size: "1000 ml",
    category: "Haircare",
    description: "Professional salon-focused cleansing shampoo designed to prep the hair cuticle for intensive treatments and provide balanced everyday care.",
    image: "/assets/scalp-detox.jpeg",
    gallery: [
      "/assets/scalp-detox.jpeg",
      "/assets/amreal-purifying-shampoo.jpg",
      "/assets/coffee-scalp-scrub.jpeg",
      "/assets/scalp-health-diagram.jpg"
    ],
    hairTypes: ["Straight", "Coloured", "Normal", "Chemically Treated", "Flaky Scalp"],
    concerns: ["Scalp", "Visible Flakes", "Scalp Buildup", "Dandruff"],
    ingredients: [
      "Salicylic Acid — Dissolves Flakes & Cleanses Cuticles",
      "Tea Tree Oil — Purifying & Refreshing Scalp Care",
      "Neem Extract — Traditional Soothing Botanical",
      "Climbazole & Olamine — Flake Defense Complex",
      "Pro-Vitamin B5 — Soothing Moisture Support"
    ],
    benefits: ["Professional anti-dandruff routine", "Salon-ready prep care", "Gentle on chemically treated hair"],
    suitableFor: ["Salons", "Beauty Professionals", "Dandruff-Prone Scalps"],
    featured: false
  }
];

export const categories = [
  { name: "Hair Treatments", description: "Salon-focused permanent spa & fibre realignment therapies.", image: "/assets/permanent-spa-hero-bottle.jpg" },
  { name: "Scalp Care", description: "Refined scrubs & targeted DHT-pathway tonics.", image: "/assets/coffee-scalp-scrub.jpeg" },
  { name: "Haircare", description: "Professional prep cleansers and daily salon routines.", image: "/assets/scalp-detox.jpeg" },
  { name: "Professional Essentials", description: "Intensive masques & high-gloss finishing elixirs.", image: "/assets/collagen-biotin-masque.jpeg" }
];

export const hairTypes = [
  { name: "COLOURED", text: "Protect colour vibrancy, prevent fade and maintain silkiness.", image: "/assets/hair-type-coloured.jpg" },
  { name: "CURLY & WAVY", text: "Tame unruliness, boost elasticity and define smooth texture.", image: "/assets/hair-type-curly-wavy.jpg" },
  { name: "COARSE & FRIZZY", text: "Deep fibre realignment for 3–5 months of smooth manageability.", image: "/assets/hair-type-coarse-frizzy.jpg" },
  { name: "DAMAGED & WEAK", text: "Bond rebuilding with Collagen Plex and Biotin infrastructure.", image: "/assets/hair-type-damaged-weak.jpg" }
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
    eyebrow: "AMREAL PROFESSIONAL",
    title: "BEAUTIFUL HAIR. HAPPIER YOU.",
    text: "Discover our science-led salon formulations engineered for every hair texture — straight, wavy, curly, coarse and chemically treated.",
    image: "/assets/amreal-catalog-girls-cover.png",
    badge: "Official Catalog Lookbook",
    link: "/products",
    category: "Lookbook",
    highlights: ["4 Hair Textures", "Science-Backed", "Salon Grade"]
  },
  {
    eyebrow: "OUR HERO SALON RITUAL",
    title: "PERMANENT HAIR SPA.",
    text: "More than a SPA, up to 4 months of more manageable hair. One ritual. Long-lasting results.",
    image: "/assets/permanent-spa-hero-bottle.jpg",
    badge: "Hero Product • Flagship Ritual",
    link: "/products/permanent-hair-spa",
    category: "Hero Ritual",
    highlights: ["Up to 4 Months", "Effortless Blow-Dry", "Formaldehyde-Free"]
  },
  {
    eyebrow: "ADVANCED FIBRE SMOOTHING",
    title: "SILK PROTEIN COLLAGEN THERAPY.",
    text: "Professional results customized according to hair texture, condition & chemical history for intense softness and mirror gloss.",
    image: "/assets/silk-protein-hero-bottle.jpg",
    badge: "Silk & Collagen Therapy",
    link: "/products/silk-protein-collagen-therapy",
    category: "Smoothing System",
    highlights: ["Hydrolyzed Silk", "Cysteine Rebuilding", "Frizz & Flyaway Defense"]
  },
  {
    eyebrow: "MOLECULAR REALIGNMENT",
    title: "AMREAL NANOPLASTIA TREATMENT.",
    text: "Intense cuticle realignment and long-lasting frizz elimination with Coconut Oil, Argan Oil, Cysteine and Glycolic Acid.",
    image: "/assets/permanent-spa-salon-ritual.jpg",
    badge: "Realignment System",
    link: "/products/amreal-nanoplastia-1000",
    category: "Realignment",
    highlights: ["Mirror Polish", "Lipid Replenishment", "Zero Formaldehyde"]
  },
  {
    eyebrow: "SALON PREPARATION & PURITY",
    title: "AMREAL SCALP DETOX SHAMPOO — Nº1.1.",
    text: "Engineered deep cleansing that opens the cuticle, clears stubborn product buildup and optimizes fibres for treatment infusion.",
    image: "/assets/scalp-detox.jpeg",
    badge: "Nº1.1 Professional Shampoo • 1000 ml",
    link: "/products",
    category: "Purifying",
    highlights: ["Residue Removal", "Scalp Balanced", "Deep Cleansing"]
  }
];