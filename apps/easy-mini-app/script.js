(() => {
  const STORAGE_KEY = "tap-counter-best";

  const scoreEl = document.getElementById("score");
  const bestEl = document.getElementById("bestScore");
  const tapButton = document.getElementById("tapButton");
  const resetButton = document.getElementById("resetButton");

  let score = 0;
  let best = Number.parseInt(localStorage.getItem(STORAGE_KEY), 10);

  if (!Number.isFinite(best) || best < 0) {
    best = 0;
  }

  const render = () => {
    scoreEl.textContent = String(score);
    bestEl.textContent = String(best);
  };

  const saveBest = () => {
    localStorage.setItem(STORAGE_KEY, String(best));
  };

  tapButton.addEventListener("click", () => {
    score += 1;
    if (score > best) {
      best = score;
      saveBest();
    }
    render();
  });

  resetButton.addEventListener("click", () => {
    score = 0;
    render();
  });

  render();
})();
