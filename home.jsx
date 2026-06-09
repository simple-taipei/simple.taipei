/* ============================================================
   HOME PAGE
   ============================================================ */
function HomePage({ t, motif, go }) {
  const h = t.home;
  const [activeLoc, setActiveLoc] = useState(null);
  return (
    <main>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className={`hero-bg ${motif === "dots" ? "bg-dotgrid" : motif === "topo" ? "bg-topo" : ""}`}></div>
        <div className="hero-glow"></div>
        <div className="wrap hero-inner">
          <h1 className="hero-title">
            <Reveal delay={40}><span className="hero-line">{h.heroLeadPlain}</span></Reveal>
            <Reveal delay={130}>
              <span className="hero-line2">
                <span className="hand-swap-hand hand hero-hand" data-comment-anchor="e8097e8214-span-18-17">{h.heroHandWord}</span>
                <span className="hand-swap-plain hero-accent-word">{h.heroHandWord}</span>
              </span>
            </Reveal>
          </h1>
          <Reveal delay={220}><p className="hero-sub">{h.heroSub}</p></Reveal>
          <Reveal delay={300} className="hero-actions">
            <a href="#/" onClick={(e) => {e.preventDefault();document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });}} className="btn btn--lg">{h.heroCta}<Icon name="arrow" /></a>
            <a href="https://portal.simple.taipei/" target="_blank" rel="noopener noreferrer" className="btn btn--lg btn--ghost">{h.heroCta2}</a>
          </Reveal>

          <Reveal delay={380} className="hero-metrics">
            {h.statbar.map((s, i) =>
            <div className="metric" key={i}>
                <span className="metric-v">{s.v}</span>
                <span className="metric-l">{s.l}</span>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------------- PROMISE ---------------- */}
      <section className="section promise">
        <div className="wrap promise-grid">
          <div className="promise-head">
            <Reveal><Eyebrow>{h.promiseEyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="promise-title">{h.promiseTitle}</h2></Reveal>
          </div>
          <Reveal delay={120} className="promise-body-wrap">
            <p className="promise-body">{h.promiseBody}</p>
          </Reveal>
        </div>
        <div className="wrap promise-cards">
          {h.promiseCards.map((c, i) =>
          <Reveal key={i} delay={i * 90} className="promise-card card">
              <span className="promise-card-no kbd">0{i + 1}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="section services" id="services">
        <div className="wrap">
          <div className="sec-head" style={{ maxWidth: "560px" }}>
            <Reveal><Eyebrow>{h.servicesEyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title" data-comment-anchor="d739657876-h2-67-32">{h.servicesTitle}</h2></Reveal>
          </div>
          <div className="svc-list">
            {h.services.map((s, i) =>
            <Reveal key={i} delay={i * 70} className="svc-row">
                <span className="svc-row-ico"><Icon name={s.icon} /></span>
                <div className="svc-row-body">
                  <span className="svc-row-tag kbd">{s.tag}</span>
                  <h3 className="svc-row-title">{s.title}</h3>
                  <p className="svc-row-desc">{s.desc}</p>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="svc-row-cta" aria-label={`${h.learnMore} – ${s.title}`}>
                  {h.learnMore}<Icon name="arrowUpRight" />
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="section features">
        <div className="wrap">
          <div className="sec-head">
            <Reveal><Eyebrow>{h.featuresEyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title">{h.featuresTitle}</h2></Reveal>
          </div>
          <div className="feat-grid">
            {h.features.map((f, i) =>
            <Reveal key={i} delay={i * 80} className="feat-card">
                <span className="feat-ico"><Icon name={f.icon} /></span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- LOCATIONS ---------------- */}
      <section className="section locations" id="locations">
        <div className="wrap loc-wrap">
          <div className="loc-head">
            <Reveal><Eyebrow>{h.locEyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title">{h.locTitle}</h2></Reveal>
            <Reveal delay={120}><p className="loc-desc">{h.locDesc}</p></Reveal>
          </div>
          <div className="loc-grid">
            {t.locationsList.map((l, i) =>
            <Reveal key={l.code} delay={i * 90} as="button" className="loc-card card" style={{ textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit" }}>
                <div className="loc-inner" onClick={() => setActiveLoc(l)}>
                  <div className="loc-img" style={{ backgroundImage: `url(${l.code === "TPE" ? ((window.__resources && window.__resources.locTPE) || "public/locations/taipei.webp") : l.code === "SIN" ? ((window.__resources && window.__resources.locSIN) || "public/locations/singapore.webp") : ((window.__resources && window.__resources.locHKG) || "public/locations/hongkong.webp")})` }}>
                    <span className="loc-code kbd">{l.code}</span>
                    <span className="loc-country kbd">{l.country}</span>
                  </div>
                  <div className="loc-body">
                    <div className="loc-city"><Icon name="pin" /><h3>{l.city}</h3></div>
                    <p className="loc-site">{l.site}</p>
                    <div className="loc-certs">
                      {l.certs.slice(0, 3).map((c) => <span className="loc-cert" key={c}>{c}</span>)}
                    </div>
                    <span className="loc-more">{h.locMore || "View facility"}<Icon name="arrowUpRight" /></span>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- PARTNERS ---------------- */}
      <section className="section-tight partners" id="partners">
        <div className="wrap" data-comment-anchor="70eadbed84-div-158-9">
          <div className="sec-head sec-head--center">
            <Reveal><Eyebrow>{t.partners.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title">{t.partners.title}</h2></Reveal>
            <Reveal delay={120}><p className="sec-lead">{t.partners.desc}</p></Reveal>
          </div>
          <div className="partner-grid">
            {t.partners.items.map((p, i) =>
            <Reveal key={p.name} delay={i * 80} className="partner-card card">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="partner-inner">
                  <div className="partner-logo"><img src={p.img} alt={p.name} /></div>
                  <div className="partner-meta">
                    <span className="partner-name">{p.name}</span>
                    <span className="partner-role kbd">{p.role}</span>
                  </div>
                  <Icon name="arrowUpRight" className="partner-arrow" />
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <LocationModal loc={activeLoc} t={t} onClose={() => setActiveLoc(null)} />

      {/* ---------------- FAQ ---------------- */}
      <section className="section faq">
        <div className="wrap faq-wrap">
          <div className="faq-head">
            <Reveal><Eyebrow>{h.faqEyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title">{h.faqTitle}</h2></Reveal>
          </div>
          <div className="faq-list">
            {h.faqs.map((f, i) => <FAQItem key={i} q={f[0]} a={f[1]} />)}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <CTABand title={h.ctaTitle} sub={h.ctaSub} btn={h.ctaBtn} href="https://portal.simple.taipei/submitticket.php" />
    </main>);

}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-plus"><Icon name="chevron" /></span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? bodyRef.current?.scrollHeight + 8 || 400 : 0 }}>
        <p ref={bodyRef}>{a}</p>
      </div>
    </div>);

}

function CTABand({ title, sub, btn, href }) {
  return (
    <section className="cta-band">
      <div className="cta-bg bg-dotgrid"></div>
      <div className="wrap cta-inner">
        <Reveal><Eyebrow onAccent>Simple Information</Eyebrow></Reveal>
        <Reveal delay={70}><h2 className="cta-title">{title}</h2></Reveal>
        <Reveal delay={140}><p className="cta-sub">{sub}</p></Reveal>
        <Reveal delay={200}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn--lg btn--on-accent">{btn}<Icon name="arrow" /></a>
        </Reveal>
      </div>
    </section>);

}

function LocationModal({ loc, t, onClose }) {
  useEffect(() => {
    if (!loc) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {document.removeEventListener("keydown", onKey);document.body.style.overflow = "";};
  }, [loc]);
  if (!loc) return null;
  const u = t.ui;
  const img = loc.code === "TPE" ? "taipei" : loc.code === "SIN" ? "singapore" : "hongkong";
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close icon-btn" onClick={onClose} aria-label={u.close}><Icon name="close" /></button>
        <div className="modal-hero" style={{ backgroundImage: `url(${img === "taipei" ? ((window.__resources && window.__resources.locTPE) || "public/locations/taipei.webp") : img === "singapore" ? ((window.__resources && window.__resources.locSIN) || "public/locations/singapore.webp") : ((window.__resources && window.__resources.locHKG) || "public/locations/hongkong.webp")})` }}>
          <div className="modal-hero-tint"></div>
          <div className="modal-hero-text">
            <span className="modal-code kbd">{loc.code} · {loc.country}</span>
            <h3 className="modal-city">{loc.city}</h3>
            <p className="modal-site"><Icon name="pin" />{loc.site}</p>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-blurb">{loc.blurb}</p>

          <div className="modal-section" data-comment-anchor="0e1e801748-div-260-11">
            <span className="modal-label kbd">{u.certifications}</span>
            <div className="modal-certs" data-comment-anchor="044fef5683-div-255-13">
              {loc.certs.map((c) => <span className="modal-cert" key={c}><Icon name="shield" />{c}</span>)}
            </div>
            {loc.certNote && <p className="modal-certnote">{loc.certNote}</p>}
          </div>

          <div className="modal-section" data-comment-anchor="17d8320a0c-div-268-11">
            <span className="modal-label kbd">{u.atAGlance}</span>
            <dl className="modal-specs">
              {loc.specs.map((s) =>
              <div className="modal-spec" key={s[0]}><dt>{s[0]}</dt><dd>{s[1]}</dd></div>
              )}
            </dl>
          </div>

          <div className="modal-section">
            <span className="modal-label kbd">{u.network}</span>
            <p className="modal-net">{loc.net}</p>
          </div>

          <a href="https://portal.simple.taipei/submitticket.php" target="_blank" rel="noopener noreferrer" className="btn btn--lg modal-cta">{u.viewLocation}<Icon name="arrow" /></a>
        </div>
      </div>
    </div>);

}

Object.assign(window, { HomePage, CTABand, FAQItem, LocationModal });