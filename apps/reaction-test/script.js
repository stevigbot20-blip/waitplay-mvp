// Reaction Test Game
(function() {
  const STORAGE_KEY = 'reaction_test_stats';
  
  let state = {
    phase: 'idle', // idle, waiting, ready, early
    startTime: 0,
    timeoutId: null,
    times: [],
    bestTime: Infinity
  };

  const gameArea = document.getElementById('gameArea');
  const target = document.getElementById('target');
  const message = document.getElementById('message');
  const lastTimeEl = document.getElementById('lastTime');
  const bestTimeEl = document.getElementById('bestTime');
  const avgTimeEl = document.getElementById('avgTime');
  const roundsEl = document.getElementById('rounds');
  const historyList = document.getElementById('historyList');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');

  function loadStats() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      state.times = data.times || [];
      state.bestTime = data.bestTime || Infinity;
    }
    updateDisplay();
  }

  function saveStats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      times: state.times.slice(-20), // Keep last 20
      bestTime: state.bestTime
    }));
  }

  function updateDisplay() {
    if (state.times.length > 0) {
      const last = state.times[state.times.length - 1];
      lastTimeEl.textContent = last + 'ms';
      bestTimeEl.textContent = state.bestTime === Infinity ? '-' : state.bestTime + 'ms';
      
      const avg = Math.round(state.times.reduce((a, b) => a + b, 0) / state.times.length);
      avgTimeEl.textContent = avg + 'ms';
      roundsEl.textContent = state.times.length;
      
      // Update history
      historyList.innerHTML = state.times.slice(-10).map(t => 
        `<span class="history-item">${t}ms</span>`
      ).join('');
    } else {
      lastTimeEl.textContent = '-';
      bestTimeEl.textContent = '-';
      avgTimeEl.textContent = '-';
      roundsEl.textContent = '0';
      historyList.innerHTML = '';
    }
  }

  function startGame() {
    state.phase = 'waiting';
    gameArea.className = 'game-area waiting';
    target.classList.add('hidden');
    message.textContent = 'Wait for green...';
    startBtn.classList.add('hidden');
    
    gameArea.onclick = handleEarlyClick;
    
    // Random delay between 1.5 and 5 seconds
    const delay = 1500 + Math.random() * 3500;
    
    state.timeoutId = setTimeout(() => {
      if (state.phase === 'waiting') {
        showTarget();
      }
    }, delay);
  }

  function handleEarlyClick() {
    if (state.phase === 'waiting') {
      clearTimeout(state.timeoutId);
      state.phase = 'early';
      gameArea.className = 'game-area early';
      message.textContent = 'Too early! Click "Start" to try again';
      startBtn.classList.remove('hidden');
      gameArea.onclick = null;
    }
  }

  function showTarget() {
    state.phase = 'ready';
    gameArea.className = 'game-area ready';
    target.classList.remove('hidden');
    message.textContent = '';
    state.startTime = performance.now();
    
    target.onclick = handleClick;
  }

  function handleClick() {
    if (state.phase !== 'ready') return;
    
    const reactionTime = Math.round(performance.now() - state.startTime);
    state.phase = 'idle';
    target.classList.add('hidden');
    gameArea.className = 'game-area';
    gameArea.onclick = null;
    target.onclick = null;
    
    state.times.push(reactionTime);
    if (reactionTime < state.bestTime) {
      state.bestTime = reactionTime;
    }
    
    message.innerHTML = `<strong>${reactionTime}ms</strong><br><small>Click "Start" to play again</small>`;
    startBtn.classList.remove('hidden');
    
    saveStats();
    updateDisplay();
  }

  function resetStats() {
    if (confirm('Reset all stats?')) {
      state.times = [];
      state.bestTime = Infinity;
      localStorage.removeItem(STORAGE_KEY);
      updateDisplay();
    }
  }

  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetStats);

  loadStats();
})();