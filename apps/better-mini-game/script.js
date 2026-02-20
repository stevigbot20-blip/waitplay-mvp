(() => {
  const GAME_SECONDS = 30;
  const MISS_PENALTY = 2;

  const arena = document.getElementById('arena');
  const dot = document.getElementById('dot');
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlayText = document.getElementById('overlayText');
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');

  const timeEl = document.getElementById('time');
  const scoreEl = document.getElementById('score');
  const comboEl = document.getElementById('combo');
  const bestEl = document.getElementById('best');
  const hitsEl = document.getElementById('hits');
  const missesEl = document.getElementById('misses');
  const accuracyEl = document.getElementById('accuracy');

  let running = false;
  let score = 0;
  let combo = 0;
  let hits = 0;
  let misses = 0;
  let startTime = 0;
  let rafId = null;
  let bestScore = Number(localStorage.getItem('whackDotBest') || 0);
  bestEl.textContent = String(bestScore);

  function comboMultiplier() {
    return Math.min(1 + Math.floor(combo / 3) * 0.5, 4);
  }

  function clampScore(v) {
    return Math.max(0, Math.round(v));
  }

  function updateHUD(remaining = GAME_SECONDS) {
    timeEl.textContent = `${remaining.toFixed(1)}s`;
    scoreEl.textContent = String(score);
    comboEl.textContent = `x${comboMultiplier().toFixed(1).replace('.0', '')}`;
    hitsEl.textContent = String(hits);
    missesEl.textContent = String(misses);
    const total = hits + misses;
    const acc = total === 0 ? 0 : Math.round((hits / total) * 100);
    accuracyEl.textContent = `${acc}%`;
  }

  function moveDot() {
    const rect = arena.getBoundingClientRect();
    const size = dot.getBoundingClientRect().width || 60;
    const pad = size / 2 + 6;
    const x = pad + Math.random() * Math.max(10, rect.width - pad * 2);
    const y = pad + Math.random() * Math.max(10, rect.height - pad * 2);
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.classList.remove('pop');
    void dot.offsetWidth;
    dot.classList.add('pop');
  }

  function showOverlay(title, text, buttonText) {
    overlayTitle.textContent = title;
    overlayText.innerHTML = text;
    startBtn.textContent = buttonText;
    overlay.classList.add('show');
  }

  function hideOverlay() {
    overlay.classList.remove('show');
  }

  function endGame() {
    running = false;
    cancelAnimationFrame(rafId);
    dot.classList.add('hidden');
    restartBtn.disabled = false;

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem('whackDotBest', String(bestScore));
      bestEl.textContent = String(bestScore);
    }

    const total = hits + misses;
    const acc = total === 0 ? 0 : Math.round((hits / total) * 100);
    showOverlay(
      '⏰ Game Over!',
      `Final score: <b>${score}</b><br>Hits: <b>${hits}</b> · Misses: <b>${misses}</b> · Accuracy: <b>${acc}%</b><br>Best score: <b>${bestScore}</b>`,
      'Play Again'
    );
  }

  function frame(now) {
    if (!running) return;
    const elapsed = (now - startTime) / 1000;
    const remaining = Math.max(0, GAME_SECONDS - elapsed);
    updateHUD(remaining);
    if (remaining <= 0) {
      endGame();
      return;
    }
    rafId = requestAnimationFrame(frame);
  }

  function startGame() {
    running = true;
    score = 0;
    combo = 0;
    hits = 0;
    misses = 0;
    restartBtn.disabled = false;
    dot.classList.remove('hidden');
    hideOverlay();
    updateHUD(GAME_SECONDS);
    moveDot();
    startTime = performance.now();
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(frame);
    arena.focus();
  }

  function hit() {
    if (!running) return;
    combo += 1;
    hits += 1;
    score = clampScore(score + 10 * comboMultiplier());
    updateHUD(Math.max(0, GAME_SECONDS - (performance.now() - startTime) / 1000));
    moveDot();
  }

  function miss() {
    if (!running) return;
    combo = 0;
    misses += 1;
    score = clampScore(score - MISS_PENALTY);
    updateHUD(Math.max(0, GAME_SECONDS - (performance.now() - startTime) / 1000));
  }

  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    hit();
  });

  arena.addEventListener('click', (e) => {
    if (e.target !== dot) miss();
  });

  // Keyboard accessibility: press Space/Enter while arena focused to attempt a hit.
  // If dot is close to center, it's a successful hit; otherwise it's a miss.
  arena.addEventListener('keydown', (e) => {
    if (!running) return;
    if (e.code !== 'Space' && e.code !== 'Enter') return;
    e.preventDefault();

    const a = arena.getBoundingClientRect();
    const d = dot.getBoundingClientRect();
    const cx = a.left + a.width / 2;
    const cy = a.top + a.height / 2;
    const dx = d.left + d.width / 2 - cx;
    const dy = d.top + d.height / 2 - cy;
    const dist = Math.hypot(dx, dy);
    const threshold = Math.min(a.width, a.height) * 0.22;
    if (dist < threshold) hit(); else miss();
  });

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);

  updateHUD(GAME_SECONDS);
})();
