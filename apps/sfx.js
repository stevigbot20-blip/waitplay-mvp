// WaitPlay SFX — tiny Web Audio synth, no audio files.
// Games call WaitPlaySfx.play('tap'|'good'|'bad'|'match'|'flip'|'win'|'lose'|'go'|'pickup'|'levelup')
// or WaitPlaySfx.tone(freq, ms) for custom notes (e.g. Simon doors).
// A floating 🔊/🔇 button is injected; the choice persists in localStorage.
window.WaitPlaySfx = (() => {
  const MUTE_KEY = 'waitplay-muted';
  let ctx = null;
  let muted = localStorage.getItem(MUTE_KEY) === '1';

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // Browsers require a user gesture before audio — arm on the first one.
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) =>
    document.addEventListener(ev, ensureCtx, { once: true, capture: true })
  );

  function tone(freq, ms = 120, { type = 'sine', vol = 0.16, when = 0, slideTo = null } = {}) {
    if (muted) return;
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime + when;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + ms / 1000);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + ms / 1000);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + ms / 1000 + 0.02);
  }

  const FX = {
    tap:     () => tone(660, 50, { type: 'square', vol: 0.07 }),
    flip:    () => tone(440, 70, { type: 'triangle', vol: 0.1 }),
    good:    () => { tone(660, 90, { type: 'triangle' }); tone(880, 120, { type: 'triangle', when: 0.08 }); },
    match:   () => { tone(523, 90, { type: 'triangle' }); tone(659, 90, { when: 0.09, type: 'triangle' }); tone(784, 140, { when: 0.18, type: 'triangle' }); },
    bad:     () => tone(200, 220, { type: 'sawtooth', vol: 0.1, slideTo: 120 }),
    go:      () => tone(880, 150, { type: 'square', vol: 0.12 }),
    pickup:  () => tone(740, 80, { type: 'square', vol: 0.09, slideTo: 1100 }),
    levelup: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 110, { when: i * 0.09, type: 'triangle' })); },
    win:     () => { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 130, { when: i * 0.1, type: 'triangle' })); },
    lose:    () => { [392, 330, 262].forEach((f, i) => tone(f, 180, { when: i * 0.14, type: 'triangle', vol: 0.12 })); },
  };

  function play(name) { (FX[name] || (() => {}))(); }

  function setMuted(m) {
    muted = m;
    localStorage.setItem(MUTE_KEY, m ? '1' : '0');
    if (btn) btn.textContent = m ? '🔇' : '🔊';
  }

  // Mute toggle button — same style/placement as Roost Tycoon's: a round
  // panel-colored pill pinned to the top-right of the game card.
  let btn = null;
  function addButton() {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = muted ? '🔇' : '🔊';
    btn.setAttribute('aria-label', 'Toggle sound');
    const card = document.querySelector('.app');
    const base =
      'width:38px;height:38px;border-radius:999px;border:1px solid #2c3558;' +
      'background:#1a1f34;color:#eef1ff;font-size:1.05rem;line-height:1;' +
      'cursor:pointer;z-index:9998;';
    if (card) {
      if (!card.style.position) card.style.position = 'relative';
      btn.style.cssText = base + 'position:absolute;top:14px;right:14px;';
      card.appendChild(btn);
    } else {
      btn.style.cssText = base + 'position:fixed;top:10px;right:10px;';
      document.body.appendChild(btn);
    }
    btn.addEventListener('click', (e) => { e.stopPropagation(); setMuted(!muted); if (!muted) { ensureCtx(); play('good'); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addButton);
  else addButton();

  return { play, tone, setMuted, get muted() { return muted; } };
})();
