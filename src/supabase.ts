import { createClient } from "@supabase/supabase-js";
import { products as initialProducts } from "./data";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || "";
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    SUPABASE_URL &&
    !SUPABASE_URL.includes("your-project") &&
    !SUPABASE_URL.includes("placeholder") &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_ANON_KEY.includes("your-anon-key") &&
    !SUPABASE_ANON_KEY.includes("placeholder")
  );
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

// ─── Direct Image File Processor ─────────────────────────────────────────────
// Converts an uploaded image file into an optimized, web-ready data URL or uploads to Supabase Storage

export async function processDirectImageFile(file: File, maxWidth = 1400, quality = 0.86): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve(reader.result as string);
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        try {
          const webp = canvas.toDataURL("image/webp", quality);
          if (webp.startsWith("data:image/webp")) {
            resolve(webp);
            return;
          }
        } catch {
          // fallback
        }

        const isPng = file.type === "image/png";
        resolve(canvas.toDataURL(isPng ? "image/png" : "image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

  // If Supabase Storage is configured, attempt upload to 'images' bucket
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const ext = file.name.split(".").pop() || "jpg";
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const path = `uploads/${Date.now()}_${cleanName}`;
      const { data, error } = await supabase.storage.from("images").upload(path, blob, {
        contentType: blob.type || "image/jpeg",
        upsert: true,
      });
      if (!error && data) {
        const { data: pub } = supabase.storage.from("images").getPublicUrl(data.path);
        if (pub?.publicUrl) return pub.publicUrl;
      }
    } catch (e) {
      console.warn("Supabase storage upload skipped, using direct image data:", e);
    }
  }

  return dataUrl;
}

// ─── Default Data ────────────────────────────────────────────────────────────

export const defaultBeforeAfterItems: DBBeforeAfter[] = [
  {
    id: 1,
    title: "Permanent Hair Spa: 3–5 Months Transformation",
    subtitle: "One Ritual • Long-Lasting Smooth, Frizz-Free Manageability",
    before_image_url: "/assets/permanent-spa-before-after.jpg",
    after_image_url: "/assets/permanent-spa-result.jpg",
    product_used: "AMREAL Permanent Hair Spa",
    sort_order: 1,
    visible: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Coffee Scalp Scrub No. 2 Exfoliation",
    subtitle: "Scalp Flake Reset & Root Purification",
    before_image_url: "/assets/coffee-scrub-detail.jpg",
    after_image_url: "/assets/scalp-detox.jpeg",
    product_used: "AMREAL Coffee Scalp Scrub — No.2",
    sort_order: 2,
    visible: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Silk Protein Collagen Therapy",
    subtitle: "Extreme Frizz Elimination & Cashmere Softness",
    before_image_url: "/assets/permanent-spa-texture.jpg",
    after_image_url: "/assets/nanoplastia-treatment.jpg",
    product_used: "Silk Protein Collagen Therapy",
    sort_order: 3,
    visible: true,
    created_at: new Date().toISOString()
  }
];

function getInitialProducts(): DBProduct[] {
  return initialProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    size: p.size,
    category: p.category,
    description: p.description,
    image_url: p.image,
    gallery_urls: p.gallery,
    hair_types: p.hairTypes,
    concerns: p.concerns,
    ingredients: p.ingredients,
    benefits: p.benefits,
    suitable_for: p.suitableFor,
    featured: Boolean(p.featured),
    created_at: new Date().toISOString()
  }));
}

// ─── Unified Data Layer (Supabase with Local Persistence Fallback) ────────────

const PRODUCTS_STORAGE_KEY = "amreal_products_store_v3";
const BA_STORAGE_KEY = "amreal_ba_store_v3";

export async function loadProductsData(): Promise<DBProduct[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("products").select("*").order("id");
      if (!error && data && data.length > 0) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn("Could not load products from Supabase:", e);
    }
  }

  const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {}
  }

  const initial = getInitialProducts();
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

export async function saveProductData(product: Partial<DBProduct>): Promise<{ ok: boolean; error?: string; product: DBProduct }> {
  let savedProduct: DBProduct;
  const currentList = await loadProductsData();

  if (product.id) {
    savedProduct = {
      ...(currentList.find(p => p.id === product.id) || {}),
      ...product,
    } as DBProduct;
    const updatedList = currentList.map(p => p.id === savedProduct.id ? savedProduct : p);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("products").update(product).eq("id", product.id);
        if (error) return { ok: false, error: error.message, product: savedProduct };
      } catch (err: any) {
        return { ok: false, error: err?.message, product: savedProduct };
      }
    }
  } else {
    const nextId = currentList.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;
    savedProduct = {
      ...product,
      id: nextId,
      created_at: new Date().toISOString(),
    } as DBProduct;
    const updatedList = [savedProduct, ...currentList];
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from("products").insert([product]).select().single();
        if (error) return { ok: false, error: error.message, product: savedProduct };
        if (data) savedProduct = data;
      } catch (err: any) {
        return { ok: false, error: err?.message, product: savedProduct };
      }
    }
  }

  return { ok: true, product: savedProduct };
}

export async function deleteProductData(id: number): Promise<boolean> {
  const currentList = await loadProductsData();
  const updatedList = currentList.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("products").delete().eq("id", id);
    } catch {}
  }
  return true;
}

export async function toggleProductFeaturedData(id: number, featured: boolean): Promise<boolean> {
  const currentList = await loadProductsData();
  const updatedList = currentList.map(p => p.id === id ? { ...p, featured } : p);
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("products").update({ featured }).eq("id", id);
    } catch {}
  }
  return true;
}

export async function loadBeforeAfterData(): Promise<DBBeforeAfter[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("before_after").select("*").order("sort_order");
      if (!error && data && data.length > 0) {
        localStorage.setItem(BA_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn("Could not load before_after from Supabase:", e);
    }
  }

  const saved = localStorage.getItem(BA_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {}
  }

  localStorage.setItem(BA_STORAGE_KEY, JSON.stringify(defaultBeforeAfterItems));
  return defaultBeforeAfterItems;
}

export async function saveBeforeAfterData(item: Partial<DBBeforeAfter>): Promise<{ ok: boolean; error?: string; item: DBBeforeAfter }> {
  let savedItem: DBBeforeAfter;
  const currentList = await loadBeforeAfterData();

  if (item.id) {
    savedItem = {
      ...(currentList.find(b => b.id === item.id) || {}),
      ...item,
    } as DBBeforeAfter;
    const updatedList = currentList.map(b => b.id === savedItem.id ? savedItem : b);
    localStorage.setItem(BA_STORAGE_KEY, JSON.stringify(updatedList));

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("before_after").update(item).eq("id", item.id);
        if (error) return { ok: false, error: error.message, item: savedItem };
      } catch (err: any) {
        return { ok: false, error: err?.message, item: savedItem };
      }
    }
  } else {
    const nextId = currentList.reduce((max, b) => Math.max(max, b.id || 0), 0) + 1;
    savedItem = {
      ...item,
      id: nextId,
      created_at: new Date().toISOString(),
    } as DBBeforeAfter;
    const updatedList = [...currentList, savedItem];
    localStorage.setItem(BA_STORAGE_KEY, JSON.stringify(updatedList));

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from("before_after").insert([item]).select().single();
        if (error) return { ok: false, error: error.message, item: savedItem };
        if (data) savedItem = data;
      } catch (err: any) {
        return { ok: false, error: err?.message, item: savedItem };
      }
    }
  }

  return { ok: true, item: savedItem };
}

export async function deleteBeforeAfterData(id: number): Promise<boolean> {
  const currentList = await loadBeforeAfterData();
  const updatedList = currentList.filter(b => b.id !== id);
  localStorage.setItem(BA_STORAGE_KEY, JSON.stringify(updatedList));

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("before_after").delete().eq("id", id);
    } catch {}
  }
  return true;
}

export async function toggleBeforeAfterVisibilityData(id: number, visible: boolean): Promise<boolean> {
  const currentList = await loadBeforeAfterData();
  const updatedList = currentList.map(b => b.id === id ? { ...b, visible } : b);
  localStorage.setItem(BA_STORAGE_KEY, JSON.stringify(updatedList));

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("before_after").update({ visible }).eq("id", id);
    } catch {}
  }
  return true;
}
