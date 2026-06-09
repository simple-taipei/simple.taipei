/* ============================================================
   Shared components: icons, primitives, Header, Footer
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Icons (clean line set, Lucide-derived geometry) ---------- */
const ICON_PATHS = {
  server: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  rack: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M4 8h16M4 13h16M8 5.5h.01M8 10.5h.01M8 15.5h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z"/>',
  gauge: '<path d="M12 14l4-4"/><circle cx="12" cy="14" r="8"/><path d="M5.5 19a9 9 0 1 1 13 0"/>',
  scale: '<path d="M4 20h16M12 4v16M7 8l-3 6h6Zm10 0l-3 6h6Z"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10c-4-2-7-5.5-7-10V6Z"/><path d="M9.5 12l1.8 1.8L15 10"/>',
  puzzle: '<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4Z"/>',
  spark: '<path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17L17 7M8 7h9v9"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  phone: '<path d="M4 5c0-1 .8-2 1.8-2H8l1.5 4.5L7.8 9.2a13 13 0 0 0 7 7l1.7-1.7L21 16v2.2c0 1-1 1.8-2 1.8A16 16 0 0 1 4 5Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"/>',
  github: '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.2a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C5.5 1.6 4.5 1.9 4.5 1.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3 8.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.2V21"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>',
  dot: '<circle cx="12" cy="12" r="4"/>',
  network: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M10.5 13 6.5 17M13.5 13l4 4"/>'
};
function Icon({ name, className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || "" }} />);

}

/* ---------- Brand wordmark ---------- */
function Logo({ onClick, compact }) {
  return (
    <a href="#/" onClick={onClick} className="brand" aria-label="Simple Information home">
      <img src={(window.__resources && window.__resources.logoSticker) || "public/logo-sticker.png"} alt="" className="brand-mark" />
    </a>);

}

/* ---------- Appearance detector (rect + scroll based; IO is unreliable here) ---------- */
function onAppear(el, cb, ratio = 0.88) {
  let done = false;
  const check = () => {
    if (done || !el) return done;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * ratio && r.bottom > 0) {done = true;cb();cleanup();return true;}
    return false;
  };
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;ticking = true;
    requestAnimationFrame(() => {ticking = false;check();});
  };
  const cleanup = () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    timers.forEach(clearTimeout);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  const timers = [setTimeout(check, 60), setTimeout(check, 320), setTimeout(check, 800)];
  check();
  return cleanup;
}

/* ---------- Reveal-on-scroll wrapper (JS-driven; CSS transitions are frozen in capture) ---------- */
const REDUCED = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
function Reveal({ children, className = "", delay = 0, as = "div", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    if (REDUCED) {el.style.opacity = "1";el.style.transform = "none";return;}
    el.style.opacity = "0";el.style.transform = "translateY(22px)";
    let raf, safety, startT;
    const animate = () => {
      const dur = 640,t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.style.opacity = String(e);
        el.style.transform = `translateY(${(22 * (1 - e)).toFixed(2)}px)`;
        if (p < 1) raf = requestAnimationFrame(step);else
        {el.style.opacity = "1";el.style.transform = "none";}
      };
      raf = requestAnimationFrame(step);
      safety = setTimeout(() => {el.style.opacity = "1";el.style.transform = "none";}, dur + 400);
    };
    const cleanup = onAppear(el, () => {startT = setTimeout(animate, delay);});
    return () => {cleanup && cleanup();cancelAnimationFrame(raf);clearTimeout(safety);clearTimeout(startT);};
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${className}`} style={style}>{children}</Tag>;
}

/* ---------- Count-up number ---------- */
function CountUp({ to, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const cleanup = onAppear(ref.current, () => {
      const dur = 1300,t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(to * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 0.95);
    return () => {cleanup && cleanup();cancelAnimationFrame(raf);};
  }, [to]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ---------- Eyebrow ---------- */
function Eyebrow({ children, onAccent }) {
  return <span className={`eyebrow ${onAccent ? "on-accent" : ""}`}><span className="tick"></span>{children}</span>;
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({ t, locale, setLocale, theme, toggleTheme, route, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onClick = (e) => {if (dropRef.current && !dropRef.current.contains(e.target)) setOpenDrop(null);};
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  useEffect(() => {setMenuOpen(false);setOpenDrop(null);}, [route]);

  const nav = t.nav;
  const navTo = (e, hash) => {e.preventDefault();go(hash);};

  const companyLinks = [
  { label: nav.partnership, hash: "#/partnership" },
  { label: nav.responsibility, hash: "#/responsibility" }];


  return (
    <header className={`hdr ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""}`}>
      <div className="hdr-inner wrap-wide">
        <Logo onClick={(e) => navTo(e, "#/")} />

        <nav className="hdr-nav" ref={dropRef}>
          <a href="#/" onClick={(e) => navTo(e, "#/")} className={`hdr-link ${route === "#/" ? "active" : ""}`}>{nav.home}</a>
          <a href="#/#services" onClick={(e) => {e.preventDefault();go("#/");setTimeout(() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }), 60);}} className="hdr-link">{nav.services}</a>
          <a href="#/#locations" onClick={(e) => {e.preventDefault();go("#/");setTimeout(() => document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" }), 60);}} className="hdr-link">{nav.locations}</a>

          <div className="hdr-drop-wrap">
            <button className={`hdr-link hdr-drop-btn ${openDrop === "company" ? "open" : ""}`} onClick={() => setOpenDrop(openDrop === "company" ? null : "company")}>
              {nav.company}<Icon name="chevron" className="caret" />
            </button>
            {openDrop === "company" &&
            <div className="hdr-drop">
                {companyLinks.map((l) =>
              <a key={l.hash} href={l.hash} onClick={(e) => navTo(e, l.hash)} className={`hdr-drop-item ${route === l.hash ? "active" : ""}`}>{l.label}</a>
              )}
              </div>
            }
          </div>

          <a href="https://lg.simple.taipei" target="_blank" rel="noopener noreferrer" className="hdr-link">{nav.lookingGlass}</a>
        </nav>

        <div className="hdr-ctrls">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme" title="Theme">
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <button className="lang-btn" onClick={() => setLocale(locale === "en" ? "zh" : "en")} aria-label="Switch language">
            <span className={locale === "en" ? "on" : ""}>EN</span>
            <span className="lang-sep">/</span>
            <span className={locale === "zh" ? "on" : ""}>繁</span>
          </button>
          <a href="https://portal.simple.taipei/" target="_blank" rel="noopener noreferrer" className="btn hdr-portal">{nav.portal}</a>
          <button className="icon-btn hdr-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      <div className={`hdr-sheet ${menuOpen ? "show" : ""}`}>
        <a href="#/" onClick={(e) => navTo(e, "#/")} className="sheet-link">{nav.home}</a>
        <a href="#/" onClick={(e) => {e.preventDefault();go("#/");setTimeout(() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }), 60);}} className="sheet-link">{nav.services}</a>
        <a href="#/" onClick={(e) => {e.preventDefault();go("#/");setTimeout(() => document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" }), 60);}} className="sheet-link">{nav.locations}</a>
        <a href="#/partnership" onClick={(e) => navTo(e, "#/partnership")} className="sheet-link">{nav.partnership}</a>
        <a href="#/responsibility" onClick={(e) => navTo(e, "#/responsibility")} className="sheet-link">{nav.responsibility}</a>
        <a href="https://lg.simple.taipei" target="_blank" rel="noopener noreferrer" className="sheet-link">{nav.lookingGlass}</a>
        <a href="https://portal.simple.taipei/" target="_blank" rel="noopener noreferrer" className="btn btn--lg sheet-cta">{nav.portal}</a>
      </div>
    </header>);

}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ t, go }) {
  const f = t.footer;
  const [copied, setCopied] = useState(false);
  const taxId = "00029376";
  const copyTax = () => {
    navigator.clipboard?.writeText(taxId).then(() => {setCopied(true);setTimeout(() => setCopied(false), 1800);});
  };
  return (
    <footer className="ftr">
      <div className="ftr-top wrap-wide" data-comment-anchor="a2b78814b3-div-232-7">
        <div className="ftr-brand" data-comment-anchor="be9b4b041e-div-246-9">
          <img src={(window.__resources && window.__resources.logoSticker) || "public/logo-sticker.png"} alt="Simple Information" className="ftr-logo" />
          <div className="ftr-brand-co">
            <p className="ftr-co">{f.companyName}</p>
            <button className="ftr-tax" onClick={copyTax} data-comment-anchor="ca1aebdde6-button-242-13">
              <span>{f.taxId}: {taxId}</span>
              <Icon name={copied ? "check" : "copy"} className="ftr-tax-ico" style={copied ? { color: "var(--accent)" } : null} />
            </button>
          </div>
          <a href="https://lg.simple.taipei" target="_blank" rel="noopener noreferrer" className="ftr-status">
            <span className="status-dot"></span>
            <span className="kbd">{f.status}</span>
          </a>
          <div className="ftr-social">
            <a href="https://www.linkedin.com/company/simple-information/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn"><Icon name="linkedin" /></a>
            <a href="https://github.com/simple-taipei" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn"><Icon name="github" /></a>
          </div>
        </div>

        <div className="ftr-spacer"></div>

        <div className="ftr-col">
          <h4>{f.contact}</h4>
          <a href="tel:+886277428994" className="ftr-line"><Icon name="phone" /><span>{f.phone}</span></a>
          <a href="mailto:sales@simple.taipei" className="ftr-line"><Icon name="mail" /><span>sales@simple.taipei</span></a>
        </div>

        <div className="ftr-col">
          <h4>{f.quickLinks}</h4>
          <a href="https://portal.simple.taipei/" target="_blank" rel="noopener noreferrer" className="ftr-line2">{f.portal}</a>
          <a href="https://docs.simple.taipei/" target="_blank" rel="noopener noreferrer" className="ftr-line2">{f.docs}</a>
          <a href="#/partnership" onClick={(e) => {e.preventDefault();go("#/partnership");}} className="ftr-line2">{t.nav.partnership}</a>
          <a href="#/responsibility" onClick={(e) => {e.preventDefault();go("#/responsibility");}} className="ftr-line2">{t.nav.responsibility}</a>
        </div>
      </div>

      <div className="ftr-bottom wrap-wide">
        <p>© 2023–{new Date().getFullYear()} {f.companyName}</p>
        <p className="ftr-legal" data-comment-anchor="7ebd9eecb5-p-272-9">{f.legal}</p>
      </div>
    </footer>);

}

Object.assign(window, { Icon, Logo, Reveal, CountUp, Eyebrow, Header, Footer });