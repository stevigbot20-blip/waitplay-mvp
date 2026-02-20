// Memory Match Game
(function() {
  const EMOJIS = ['🎮', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯', '🎮', '🎲', '🎳', '🎵', '🎹', '🎸', '🎼', '🎰', '🕹️'];
  
  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let totalPairs = 4;
  let timer = 0;
  let timerInterval = null;
  let gameStarted = false;
  let isLocked = false;

  const gameBoard = document.getElementById('gameBoard');
  const movesEl = document.getElementById('moves');
  const pairsEl = document.getElementById('pairs');
  const totalPairsEl = document.getElementById('totalPairs');
  const timerEl = document.getElementById('timer');
  const bestMovesEl = document.getElementById('bestMoves');
  const difficultySelect = document.getElementById('difficulty');
  const newGameBtn = document.getElementById('newGame');
  const winOverlay = document.getElementById('winOverlay');
  const finalMovesEl = document.getElementById('finalMoves');
  const finalTimeEl = document.getElementById('finalTime');
  const playAgainBtn = document.getElementById('playAgain');

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    
    card.innerHTML = `
      <div class="card-back"></div>
      <div class="card-front">${emoji}</div>
    `;
    
    card.addEventListener('click', () => flipCard(card));
    return card;
  }

  function flipCard(card) {
    if (isLocked) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;

    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moves++;
      movesEl.textContent = moves;
      checkMatch();
    }
  }

  function checkMatch() {
    isLocked = true;
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedPairs++;
      pairsEl.innerHTML = `${matchedPairs} / <span id="totalPairs">${totalPairs}</span>`;
      
      flippedCards = [];
      isLocked = false;
      
      if (matchedPairs === totalPairs) {
        endGame();
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
        isLocked = false;
      }, 800);
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      timerEl.textContent = formatTime(timer);
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function endGame() {
    stopTimer();
    
    const bestKey = `memory_match_best_${totalPairs}`;
    const previousBest = localStorage.getItem(bestKey);
    
    if (!previousBest || moves < parseInt(previousBest)) {
      localStorage.setItem(bestKey, moves);
      bestMovesEl.textContent = moves;
    }
    
    finalMovesEl.textContent = moves;
    finalTimeEl.textContent = formatTime(timer);
    winOverlay.classList.remove('hidden');
  }

  function initGame() {
    stopTimer();
    
    totalPairs = parseInt(difficultySelect.value);
    totalPairsEl.textContent = totalPairs;
    
    const selectedEmojis = shuffle(EMOJIS).slice(0, totalPairs);
    cards = shuffle([...selectedEmojis, ...selectedEmojis]);
    
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    gameStarted = false;
    isLocked = false;
    
    movesEl.textContent = '0';
    pairsEl.innerHTML = `0 / <span id="totalPairs">${totalPairs}</span>`;
    timerEl.textContent = '0:00';
    
    const bestKey = `memory_match_best_${totalPairs}`;
    const best = localStorage.getItem(bestKey);
    bestMovesEl.textContent = best || '-';
    
    winOverlay.classList.add('hidden');
    
    gameBoard.innerHTML = '';
    
    if (totalPairs === 8) {
      gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
    } else if (totalPairs === 6) {
      gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
    } else {
      gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
    
    cards.forEach((emoji, index) => {
      gameBoard.appendChild(createCard(emoji, index));
    });
  }

  newGameBtn.addEventListener('click', initGame);
  playAgainBtn.addEventListener('click', initGame);
  difficultySelect.addEventListener('change', initGame);

  initGame();
})();