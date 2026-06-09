# Simple Information, Inc.

The official website of **Simple Information, Inc.** — *Complex infrastructure, made simple.*

Enterprise-grade dedicated servers, colocation and IP transit across Taipei,
Singapore and Hong Kong.

A bilingual (English / 繁體中文) single-page site built with React. JSX is
transpiled in the browser by [`@babel/standalone`](https://babeljs.io/docs/babel-standalone),
so there is no build step.

## Running locally

The page loads its `.jsx` files over XHR (so Babel can transpile them), which
browsers block over `file://`. Serve it over HTTP instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

Any static file server works (`npx serve`, `caddy file-server`, nginx, …).
An internet connection is required at runtime — React, ReactDOM, Babel and the
web fonts load from CDNs (unpkg + Google Fonts).

## Project layout

```
index.html          Entry point: CDN libs/fonts, then the app scripts below
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

Scripts load in dependency order in `index.html`: React → ReactDOM → Babel →
`i18n.js` → the four `text/babel` component files → `app.jsx`
(`data-presets="react"`).

## Internationalisation

All translated strings live inline in `i18n.js`
(`window.I18N.en` / `window.I18N["zh-TW"]`). There is no runtime JSON fetch.
