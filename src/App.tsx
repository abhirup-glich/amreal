import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Menu, Search, X, Instagram, Mail, Phone, MapPin, CalendarDays, Check, Star } from "lucide-react";
import { categories, concerns, hairTypes, heroSlides, products, Product } from "./data";

const cx = (...v: (string | false | undefined)[]) => v.filter(Boolean).join(" ");

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


function BrandLogo({ dark = false }: { dark?: boolean }) {
  return <span className={cx("brand-logo", dark && "brand-logo-dark")}><img src="/assets/amreal-logo.png" alt="AMREAL Professional" /></span>;
}

function Announcement() {
  return <div className="announcement">PROFESSIONAL BEAUTY SUPPLY <span>•</span> SALON & BUSINESS ENQUIRIES WELCOME</div>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Home", "/"], ["Products", "/products"], ["About", "/about"], ["Feedback", "/feedback"], ["Contact", "/contact"]];
  return (
    <header className={cx("navbar", scrolled && "navbar-scrolled")}>
      <Link className="logo" to="/" onClick={() => setOpen(false)}><BrandLogo /></Link>
      <nav className="desktop-nav">
        {links.map(([label, to]) => <NavLink key={to} to={to} className={({isActive}) => cx("nav-link", isActive && "active")}>{label}</NavLink>)}
        <Link className="button button-small" to="/contact">Enquire Now <ArrowRight size={15}/></Link>
      </nav>
      <button className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu/></button>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="mobile-menu-top"><Link className="logo" to="/" onClick={() => setOpen(false)}><BrandLogo /></Link><button onClick={() => setOpen(false)}><X/></button></div>
            <div className="mobile-links">
              {links.map(([label,to]) => <Link key={to} to={to} onClick={() => setOpen(false)}>{label}<ArrowRight/></Link>)}
              <Link className="button" to="/contact" onClick={() => setOpen(false)}>Enquire Now <ArrowRight size={16}/></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionHeading({ eyebrow, title, text, light=false }: {eyebrow?:string,title:string,text?:string,light?:boolean}) {
  return <div className={cx("section-heading", light && "light")}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
}

function Button({to="/contact", children="Enquire Now", secondary=false}: {to?:string,children?:React.ReactNode,secondary?:boolean}) {
  return <Link className={cx("button", secondary && "button-secondary")} to={to}>{children}<ArrowRight size={16}/></Link>;
}

function Hero() {
  const [index,setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i+1)%heroSlides.length), 3000);
    return () => clearInterval(id);
  }, []);
  const slide = heroSlides[index];
  return <section className="hero">
    <AnimatePresence mode="wait">
      <motion.div key={index} className="hero-image" initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1.01}} transition={{duration:.9}} style={{backgroundImage:`linear-gradient(90deg, rgba(25,18,20,.58), rgba(25,18,20,.12) 65%, rgba(25,18,20,.02)), url(${slide.image})`}}/>
    </AnimatePresence>
    <div className="hero-content">
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.6}}>
          <span className="eyebrow hero-eyebrow">{slide.eyebrow}</span>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <div className="hero-actions"><Button to="/products">Explore Products</Button><Button to="/contact" secondary>Partner with AMREAL</Button></div>
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="hero-controls">
      <span>{String(index+1).padStart(2,"0")} / 05</span>
      <div className="hero-progress">{heroSlides.map((_,i)=><button key={i} onClick={()=>setIndex(i)} className={i===index?"active":""}><span/></button>)}</div>
    </div>
  </section>
}

function Marquee() {
  return <section className="marquee-wrap">
    <div className="marquee row-one"><span>PROFESSIONAL • PREMIUM • BEAUTY • SCIENCE • CARE • RESULTS • </span><span>PROFESSIONAL • PREMIUM • BEAUTY • SCIENCE • CARE • RESULTS • </span></div>
    <div className="marquee row-two"><span>HAIRCARE • TREATMENTS • SCALP CARE • SKINCARE • SALON SOLUTIONS • </span><span>HAIRCARE • TREATMENTS • SCALP CARE • SKINCARE • SALON SOLUTIONS • </span></div>
  </section>
}

function Reveal({children, className=""}: {children:React.ReactNode,className?:string}) {
  return <motion.div className={className} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65}}>{children}</motion.div>;
}

function ProductCard({product}: {product:Product}) {
  return <motion.article className="product-card" whileHover={{y:-5}} transition={{duration:.25}}>
    <Link to={`/products/${product.slug}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy"/><span className="view-badge">View</span></Link>
    <div className="product-info">
      <span className="product-category">{product.category}</span>
      <h3>{product.name}</h3>
      <p>{product.size} · {product.description}</p>
      <div className="product-actions"><Link to={`/products/${product.slug}`}>View Product <ArrowRight size={15}/></Link><Link to={`/contact?product=${encodeURIComponent(product.name)}`}>Enquire <ArrowRight size={15}/></Link></div>
    </div>
  </motion.article>;
}

function Home() {
  const featured = products.filter(p=>p.featured);
  return <main>
    <Announcement/><Navbar/><Hero/><Marquee/>
    <Reveal><section className="intro section">
      <div><span className="eyebrow">AMREAL PROFESSIONAL</span><h2>MORE THAN<br/><em>BEAUTY.</em></h2></div>
      <div className="intro-copy"><p>AMREAL Professional brings together professional beauty solutions, thoughtful product discovery and an experience created for modern beauty professionals.</p><Button to="/about">Discover AMREAL</Button></div>
    </section></Reveal>

    <section className="benefits"><div className="benefits-inner">
      {["Professional Formulas","Salon Ready","Quality Focused","Beauty Professionals","Business Supply"].map((x,i)=><div className="benefit" key={x}><span>0{i+1}</span><h3>{x}</h3><p>Designed around professional beauty needs.</p></div>)}
    </div></section>

    <section className="section cream">
      <SectionHeading eyebrow="THE COLLECTION" title="EXPLORE THE AMREAL COLLECTION" text="Professional beauty categories designed for discovery."/>
      <div className="category-grid">{categories.map(c=><Link to={`/products?category=${encodeURIComponent(c.name)}`} className="category-card" key={c.name}><img src={c.image} alt={c.name} loading="lazy"/><div><span>{c.name}</span><p>{c.description}</p><ArrowRight/></div></Link>)}</div>
    </section>

    <section className="section">
      <SectionHeading eyebrow="DISCOVER AMREAL" title="PROFESSIONAL SOLUTIONS" text="Explore the current product list supplied for the AMREAL demo."/>
      <div className="product-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div>
      <div className="center-button"><Button to="/products">View All Products</Button></div>
    </section>

    <section className="editorial">
      <div className="editorial-image" style={{backgroundImage:`url(${heroSlides[2].image})`}}/>
      <div className="editorial-copy"><span className="eyebrow">HAIR RITUAL</span><h2>MORE THAN<br/><em>CARE.</em></h2><p>Professional beauty routines deserve a premium product experience. Explore formats, categories and business-ready solutions.</p><Button to="/products">Discover Products</Button></div>
    </section>

    <section className="section blush">
      <SectionHeading eyebrow="DISCOVER YOUR ROUTINE" title="SHOP BY HAIR TYPE" text="Find the professional solution for your hair."/>
      <div className="hair-grid">{hairTypes.map(h=><Link key={h.name} to={`/products?hairType=${h.name.toLowerCase()}`} className="hair-card"><img src={h.image} alt={h.name}/><div><span>{h.name}</span><p>{h.text}</p><b>Explore <ArrowRight size={14}/></b></div></Link>)}</div>
    </section>

    <section className="section concern-section">
      <SectionHeading eyebrow="PRODUCT DISCOVERY" title="FIND YOUR PROFESSIONAL SOLUTION"/>
      <div className="concern-list">{concerns.map(c=><Link key={c} to={`/products?concern=${encodeURIComponent(c)}`}>{c}<ArrowRight size={16}/></Link>)}</div>
    </section>

    <section className="ingredients section cream">
      <div><span className="eyebrow">FORMULATION STORY</span><h2>BEAUTY MEETS<br/><em>FORMULATION.</em></h2><p>Only verified formulation information should be published. The demo therefore keeps ingredient claims intentionally conservative until AMREAL supplies approved details.</p></div>
      <div className="ingredient-stack">{["ARGAN OIL","PRO-VITAMIN B5","COLLAGEN PLEX"].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><p>Approved product information to be supplied by AMREAL.</p></div>)}</div>
    </section>

    <section className="full-editorial"><div className="full-overlay"><span className="eyebrow">AMREAL PROFESSIONAL</span><h2>SCIENCE FOR<br/><em>BEAUTIFUL HAIR.</em></h2><Button to="/contact">Start a Conversation</Button></div></section>

    <section className="business section">
      <SectionHeading eyebrow="FOR PROFESSIONALS" title="CREATED FOR PROFESSIONALS." text="Built around the needs of modern beauty businesses."/>
      <div className="business-grid">{["SALONS","BEAUTY PROFESSIONALS","SPAS","RETAILERS","DISTRIBUTORS"].map((x,i)=><div className="business-card" key={x}><span>0{i+1}</span><h3>{x}</h3><ArrowRight/></div>)}</div>
      <div className="center-button"><Button>Become an AMREAL Partner</Button></div>
    </section>

    <section className="social section blush">
      <SectionHeading eyebrow="SOCIAL" title="FOLLOW THE AMREAL JOURNEY" text="Replace these demo images with approved AMREAL social content."/>
      <div className="social-grid">{["collagen-biotin-masque.jpeg","coffee-scalp-scrub.jpeg","hair-ritual.jpeg","scalp-detox.jpeg","anti-hairfall-serum.jpeg","collagen-biotin-masque.jpeg"].map((file,i)=><a href="#" onClick={e=>e.preventDefault()} key={`${file}-${i}`} className="social-card"><img src={`/assets/${file}`} alt="AMREAL Professional"/><span><Instagram size={18}/> View Post</span></a>)}</div>
    </section>

    <section className="final-cta"><div><span className="eyebrow">AMREAL PROFESSIONAL</span><h2>LET'S CREATE BEAUTIFUL RESULTS <em>TOGETHER.</em></h2><p>Looking for professional beauty products for your business?</p><div className="hero-actions"><Button>Send an Enquiry</Button><Button to="/products" secondary>Explore Products</Button></div></div></section>
    <Footer/>
  </main>
}

function ProductsPage() {
  const [params,setParams] = useSearchParams();
  const [search,setSearch] = useState(params.get("search") || "");
  const category=params.get("category")||"";
  const hairType=params.get("hairType")||"";
  const concern=params.get("concern")||"";
  const filtered=useMemo(()=>products.filter(p=>{
    const q=search.toLowerCase().trim();
    return (!q || [p.name,p.category,p.size,p.description,...p.hairTypes,...p.concerns,...p.ingredients].join(" ").toLowerCase().includes(q))
      && (!category || p.category===category)
      && (!hairType || p.hairTypes.map(x=>x.toLowerCase()).includes(hairType.toLowerCase()))
      && (!concern || p.concerns.map(x=>x.toLowerCase()).includes(concern.toLowerCase()));
  }),[search,category,hairType,concern]);
  const setFilter=(key:string,value:string)=>{const next=new URLSearchParams(params); value?next.set(key,value):next.delete(key);setParams(next);};
  return <><Announcement/><Navbar/><main className="catalogue">
    <section className="catalogue-hero"><span className="eyebrow">AMREAL PROFESSIONAL</span><h1>THE AMREAL<br/><em>COLLECTION.</em></h1><p>Professional product discovery for salons, beauty professionals and modern beauty businesses.</p></section>
    <section className="catalogue-body">
      <div className="filter-top">
        <div className="search-box"><Search size={18}/><input value={search} onChange={e=>{setSearch(e.target.value);setFilter("search",e.target.value)}} placeholder="Search products, categories, hair type..."/></div>
        <select value={category} onChange={e=>setFilter("category",e.target.value)}><option value="">All Categories</option>{categories.map(c=><option key={c.name}>{c.name}</option>)}</select>
        <select value={hairType} onChange={e=>setFilter("hairType",e.target.value)}><option value="">All Hair Types</option>{["Coloured","Curly","Straight","Damaged"].map(x=><option key={x} value={x.toLowerCase()}>{x}</option>)}</select>
        <select value={concern} onChange={e=>setFilter("concern",e.target.value)}><option value="">All Concerns</option>{concerns.map(x=><option key={x}>{x}</option>)}</select>
      </div>
      <div className="result-line"><span>{filtered.length} products</span>{(category||hairType||concern||search)&&<button onClick={()=>{setSearch("");setParams({})}}>Clear filters <X size={14}/></button>}</div>
      <div className="product-grid catalog-grid">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div>
      {!filtered.length && <div className="empty-state"><h3>No products found.</h3><p>Try a different search or filter.</p></div>}
    </section>
  </main><Footer/></>
}

function ProductDetail() {
  const {slug}=useParams();
  const product=products.find(p=>p.slug===slug);
  const [active,setActive]=useState(0);
  if(!product) return <NotFound/>;
  return <><Announcement/><Navbar/><main className="detail">
    <div className="detail-gallery"><div className="detail-main"><img src={product.gallery[active]} alt={product.name}/></div><div className="thumbs">{product.gallery.map((x,i)=><button key={x} className={i===active?"active":""} onClick={()=>setActive(i)}><img src={x} alt=""/></button>)}</div></div>
    <div className="detail-copy"><span className="product-category">{product.category}</span><h1>{product.name}</h1><div className="detail-size">{product.size}</div><p className="lead">{product.description}</p>
      <div className="detail-block"><h3>Benefits</h3>{product.benefits.map(x=><p key={x}>— {x}</p>)}</div>
      <div className="detail-block"><h3>Ingredients</h3>{product.ingredients.map(x=><p key={x}>— {x}</p>)}</div>
      <div className="detail-tags"><div><span>Hair Types</span>{product.hairTypes.map(x=><b key={x}>{x}</b>)}</div><div><span>Concerns</span>{product.concerns.map(x=><b key={x}>{x}</b>)}</div></div>
      <Button to={`/contact?product=${encodeURIComponent(product.name)}`}>Enquire About This Product</Button>
    </div>
  </main>
  <section className="section cream"><SectionHeading eyebrow="RELATED PRODUCTS" title="COMPLETE YOUR PROFESSIONAL ROUTINE"/><div className="product-grid">{products.filter(p=>p.id!==product.id).slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  <Footer/></>
}

function Contact() {
  const [params]=useSearchParams();
  const [sent,setSent]=useState(false);
  const product=params.get("product")||"";
  if(sent) return <><Announcement/><Navbar/><Success title="THANK YOU FOR YOUR ENQUIRY." text="Your enquiry has been captured in this demo. Connect the form to the AMREAL backend/API for production use."/><Footer/></>;
  return <><Announcement/><Navbar/><main className="form-page"><div className="form-intro"><span className="eyebrow">CONTACT AMREAL</span><h1>LET'S TALK<br/><em>BEAUTY.</em></h1><p>Tell us about your business and professional product requirements.</p><div className="contact-details"><span><Mail/> hello@amrealprofessional.com</span><span><Phone/> +91 00000 00000</span><span><MapPin/> India</span></div></div><form className="premium-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><div className="form-grid"><label>Full Name<input required placeholder="Your name"/></label><label>Business Name<input placeholder="Salon / Business name"/></label><label>Phone<input required placeholder="+91"/></label><label>Email<input type="email" placeholder="you@example.com"/></label><label>City<input placeholder="City"/></label><label>Business Type<select><option>Salon</option><option>Beauty Professional</option><option>Spa</option><option>Retailer</option><option>Distributor</option></select></label></div><label>Selected Product<input defaultValue={product} placeholder="Product name"/></label><label>Estimated Requirement<input placeholder="e.g. monthly requirement"/></label><label>Message<textarea required rows={6} placeholder="Tell us what you need..."/></label><button className="button" type="submit">Send Enquiry <ArrowRight size={16}/></button></form></main><Footer/></>
}

function Feedback() {
  const [sent,setSent]=useState(false);
  if(sent) return <><Announcement/><Navbar/><Success title="THANK YOU FOR SHARING." text="Your feedback helps improve the AMREAL experience."/><Footer/></>;
  return <><Announcement/><Navbar/><main className="form-page single"><div className="form-intro"><span className="eyebrow">YOUR EXPERIENCE MATTERS</span><h1>SHARE YOUR<br/><em>FEEDBACK.</em></h1><p>Help us make the AMREAL professional experience better.</p></div><form className="premium-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Name<input required/></label><label>Business Name<input/></label><label>Email<input type="email"/></label><label>Phone<input/></label><label>Product<select>{products.map(p=><option key={p.id}>{p.name} — {p.size}</option>)}</select></label><label>Rating<div className="rating-input">{[1,2,3,4,5].map(n=><button type="button" key={n}><Star size={24}/></button>)}</div></label><label>Feedback<textarea required rows={6}/></label><label>Would you recommend AMREAL?<select><option>Yes</option><option>Maybe</option><option>No</option></select></label><button className="button">Share Feedback <ArrowRight size={16}/></button></form></main><Footer/></>
}

function About() {
  return <><Announcement/><Navbar/><main><section className="about-hero"><span className="eyebrow">ABOUT AMREAL</span><h1>PROFESSIONAL BEAUTY,<br/><em>REFINED.</em></h1><p>AMREAL Professional is positioned as a premium professional beauty brand serving salons, beauty professionals, spas, retailers and distributors.</p></section><section className="section about-split"><div className="about-photo"><img src={heroSlides[1].image} alt="Professional beauty demo"/></div><div><span className="eyebrow">THE EXPERIENCE</span><h2>PRODUCT.<br/><em>PROFESSIONAL.</em><br/>PERSONAL.</h2><p>The digital experience is designed around product discovery, professional enquiries, customer relationships and appointments rather than conventional ecommerce checkout.</p><Button to="/products">Explore the Collection</Button></div></section></main><Footer/></>
}

function Success({title,text}:{title:string,text:string}) {
  return <section className="success"><div className="success-icon"><Check/></div><span className="eyebrow">AMREAL PROFESSIONAL</span><h1>{title}</h1><p>{text}</p><Button to="/">Return Home</Button></section>;
}

function Login() {
  return <><Announcement/><Navbar/><main className="auth-page"><div className="auth-card"><span className="eyebrow">CUSTOMER PORTAL</span><h1>WELCOME <em>BACK.</em></h1><p>Demo login UI. Connect this form to the production authentication API.</p><label>Email or Phone<input placeholder="you@example.com"/></label><button className="button">Continue <ArrowRight size={16}/></button><Link to="/contact">Need help? Contact AMREAL</Link></div></main><Footer/></>
}

function Dashboard() {
  return <><Announcement/><Navbar/><main className="dashboard"><div className="dashboard-head"><div><span className="eyebrow">CUSTOMER DASHBOARD</span><h1>WELCOME, <em>PROFESSIONAL.</em></h1></div><Button to="/contact">New Enquiry</Button></div><div className="dash-grid">{[["My Enquiries","2"],["My Appointments","1"],["My Products","4"],["Profile","Complete"]].map(([x,y])=><div className="dash-card" key={x}><span>{x}</span><strong>{y}</strong></div>)}</div><div className="dashboard-panel"><h2>Recent Activity</h2><p>Your live customer data will appear here after the backend is connected.</p></div></main><Footer/></>
}

function Admin() {
  const stats=[["Total Enquiries","128"],["New Enquiries","24"],["Qualified","51"],["Converted","32"],["Customers","87"],["Appointments","14"]];
  return <><main className="admin"><aside className="admin-side"><Link className="logo" to="/"><BrandLogo dark /></Link>{["Dashboard","Products","Enquiries","Customers","Appointments","Feedback","Analytics"].map(x=><a href="#" onClick={e=>e.preventDefault()} key={x}>{x}</a>)}</aside><section className="admin-main"><div className="admin-top"><div><span className="eyebrow">ADMIN CRM</span><h1>OVERVIEW</h1></div><Link className="button button-small" to="/">View Website</Link></div><div className="stats">{stats.map(([x,y])=><div className="stat" key={x}><span>{x}</span><strong>{y}</strong></div>)}</div><div className="admin-table"><div className="table-title"><h2>Recent Enquiries</h2><span>Demo data</span></div><table><thead><tr><th>Name</th><th>Business</th><th>Product</th><th>Status</th></tr></thead><tbody>{products.slice(0,6).map((p,i)=><tr key={p.id}><td>Customer {i+1}</td><td>Professional Business</td><td>{p.name}</td><td><b className="status">{["NEW","CONTACTED","QUALIFIED"][i%3]}</b></td></tr>)}</tbody></table></div></section></main></>
}

function NotFound() {
  return <><Announcement/><Navbar/><section className="success"><span className="eyebrow">404</span><h1>THIS PAGE HAS <em>MOVED.</em></h1><p>The page you requested could not be found.</p><Button to="/">Return Home</Button></section><Footer/></>;
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div><Link className="logo" to="/"><BrandLogo dark /></Link><p>SCIENCE FOR BEAUTIFUL HAIR.</p></div><div><span className="footer-title">Explore</span><Link to="/products">Products</Link><Link to="/about">About</Link><Link to="/feedback">Feedback</Link></div><div><span className="footer-title">Connect</span><Link to="/contact">Business Enquiry</Link><a href="mailto:hello@amrealprofessional.com">Email</a><a href="tel:+910000000000">Phone</a></div><div><span className="footer-title">Social</span><a href="#" onClick={e=>e.preventDefault()}><Instagram size={17}/> Instagram</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AMREAL Professional. Demo website.</span><span>No cart • No checkout • Enquiry-led experience</span></div></footer>
}

export default function App() {
  return <><ScrollToTop/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/products" element={<ProductsPage/>}/>
    <Route path="/products/:slug" element={<ProductDetail/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/feedback" element={<Feedback/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/admin/dashboard" element={<Admin/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></>;
}