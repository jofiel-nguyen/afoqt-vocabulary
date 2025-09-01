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

  // Create word + definition cards
  words.forEach(item => {
    cards.push({ text: item.word, pair: item.def, type: "word" });
    cards.push({ text: item.def, pair: item.word, type: "def" });
  });

  // Shuffle
  shuffle(cards);

  // Render
  cards.forEach(card => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.text = card.text;
    div.dataset.pair = card.pair;
    div.innerText = card.text;

    div.addEventListener("click", () => selectCard(div));
    board.appendChild(div);
  });
}

function selectCard(card) {
  if (firstPick && secondPick) return; // only 2 at a time
  if (card.classList.contains("matched")) return; // skip matched cards

  card.classList.add("selected");

  if (!firstPick) {
    firstPick = card;
  } else {
    secondPick = card;

    // Check for match
    if (
      firstPick.dataset.pair === secondPick.dataset.text ||
      secondPick.dataset.pair === firstPick.dataset.text
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
