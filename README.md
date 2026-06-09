# Simple Information, Inc. — Website

Marketing site for Simple Information, Inc. ("Complex infrastructure, made simple.").
A single-page React app whose JSX is transpiled in the browser by
[`@babel/standalone`](https://babeljs.io/docs/babel-standalone) — no build step required.

This is the **un-bundled** form of the site: the previous single 13 MB
`Simple Information Site Bundled.html` (which inlined every asset as base64) has
been split back into ordinary files.

## Running locally

The page loads the `.jsx` files over XHR (so Babel can transpile them), which
browsers **block over `file://`**. Serve it over HTTP instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

Any static file server works (`npx serve`, `caddy file-server`, nginx, etc.).
An internet connection is required at runtime — React, ReactDOM, Babel and the
web fonts are loaded from CDNs (unpkg + Google Fonts).

## Project layout

```
index.html          Entry point: loads CDN libs/fonts, then the app scripts below
styles.css          Design tokens, base typography, component primitives
layout.css          Page layout, sections, responsive rules
i18n.js             Bilingual copy (en / zh-TW) on window.I18N — loaded first
tweaks-panel.jsx    Live theme/tweak panel
components.jsx      Shared UI components (header, footer, primitives)
home.jsx            Home page sections
pages.jsx           Secondary pages (partnership, responsibility, …)
app.jsx             Root component + router + ReactDOM mount (loaded last)
public/
  logo-sticker.png
  coop/             Partner logos (Fast Line, SkyDigital, TWDS)
  locations/        Datacenter photos (Taipei, Singapore, Hong Kong)
```

Scripts are loaded in dependency order in `index.html`: React → ReactDOM →
Babel → `i18n.js` → the four `text/babel` component files → `app.jsx`
(`data-presets="react"`).

## Images

Image sources are resolved as `window.__resources[id] || "public/<path>"`.
`window.__resources` only exists in the bundled build, so in this un-bundled
site every image falls back to its `public/` path — the seven files above are
exactly the ones referenced.

## Internationalisation

All translated strings live inline in `i18n.js` (`window.I18N.en` /
`window.I18N["zh-TW"]`). There is no runtime JSON fetch.
