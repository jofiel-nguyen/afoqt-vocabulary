const gameBoard = document.getElementById("game-board");
const shuffleBtn = document.getElementById("shuffleBtn");
const startBtn = document.getElementById("start-btn");
const wordListContainer = document.getElementById("word-list-container");
const gameSection = document.getElementById("game-section");

let cards = [];
let firstPick = null;
let secondPick = null;
let score = 0;
let matchedPairs = 0;
let currentWords = [];

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function renderWordList() {
  wordListContainer.innerHTML = "";
  words.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("list-item");
    div.innerHTML = `<strong>${item.word}</strong>: ${item.def}`;
    wordListContainer.appendChild(div);
  });
}

function startGameAndHideList() {
  wordListContainer.style.display = "none";
  startBtn.style.display = "none";
  gameSection.style.display = "block";
  startGame();
}

function startGame() {
  gameBoard.innerHTML = "";
  cards = [];
  score = 0;
  matchedPairs = 0;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("message").innerText = "";

  // Select 5 random word pairs
  currentWords = shuffle([...words]).slice(0, 5);

  // Create word + definition cards from the selected words
  currentWords.forEach(item => {
    cards.push({ text: item.word, pair: item.def, type: "word" });
    cards.push({ text: item.def, pair: item.word, type: "def" });
  });

  // Shuffle the new set of cards
  shuffle(cards);

  // Render the new set of cards
  cards.forEach(card => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.text = card.text;
    div.dataset.pair = card.pair;
    div.innerText = card.text;
    div.addEventListener("click", () => selectCard(div));
    gameBoard.appendChild(div);
  });
}

function selectCard(card) {
  if (firstPick && secondPick) return;
  if (card.classList.contains("matched") || card.classList.contains("selected")) return;
  card.classList.add("selected");

  if (!firstPick) {
    firstPick = card;
  } else {
    secondPick = card;

    if (
      firstPick.dataset.pair === secondPick.dataset.text &&
      secondPick.dataset.pair === firstPick.dataset.text
    ) {
      firstPick.classList.add("matched");
      secondPick.classList.add("matched");
      score++;
      matchedPairs++;
      document.getElementById("score").innerText = `Score: ${score}`;

      if (matchedPairs === currentWords.length) {
        document.getElementById("message").innerText = "Congratulations! You've matched all the pairs!";
      }
    }

    setTimeout(() => {
      firstPick.classList.remove("selected");
      secondPick.classList.remove("selected");
      firstPick = null;
      secondPick = null;
    }, 1000);
  }
}

// Event listeners
startBtn.addEventListener("click", startGameAndHideList);
shuffleBtn.addEventListener("click", startGame);

// On page load, render the word list
window.onload = renderWordList;