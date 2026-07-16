// WaitPlay Arcade — shared game rotation.
// Each game calls WaitPlayArcade.gameOver({ score, label, onReplay }) when its
// round ends; the overlay auto-advances to the next game in PLAYLIST.
window.WaitPlayArcade = (() => {
  const PLAYLIST = [
    { slug: 'easy-mini-app', name: 'Sign Sprint', emoji: '🪧' },
    { slug: 'better-mini-game', name: 'Whack-a-Lead', emoji: '🎯' },
    { slug: 'memory-match', name: 'Listing Match', emoji: '🧠' },
    { slug: 'reaction-test', name: 'Offer Alert', emoji: '⚡' },
    { slug: 'snake', name: 'Key Collector', emoji: '🐍' },
    { slug: 'simon-says', name: 'Showing Day', emoji: '🚪' },
    { slug: 'number-rush', name: 'Commission Rush', emoji: '💰' },
    { slug: 'color-match', name: 'House Hunt', emoji: '🔎' },
  ];
  const AUTO_ADVANCE_SECONDS = 8;

  const currentIndex = () => {
    const m = location.pathname.match(/\/apps\/([^/]+)/);
    return Math.max(0, PLAYLIST.findIndex((g) => g.slug === (m ? m[1] : '')));
  };
  const nextGame = () => PLAYLIST[(currentIndex() + 1) % PLAYLIST.length];
  const nextUrl = () => `../${nextGame().slug}/index.html`;

  const css = `
    .arcade-overlay { position: fixed; inset: 0; background: rgba(10, 14, 30, 0.88);
      display: flex; align-items: center; justify-content: center; z-index: 9999;
      animation: arcadeFade 0.25s ease; }
    @keyframes arcadeFade { from { opacity: 0; } to { opacity: 1; } }
    .arcade-card { background: #151a2e; color: #eef1ff; border: 1px solid #2c3558;
      border-radius: 16px; padding: 28px 32px; max-width: 340px; width: 90%;
      text-align: center; font-family: inherit; box-shadow: 0 18px 50px rgba(0,0,0,0.5); }
    .arcade-card h2 { margin: 0 0 6px; font-size: 1.5rem; }
    .arcade-score { font-size: 1.1rem; margin: 0 0 14px; color: #9fb0e8; }
    .arcade-next { font-size: 0.95rem; margin: 0 0 18px; color: #c9d3f5; }
    .arcade-next b { color: #ffd166; }
    .arcade-btns { display: flex; flex-direction: column; gap: 10px; }
    .arcade-btns a, .arcade-btns button { display: block; width: 100%; padding: 12px;
      border-radius: 10px; border: none; font-size: 1rem; font-weight: 600;
      cursor: pointer; text-decoration: none; font-family: inherit; }
    .arcade-btn-next { background: #4a6cff; color: #fff; }
    .arcade-btn-replay { background: #232b4a; color: #dfe6ff; }
    .arcade-btn-home { background: transparent; color: #8fa0d0; font-weight: 400; }
  `;

  function gameOver({ score, label, onReplay } = {}) {
    if (document.querySelector('.arcade-overlay')) return;
    window.WaitPlaySfx?.play('win');

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const next = nextGame();
    const overlay = document.createElement('div');
    overlay.className = 'arcade-overlay';
    overlay.innerHTML = `
      <div class="arcade-card">
        <h2>🏁 Round over!</h2>
        <p class="arcade-score">${label != null ? label : (score != null ? `Score: ${score}` : '')}</p>
        <p class="arcade-next">Next up: <b>${next.emoji} ${next.name}</b> in <b><span class="arcade-count">${AUTO_ADVANCE_SECONDS}</span>s</b></p>
        <div class="arcade-btns">
          <a class="arcade-btn-next" href="${nextUrl()}">${next.emoji} Play ${next.name} now</a>
          <button class="arcade-btn-replay" type="button">🔁 Replay this game</button>
          <a class="arcade-btn-home" href="../../index.html">← Back to all games</a>
        </div>
      </div>
    `;

    let remaining = AUTO_ADVANCE_SECONDS;
    const countEl = overlay.querySelector('.arcade-count');
    const ticker = setInterval(() => {
      remaining -= 1;
      countEl.textContent = String(remaining);
      if (remaining <= 0) {
        clearInterval(ticker);
        location.href = nextUrl();
      }
    }, 1000);

    overlay.querySelector('.arcade-btn-replay').addEventListener('click', () => {
      clearInterval(ticker);
      overlay.remove();
      if (typeof onReplay === 'function') onReplay();
    });

    document.body.appendChild(overlay);
  }

  return { gameOver, PLAYLIST };
})();
