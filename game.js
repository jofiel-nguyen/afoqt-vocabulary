 let gameContainer = document.getElementById("game");
    let firstPick = null;
    let lockBoard = false;

    function startGame() {
      gameContainer.innerHTML = "";
      let cards = [];

      // Create cards for words and definitions
      words.forEach(item => {
        cards.push({text: item.word, pair: item.def, type: "word"});
        cards.push({text: item.def, pair: item.word, type: "def"});
      });

      // Shuffle cards
      cards.sort(() => Math.random() - 0.5);

      // Render cards
      cards.forEach(item => {
        let card = document.createElement("div");
        card.className = "card";
        card.textContent = item.text;
        card.dataset.pair = item.pair;
        card.addEventListener("click", () => flipCard(card));
        gameContainer.appendChild(card);
      });
    }

    function flipCard(card) {
      if (lockBoard || card.classList.contains("matched")) return;

      if (!firstPick) {
        firstPick = card;
        card.style.background = "#ffeb3b"; // highlight first pick
      } else {
        if (firstPick.dataset.pair === card.textContent || 
            card.dataset.pair === firstPick.textContent) {
          // Match found
          firstPick.classList.add("matched");
          card.classList.add("matched");
        } else {
          lockBoard = true;
          let tempFirst = firstPick;
          setTimeout(() => {
            tempFirst.style.background = "white";
            card.style.background = "white";
            lockBoard = false;
          }, 800);
        }
        firstPick.style.background = "white";
        firstPick = null;
      }
    }
