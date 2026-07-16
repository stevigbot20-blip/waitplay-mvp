// Commission Rush — 30s of quick commission math.
(() => {
  const ROUND_SECONDS = 30;
  const BEST_KEY = 'commission-rush-best';

  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const timeEl = document.getElementById('time');
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const statusEl = document.getElementById('status');
  const startBtn = document.getElementById('startBtn');

  let best = Number.parseInt(localStorage.getItem(BEST_KEY), 10);
  if (!Number.isFinite(best) || best < 0) best = 0;
  bestEl.textContent = String(best);

  let score = 0;
  let timeLeft = ROUND_SECONDS;
  let timer = null;
  let running = false;
  let locked = false;

  const fmt = (n) => '$' + n.toLocaleString('en-US');

  function makeQuestion() {
    // Clean numbers: price in 100k steps, whole-percent commission.
    const price = (Math.floor(Math.random() * 13) + 2) * 100000; // $200k–$1.4M
    const pct = [1, 2, 3, 5, 6][Math.floor(Math.random() * 5)];
    const answer = (price * pct) / 100;

    const options = new Set([answer]);
    while (options.size < 4) {
      const factor = [0.5, 2, 10, 0.1, 1.5][Math.floor(Math.random() * 5)];
      const distractor = Math.round(answer * factor);
      if (distractor !== answer && distractor > 0) options.add(distractor);
    }
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    return { text: `${fmt(price)} sale at ${pct}% commission — what's your cut?`, answer, options: shuffled };
  }

  function showQuestion() {
    const q = makeQuestion();
    locked = false;
    questionEl.textContent = q.text;
    answersEl.innerHTML = '';
    q.options.forEach((opt) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = fmt(opt);
      b.addEventListener('click', () => {
        if (!running || locked) return;
        locked = true;
        if (opt === q.answer) {
          window.WaitPlaySfx?.play('good');
          b.classList.add('correct');
          score += 1;
          scoreEl.textContent = String(score);
          setTimeout(showQuestion, 250);
        } else {
          window.WaitPlaySfx?.play('bad');
          b.classList.add('wrong');
          [...answersEl.children].find((c) => c.textContent === fmt(q.answer))?.classList.add('correct');
          setTimeout(showQuestion, 650);
        }
      });
      answersEl.appendChild(b);
    });
  }

  function endRound() {
    running = false;
    clearInterval(timer);
    answersEl.innerHTML = '';
    questionEl.textContent = 'Market closed!';
    startBtn.disabled = false;
    if (score > best) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
      bestEl.textContent = String(best);
    }
    if (window.WaitPlayArcade) {
      window.WaitPlayArcade.gameOver({
        label: `${score} deals closed in ${ROUND_SECONDS}s (best ${best})`,
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
    showQuestion();
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft -= 1;
      timeEl.textContent = String(timeLeft);
      if (timeLeft <= 0) endRound();
    }, 1000);
  }

  startBtn.addEventListener('click', start);
})();
