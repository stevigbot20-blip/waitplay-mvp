# WaitPlay MVP

Simple landing page + playable mini-games for quick validation.

## Live
- Vercel: https://waitplay-mvp.vercel.app/
- GitHub Pages: https://stevigbot20-blip.github.io/waitplay-mvp/

## What is real right now
- Landing page with sponsor offer CTA
- Mini-games linked from landing page:
  - `/apps/easy-mini-app/` (Tap Sprint with 30s/60s timed goal)
  - `/apps/better-mini-game/` (Whack-a-Dot - hit moving dots with combos)
  - `/apps/memory-match/` (Memory Match - find pairs in fewest moves)
  - `/apps/reaction-test/` (Reaction Test - test reflexes)
- Basic click tracking via `console.log`
- Newsletter form opens a pre-filled email subscription request

## Project structure
- `index.html`, `styles.css`, `script.js` - landing page
- `apps/easy-mini-app/*` - timed tap game
- `apps/better-mini-game/*` - dot hitting game
- `apps/memory-match/*` - card matching game
- `apps/reaction-test/*` - reaction timer game
- `privacy.html`, `terms.html`

## Local run
```bash
cd /home/node/.openclaw/workspace/waitplay-mvp
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Deploy
```bash
vercel --prod
```
or push to GitHub Pages repo/branch.
