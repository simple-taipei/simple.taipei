/* ============================================================
   PARTNERSHIP PAGE
   ============================================================ */
function Rotator({ items }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 2600);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <span className="rotator">
      {items.map((it, idx) => (
        <span key={idx} className={`rotator-item ${idx === i ? "on" : ""}`}>{it}</span>
      ))}
    </span>
  );
}

function PageHero({ eyebrow, prefix, rotating, title, subtitle, cta, ctaHref, motif }) {
  return (
    <section className="phero">
      <div className={`hero-bg ${motif === "dots" ? "bg-dotgrid" : motif === "topo" ? "bg-topo" : ""}`}></div>
      <div className="hero-glow"></div>
      <div className="wrap phero-inner">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={60}><h1 className="phero-title">{title}</h1></Reveal>
        <Reveal delay={120}><p className="phero-sub">{subtitle}</p></Reveal>
        <Reveal delay={180}>
          <p className="phero-rot"><span className="phero-rot-pre">{prefix}</span> <Rotator items={rotating} /></p>
        </Reveal>
        <Reveal delay={240} className="hero-actions">
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn--lg">{cta}<Icon name="arrow" /></a>
        </Reveal>
      </div>
    </section>
  );
}

function PartnershipPage({ t, motif, go }) {
  const p = t.partnership;
  return (
    <main>
      <PageHero eyebrow={p.eyebrow} prefix={p.heroPrefix} rotating={p.rotating} title={p.title} subtitle={p.subtitle} cta={p.cta} ctaHref="https://portal.simple.taipei/submitticket.php" motif={motif} />

      {/* Tagline + stats */}
      <section className="section pt-tagline">
        <div className="wrap pt-tag-grid">
          <Reveal className="pt-tag-quote">
            <span className="pt-quote-mark hand">“</span>
            <h2>{p.taglineTitle}</h2>
          </Reveal>
          <Reveal delay={90} className="pt-tag-body"><p>{p.taglineBody}</p></Reveal>
        </div>
        <div className="wrap">
          <Reveal className="stat-strip card">
            {p.stats.map((s, i) => (
              <div className="stat-cell" key={i}>
                <span className="stat-v"><CountUp to={s.v} suffix={s.suffix} decimals={s.suffix === "%" ? 1 : 0} /></span>
                <span className="stat-l">{s.l}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Partner types */}
      <section className="section pt-types">
        <div className="wrap">
          <div className="sec-head sec-head--center">
            <Reveal><Eyebrow>{p.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title">{p.typesTitle}</h2></Reveal>
            <Reveal delay={120}><p className="sec-lead">{p.typesDesc}</p></Reveal>
          </div>
          <div className="ptype-grid">
            {p.types.map((ty, i) => (
              <Reveal key={ty.id} delay={i * 90} className="ptype-card card">
                <span className="ptype-ico"><Icon name={ty.icon} /></span>
                <h3>{ty.title}</h3>
                <p className="ptype-desc">{ty.desc}</p>
                <div className="ptype-benefits">
                  <span className="ptype-benefits-h kbd">{p.benefitsTitle}</span>
                  {ty.benefits.map((b, j) => (
                    <span className="ptype-benefit" key={j}><Icon name="check" />{b}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach steps */}
      <section className="section pt-approach">
        <div className="wrap">
          <div className="sec-head">
            <Reveal><Eyebrow>{p.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title">{p.approachTitle}</h2></Reveal>
            <Reveal delay={120}><p className="sec-lead">{p.approachDesc}</p></Reveal>
          </div>
          <div className="step-grid">
            {p.steps.map((s, i) => (
              <Reveal key={i} delay={i * 80} className="step-card">
                <span className="step-no">{s[0]}</span>
                <div className="step-body">
                  <h3>{s[1]}</h3>
                  <p>{s[2]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={p.contactTitle} sub={p.contactDesc} btn={p.contactBtn} href="https://portal.simple.taipei/submitticket.php" />
    </main>
  );
}

/* ============================================================
   RESPONSIBILITY PAGE
   ============================================================ */
function SponsorModal({ t, onClose }) {
  const r = t.responsibility;
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);
  const m = r.sponsorModal;
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        <div className="modal-body" style={{ paddingTop: "32px" }}>
          <span className="eyebrow"><span className="tick"></span>{m.eyebrow}</span>
          <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "12px 0 8px", lineHeight: 1.3 }}>{m.title}</h2>
          <p style={{ fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.7, marginBottom: "28px" }}>{m.desc}</p>

          <dl className="modal-specs">
            {m.items.map(([dt, dd]) => (
              <div className="modal-spec" key={dt}>
                <dt>{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>

          <div style={{ marginTop: "28px", padding: "20px", background: "var(--surface-2)", borderRadius: "12px", border: "1px solid var(--line)" }}>
            <p style={{ fontSize: "13px", color: "var(--ink-3)", marginBottom: "6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>{m.applyLabel}</p>
            <p style={{ fontSize: "14.5px", color: "var(--ink-2)", lineHeight: 1.6, marginBottom: "16px" }}>{m.applyDesc}</p>
            <a href="mailto:sales@simple.taipei" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {m.applyBtn}<Icon name="mail" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResponsibilityPage({ t, motif, go }) {
  const r = t.responsibility;
  const [sponsorOpen, setSponsorOpen] = useState(false);
  return (
    <main>
      <PageHero eyebrow={r.eyebrow} prefix={r.heroPrefix} rotating={r.rotating} title={r.title} subtitle={r.subtitle} cta={r.cta} ctaHref="#/responsibility" motif={motif} />

      {/* Philosophy */}
      <section className="section rs-phil">
        <div className="wrap rs-phil-grid">
          <div className="rs-phil-head">
            <Reveal><Eyebrow>{r.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title">{r.philTitle}</h2></Reveal>
          </div>
          <div className="rs-phil-body">
            <Reveal delay={90}><p className="rs-phil-lead">{r.phil1}</p></Reveal>
            <Reveal delay={150}><p className="rs-phil-p">{r.phil2}</p></Reveal>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="section-tight rs-impact">
        <div className="wrap">
          <Reveal className="rs-impact-head"><Eyebrow>{r.impactTitle}</Eyebrow></Reveal>
          <div className="rs-impact-grid">
            {r.achievements.map((a, i) => (
              <Reveal key={i} delay={i * 90} className="rs-impact-cell">
                <span className="rs-impact-v"><CountUp to={a.v} suffix={a.suffix} /></span>
                <span className="rs-impact-l">{a.l}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship feature */}
      <section className="section rs-sponsor">
        <div className="wrap">
          <Reveal className="rs-sponsor-card card">
            <div className="rs-sponsor-text">
              <Eyebrow>{r.eyebrow}</Eyebrow>
              <h2 className="sec-title">{r.sponsorTitle}</h2>
              <p>{r.sponsorDesc}</p>
              <button onClick={() => setSponsorOpen(true)} className="tlink" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit", display: "inline-flex", alignItems: "center", gap: "6px", padding: 0 }}>{r.sponsorBtn}<Icon name="arrowUpRight" /></button>
            </div>
            <div className="rs-sponsor-deco">
              <Icon name="network" className="rs-sponsor-glyph" />
            </div>
          </Reveal>
        </div>
      </section>

      {sponsorOpen && <SponsorModal t={t} onClose={() => setSponsorOpen(false)} />}

      {/* Case studies */}
      <section className="section rs-cases">
        <div className="wrap">
          <div className="sec-head">
            <Reveal><Eyebrow>{r.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="sec-title">{r.casesTitle}</h2></Reveal>
          </div>
          <div className="rs-case-grid">
            {r.cases.map((c, i) => (
              <Reveal key={i} delay={i * 80} className={`rs-case-card card ${c.open ? "is-open-call" : ""}`}>
                <span className="rs-case-ico"><Icon name={c.open ? "spark" : "check"} /></span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                {c.open && <a href="mailto:sales@simple.taipei" className="tlink rs-case-link">{r.contactBtn}<Icon name="arrow" /></a>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={r.contactTitle} sub={r.contactDesc} btn={r.contactBtn} href="mailto:sales@simple.taipei" />
    </main>
  );
}

Object.assign(window, { PartnershipPage, ResponsibilityPage, PageHero, Rotator });
