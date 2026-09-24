import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("Supabase credentials are not set. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.");
}

export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder"
);

// ─── Types ───────────────────────────────────────────────────────────────────

export type DBProduct = {
  id: number;
  name: string;
  slug: string;
  size: string;
  category: string;
  description: string;
  image_url: string;
  gallery_urls: string[];
  hair_types: string[];
  concerns: string[];
  ingredients: string[];
  benefits: string[];
  suitable_for: string[];
  featured: boolean;
  created_at: string;
};

export type DBBeforeAfter = {
  id: number;
  title: string;
  subtitle: string;
  before_image_url: string;
  after_image_url: string;
  product_used: string;
  sort_order: number;
  visible: boolean;
  created_at: string;
};
