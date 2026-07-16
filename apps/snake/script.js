// Key Collector — snake variant. Collect keys, avoid the fence and yourself.
(() => {
  const GRID = 18;
  const BEST_KEY = 'key-collector-best';

  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const speedEl = document.getElementById('speed');
  const statusEl = document.getElementById('status');
  const startBtn = document.getElementById('startBtn');

  let best = Number.parseInt(localStorage.getItem(BEST_KEY), 10);
  if (!Number.isFinite(best) || best < 0) best = 0;
  bestEl.textContent = String(best);

  let snake, dir, nextDir, key, score, tickMs, timer, running;

  const cell = () => canvas.width / GRID;

  function placeKey() {
    do {
      key = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snake.some((s) => s.x === key.x && s.y === key.y));
  }

  function draw() {
    ctx.fillStyle = '#10162b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const c = cell();

    // key
    ctx.font = `${c * 0.9}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔑', key.x * c + c / 2, key.y * c + c / 2);

    // snake
    snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? '#ffd166' : '#4a6cff';
      ctx.beginPath();
      ctx.roundRect(s.x * c + 1, s.y * c + 1, c - 2, c - 2, c * 0.25);
      ctx.fill();
    });
    // agent head
    const h = snake[0];
    ctx.fillText('🧑‍💼', h.x * c + c / 2, h.y * c + c / 2);
  }

  function speedLabel() {
    return `${(120 / tickMs).toFixed(1).replace('.0', '')}x`;
  }

  function endRound() {
    running = false;
    clearInterval(timer);
    if (score > best) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
      bestEl.textContent = String(best);
    }
    startBtn.disabled = false;
    statusEl.textContent = 'Ouch — hit the fence!';
    if (window.WaitPlayArcade) {
      window.WaitPlayArcade.gameOver({
        label: `${score} keys collected (best ${best})`,
        onReplay: start,
      });
    }
  }

  function tick() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
    const hitSelf = snake.some((s) => s.x === head.x && s.y === head.y);
    if (hitWall || hitSelf) { window.WaitPlaySfx?.play('bad'); return endRound(); }

    snake.unshift(head);
    if (head.x === key.x && head.y === key.y) {
      window.WaitPlaySfx?.play('pickup');
      score += 1;
      scoreEl.textContent = String(score);
      placeKey();
      if (score % 4 === 0 && tickMs > 60) {
        tickMs -= 10;
        clearInterval(timer);
        timer = setInterval(tick, tickMs);
        speedEl.textContent = speedLabel();
      }
    } else {
      snake.pop();
    }
    draw();
  }

  function setDir(name) {
    const dirs = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    const d = dirs[name];
    if (!d || !running) return;
    // no instant 180s
    if (d.x === -dir.x && d.y === -dir.y) return;
    nextDir = d;
  }

  function start() {
    snake = [{ x: 5, y: 9 }, { x: 4, y: 9 }, { x: 3, y: 9 }];
    dir = { x: 1, y: 0 };
    nextDir = dir;
    score = 0;
    tickMs = 120;
    running = true;
    scoreEl.textContent = '0';
    speedEl.textContent = speedLabel();
    statusEl.textContent = 'Collect the keys!';
    startBtn.disabled = true;
    placeKey();
    draw();
    clearInterval(timer);
    timer = setInterval(tick, tickMs);
  }

  document.addEventListener('keydown', (e) => {
    const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    if (map[e.key]) {
      e.preventDefault();
      setDir(map[e.key]);
    }
  });

  document.querySelectorAll('.dpad-btn').forEach((b) =>
    b.addEventListener('click', () => setDir(b.dataset.dir))
  );

  // swipe steering
  let touchStart = null;
  canvas.addEventListener('touchstart', (e) => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  canvas.addEventListener('touchend', (e) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 'right' : 'left');
    else setDir(dy > 0 ? 'down' : 'up');
    touchStart = null;
  });

  startBtn.addEventListener('click', start);

  // idle preview board before the first round
  snake = [{ x: 5, y: 9 }, { x: 4, y: 9 }, { x: 3, y: 9 }];
  key = { x: 12, y: 9 };
  dir = { x: 1, y: 0 };
  running = false;
  draw();
})();
