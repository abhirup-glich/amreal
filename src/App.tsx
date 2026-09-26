import { useState, useEffect, useRef } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight, ChevronLeft, ChevronRight, Menu, Search, X,
  Instagram, Mail, Phone, MapPin, Check, Star,
  Plus, Trash2, Eye, EyeOff, Edit3, Save, Upload,
  LayoutDashboard, Package, ImageIcon, LogOut, AlertCircle, Loader,
  FolderOpen, Sparkles, ArrowLeftRight, FlaskConical
} from "lucide-react";
import { categories as staticCategories, concerns, hairTypes, heroSlides, products as staticProducts, Product } from "./data";
import { IngredientBadge, INGREDIENT_META } from "./ingredientIcons";
import {
  CuticleDiagram,
  ClinicalMetricsGram,
  TreatmentProtocolDiagram,
  HairDiagnosticGram,
  ProductTechSpecsBar
} from "./scientificGrams";
import {
  DBProduct,
  DBBeforeAfter,
  defaultBeforeAfterItems,
  processDirectImageFile,
  loadProductsData,
  saveProductData,
  deleteProductData,
  toggleProductFeaturedData,
  loadBeforeAfterData,
  saveBeforeAfterData,
  deleteBeforeAfterData,
  toggleBeforeAfterVisibilityData
} from "./supabase";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const cx = (...v: (string | false | undefined)[]) => v.filter(Boolean).join(" ");

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function dbToProduct(p: DBProduct): Product {
  const staticMatch = staticProducts.find(s => s.slug === p.slug || s.name.toLowerCase() === p.name.toLowerCase());
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    size: p.size,
    category: p.category,
    description: p.description,
    image: p.image_url,
    gallery: p.gallery_urls?.length ? p.gallery_urls : [p.image_url],
    hairTypes: p.hair_types || [],
    concerns: p.concerns || [],
    ingredients: p.ingredients || [],
    benefits: p.benefits || [],
    suitableFor: p.suitable_for || [],
    featured: p.featured,
    heroBadge: staticMatch?.heroBadge,
    tagline: staticMatch?.tagline
  };
}

// ─── Brand / Navbar ──────────────────────────────────────────────────────────

function BrandLogo({ dark = false }: { dark?: boolean }) {
  return (
    <span className={cx("brand-logo", dark && "brand-logo-dark")}>
      <img src="/assets/amreal-logo.png" alt="AMREAL Professional" />
    </span>
  );
}

function Announcement() {
  const items = Array(12).fill("AMREAL PROFESSIONALS");
  return (
    <div className="announcement" aria-label="AMREAL PROFESSIONALS">
      <div className="announcement-track">
        <div className="announcement-group">
          {items.map((text, i) => (
            <span key={i} className="announcement-item">
              <span className="announcement-text">{text}</span>
              <span className="announcement-dot" aria-hidden="true">•</span>
            </span>
          ))}
        </div>
        <div className="announcement-group" aria-hidden="true">
          {items.map((text, i) => (
            <span key={`dup-${i}`} className="announcement-item">
              <span className="announcement-text">{text}</span>
              <span className="announcement-dot">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavSearch({ onSelect }: { onSelect?: () => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>(staticProducts);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProductsData().then(prods => {
      if (prods && prods.length > 0) {
        setProductsList(prods.map(dbToProduct));
      }
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query.trim()
    ? productsList.filter(p => {
        const q = query.toLowerCase().trim();
        return [
          p.name,
          p.category,
          p.size,
          p.description,
          ...(p.ingredients || []),
          ...(p.concerns || []),
          ...(p.hairTypes || [])
        ].join(" ").toLowerCase().includes(q);
      }).slice(0, 5)
    : [];

  const handleSelectProduct = (slug: string) => {
    setOpen(false);
    setQuery("");
    if (onSelect) onSelect();
    navigate(`/products/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      if (onSelect) onSelect();
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="nav-search-wrap" ref={wrapperRef}>
      <form className={cx("nav-search-form", open && "active")} onSubmit={handleSearchSubmit}>
        <Search size={14} className="nav-search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products, actives..."
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            className="nav-search-clear-btn"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {open && query.trim().length > 0 && (
          <motion.div
            className="nav-search-results"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <div className="nav-search-header">
              <span>Matching Products ({results.length})</span>
            </div>

            {results.length > 0 ? (
              <div className="nav-search-list">
                {results.map(prod => (
                  <button
                    key={prod.id}
                    className="nav-search-item"
                    type="button"
                    onClick={() => handleSelectProduct(prod.slug)}
                  >
                    <img src={prod.image} alt={prod.name} className="nav-search-thumb" />
                    <div className="nav-search-item-info">
                      <div className="nav-search-item-top">
                        <span className="nav-search-category">{prod.category}</span>
                        <span className="nav-search-size">{prod.size}</span>
                      </div>
                      <h4>{prod.name}</h4>
                      {prod.ingredients && prod.ingredients.length > 0 && (
                        <div className="nav-search-item-ing">
                          {prod.ingredients.slice(0, 2).map((ing, idx) => (
                            <IngredientBadge key={idx} text={ing} variant="compact" />
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowRight size={14} className="nav-search-arrow" />
                  </button>
                ))}
                <button
                  type="button"
                  className="nav-search-view-all"
                  onClick={handleSearchSubmit}
                >
                  View all results for "{query}" <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              <div className="nav-search-empty">
                <p>No products found for "<b>{query}</b>"</p>
                <span>Try searching: <i>Permanent Spa, Coffee Scrub, Silk Protein, Nanoplastia, Redensyl</i></span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Home", "/"],
    ["Products", "/products"],
    ["About", "/about"],
    ["Feedback", "/feedback"],
    ["Contact", "/contact"]
  ];
  return (
    <>
      <div className={cx("site-header", scrolled && "site-header-scrolled")}>
        <Announcement />
        <header className={cx("navbar", scrolled && "navbar-scrolled")}>
          <Link className="logo" to="/" onClick={() => setOpen(false)}><BrandLogo /></Link>
          <nav className="desktop-nav">
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} className={({ isActive }) => cx("nav-link", isActive && "active")}>{label}</NavLink>
            ))}
            <NavSearch />
            <Link className="button button-small" to="/contact">Enquire Now <ArrowRight size={15} /></Link>
          </nav>
          <button className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <AnimatePresence>
            {open && (
              <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mobile-menu-top">
                  <Link className="logo" to="/" onClick={() => setOpen(false)}><BrandLogo /></Link>
                  <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
                </div>
                <div className="mobile-search-section">
                  <NavSearch onSelect={() => setOpen(false)} />
                </div>
                <div className="mobile-links">
                  {links.map(([label, to]) => (
                    <Link key={to} to={to} onClick={() => setOpen(false)}>{label}<ArrowRight /></Link>
                  ))}
                  <Link className="button" to="/contact" onClick={() => setOpen(false)}>Enquire Now <ArrowRight size={16} /></Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>
      <div className="site-header-spacer" aria-hidden="true" />
    </>
  );
}

// ─── Reusables ───────────────────────────────────────────────────────────────

function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow?: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className={cx("section-heading", light && "light")}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Button({ to = "/contact", children = "Enquire Now", secondary = false }: { to?: string; children?: React.ReactNode; secondary?: boolean }) {
  return (
    <Link className={cx("button", secondary && "button-secondary")} to={to}>
      {children}<ArrowRight size={16} />
    </Link>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .65 }}>
      {children}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % heroSlides.length), 3200);
    return () => clearInterval(id);
  }, []);
  const slide = heroSlides[index];
  return (
    <section className="hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="hero-image"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: .9 }}
          style={{ backgroundImage: `linear-gradient(90deg, rgba(25,18,20,.58), rgba(25,18,20,.12) 65%, rgba(25,18,20,.02)), url(${slide.image})` }}
        />
      </AnimatePresence>
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .6 }}>
            <span className="eyebrow hero-eyebrow">{slide.eyebrow}</span>
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
            <div className="hero-actions">
              <Button to="/products">Explore Products</Button>
              <Button to="/contact" secondary>Partner with AMREAL</Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="hero-controls">
        <span>{String(index + 1).padStart(2, "0")} / 05</span>
        <div className="hero-progress">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={i === index ? "active" : ""}><span /></button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section className="marquee-wrap">
      <div className="marquee row-one"><span>PROFESSIONAL • PREMIUM • BEAUTY • SCIENCE • CARE • RESULTS • </span><span>PROFESSIONAL • PREMIUM • BEAUTY • SCIENCE • CARE • RESULTS • </span></div>
      <div className="marquee row-two"><span>HAIRCARE • TREATMENTS • SCALP CARE • SKINCARE • SALON SOLUTIONS • </span><span>HAIRCARE • TREATMENTS • SCALP CARE • SKINCARE • SALON SOLUTIONS • </span></div>
    </section>
  );
}

// ─── Before/After Slider ─────────────────────────────────────────────────────

function BeforeAfterSlider({ item, showInfo = true, className = "" }: { item: DBBeforeAfter; showInfo?: boolean; className?: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function updatePos(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }

  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    updatePos(e.clientX);
  }

  function onTouchStart(e: React.TouchEvent) {
    dragging.current = true;
    if (e.touches.length > 0) updatePos(e.touches[0].clientX);
  }

  useEffect(() => {
    function onGlobalMove(e: MouseEvent) {
      if (dragging.current) updatePos(e.clientX);
    }
    function onGlobalUp() {
      dragging.current = false;
    }
    function onGlobalTouchMove(e: TouchEvent) {
      if (dragging.current && e.touches.length > 0) updatePos(e.touches[0].clientX);
    }
    window.addEventListener("mousemove", onGlobalMove);
    window.addEventListener("mouseup", onGlobalUp);
    window.addEventListener("touchmove", onGlobalTouchMove, { passive: true });
    window.addEventListener("touchend", onGlobalUp);
    return () => {
      window.removeEventListener("mousemove", onGlobalMove);
      window.removeEventListener("mouseup", onGlobalUp);
      window.removeEventListener("touchmove", onGlobalTouchMove);
      window.removeEventListener("touchend", onGlobalUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cx("ba-slider", className)}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div className="ba-after" style={{ backgroundImage: `url(${item.after_image_url})` }} />
      <div className="ba-before" style={{ backgroundImage: `url(${item.before_image_url})`, clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      <div className="ba-divider" style={{ left: `${pos}%` }}>
        <div className="ba-handle">
          <ChevronLeft size={14} />
          <ChevronRight size={14} />
        </div>
      </div>
      <span className="ba-label ba-label-before">BEFORE</span>
      <span className="ba-label ba-label-after">AFTER</span>
      {showInfo && (
        <div className="ba-info">
          <h3>{item.title}</h3>
          {item.subtitle && <p>{item.subtitle}</p>}
          {item.product_used && <span className="ba-product">Used: {item.product_used}</span>}
        </div>
      )}
    </div>
  );
}

function BeforeAfterSection({ items }: { items: DBBeforeAfter[] }) {
  const [active, setActive] = useState(0);
  if (!items.length) return null;
  return (
    <section className="section ba-section" id="results">
      <SectionHeading eyebrow="REAL RESULTS" title="SEE THE TRANSFORMATION" text="Slide to reveal the before and after results of AMREAL Professional treatments." />
      <div className="ba-wrapper">
        <div className="ba-main">
          <BeforeAfterSlider item={items[active]} />
        </div>
        {items.length > 1 && (
          <div className="ba-thumbs">
            {items.map((item, i) => (
              <button
                key={item.id}
                className={cx("ba-thumb", i === active && "active")}
                onClick={() => setActive(i)}
              >
                <img src={item.before_image_url} alt={item.title} />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const topIngredients = product.ingredients.slice(0, 3);

  return (
    <motion.article className="product-card" whileHover={{ y: -5 }} transition={{ duration: .25 }}>
      <Link to={`/products/${product.slug}`} className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="view-badge">View</span>
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        {product.heroBadge && <span className="hero-tag">{product.heroBadge}</span>}
        <h3>{product.name}</h3>
        
        {/* Micro-Spec Grams */}
        <div className="card-specs-row">
          <span className="card-spec-pill"><Package size={11} /> {product.size}</span>
          <span className="card-spec-pill"><FlaskConical size={11} /> pH 4.5</span>
          <span className="card-spec-pill safety">0% Formaldehyde</span>
        </div>
        
        {topIngredients.length > 0 && (
          <div className="product-card-badges">
            {topIngredients.map((ing, i) => (
              <IngredientBadge key={i} text={ing} variant="compact" />
            ))}
          </div>
        )}

        <div className="product-actions">
          <Link to={`/products/${product.slug}`}>View Product <ArrowRight size={15} /></Link>
          <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>Enquire <ArrowRight size={15} /></Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Hero Product Section: Permanent Hair Spa ────────────────────────────────

function HeroHairSpaSection() {
  const spaImages = [
    { url: "/assets/hair-ritual.jpeg", label: "Packaging", caption: "AMREAL Permanent Hair Spa — 1000 ml Professional Format" },
    { url: "/assets/permanent-spa-before-after.jpg", label: "Before & After", caption: "Instant In-Salon Transformation • Smooth & Frizz-Free" },
    { url: "/assets/permanent-spa-result.jpg", label: "2 Months After", caption: "Long-Lasting Results • Sleek, Manageable Hair Retained for 3–5 Months" },
    { url: "/assets/permanent-spa-texture.jpg", label: "Luxe Texture", caption: "Concentrated Collagen & Keratin Fibre Conditioning Formula" },
    { url: "/assets/permanent-spa-lifestyle.jpg", label: "Salon Ritual", caption: "One Professional Ritual • Customized for All Hair Types" }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="hero-spa-section" id="hero-spa">
      <div className="hero-spa-container">
        <div className="hero-spa-gallery">
          <div className="hero-spa-main-pic">
            <img src={spaImages[activeIdx].url} alt="AMREAL Permanent Hair Spa" />
            <div className="hero-spa-badge-float">
              <Star className="star-icon" size={14} fill="currentColor" />
              <span>AMREAL HERO PRODUCT</span>
            </div>
            <div className="hero-spa-view-caption">
              <span>{spaImages[activeIdx].label}</span>
              <p>{spaImages[activeIdx].caption}</p>
            </div>
          </div>
          <div className="hero-spa-thumbs">
            {spaImages.map((img, i) => (
              <button
                key={i}
                className={cx("hero-spa-thumb", i === activeIdx && "active")}
                onClick={() => setActiveIdx(i)}
                aria-label={`View ${img.label}`}
              >
                <img src={img.url} alt="" />
                <span className="hero-spa-thumb-label">{img.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hero-spa-info">
          <span className="hero-spa-eyebrow">OUR FLAGSHIP HERO RITUAL</span>
          <h2>MORE THAN A<br /><em>HAIR SPA.</em></h2>

          <div className="hero-spa-highlight">
            <div className="hero-spa-highlight-lead">
              <span>3–5 MONTHS</span> OF SMOOTHER, MORE MANAGEABLE HAIR.
            </div>
            <p className="hero-spa-highlight-sub">
              ONE RITUAL. LONG-LASTING RESULTS.
            </p>
          </div>

          {/* Clinical Metrics Infogram */}
          <ClinicalMetricsGram />

          <div className="hero-spa-ingredients-title">
            <span>KEY INGREDIENT TECHNOLOGY</span>
          </div>

          <div className="hero-spa-ingredients-grid">
            <div className="hero-spa-ing-card">
              <div className="ing-icon-box" style={{ background: "#EEF5FA", borderColor: "#C5DCEB" }}>
                {INGREDIENT_META["collagen"].icon}
              </div>
              <div className="hero-spa-ing-info">
                <h5>01 · Collagen Proteins</h5>
                <span>Fibre Conditioning</span>
              </div>
            </div>

            <div className="hero-spa-ing-card">
              <div className="ing-icon-box" style={{ background: "#F6F1F8", borderColor: "#DECDE4" }}>
                {INGREDIENT_META["keratin"].icon}
              </div>
              <div className="hero-spa-ing-info">
                <h5>02 · Hydrolyzed Keratin</h5>
                <span>Smoothness & Manageability</span>
              </div>
            </div>

            <div className="hero-spa-ing-card">
              <div className="ing-icon-box" style={{ background: "#FCF8EC", borderColor: "#E9D9A6" }}>
                {INGREDIENT_META["argan-oil"].icon}
              </div>
              <div className="hero-spa-ing-info">
                <h5>03 · Moroccan Argan Oil</h5>
                <span>Nourishment & Shine</span>
              </div>
            </div>

            <div className="hero-spa-ing-card">
              <div className="ing-icon-box" style={{ background: "#FDF5EE", borderColor: "#F6D8BF" }}>
                {INGREDIENT_META["pro-vitamin-b5"].icon}
              </div>
              <div className="hero-spa-ing-info">
                <h5>04 · Pro-Vitamin B5</h5>
                <span>Softness & Conditioning</span>
              </div>
            </div>
          </div>

          <div className="hero-spa-hairtype-note">
            <span>✨ <b>Suitable for All Hair Types:</b> Personalized according to hair texture, condition & treatment history.</span>
          </div>

          <div className="hero-spa-actions">
            <Button to="/products/permanent-hair-spa">Explore Permanent Hair Spa</Button>
            <Button to="/contact?product=Permanent%20Hair%20Spa" secondary>Enquire for Your Salon</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Home ──────────────────────────────────────────────────────────────────────

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [baItems, setBaItems] = useState<DBBeforeAfter[]>(defaultBeforeAfterItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [prods, ba] = await Promise.all([
        loadProductsData(),
        loadBeforeAfterData(),
      ]);
      const featured = prods.filter(p => p.featured);
      setProducts((featured.length > 0 ? featured : prods.slice(0, 4)).map(dbToProduct));
      setBaItems(ba.filter(b => b.visible));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero /><Marquee />
        <Reveal>
          <section className="intro section">
            <div>
              <span className="eyebrow">AMREAL PROFESSIONAL</span>
              <h2>MORE THAN<br /><em>BEAUTY.</em></h2>
            </div>
            <div className="intro-copy">
              <p>Biomimetic hair science engineered for certified salons. Zero formaldehyde, high-potency protein complexes, and isoelectric cuticle alignment.</p>
              <div className="card-specs-row" style={{ marginTop: "14px", marginBottom: "22px" }}>
                <span className="card-spec-pill"><Sparkles size={11} /> 3–5 Mo Retention</span>
                <span className="card-spec-pill"><FlaskConical size={11} /> pH 4.0–4.5 Seal</span>
                <span className="card-spec-pill safety">0% Formaldehyde</span>
                <span className="card-spec-pill"><Package size={11} /> 1000g Salon Backbar</span>
              </div>
              <Button to="/about">Discover The Science</Button>
            </div>
          </section>
        </Reveal>

        <section className="benefits"><div className="benefits-inner">
          {[
            { num: "01", title: "Biomimetic Sealing", sub: "pH 4.5 Isoelectric Cuticle Lock" },
            { num: "02", title: "Cortex Bond Plex", sub: "Collagen & Keratin Crosslink" },
            { num: "03", title: "3–5 Mo Retention", sub: "Clinical Durability Protocol" },
            { num: "04", title: "1000g Salon Formats", sub: "High-Yield Backbar Formulation" },
            { num: "05", title: "Verified B2B Supply", sub: "0% Formaldehyde Certified" },
          ].map((item) => (
            <div className="benefit" key={item.num}>
              <span>{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.sub}</p>
            </div>
          ))}
        </div></section>

        {/* HERO PRODUCT SPOTLIGHT: PERMANENT HAIR SPA */}
        <HeroHairSpaSection />

        <section className="section cream">
          <SectionHeading eyebrow="THE COLLECTION" title="EXPLORE THE AMREAL COLLECTION" text="Professional beauty categories designed for discovery." />
          <div className="category-grid">
            {staticCategories.map(c => (
              <Link to={`/products?category=${encodeURIComponent(c.name)}`} className="category-card" key={c.name}>
                <img src={c.image} alt={c.name} loading="lazy" />
                <div>
                  <span>{c.name}</span>
                  <p>{c.description}</p>
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeading eyebrow="DISCOVER AMREAL" title="PROFESSIONAL SOLUTIONS" text="Explore the current product list supplied for the AMREAL collection." />
          {loading ? (
            <div className="loading-state"><Loader className="spin" size={28} /><p>Loading products…</p></div>
          ) : products.length ? (
            <div className="product-grid">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
          ) : (
            <div className="empty-state"><p>No featured products yet. Add some in the admin panel.</p></div>
          )}
          <div className="center-button"><Button to="/products">View All Products</Button></div>
        </section>

        {/* Clinical Salon Protocol Diagram */}
        <section className="section cream" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <SectionHeading eyebrow="CLINICAL PROTOCOL" title="THE 3-STEP TRANSFORMATION PROTOCOL" text="Precision salon ritual from clarifying detox to thermo-mechanical cuticle lock." />
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <TreatmentProtocolDiagram />
          </div>
        </section>

        <section className="section blush">
          <SectionHeading eyebrow="DISCOVER YOUR ROUTINE" title="SHOP BY HAIR TYPE" text="Find the professional solution for your hair." />
          <div className="hair-grid">
            {hairTypes.map(h => (
              <Link key={h.name} to={`/products?hairType=${h.name.toLowerCase()}`} className="hair-card">
                <img src={h.image} alt={h.name} />
                <div>
                  <span>{h.name}</span>
                  <p>{h.text}</p>
                  <b>Explore <ArrowRight size={14} /></b>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Before/After Section - after hair type */}
        {baItems.length > 0 && <BeforeAfterSection items={baItems} />}

        <section className="section concern-section">
          <SectionHeading eyebrow="PRODUCT DISCOVERY" title="FIND YOUR PROFESSIONAL SOLUTION" />
          <div className="concern-list">
            {concerns.map(c => (
              <Link key={c} to={`/products?concern=${encodeURIComponent(c)}`}>{c}<ArrowRight size={16} /></Link>
            ))}
          </div>
        </section>

        {/* ACTIVE BIO-TECHNOLOGY GRID (CUSTOM LOGOS) */}
        <section className="tech-showcase-section">
          <SectionHeading
            eyebrow="BIO-ACTIVE TECHNOLOGY"
            title="UNDERSTAND AT ONE SIGHT"
            text="Clean, identifiable bio-actives engineered with clinical precision for professional hair and scalp wellness."
          />
          <div className="tech-showcase-grid">
            <IngredientBadge text="Coconut Oil" variant="card" />
            <IngredientBadge text="Coffee Extract" variant="card" />
            <IngredientBadge text="Hydrolyzed Silk Protein" variant="card" />
            <IngredientBadge text="Collagen Proteins & Plex" variant="card" />
            <IngredientBadge text="Hydrolyzed Keratin" variant="card" />
            <IngredientBadge text="3% Redensyl" variant="card" />
            <IngredientBadge text="Moroccan Argan Oil" variant="card" />
            <IngredientBadge text="Salicylic Acid (BHA)" variant="card" />
          </div>
        </section>

        <section className="full-editorial">
          <div className="full-overlay">
            <span className="eyebrow">AMREAL PROFESSIONAL</span>
            <h2>SCIENCE FOR<br /><em>BEAUTIFUL HAIR.</em></h2>
            <Button to="/contact">Start a Conversation</Button>
          </div>
        </section>

        <section className="business section">
          <SectionHeading eyebrow="FOR PROFESSIONALS" title="CREATED FOR PROFESSIONALS." text="Built around the needs of modern beauty businesses." />
          <div className="business-grid">
            {["SALONS", "BEAUTY PROFESSIONALS", "SPAS", "RETAILERS", "DISTRIBUTORS"].map((x, i) => (
              <div className="business-card" key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <ArrowRight />
              </div>
            ))}
          </div>
          <div className="center-button"><Button>Become an AMREAL Partner</Button></div>
        </section>

        <section className="social section blush">
          <SectionHeading eyebrow="SOCIAL" title="FOLLOW THE AMREAL JOURNEY" text="Explore AMREAL professional treatments and results." />
          <div className="social-grid">
            {["collagen-biotin-masque.jpeg", "coffee-scalp-scrub.jpeg", "hair-ritual.jpeg", "scalp-detox.jpeg", "anti-hairfall-serum.jpeg", "collagen-biotin-masque.jpeg"].map((file, i) => (
              <a href="#" onClick={e => e.preventDefault()} key={`${file}-${i}`} className="social-card">
                <img src={`/assets/${file}`} alt="AMREAL Professional" />
                <span><Instagram size={18} /> View Post</span>
              </a>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div>
            <span className="eyebrow">AMREAL PROFESSIONAL</span>
            <h2>LET'S CREATE BEAUTIFUL RESULTS <em>TOGETHER.</em></h2>
            <p>Looking for professional beauty products for your business?</p>
            <div className="hero-actions">
              <Button>Send an Enquiry</Button>
              <Button to="/products" secondary>Explore Products</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─── Products Page ────────────────────────────────────────────────────────────

function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const category = params.get("category") || "";
  const hairType = params.get("hairType") || "";
  const concern = params.get("concern") || "";

  useEffect(() => {
    loadProductsData().then(prods => {
      setProducts(prods.map(dbToProduct));
      setLoading(false);
    });
  }, []);

  const filtered = products.filter(p => {
    const q = search.toLowerCase().trim();
    return (!q || [p.name, p.category, p.size, p.description, ...p.hairTypes, ...p.concerns, ...p.ingredients].join(" ").toLowerCase().includes(q))
      && (!category || p.category === category)
      && (!hairType || p.hairTypes.map(x => x.toLowerCase()).includes(hairType.toLowerCase()))
      && (!concern || p.concerns.map(x => x.toLowerCase()).includes(concern.toLowerCase()));
  });

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  };

  return (
    <>
      <Navbar />
      <main className="catalogue">
        <section className="catalogue-hero">
          <span className="eyebrow">AMREAL PROFESSIONAL</span>
          <h1>THE AMREAL<br /><em>COLLECTION.</em></h1>
          <p>Professional product discovery for salons, beauty professionals and modern beauty businesses.</p>
        </section>
        <section className="catalogue-body">
          <div className="filter-top">
            <div className="search-box">
              <Search size={18} />
              <input value={search} onChange={e => { setSearch(e.target.value); setFilter("search", e.target.value); }} placeholder="Search products, categories, hair type..." />
            </div>
            <select value={category} onChange={e => setFilter("category", e.target.value)}>
              <option value="">All Categories</option>
              {staticCategories.map(c => <option key={c.name}>{c.name}</option>)}
            </select>
            <select value={hairType} onChange={e => setFilter("hairType", e.target.value)}>
              <option value="">All Hair Types</option>
              {["Coloured", "Curly", "Straight", "Damaged"].map(x => <option key={x} value={x.toLowerCase()}>{x}</option>)}
            </select>
            <select value={concern} onChange={e => setFilter("concern", e.target.value)}>
              <option value="">All Concerns</option>
              {concerns.map(x => <option key={x}>{x}</option>)}
            </select>
          </div>
          <div className="result-line">
            <span>{loading ? "Loading…" : `${filtered.length} products`}</span>
            {(category || hairType || concern || search) && (
              <button onClick={() => { setSearch(""); setParams({}); }}>Clear filters <X size={14} /></button>
            )}
          </div>
          {loading ? (
            <div className="loading-state"><Loader className="spin" size={28} /></div>
          ) : (
            <div className="product-grid catalog-grid">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
          )}
          {!loading && !filtered.length && (
            <div className="empty-state"><h3>No products found.</h3><p>Try a different search or filter.</p></div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─── Product Detail ───────────────────────────────────────────────────────────

function getProductSliderItem(product: Product, gallery: string[]): DBBeforeAfter {
  const nameLower = product.name.toLowerCase();
  const slugLower = product.slug.toLowerCase();

  if (slugLower.includes("permanent-hair-spa") || nameLower.includes("hair spa")) {
    return {
      id: 1,
      title: "Permanent Hair Spa Transformation",
      subtitle: "One Ritual • 3–5 Months Smoothness & Frizz-Free Manageability",
      before_image_url: "/assets/permanent-spa-before-after.jpg",
      after_image_url: "/assets/permanent-spa-result.jpg",
      product_used: "AMREAL Permanent Hair Spa (1000 ml)",
      sort_order: 1,
      visible: true,
      created_at: new Date().toISOString()
    };
  }
  if (slugLower.includes("coffee") || slugLower.includes("scrub") || nameLower.includes("scrub")) {
    return {
      id: 2,
      title: "Coffee Scalp Scrub No. 2 Exfoliation",
      subtitle: "Flake Elimination & Root Purification Result",
      before_image_url: "/assets/coffee-scrub-detail.jpg",
      after_image_url: "/assets/scalp-detox.jpeg",
      product_used: "AMREAL Coffee Scalp Scrub — No.2",
      sort_order: 2,
      visible: true,
      created_at: new Date().toISOString()
    };
  }
  if (slugLower.includes("silk") || nameLower.includes("silk")) {
    return {
      id: 3,
      title: "Silk Protein Collagen Therapy",
      subtitle: "Intense Frizz Elimination & Mirror Silkiness",
      before_image_url: "/assets/permanent-spa-texture.jpg",
      after_image_url: "/assets/nanoplastia-treatment.jpg",
      product_used: "Silk Protein Collagen Therapy",
      sort_order: 3,
      visible: true,
      created_at: new Date().toISOString()
    };
  }
  if (slugLower.includes("nanoplastia") || nameLower.includes("nanoplastia")) {
    return {
      id: 4,
      title: "Nanoplastia Fibre Realignment",
      subtitle: "Deep Amino Acid Alignment & Mirror Gloss",
      before_image_url: "/assets/permanent-spa-before-after.jpg",
      after_image_url: "/assets/nanoplastia-treatment.jpg",
      product_used: "AMREAL Nanoplastia Treatment",
      sort_order: 4,
      visible: true,
      created_at: new Date().toISOString()
    };
  }
  if (slugLower.includes("tonic") || slugLower.includes("hairfall") || nameLower.includes("hairfall")) {
    return {
      id: 5,
      title: "Anti-Hairfall Follicle Vitality",
      subtitle: "Targeted Scalp & DHT-Pathway Follicle Density",
      before_image_url: "/assets/anti-hairfall-tonic-lifestyle.jpg",
      after_image_url: "/assets/anti-hairfall-serum.jpeg",
      product_used: "AMREAL Anti-Hairfall Scalp Tonic",
      sort_order: 5,
      visible: true,
      created_at: new Date().toISOString()
    };
  }
  if (slugLower.includes("masque") || slugLower.includes("collagen-plex") || nameLower.includes("masque")) {
    return {
      id: 6,
      title: "Collagen Plex Biotin Masque Recovery",
      subtitle: "Restorative Fibre Repair & Cuticle Realignment",
      before_image_url: "/assets/permanent-spa-before-after.jpg",
      after_image_url: "/assets/permanent-spa-result.jpg",
      product_used: product.name,
      sort_order: 6,
      visible: true,
      created_at: new Date().toISOString()
    };
  }
  return {
    id: 99,
    title: `${product.name} Transformation Result`,
    subtitle: "Before & After Clinical Comparison",
    before_image_url: gallery[1] || "/assets/permanent-spa-before-after.jpg",
    after_image_url: gallery[2] || gallery[0] || "/assets/permanent-spa-result.jpg",
    product_used: product.name,
    sort_order: 99,
    visible: true,
    created_at: new Date().toISOString()
  };
}

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isSliderMode, setIsSliderMode] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await loadProductsData();
      const mapped = all.map(dbToProduct);
      const found = mapped.find(p => p.slug === slug);
      setProduct(found || null);
      setAllProducts(mapped);
      setLoading(false);
      setPage([0, 0]);
      setIsSliderMode(true);
    }
    load();
  }, [slug]);

  const gallery = product ? (product.gallery && product.gallery.length ? product.gallery : [product.image]).slice(0, 5) : [];

  // Determine which slide is the connected Transformation Result slide (slot 2 or first containing before-after / result / detail)
  const resultIndex = (() => {
    if (!gallery.length) return 0;
    const found = gallery.findIndex(img => 
      img.includes("before-after") || 
      img.includes("result") || 
      img.includes("detail")
    );
    if (found !== -1) return found;
    return gallery.length > 1 ? 1 : 0;
  })();

  const isResultSlide = page === resultIndex;
  const sliderItem = product ? getProductSliderItem(product, gallery) : null;

  const paginate = (newDirection: number) => {
    if (!gallery.length) return;
    const nextIndex = (page + newDirection + gallery.length) % gallery.length;
    setPage([nextIndex, newDirection]);
  };

  const jumpTo = (newIndex: number) => {
    if (newIndex === page || !gallery.length) return;
    const dir = newIndex > page ? 1 : -1;
    setPage([newIndex, dir]);
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [page, gallery.length]);

  if (loading) return <><Navbar /><div className="loading-state full"><Loader className="spin" size={36} /></div></>;
  if (!product) return <NotFound />;

  const related = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  const getSlotLabel = (idx: number, isResult: boolean) => {
    if (isResult) return "Result Slider ✨";
    if (idx === 0) return "Product Pack";
    if (idx === 2) return "Clinical Finish";
    if (idx === 3) return "Luxe Texture";
    if (idx === 4) return "Salon Ritual";
    return `Picture 0${idx + 1}`;
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 55 : -55,
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.35, ease: "easeOut" },
        filter: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -55 : 55,
      opacity: 0,
      scale: 1.04,
      filter: "blur(6px)",
      transition: {
        x: { duration: 0.24, ease: "easeInOut" },
        opacity: { duration: 0.2 },
        scale: { duration: 0.24 },
        filter: { duration: 0.2 }
      }
    })
  };

  return (
    <>
      <Navbar />
      <main className="detail">
        <div className="detail-gallery">
          {/* Main Visual Frame with Smooth Animation */}
          <div className="detail-main-frame">
            {/* Top Pill: Counter & Status */}
            <div className="detail-counter-pill">
              <span className="counter-digits">{String(page + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
              {isResultSlide && (
                <span className="counter-badge-result">
                  <Sparkles size={11} /> Connected Result Slider
                </span>
              )}
            </div>

            {/* If on result slide: allow toggling between interactive slider and full static image */}
            {isResultSlide && sliderItem && (
              <div className="detail-result-toolbar">
                <button
                  type="button"
                  className={cx("detail-mode-toggle", isSliderMode && "active")}
                  onClick={() => setIsSliderMode(!isSliderMode)}
                  title="Toggle interactive comparison slider"
                >
                  <Sparkles size={13} />
                  <span>{isSliderMode ? "Interactive Slider Active" : "View Static Image"}</span>
                </button>
              </div>
            )}

            {/* Quick jump to result slider if on another picture */}
            {!isResultSlide && gallery.length > 1 && (
              <button
                type="button"
                className="detail-quick-result-cta"
                onClick={() => jumpTo(resultIndex)}
                title="View Before & After Result Slider"
              >
                <Sparkles size={12} />
                <span>Jump to Result Slider ({String(resultIndex + 1).padStart(2, "0")})</span>
              </button>
            )}

            {/* Animated Active Image or Interactive Slider */}
            <div className="detail-viewport">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="detail-slide-content"
                >
                  {isResultSlide && isSliderMode && sliderItem ? (
                    <div className="detail-embedded-slider">
                      <BeforeAfterSlider item={sliderItem} showInfo={false} />
                    </div>
                  ) : (
                    <img
                      src={gallery[page] || product.image}
                      alt={`${product.name} - Picture ${page + 1}`}
                      className="detail-image"
                      loading="eager"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Guidance hint when slider is active */}
            {isResultSlide && isSliderMode && (
              <div className="detail-slider-hint">
                <ArrowLeftRight size={13} />
                <span>Drag divider left & right to reveal before & after result</span>
              </div>
            )}

            {/* Prev / Next Directional Chevrons */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className="detail-nav-arrow prev"
                  onClick={() => paginate(-1)}
                  aria-label="Previous product picture"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="detail-nav-arrow next"
                  onClick={() => paginate(1)}
                  aria-label="Next product picture"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Up to 5 Thumbnails with Animated Indicator */}
          <div className="detail-thumbnails-row">
            {gallery.map((x, i) => {
              const isThisResult = i === resultIndex;
              const isActive = i === page;
              return (
                <button
                  key={`${x}-${i}`}
                  type="button"
                  className={cx(
                    "detail-thumb-card",
                    isActive && "active",
                    isThisResult && "is-result"
                  )}
                  onClick={() => jumpTo(i)}
                  title={getSlotLabel(i, isThisResult)}
                >
                  <div className="detail-thumb-img-box">
                    <img src={x} alt="" />
                    {isThisResult && (
                      <span className="thumb-star-pill" title="Connected to Result Slider">
                        <Sparkles size={10} />
                      </span>
                    )}
                  </div>
                  <span className="detail-thumb-caption">
                    <span className="thumb-idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="thumb-text">{getSlotLabel(i, isThisResult)}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeDetailThumbIndicator"
                      className="detail-thumb-glow-border"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="detail-copy">
          <span className="product-category">{product.category}</span>
          {product.heroBadge && <span className="hero-tag">{product.heroBadge}</span>}
          <h1>{product.name}</h1>

          {/* Technical Specs Bar */}
          <ProductTechSpecsBar size={product.size} category={product.category} tagline={product.tagline} />

          <p className="lead" style={{ margin: "16px 0 20px" }}>{product.description}</p>

          {/* Microscopic Cuticle Realignment Infogram */}
          <CuticleDiagram />

          {/* Active Ingredients & Technology with SVG Logos */}
          <div className="detail-ingredients-wrap">
            <h3 style={{ fontSize: "14px", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "12px", color: "var(--charcoal)", display: "flex", alignItems: "center", gap: "8px" }}>
              <FlaskConical size={16} color="#8C3E4C" />
              <span>Active Bio-Technological Compounds</span>
            </h3>
            <div className="detail-ingredients-grid">
              {product.ingredients.map((ing, idx) => (
                <IngredientBadge key={idx} text={ing} variant="card" />
              ))}
            </div>
          </div>

          {/* Hair Diagnostic & Compatibility Matrix */}
          <HairDiagnosticGram
            hairTypes={product.hairTypes}
            concerns={product.concerns}
            suitableFor={product.suitableFor}
          />

          {/* 3-Step Treatment Protocol Diagram */}
          <TreatmentProtocolDiagram />

          <Button to={`/contact?product=${encodeURIComponent(product.name)}`}>Enquire About This Product</Button>
        </div>
      </main>
      {related.length > 0 && (
        <section className="section cream">
          <SectionHeading eyebrow="RELATED PRODUCTS" title="COMPLETE YOUR PROFESSIONAL ROUTINE" />
          <div className="product-grid">{related.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
      <Footer />
    </>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [params] = useSearchParams();
  const [sent, setSent] = useState(false);
  const product = params.get("product") || "";
  if (sent) return <><Navbar /><Success title="THANK YOU FOR YOUR ENQUIRY." text="Your enquiry has been captured in this demo. Connect the form to the AMREAL backend/API for production use." /><Footer /></>;
  return (
    <>
      <Navbar />
      <main className="form-page">
        <div className="form-intro">
          <span className="eyebrow">CONTACT AMREAL</span>
          <h1>LET'S TALK<br /><em>BEAUTY.</em></h1>
          <p>Tell us about your business and professional product requirements.</p>
          <div className="contact-details">
            <span><Mail /> hello@amrealprofessional.com</span>
            <span><Phone /> +91 00000 00000</span>
            <span><MapPin /> India</span>
          </div>
        </div>
        <form className="premium-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <div className="form-grid">
            <label>Full Name<input required placeholder="Your name" /></label>
            <label>Business Name<input placeholder="Salon / Business name" /></label>
            <label>Phone<input required placeholder="+91" /></label>
            <label>Email<input type="email" placeholder="you@example.com" /></label>
            <label>City<input placeholder="City" /></label>
            <label>Business Type<select><option>Salon</option><option>Beauty Professional</option><option>Spa</option><option>Retailer</option><option>Distributor</option></select></label>
          </div>
          <label>Selected Product<input defaultValue={product} placeholder="Product name" /></label>
          <label>Estimated Requirement<input placeholder="e.g. monthly requirement" /></label>
          <label>Message<textarea required rows={6} placeholder="Tell us what you need..." /></label>
          <button className="button" type="submit">Send Enquiry <ArrowRight size={16} /></button>
        </form>
      </main>
      <Footer />
    </>
  );
}

// ─── Feedback ────────────────────────────────────────────────────────────────

function Feedback() {
  const [sent, setSent] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {
    loadProductsData().then(prods => setAllProducts(prods.map(dbToProduct)));
  }, []);
  if (sent) return <><Navbar /><Success title="THANK YOU FOR SHARING." text="Your feedback helps improve the AMREAL experience." /><Footer /></>;
  return (
    <>
      <Navbar />
      <main className="form-page single">
        <div className="form-intro">
          <span className="eyebrow">YOUR EXPERIENCE MATTERS</span>
          <h1>SHARE YOUR<br /><em>FEEDBACK.</em></h1>
          <p>Help us make the AMREAL professional experience better.</p>
        </div>
        <form className="premium-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <label>Name<input required /></label>
          <label>Business Name<input /></label>
          <label>Email<input type="email" /></label>
          <label>Phone<input /></label>
          <label>Product<select>{allProducts.map(p => <option key={p.id}>{p.name} — {p.size}</option>)}</select></label>
          <label>Rating<div className="rating-input">{[1, 2, 3, 4, 5].map(n => <button type="button" key={n}><Star size={24} /></button>)}</div></label>
          <label>Feedback<textarea required rows={6} /></label>
          <label>Would you recommend AMREAL?<select><option>Yes</option><option>Maybe</option><option>No</option></select></label>
          <button className="button">Share Feedback <ArrowRight size={16} /></button>
        </form>
      </main>
      <Footer />
    </>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <>
      <Navbar />
      <main>
        <section className="about-hero">
          <span className="eyebrow">ABOUT AMREAL</span>
          <h1>PROFESSIONAL BEAUTY,<br /><em>REFINED.</em></h1>
          <p>AMREAL Professional is positioned as a premium professional beauty brand serving salons, beauty professionals, spas, retailers and distributors.</p>
        </section>
        <section className="section about-split">
          <div className="about-photo"><img src={heroSlides[1].image} alt="Professional beauty demo" /></div>
          <div>
            <span className="eyebrow">THE EXPERIENCE</span>
            <h2>PRODUCT.<br /><em>PROFESSIONAL.</em><br />PERSONAL.</h2>
            <p>The digital experience is designed around product discovery, professional enquiries, customer relationships and appointments rather than conventional ecommerce checkout.</p>
            <Button to="/products">Explore the Collection</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─── Misc Pages ───────────────────────────────────────────────────────────────

function Success({ title, text }: { title: string; text: string }) {
  return (
    <section className="success">
      <div className="success-icon"><Check /></div>
      <span className="eyebrow">AMREAL PROFESSIONAL</span>
      <h1>{title}</h1>
      <p>{text}</p>
      <Button to="/">Return Home</Button>
    </section>
  );
}

function NotFound() {
  return (
    <>
      <Navbar />
      <section className="success">
        <span className="eyebrow">404</span>
        <h1>THIS PAGE HAS <em>MOVED.</em></h1>
        <p>The page you requested could not be found.</p>
        <Button to="/">Return Home</Button>
      </section>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link className="logo" to="/"><BrandLogo dark /></Link>
          <p>SCIENCE FOR BEAUTIFUL HAIR.</p>
        </div>
        <div>
          <span className="footer-title">Explore</span>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <div>
          <span className="footer-title">Connect</span>
          <Link to="/contact">Business Enquiry</Link>
          <a href="mailto:hello@amrealprofessional.com">Email</a>
          <a href="tel:+910000000000">Phone</a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <a href="#" onClick={e => e.preventDefault()}><Instagram size={17} /> Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AMREAL Professional. Demo website.</span>
        <span>No cart • No checkout • Enquiry-led experience</span>
      </div>
    </footer>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

function useAdminAuth() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("amreal_admin") === "1");
  const login = (pw: string) => {
    const valid = ["amreal2026", "admin", "amreal", "amreal2025"];
    if (valid.includes(pw.trim())) {
      sessionStorage.setItem("amreal_admin", "1");
      setAuthed(true);
      return true;
    }
    return false;
  };
  const logout = () => { sessionStorage.removeItem("amreal_admin"); setAuthed(false); };
  return { authed, login, logout };
}

function AdminLogin({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <BrandLogo dark />
        <h1>Admin Panel</h1>
        <p>Enter your admin password to continue.</p>
        <form onSubmit={e => { e.preventDefault(); if (!onLogin(pw)) setErr(true); }}>
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(false); }} placeholder="Password (e.g. admin or amreal)" autoFocus />
          {err && <span className="admin-error"><AlertCircle size={14} /> Incorrect password</span>}
          <button className="button" type="submit">Sign In <ArrowRight size={15} /></button>
        </form>
        <Link to="/" className="admin-back">← Back to website</Link>
      </div>
    </div>
  );
}

// ─── Direct Image File Uploaders ──────────────────────────────────────────────

function DirectImageUpload({
  label,
  value,
  onChange,
  aspectRatio = "4 / 3",
  badge,
  helpText = "Upload direct image file from your device (JPG, PNG, WEBP)",
}: {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  aspectRatio?: string;
  badge?: string;
  helpText?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WEBP, etc.)");
      return;
    }
    setLoading(true);
    try {
      const result = await processDirectImageFile(file);
      onChange(result);
    } catch (err) {
      console.error("Error processing image file:", err);
      alert("Could not process image file. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="direct-uploader-field">
      <div className="direct-uploader-header">
        <label className="admin-label">{label}</label>
        {badge && <span className="direct-uploader-badge">{badge}</span>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />

      {loading ? (
        <div className="direct-uploader-loading">
          <Loader className="spin" size={24} />
          <span>Processing direct image file…</span>
        </div>
      ) : value ? (
        <div className="direct-uploader-preview-wrap">
          <div className="direct-uploader-preview" style={{ aspectRatio }}>
            <img src={value} alt="Preview" />
          </div>
          <div className="direct-uploader-actions">
            <button
              type="button"
              className="button button-small"
              onClick={() => inputRef.current?.click()}
            >
              <Upload size={14} /> Change Image File
            </button>
            <button
              type="button"
              className="button button-small button-secondary"
              style={{ color: "#c0392b", borderColor: "rgba(192, 57, 43, 0.3)" }}
              onClick={() => onChange("")}
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={cx("direct-uploader-dropzone", dragOver && "drag-over")}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className="direct-uploader-icon">
            <Upload size={20} />
          </div>
          <div className="direct-uploader-text">
            <strong>Click to select direct image file</strong> or drag &amp; drop
          </div>
          <span className="direct-uploader-hint">{helpText}</span>
          <button
            type="button"
            className="button button-small"
            style={{ marginTop: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            <FolderOpen size={14} /> Browse Image File
          </button>
        </div>
      )}
    </div>
  );
}

const MAX_GALLERY_IMAGES = 5;

function DirectGalleryUpload({
  label = "Product Pictures (Up to 5 Pictures)",
  values,
  onChange,
}: {
  label?: string;
  values: string[];
  onChange: (vals: string[]) => void;
}) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (!validFiles.length) return;
    const remainingSlots = Math.max(0, MAX_GALLERY_IMAGES - values.length);
    if (remainingSlots <= 0) return;

    setLoading(true);
    try {
      const toProcess = validFiles.slice(0, remainingSlots);
      const processed = await Promise.all(toProcess.map(f => processDirectImageFile(f)));
      onChange([...values, ...processed].slice(0, MAX_GALLERY_IMAGES));
    } catch (err) {
      console.error("Error processing gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeAt = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: number) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= values.length) return;
    const copy = [...values];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    onChange(copy);
  };

  const getSlotDescription = (idx: number) => {
    if (idx === 0) return "Slot 1: Main Pack";
    if (idx === 1) return "Slot 2: Result Slider ✨";
    if (idx === 2) return "Slot 3: Clinical Finish";
    if (idx === 3) return "Slot 4: Luxe Texture";
    if (idx === 4) return "Slot 5: Salon Ritual";
    return `Picture 0${idx + 1}`;
  };

  const isFull = values.length >= MAX_GALLERY_IMAGES;

  return (
    <div className="direct-gallery-field">
      <div className="direct-uploader-header">
        <div>
          <label className="admin-label">{label}</label>
          <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>
            Up to 5 pictures allowed. Slot 2 connects directly to the interactive Before/After comparison slider.
          </p>
        </div>
        <span className={cx("direct-gallery-count", isFull && "max-reached")}>
          {values.length} / {MAX_GALLERY_IMAGES} pictures {isFull ? "(Max reached)" : ""}
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        disabled={isFull}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
            e.target.value = "";
          }
        }}
      />

      <div className="direct-gallery-grid">
        {values.map((url, i) => (
          <div key={i} className={cx("direct-gallery-item", i === 1 && "is-result-slot")}>
            <img src={url} alt={`Picture ${i + 1}`} />
            <div className="direct-gallery-slot-badge">
              {i === 1 ? "✨ Slot 2 (Result Slider)" : `Slot ${i + 1}`}
            </div>
            <div className="direct-gallery-item-actions">
              {i > 0 && (
                <button
                  type="button"
                  className="direct-gallery-reorder-btn"
                  title="Move earlier"
                  onClick={() => moveItem(i, -1)}
                >
                  <ChevronLeft size={12} />
                </button>
              )}
              {i < values.length - 1 && (
                <button
                  type="button"
                  className="direct-gallery-reorder-btn"
                  title="Move later"
                  onClick={() => moveItem(i, 1)}
                >
                  <ChevronRight size={12} />
                </button>
              )}
              <button
                type="button"
                className="direct-gallery-remove"
                title="Remove picture"
                onClick={() => removeAt(i)}
              >
                <X size={12} />
              </button>
            </div>
            <span className="direct-gallery-sublabel">{getSlotDescription(i)}</span>
          </div>
        ))}

        {!isFull && (
          <button
            type="button"
            className="direct-gallery-add-btn"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
          >
            {loading ? (
              <Loader className="spin" size={20} />
            ) : (
              <>
                <Plus size={20} />
                <span>Add Picture ({MAX_GALLERY_IMAGES - values.length} remaining)</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Admin: Products Tab ─────────────────────────────────────────────────────

const HAIR_TYPE_OPTIONS = ["Straight", "Curly", "Coloured", "Damaged", "Wavy", "Thick", "Fine"];
const CONCERN_OPTIONS = concerns;
const CATEGORY_OPTIONS = ["Haircare", "Hair Treatments", "Scalp Care", "Skincare", "Professional Essentials"];

const EMPTY_PRODUCT: Partial<DBProduct> = {
  name: "", slug: "", size: "", category: "Haircare", description: "",
  image_url: "", gallery_urls: [], hair_types: [], concerns: [],
  ingredients: [], benefits: [], suitable_for: [], featured: false,
};

function TagInput({ label, value, onChange, options }: { label: string; value: string[]; onChange: (v: string[]) => void; options?: string[] }) {
  const [input, setInput] = useState("");
  const add = (tag: string) => { const t = tag.trim(); if (t && !value.includes(t)) onChange([...value, t]); setInput(""); };
  const remove = (tag: string) => onChange(value.filter(x => x !== tag));
  return (
    <div className="admin-tag-input">
      <label className="admin-label">{label}</label>
      <div className="admin-tags">
        {value.map(t => <span key={t} className="admin-tag">{t}<button type="button" onClick={() => remove(t)}><X size={11} /></button></span>)}
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(input); } }} placeholder="Type and press Enter" />
      </div>
      {options && (
        <div className="admin-tag-options">
          {options.filter(o => !value.includes(o)).map(o => (
            <button type="button" key={o} onClick={() => add(o)} className="admin-tag-opt">{o}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminProducts() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<DBProduct> | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function reload() {
    setLoading(true);
    const data = await loadProductsData();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => { reload(); }, []);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  }

  async function save() {
    if (!editing) return;
    if (!editing.name?.trim()) {
      flash("err", "Product name is required.");
      return;
    }
    if (!editing.image_url) {
      flash("err", "Please select a main product image file.");
      return;
    }
    setSaving(true);
    const payload: Partial<DBProduct> = {
      ...editing,
      slug: editing.slug || slugify(editing.name || ""),
      gallery_urls: editing.gallery_urls?.length ? editing.gallery_urls : [editing.image_url],
    };
    const res = await saveProductData(payload);
    if (!res.ok && res.error) {
      flash("err", `Saved locally, but remote error: ${res.error}`);
    } else {
      flash("ok", payload.id ? "Product updated successfully!" : "Product added successfully!");
    }
    setSaving(false);
    setEditing(null);
    reload();
  }

  async function deleteProduct(id: number) {
    await deleteProductData(id);
    setDeleteId(null);
    reload();
    flash("ok", "Product removed.");
  }

  async function toggleFeatured(p: DBProduct) {
    await toggleProductFeaturedData(p.id, !p.featured);
    reload();
  }

  function edit(p: DBProduct) { setEditing({ ...p }); }
  function newProduct() { setEditing({ ...EMPTY_PRODUCT }); }

  return (
    <div className="admin-tab">
      {msg && <div className={`admin-flash ${msg.type}`}>{msg.type === "ok" ? <Check size={15} /> : <AlertCircle size={15} />}{msg.text}</div>}

      <div className="admin-tab-header">
        <h2>Products</h2>
        <button className="button button-small" onClick={newProduct}><Plus size={14} /> Add Product</button>
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="admin-form-panel">
          <div className="admin-form-title">
            <h3>{editing.id ? "Edit Product" : "New Product"}</h3>
            <button className="icon-btn" onClick={() => setEditing(null)}><X /></button>
          </div>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label className="admin-label">Name *</label>
              <input className="admin-input" value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value, slug: slugify(e.target.value) })} placeholder="Product name" />
            </div>
            <div className="admin-field">
              <label className="admin-label">Size</label>
              <input className="admin-input" value={editing.size || ""} onChange={e => setEditing({ ...editing, size: e.target.value })} placeholder="e.g. 300 ml" />
            </div>
            <div className="admin-field">
              <label className="admin-label">Category</label>
              <select className="admin-input" value={editing.category || ""} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-label">Slug</label>
              <input className="admin-input" value={editing.slug || ""} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-generated" />
            </div>
            <div className="admin-field admin-field-wide">
              <label className="admin-label">Description</label>
              <textarea className="admin-input" rows={3} value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Short description" />
            </div>

            {/* Direct Image File Uploaders */}
            <div className="admin-field admin-field-wide">
              <DirectImageUpload
                label="Product Main Image File *"
                value={editing.image_url || ""}
                onChange={(val) => setEditing({ ...editing, image_url: val })}
                aspectRatio="1 / 1"
                helpText="Select direct image file from your computer (JPG, PNG, WEBP)"
              />
            </div>
            <div className="admin-field admin-field-wide">
              <DirectGalleryUpload
                label="Gallery Image Files"
                values={editing.gallery_urls || []}
                onChange={(vals) => setEditing({ ...editing, gallery_urls: vals })}
              />
            </div>
          </div>
          <TagInput label="Hair Types" value={editing.hair_types || []} onChange={v => setEditing({ ...editing, hair_types: v })} options={HAIR_TYPE_OPTIONS} />
          <TagInput label="Concerns" value={editing.concerns || []} onChange={v => setEditing({ ...editing, concerns: v })} options={CONCERN_OPTIONS} />
          <TagInput label="Ingredients" value={editing.ingredients || []} onChange={v => setEditing({ ...editing, ingredients: v })} />
          <TagInput label="Benefits" value={editing.benefits || []} onChange={v => setEditing({ ...editing, benefits: v })} />
          <TagInput label="Suitable For" value={editing.suitable_for || []} onChange={v => setEditing({ ...editing, suitable_for: v })} />
          <div className="admin-field">
            <label className="admin-checkbox">
              <input type="checkbox" checked={!!editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} />
              Show on Homepage (Featured)
            </label>
          </div>
          <div className="admin-form-actions">
            <button className="button" onClick={save} disabled={saving}>{saving ? <Loader className="spin" size={14} /> : <Save size={14} />}{saving ? "Saving…" : "Save Product"}</button>
            <button className="button button-secondary" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <div className="admin-loading"><Loader className="spin" size={28} /></div>
      ) : (
        <div className="admin-product-list">
          {products.map(p => (
            <div key={p.id} className="admin-product-row">
              <div className="admin-product-img">
                {p.image_url ? <img src={p.image_url} alt={p.name} /> : <div className="admin-img-placeholder"><ImageIcon size={20} /></div>}
              </div>
              <div className="admin-product-info">
                <strong>{p.name}</strong>
                <span>{p.category} · {p.size}</span>
              </div>
              <div className="admin-product-actions">
                <button title="Toggle featured" className={cx("icon-btn", p.featured && "active")} onClick={() => toggleFeatured(p)}>
                  {p.featured ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button title="Edit" className="icon-btn" onClick={() => edit(p)}><Edit3 size={16} /></button>
                <button title="Delete" className="icon-btn danger" onClick={() => setDeleteId(p.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {!products.length && <p className="admin-empty">No products yet. Click "Add Product" to get started.</p>}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Delete Product?</h3>
            <p>This action cannot be undone.</p>
            <div className="admin-modal-actions">
              <button className="button" style={{ background: "#c0392b", borderColor: "#c0392b" }} onClick={() => deleteProduct(deleteId)}>Delete</button>
              <button className="button button-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Admin: Before/After Tab ─────────────────────────────────────────────────

const EMPTY_BA: Partial<DBBeforeAfter> = {
  title: "", subtitle: "", before_image_url: "", after_image_url: "",
  product_used: "", sort_order: 0, visible: true,
};

function AdminBeforeAfter() {
  const [items, setItems] = useState<DBBeforeAfter[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<DBBeforeAfter> | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function reload() {
    setLoading(true);
    const data = await loadBeforeAfterData();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { reload(); }, []);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  }

  async function save() {
    if (!editing) return;
    if (!editing.title?.trim()) {
      flash("err", "Title is required.");
      return;
    }
    if (!editing.before_image_url) {
      flash("err", "Please choose a BEFORE image file.");
      return;
    }
    if (!editing.after_image_url) {
      flash("err", "Please choose an AFTER image file.");
      return;
    }
    setSaving(true);
    const res = await saveBeforeAfterData(editing);
    if (!res.ok && res.error) {
      flash("err", `Saved locally, but remote error: ${res.error}`);
    } else {
      flash("ok", editing.id ? "Slide updated successfully!" : "Slide added successfully!");
    }
    setSaving(false);
    setEditing(null);
    reload();
  }

  async function toggleVisible(item: DBBeforeAfter) {
    await toggleBeforeAfterVisibilityData(item.id, !item.visible);
    reload();
  }

  async function deleteItem(id: number) {
    await deleteBeforeAfterData(id);
    setDeleteId(null);
    reload();
    flash("ok", "Slide deleted.");
  }

  return (
    <div className="admin-tab">
      {msg && <div className={`admin-flash ${msg.type}`}>{msg.type === "ok" ? <Check size={15} /> : <AlertCircle size={15} />}{msg.text}</div>}

      <div className="admin-tab-header">
        <h2>Before / After Slides</h2>
        <button className="button button-small" onClick={() => setEditing({ ...EMPTY_BA })}><Plus size={14} /> Add Slide</button>
      </div>

      {editing && (
        <div className="admin-form-panel">
          <div className="admin-form-title">
            <h3>{editing.id ? "Edit Slide" : "New Slide"}</h3>
            <button className="icon-btn" onClick={() => setEditing(null)}><X /></button>
          </div>
          <div className="admin-form-grid">
            <div className="admin-field admin-field-wide">
              <label className="admin-label">Title *</label>
              <input className="admin-input" value={editing.title || ""} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. Collagen Treatment Result" />
            </div>
            <div className="admin-field admin-field-wide">
              <label className="admin-label">Subtitle</label>
              <input className="admin-input" value={editing.subtitle || ""} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} placeholder="e.g. 4-week treatment" />
            </div>

            {/* Direct Image File Uploads */}
            <div className="admin-field admin-field-wide">
              <div className="admin-ba-upload-grid">
                <DirectImageUpload
                  label="Before Image File *"
                  badge="BEFORE"
                  value={editing.before_image_url || ""}
                  onChange={(val) => setEditing({ ...editing, before_image_url: val })}
                  aspectRatio="4 / 3"
                  helpText="Select direct image file of condition BEFORE treatment"
                />
                <DirectImageUpload
                  label="After Image File *"
                  badge="AFTER"
                  value={editing.after_image_url || ""}
                  onChange={(val) => setEditing({ ...editing, after_image_url: val })}
                  aspectRatio="4 / 3"
                  helpText="Select direct image file of result AFTER treatment"
                />
              </div>
            </div>

            {/* Live Slider Preview right inside the Admin Form */}
            {editing.before_image_url && editing.after_image_url && (
              <div className="admin-field admin-field-wide">
                <label className="admin-label">Live Slider Preview</label>
                <div style={{ maxWidth: 520, marginTop: 8 }}>
                  <BeforeAfterSlider
                    item={{
                      id: 0,
                      title: editing.title || "Preview Transformation",
                      subtitle: editing.subtitle || "Result preview",
                      before_image_url: editing.before_image_url,
                      after_image_url: editing.after_image_url,
                      product_used: editing.product_used || "",
                      sort_order: 0,
                      visible: true,
                      created_at: ""
                    }}
                  />
                </div>
              </div>
            )}

            <div className="admin-field">
              <label className="admin-label">Product Used</label>
              <input className="admin-input" value={editing.product_used || ""} onChange={e => setEditing({ ...editing, product_used: e.target.value })} placeholder="e.g. Collagen Biotin Masque" />
            </div>
            <div className="admin-field">
              <label className="admin-label">Sort Order</label>
              <input className="admin-input" type="number" value={editing.sort_order ?? 0} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-checkbox">
              <input type="checkbox" checked={!!editing.visible} onChange={e => setEditing({ ...editing, visible: e.target.checked })} />
              Visible on website
            </label>
          </div>
          <div className="admin-form-actions">
            <button className="button" onClick={save} disabled={saving}>{saving ? <Loader className="spin" size={14} /> : <Save size={14} />}{saving ? "Saving…" : "Save Slide"}</button>
            <button className="button button-secondary" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="admin-loading"><Loader className="spin" size={28} /></div>
      ) : (
        <div className="admin-product-list">
          {items.map(item => (
            <div key={item.id} className="admin-product-row">
              <div className="admin-ba-preview">
                <img src={item.before_image_url} alt="before" />
                <img src={item.after_image_url} alt="after" />
              </div>
              <div className="admin-product-info">
                <strong>{item.title}</strong>
                <span>{item.subtitle || "No subtitle"} {item.product_used ? `· ${item.product_used}` : ""}</span>
                <span className={cx("admin-badge", item.visible ? "visible" : "hidden")}>{item.visible ? "Visible" : "Hidden"}</span>
              </div>
              <div className="admin-product-actions">
                <button title="Toggle visibility" className={cx("icon-btn", item.visible && "active")} onClick={() => toggleVisible(item)}>
                  {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button title="Edit" className="icon-btn" onClick={() => setEditing({ ...item })}><Edit3 size={16} /></button>
                <button title="Delete" className="icon-btn danger" onClick={() => setDeleteId(item.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {!items.length && <p className="admin-empty">No slides yet. Click "Add Slide" to create your first before/after.</p>}
        </div>
      )}

      {deleteId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Delete Slide?</h3>
            <p>This action cannot be undone.</p>
            <div className="admin-modal-actions">
              <button className="button" style={{ background: "#c0392b", borderColor: "#c0392b" }} onClick={() => deleteItem(deleteId)}>Delete</button>
              <button className="button button-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Admin Shell ─────────────────────────────────────────────────────────────

function Admin() {
  const { authed, login, logout } = useAdminAuth();
  const [tab, setTab] = useState<"products" | "beforeafter">("products");
  if (!authed) return <AdminLogin onLogin={login} />;
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <BrandLogo dark />
          <span className="admin-sidebar-label">Admin</span>
        </div>
        <nav className="admin-sidebar-nav">
          <button onClick={() => setTab("products")} className={cx("admin-nav-btn", tab === "products" && "active")}>
            <Package size={17} /> Products
          </button>
          <button onClick={() => setTab("beforeafter")} className={cx("admin-nav-btn", tab === "beforeafter" && "active")}>
            <ImageIcon size={17} /> Before / After
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-btn"><LayoutDashboard size={17} /> View Website</Link>
          <button className="admin-nav-btn danger" onClick={logout}><LogOut size={17} /> Sign Out</button>
        </div>
      </aside>
      <div className="admin-content">
        <div className="admin-topbar">
          <h1>{tab === "products" ? "Product Management" : "Before / After Management"}</h1>
        </div>
        {tab === "products" && <AdminProducts />}
        {tab === "beforeafter" && <AdminBeforeAfter />}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}