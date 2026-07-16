// House Hunt — spot the odd house out. Grid grows as you score.
(() => {
  const ROUND_SECONDS = 30;
  const BEST_KEY = 'house-hunt-best';
  const PAIRS = [
    ['🏠', '🏡'], ['🏢', '🏬'], ['🏰', '🏯'], ['⛺', '🏕️'], ['🏚️', '🏠'],
  ];

  const grid = document.getElementById('grid');
  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const timeEl = document.getElementById('time');
  const statusEl = document.getElementById('status');
  const startBtn = document.getElementById('startBtn');

  let best = Number.parseInt(localStorage.getItem(BEST_KEY), 10);
  if (!Number.isFinite(best) || best < 0) best = 0;
  bestEl.textContent = String(best);

  let score = 0;
  let timeLeft = ROUND_SECONDS;
  let timer = null;
  let running = false;

  function buildGrid() {
    const side = Math.min(3 + Math.floor(score / 3), 6); // 3x3 up to 6x6
    const total = side * side;
    const odd = Math.floor(Math.random() * total);
    const [common, different] = PAIRS[Math.floor(Math.random() * PAIRS.length)];

    grid.style.gridTemplateColumns = `repeat(${side}, 1fr)`;
    grid.innerHTML = '';
    for (let i = 0; i < total; i += 1) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = i === odd ? different : common;
      b.addEventListener('click', () => {
        if (!running) return;
        if (i === odd) {
          window.WaitPlaySfx?.play('good');
          score += 1;
          scoreEl.textContent = String(score);
          buildGrid();
        } else {
          window.WaitPlaySfx?.play('bad');
          b.classList.add('wrong');
          timeLeft = Math.max(1, timeLeft - 2);
          timeEl.textContent = String(timeLeft);
          statusEl.textContent = 'Wrong house! −2s';
          setTimeout(() => { statusEl.textContent = ''; }, 700);
        }
      });
      grid.appendChild(b);
    }
  }

  function endRound() {
    running = false;
    clearInterval(timer);
    grid.innerHTML = '';
    startBtn.disabled = false;
    if (score > best) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
      bestEl.textContent = String(best);
    }
    if (window.WaitPlayArcade) {
      window.WaitPlayArcade.gameOver({
        label: `${score} mismatched houses found (best ${best})`,
        onReplay: start,
      });
    }
  }

  function start() {
    score = 0;
    timeLeft = ROUND_SECONDS;
    running = true;
    scoreEl.textContent = '0';
    timeEl.textContent = String(timeLeft);
    statusEl.textContent = '';
    startBtn.disabled = true;
    buildGrid();
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft -= 1;
      timeEl.textContent = String(timeLeft);
      if (timeLeft <= 0) endRound();
    }, 1000);
  }

  startBtn.addEventListener('click', start);
})();
