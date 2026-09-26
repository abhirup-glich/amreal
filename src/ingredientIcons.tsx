import React from "react";

export type IngredientKey =
  | "coconut-oil"
  | "coffee-extract"
  | "argan-oil"
  | "silk-protein"
  | "collagen"
  | "keratin"
  | "cysteine"
  | "salicylic-acid"
  | "lactic-acid"
  | "glycolic-acid"
  | "pro-vitamin-b5"
  | "vitamin-e"
  | "redensyl"
  | "anagain"
  | "biotin"
  | "guava-leaf"
  | "niacinamide"
  | "caffeine";

export interface IngredientMeta {
  key: IngredientKey;
  name: string;
  shortName: string;
  role: string;
  benefit: string;
  color: string;
  bgLight: string;
  borderColor: string;
  icon: React.ReactNode;
}

// ─── Custom SVG Logos for Ingredients ────────────────────────────────────────

export const INGREDIENT_META: Record<string, IngredientMeta> = {
  "coconut-oil": {
    key: "coconut-oil",
    name: "Coconut Oil",
    shortName: "Coconut Oil",
    role: "Nourishment & Shine",
    benefit: "Penetrates deep into the hair shaft for lipid replenishment and brilliant natural shine.",
    color: "#8B5A2B",
    bgLight: "#FAF3EB",
    borderColor: "#E2CFBE",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Palm leaf background accent */}
        <path d="M28 8C24 10 21 14 20 19C24 17 29 17 33 13C31 11 29.5 9.5 28 8Z" fill="#7FA976" opacity="0.6"/>
        <path d="M33 13C29 15 25 18 22 23C27 22 32 24 36 21C35 18 34.2 15.5 33 13Z" fill="#5E8D55" opacity="0.5"/>
        {/* Outer Coconut Shell (Brown, textured, natural oval) */}
        <ellipse cx="20" cy="22" rx="14" ry="14" fill="#6E472A" />
        <ellipse cx="20" cy="22" rx="13.2" ry="13.2" fill="#58371F" />
        {/* Inner Husk Fibres Ring */}
        <ellipse cx="20" cy="22" rx="11.5" ry="11.5" fill="#8F623F" stroke="#462C18" strokeWidth="0.8"/>
        {/* Pure White Copra Meat */}
        <ellipse cx="20" cy="22" rx="9.8" ry="9.8" fill="#FFFDF9" stroke="#E6D7C8" strokeWidth="0.5"/>
        {/* Coconut Water Hollow / Center */}
        <ellipse cx="20.5" cy="22.5" rx="6.5" ry="6.5" fill="#E8F1F2" />
        {/* Water Sheen & Reflection */}
        <path d="M17.5 19C19 18 22.5 18 24.5 19.5C23.5 21 21 21 19 20.5C18 20.2 17.6 19.5 17.5 19Z" fill="#FFFFFF" opacity="0.9" />
        {/* 3 Coconut "Eyes" / pores */}
        <circle cx="16" cy="14" r="1.3" fill="#3D2413" />
        <circle cx="21" cy="13.5" r="1.3" fill="#3D2413" />
        <circle cx="18.5" cy="16.5" r="1.4" fill="#3D2413" />
        {/* Husk hairs accent */}
        <path d="M8 20C6 19 6.5 17 6 16" stroke="#462C18" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M7 25C5 25.5 5 27 4.5 28.5" stroke="#462C18" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M33 22C35.5 21 35 19 36 18" stroke="#462C18" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
  },

  "coffee-extract": {
    key: "coffee-extract",
    name: "Coffee Extract",
    shortName: "Coffee Extract",
    role: "Scalp Revitalisation & Antioxidants",
    benefit: "Stimulates scalp microcirculation and delivers rich polyphenol antioxidants to the root system.",
    color: "#5C3826",
    bgLight: "#F8F1EB",
    borderColor: "#DFCABE",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Aromatic steam swirls */}
        <path d="M15 11C14 9 16 7 15 5" stroke="#C49B76" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 10C19 8 21 6 20 4" stroke="#A77850" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M25 11C24 9 26 7 25 5" stroke="#C49B76" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Roaster Bean Main Body */}
        <path d="M10 24C10 17 15 13 21 13C27 13 31 17 31 24C31 31 26 35 20 35C14 35 10 31 10 24Z" fill="#4B2C1B" />
        <path d="M11 23.5C11 17.5 15.5 14 20.8 14C26 14 29.8 17.5 29.8 23.5C29.8 29.5 25.2 33.8 20 33.8C14.8 33.8 11 29.5 11 23.5Z" fill="#5F3823" />
        {/* Center S-Curved Furrow */}
        <path d="M21 14.5C21 18 17 21 21 25C25 29 20 33.5 20 33.5" stroke="#FAF0E6" strokeWidth="2.4" strokeLinecap="round"/>
        <path d="M21 14.5C21 18 17 21 21 25C25 29 20 33.5 20 33.5" stroke="#2B160C" strokeWidth="1.1" strokeLinecap="round"/>
        {/* Golden Roast Highlight */}
        <path d="M14 19C13 22 13 25 14 28" stroke="#8D5B3A" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      </svg>
    )
  },

  "caffeine": {
    key: "caffeine",
    name: "Caffeine",
    shortName: "Pure Caffeine",
    role: "DHT-Defense & Root Energizer",
    benefit: "Energizes hair follicles and targets DHT pathways to promote longer, thicker-looking growth phases.",
    color: "#6F4E37",
    bgLight: "#F8F3ED",
    borderColor: "#E2D3C4",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Molecular ring outline with coffee spark */}
        <polygon points="20,6 31,12 31,25 20,31 9,25 9,12" stroke="#6F4E37" strokeWidth="2" fill="#FAF4EE"/>
        <circle cx="20" cy="18.5" r="5" fill="#6F4E37"/>
        <path d="M20 9L20 13.5M28 27L24.5 24M12 27L15.5 24" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
        {/* Center energy burst */}
        <path d="M19 16L22 18L18 21L21 23" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },

  "argan-oil": {
    key: "argan-oil",
    name: "Moroccan Argan Oil",
    shortName: "Argan Oil",
    role: "Nourishment, Softness & Gloss",
    benefit: "Packed with essential fatty acids and antioxidants to deliver featherlight softness and liquid-gold mirror shine.",
    color: "#B8860B",
    bgLight: "#FCF8EC",
    borderColor: "#E9D9A6",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Argan leaves */}
        <path d="M13 14C9 15 7 19 8 22C11 21 14 18 13 14Z" fill="#7B9E68" />
        <path d="M27 14C31 15 33 19 32 22C29 21 26 18 27 14Z" fill="#678E53" />
        {/* Golden Droplet */}
        <path d="M20 6C20 6 10 18 10 25C10 30.5 14.5 35 20 35C25.5 35 30 30.5 30 25C30 18 20 6 20 6Z" fill="url(#arganGold)" />
        {/* Lustrous Highlight */}
        <path d="M16 20C15 22 15 26 16.5 28C17 27 17 24 18 22" stroke="#FFF8DC" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="23" cy="18" r="1.5" fill="#FFFFFF" opacity="0.8"/>
        <defs>
          <linearGradient id="arganGold" x1="12" y1="8" x2="28" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9D976" />
            <stop offset="0.5" stopColor="#E5A93C" />
            <stop offset="1" stopColor="#B3740D" />
          </linearGradient>
        </defs>
      </svg>
    )
  },

  "silk-protein": {
    key: "silk-protein",
    name: "Hydrolyzed Silk Protein",
    shortName: "Silk Protein",
    role: "Silky Feel & Softness",
    benefit: "Creates a weightless protective mantle around each fibre to restore cashmere softness and ultra-fluid movement.",
    color: "#A25574",
    bgLight: "#FAF0F4",
    borderColor: "#EACCDA",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Flowing silk ribbons */}
        <path d="M6 28C12 18 18 32 24 20C30 8 36 22 36 22" stroke="url(#silkGrad)" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M4 18C10 8 16 22 22 10C28 0 34 14 38 12" stroke="#E6A4B4" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
        <path d="M8 32C14 22 20 36 26 24C32 12 36 26 36 26" stroke="#F5D0D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        <circle cx="21" cy="14" r="2" fill="#D66D8C" />
        <defs>
          <linearGradient id="silkGrad" x1="6" y1="28" x2="36" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C4567D" />
            <stop offset="0.6" stopColor="#E28EA6" />
            <stop offset="1" stopColor="#8C2C55" />
          </linearGradient>
        </defs>
      </svg>
    )
  },

  "collagen": {
    key: "collagen",
    name: "Collagen Proteins & Plex",
    shortName: "Collagen Plex",
    role: "Fibre Conditioning & Strength",
    benefit: "Triple-helix collagen peptides condition damaged cortexes and restore structural bounce and elasticity.",
    color: "#2C5E8A",
    bgLight: "#EEF5FA",
    borderColor: "#C5DCEB",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Triple helix cross-bonds */}
        <path d="M12 6C12 14 28 14 28 22C28 30 12 30 12 38" stroke="#2C5E8A" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M28 6C28 14 12 14 12 22C12 30 28 30 28 38" stroke="#5B93C4" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Peptide bonds */}
        <line x1="16" y1="10" x2="24" y2="10" stroke="#8EBBE0" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="18" y1="18" x2="22" y2="18" stroke="#C49B58" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="16" y1="26" x2="24" y2="26" stroke="#8EBBE0" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="18" y1="34" x2="22" y2="34" stroke="#C49B58" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="20" cy="22" r="3" fill="#C49B58"/>
      </svg>
    )
  },

  "keratin": {
    key: "keratin",
    name: "Hydrolyzed Keratin",
    shortName: "Hydrolyzed Keratin",
    role: "Smoothness & Manageability",
    benefit: "Micro-keratin chains bind seamlessly to damaged cuticles, sealing micro-fissures for unmatched smoothness.",
    color: "#734B87",
    bgLight: "#F6F1F8",
    borderColor: "#DECDE4",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Shield of hair fibre fortification */}
        <path d="M20 5L32 10V21C32 28 26 34 20 37C14 34 8 28 8 21V10L20 5Z" fill="#F4EDF7" stroke="#734B87" strokeWidth="2"/>
        {/* Internal fortified fibre strands */}
        <path d="M15 15C17 21 23 21 25 27" stroke="#9A69B2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M25 15C23 21 17 21 15 27" stroke="#68397E" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="21" r="2" fill="#C7A35B"/>
      </svg>
    )
  },

  "cysteine": {
    key: "cysteine",
    name: "Cysteine & Amino Acids",
    shortName: "Amino Cysteine",
    role: "Hair Fibre Care & Polish",
    benefit: "Restores essential disulfide bonds inside the hair fibre for long-lasting alignment and frizz resistance.",
    color: "#3B7A57",
    bgLight: "#F0F7F3",
    borderColor: "#C6E0D2",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Amino Molecular Cluster */}
        <circle cx="20" cy="14" r="5" fill="#3B7A57" />
        <circle cx="12" cy="26" r="4.5" fill="#589B77" />
        <circle cx="28" cy="26" r="4.5" fill="#2E6245" />
        {/* Molecular covalent bonds */}
        <line x1="18" y1="17" x2="14" y2="23" stroke="#87BBA1" strokeWidth="2.4" strokeLinecap="round"/>
        <line x1="22" y1="17" x2="26" y2="23" stroke="#87BBA1" strokeWidth="2.4" strokeLinecap="round"/>
        <line x1="16.5" y1="26" x2="23.5" y2="26" stroke="#87BBA1" strokeWidth="2.4" strokeLinecap="round"/>
        {/* Core spark */}
        <circle cx="20" cy="14" r="1.8" fill="#FFF" />
      </svg>
    )
  },

  "salicylic-acid": {
    key: "salicylic-acid",
    name: "Salicylic Acid (BHA)",
    shortName: "Salicylic Acid",
    role: "Loosens Flakes & Buildup",
    benefit: "Lipophilic BHA dissolves stubborn sebum plugs and loosens adhering flakes for a thoroughly cleansed scalp.",
    color: "#2471A3",
    bgLight: "#EDF5FA",
    borderColor: "#BDD9ED",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Laboratory Flask with clarifying active */}
        <path d="M17 7H23M19 7V14L10 28C9 30 10.5 33 13 33H27C29.5 33 31 30 30 28L21 14V7" stroke="#2471A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Clarifying liquid */}
        <path d="M12.5 25L14 22C16 23 18 23 20 22C22 21 24 21 26 22L27.5 25C28.5 27 28 31 26 31H14C12 31 11.5 27 12.5 25Z" fill="#7FB3D5" opacity="0.6"/>
        {/* Bubbles */}
        <circle cx="17" cy="27" r="1.5" fill="#FFFFFF"/>
        <circle cx="23" cy="25" r="1.2" fill="#FFFFFF"/>
        <circle cx="20" cy="28.5" r="1" fill="#FFFFFF"/>
      </svg>
    )
  },

  "lactic-acid": {
    key: "lactic-acid",
    name: "Lactic Acid (AHA)",
    shortName: "Lactic Acid",
    role: "Gentle Exfoliation & Scalp Feel",
    benefit: "Gently breaks cellular glue between dull flakes while hydrating the scalp moisture barrier.",
    color: "#2E86C1",
    bgLight: "#F0F7FB",
    borderColor: "#CBE2F1",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Clarifying droplet with micro-peel rings */}
        <path d="M20 7C20 7 11 19 11 26C11 31 15 35 20 35C25 35 29 31 29 26C29 19 20 7 20 7Z" fill="#D4E6F1" stroke="#2E86C1" strokeWidth="1.8"/>
        <path d="M20 14C20 14 14 22 14 26C14 29 16.5 32 20 32" stroke="#2E86C1" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="22" cy="24" r="2.2" fill="#2E86C1"/>
      </svg>
    )
  },

  "glycolic-acid": {
    key: "glycolic-acid",
    name: "Glycolic Acid",
    shortName: "Glycolic Acid",
    role: "Fibre Realignment & Polish",
    benefit: "Smallest molecular AHA that penetrates the cuticle to loosen stubborn kinks and impart high-gloss polish.",
    color: "#117864",
    bgLight: "#EDF7F4",
    borderColor: "#BEE4DB",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        <circle cx="20" cy="20" r="14" fill="#EDF7F4" stroke="#117864" strokeWidth="2"/>
        <path d="M15 15L25 25M25 15L15 25" stroke="#16A085" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="20" cy="11" r="2" fill="#117864"/>
        <circle cx="20" cy="29" r="2" fill="#117864"/>
      </svg>
    )
  },

  "pro-vitamin-b5": {
    key: "pro-vitamin-b5",
    name: "Pro-Vitamin B5 (D-Panthenol)",
    shortName: "Pro-Vitamin B5",
    role: "Moisture & Elasticity Support",
    benefit: "Penetrates deep into the cortex to bind atmospheric moisture, plumping strands and enhancing elasticity.",
    color: "#D35400",
    bgLight: "#FDF5EE",
    borderColor: "#F6D8BF",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Capsule Half & Half */}
        <g transform="rotate(-35 20 20)">
          <rect x="14" y="9" width="12" height="11" rx="6" fill="#D35400"/>
          <rect x="14" y="20" width="12" height="11" rx="6" fill="#F8C471"/>
          <rect x="14" y="9" width="12" height="22" rx="6" stroke="#BA4A00" strokeWidth="1.8"/>
          <line x1="14" y1="20" x2="26" y2="20" stroke="#BA4A00" strokeWidth="1.5"/>
          <circle cx="20" cy="14" r="1.5" fill="#FFF"/>
        </g>
      </svg>
    )
  },

  "vitamin-e": {
    key: "vitamin-e",
    name: "Vitamin E",
    shortName: "Vitamin E",
    role: "Antioxidant & Nourishing Care",
    benefit: "Protects lipid barriers from oxidative stress and environmental toxins while conditioning roots.",
    color: "#C0392B",
    bgLight: "#FDF2F0",
    borderColor: "#F7CAC4",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        <circle cx="20" cy="20" r="14" fill="#FDF2F0" stroke="#C0392B" strokeWidth="2"/>
        <path d="M16 13H24M16 20H22M16 27H24M16 13V27" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round"/>
        <circle cx="26" cy="14" r="2" fill="#E74C3C"/>
      </svg>
    )
  },

  "redensyl": {
    key: "redensyl",
    name: "3% Redensyl",
    shortName: "3% Redensyl",
    role: "Follicle Reactivation & Density",
    benefit: "Targets hair follicle stem cells to restart the hair growth cycle and visibly increase hair density.",
    color: "#1E8449",
    bgLight: "#EEF8F2",
    borderColor: "#C0E8D0",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Sprouting Hair Follicle */}
        <path d="M20 33V18" stroke="#1E8449" strokeWidth="2.8" strokeLinecap="round"/>
        {/* Emerging Leaf / Sprout */}
        <path d="M20 22C15 20 13 14 15 9C19 10 20 14 20 22Z" fill="#2ECC71" stroke="#1E8449" strokeWidth="1.4"/>
        <path d="M20 18C25 16 27 10 25 5C21 6 20 10 20 18Z" fill="#58D68D" stroke="#1E8449" strokeWidth="1.4"/>
        <circle cx="20" cy="33" r="3" fill="#145A32"/>
      </svg>
    )
  },

  "anagain": {
    key: "anagain",
    name: "4% Anagain",
    shortName: "4% Anagain",
    role: "Organic Pea Sprout Actives",
    benefit: "Stimulates Noggin and FGF-7 signal molecules to reactive dermal papilla and extend anagen growth phase.",
    color: "#27AE60",
    bgLight: "#F0FAF4",
    borderColor: "#C5ECD5",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Organic Pea Sprout */}
        <path d="M12 28C14 20 20 14 28 12" stroke="#27AE60" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M12 28C10 22 14 17 21 16" stroke="#52BE80" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="28" cy="12" r="3" fill="#27AE60"/>
        <circle cx="21" cy="16" r="2.5" fill="#52BE80"/>
        <circle cx="12" cy="28" r="3" fill="#196F3D"/>
      </svg>
    )
  },

  "biotin": {
    key: "biotin",
    name: "Biotin (Vitamin B7)",
    shortName: "Biotin B7",
    role: "Keratin Infrastructure & Strength",
    benefit: "Essential cofactor that supports the body's natural keratin production, drastically reducing breakage.",
    color: "#B7950B",
    bgLight: "#FCF9EB",
    borderColor: "#EBDDA7",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Diamond Shield Fortification */}
        <polygon points="20,5 33,14 28,33 12,33 7,14" fill="#FCF9EB" stroke="#B7950B" strokeWidth="2"/>
        <polygon points="20,10 28,16 25,29 15,29 12,16" fill="#F9E79F" stroke="#D4AC0D" strokeWidth="1"/>
        <circle cx="20" cy="20" r="3" fill="#B7950B"/>
      </svg>
    )
  },

  "guava-leaf": {
    key: "guava-leaf",
    name: "Guava Leaf Extract",
    shortName: "Guava Leaf",
    role: "Lycopene & Botanical Defense",
    benefit: "Traditional botanical treasure rich in vitamins B & C, flavonoids and lycopene for scalp wellness.",
    color: "#4D7C0F",
    bgLight: "#F4F8EB",
    borderColor: "#D2E4AE",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        {/* Oval Guava Leaf with distinctive veins */}
        <path d="M10 30C10 18 20 8 32 8C32 20 22 30 10 30Z" fill="#65A30D" stroke="#3F6212" strokeWidth="1.5"/>
        {/* Center stem and veins */}
        <path d="M10 30L32 8" stroke="#ECFCCB" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 24L20 26" stroke="#ECFCCB" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M21 19L26 21" stroke="#ECFCCB" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M26 14L30 16" stroke="#ECFCCB" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
  },

  "niacinamide": {
    key: "niacinamide",
    name: "Niacinamide (Vitamin B3)",
    shortName: "Niacinamide",
    role: "Scalp Barrier & Microcirculation",
    benefit: "Stimulates lipid synthesis and improves scalp blood flow to nourish growing hair strands.",
    color: "#7D3C98",
    bgLight: "#F7F2F9",
    borderColor: "#DECDE7",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ing-svg">
        <polygon points="20,6 31,13 31,27 20,34 9,27 9,13" fill="#F7F2F9" stroke="#7D3C98" strokeWidth="2"/>
        <path d="M20 12L27 24H13L20 12Z" stroke="#AF7AC5" strokeWidth="1.8"/>
        <circle cx="20" cy="20" r="2.5" fill="#7D3C98"/>
      </svg>
    )
  }
};

// ─── Helper function to match text to ingredient ──────────────────────────────

export function matchIngredient(text: string): IngredientMeta | null {
  const lower = text.toLowerCase();
  if (lower.includes("coconut")) return INGREDIENT_META["coconut-oil"];
  if (lower.includes("coffee")) return INGREDIENT_META["coffee-extract"];
  if (lower.includes("caffeine")) return INGREDIENT_META["caffeine"];
  if (lower.includes("argan")) return INGREDIENT_META["argan-oil"];
  if (lower.includes("silk")) return INGREDIENT_META["silk-protein"];
  if (lower.includes("collagen")) return INGREDIENT_META["collagen"];
  if (lower.includes("keratin")) return INGREDIENT_META["keratin"];
  if (lower.includes("cysteine") || lower.includes("amino")) return INGREDIENT_META["cysteine"];
  if (lower.includes("salicylic")) return INGREDIENT_META["salicylic-acid"];
  if (lower.includes("lactic")) return INGREDIENT_META["lactic-acid"];
  if (lower.includes("glycolic")) return INGREDIENT_META["glycolic-acid"];
  if (lower.includes("panthenol") || lower.includes("b5")) return INGREDIENT_META["pro-vitamin-b5"];
  if (lower.includes("vitamin e")) return INGREDIENT_META["vitamin-e"];
  if (lower.includes("redensyl")) return INGREDIENT_META["redensyl"];
  if (lower.includes("anagain")) return INGREDIENT_META["anagain"];
  if (lower.includes("biotin")) return INGREDIENT_META["biotin"];
  if (lower.includes("guava")) return INGREDIENT_META["guava-leaf"];
  if (lower.includes("niacinamide")) return INGREDIENT_META["niacinamide"];
  return null;
}

// ─── Visual Ingredient Badge Component ───────────────────────────────────────

export function IngredientBadge({
  text,
  variant = "pill"
}: {
  text: string;
  variant?: "pill" | "card" | "compact";
}) {
  const match = matchIngredient(text);

  if (!match) {
    return (
      <span className="ing-badge generic">
        <span className="ing-dot" />
        <span className="ing-name">{text}</span>
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <span
        className="ing-badge compact"
        style={{
          backgroundColor: match.bgLight,
          color: match.color,
          borderColor: match.borderColor
        }}
        title={`${match.name}: ${match.role}`}
      >
        <span className="ing-icon-wrap">{match.icon}</span>
        <span className="ing-name">{match.shortName}</span>
      </span>
    );
  }

  if (variant === "card") {
    return (
      <div
        className="ing-card"
        style={{
          borderColor: match.borderColor,
          background: `linear-gradient(135deg, #FAF6F0 60%, ${match.bgLight} 100%)`
        }}
      >
        <div className="ing-card-header">
          <div
            className="ing-icon-box"
            style={{ backgroundColor: match.bgLight, borderColor: match.borderColor }}
          >
            {match.icon}
          </div>
          <div>
            <h4 style={{ color: match.color }}>{match.name}</h4>
            <span className="ing-role">{match.role}</span>
          </div>
        </div>
        <p className="ing-benefit">{match.benefit}</p>
      </div>
    );
  }

  return (
    <div
      className="ing-badge pill"
      style={{
        backgroundColor: match.bgLight,
        color: match.color,
        borderColor: match.borderColor
      }}
    >
      <span className="ing-icon-wrap">{match.icon}</span>
      <div className="ing-text-group">
        <span className="ing-name">{match.name}</span>
        <span className="ing-sub">{match.role}</span>
      </div>
    </div>
  );
}
