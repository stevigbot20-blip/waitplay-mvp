(() => {
  const STORAGE_KEY = "tap-sprint-best";

  const scoreEl = document.getElementById("score");
  const bestEl = document.getElementById("bestScore");
  const goalEl = document.getElementById("goalScore");
  const timeEl = document.getElementById("timeLeft");
  const statusEl = document.getElementById("status");

  const modeSelect = document.getElementById("modeSelect");
  const startButton = document.getElementById("startButton");
  const tapButton = document.getElementById("tapButton");
  const resetButton = document.getElementById("resetButton");

  const goals = { 30: 60, 60: 120 };

  let score = 0;
  let timeLeft = 30;
  let best = Number.parseInt(localStorage.getItem(STORAGE_KEY), 10);
  let timer = null;
  let running = false;

  if (!Number.isFinite(best) || best < 0) best = 0;

  const selectedSeconds = () => Number.parseInt(modeSelect.value, 10);
  const selectedGoal = () => goals[selectedSeconds()] ?? 60;

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

  const celebrateWin = () => {
    document.body.classList.add("win-flash");
    setTimeout(() => document.body.classList.remove("win-flash"), 900);

    if (navigator.vibrate) navigator.vibrate([120, 80, 120]);

    const burst = document.createElement("div");
    burst.className = "confetti-burst";
    for (let i = 0; i < 28; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.animationDelay = `${Math.random() * 0.25}s`;
      piece.style.background = ["#4a6cff", "#22c55e", "#f97316", "#eab308", "#ec4899"][i % 5];
      burst.appendChild(piece);
    }
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1400);
  };

  const finishRound = () => {
    running = false;
    clearInterval(timer);
    timer = null;

    const goal = selectedGoal();
    if (score >= goal) {
      statusEl.textContent = `🎉 Goal smashed! ${score}/${goal} — nice run.`;
      celebrateWin();
    } else {
      statusEl.textContent = `⏱️ Time up. ${score}/${goal} — try again.`;
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
    statusEl.textContent = "Go! Tap as fast as you can.";
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
    render();
  });

  modeSelect.addEventListener("change", () => {
    if (running) return;
    timeLeft = selectedSeconds();
    statusEl.textContent = "Press Start to begin.";
    render();
  });

  resetButton.addEventListener("click", () => {
    best = 0;
    saveBest();
    statusEl.textContent = "Best score reset.";
    render();
  });

  render();
})();
