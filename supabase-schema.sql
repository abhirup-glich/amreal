-- ─── AMREAL Supabase Schema ────────────────────────────────────────────────
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ─────────────────────────────────────────────────────────────────────────────

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id              BIGSERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  size            TEXT,
  category        TEXT,
  description     TEXT,
  image_url       TEXT,
  gallery_urls    TEXT[]   DEFAULT '{}',
  hair_types      TEXT[]   DEFAULT '{}',
  concerns        TEXT[]   DEFAULT '{}',
  ingredients     TEXT[]   DEFAULT '{}',
  benefits        TEXT[]   DEFAULT '{}',
  suitable_for    TEXT[]   DEFAULT '{}',
  featured        BOOLEAN  DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Before/After table
CREATE TABLE IF NOT EXISTS public.before_after (
  id                  BIGSERIAL PRIMARY KEY,
  title               TEXT NOT NULL,
  subtitle            TEXT,
  before_image_url    TEXT NOT NULL,
  after_image_url     TEXT NOT NULL,
  product_used        TEXT,
  sort_order          INTEGER DEFAULT 0,
  visible             BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (but allow all reads for public)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (public website)
CREATE POLICY "Public read products"
  ON public.products FOR SELECT USING (true);

CREATE POLICY "Public read before_after"
  ON public.before_after FOR SELECT USING (true);

-- Allow service role (admin) to do everything
CREATE POLICY "Admin full access products"
  ON public.products FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access before_after"
  ON public.before_after FOR ALL
  USING (true)
  WITH CHECK (true);

-- ─── Sample seed data (optional) ─────────────────────────────────────────────

INSERT INTO public.products (name, slug, size, category, description, image_url, gallery_urls, hair_types, concerns, ingredients, benefits, suitable_for, featured)
VALUES
  ('Shampoo Kit No 1', 'shampoo-kit-no-1', '300 ml', 'Haircare',
   'Professional shampoo kit designed for salon-focused haircare routines.',
   '/assets/hair-ritual.jpeg',
   ARRAY['/assets/hair-ritual.jpeg', '/assets/scalp-detox.jpeg'],
   ARRAY['Straight', 'Coloured'],
   ARRAY['Dryness', 'Frizz', 'Nourishment'],
   ARRAY['Professional formula'],
   ARRAY['Professional cleansing routine', 'Salon-ready care'],
   ARRAY['Salons', 'Beauty professionals'],
   TRUE),
  ('Collagen Biotin Masque', 'collagen-biotin-masque-250', '250 ml', 'Hair Treatments',
   'Professional hair mask kit for treatment-focused salon routines.',
   '/assets/collagen-biotin-masque.jpeg',
   ARRAY['/assets/collagen-biotin-masque.jpeg'],
   ARRAY['Curly', 'Damaged'],
   ARRAY['Damage', 'Dryness', 'Nourishment'],
   ARRAY['Collagen', 'Biotin'],
   ARRAY['Strengthens hair', 'Adds shine'],
   ARRAY['Salons', 'Hair professionals'],
   TRUE),
  ('Coffee Scalp Scrub', 'coffee-scalp-scrub', '200 ml', 'Scalp Care',
   'Exfoliating scalp scrub with coffee extract for professional salon use.',
   '/assets/coffee-scalp-scrub.jpeg',
   ARRAY['/assets/coffee-scalp-scrub.jpeg'],
   ARRAY['Straight', 'Curly', 'Damaged'],
   ARRAY['Scalp', 'Hair Fall'],
   ARRAY['Coffee Extract', 'Exfoliants'],
   ARRAY['Exfoliates scalp', 'Promotes healthy growth'],
   ARRAY['Salons', 'Spas'],
   TRUE);

INSERT INTO public.before_after (title, subtitle, before_image_url, after_image_url, product_used, sort_order, visible)
VALUES
  ('Collagen Treatment Result',
   '4-week professional treatment',
   '/assets/coffee-scalp-scrub.jpeg',
   '/assets/hair-ritual.jpeg',
   'Collagen Biotin Masque',
   1, TRUE),
  ('Scalp Detox Transformation',
   '2-week routine',
   '/assets/anti-hairfall-serum.jpeg',
   '/assets/scalp-detox.jpeg',
   'Coffee Scalp Scrub',
   2, TRUE);
