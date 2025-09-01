// Assume words[] comes from word.js
const board = document.getElementById("game-board");
const shuffleBtn = document.getElementById("shuffleBtn");

let cards = [];
let firstPick = null;
let secondPick = null;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  board.innerHTML = "";
  cards = [];

  // Create word cards
  words.forEach(item => {
    cards.push({ text: item.word, pair: item.def, type: "word" });
    cards.push({ text: item.def, pair: item.word, type: "def" });
  });

  // Shuffle cards
  shuffle(cards);

  // Render
  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.text = card.text;
    div.dataset.pair = card.pair;
    div.dataset.type = card.type;
    div.innerText = card.text;

    div.addEventListener("click", () => selectCard(div));

    board.appendChild(div);
  });
}

function selectCard(card) {
  if (firstPick && secondPick) return; // prevent more than 2 picks

  card.classList.add("selected");

  if (!firstPick) {
    firstPick = card;
  } else {
    secondPick = card;

    // Check match
    if (
      firstPick.dataset.text === secondPick.dataset.pair ||
      secondPick.dataset.text === firstPick.dataset.pair
    ) {
      firstPick.classList.add("matched");
      secondPick.classList.add("matched");
    }

    setTimeout(() => {
      firstPick.classList.remove("selected");
      secondPick.classList.remove("selected");
      firstPick = null;
      secondPick = null;
    }, 1000);
  }
}

shuffleBtn.addEventListener("click", startGame);

// Start game on load
startGame();
