/* ============================================================
   APP SHELL — routing, theme, locale, tweaks
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "blue",
  "motif": "dots",
  "hand": true,
  "corners": "soft",
  "headfont": "hanken"
}/*EDITMODE-END*/;

const ACCENT_SWATCHES = [
  { key: "blue", color: "#3b6fd4", label: "Refined Blue" },
  { key: "cyan", color: "#1f97b8", label: "Electric Cyan" },
  { key: "indigo", color: "#5a52d4", label: "Indigo" },
  { key: "sand", color: "#c2872f", label: "Warm Sand" },
];

function useStored(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s === null ? initial : JSON.parse(s); } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [theme, setTheme] = useStored("si-theme", "light");
  const [locale, setLocale] = useStored("si-locale", "en");
  const [route, setRoute] = useState(() => window.location.hash || "#/");

  // routing
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = useCallback((hash) => {
    if (hash === window.location.hash) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    window.location.hash = hash;
  }, []);

  // apply root attributes
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", theme);
    r.setAttribute("data-accent", tw.accent);
    r.setAttribute("data-headfont", tw.headfont);
    r.setAttribute("data-corners", tw.corners);
    r.setAttribute("data-hand", tw.hand ? "on" : "off");
  }, [theme, tw.accent, tw.headfont, tw.corners, tw.hand]);

  // lang + dir
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hant" : "en";
  }, [locale]);

  const t = window.I18N[locale];
  const toggleTheme = () => setTheme((v) => (v === "dark" ? "light" : "dark"));

  let Page;
  if (route.startsWith("#/partnership")) Page = PartnershipPage;
  else if (route.startsWith("#/responsibility")) Page = ResponsibilityPage;
  else Page = HomePage;

  const baseRoute = route.startsWith("#/partnership") ? "#/partnership"
    : route.startsWith("#/responsibility") ? "#/responsibility" : "#/";

  return (
    <React.Fragment>
      <Header t={t} locale={locale} setLocale={setLocale} theme={theme} toggleTheme={toggleTheme} route={baseRoute} go={go} />
      <div key={baseRoute + locale} className="page-fade">
        <Page t={t} motif={tw.motif} go={go} />
      </div>
      <Footer t={t} go={go} />

      <TweaksPanel>
        <TweakSection label="Brand color" />
        <div className="tw-row">
          <span className="tw-row-label">Accent</span>
          <div className="tw-swatches">
            {ACCENT_SWATCHES.map((s) => (
              <button key={s.key}
                className={`tw-swatch ${tw.accent === s.key ? "on" : ""}`}
                style={{ "--sw": s.color }}
                title={s.label}
                onClick={() => setTweak("accent", s.key)} />
            ))}
          </div>
        </div>
        <TweakRadio label="Theme" value={theme} options={["light", "dark"]} onChange={(v) => setTheme(v)} />
        <TweakRadio label="Corners" value={tw.corners} options={["soft", "sharp"]} onChange={(v) => setTweak("corners", v)} />

        <TweakSection label="Hero & type" />
        <TweakRadio label="Backdrop" value={tw.motif} options={["dots", "topo", "plain"]} onChange={(v) => setTweak("motif", v)} />
        <TweakToggle label="Handwritten accent" value={tw.hand} onChange={(v) => setTweak("hand", v)} />
        <TweakRadio label="Heading font" value={tw.headfont} options={["hanken", "schibsted"]} onChange={(v) => setTweak("headfont", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
