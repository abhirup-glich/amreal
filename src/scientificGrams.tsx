import React from "react";

// ─── Visual Gram: Biomimetic Cuticle Realignment Diagram ──────────────────────

export function CuticleDiagram({ className = "" }: { className?: string }) {
  return (
    <div className={`cuticle-gram-card ${className}`}>
      <div className="gram-header">
        <span className="gram-tag">HAIR FIBRE BIOPHYSICS</span>
        <h4>BIOMIMETIC CUTICLE REALIGNMENT</h4>
        <p className="gram-sub">Visual microscopic comparison of untreated damaged hair versus AMREAL treated hair.</p>
      </div>

      <div className="cuticle-comparison-grid">
        {/* State A: Untreated / Damaged */}
        <div className="cuticle-column damaged">
          <div className="cuticle-visual-box">
            <svg viewBox="0 0 240 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="cuticle-svg">
              {/* Hair Cortex Core */}
              <rect x="20" y="35" width="200" height="60" rx="4" fill="#E2D5CC" stroke="#CBB9AC" strokeWidth="1.5" />
              <text x="120" y="68" textAnchor="middle" fill="#8C796E" fontSize="9" fontWeight="700" letterSpacing="0.1em">CORTEX CORE (POROUS)</text>
              {/* Lifted, Jagged Cuticles Top */}
              <path d="M25 35 L40 18 L55 35 L70 16 L85 35 L100 20 L115 35 L130 17 L145 35 L160 19 L175 35 L190 18 L205 35 L218 20" stroke="#B86B77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Lifted, Jagged Cuticles Bottom */}
              <path d="M25 95 L40 112 L55 95 L70 114 L85 95 L100 110 L115 95 L130 113 L145 95 L160 111 L175 95 L190 112 L205 95 L218 110" stroke="#B86B77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Moisture Loss Evaporation Arrows */}
              <path d="M60 16 L60 6 M60 6 L56 10 M60 6 L64 10" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M120 16 L120 6 M120 6 L116 10 M120 6 L124 10" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M180 16 L180 6 M180 6 L176 10 M180 6 L184 10" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="cuticle-status-badge damaged">LIFTED &amp; POROUS</span>
          </div>
          <div className="cuticle-caption">
            <strong>Damaged Fibre</strong>
            <ul>
              <li><span className="dot red" /> Moisture loss through lifted scales</li>
              <li><span className="dot red" /> Rough friction &amp; uncontrollable frizz</li>
              <li><span className="dot red" /> Dull light scatter, zero gloss</li>
            </ul>
          </div>
        </div>

        {/* State B: AMREAL Sealed */}
        <div className="cuticle-column sealed">
          <div className="cuticle-visual-box">
            <svg viewBox="0 0 240 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="cuticle-svg">
              {/* Hair Cortex Core Infused */}
              <rect x="20" y="38" width="200" height="54" rx="4" fill="#F4EAE6" stroke="#C59B76" strokeWidth="1.5" />
              {/* Internal Collagen-Keratin Crosslinks */}
              <circle cx="50" cy="65" r="4" fill="#C59B76" opacity="0.6"/>
              <circle cx="85" cy="65" r="4" fill="#8C3E4C" opacity="0.6"/>
              <circle cx="120" cy="65" r="4" fill="#C59B76" opacity="0.6"/>
              <circle cx="155" cy="65" r="4" fill="#8C3E4C" opacity="0.6"/>
              <circle cx="190" cy="65" r="4" fill="#C59B76" opacity="0.6"/>
              <text x="120" y="68" textAnchor="middle" fill="#6A2E3B" fontSize="9" fontWeight="700" letterSpacing="0.1em">COLLAGEN MATRIX SEAL</text>
              {/* Perfectly Aligned Flat Cuticles Top */}
              <path d="M22 38 C60 36 120 36 160 36 C190 36 210 37 220 38" stroke="#8C3E4C" strokeWidth="4" strokeLinecap="round" />
              {/* Flat Shingle Layers */}
              <line x1="45" y1="36" x2="65" y2="36" stroke="#DCA5B0" strokeWidth="2.5" />
              <line x1="95" y1="36" x2="115" y2="36" stroke="#DCA5B0" strokeWidth="2.5" />
              <line x1="145" y1="36" x2="165" y2="36" stroke="#DCA5B0" strokeWidth="2.5" />
              {/* Perfectly Aligned Flat Cuticles Bottom */}
              <path d="M22 92 C60 94 120 94 160 94 C190 94 210 93 220 92" stroke="#8C3E4C" strokeWidth="4" strokeLinecap="round" />
              <line x1="45" y1="94" x2="65" y2="94" stroke="#DCA5B0" strokeWidth="2.5" />
              <line x1="95" y1="94" x2="115" y2="94" stroke="#DCA5B0" strokeWidth="2.5" />
              <line x1="145" y1="94" x2="165" y2="94" stroke="#DCA5B0" strokeWidth="2.5" />
              {/* Light Reflection Rays */}
              <path d="M70 20 L82 8 M82 8 L85 13 M82 8 L77 11" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M140 20 L152 8 M152 8 L155 13 M152 8 L147 11" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="cuticle-status-badge sealed">AMREAL REALIGNED</span>
          </div>
          <div className="cuticle-caption">
            <strong>Biomimetic Sealing</strong>
            <ul>
              <li><span className="dot gold" /> Hydrophobic lipid barrier locked</li>
              <li><span className="dot gold" /> Flat cuticle alignment, zero flyaways</li>
              <li><span className="dot gold" /> High specular reflection: mirror gloss</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Visual Gram: Clinical Metrics Bar ────────────────────────────────────────

export function ClinicalMetricsGram() {
  const metrics = [
    {
      value: "3–5",
      unit: "MONTHS",
      label: "Longevity Retention",
      desc: "One ritual durability",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="gram-icon">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      value: "pH 4.5",
      unit: "BALANCE",
      label: "Isoelectric Cuticle Seal",
      desc: "Acidic cuticle closure",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="gram-icon">
          <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
        </svg>
      )
    },
    {
      value: "98%",
      unit: "ALIGNMENT",
      label: "Cuticle Smoothing",
      desc: "Instant frizz elimination",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="gram-icon">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    {
      value: "1000g",
      unit: "NET FORMAT",
      label: "Salon Backbar",
      desc: "High-yield professional jar",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="gram-icon">
          <path d="M6 3h12v3H6zM7 6v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
      )
    }
  ];

  return (
    <div className="clinical-metrics-gram">
      {metrics.map((m, i) => (
        <div key={i} className="metric-gram-item">
          <div className="metric-icon-wrap">{m.icon}</div>
          <div className="metric-content">
            <div className="metric-stat">
              <span className="stat-num">{m.value}</span>
              <span className="stat-unit">{m.unit}</span>
            </div>
            <span className="metric-title">{m.label}</span>
            <span className="metric-sub">{m.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Visual Gram: 3-Step Treatment Protocol Diagram ───────────────────────────

export function TreatmentProtocolDiagram() {
  const steps = [
    {
      num: "01",
      name: "CLARIFY & PREP",
      tag: "pH 6.5 DETOX",
      desc: "Lifts buildup, residues and prepares receptor sites on the hair shaft.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28C22.63 28 28 22.63 28 16" />
          <path d="M16 9V16L21 21" />
          <circle cx="24" cy="8" r="3" fill="#B86B77" stroke="none" />
        </svg>
      )
    },
    {
      num: "02",
      name: "COLLAGEN INFUSION",
      tag: "DEEP CORTEX",
      desc: "Hydrolyzed Keratin and Silk Proteins reconstruct inner cortex bonds.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="16,3 27,9 27,23 16,29 5,23 5,9" />
          <circle cx="16" cy="16" r="4" fill="#C59B76" stroke="none" />
        </svg>
      )
    },
    {
      num: "03",
      name: "THERMO-SEAL",
      tag: "pH 4.5 MIRROR LOCK",
      desc: "Heat activates cross-linking to lock cuticles down for 3–5 months.",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 28V14C12 11.8 13.8 10 16 10C18.2 10 20 11.8 20 14V28" />
          <circle cx="16" cy="22" r="5" fill="#8C3E4C" stroke="none" />
          <path d="M7 6L9 9M25 6L23 9M16 2L16 6" />
        </svg>
      )
    }
  ];

  return (
    <div className="protocol-diagram-card">
      <div className="protocol-header">
        <span className="gram-tag">SALON PROTOCOL</span>
        <h4>3-STEP CLINICAL TRANSFORMATION</h4>
      </div>
      <div className="protocol-steps-grid">
        {steps.map((st, i) => (
          <div key={i} className="protocol-step-box">
            <div className="step-badge-row">
              <span className="step-num-pill">{st.num}</span>
              <span className="step-tag-pill">{st.tag}</span>
            </div>
            <div className="step-icon-area">{st.icon}</div>
            <h5>{st.name}</h5>
            <p>{st.desc}</p>
            {i < steps.length - 1 && <div className="step-connector-arrow">→</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual Gram: Hair Diagnostic & Compatibility Matrix ──────────────────────

export function HairDiagnosticGram({
  hairTypes,
  concerns,
  suitableFor
}: {
  hairTypes: string[];
  concerns: string[];
  suitableFor?: string[];
}) {
  const getTextureIcon = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes("straight")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="type-icon">
          <line x1="8" y1="3" x2="8" y2="21" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="16" y1="3" x2="16" y2="21" />
        </svg>
      );
    }
    if (l.includes("wavy")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="type-icon">
          <path d="M4 8C8 4 12 12 16 8C18 6 20 6 20 6" />
          <path d="M4 16C8 12 12 20 16 16C18 14 20 14 20 14" />
        </svg>
      );
    }
    if (l.includes("curly") || l.includes("coarse")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="type-icon">
          <path d="M12 3a6 6 0 0 0 0 12c3.31 0 6 2.69 6 6" />
          <path d="M6 8a4 4 0 0 1 0 8" />
        </svg>
      );
    }
    if (l.includes("colour") || l.includes("color")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="type-icon">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 1 9 9" />
        </svg>
      );
    }
    // generic strand icon
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="type-icon">
        <path d="M12 2v20M7 5a8 8 0 0 1 10 0M7 19a8 8 0 0 0 10 0" />
      </svg>
    );
  };

  const getConcernIcon = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes("frizz") || l.includes("smooth")) {
      return "✨";
    }
    if (l.includes("dry") || l.includes("moist")) {
      return "💧";
    }
    if (l.includes("damage") || l.includes("break")) {
      return "🛡️";
    }
    if (l.includes("scalp") || l.includes("flake")) {
      return "🌿";
    }
    if (l.includes("fall") || l.includes("thin")) {
      return "🌱";
    }
    return "⚡";
  };

  return (
    <div className="hair-diagnostic-gram">
      {/* Hair Texture Matrix */}
      <div className="diagnostic-block">
        <div className="diagnostic-title">
          <span className="diag-dot" />
          <span>COMPATIBLE FIBRE TEXTURES</span>
        </div>
        <div className="diag-chips-grid">
          {hairTypes.map((ht, idx) => (
            <div key={idx} className="diag-chip active">
              {getTextureIcon(ht)}
              <span>{ht}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Concerns Target Matrix */}
      <div className="diagnostic-block">
        <div className="diagnostic-title">
          <span className="diag-dot" />
          <span>TARGETED CLINICAL CONCERNS</span>
        </div>
        <div className="diag-chips-grid">
          {concerns.map((c, idx) => (
            <div key={idx} className="diag-chip concern">
              <span className="diag-emoji">{getConcernIcon(c)}</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Salon Compatibility Gram */}
      {suitableFor && suitableFor.length > 0 && (
        <div className="diagnostic-block">
          <div className="diagnostic-title">
            <span className="diag-dot" />
            <span>SALON ACCREDITATION</span>
          </div>
          <div className="diag-chips-grid">
            {suitableFor.map((s, idx) => (
              <div key={idx} className="diag-chip salon">
                <span className="diag-emoji">✓</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Visual Gram: Product Tech Specs Banner ───────────────────────────────────

export function ProductTechSpecsBar({
  size,
  category,
  tagline
}: {
  size: string;
  category: string;
  tagline?: string;
}) {
  return (
    <div className="tech-specs-bar">
      <div className="tech-spec-item">
        <span className="tech-spec-label">NET GRAMMAGE</span>
        <strong className="tech-spec-val">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="spec-mini-icon">
            <path d="M6 3h8v3H6zM7 6v11a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6" />
          </svg>
          {size}
        </strong>
      </div>
      <div className="tech-spec-item">
        <span className="tech-spec-label">FORMULATION</span>
        <strong className="tech-spec-val">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="spec-mini-icon">
            <circle cx="10" cy="10" r="7" />
            <path d="M10 6v4l2.5 2.5" />
          </svg>
          pH 4.0 – 4.5
        </strong>
      </div>
      <div className="tech-spec-item">
        <span className="tech-spec-label">CATEGORY</span>
        <strong className="tech-spec-val">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="spec-mini-icon">
            <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" />
          </svg>
          {category}
        </strong>
      </div>
      <div className="tech-spec-item">
        <span className="tech-spec-label">SAFETY ACCREDITED</span>
        <strong className="tech-spec-val accent-gold">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="spec-mini-icon">
            <path d="M10 2L3 5v5c0 4.5 3.5 8 7 9 3.5-1 7-4.5 7-9V5l-7-3z" />
          </svg>
          0% Formaldehyde
        </strong>
      </div>
    </div>
  );
}
