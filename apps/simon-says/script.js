// Showing Day — Simon-style sequence memory with four doors.
(() => {
  const BEST_KEY = 'showing-day-best';

  const doors = [...document.querySelectorAll('.door')];
  const streakEl = document.getElementById('streak');
  const bestEl = document.getElementById('best');
  const statusEl = document.getElementById('status');
  const startBtn = document.getElementById('startBtn');

  let best = Number.parseInt(localStorage.getItem(BEST_KEY), 10);
  if (!Number.isFinite(best) || best < 0) best = 0;
  bestEl.textContent = String(best);

  let sequence = [];
  let inputIndex = 0;
  let accepting = false;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function flash(i, ms = 420) {
    doors[i].classList.add('lit');
    await sleep(ms);
    doors[i].classList.remove('lit');
    await sleep(140);
  }

  async function playSequence() {
    accepting = false;
    statusEl.textContent = 'Watch the route…';
    doors.forEach((d) => (d.disabled = true));
    await sleep(500);
    for (const i of sequence) await flash(i, Math.max(180, 420 - sequence.length * 20));
    doors.forEach((d) => (d.disabled = false));
    statusEl.textContent = 'Your turn — repeat the route.';
    inputIndex = 0;
    accepting = true;
  }

  async function nextRound() {
    sequence.push(Math.floor(Math.random() * 4));
    streakEl.textContent = String(sequence.length - 1);
    await playSequence();
  }

  function endRound() {
    accepting = false;
    const streak = sequence.length - 1;
    doors.forEach((d) => (d.disabled = true));
    if (streak > best) {
      best = streak;
      localStorage.setItem(BEST_KEY, String(best));
      bestEl.textContent = String(best);
    }
    startBtn.disabled = false;
    statusEl.textContent = 'Wrong door!';
    if (window.WaitPlayArcade) {
      window.WaitPlayArcade.gameOver({
        label: `${streak} showings completed (best ${best})`,
        onReplay: start,
      });
    }
  }

  async function handlePress(i) {
    if (!accepting) return;
    await flash(i, 200);
    if (i !== sequence[inputIndex]) return endRound();
    inputIndex += 1;
    if (inputIndex >= sequence.length) {
      statusEl.textContent = '✅ Route complete!';
      streakEl.textContent = String(sequence.length);
      await sleep(400);
      await nextRound();
    }
  }

  function start() {
    sequence = [];
    startBtn.disabled = true;
    streakEl.textContent = '0';
    nextRound();
  }

  doors.forEach((d) => d.addEventListener('click', () => handlePress(Number(d.dataset.i))));
  doors.forEach((d) => (d.disabled = true));
  startBtn.addEventListener('click', start);
})();
