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

  const gameLoop = (e) => {
    const location = e.target.dataset.location.split(",");
    humanPlayer.attack(location);
    DomHandler.updateAIGrid(aiBoard, location, e.target);
    if (gameOver()) return DomHandler.announceWinner('You win!');

    aiPlayer.attack();
    const aiSelection = aiPlayer.getLastAttackedLocation();
    DomHandler.updateHumanGrid(aiSelection)
    if (gameOver()) return DomHandler.announceWinner('You lose!');
  };

  const play = () => {
    humanBoard.placeShips();
    aiBoard.placeShips();
    DomHandler.render(humanBoard.getGrid(), humanGridDiv);
    DomHandler.render(aiBoard.getGrid(), aiGridDiv);
    DomHandler.addListenersToCoordinates(gameLoop);
  };

  return { play };
})();

export default Game;
