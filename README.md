# WaitPlay MVP

A static, responsive MVP website for a **"Play while you wait"** micro-games hub, designed as a monetization-ready starter.

## Included

- Hero + positioning for quick-play waiting moments
- Mini-app cards linking to local apps when present:
  - `../easy-mini-app/`
  - `../better-mini-game/`
- Email capture UI (frontend-only demo using `localStorage`)
- Simple analytics-friendly event hooks (`console.log` wrapper)
- Monetization section:
  - Ad placeholder blocks
  - Premium themes mock CTA
- Legal stubs:
  - `privacy.html`
  - `terms.html`

## Project structure

- `index.html` — main landing page
- `styles.css` — responsive styling
- `script.js` — rendering, tracking hooks, localStorage form logic
- `privacy.html` — privacy stub
- `terms.html` — terms stub

## Run locally (Host Ubuntu terminal)

From the host Ubuntu terminal:

```bash
cd /home/node/.openclaw/workspace/waitplay-mvp
python3 -m http.server 8080
```

Open:

- `http://localhost:8080`

## Quick deploy options

### GitHub Pages

1. Push this folder to a GitHub repo.
2. In GitHub: **Settings → Pages**.
3. Source: **Deploy from branch**.
4. Choose `main` branch and `/ (root)`.
5. Save; wait for deployment URL.

### Netlify (drag & drop)

1. Go to Netlify dashboard.
2. Use **Add new site → Deploy manually**.
3. Drag this folder (or zip contents).
4. Netlify provides a live URL instantly.

## Notes for production

- Replace localStorage email capture with a real backend/API.
- Swap ad placeholders for ad-network tags.
- Wire `track()` events to your analytics endpoint/provider.
- Replace legal stubs with finalized policy and terms.
