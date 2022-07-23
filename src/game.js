import AIPlayer from "../src/aiPlayer";
import GameBoard from "../src/gameBoard";
import Player from "../src/player";
import DomHandler from "./domHandler";

const Game = (() => {
  const humanBoard = GameBoard();
  const aiBoard = GameBoard();
  const humanPlayer = Player(aiBoard);
  const aiPlayer = AIPlayer(humanBoard);

  const humanGridDiv = document.querySelector(".human-grid");
  const aiGridDiv = document.querySelector(".ai-grid");

  const gameOver = () => {
    return humanBoard.allShipsSunk() || aiBoard.allShipsSunk();
  };

  const oneLoop = (e) => {
    const location = e.target.dataset.location.split(",");
    humanPlayer.attack(location);
    if (aiBoard.getGrid()[location[0]][location[1]] === null) {
      e.target.classList.add("empty", "attacked");
    } else if (
      typeof aiBoard.getGrid()[location[0]][location[1]] === "string"
    ) {
      e.target.classList.add("occupied", "attacked");
    }
    if (gameOver()) {
      setTimeout(() => alert("You win!"), 0);
      aiGridDiv.style.pointerEvents = "none";
    } else {
      aiPlayer.attack();
      const aiLocation = aiPlayer.getLastAttackedLocation();
      humanGridDiv
        .querySelector(`[data-location="${aiLocation[0]},${aiLocation[1]}"]`)
        .classList.add("attacked");
      if (gameOver()) {
        setTimeout(() => alert("You lose!"), 0);
        aiGridDiv.style.pointerEvents = "none";
      }
    }
  };

  const play = function() {
    humanBoard.placeShips();
    aiBoard.placeShips();
    DomHandler.render(humanBoard.getGrid(), humanGridDiv);
    DomHandler.render(aiBoard.getGrid(), aiGridDiv);
    DomHandler.addGameLoopListeners(aiGridDiv, oneLoop);
  };

  return { play };
})();

export default Game;
