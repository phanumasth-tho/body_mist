/* STREAMING_CHUNK:Defining design variables and color tokens... */
:root {
  --color-bg: #FDFBF7;             /* Creamy warm off-white */
  --color-surface: #FFFFFF;        /* Pure white */
  --color-surface-subtle: #F7F4EE; /* Soft warm beige */
  --color-text-primary: #2B2825;   /* Deep charcoal brown */
  --color-text-secondary: #75706B; /* Soft muted gray-brown */
  --color-text-light: #9E9892;     /* Caption text */

  --color-accent-gold: #C5A059;    /* Soft bronze gold */
  --color-accent-gold-hover: #A8833E;
  --color-border-subtle: #ECE6DC;  /* Thin light beige border */
  --color-border-dark: #2B2825;

  /* Mood Accent Colors */
  --mood-fresh: #2E5235;     /* Dark Forest Green */
  --mood-sweet: #6B5170;     /* Medium Mauve */
  --mood-confident: #364555; /* Dark Slate Blue */
  --mood-romance: #9E4B56;   /* Soft Dusty Red */

  --font-heading: 'Cormorant Garamond', 'Prompt', serif;
  --font-body: 'Plus Jakarta Sans', 'Prompt', sans-serif;

  --max-width: 1140px;
  --radius-sm: 4px;
  --transition-smooth: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* STREAMING_CHUNK:Resetting styles and base layout defaults... */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-weight: 300;
  line-height: 1.7;
  letter-spacing: 0.01em;
  -webkit-font-smoothing: antialiased;
}

/* STREAMING_CHUNK:Styling typography elements... */
h1, h2, h3, h4, .font-heading {
  font-family: var(--font-heading);
  font-weight: 400;
  line-height: 1.25;
  color: var(--color-text-primary);
  letter-spacing: 0.03em;
}

h1 { font-size: clamp(2rem, 4.5vw, 3.4rem); }
h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); }
h3 { font-size: clamp(1.2rem, 2vw, 1.5rem); }

a {
  color: inherit;
  text-decoration: none;
  transition: var(--transition-smooth);
}

/* STREAMING_CHUNK:Styling navigation bar... */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(253, 251, 247, 0.94);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: 1.25rem 0;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-link {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-secondary);
  position: relative;
  padding-bottom: 4px;
}

.nav-link.active,
.nav-link:hover {
  color: var(--color-text-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-accent-gold);
  transition: var(--transition-smooth);
}

.nav-link.active::after,
.nav-link:hover::after {
  width: 100%;
}

/* STREAMING_CHUNK:Styling hero and headers... */
.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  background: radial-gradient(circle at center, #FFFFFF 0%, var(--color-bg) 100%);
  border-bottom: 1px solid var(--color-border-subtle);
}

.hero-title {
  max-width: 820px;
  margin: 1rem auto;
}

.section {
  padding: 5rem 0;
}

.section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 3.5rem auto;
}

.section-subtitle {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--color-accent-gold);
  display: block;
  margin-bottom: 0.5rem;
}

.title-underline {
  width: 40px;
  height: 2px;
  background-color: var(--color-accent-gold);
  margin: 1.2rem auto 0 auto;
}

/* STREAMING_CHUNK:Styling buttons and interactive controls... */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 2rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-smooth);
  border: 1px solid transparent;
}

.btn-primary {
  background-color: var(--color-text-primary);
  color: var(--color-bg);
  border-color: var(--color-text-primary);
}

.btn-primary:hover {
  background-color: var(--color-accent-gold);
  border-color: var(--color-accent-gold);
  color: #FFFFFF;
}

.btn-outline {
  border-color: var(--color-border-dark);
  color: var(--color-text-primary);
  background: transparent;
}

.btn-outline:hover {
  border-color: var(--color-accent-gold);
  color: var(--color-accent-gold);
}

/* STREAMING_CHUNK:Styling mood cards layout... */
.mood-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.mood-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: var(--transition-smooth);
}

.mood-card:hover {
  border-color: var(--color-accent-gold);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.03);
}

.mood-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
}

.mood-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.mood-fresh .mood-dot { background-color: var(--mood-fresh); }
.mood-sweet .mood-dot { background-color: var(--mood-sweet); }
.mood-confident .mood-dot { background-color: var(--mood-confident); }
.mood-romance .mood-dot { background-color: var(--mood-romance); }

.card-link {
  margin-top: 1.5rem;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  color: var(--color-accent-gold);
  font-weight: 500;
}

/* STREAMING_CHUNK:Styling product catalog grid and cards... */
.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 3rem;
}

.tab-btn {
  background: none;
  border: 1px solid var(--color-border-subtle);
  padding: 0.6rem 1.4rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.tab-btn:hover,
.tab-btn.active {
  border-color: var(--color-border-dark);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

.product-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: var(--transition-smooth);
}

.product-card:hover {
  border-color: var(--color-accent-gold);
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.03);
}

.product-title {
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
}

.product-desc {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px dashed var(--color-border-subtle);
}

.product-price {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 600;
}

/* STREAMING_CHUNK:Styling forms and admin tables... */
.form-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  padding: 2.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
  color: var(--color-text-primary);
}

.form-control {
  width: 100%;
  padding: 0.8rem 1rem;
  font-family: var(--font-body);
  font-size: 0.92rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  outline: none;
  transition: var(--transition-smooth);
}

.form-control:focus {
  border-color: var(--color-accent-gold);
  background-color: var(--color-surface);
}

.form-control[readonly] {
  background-color: var(--color-surface-subtle);
  color: var(--color-text-secondary);
}

.table-responsive {
  overflow-x: auto;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.88rem;
}

.orders-table th {
  background-color: var(--color-surface-subtle);
  padding: 1rem 1.2rem;
  font-weight: 500;
  border-bottom: 1px solid var(--color-border-subtle);
  white-space: nowrap;
}

.orders-table td {
  padding: 1rem 1.2rem;
  border-bottom: 1px solid var(--color-border-subtle);
  color: var(--color-text-secondary);
}

.orders-table tr:last-child td {
  border-bottom: none;
}

/* STREAMING_CHUNK:Styling footer and media queries... */
.footer {
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-surface-subtle);
  padding: 3rem 0;
  text-align: center;
}

.footer-logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.footer-text {
  font-size: 0.82rem;
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .nav-links { gap: 1rem; }
  .form-card { padding: 1.5rem; }
  .product-grid { grid-template-columns: 1fr; }
}