(() => {
  const STORAGE_KEY = "tap-sprint-best";
  const LEVEL_KEY = "tap-sprint-level";

  const scoreEl = document.getElementById("score");
  const bestEl = document.getElementById("bestScore");
  const goalEl = document.getElementById("goalScore");
  const timeEl = document.getElementById("timeLeft");
  const statusEl = document.getElementById("status");

  const modeSelect = document.getElementById("modeSelect");
  const startButton = document.getElementById("startButton");
  const tapButton = document.getElementById("tapButton");
  const resetButton = document.getElementById("resetButton");

  const baseGoals = { 30: 60, 60: 120 };

  let score = 0;
  let timeLeft = 30;
  let best = Number.parseInt(localStorage.getItem(STORAGE_KEY), 10);
  let level = Number.parseInt(localStorage.getItem(LEVEL_KEY), 10);
  let timer = null;
  let running = false;

  if (!Number.isFinite(best) || best < 0) best = 0;
  if (!Number.isFinite(level) || level < 1) level = 1;

  const selectedSeconds = () => Number.parseInt(modeSelect.value, 10);
  const selectedGoal = () => {
    const base = baseGoals[selectedSeconds()] ?? 60;
    return Math.round(base * (1 + (level - 1) * 0.12));
  };

  const render = () => {
    scoreEl.textContent = String(score);
    bestEl.textContent = String(best);
    goalEl.textContent = String(selectedGoal());
    timeEl.textContent = String(timeLeft);
    tapButton.disabled = !running;
    startButton.disabled = running;
    modeSelect.disabled = running;
  };

  const saveBest = () => localStorage.setItem(STORAGE_KEY, String(best));
  const saveLevel = () => localStorage.setItem(LEVEL_KEY, String(level));

  const celebrateWin = (goal) => {
    document.body.classList.add("win-flash");
    setTimeout(() => document.body.classList.remove("win-flash"), 900);

    if (navigator.vibrate) navigator.vibrate([120, 80, 120, 80, 180]);

    const burst = document.createElement("div");
    burst.className = "confetti-burst";
    for (let i = 0; i < 36; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.animationDelay = `${Math.random() * 0.3}s`;
      piece.style.background = ["#4a6cff", "#22c55e", "#f97316", "#eab308", "#ec4899"][i % 5];
      burst.appendChild(piece);
    }

    const banner = document.createElement("div");
    banner.className = "win-banner";
    banner.innerHTML = `
      <div class="win-banner-main">🏆 GOAL CRUSHED</div>
      <div class="win-banner-sub">${score} taps in ${selectedSeconds()}s (goal ${goal})</div>
      <div class="win-banner-sub">You kicked its ass.</div>
    `;

    document.body.appendChild(burst);
    document.body.appendChild(banner);
    setTimeout(() => burst.remove(), 1500);
    setTimeout(() => banner.remove(), 2200);
  };

  const finishRound = ({ won = false } = {}) => {
    running = false;
    clearInterval(timer);
    timer = null;

    const goal = selectedGoal();
    if (won || score >= goal) {
      level += 1;
      saveLevel();
      statusEl.textContent = `🏆 WIN. ${score}/${goal}. Level up → ${level}. Next round is harder.`;
      celebrateWin(goal);
    } else {
      statusEl.textContent = `⏱️ Time up. ${score}/${goal} — try again (level ${level}).`;
    }

    if (score > best) {
      best = score;
      saveBest();
    }
    render();
  };

  const startRound = () => {
    running = true;
    score = 0;
    timeLeft = selectedSeconds();
    statusEl.textContent = `Go! Level ${level} — hit ${selectedGoal()} taps.`;
    render();

    timer = setInterval(() => {
      timeLeft -= 1;
      render();
      if (timeLeft <= 0) finishRound();
    }, 1000);
  };

  startButton.addEventListener("click", startRound);

  tapButton.addEventListener("click", () => {
    if (!running) return;
    score += 1;

    const goal = selectedGoal();
    if (score >= goal) {
      finishRound({ won: true });
      return;
    }

    render();
  });

  modeSelect.addEventListener("change", () => {
    if (running) return;
    timeLeft = selectedSeconds();
    statusEl.textContent = `Press Start to begin (level ${level}).`;
    render();
  });

  resetButton.addEventListener("click", () => {
    best = 0;
    level = 1;
    saveBest();
    saveLevel();
    statusEl.textContent = "Best score + difficulty reset.";
    render();
  });

  render();
})();
