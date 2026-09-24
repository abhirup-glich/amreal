# AMREAL Professional — React Demo

## Stack
- React
- Vite
- TypeScript
- React Router
- Framer Motion
- Lucide React
- Custom responsive CSS

## Run

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Routes

- `/` — premium homepage
- `/products` — searchable/filterable catalogue
- `/products/:slug` — product detail
- `/about`
- `/contact`
- `/feedback`
- `/login`
- `/dashboard`
- `/admin/dashboard`

## Product data

The supplied product list has been entered into `src/data.ts`:

1. Shampoo - Kit No 1 — 300 ml
2. Mask - Kit No 2 — 250 ml
3. Mask - Kit No 2 — 500 ml
4. Argan Screm — 50 ml
5. Permanent SPA Kit No. 3 — 1000 ml
7. Slik Protein — 1000 ml
8. Slik Protein Sample — 120 ml
9. Shampoo Dand Kit No. 1 — 250 ml
10. Scalp Scrub — 250 ml
11. Nanoplastia — 1000 ml
12. Nanoplastia — 300 ml

The numbering is preserved from the supplied list; S.No. 6 was not present.

## Important production note

The image URLs in this demo are generic temporary photography placeholders. Replace them with approved AMREAL product/lifestyle images.

The PRD explicitly says not to invent product ingredients, benefits, certifications, testimonials, statistics, or clinical claims. Therefore the demo uses conservative placeholder formulation text until approved AMREAL data is supplied.

This is a frontend demo. Connect the forms, customer authentication, appointments, CRM and admin actions to the Node/Express/MongoDB REST API described in the PRD for production.
